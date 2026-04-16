/**
 * sync-prod-to-emulator.mjs
 * 從生產 Firestore 讀取資料並寫入本地 Emulator
 * 使用方式: node scripts/sync-prod-to-emulator.mjs
 */
import { initializeApp as initProd, getApps, cert } from "firebase-admin/app";
import { getFirestore as getProdFirestore } from "firebase-admin/firestore";

// 目標集合
const COLLECTIONS = ["enrollmentEvents", "news"];
const EMULATOR_HOST = "localhost";
const EMULATOR_PORT = 8080;
const PROJECT_ID = "bright-edu-data";

// 初始化生產 Admin（ADC）
if (!getApps().length) {
  initProd({ projectId: PROJECT_ID });
}
const prodDb = getProdFirestore();

async function clearEmulatorCollection(col) {
  const url = `http://${EMULATOR_HOST}:${EMULATOR_PORT}/emulator/v1/projects/${PROJECT_ID}/databases/(default)/documents/${col}`;
  const res = await fetch(url, { method: "DELETE" });
  if (!res.ok && res.status !== 404) {
    const text = await res.text();
    throw new Error(`清除 ${col} 失敗 (${res.status}): ${text}`);
  }
  console.log(`   🗑  清除 emulator/${col}`);
}

async function writeDocToEmulator(col, docId, data) {
  // Firestore REST API：將 JS 物件轉換為 Firestore 格式
  const fields = objToFirestoreFields(data);
  const url = `http://${EMULATOR_HOST}:${EMULATOR_PORT}/v1/projects/${PROJECT_ID}/databases/(default)/documents/${col}/${docId}`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fields }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`寫入 ${col}/${docId} 失敗 (${res.status}): ${text}`);
  }
}

function toFirestoreValue(val) {
  if (val === null || val === undefined) return { nullValue: null };
  if (typeof val === "boolean") return { booleanValue: val };
  if (typeof val === "number") {
    return Number.isInteger(val)
      ? { integerValue: String(val) }
      : { doubleValue: val };
  }
  if (typeof val === "string") return { stringValue: val };
  if (Array.isArray(val))
    return { arrayValue: { values: val.map(toFirestoreValue) } };
  if (typeof val === "object")
    return { mapValue: { fields: objToFirestoreFields(val) } };
  return { stringValue: String(val) };
}

function objToFirestoreFields(obj) {
  const fields = {};
  for (const [k, v] of Object.entries(obj)) {
    fields[k] = toFirestoreValue(v);
  }
  return fields;
}

async function syncCollection(colName) {
  console.log(`\n📁 同步集合: ${colName}`);
  const snap = await prodDb.collection(colName).get();
  console.log(`   生產文件數: ${snap.size}`);

  await clearEmulatorCollection(colName);

  let count = 0;
  for (const d of snap.docs) {
    await writeDocToEmulator(colName, d.id, d.data());
    count++;
    process.stdout.write(`\r   寫入進度: ${count}/${snap.size}`);
  }
  console.log(`\n   ✅ 完成`);
  return count;
}

async function main() {
  console.log("\n🔄 sync-prod-to-emulator");
  console.log(`   來源: 生產 Firestore (${PROJECT_ID})`);
  console.log(`   目標: Emulator (${EMULATOR_HOST}:${EMULATOR_PORT})\n`);

  // 確認 emulator 是否在線
  try {
    const check = await fetch(`http://${EMULATOR_HOST}:${EMULATOR_PORT}/`);
    if (!check.ok) throw new Error();
  } catch {
    console.error("❌ 無法連線到 Firebase Emulator，請先啟動：");
    console.error("   firebase emulators:start");
    process.exit(1);
  }

  for (const col of COLLECTIONS) {
    await syncCollection(col);
  }

  console.log("\n✅ 全部同步完成。重新整理前台頁面即可看到最新資料。\n");
}

main().catch((err) => {
  console.error("❌ 失敗:", err.message);
  process.exit(1);
});
