import React, { useState, useEffect, useEffectEvent } from "react";
import {
  Table,
  Card,
  Form,
  message,
} from "antd";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  where,
  limit,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../config/firebaseCore";
import firestoreToSheetsSync from "../../services/firestoreToSheetsSync";
import dayjs from "dayjs";
import {
  buildCsvContent,
  getStatusColor,
  getStatusText,
} from "./ContactFormsPage.helpers";
import useContactFormsManualSync from "./useContactFormsManualSync";
import ContactFormsToolbar from "./ContactFormsToolbar";
import { createContactFormsColumns } from "./ContactFormsTableColumns";
import ContactFormDetailModal from "./ContactFormDetailModal";
import ContactFormEditModal from "./ContactFormEditModal";
import ContactFormAutoSyncModal from "./ContactFormAutoSyncModal";

function ContactFormsPage() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedForm, setSelectedForm] = useState(null);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [filters, setFilters] = useState({
    status: "all",
  });
  const { syncLoading, handleSync } = useContactFormsManualSync();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [batchDeleteLoading, setBatchDeleteLoading] = useState(false);
  const [autoSyncStatus, setAutoSyncStatus] = useState(null);
  const [isAutoSyncModalVisible, setIsAutoSyncModalVisible] = useState(false);
  const [autoSyncForm] = Form.useForm();

  const handleSnapshotData = useEffectEvent((snapshot) => {
    const formsData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    }));
    setForms(formsData);
    setLoading(false);
  });

  const handleSnapshotError = useEffectEvent((error) => {
    console.error("監聽 Firestore 資料時發生錯誤:", error);
    message.error("載入資料失敗");
    setLoading(false);
  });

  const loadAutoSyncStatus = useEffectEvent(() => {
    const status = firestoreToSheetsSync.getAutoSyncStatus();
    setAutoSyncStatus(status);
  });

  // 即時監聽 Firestore 資料（等待 Auth 狀態還原後再建立監聽器）
  useEffect(() => {
    let unsubscribe;
    let unsubscribeAuth;

    const setupListener = () => {
      let q = query(
        collection(db, "contact_forms"),
        orderBy("createdAt", "desc"),
        limit(100), // 限制最近 100 筆
      );

      // 根據篩選條件調整查詢
      if (filters.status !== "all") {
        q = query(
          collection(db, "contact_forms"),
          where("status", "==", filters.status),
          orderBy("createdAt", "desc"),
          limit(100),
        );
      }

      unsubscribe = onSnapshot(q, handleSnapshotData, handleSnapshotError);
    };

    // 等待 Auth 狀態確認後再啟動 Firestore listener
    unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setupListener();
      } else {
        setLoading(false);
      }
    });

    return () => {
      if (unsubscribeAuth) unsubscribeAuth();
      if (unsubscribe) unsubscribe();
    };
  }, [filters.status]);

  useEffect(() => {
    // 初次載入
    loadAutoSyncStatus();

    // 每分鐘更新一次狀態顯示
    const statusInterval = setInterval(loadAutoSyncStatus, 60000);

    return () => {
      clearInterval(statusInterval);
    };
  }, []);


  // 查看詳細資料
  const handleView = (record) => {
    setSelectedForm(record);
    setIsViewModalVisible(true);
  };

  // 編輯狀態
  const handleEdit = (record) => {
    setSelectedForm(record);
    form.setFieldsValue({
      status: record.status,
      notes: record.notes || "",
    });
    setIsEditModalVisible(true);
  };

  // 更新狀態
  const handleUpdateStatus = async (values) => {
    try {
      await updateDoc(doc(db, "contact_forms", selectedForm.id), {
        status: values.status,
        notes: values.notes,
        updatedAt: new Date(),
      });
      message.success("狀態更新成功");
      setIsEditModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("更新狀態失敗:", error);
      message.error("更新失敗");
    }
  };

  // 刪除資料
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "contact_forms", id));
      message.success("刪除成功");
    } catch (error) {
      console.error("刪除失敗:", error);
      message.error("刪除失敗");
    }
  };

  // 批量刪除功能
  const handleBatchDelete = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning("請先選擇要刪除的項目");
      return;
    }

    setBatchDeleteLoading(true);
    try {
      const deletePromises = selectedRowKeys.map((id) =>
        deleteDoc(doc(db, "contact_forms", id)),
      );

      await Promise.all(deletePromises);

      message.success(`成功刪除 ${selectedRowKeys.length} 筆資料`);
      setSelectedRowKeys([]); // 清空選擇
    } catch (error) {
      console.error("批量刪除失敗:", error);
      message.error("批量刪除失敗");
    } finally {
      setBatchDeleteLoading(false);
    }
  };

  // 匯出資料
  const handleExport = () => {
    if (forms.length === 0) {
      message.info("沒有資料可匯出");
      return;
    }

    const csvData = forms.map((form) => ({
      姓名: form.name,
      信箱: form.email,
      "LINE ID": form.lineId || "",
      訊息: form.message,
      狀態: getStatusText(form.status),
      建立時間: dayjs(form.createdAt).format("YYYY-MM-DD HH:mm:ss"),
      來源: form.source || "",
    }));

    const csvContent = buildCsvContent(csvData);

    if (!csvContent) {
      message.info("沒有資料可匯出");
      return;
    }

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `contact_forms_${dayjs().format("YYYY-MM-DD")}.csv`;
    link.click();
  };

  // 清除所有聯絡表單資料
  const handleClearAll = async () => {
    if (forms.length === 0) {
      message.info("沒有資料需要清除");
      return;
    }

    try {
      message.loading({
        content: `正在清除 ${forms.length} 筆聯絡表單資料...`,
        key: "clear",
        duration: 0,
      });

      // 批次刪除所有聯絡表單
      const deletePromises = forms.map((form) =>
        deleteDoc(doc(db, "contact_forms", form.id)),
      );

      await Promise.all(deletePromises);

      message.success({
        content: `已成功清除 ${forms.length} 筆聯絡表單資料`,
        key: "clear",
        duration: 4,
      });

      console.log(`🗑️ 已清除 ${forms.length} 筆聯絡表單資料`);
    } catch (error) {
      console.error("清除資料失敗:", error);
      message.error({
        content: "清除資料失敗，請稍後再試",
        key: "clear",
        duration: 4,
      });
    }
  };

  // 開啟自動同步設定對話框
  const handleOpenAutoSync = () => {
    const status = firestoreToSheetsSync.getAutoSyncStatus();
    autoSyncForm.setFieldsValue({
      enabled: status.enabled,
      intervalHours: status.intervalHours,
    });
    setIsAutoSyncModalVisible(true);
  };

  // 保存自動同步設定
  const handleSaveAutoSync = async (values) => {
    try {
      if (values.enabled) {
        const success = firestoreToSheetsSync.startAutoSync(
          values.intervalHours,
        );
        if (success) {
          message.success(
            `自動同步已啟動，每 ${values.intervalHours} 小時執行一次`,
          );
        } else {
          message.error("啟動自動同步失敗");
          return;
        }
      } else {
        firestoreToSheetsSync.stopAutoSync();
        message.success("自動同步已停止");
      }

      // 更新狀態
      const newStatus = firestoreToSheetsSync.getAutoSyncStatus();
      setAutoSyncStatus(newStatus);
      setIsAutoSyncModalVisible(false);
    } catch (error) {
      console.error("設定自動同步失敗:", error);
      message.error("設定自動同步失敗");
    }
  };

  // 取消自動同步設定
  const handleCancelAutoSync = () => {
    setIsAutoSyncModalVisible(false);
    autoSyncForm.resetFields();
  };

  const handleStatusFilterChange = (value) => {
    setFilters((prev) => ({ ...prev, status: value }));
  };

  const handleReload = () => {
    window.location.reload();
  };

  const columns = createContactFormsColumns({
    onView: handleView,
    onEdit: handleEdit,
    onDelete: handleDelete,
    getStatusColor,
    getStatusText,
  });

  return (
    <div className="contact-forms-page">
      <Card
        title="聯絡表單管理"
        extra={
          <ContactFormsToolbar
            statusFilter={filters.status}
            onStatusFilterChange={handleStatusFilterChange}
            syncLoading={syncLoading}
            onSync={handleSync}
            autoSyncStatus={autoSyncStatus}
            onOpenAutoSync={handleOpenAutoSync}
            selectedRowCount={selectedRowKeys.length}
            batchDeleteLoading={batchDeleteLoading}
            onBatchDelete={handleBatchDelete}
            formsCount={forms.length}
            onClearAll={handleClearAll}
            onExport={handleExport}
            onReload={handleReload}
          />
        }
      >
        <Table
          columns={columns}
          dataSource={forms}
          rowKey="id"
          loading={loading}
          rowSelection={{
            selectedRowKeys,
            onChange: setSelectedRowKeys,
            preserveSelectedRowKeys: true,
          }}
          pagination={{
            pageSize: 20,
            showSizeChanger: true,
            showTotal: (total, range) =>
              `共 ${total} 筆資料，顯示第 ${range[0]}-${range[1]} 筆`,
          }}
          scroll={{ x: 1000 }}
          sortDirections={["ascend", "descend"]}
          showSorterTooltip={{
            target: "sorter-icon",
          }}
        />
      </Card>

      <ContactFormDetailModal
        open={isViewModalVisible}
        contactForm={selectedForm}
        onClose={() => setIsViewModalVisible(false)}
        getStatusColor={getStatusColor}
        getStatusText={getStatusText}
      />

      <ContactFormEditModal
        open={isEditModalVisible}
        form={form}
        onSubmit={handleUpdateStatus}
        onCancel={() => {
          setIsEditModalVisible(false);
          form.resetFields();
        }}
      />

      <ContactFormAutoSyncModal
        open={isAutoSyncModalVisible}
        form={autoSyncForm}
        autoSyncStatus={autoSyncStatus}
        onSubmit={handleSaveAutoSync}
        onCancel={handleCancelAutoSync}
      />
    </div>
  );
}

export default ContactFormsPage;
