import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  Space,
  Button,
  Modal,
  Form,
  message,
  Tag,
  Popconfirm,
  Card,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  getAllArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  updateArticlesOrder,
} from "../data/blogApi";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { app } from "../../config/firebaseCore";
import logger from "../../utils/logger";
import NewsEditor from "../components/NewsEditor";
import EnrollmentEditor from "../components/EnrollmentEditor";
import StructuredContentViewer from "../components/StructuredContentViewer";
import NewsContentViewer from "../components/NewsContentViewer";

// 解構 Ant Design 組件
const { Title } = Typography;

// 初始化 Firebase Storage
const storage = getStorage(app);

// 文章管理頁面組件
const ArticlesPage = () => {
  // 文章列表狀態
  const [articles, setArticles] = useState([]);
  // 新增/編輯模態框顯示狀態
  const [isModalVisible, setIsModalVisible] = useState(false);
  // 選擇文章類型模態框（新增文章時）
  const [isTypeModalVisible, setIsTypeModalVisible] = useState(false);
  // 查看模態框顯示狀態
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  // 當前編輯的文章
  const [editingArticle, setEditingArticle] = useState(null);
  // 當前查看的文章
  const [viewingArticle, setViewingArticle] = useState(null);
  // 表單實例
  const [form] = Form.useForm();

  // 組件掛載時獲取所有文章
  useEffect(() => {
    getAllArticles().then(setArticles);
  }, []);

  // 排序相關狀態
  const [isSavingOrder, setIsSavingOrder] = useState(false);
  const [orderDirty, setOrderDirty] = useState(false);

  // 重新排序文章列表
  const reorder = (fromIndex, toIndex) => {
    setArticles((prev) => {
      const next = [...prev];
      // 從原位置移除項目
      const [moved] = next.splice(fromIndex, 1);
      // 插入到新位置
      next.splice(toIndex, 0, moved);
      // 重新給 order 序號（使用 index）
      return next.map((a, i) => ({ ...a, order: i }));
    });
    // 標記排序已變更
    setOrderDirty(true);
  };

  // 儲存排序到後端
  const handleSaveOrder = async () => {
    try {
      setIsSavingOrder(true);
      await updateArticlesOrder(
        articles.map((a, i) => ({
          ...a,
          order: typeof a.order === "number" ? a.order : i,
        })),
      );
      message.success("排序已儲存");
      setOrderDirty(false);
    } catch (e) {
      message.error("儲存排序失敗");
    } finally {
      setIsSavingOrder(false);
    }
  };

  // 表格欄位定義
  const columns = [
    {
      title: "排序",
      dataIndex: "order",
      width: 70,
      render: (_, __, index) => (
        <span style={{ cursor: "grab", userSelect: "none" }}>
          ☰ {index + 1}
        </span>
      ),
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 60,
      sorter: (a, b) =>
        (a.id ?? a.docId ?? "")
          .toString()
          .localeCompare((b.id ?? b.docId ?? "").toString()),
      render: (_, record) => record.id ?? record.docId ?? "—",
    },
    {
      title: "標題",
      dataIndex: "title",
      key: "title",
      width: 300,
      ellipsis: true,
    },
    {
      title: "摘要",
      dataIndex: "excerpt",
      key: "excerpt",
      ellipsis: true,
      width: 200,
    },
    {
      title: "類型",
      dataIndex: "type",
      key: "type",
      width: 100,
      filters: [
        { text: "招生資訊", value: "enrollment" },
        { text: "最新消息", value: "article" },
      ],
      onFilter: (value, record) => record.type === value,
      render: (type) => (
        <Tag color={type === "article" ? "blue" : "green"}>
          {type === "article" ? "最新消息" : "招生資訊"}
        </Tag>
      ),
    },
    {
      title: "分類",
      dataIndex: "category",
      key: "category",
      width: 100,
      filters: [
        { text: "招生資訊", value: "enrollment" },
        { text: "新聞", value: "news" },
      ],
      onFilter: (value, record) => record.category === value,
      render: (category) => (
        <Tag color={category === "news" ? "purple" : "orange"}>
          {category === "news" ? "新聞" : "招生資訊"}
        </Tag>
      ),
    },
    {
      title: "縮圖",
      dataIndex: "thumbnail",
      key: "thumbnail",
      width: 80,
      render: (thumbnail) => (
        <img
          src={thumbnail}
          alt="縮圖"
          style={{
            width: 50,
            height: 50,
            objectFit: "cover",
            borderRadius: 4,
            cursor: "pointer",
          }}
          onError={(e) => {
            try {
              // eslint-disable-next-line no-console
              console.warn("Thumbnail failed to load:", e?.target?.src);
              e.target.onerror = null;
              e.target.src = "/B-logo.webp";
            } catch (err) {}
          }}
          onClick={() => window.open(thumbnail, "_blank")}
        />
      ),
    },
    {
      title: "操作",
      key: "action",
      width: 180,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
            size="small"
          >
            查看
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            size="small"
          >
            編輯
          </Button>
          <Popconfirm
            title="確認刪除"
            description="您確定要刪除這篇文章嗎？"
            onConfirm={() => handleDelete(record.docId ?? record.id)}
            okText="確認"
            cancelText="取消"
          >
            <Button type="link" danger icon={<DeleteOutlined />} size="small">
              刪除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // 處理新增文章按鈕點擊：先選類型
  const handleAdd = () => {
    setIsTypeModalVisible(true);
  };

  // 選擇文章類型後開啟對應編輯器
  const handleSelectNewType = (type) => {
    setIsTypeModalVisible(false);
    setEditingArticle({ category: type });
    setIsModalVisible(true);
  };

  // 處理編輯文章按鈕點擊
  const handleEdit = (article) => {
    let contentValue = article.content;
    if (typeof contentValue === "string") {
      try {
        contentValue = JSON.parse(contentValue);
      } catch (e) {}
    }
    setEditingArticle({ ...article, content: contentValue });
    setIsModalVisible(true);
  };

  // 處理查看文章按鈕點擊
  const handleView = (article) => {
    setViewingArticle(article);
    setIsViewModalVisible(true);
  };

  // 處理刪除文章
  const handleDelete = async (key) => {
    const article = articles.find((a) => a.docId === key || a.id === key);
    if (!article) return;
    const type = article.type === "article" ? "article" : "enrollment";
    await deleteArticle(type, article.docId);
    setArticles((prev) => prev.filter((a) => a.docId !== article.docId));
    message.success("文章已刪除");
  };

  // 處理表單提交（新增或更新文章）

  const cleanUndefined = (obj) => {
    if (Array.isArray(obj)) {
      return obj.map((v) => cleanUndefined(v)).filter((v) => v !== undefined);
    } else if (obj !== null && typeof obj === "object") {
      const newObj = {};
      for (const key in obj) {
        const val = cleanUndefined(obj[key]);
        if (val !== undefined) {
          newObj[key] = val;
        }
      }
      return newObj;
    }
    return obj;
  };

  const handleSubmit = async (values) => {
    const rawValues = { ...values };
    const processedValues = cleanUndefined(rawValues);

    if (editingArticle && (editingArticle.docId || editingArticle.id)) {
      // 修正：依原文章 category 決定 collection（type 參數須為 'enrollment' 或 'article'）
      const articleType =
        (editingArticle.category || processedValues.category) === "enrollment"
          ? "enrollment"
          : "article";
      await updateArticle(
        articleType,
        editingArticle.docId || editingArticle.id,
        processedValues,
      );
      setArticles((prev) =>
        prev.map((a) =>
          (a.docId || a.id) === (editingArticle.docId || editingArticle.id)
            ? { ...a, ...processedValues }
            : a,
        ),
      );
    } else {
      // 新增文章
      const articleType =
        processedValues.category === "enrollment" ? "enrollment" : "article";
      const newArticle = await createArticle(articleType, processedValues);
      setArticles((prev) => [...prev, newArticle]);
    }
    setIsModalVisible(false);
  };

  // 處理取消編輯
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // 處理取消查看
  const handleViewCancel = () => {
    setIsViewModalVisible(false);
    setViewingArticle(null);
  };

  // 處理檔案上傳
  // eslint-disable-next-line no-unused-vars
  const handleFileUpload = async (file, field) => {
    const oldUrl = form.getFieldValue(field);
    // 建立 Storage 參考
    const storageRef = ref(storage, `blog/${Date.now()}_${file.name}`);

    // 設定 Cache-Control 標頭，讓圖片可以被瀏覽器快取一年
    const metadata = {
      cacheControl: "public, max-age=31536000",
    };

    // 上傳檔案並附帶 metadata
    await uploadBytes(storageRef, file, metadata);
    // 取得下載 URL
    const url = await getDownloadURL(storageRef);
    // 更新表單值
    form.setFieldsValue({ [field]: url });
    message.success(`${field === "thumbnail" ? "縮圖" : "大圖"}上傳成功`);

    // 刪除舊檔案
    if (oldUrl) {
      try {
        const matches = oldUrl.match(/\/o\/([^?]+)\?/);
        let filePath = null;
        if (matches && matches[1]) {
          filePath = decodeURIComponent(matches[1]);
        } else {
          const urlObj = new URL(oldUrl);
          const pathname = urlObj.pathname;
          const parts = pathname.split("/o/");
          if (parts.length === 2) filePath = decodeURIComponent(parts[1]);
        }
        if (filePath) {
          const oldRef = ref(storage, filePath);
          await deleteObject(oldRef);
        }
      } catch (err) {
        logger.warn("刪除舊檔案失敗", err);
      }
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      {/* 頁面標題和新增按鈕 */}
      <div
        style={{
          marginBottom: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={2} style={{ margin: 0 }}>
          文章管理
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          size="large"
        >
          新增文章
        </Button>
      </div>

      {/* 排序儲存控制區 */}
      <div style={{ marginBottom: 12 }}>
        <Space>
          <Button
            disabled={!orderDirty || isSavingOrder}
            loading={isSavingOrder}
            onClick={handleSaveOrder}
            type="primary"
          >
            儲存排序
          </Button>
          {orderDirty && (
            <span style={{ color: "#fa8c16" }}>尚未儲存的排序變更</span>
          )}
        </Space>
      </div>

      {/* 文章列表表格 */}
      <Table
        columns={columns}
        dataSource={articles}
        rowKey={(record) =>
          record.docId
            ? `${record.collection || "col"}:${record.docId}`
            : `${record.collection || "col"}:${record.id}`
        }
        pagination={false}
        onRow={(record, index) => {
          return {
            draggable: true,
            style: { cursor: "grab" },
            onDragStart: (e) => {
              e.dataTransfer.effectAllowed = "move";
              e.dataTransfer.setData("text/plain", String(index));
            },
            onDragOver: (e) => {
              e.preventDefault();
              if (e.currentTarget) {
                e.currentTarget.style.outline = "2px dashed #1890ff";
                e.currentTarget.style.background = "#fafafa";
              }
            },
            onDragLeave: (e) => {
              if (e.currentTarget) {
                e.currentTarget.style.outline = "";
                e.currentTarget.style.background = "";
              }
            },
            onDrop: (e) => {
              e.preventDefault();
              if (e.currentTarget) {
                e.currentTarget.style.outline = "";
                e.currentTarget.style.background = "";
              }
              const from = Number(e.dataTransfer.getData("text/plain"));
              const to = index;
              if (!Number.isNaN(from) && !Number.isNaN(to) && from !== to) {
                reorder(from, to);
              }
            },
          };
        }}
        scroll={{ x: 1100, y: 600 }}
      />

      {/* 選擇文章類型 Modal（新增時） */}
      <Modal
        title="選擇要新增的文章類型"
        open={isTypeModalVisible}
        onCancel={() => setIsTypeModalVisible(false)}
        footer={null}
        width={520}
        centered
      >
        <div style={{ padding: "16px 0 8px" }}>
          <p style={{ color: "#666", marginBottom: 20, textAlign: "center" }}>
            請依內容性質選擇文章類型，兩種類型使用不同的編輯介面。
          </p>
          <Space
            size={20}
            style={{
              justifyContent: "center",
              width: "100%",
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <Card
              hoverable
              onClick={() => handleSelectNewType("news")}
              style={{
                width: 210,
                cursor: "pointer",
                borderColor: "#1890ff",
                borderWidth: 2,
              }}
              styles={{ body: { padding: "20px 16px" } }}
            >
              <div style={{ textAlign: "center", marginBottom: 10 }}>
                <span style={{ fontSize: 36 }}>📰</span>
              </div>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  textAlign: "center",
                  marginBottom: 8,
                  color: "#1890ff",
                }}
              >
                最新消息
              </div>
              <ul
                style={{
                  color: "#666",
                  fontSize: 13,
                  paddingLeft: 18,
                  margin: 0,
                  lineHeight: 2,
                }}
              >
                <li>使用自由排版的富文字編輯器</li>
                <li>適合：公告、節慶賀文、動態消息</li>
                <li>可插入標題、條列、圖片等任意區塊</li>
              </ul>
            </Card>
            <Card
              hoverable
              onClick={() => handleSelectNewType("enrollment")}
              style={{
                width: 210,
                cursor: "pointer",
                borderColor: "#52c41a",
                borderWidth: 2,
              }}
              styles={{ body: { padding: "20px 16px" } }}
            >
              <div style={{ textAlign: "center", marginBottom: 10 }}>
                <span style={{ fontSize: 36 }}>🎓</span>
              </div>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  textAlign: "center",
                  marginBottom: 8,
                  color: "#52c41a",
                }}
              >
                招生資訊
              </div>
              <ul
                style={{
                  color: "#666",
                  fontSize: 13,
                  paddingLeft: 18,
                  margin: 0,
                  lineHeight: 2,
                }}
              >
                <li>使用結構化表格式編輯器</li>
                <li>適合：申請截止日期、學費、開課資訊</li>
                <li>依學期/招生批次分區塊填寫</li>
              </ul>
            </Card>
          </Space>
        </div>
      </Modal>

      {/* 新增/編輯文章模態框 */}
      <Modal
        title={
          editingArticle?.category === "enrollment"
            ? editingArticle?.docId
              ? "編輯招生資訊"
              : "新增招生資訊"
            : editingArticle?.docId
              ? "編輯最新消息"
              : "新增最新消息"
        }
        open={isModalVisible}
        footer={null}
        onCancel={handleCancel}
        width={1100}
        destroyOnHidden
        styles={{
          body: { maxHeight: "80vh", overflowY: "auto", padding: "16px 24px" },
        }}
      >
        {editingArticle?.category === "enrollment" ? (
          <EnrollmentEditor
            initialValues={editingArticle?.docId ? editingArticle : null}
            onSave={handleSubmit}
            onCancel={handleCancel}
          />
        ) : (
          <NewsEditor
            initialValues={editingArticle?.docId ? editingArticle : null}
            onSave={handleSubmit}
            onCancel={handleCancel}
          />
        )}
      </Modal>

      {/* 查看文章模態框 */}
      <Modal
        title="文章內容"
        open={isViewModalVisible}
        onCancel={handleViewCancel}
        footer={[
          <Button
            key="edit"
            type="primary"
            onClick={() => {
              handleViewCancel();
              handleEdit(viewingArticle);
            }}
          >
            編輯
          </Button>,
          <Button key="close" onClick={handleViewCancel}>
            關閉
          </Button>,
        ]}
        width={800}
        destroyOnHidden
      >
        {viewingArticle && (
          <div>
            <Title level={4}>{viewingArticle.title}</Title>
            <Space>
              <Tag color={viewingArticle.type === "article" ? "blue" : "green"}>
                {viewingArticle.type === "article" ? "一般文章" : "招生資訊"}
              </Tag>
              <Tag
                color={viewingArticle.category === "news" ? "purple" : "orange"}
              >
                {viewingArticle.category === "news" ? "新聞" : "招生資訊"}
              </Tag>
            </Space>
            <div style={{ margin: "16px 0" }}>
              <img
                src={viewingArticle.image}
                alt={viewingArticle.title}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <strong>摘要：</strong>
              <p>{viewingArticle.excerpt}</p>
            </div>
            <div>
              <strong>內容：</strong>
              {viewingArticle.category === "enrollment" ? (
                <StructuredContentViewer content={viewingArticle.content} />
              ) : viewingArticle.category === "news" ? (
                <NewsContentViewer content={viewingArticle.content} />
              ) : (
                <div
                  style={{
                    whiteSpace: "pre-wrap",
                    backgroundColor: "#f5f5f5",
                    padding: "16px",
                    borderRadius: "4px",
                    marginTop: "8px",
                    maxHeight: "400px",
                    overflow: "auto",
                  }}
                >
                  {typeof viewingArticle.content === "object"
                    ? JSON.stringify(viewingArticle.content, null, 2)
                    : viewingArticle.content}
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ArticlesPage;
