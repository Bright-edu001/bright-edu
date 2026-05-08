import React, { useState, useEffect, useEffectEvent } from "react";
import {
  Table,
  Card,
  Tag,
  Button,
  Space,
  Modal,
  Form,
  Select,
  message,
  Input,
  Tooltip,
  Popconfirm,
  Switch,
  InputNumber,
  Badge,
  Descriptions,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  ExportOutlined,
  SyncOutlined,
  ClearOutlined,
  ClockCircleOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
} from "@ant-design/icons";
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

const { Option } = Select;
const { TextArea } = Input;

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
  const [syncLoading, setSyncLoading] = useState(false);
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

  // 同步 Firestore 資料到 Google Sheets
  const handleSync = async () => {
    setSyncLoading(true);
    try {
      message.loading({
        content: "正在將 Firestore 資料同步到 Google Sheets...",
        key: "sync",
        duration: 0,
      });

      // 檢查管理員身份驗證（基於 localStorage）
      const isAuthenticated = localStorage.getItem("isAuthenticated");
      if (!isAuthenticated) {
        throw new Error("請先登入管理後台");
      }

      // 檢查服務健康狀態
      console.log("🔍 開始檢查同步服務健康狀態...");
      const healthCheck = await firestoreToSheetsSync.checkHealth();

      if (!healthCheck.success) {
        console.warn("⚠️ 同步服務健康檢查失敗:", healthCheck.error);

        // 在開發環境中，如果是網路相關錯誤，給予警告但繼續執行
        const isDevelopment =
          process.env.NODE_ENV === "development" ||
          window.location.hostname === "localhost";

        if (
          isDevelopment &&
          (healthCheck.error.includes("網路連接受限") ||
            healthCheck.error.includes("CORS") ||
            healthCheck.error.includes("Failed to fetch"))
        ) {
          console.warn(
            "🚧 開發環境檢測到網路限制，將繼續執行同步（可能會失敗）",
          );
          message.warning({
            content: "開發環境：跳過網路連接檢查",
            key: "sync",
            duration: 2,
          });
        } else {
          // 提供更具體的錯誤信息
          let errorMessage = "同步服務目前無法使用";
          if (healthCheck.error.includes("連接超時")) {
            errorMessage = "連接同步服務超時，請檢查網路連線";
          } else if (healthCheck.error.includes("ERR_CONNECTION_REFUSED")) {
            errorMessage = "無法連接到同步服務，服務可能暫時維護中";
          } else if (healthCheck.error) {
            errorMessage = `同步服務錯誤: ${healthCheck.error}`;
          }
          throw new Error(errorMessage);
        }
      } else {
        console.log("✅ 同步服務健康檢查通過，開始執行同步...");
      }

      // 執行從 Firestore 到 Google Sheets 的同步
      const result = await firestoreToSheetsSync.triggerManualSync();

      // 處理同步結果
      if (result.results.total === 0) {
        console.log("📝 Firestore 中沒有資料需要同步");
        message.success({
          content: "Firestore 中沒有資料需要同步",
          key: "sync",
          duration: 4,
        });
      } else if (result.results.success > 0) {
        console.log(
          `📤 成功同步 ${result.results.success} 筆資料到 Google Sheets`,
        );

        if (result.results.failed > 0) {
          message.warning({
            content: `同步完成！成功 ${result.results.success} 筆，失敗 ${result.results.failed} 筆`,
            key: "sync",
            duration: 6,
          });
        } else {
          message.success({
            content: `同步完成！成功將 ${result.results.success} 筆資料同步到 Google Sheets`,
            key: "sync",
            duration: 4,
          });
        }
      } else {
        console.log("⚠️ 同步過程中發生錯誤");
        message.error({
          content: result.message || "同步過程中發生錯誤",
          key: "sync",
          duration: 4,
        });
      }
    } catch (error) {
      console.error("同步 Firestore 到 Google Sheets 失敗:", error);
      message.error({
        content: error.message || "同步失敗，請檢查網路連線或聯絡系統管理員",
        key: "sync",
        duration: 4,
      });
    } finally {
      setSyncLoading(false);
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

  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      width: 100,
      sorter: (a, b) => a.name.localeCompare(b.name, "zh-TW"),
      showSorterTooltip: false,
    },
    {
      title: "信箱",
      dataIndex: "email",
      key: "email",
      width: 200,
      sorter: (a, b) => a.email.localeCompare(b.email),
      showSorterTooltip: false,
    },
    {
      title: "LINE ID",
      dataIndex: "lineId",
      key: "lineId",
      width: 120,
      sorter: (a, b) => {
        const aValue = a.lineId || "";
        const bValue = b.lineId || "";
        return aValue.localeCompare(bValue);
      },
      showSorterTooltip: false,
      render: (text) => text || "-",
    },
    {
      title: "訊息",
      dataIndex: "message",
      key: "message",
      ellipsis: {
        showTitle: false,
      },
      sorter: (a, b) => a.message.localeCompare(b.message, "zh-TW"),
      showSorterTooltip: false,
      render: (text) => (
        <Tooltip placement="topLeft" title={text}>
          {text}
        </Tooltip>
      ),
    },
    {
      title: "狀態",
      dataIndex: "status",
      key: "status",
      width: 100,
      sorter: (a, b) => {
        const statusOrder = { pending: 1, processing: 2, completed: 3 };
        return statusOrder[a.status] - statusOrder[b.status];
      },
      showSorterTooltip: false,
      render: (status) => (
        <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
      ),
    },
    {
      title: "建立時間",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,
      sorter: (a, b) => {
        const aTime = dayjs(a.createdAt);
        const bTime = dayjs(b.createdAt);
        return aTime.isBefore(bTime) ? -1 : aTime.isAfter(bTime) ? 1 : 0;
      },
      defaultSortOrder: "descend", // 預設按建立時間降序排列（最新的在前）
      showSorterTooltip: false,
      render: (date) => dayjs(date).format("MM/DD HH:mm"),
    },
    {
      title: "操作",
      key: "actions",
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
            size="small"
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            size="small"
          />
          <Popconfirm
            title="確定要刪除這筆資料嗎？"
            onConfirm={() => handleDelete(record.id)}
            okText="確定"
            cancelText="取消"
          >
            <Button type="text" danger icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="contact-forms-page">
      <Card
        title="聯絡表單管理"
        extra={
          <Space>
            <Select
              value={filters.status}
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, status: value }))
              }
              style={{ width: 120 }}
            >
              <Option value="all">全部狀態</Option>
              <Option value="pending">待處理</Option>
              <Option value="processing">處理中</Option>
              <Option value="completed">已完成</Option>
            </Select>
            <Button
              icon={<SyncOutlined />}
              onClick={handleSync}
              loading={syncLoading}
              type="primary"
            >
              同步到 Google Sheets
            </Button>
            <Tooltip
              title={
                autoSyncStatus?.enabled
                  ? `自動同步已啟用，每 ${autoSyncStatus.intervalHours} 小時執行一次`
                  : "設定自動同步功能"
              }
            >
              <Badge
                dot={autoSyncStatus?.enabled}
                color={autoSyncStatus?.enabled ? "green" : "gray"}
              >
                <Button
                  icon={
                    autoSyncStatus?.enabled ? (
                      <PauseCircleOutlined />
                    ) : (
                      <ClockCircleOutlined />
                    )
                  }
                  onClick={handleOpenAutoSync}
                  type={autoSyncStatus?.enabled ? "default" : "dashed"}
                >
                  自動同步
                </Button>
              </Badge>
            </Tooltip>
            <Popconfirm
              title="批量刪除"
              description={`確定要刪除選中的 ${selectedRowKeys.length} 筆資料嗎？此操作無法復原。`}
              onConfirm={handleBatchDelete}
              okText="確定刪除"
              cancelText="取消"
              okType="danger"
              disabled={selectedRowKeys.length === 0}
            >
              <Button
                icon={<DeleteOutlined />}
                disabled={selectedRowKeys.length === 0}
                loading={batchDeleteLoading}
                danger
              >
                刪除選中項目 ({selectedRowKeys.length})
              </Button>
            </Popconfirm>
            <Popconfirm
              title="清除所有資料"
              description={`確定要清除所有 ${forms.length} 筆聯絡表單資料嗎？此操作無法復原。`}
              onConfirm={handleClearAll}
              okText="確定清除"
              cancelText="取消"
              okType="danger"
            >
              <Button
                icon={<ClearOutlined />}
                disabled={forms.length === 0}
                danger
              >
                清除所有資料
              </Button>
            </Popconfirm>
            <Button
              icon={<ExportOutlined />}
              onClick={handleExport}
              disabled={forms.length === 0}
            >
              匯出 CSV
            </Button>
            <Button
              icon={<ReloadOutlined />}
              onClick={() => window.location.reload()}
            >
              重新整理
            </Button>
          </Space>
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

      {/* 查看詳細資料 Modal */}
      <Modal
        title="聯絡表單詳細資料"
        open={isViewModalVisible}
        onCancel={() => setIsViewModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsViewModalVisible(false)}>
            關閉
          </Button>,
        ]}
        width={600}
      >
        {selectedForm && (
          <div>
            <p>
              <strong>姓名：</strong> {selectedForm.name}
            </p>
            <p>
              <strong>信箱：</strong> {selectedForm.email}
            </p>
            <p>
              <strong>LINE ID：</strong> {selectedForm.lineId || "未提供"}
            </p>
            <p>
              <strong>訊息內容：</strong>
            </p>
            <p
              style={{
                background: "#f5f5f5",
                padding: "10px",
                borderRadius: "4px",
                whiteSpace: "pre-wrap",
              }}
            >
              {selectedForm.message}
            </p>
            <p>
              <strong>狀態：</strong>
              <Tag color={getStatusColor(selectedForm.status)}>
                {getStatusText(selectedForm.status)}
              </Tag>
            </p>
            <p>
              <strong>建立時間：</strong>
              {dayjs(selectedForm.createdAt).format("YYYY-MM-DD HH:mm:ss")}
            </p>
            <p>
              <strong>來源：</strong> {selectedForm.source || "未知"}
            </p>
            {selectedForm.metadata && (
              <div>
                <p>
                  <strong>來源網址：</strong> {selectedForm.metadata.url}
                </p>
                <p>
                  <strong>推薦頁面：</strong>{" "}
                  {selectedForm.metadata.referrer || "直接訪問"}
                </p>
              </div>
            )}
            {selectedForm.notes && (
              <p>
                <strong>備註：</strong> {selectedForm.notes}
              </p>
            )}
          </div>
        )}
      </Modal>

      {/* 編輯狀態 Modal */}
      <Modal
        title="更新處理狀態"
        open={isEditModalVisible}
        onOk={() => form.submit()}
        onCancel={() => {
          setIsEditModalVisible(false);
          form.resetFields();
        }}
        okText="更新"
        cancelText="取消"
      >
        <Form form={form} layout="vertical" onFinish={handleUpdateStatus}>
          <Form.Item
            name="status"
            label="處理狀態"
            rules={[{ required: true, message: "請選擇狀態" }]}
          >
            <Select>
              <Option value="pending">待處理</Option>
              <Option value="processing">處理中</Option>
              <Option value="completed">已完成</Option>
            </Select>
          </Form.Item>
          <Form.Item name="notes" label="備註">
            <TextArea rows={4} placeholder="可以記錄處理過程或其他備註..." />
          </Form.Item>
        </Form>
      </Modal>

      {/* 自動同步設定 Modal */}
      <Modal
        title="自動同步設定"
        open={isAutoSyncModalVisible}
        onOk={() => autoSyncForm.submit()}
        onCancel={handleCancelAutoSync}
        okText="保存設定"
        cancelText="取消"
        width={500}
      >
        <Form
          form={autoSyncForm}
          layout="vertical"
          onFinish={handleSaveAutoSync}
          initialValues={{
            enabled: false,
            intervalHours: 3,
          }}
        >
          <Form.Item
            name="enabled"
            valuePropName="checked"
            label="啟用自動同步"
          >
            <Switch
              checkedChildren={<PlayCircleOutlined />}
              unCheckedChildren={<PauseCircleOutlined />}
            />
          </Form.Item>

          <Form.Item
            name="intervalHours"
            label="同步間隔（小時）"
            rules={[
              { required: true, message: "請設定同步間隔" },
              {
                type: "number",
                min: 1,
                max: 24,
                message: "請輸入 1-24 小時之間的數值",
              },
            ]}
          >
            <InputNumber
              min={1}
              max={24}
              step={1}
              style={{ width: "100%" }}
              placeholder="每幾小時執行一次同步"
            />
          </Form.Item>

          {autoSyncStatus && (
            <div
              style={{
                marginTop: 16,
                padding: 12,
                backgroundColor: "#f5f5f5",
                borderRadius: 6,
              }}
            >
              <Descriptions title="目前狀態" size="small" column={1}>
                <Descriptions.Item label="狀態">
                  <Badge
                    status={autoSyncStatus.enabled ? "processing" : "default"}
                    text={autoSyncStatus.enabled ? "運行中" : "已停止"}
                  />
                </Descriptions.Item>
                {autoSyncStatus.enabled && (
                  <>
                    <Descriptions.Item label="同步間隔">
                      每 {autoSyncStatus.intervalHours} 小時
                    </Descriptions.Item>
                    {autoSyncStatus.lastSyncTime && (
                      <Descriptions.Item label="上次同步">
                        {new Date(autoSyncStatus.lastSyncTime).toLocaleString()}
                      </Descriptions.Item>
                    )}
                    {autoSyncStatus.nextSyncTime && (
                      <Descriptions.Item label="下次同步">
                        {new Date(autoSyncStatus.nextSyncTime).toLocaleString()}
                      </Descriptions.Item>
                    )}
                    {autoSyncStatus.retryCount > 0 && (
                      <Descriptions.Item label="重試次數">
                        <Badge
                          count={autoSyncStatus.retryCount}
                          color="orange"
                          style={{ backgroundColor: "#ff7875" }}
                        />
                        / {autoSyncStatus.maxRetries}
                      </Descriptions.Item>
                    )}
                  </>
                )}
              </Descriptions>
            </div>
          )}

          <div
            style={{
              marginTop: 16,
              padding: 12,
              backgroundColor: "#e6f7ff",
              borderRadius: 6,
            }}
          >
            <h4 style={{ margin: "0 0 8px 0", color: "#1890ff" }}>
              💡 功能說明
            </h4>
            <ul
              style={{
                margin: 0,
                paddingLeft: 20,
                fontSize: "14px",
                color: "#666",
              }}
            >
              <li>
                自動同步會在設定的時間間隔內將 Firestore 資料同步到 Google
                Sheets
              </li>
              <li>如果連續失敗 3 次，自動同步會暫停，需要重新啟用</li>
              <li>建議設定 3-24 小時的間隔，避免過於頻繁的同步</li>
              <li>即使啟用自動同步，您仍可以隨時手動執行同步</li>
            </ul>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default ContactFormsPage;
