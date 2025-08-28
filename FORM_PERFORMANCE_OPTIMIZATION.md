# 表單送出效能優化建議

## 🚀 已實施的改進

### 1. 詳細的效能記錄系統

- ✅ 已在 `useFormSubmit.js`、`contactService.js` 和 `request.js` 中添加詳細的時間記錄
- ✅ 記錄表單送出的每個階段時間：驗證、Google Sheets 儲存、Firestore 儲存、網路請求
- ✅ 提供毫秒級和秒級的時間測量
- ✅ 在生產環境也會記錄重要的效能指標

### 2. 效能分析工具

- ✅ 自動分析表單送出時間，超過 3 秒會警告，超過 5 秒會標記為過長
- ✅ 分別記錄 Google Sheets 和 Firestore 的儲存時間
- ✅ 記錄網路請求的各種嘗試方式時間

## 📊 目前的效能瓶頸分析

根據代碼分析，可能的效能瓶頸包括：

### 1. 多重網路請求重試

**問題**: `request.js` 中的 POST 請求會依序嘗試三種方式

- FormData + no-cors
- URLSearchParams + no-cors
- JSON + no-cors

**影響**: 如果前兩種方式失敗，會累積延遲時間

### 2. 同步但依序的 Google Sheets 請求

**問題**: Google Sheets 儲存會先嘗試 POST，失敗後再嘗試 GET
**影響**: 雙重請求可能導致延遲

### 3. Firebase Firestore 寫入延遲

**問題**: serverTimestamp() 需要與 Firebase 伺服器同步
**影響**: 網路延遲會影響寫入速度

## ⚡ 短期優化建議（立即可實施）

### 1. 優化網路請求策略

```javascript
// 建議：並行嘗試多種 POST 方式，而不是依序嘗試
const promises = [
  fetch(url, { method: "POST", mode: "no-cors", body: formData }),
  fetch(url, { method: "POST", mode: "no-cors", body: urlParams }),
  fetch(url, { method: "POST", mode: "no-cors", body: JSON.stringify(data) }),
];

const result = await Promise.race(promises);
```

### 2. 預先快取 Firebase 連接

```javascript
// 在應用啟動時預先初始化 Firebase 連接
import { connectFirestoreEmulator, enableNetwork } from "firebase/firestore";

// 確保 Firebase 連接是熱的
enableNetwork(db);
```

### 3. 減少 Firestore 寫入資料量

```javascript
// 移除不必要的 metadata
const contactData = {
  name: formData.name.trim(),
  email: formData.email.trim().toLowerCase(),
  lineId: formData.lineId?.trim() || "",
  message: formData.message.trim(),
  source: "website_contact_form",
  status: "pending",
  createdAt: serverTimestamp(),
  // 移除 updatedAt（與 createdAt 相同）
  // 簡化 metadata
  metadata: {
    url: window.location.href,
  },
};
```

### 4. 實施請求去重

```javascript
// 防止用戶重複快速點擊送出
let submitPromise = null;

const handleSubmit = async (e) => {
  if (submitPromise) {
    return submitPromise; // 返回現有的提交 Promise
  }

  submitPromise = performSubmit(e);
  try {
    return await submitPromise;
  } finally {
    submitPromise = null;
  }
};
```

## 🚀 中期優化建議（需要更多開發）

### 1. 實施請求快取

```javascript
// 在 contactService 中實施快取機制
class ContactService {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 60000; // 1分鐘快取
  }

  async saveToBoth(formData, googleSheetsRequest) {
    const cacheKey = JSON.stringify(formData);

    // 檢查快取
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.result;
      }
    }

    // 執行儲存...
  }
}
```

### 2. 使用 Service Worker 背景處理

```javascript
// 註冊 Service Worker 來處理表單送出
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/form-worker.js");

  // 將表單資料傳送給 Service Worker
  navigator.serviceWorker.controller.postMessage({
    type: "SUBMIT_FORM",
    data: formData,
  });
}
```

### 3. 實施批次處理

```javascript
// 將多個表單送出批次處理
class FormBatchProcessor {
  constructor() {
    this.queue = [];
    this.processing = false;
    this.batchSize = 5;
    this.batchTimeout = 2000; // 2秒
  }

  async addToQueue(formData) {
    this.queue.push(formData);

    if (this.queue.length >= this.batchSize || !this.processing) {
      this.processBatch();
    }
  }
}
```

### 4. 使用 IndexedDB 本地儲存

```javascript
// 先儲存到本地，再同步到遠端
import { openDB } from "idb";

const dbPromise = openDB("FormStorage", 1, {
  upgrade(db) {
    db.createObjectStore("forms", { keyPath: "id", autoIncrement: true });
  },
});

// 立即儲存到本地
await db.add("forms", formData);

// 背景同步到遠端
syncToRemote();
```

## 🎯 長期優化建議（需要架構改變）

### 1. 使用 Firebase Functions

將 Google Sheets 整合移到後端，減少前端網路請求

### 2. 實施 GraphQL

使用 GraphQL 來優化資料傳輸和減少請求數量

### 3. 使用 CDN 和邊緣運算

將表單處理邏輯部署到邊緣節點，減少延遲

### 4. 實施漸進式網頁應用 (PWA)

使用 PWA 技術來實現離線支援和背景同步

## 📈 效能監控和測量

### 監控指標

- 表單送出總時間
- Google Sheets 回應時間
- Firestore 寫入時間
- 網路請求重試次數
- 成功率

### 效能目標

- 🎯 總送出時間 < 2 秒（目標）
- 🎯 總送出時間 < 3 秒（可接受）
- ⚠️ 總送出時間 > 5 秒（需要優化）

### 測量工具

已實施的日誌記錄會在瀏覽器開發者工具中顯示：

- `📝 [FORM_SUBMIT]` - 表單送出相關日誌
- `🚀 [PERFORMANCE]` - 效能相關日誌

## 🔧 立即實施的程式碼片段

### 1. 請求去重實施

```javascript
// 在 useFormSubmit.js 中添加
const [submitPromise, setSubmitPromise] = useState(null);

const handleSubmit = async (e) => {
  if (submitPromise) {
    logger.warn("表單正在送出中，忽略重複請求");
    return;
  }

  const promise = performSubmit(e);
  setSubmitPromise(promise);

  try {
    return await promise;
  } finally {
    setSubmitPromise(null);
  }
};
```

### 2. 簡化 Firestore 資料

```javascript
// 在 contactService.js 中簡化
const contactData = {
  name: formData.name.trim(),
  email: formData.email.trim().toLowerCase(),
  lineId: formData.lineId?.trim() || "",
  message: formData.message.trim(),
  source: "website_contact_form",
  status: "pending",
  createdAt: serverTimestamp(),
  url: window.location.href, // 直接欄位而不是 metadata 物件
};
```

## 📝 實施計劃

### Week 1: 立即優化

- [x] 實施詳細效能記錄
- [ ] 添加請求去重
- [ ] 簡化 Firestore 資料結構
- [ ] 優化網路請求策略

### Week 2-4: 中期優化

- [ ] 實施請求快取
- [ ] 添加 Service Worker
- [ ] 實施批次處理
- [ ] 本地儲存備份

### Month 2-3: 長期優化

- [ ] Firebase Functions 整合
- [ ] GraphQL 實施
- [ ] PWA 功能
- [ ] CDN 邊緣運算

透過這些優化措施，預期可以將表單送出時間從目前的 3-5 秒降低到 1-2 秒。
