# Cloud Run 服務測試腳本
param(
    [string]$ServiceUrl = "https://bright-edu-sync-156805168089.asia-east1.run.app"
)

Write-Host "🧪 測試 Cloud Run 服務: $ServiceUrl" -ForegroundColor Green

# 方法 1: 使用 gcloud auth print-identity-token
Write-Host "🔑 獲取身份令牌..." -ForegroundColor Cyan
try {
    $identityToken = gcloud auth print-identity-token --audiences=$ServiceUrl
    Write-Host "✅ 身份令牌獲取成功" -ForegroundColor Green
} catch {
    Write-Host "❌ 身份令牌獲取失敗，嘗試訪問令牌..." -ForegroundColor Yellow
    $accessToken = gcloud auth print-access-token
}

# 測試健康檢查
Write-Host "💊 測試健康檢查..." -ForegroundColor Cyan
try {
    if ($identityToken) {
        $response = Invoke-RestMethod -Uri "$ServiceUrl/api/health" -Headers @{ "Authorization" = "Bearer $identityToken" }
    } else {
        $response = Invoke-RestMethod -Uri "$ServiceUrl/api/health" -Headers @{ "Authorization" = "Bearer $accessToken" }
    }
    Write-Host "✅ 健康檢查成功!" -ForegroundColor Green
    Write-Host "📊 狀態: $($response.status)" -ForegroundColor Blue
    Write-Host "💬 訊息: $($response.message)" -ForegroundColor Blue
} catch {
    Write-Host "❌ 健康檢查失敗: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "🔍 嘗試無身份驗證訪問..." -ForegroundColor Yellow
    
    try {
        $response = Invoke-RestMethod -Uri "$ServiceUrl/api/health"
        Write-Host "✅ 無身份驗證訪問成功!" -ForegroundColor Green
        Write-Host "📊 回應: $response" -ForegroundColor Blue
    } catch {
        Write-Host "❌ 無身份驗證訪問也失敗" -ForegroundColor Red
    }
}

# 測試同步功能
Write-Host "🔄 測試 Google Sheets 同步..." -ForegroundColor Cyan
try {
    if ($identityToken) {
        $syncResponse = Invoke-RestMethod -Uri "$ServiceUrl/api/sync-google-sheets" -Method POST -ContentType "application/json" -Body "{}" -Headers @{ "Authorization" = "Bearer $identityToken" }
    } else {
        $syncResponse = Invoke-RestMethod -Uri "$ServiceUrl/api/sync-google-sheets" -Method POST -ContentType "application/json" -Body "{}" -Headers @{ "Authorization" = "Bearer $accessToken" }
    }
    Write-Host "✅ 同步測試成功!" -ForegroundColor Green
    Write-Host "📊 結果: 成功=$($syncResponse.success), 數量=$($syncResponse.count)" -ForegroundColor Blue
    Write-Host "⏱️ 執行時間: $($syncResponse.durationMs)ms" -ForegroundColor Blue
} catch {
    Write-Host "❌ 同步測試失敗: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "🎯 測試完成！" -ForegroundColor Green
