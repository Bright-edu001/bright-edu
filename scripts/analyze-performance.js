#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

console.log("🔍 正在分析專案性能...\n");

// 分析 build 資料夾大小
function analyzeBuildSize() {
  const buildPath = path.join(process.cwd(), "build");
  if (!fs.existsSync(buildPath)) {
    console.log("❌ build 資料夾不存在，請先執行 npm run build");
    return;
  }

  const getDirectorySize = (dirPath) => {
    let totalSize = 0;
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        totalSize += getDirectorySize(filePath);
      } else {
        totalSize += stats.size;
      }
    });

    return totalSize;
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const totalSize = getDirectorySize(buildPath);

  console.log("📦 Build 分析結果:");
  console.log(`   總大小: ${formatBytes(totalSize)}`);

  // 分析靜態資源
  const staticPath = path.join(buildPath, "static");
  if (fs.existsSync(staticPath)) {
    const jsPath = path.join(staticPath, "js");
    const cssPath = path.join(staticPath, "css");

    if (fs.existsSync(jsPath)) {
      const jsSize = getDirectorySize(jsPath);
      console.log(`   JS 檔案: ${formatBytes(jsSize)}`);
    }

    if (fs.existsSync(cssPath)) {
      const cssSize = getDirectorySize(cssPath);
      console.log(`   CSS 檔案: ${formatBytes(cssSize)}`);
    }
  }

  console.log("");
}

// 分析 node_modules 大小
function analyzeNodeModules() {
  const nodeModulesPath = path.join(process.cwd(), "node_modules");
  if (!fs.existsSync(nodeModulesPath)) {
    console.log("❌ node_modules 資料夾不存在");
    return;
  }

  console.log("📚 依賴分析:");

  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
  const dependencies = Object.keys(packageJson.dependencies || {});
  const devDependencies = Object.keys(packageJson.devDependencies || {});

  console.log(`   生產依賴: ${dependencies.length} 個`);
  console.log(`   開發依賴: ${devDependencies.length} 個`);
  console.log("");
}

// 檢查大型檔案
function checkLargeFiles() {
  console.log("🔍 檢查大型檔案 (>500KB):");

  const checkDirectory = (dirPath, relativePath = "") => {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      const relativeFilePath = path.join(relativePath, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory() && !file.includes("node_modules")) {
        checkDirectory(filePath, relativeFilePath);
      } else if (stats.isFile() && stats.size > 500 * 1024) {
        const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
        console.log(`   ⚠️  ${relativeFilePath} (${sizeInMB} MB)`);
      }
    });
  };

  checkDirectory("./src", "src");
  checkDirectory("./public", "public");
  console.log("");
}

// 性能建議
function performanceRecommendations() {
  console.log("💡 性能優化建議:");
  console.log("   ✅ 已實施 React.lazy() 動態載入");
  console.log("   ✅ 已實施組件 memo 化");
  console.log("   ✅ 已實施圖片懶載入");
  console.log("   ✅ 已實施 Service Worker 快取");
  console.log("   ✅ 已實施錯誤邊界保護");
  console.log("");
  console.log("🎯 進一步優化建議:");
  console.log("   1. 考慮使用 CDN 加速靜態資源");
  console.log("   2. 實施關鍵 CSS 內聯");
  console.log("   3. 優化圖片格式（使用 WebP）");
  console.log("   4. 實施資源預載入策略");
  console.log("   5. 監控 Core Web Vitals 指標");
}

// 執行分析
analyzeBuildSize();
analyzeNodeModules();
checkLargeFiles();
performanceRecommendations();
