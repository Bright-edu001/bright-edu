#!/bin/bash

# Bright Education Google Sheets 同步服務 Docker 部署腳本

set -e

echo "🚀 開始部署 Bright Education 同步服務..."

# 檢查必要檔案
if [ ! -f ".env" ]; then
    echo "⚠️  找不到 .env 檔案，複製範例檔案..."
    cp .env.example .env
    echo "📝 請編輯 .env 檔案並設定正確的環境變數"
    exit 1
fi

# 檢查 Docker 是否安裝
if ! command -v docker &> /dev/null; then
    echo "❌ Docker 未安裝，請先安裝 Docker"
    exit 1
fi

# 停止現有容器
echo "🛑 停止現有容器..."
docker stop bright-edu-sync 2>/dev/null || true
docker rm bright-edu-sync 2>/dev/null || true

# 建構映像
echo "🔨 建構 Docker 映像..."
docker build -t bright-edu-sync .

# 執行容器
echo "▶️  啟動服務容器..."
docker run -d \
    --name bright-edu-sync \
    -p 3002:3002 \
    --env-file .env \
    --restart unless-stopped \
    bright-edu-sync

# 等待服務啟動
echo "⏳ 等待服務啟動..."
sleep 5

# 檢查服務狀態
echo "🔍 檢查服務狀態..."
if docker ps | grep -q bright-edu-sync; then
    echo "✅ 服務啟動成功！"
    echo "🌐 服務網址: http://localhost:3002"
    echo "💊 健康檢查: http://localhost:3002/health"
    
    # 測試健康檢查
    if curl -f http://localhost:3002/health > /dev/null 2>&1; then
        echo "✅ 健康檢查通過"
    else
        echo "⚠️  健康檢查失敗，請檢查日誌:"
        docker logs bright-edu-sync
    fi
else
    echo "❌ 服務啟動失敗，檢查日誌:"
    docker logs bright-edu-sync
    exit 1
fi

echo "🎉 部署完成！"
