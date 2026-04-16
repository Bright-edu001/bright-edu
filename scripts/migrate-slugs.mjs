/**
 * migrate-slugs.mjs
 *
 * 為 Firestore 中所有沒有 slug 欄位的 enrollmentEvents 與 news 文件補填 slug。
 * 同步更新 link 欄位為 /blog/${slug}。
 *
 * 使用前準備（使用 Application Default Credentials，不需要 service account 金鑰檔案）：
 *
 *   步驟 1：安裝 gcloud CLI（若尚未安裝）
 *     https://cloud.google.com/sdk/docs/install
 *
 *   步驟 2：登入並設定專案
 *     gcloud auth application-default login
 *     gcloud config set project YOUR_FIREBASE_PROJECT_ID
 *
 *   步驟 3：先在開發環境（Firebase Emulator）測試（可選）
 *     $env:FIRESTORE_EMULATOR_HOST="localhost:8080"
 *     node scripts/migrate-slugs.mjs --dry-run
 *
 *   步驟 4：正式執行（操作 prod Firestore）
 *     node scripts/migrate-slugs.mjs --dry-run   # 先確認計劃
 *     node scripts/migrate-slugs.mjs             # 確認無誤後寫入
 *
 * 參數：
 *   --dry-run                       只列印計劃變更，不實際寫入
 *   --project=YOUR_PROJECT_ID       指定 Firebase 專案 ID（可選，優先於 gcloud 預設值）
 *   --collection=enrollmentEvents   只遷移指定集合（可選）
 */

import { initializeApp, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ────────────────────────────────────────────────
// 參數解析
// ────────────────────────────────────────────────
const args = process.argv.slice(2);
const isDryRun = args.includes("--dry-run");
const targetCollection = args
  .find((a) => a.startsWith("--collection="))
  ?.split("=")[1];
const projectId = args.find((a) => a.startsWith("--project="))?.split("=")[1];
const collections = targetCollection
  ? [targetCollection]
  : ["enrollmentEvents", "news"];

console.log(`\n🚀 migrate-slugs.mjs`);
console.log(`   模式: ${isDryRun ? "DRY RUN（模擬，不寫入）" : "正式執行"}`);
console.log(`   目標集合: ${collections.join(", ")}`);
if (projectId) console.log(`   專案 ID: ${projectId}`);
console.log();

// ────────────────────────────────────────────────
// Firebase Admin 初始化（使用 Application Default Credentials）
// ────────────────────────────────────────────────
if (!getApps().length) {
  try {
    const appOptions = projectId ? { projectId } : {};
    initializeApp(appOptions);
  } catch (err) {
    console.error(`❌ Firebase Admin 初始化失敗`);
    console.error(`   請確認已執行：gcloud auth application-default login`);
    console.error(`   詳細錯誤：${err.message}`);
    process.exit(1);
  }
}

const db = getFirestore();

// ────────────────────────────────────────────────
// Slug 產生工具（與前台 generateSlug.js 邏輯一致）
// ────────────────────────────────────────────────
function generateSlug(title) {
  if (!title || typeof title !== "string") return null;

  const text = title
    .replace(/<[^>]+>/g, " ") // 去除 HTML 標籤
    .replace(/&[a-z]+;/gi, " ") // 去除 HTML entities
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // 去除特殊字元
    .replace(/[\s_]+/g, "-") // 空白轉連字號
    .replace(/-{2,}/g, "-") // 合併多個連字號
    .replace(/^-+|-+$/g, "") // 去除首尾連字號
    .slice(0, 80)
    .replace(/-+$/g, "");

  return text.length > 0 ? text : null;
}

// ────────────────────────────────────────────────
// 主流程
// ────────────────────────────────────────────────
async function migrateCollection(colName) {
  console.log(`\n📁 處理集合: ${colName}`);

  const snap = await db.collection(colName).get();
  console.log(`   總文件數: ${snap.size}`);

  // 收集已有的 slug，避免衝突
  const existingSlugs = new Set();
  snap.docs.forEach((d) => {
    if (d.data().slug) existingSlugs.add(d.data().slug);
  });

  const toUpdate = [];

  for (const docSnap of snap.docs) {
    const data = docSnap.data();

    // 已有 slug：檢查 link 是否也正確，若不一致則補修正
    if (data.slug) {
      const expectedLink = `/blog/${data.slug}`;
      if (data.link !== expectedLink) {
        console.log(
          `   ⚠️  ${docSnap.id} slug 已有但 link 不正確: "${data.link}" → "${expectedLink}"`,
        );
        toUpdate.push({
          ref: docSnap.ref,
          id: docSnap.id,
          slug: data.slug,
          link: expectedLink,
          title: data.title,
          linkOnly: true,
        });
      } else {
        console.log(
          `   ✓ ${docSnap.id} slug: "${data.slug}"  link: "${data.link}"（跳過）`,
        );
      }
      continue;
    }

    // 產生 slug，純中文 title 時 fallback 用 doc.id
    let baseSlug = generateSlug(data.title) || docSnap.id;

    // 確保唯一
    let slug = baseSlug;
    let counter = 2;
    while (existingSlugs.has(slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    existingSlugs.add(slug);

    const link = `/blog/${slug}`;
    toUpdate.push({
      ref: docSnap.ref,
      id: docSnap.id,
      slug,
      link,
      title: data.title,
    });
  }

  console.log(`\n   需要更新: ${toUpdate.length} 筆`);
  toUpdate.forEach(({ id, slug, link, linkOnly, title }) => {
    const displayTitle = String(title || "")
      .slice(0, 50)
      .replace(/<[^>]+>/g, "");
    if (linkOnly) {
      console.log(`   → ${id.padEnd(25)} link 修正: "${link}"`);
    } else {
      console.log(
        `   → ${id.padEnd(25)} slug: "${slug}"  title: "${displayTitle}"`,
      );
    }
  });

  if (isDryRun) {
    console.log(`\n   ⏸  DRY RUN 模式：不執行寫入`);
    return { updated: 0, skipped: snap.size - toUpdate.length };
  }

  // Firestore batch 寫入（每批 500 筆上限）
  const BATCH_SIZE = 499;
  let totalUpdated = 0;

  for (let i = 0; i < toUpdate.length; i += BATCH_SIZE) {
    const batch = db.batch();
    const chunk = toUpdate.slice(i, i + BATCH_SIZE);
    chunk.forEach(({ ref, slug, link, linkOnly }) => {
      if (linkOnly) {
        batch.update(ref, { link });
      } else {
        batch.update(ref, { slug, link });
      }
    });
    await batch.commit();
    totalUpdated += chunk.length;
    console.log(
      `   ✅ 批次 ${Math.floor(i / BATCH_SIZE) + 1} 完成（${chunk.length} 筆）`,
    );
  }

  return { updated: totalUpdated, skipped: snap.size - toUpdate.length };
}

async function main() {
  const results = {};

  for (const col of collections) {
    results[col] = await migrateCollection(col);
  }

  console.log(`\n${"─".repeat(50)}`);
  console.log(`📊 執行摘要`);
  console.log(`${"─".repeat(50)}`);
  for (const [col, { updated, skipped }] of Object.entries(results)) {
    console.log(
      `   ${col}: ${updated} 筆已更新，${skipped} 筆已有 slug（跳過）`,
    );
  }

  if (isDryRun) {
    console.log(`\n  ⚠️  以上為 DRY RUN 結果，未實際寫入。`);
    console.log(`   確認無誤後移除 --dry-run 旗標重新執行。`);
  } else {
    console.log(`\n  ✅ 遷移完成。`);
  }
}

main().catch((err) => {
  console.error("❌ 執行失敗:", err);
  process.exit(1);
});
