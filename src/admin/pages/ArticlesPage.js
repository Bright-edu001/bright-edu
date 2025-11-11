import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  Space,
  Button,
  Modal,
  Form,
  Input,
  message,
  Select,
  Tag,
  Popconfirm,
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
import StructuredContentEditor from "../components/StructuredContentEditor";
import StructuredContentViewer from "../components/StructuredContentViewer";
import NewsContentEditor from "../components/NewsContentEditor";
import NewsContentViewer from "../components/NewsContentViewer";

// 解構 Ant Design 組件
const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

// 初始化 Firebase Storage
const storage = getStorage(app);

// 文章管理頁面組件
const ArticlesPage = () => {
  // 文章列表狀態
  const [articles, setArticles] = useState([]);
  // 新增/編輯模態框顯示狀態
  const [isModalVisible, setIsModalVisible] = useState(false);
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
        }))
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
      sorter: (a, b) => a.id - b.id,
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
        { text: "招生活動", value: "enrollment" },
        { text: "新聞", value: "news" },
      ],
      onFilter: (value, record) => record.category === value,
      render: (category) => (
        <Tag color={category === "news" ? "purple" : "orange"}>
          {category === "news" ? "新聞" : "招生活動"}
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

  // 處理新增文章按鈕點擊
  const handleAdd = () => {
    setEditingArticle(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  // 處理編輯文章按鈕點擊
  const handleEdit = (article) => {
    setEditingArticle(article);

    // 根據分類決定內容格式處理
    let contentValue = article.content;

    // 對於結構化內容（招生活動和新聞），保持原始對象格式
    // 對於一般文章，如果是對象則轉換為 JSON 字串
    if (article.category !== "enrollment" && article.category !== "news") {
      if (typeof article.content === "object") {
        contentValue = JSON.stringify(article.content, null, 2);
      } else if (Array.isArray(article.content)) {
        contentValue = JSON.stringify(article.content, null, 2);
      }
    }

    form.setFieldsValue({
      title: article.title,
      excerpt: article.excerpt,
      content: contentValue,
      type: article.type,
      category: article.category,
      thumbnail: article.thumbnail,
      image: article.image,
      imageWidth: article.imageWidth,
      imageHeight: article.imageHeight,
    });
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
  const handleSubmit = async (values) => {
    let processedContent = values.content;
    try {
      // 如果內容是 JSON 字串，解析為物件
      if (
        typeof values.content === "string" &&
        (values.content.trim().startsWith("{") ||
          values.content.trim().startsWith("["))
      ) {
        processedContent = JSON.parse(values.content);
      }
    } catch (e) {
      processedContent = values.content;
    }
    // 處理表單值，設置預設圖片尺寸
    const processedValues = {
      ...values,
      content: processedContent,
      imageWidth: parseInt(values.imageWidth) || 450,
      imageHeight: parseInt(values.imageHeight) || 300,
    };
    if (editingArticle) {
      // 更新現有文章
      const type = editingArticle.type === "article" ? "article" : "enrollment";
      await updateArticle(type, editingArticle.docId, processedValues);
      setArticles((prev) =>
        prev.map((a) =>
          a.id === editingArticle.id ? { ...a, ...processedValues } : a
        )
      );
      message.success("文章已更新");
    } else {
      // 新增文章
      const type =
        processedValues.type === "article" ? "article" : "enrollment";
      const newArticle = await createArticle(type, processedValues);
      setArticles((prev) => [...prev, newArticle]);
      message.success("文章已新增");
    }
    setIsModalVisible(false);
    form.resetFields();
  };

  // 處理取消編輯
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // 處理取消查看
  const handleViewCancel = () => {
    setIsViewModalVisible(false);
    setViewingArticle(null);
  };

  // 處理檔案上傳
  const handleFileUpload = async (file, field) => {
    const oldUrl = form.getFieldValue(field);
    // 建立 Storage 參考
    const storageRef = ref(storage, `blog/${Date.now()}_${file.name}`);
    // 上傳檔案
    await uploadBytes(storageRef, file);
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

      {/* 新增/編輯文章模態框 */}
      <Modal
        title={editingArticle ? "編輯文章" : "新增文章"}
        open={isModalVisible}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        width={900}
        okText="確認"
        cancelText="取消"
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="title"
            label="標題"
            rules={[{ required: true, message: "請輸入文章標題" }]}
          >
            <Input placeholder="請輸入文章標題" />
          </Form.Item>

          <Form.Item
            name="excerpt"
            label="摘要"
            rules={[{ required: true, message: "請輸入文章摘要" }]}
          >
            <TextArea rows={2} placeholder="請輸入文章摘要" />
          </Form.Item>

          <Form.Item
            name="type"
            label="類型"
            rules={[{ required: true, message: "請選擇文章類型" }]}
          >
            <Select placeholder="請選擇文章類型">
              <Option value="enrollment">招生資訊</Option>
              <Option value="article">最新消息</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="category"
            label="分類"
            rules={[{ required: true, message: "請選擇文章分類" }]}
          >
            <Select placeholder="請選擇文章分類">
              <Option value="enrollment">招生活動</Option>
              <Option value="news">新聞</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="縮圖上傳"
            required
            validateStatus={
              form.getFieldValue("thumbnail") ? "success" : "error"
            }
            help={form.getFieldValue("thumbnail") ? null : "請上傳縮圖"}
          >
            <input
              type="file"
              accept="image/*"
              style={{ width: 120 }}
              onChange={async (e) => {
                if (e.target.files && e.target.files[0]) {
                  await handleFileUpload(e.target.files[0], "thumbnail");
                }
              }}
            />
          </Form.Item>
          <Form.Item
            name="thumbnail"
            style={{ display: "none" }}
            rules={[{ required: true, message: "請上傳縮圖" }]}
          >
            <Input type="hidden" />
          </Form.Item>

          <Form.Item
            label="大圖上傳"
            required
            validateStatus={form.getFieldValue("image") ? "success" : "error"}
            help={form.getFieldValue("image") ? null : "請上傳大圖"}
          >
            <input
              type="file"
              accept="image/*"
              style={{ width: 120 }}
              onChange={async (e) => {
                if (e.target.files && e.target.files[0]) {
                  await handleFileUpload(e.target.files[0], "image");
                }
              }}
            />
          </Form.Item>
          <Form.Item
            name="image"
            style={{ display: "none" }}
            rules={[{ required: true, message: "請上傳大圖" }]}
          >
            <Input type="hidden" />
          </Form.Item>

          <Space>
            <Form.Item
              name="imageWidth"
              label="圖片寬度"
              style={{ width: 120 }}
            >
              <Input type="number" placeholder="450" />
            </Form.Item>

            <Form.Item
              name="imageHeight"
              label="圖片高度"
              style={{ width: 120 }}
            >
              <Input type="number" placeholder="300" />
            </Form.Item>
          </Space>

          <Form.Item
            name="content"
            label="內容"
            rules={[{ required: true, message: "請輸入文章內容" }]}
          >
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.type !== currentValues.type ||
                prevValues.category !== currentValues.category
              }
            >
              {({ getFieldValue, setFieldValue }) => {
                const articleCategory = getFieldValue("category");
                const currentContent = getFieldValue("content");

                // 根據分類決定使用哪個編輯器
                if (articleCategory === "enrollment") {
                  // 招生活動使用招生活動的結構化編輯器
                  return (
                    <StructuredContentEditor
                      value={currentContent}
                      onChange={(newContent) => {
                        setFieldValue("content", newContent);
                      }}
                    />
                  );
                } else if (articleCategory === "news") {
                  // 新聞使用新聞的結構化編輯器
                  return (
                    <NewsContentEditor
                      value={currentContent}
                      onChange={(newContent) => {
                        setFieldValue("content", newContent);
                      }}
                    />
                  );
                } else {
                  // 預設使用一般文字編輯器
                  return <TextArea rows={10} placeholder="請輸入文章內容" />;
                }
              }}
            </Form.Item>
          </Form.Item>
        </Form>
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
                {viewingArticle.category === "news" ? "新聞" : "招生活動"}
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
