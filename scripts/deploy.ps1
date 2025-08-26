# Bright Education Google Sheets 同步服務 Docker 部署腳本 (Windows PowerShell)

Write-Host "🚀 開始部署 Bright Education 同步服務..." -ForegroundColor Green

# 檢查必要檔案
if (-Not (Test-Path ".env")) {
    Write-Host "⚠️  找不到 .env 檔案，複製範例檔案..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "📝 請編輯 .env 檔案並設定正確的環境變數" -ForegroundColor Yellow
    exit 1
}

# 檢查 Docker 是否安裝
try {
    docker --version | Out-Null
} catch {
    Write-Host "❌ Docker 未安裝，請先安裝 Docker Desktop" -ForegroundColor Red
    exit 1
}

# 停止現有容器
Write-Host "🛑 停止現有容器..." -ForegroundColor Yellow
try {
    docker stop bright-edu-sync 2>$null
    docker rm bright-edu-sync 2>$null
} catch {
    # 忽略錯誤，容器可能不存在
}

# 建構映像
Write-Host "🔨 建構 Docker 映像..." -ForegroundColor Cyan
docker build -t bright-edu-sync .

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Docker 映像建構失敗" -ForegroundColor Red
    exit 1
}

# 執行容器
Write-Host "▶️  啟動服務容器..." -ForegroundColor Green
docker run -d --name bright-edu-sync -p 3002:3002 --env-file .env --restart unless-stopped bright-edu-sync

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 容器啟動失敗" -ForegroundColor Red
    exit 1
}

# 等待服務啟動
Write-Host "⏳ 等待服務啟動..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# 檢查服務狀態
Write-Host "🔍 檢查服務狀態..." -ForegroundColor Cyan
$runningContainers = docker ps --format "table {{.Names}}" | Select-String "bright-edu-sync"

if ($runningContainers) {
    Write-Host "✅ 服務啟動成功！" -ForegroundColor Green
    Write-Host "🌐 服務網址: http://localhost:3002" -ForegroundColor Blue
    Write-Host "💊 健康檢查: http://localhost:3002/health" -ForegroundColor Blue
    
    # 測試健康檢查
    try {
        $response = Invoke-RestMethod -Uri "http://localhost:3002/health" -Method GET -TimeoutSec 5
        Write-Host "✅ 健康檢查通過" -ForegroundColor Green
        Write-Host "📊 服務狀態: $($response.status)" -ForegroundColor Blue
    } catch {
        Write-Host "⚠️  健康檢查失敗，請檢查日誌:" -ForegroundColor Yellow
        docker logs bright-edu-sync
    }
} else {
    Write-Host "❌ 服務啟動失敗，檢查日誌:" -ForegroundColor Red
    docker logs bright-edu-sync
    exit 1
}

Write-Host "🎉 部署完成！" -ForegroundColor Green
