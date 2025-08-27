# Google Sheets 同步服務 - 部署完成說明

## 🎉 部署狀態

✅ **服務已成功部署到 Google Cloud Run**

- **服務 URL**: https://bright-edu-sync-156805168089.asia-east1.run.app
- **健康檢查**: https://bright-edu-sync-156805168089.asia-east1.run.app/api/health
- **同步端點**: https://bright-edu-sync-156805168089.asia-east1.run.app/api/sync-google-sheets

## 🔐 安全設定

### API 金鑰保護

- **API 金鑰**: `bright-edu-sync-2024-secure-key`
- **驗證方式**: HTTP Header `x-api-key` 或 Query Parameter `apikey`
- **保護範圍**: 僅同步端點需要 API 金鑰，健康檢查端點公開存取

### 存取權限

- **公開存取**: 所有人都可以存取健康檢查端點
- **管理員存取**: 只有擁有 API 金鑰的使用者可以執行同步操作
- **適用範圍**: 1-3 位管理員使用者

## 📊 服務端點

### 1. 健康檢查端點

```
GET /api/health
```

- **用途**: 檢查服務狀態
- **認證**: 無需認證
- **回應**:
  ```json
  {
    "status": "ok",
    "message": "Local sync server is running"
  }
  ```

### 2. Google Sheets 同步端點

```
POST /api/sync-google-sheets
```

- **用途**: 執行 Google Sheets 資料同步
- **認證**: 需要 API 金鑰
- **Headers**: `x-api-key: bright-edu-sync-2024-secure-key`
- **成功回應**:
  ```json
  {
    "success": true,
    "count": 5,
    "message": "成功同步 5 筆資料"
  }
  ```
- **錯誤回應**:
  ```json
  {
    "success": false,
    "error": "MISSING_API_KEY",
    "message": "需要提供 API 金鑰"
  }
  ```

## 🧪 測試命令

### PowerShell 測試

```powershell
# 健康檢查（無需 API 金鑰）
Invoke-RestMethod -Uri 'https://bright-edu-sync-156805168089.asia-east1.run.app/api/health'

# 同步測試（需要 API 金鑰）
Invoke-RestMethod -Uri 'https://bright-edu-sync-156805168089.asia-east1.run.app/api/sync-google-sheets' -Method POST -Headers @{ 'x-api-key' = 'bright-edu-sync-2024-secure-key' }

# 無認證測試（應該失敗）
Invoke-RestMethod -Uri 'https://bright-edu-sync-156805168089.asia-east1.run.app/api/sync-google-sheets' -Method POST
```

### curl 測試

```bash
# 健康檢查
curl https://bright-edu-sync-156805168089.asia-east1.run.app/api/health

# 同步測試
curl -X POST https://bright-edu-sync-156805168089.asia-east1.run.app/api/sync-google-sheets \
  -H "x-api-key: bright-edu-sync-2024-secure-key"

# 查詢參數方式
curl -X POST "https://bright-edu-sync-156805168089.asia-east1.run.app/api/sync-google-sheets?apikey=bright-edu-sync-2024-secure-key"
```

## 💻 前端整合

### JavaScript 範例

```javascript
const SYNC_SERVICE_URL =
  "https://bright-edu-sync-156805168089.asia-east1.run.app";
const API_KEY = "bright-edu-sync-2024-secure-key";

async function syncGoogleSheets() {
  try {
    const response = await fetch(`${SYNC_SERVICE_URL}/api/sync-google-sheets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
    });

    const data = await response.json();

    if (response.ok) {
      console.log("✅ 同步完成:", data);
      return data;
    } else {
      console.error("❌ 同步失敗:", data);
      throw new Error(data.message);
    }
  } catch (error) {
    console.error("❌ 同步服務請求失敗:", error);
    throw error;
  }
}

// 使用範例
async function handleSyncButton() {
  try {
    const result = await syncGoogleSheets();
    alert(`同步完成！${result.message}`);
  } catch (error) {
    alert(`同步失敗：${error.message}`);
  }
}
```

### React 整合範例

```jsx
import React, { useState } from "react";

function SyncButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [lastSync, setLastSync] = useState(null);

  const handleSync = async () => {
    setIsLoading(true);
    try {
      const result = await syncGoogleSheets();
      setLastSync(new Date());
      alert(`同步完成！${result.message}`);
    } catch (error) {
      alert(`同步失敗：${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleSync} disabled={isLoading}>
        {isLoading ? "同步中..." : "同步 Google Sheets"}
      </button>
      {lastSync && <p>上次同步：{lastSync.toLocaleString()}</p>}
    </div>
  );
}
```

## 🔧 部署管理

### 重新部署

```powershell
# 執行完整部署流程
cd c:\Users\princ\Documents\GitHub\bright-edu\scripts
.\deploy-cloudrun.ps1
```

### 查看服務狀態

```powershell
# 查看 Cloud Run 服務
gcloud run services list --platform managed --region asia-east1

# 查看服務詳細資訊
gcloud run services describe bright-edu-sync --platform managed --region asia-east1
```

### 查看日誌

```powershell
# 查看即時日誌
gcloud logs tail bright-edu-sync --project bright-edu-data

# 查看歷史日誌
gcloud logs read "resource.type=cloud_run_revision AND resource.labels.service_name=bright-edu-sync" --limit 50 --project bright-edu-data
```

## 🔒 安全考量

### API 金鑰管理

1. **當前金鑰**: `bright-edu-sync-2024-secure-key`
2. **更換金鑰**: 修改 `deploy-cloudrun.ps1` 中的 `SYNC_API_KEY` 環境變數
3. **金鑰保護**: 不要在前端代碼中硬編碼，建議使用環境變數或配置文件

### 存取控制

1. **服務層級**: Cloud Run 允許未認證存取
2. **應用層級**: API 金鑰保護敏感操作
3. **網路層級**: 可選擇性添加 Cloud Armor 或 VPC 限制

### 監控建議

1. **設定告警**: 監控異常存取或高頻率請求
2. **日誌分析**: 定期檢查存取日誌
3. **效能監控**: 關注同步操作的執行時間和成功率

## 📈 效能指標

### 當前效能

- **健康檢查**: ~52ms 回應時間
- **同步操作**: ~489ms 執行時間（無資料時）
- **記憶體限制**: 512Mi
- **超時設定**: 300 秒
- **最大實例**: 10 個

### 擴展建議

- 如果同步資料量增加，可考慮調整記憶體限制
- 監控超時情況，必要時調整超時設定
- 考慮實作批次處理以提高大量資料同步效率

## 🎯 下一步計畫

1. **管理介面整合**: 將同步功能整合到現有的管理介面
2. **監控設定**: 設定 Cloud Monitoring 告警
3. **備份策略**: 實作資料備份機制
4. **定期同步**: 考慮實作排程自動同步（如有需要）

---

## 📞 支援資訊

如果遇到任何問題，請檢查：

1. API 金鑰是否正確
2. 網路連接是否正常
3. Google Sheets 存取權限是否有效
4. 服務是否正常運行（健康檢查端點）

服務現已完全就緒，可以開始在生產環境中使用！
