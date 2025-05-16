const express = require("express");
const path = require("path");
const compression = require("compression");

const app = express();

// 啟用 gzip/deflate 壓縮
app.use(compression({ level: 9 }));

// 提供 build 目錄靜態檔案
app.use(express.static(path.join(__dirname, "build")));

// 支援 SPA 路由
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
