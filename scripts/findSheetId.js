/**
 * 幫助找到 Google Sheets ID 的工具
 */

console.log("🔍 如何找到您的 Google Sheets ID：");
console.log("");
console.log("1. 開啟您的聯絡表單 Google Sheets");
console.log("2. 複製瀏覽器網址列的完整 URL");
console.log("3. 在下面的範例中找到對應的部分：");
console.log("");
console.log("📋 Google Sheets URL 格式：");
console.log("https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit#gid=0");
console.log("                                        ^^^^^^^^^^^^^^^^");
console.log("                                        這就是您的 SHEET_ID");
console.log("");
console.log("📝 範例：");
console.log(
  "URL: https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit"
);
console.log("SHEET_ID: 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms");
console.log("");
console.log("✏️  請將找到的 SHEET_ID 提供給我，我會幫您設定遷移腳本");

// 提供一個簡單的函數來解析 URL
function extractSheetId(url) {
  const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : null;
}

// 如果有命令列參數，嘗試解析
if (process.argv[2]) {
  const url = process.argv[2];
  const sheetId = extractSheetId(url);

  if (sheetId) {
    console.log("");
    console.log("✅ 成功解析！");
    console.log(`您的 SHEET_ID 是: ${sheetId}`);
    console.log("");
    console.log("請將這個 ID 提供給助手來設定遷移腳本");
  } else {
    console.log("");
    console.log("❌ 無法解析此 URL，請確認 URL 格式正確");
  }
}

module.exports = { extractSheetId };
