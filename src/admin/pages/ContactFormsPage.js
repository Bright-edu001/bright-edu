import React, { useState, useEffect } from "react";
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
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  ExportOutlined,
  SyncOutlined,
  ClearOutlined,
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
import { db } from "../../config/firebaseConfig";
import { syncWithRetry, checkSyncServiceHealth } from "../../config/syncConfig";
import dayjs from "dayjs";

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

  // 即時監聽 Firestore 資料
  useEffect(() => {
    let unsubscribe;

    const setupListener = () => {
      let q = query(
        collection(db, "contact_forms"),
        orderBy("createdAt", "desc"),
        limit(100) // 限制最近 100 筆
      );

      // 根據篩選條件調整查詢
      if (filters.status !== "all") {
        q = query(
          collection(db, "contact_forms"),
          where("status", "==", filters.status),
          orderBy("createdAt", "desc"),
          limit(100)
        );
      }

      unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const formsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date(),
            updatedAt: doc.data().updatedAt?.toDate() || new Date(),
          }));
          setForms(formsData);
          setLoading(false);
        },
        (error) => {
          console.error("監聽 Firestore 資料時發生錯誤:", error);
          message.error("載入資料失敗");
          setLoading(false);
        }
      );
    };

    setupListener();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [filters.status]);

  // 狀態顏色對應
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "orange";
      case "processing":
        return "blue";
      case "completed":
        return "green";
      default:
        return "default";
    }
  };

  // 狀態文字對應
  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "待處理";
      case "processing":
        return "處理中";
      case "completed":
        return "已完成";
      default:
        return status;
    }
  };

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

  // 匯出資料
  const handleExport = () => {
    const csvData = forms.map((form) => ({
      姓名: form.name,
      信箱: form.email,
      "LINE ID": form.lineId || "",
      訊息: form.message,
      狀態: getStatusText(form.status),
      建立時間: dayjs(form.createdAt).format("YYYY-MM-DD HH:mm:ss"),
      來源: form.source || "",
    }));

    const csvContent = [
      Object.keys(csvData[0]).join(","),
      ...csvData.map((row) =>
        Object.values(row)
          .map((value) => `"${value}"`)
          .join(",")
      ),
    ].join("\n");

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
        deleteDoc(doc(db, "contact_forms", form.id))
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

  // 同步 Google Sheets 資料
  const handleSync = async () => {
    setSyncLoading(true);
    try {
      message.loading({
        content: "正在從 Google Sheets 同步資料...",
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
      const healthCheck = await checkSyncServiceHealth();

      if (!healthCheck.success) {
        console.warn("⚠️ 同步服務健康檢查失敗:", healthCheck.error);
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

      console.log("✅ 同步服務健康檢查通過，開始執行同步...");

      // 執行同步（帶重試機制）
      const result = await syncWithRetry();

      // 處理同步結果
      if (result.count === 0) {
        // 當 Google Sheets 為空時，檢查是否需要清除現有資料
        if (forms.length > 0) {
          // 如果本地有資料但 Google Sheets 為空，提示用戶可能需要清除
          console.log("⚠️ Google Sheets 為空，但本地仍有資料");
          message.warning({
            content: `Google Sheets 為空，但本地仍有 ${forms.length} 筆資料。如需清除本地資料以同步空白狀態，請使用「清除所有資料」按鈕。`,
            key: "sync",
            duration: 8,
          });
        } else {
          // 本地也沒有資料
          console.log("� 同步完成，無資料變更");
          message.success({
            content: result.message || "同步完成，資料已是最新狀態",
            key: "sync",
            duration: 4,
          });
        }
      } else if (result.count > 0) {
        // 如果有新增資料，Firestore 監聽器會自動更新 UI
        console.log(
          `📝 同步完成，新增 ${result.count} 筆資料，資料將自動更新...`
        );
        message.success({
          content: `同步完成！新增 ${result.count} 筆資料`,
          key: "sync",
          duration: 4,
        });
      } else {
        // 其他情況
        console.log("📋 同步完成，無資料變更");
        message.success({
          content: result.message || "同步完成，資料已是最新狀態",
          key: "sync",
          duration: 4,
        });
      }
    } catch (error) {
      console.error("同步 Google Sheets 失敗:", error);
      message.error({
        content: error.message || "同步失敗，請檢查網路連線或聯絡系統管理員",
        key: "sync",
        duration: 4,
      });
    } finally {
      setSyncLoading(false);
    }
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
              同步 Google Sheets
            </Button>
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
    </div>
  );
}

export default ContactFormsPage;
