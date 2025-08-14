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
} from "../data/blogApi";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { app } from "../../config/firebaseConfig";
import logger from "../../utils/logger";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const storage = getStorage(app);

const ProductsPage = () => {
  const [articles, setArticles] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [viewingArticle, setViewingArticle] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    getAllArticles().then(setArticles);
  }, []);

  const columns = [
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
            onConfirm={() => handleDelete(record.id)}
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

  const handleAdd = () => {
    setEditingArticle(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (article) => {
    setEditingArticle(article);

    // 處理不同類型的 content 格式
    let contentValue = article.content;
    if (typeof article.content === "object") {
      contentValue = JSON.stringify(article.content, null, 2);
    } else if (Array.isArray(article.content)) {
      contentValue = JSON.stringify(article.content, null, 2);
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

  const handleView = (article) => {
    setViewingArticle(article);
    setIsViewModalVisible(true);
  };

  const handleDelete = async (id) => {
    const article = articles.find((a) => a.id === id);
    if (!article) return;
    const type = article.type === "article" ? "news" : "enrollmentEvents";
    await deleteArticle(type, article.docId);
    setArticles((prev) => prev.filter((a) => a.id !== id));
    message.success("文章已刪除");
  };

  const handleSubmit = async (values) => {
    let processedContent = values.content;
    try {
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
    const processedValues = {
      ...values,
      content: processedContent,
      imageWidth: parseInt(values.imageWidth) || 450,
      imageHeight: parseInt(values.imageHeight) || 300,
    };
    if (editingArticle) {
      const type =
        editingArticle.type === "article" ? "news" : "enrollmentEvents";
      await updateArticle(type, editingArticle.docId, processedValues);
      setArticles((prev) =>
        prev.map((a) =>
          a.id === editingArticle.id ? { ...a, ...processedValues } : a
        )
      );
      message.success("文章已更新");
    } else {
      const type =
        processedValues.type === "article" ? "news" : "enrollmentEvents";
      const newArticle = await createArticle(type, processedValues);
      setArticles((prev) => [...prev, newArticle]);
      message.success("文章已新增");
    }
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleViewCancel = () => {
    setIsViewModalVisible(false);
    setViewingArticle(null);
  };

  // 新增上傳檔案的處理函式
  const handleFileUpload = async (file, field) => {
    // 取得舊檔案網址
    const oldUrl = form.getFieldValue(field);
    // 上傳新檔案
    const storageRef = ref(storage, `blog/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    form.setFieldsValue({ [field]: url });
    message.success(`${field === "thumbnail" ? "縮圖" : "大圖"}上傳成功`);

    // 刪除舊檔案（如果有）
    if (oldUrl) {
      try {
        // 取得 Firebase Storage 路徑
        const matches = oldUrl.match(/\/o\/([^?]+)\?/);
        let filePath = null;
        if (matches && matches[1]) {
          filePath = decodeURIComponent(matches[1]);
        } else {
          // 兼容新版 Firebase Storage 下載網址
          const urlObj = new URL(oldUrl);
          const pathname = urlObj.pathname;
          // /v0/b/{bucket}/o/{path}
          const parts = pathname.split("/o/");
          if (parts.length === 2) filePath = decodeURIComponent(parts[1]);
        }
        if (filePath) {
          const oldRef = ref(storage, filePath);
          await deleteObject(oldRef);
        }
      } catch (err) {
        // 刪除失敗不影響主流程
        logger.warn("刪除舊檔案失敗", err);
      }
    }
  };

  return (
    <div style={{ padding: "24px" }}>
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

      <Table
        columns={columns}
        dataSource={articles}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `共 ${total} 筆資料，顯示第 ${range[0]}-${range[1]} 筆`,
        }}
        scroll={{ x: 1000 }}
      />

      {/* 新增/編輯文章 Modal */}
      <Modal
        title={editingArticle ? "編輯文章" : "新增文章"}
        open={isModalVisible}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        width={900}
        okText="確認"
        cancelText="取消"
        destroyOnHidden
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
          {/* 隱藏欄位讓 Form 拿到值 */}
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
          {/* 隱藏欄位讓 Form 拿到值 */}
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
            <TextArea rows={10} placeholder="請輸入文章內容" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 查看文章 Modal */}
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
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProductsPage;
