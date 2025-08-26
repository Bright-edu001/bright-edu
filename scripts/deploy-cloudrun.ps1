# Cloud Run 部署腳本
param(
    [string]$ProjectId = "bright-edu-data",
    [string]$ServiceName = "bright-edu-sync",
    [string]$Region = "asia-east1",
    [string]$Image = "gcr.io/bright-edu-data/bright-edu-sync"
)

Write-Host "🚀 開始部署到 Google Cloud Run..." -ForegroundColor Green

# 設定專案
Write-Host "📋 設定 Google Cloud 專案: $ProjectId" -ForegroundColor Cyan
gcloud config set project $ProjectId

# 建構並推送映像
Write-Host "🔨 建構並推送 Docker 映像..." -ForegroundColor Cyan
gcloud builds submit --tag $Image .

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 映像建構失敗" -ForegroundColor Red
    exit 1
}

# 部署到 Cloud Run
Write-Host "🚀 部署到 Cloud Run..." -ForegroundColor Green
gcloud run deploy $ServiceName `
    --image $Image `
    --platform managed `
    --region $Region `
    --memory 512Mi `
    --cpu 1 `
    --max-instances 10 `
    --set-env-vars "NODE_ENV=production,FIREBASE_PROJECT_ID=$ProjectId" `
    --no-allow-unauthenticated

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Cloud Run 部署失敗" -ForegroundColor Red
    exit 1
}

# 設定 IAM 權限
Write-Host "🔒 設定訪問權限..." -ForegroundColor Yellow
gcloud run services add-iam-policy-binding $ServiceName `
    --region=$Region `
    --member="user:web@bright-edu.com" `
    --role="roles/run.invoker"

# 獲取服務 URL
$serviceUrl = gcloud run services describe $ServiceName --region=$Region --format="value(status.url)"
Write-Host "✅ 部署完成！" -ForegroundColor Green
Write-Host "🌐 服務 URL: $serviceUrl" -ForegroundColor Blue
Write-Host "💊 健康檢查: $serviceUrl/api/health" -ForegroundColor Blue
Write-Host "🔗 同步 API: $serviceUrl/api/sync-google-sheets" -ForegroundColor Blue

Write-Host "📝 注意：由於組織政策限制，需要使用身份驗證來訪問服務" -ForegroundColor Yellow
Write-Host "🔑 使用以下命令獲取訪問令牌：" -ForegroundColor Yellow
Write-Host "   gcloud auth print-access-token" -ForegroundColor Gray

Write-Host "🧪 測試命令：" -ForegroundColor Yellow
Write-Host "   `$token = gcloud auth print-access-token" -ForegroundColor Gray
Write-Host "   Invoke-RestMethod -Uri '$serviceUrl/api/health' -Headers @{ 'Authorization' = 'Bearer `$token' }" -ForegroundColor Gray
