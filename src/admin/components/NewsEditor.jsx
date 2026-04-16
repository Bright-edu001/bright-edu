import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Card,
  Space,
  Row,
  Col,
  Upload,
  message,
  Modal,
  Spin,
  Empty,
  Alert,
  Select,
} from "antd";
import {
  SaveOutlined,
  UploadOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { app } from "../../config/firebaseCore";

const storage = getStorage(app);
const { TextArea } = Input;

/**
 * 將舊格式的 content 轉換成 BlockNote block 陣列
 */
function contentToBlocks(content) {
  if (!content) return undefined;

  // 已是 BlockNote 格式
  if (content._type === "blocknote") {
    return content.blocks?.length > 0 ? content.blocks : undefined;
  }

  // 純文字字串：每一行 → paragraph 區塊
  if (typeof content === "string") {
    const lines = content.split("\n").filter((l) => l.trim() !== "");
    return lines.length > 0
      ? lines.map((line) => ({ type: "paragraph", content: line }))
      : undefined;
  }

  // 舊 sections 格式：轉換成段落＋條列
  if (typeof content === "object" && !Array.isArray(content)) {
    const items = content.sections || content.details || content.items || [];
    const blocks = items.flatMap((item) => {
      const result = [];
      if (item.text) {
        result.push({ type: "paragraph", content: item.text });
      }
      if (item.items) {
        item.items.forEach((sub) => {
          if (sub.text)
            result.push({ type: "bulletListItem", content: sub.text });
        });
      }
      return result;
    });
    return blocks.length > 0 ? blocks : undefined;
  }

  return undefined;
}

/**
 * NewsEditor — 最新消息文章編輯器（BlockNote 富文字）
 * Props:
 *   initialValues: 編輯時傳入現有文章資料（null 表示新增）
 *   onSave(values): 儲存回呼
 *   onCancel(): 取消回呼
 */
const NewsEditor = ({ initialValues, onSave, onCancel }) => {
  const [form] = Form.useForm();
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [pickerTargetField, setPickerTargetField] = useState(null);
  const [storageImages, setStorageImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [isLegacyContent, setIsLegacyContent] = useState(false);

  // 計算 BlockNote 初始內容（只在元件首次掛載時執行）
  const initialBlocks = useMemo(() => {
    if (!initialValues?.content) return undefined;
    const blocks = contentToBlocks(initialValues.content);
    // 若原本不是 BlockNote 格式，標示為「已自動轉換的舊格式」
    if (
      initialValues.content._type !== "blocknote" &&
      initialValues.content !== undefined
    ) {
      setIsLegacyContent(true);
    }
    return blocks;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 建立 BlockNote 編輯器，加入 Firebase Storage 自動上傳
  const editor = useCreateBlockNote({
    initialContent: initialBlocks,
    uploadFile: async (file) => {
      const storageRef = ref(storage, `blog/${Date.now()}_${file.name}`);
      const metadata = { cacheControl: "public, max-age=31536000" };
      const snapshot = await uploadBytes(storageRef, file, metadata);
      return getDownloadURL(snapshot.ref);
    },
  });

  // 回填 Ant Design 表單基本欄位
  useEffect(() => {
    if (initialValues) {
      const { content, ...rest } = initialValues;
      form.setFieldsValue(rest);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  // --- 圖庫選擇器 ---
  const fetchStorageImages = useCallback(async () => {
    setLoadingImages(true);
    try {
      const listRef = ref(storage, "blog/");
      const res = await listAll(listRef);
      const urls = await Promise.all(
        res.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return { name: itemRef.name, url };
        }),
      );
      setStorageImages(urls.reverse());
    } catch {
      message.error("載入圖庫失敗");
    } finally {
      setLoadingImages(false);
    }
  }, []);

  const openImagePicker = (fieldName) => {
    setPickerTargetField(fieldName);
    setIsPickerVisible(true);
    if (storageImages.length === 0) fetchStorageImages();
  };

  const handleSelectImage = (url) => {
    form.setFieldsValue({ [pickerTargetField]: url });
    setIsPickerVisible(false);
    message.success("已選取圖片");
  };

  const handleUpload = async (options, fieldName, setUploading) => {
    const { file, onSuccess, onError } = options;
    setUploading(true);
    try {
      const storageRef = ref(storage, `blog/${Date.now()}_${file.name}`);
      const metadata = { cacheControl: "public, max-age=31536000" };
      const snapshot = await uploadBytes(storageRef, file, metadata);
      const downloadURL = await getDownloadURL(snapshot.ref);
      form.setFieldsValue({ [fieldName]: downloadURL });
      message.success(`${file.name} 上傳成功`);
      onSuccess("ok");
    } catch (error) {
      message.error(`${file.name} 上傳失敗`);
      onError(error);
    } finally {
      setUploading(false);
    }
  };
  // ---------------------

  const onFinish = (values) => {
    const blocks = editor.document;
    onSave({
      ...values,
      type: "article",
      // category 由表單 values 提供（預設 "news"），不強制覆蓋
      imageWidth: parseInt(values.imageWidth) || 1000,
      imageHeight: parseInt(values.imageHeight) || 571,
      content: {
        _type: "blocknote",
        blocks: blocks,
      },
    });
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      {/* 基本資料卡片 */}
      <Card
        title="📰 文章基本資料"
        style={{ marginBottom: 16 }}
        extra={
          <span style={{ color: "#888", fontSize: 12 }}>
            填寫文章標題、摘要與圖片
          </span>
        }
      >
        <Form.Item
          name="title"
          label="文章標題"
          rules={[{ required: true, message: "請輸入文章標題" }]}
          tooltip="顯示在文章列表與文章頁面頂部的大標題"
        >
          <Input placeholder="例：UIC 最新排名賀報 🎉" size="large" />
        </Form.Item>

        <Form.Item
          name="excerpt"
          label="摘要（列表卡片顯示用）"
          tooltip="顯示在文章列表卡片上的簡短說明，約 50–100 字為宜"
        >
          <TextArea
            rows={2}
            placeholder="簡短介紹文章內容，吸引讀者點擊閱讀..."
            showCount
            maxLength={200}
          />
        </Form.Item>

        <Form.Item
          name="slug"
          label="網址 Slug（選填）"
          tooltip="文章的 URL 識別碼，例如 uic-news-2026-ranking。留空系統會依標題自動產生；僅允許小寫英文、數字與連字號。"
          rules={[
            {
              pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
              message:
                "Slug 僅允許小寫英文、數字與連字號（-），且不可以連字號開頭或結尾",
            },
          ]}
        >
          <Input
            placeholder="例：uic-news-2026-ranking（留空自動產生）"
            maxLength={80}
            allowClear
          />
        </Form.Item>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="category"
              label="所屬分類"
              initialValue="news"
              tooltip="最新消息類型文章固定歸屬 news 分類，影響前台篩選顯示"
            >
              <Select disabled>
                <Select.Option value="news">📰 最新消息</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="order"
              label="排序權重"
              tooltip="數字越小排越前面，留空系統自動排在最後"
            >
              <InputNumber
                placeholder="例：0"
                style={{ width: "100%" }}
                min={0}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="image"
              label="文章大圖"
              tooltip="顯示在文章頁面頂部的橫幅圖片，建議尺寸 1000×571px"
            >
              <Space.Compact style={{ width: "100%" }}>
                <Form.Item name="image" noStyle>
                  <Input placeholder="圖片網址" />
                </Form.Item>
                <Button
                  icon={<PictureOutlined />}
                  onClick={() => openImagePicker("image")}
                  title="從圖庫選擇"
                />
                <Upload
                  customRequest={(opts) =>
                    handleUpload(opts, "image", setUploadingImage)
                  }
                  showUploadList={false}
                  accept="image/*"
                >
                  <Button icon={<UploadOutlined />} loading={uploadingImage}>
                    上傳
                  </Button>
                </Upload>
              </Space.Compact>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="thumbnail"
              label="縮圖（列表用小圖）"
              tooltip="顯示在文章列表卡片上的小圖，建議尺寸 450×300px"
            >
              <Space.Compact style={{ width: "100%" }}>
                <Form.Item name="thumbnail" noStyle>
                  <Input placeholder="圖片網址" />
                </Form.Item>
                <Button
                  icon={<PictureOutlined />}
                  onClick={() => openImagePicker("thumbnail")}
                  title="從圖庫選擇"
                />
                <Upload
                  customRequest={(opts) =>
                    handleUpload(opts, "thumbnail", setUploadingThumbnail)
                  }
                  showUploadList={false}
                  accept="image/*"
                >
                  <Button
                    icon={<UploadOutlined />}
                    loading={uploadingThumbnail}
                  >
                    上傳
                  </Button>
                </Upload>
              </Space.Compact>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={6}>
            <Form.Item
              name="imageWidth"
              label="大圖寬度（px）"
              initialValue={1000}
              tooltip="文章大圖的實際寬度，影響版面比例"
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="imageHeight"
              label="大圖高度（px）"
              initialValue={571}
              tooltip="文章大圖的實際高度，影響版面比例"
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* 內容編輯卡片 */}
      <Card
        title="✏️ 文章內容"
        style={{ marginBottom: 16 }}
        extra={
          <span style={{ color: "#888", fontSize: 12 }}>
            輸入「/」呼叫選單，可插入標題、條列、圖片等區塊
          </span>
        }
      >
        {isLegacyContent && (
          <Alert
            message="此文章使用舊版格式，已自動轉換為可編輯格式，儲存後將更新為新格式。"
            type="info"
            showIcon
            style={{ marginBottom: 12 }}
            closable
            onClose={() => setIsLegacyContent(false)}
          />
        )}
        <div
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: 8,
            minHeight: 320,
            padding: "4px 0",
          }}
        >
          <BlockNoteView editor={editor} theme="light" />
        </div>
        <div style={{ marginTop: 8, color: "#aaa", fontSize: 12 }}>
          💡 提示：輸入「/」可插入標題（H1/H2/H3）、無序清單、有序清單、圖片等
        </div>
      </Card>

      {/* 儲存/取消 */}
      <Row justify="end" gutter={16}>
        <Col>
          <Button onClick={onCancel}>取消</Button>
        </Col>
        <Col>
          <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
            儲存文章
          </Button>
        </Col>
      </Row>

      {/* 圖庫選擇器 Modal */}
      <Modal
        title="從圖庫選擇圖片"
        open={isPickerVisible}
        onCancel={() => setIsPickerVisible(false)}
        footer={null}
        width={800}
      >
        <Spin spinning={loadingImages}>
          {storageImages.length === 0 && !loadingImages ? (
            <Empty description="圖庫中沒有圖片" />
          ) : (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                maxHeight: 500,
                overflowY: "auto",
              }}
            >
              {storageImages.map((img) => (
                <Card
                  key={img.url}
                  hoverable
                  style={{ width: 140 }}
                  styles={{ body: { padding: 8, textAlign: "center" } }}
                  onClick={() => handleSelectImage(img.url)}
                >
                  <img
                    src={img.url}
                    alt={img.name}
                    style={{
                      width: "100%",
                      height: 100,
                      objectFit: "cover",
                      marginBottom: 8,
                    }}
                  />
                  <div
                    style={{
                      fontSize: 12,
                      wordWrap: "break-word",
                      lineHeight: "1.2",
                    }}
                  >
                    {img.name}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Spin>
      </Modal>
    </Form>
  );
};

export default NewsEditor;
