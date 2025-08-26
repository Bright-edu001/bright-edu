# 使用官方 Node.js 18 LTS 映像
FROM node:18-alpine

# 設置工作目錄
WORKDIR /app

# 複製 package.json 和相關檔案
COPY package*.json ./

# 安裝 Node.js 依賴
RUN npm ci --only=production && npm cache clean --force

# 複製應用程式碼
COPY . .

# 創建非 root 用戶
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# 設置檔案權限
RUN chown -R nodejs:nodejs /app
USER nodejs

# Cloud Run 使用動態端口，從環境變數 PORT 取得
ENV PORT=8080
EXPOSE $PORT

# 移除健康檢查（Cloud Run 有自己的健康檢查機制）

# 啟動應用
CMD ["node", "localSyncServer.js"]
