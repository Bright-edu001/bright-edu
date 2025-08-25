# Firestore 安全規則設定

為了保護聯絡表單資料，請在 Firebase Console 的 Firestore Database > Rules 中設定以下安全規則：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 聯絡表單集合的安全規則
    match /contact_forms/{document} {
      // 允許任何人新增聯絡表單（網站前端提交）
      allow create: if true;

      // 只允許已驗證的管理員讀取、更新、刪除
      allow read, update, delete: if request.auth != null;
    }

    // 其他集合的預設規則（根據需要調整）
    match /{document=**} {
      // 預設拒絕所有存取
      allow read, write: if false;
    }
  }
}
```

## 規則說明

### contact_forms 集合

- **create**: 允許任何人新增 - 這樣網站訪客可以提交聯絡表單
- **read, update, delete**: 只允許已驗證的用戶 - 保護敏感的聯絡資訊

### 安全考量

1. **最小權限原則**: 只給予必要的存取權限
2. **資料驗證**: 可以加入額外的資料驗證規則
3. **速率限制**: Firebase 會自動提供一定程度的濫用保護

### 進階安全規則（可選）

如果需要更嚴格的安全控制，可以使用以下規則：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /contact_forms/{document} {
      // 新增聯絡表單時進行資料驗證
      allow create: if isValidContactForm();

      // 只允許特定管理員帳號存取
      allow read, update, delete: if isAdmin();
    }

    // 輔助函數：驗證聯絡表單資料格式
    function isValidContactForm() {
      let data = request.resource.data;
      return data.keys().hasAll(['name', 'email', 'message']) &&
             data.name is string && data.name.size() > 0 &&
             data.email is string && data.email.matches('.*@.*\\..*') &&
             data.message is string && data.message.size() > 0;
    }

    // 輔助函數：檢查是否為管理員
    function isAdmin() {
      return request.auth != null &&
             request.auth.uid in ['admin_uid_1', 'admin_uid_2']; // 替換為實際的管理員 UID
    }
  }
}
```

## 設定步驟

1. 開啟 [Firebase Console](https://console.firebase.google.com/)
2. 選擇您的專案
3. 點擊左側選單的「Firestore Database」
4. 點擊「規則」標籤
5. 將上述規則複製貼上到編輯器中
6. 點擊「發布」

## 測試安全規則

建議在發布前使用 Firebase 的規則模擬器進行測試：

1. 在 Firebase Console 的規則頁面點擊「模擬器」
2. 測試不同情境的存取權限
3. 確認規則符合預期後再發布

## 注意事項

- 安全規則的變更可能需要幾分鐘才會生效
- 建議定期檢查和更新安全規則
- 考慮設定 Firebase App Check 以進一步防護
