#!/usr/bin/env node
const fs = require("fs");

/*
  migrateContentStructure.js
  ---------------------------
  這個小工具用來遷移 JSON 內容結構：
  - 把物件中的 `details` 欄位改名為 `sections`。
  - 把物件中的 `subDetails` 根據深度改名為 `items` 或 `subItems`：
      - 當 depth <= 1 時，使用 key `items`。
      - 否則使用 key `subItems`。
  
  使用方式: node migrateContentStructure.js <file1> [file2 ...]
  (會直接修改原檔案，請先備份或使用版本控制)
*/

/**
 * 遞迴地重新命名物件鍵值。
 *
 * 規則：
 * - 如果遇到陣列，對每個元素遞迴處理並回傳新的陣列。
 * - 如果遇到物件，建立新的物件 result，逐一處理每個屬性：
 *    - key === 'details' -> 重新命名為 'sections'，並把 value 遞迴處理 (depth+1)
 *    - key === 'subDetails' -> 根據目前 depth 決定新 key 為 'items' 或 'subItems'，並遞迴處理 (depth+1)
 *    - 其他 key -> 保留原 key 並遞迴處理，depth 不變
 * - 原始原子值 (字串/數字/boolean/null/undefined) 直接回傳，不做任何改變。
 *
 * 參數:
 * @param {*} data - 要處理的資料（可能是陣列、物件或原子值）
 * @param {number} depth - 目前遞迴深度，用來決定 `subDetails` 的新鍵名
 * @returns {*} - 轉換後的資料結構（不會修改原始物件）
 */
function renameKeys(data, depth = 0) {
  // 陣列：對每個元素遞迴處理
  if (Array.isArray(data)) {
    return data.map((item) => renameKeys(item, depth));
  }

  // 物件：建立新物件並依規則重新命名欄位
  if (data && typeof data === "object") {
    const result = {};
    for (const [key, value] of Object.entries(data)) {
      if (key === "details") {
        // 將 details 改成 sections，並將子結構深度加一
        result.sections = renameKeys(value, depth + 1);
      } else if (key === "subDetails") {
        // 根據深度選擇 items 或 subItems
        const newKey = depth <= 1 ? "items" : "subItems";
        result[newKey] = renameKeys(value, depth + 1);
      } else {
        // 其他鍵保持不變，但要遞迴處理其值
        result[key] = renameKeys(value, depth);
      }
    }
    return result;
  }

  // 原子值：直接回傳
  return data;
}

/**
 * 讀取檔案、解析 JSON、執行遷移、並覆寫回檔案。
 * @param {string} path - 要遷移的 JSON 檔案路徑
 */
function migrateFile(path) {
  const content = fs.readFileSync(path, "utf8");
  const json = JSON.parse(content);
  const migrated = renameKeys(json);
  // 使用兩個空白縮排格式化輸出並在檔尾加入換行，讓 git diff 比較更乾淨
  fs.writeFileSync(path, JSON.stringify(migrated, null, 2) + "\n");
  console.log(`Migrated ${path}`);
}

// 從命令列參數取得檔案清單
const files = process.argv.slice(2);
if (files.length === 0) {
  console.error("Usage: node migrateContentStructure.js <file1> [file2 ...]");
  process.exit(1);
}
// 對每個檔案執行遷移
files.forEach(migrateFile);
