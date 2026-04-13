import React, { useEffect, useState, useCallback } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Card,
  Select,
  Space,
  Row,
  Col,
  Upload,
  message,
  Modal,
  Spin,
  Empty,
  Divider,
  Typography,
  Tooltip,
} from "antd";
import {
  PlusOutlined,
  MinusCircleOutlined,
  SaveOutlined,
  UploadOutlined,
  PictureOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { app } from "../../config/firebaseCore";
import icons from "../../data/json/icons.json";

const storage = getStorage(app);
const { TextArea } = Input;
const { Text } = Typography;

// 圖示選項（含預覽）
const ICON_OPTIONS = [
  { label: "✅ 勾選 (check)", value: "check" },
  { label: "❌ 取消 (none)", value: "none" },
  { label: "▶️ 箭頭 (arrow)", value: "arrow" },
  { label: "📕 書本 (book)", value: "book" },
  { label: "🎊 慶祝 (party)", value: "party" },
  { label: "👉 重點 (point)", value: "point" },
  { label: "⭐️ 星星 (star)", value: "star" },
];

const FLAG_OPTIONS = [
  { label: "🇺🇸 美國 (USA)", value: "/images/flags/us-flag.webp" },
  { label: "🇬🇧 英國 (UK)", value: "/images/flags/uk-flag.webp" },
  { label: "🇨🇦 加拿大 (Canada)", value: "/images/flags/canada-flag.webp" },
  { label: "🇦🇺 澳洲 (Australia)", value: "/images/flags/australia-flag.webp" },
  { label: "🇳🇿 紐西蘭 (New Zealand)", value: "/images/flags/nz-flag.webp" },
];

// ─────────────────────────────────────────────
// 即時預覽元件
// ─────────────────────────────────────────────
const EnrollmentPreview = ({ values }) => {
  if (!values) return <div style={{ color: "#aaa" }}>尚無內容可預覽</div>;
  const { title, excerpt, content = [] } = values;

  return (
    <div
      style={{ fontFamily: "sans-serif", lineHeight: 1.8, padding: "8px 0" }}
    >
      {title && <h2 style={{ color: "#1a1a1a", marginBottom: 4 }}>{title}</h2>}
      {excerpt && (
        <p style={{ color: "#555", fontSize: 14, marginBottom: 16 }}>
          {excerpt}
        </p>
      )}

      {content.map((block, bi) => (
        <div
          key={bi}
          style={{
            marginBottom: 24,
            borderLeft: "4px solid #1890ff",
            paddingLeft: 12,
          }}
        >
          <h3
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "#1890ff",
              margin: "0 0 12px",
            }}
          >
            {block.flagImage && (
              <img
                src={block.flagImage}
                alt="flag"
                style={{ height: 18, objectFit: "contain" }}
              />
            )}
            {block.title || (
              <span style={{ color: "#bbb" }}>（未填區塊標題）</span>
            )}
          </h3>

          {(block.sections || []).map((section, si) => (
            <div key={si} style={{ marginBottom: 8, paddingLeft: 4 }}>
              <div
                style={{ display: "flex", gap: 6, alignItems: "flex-start" }}
              >
                {section.icon && (
                  <span style={{ minWidth: 20, fontSize: 16 }}>
                    {icons[section.icon] || section.icon}
                  </span>
                )}
                <span style={{ color: "#333" }}>
                  {section.text || (
                    <span style={{ color: "#bbb" }}>（未填說明）</span>
                  )}
                </span>
              </div>
              {section.list && section.list.filter(Boolean).length > 0 && (
                <ul style={{ paddingLeft: 32, margin: "4px 0 4px 20px" }}>
                  {section.list.filter(Boolean).map((item, li) => (
                    <li key={li} style={{ color: "#555", fontSize: 14 }}>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      ))}

      {content.length === 0 && (
        <div
          style={{
            color: "#bbb",
            border: "1px dashed #ddd",
            borderRadius: 8,
            padding: 24,
            textAlign: "center",
          }}
        >
          尚未新增任何資訊區塊
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// EnrollmentEditor 主元件
// ─────────────────────────────────────────────
/**
 * EnrollmentEditor — 招生活動文章編輯器（結構化卡片表單 + 即時預覽）
 * Props:
 *   initialValues: 編輯時傳入現有文章資料（null 表示新增）
 *   onSave(values): 儲存回呼
 *   onCancel(): 取消回呼
 */
const EnrollmentEditor = ({ initialValues, onSave, onCancel }) => {
  const [form] = Form.useForm();
  const [previewValues, setPreviewValues] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [pickerTargetField, setPickerTargetField] = useState(null);
  const [storageImages, setStorageImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);

  useEffect(() => {
    if (initialValues) {
      let content = initialValues.content;
      if (typeof content === "string") {
        try {
          content = JSON.parse(content);
        } catch {
          content = [];
        }
      }
      form.setFieldsValue({
        ...initialValues,
        content: Array.isArray(content) ? content : [],
      });
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

  const handlePreview = () => {
    const values = form.getFieldsValue();
    setPreviewValues(values);
    setShowPreview(true);
  };

  const onFinish = (values) => {
    const formatted = {
      ...values,
      type: "enrollment",
      // category 由表單 values 提供（預設 "enrollment"），不強制覆蓋
      imageWidth: parseInt(values.imageWidth) || 1000,
      imageHeight: parseInt(values.imageHeight) || 571,
      content: (values.content || []).map((c) => ({
        ...c,
        sections: (c.sections || []).map((s) => ({
          ...s,
          list: (s.list || []).filter(Boolean),
        })),
      })),
    };
    onSave(formatted);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ content: [] }}
    >
      {/* 基本資料 */}
      <Card
        title="📋 文章基本資料"
        style={{ marginBottom: 16 }}
        extra={
          <Button
            icon={<EyeOutlined />}
            onClick={handlePreview}
            size="small"
            type="default"
          >
            預覽
          </Button>
        }
      >
        <Form.Item
          name="title"
          label="文章大標題"
          rules={[{ required: true, message: "請輸入標題" }]}
          tooltip="顯示於文章列表頁和文章頁面最上方的主標題"
        >
          <Input
            placeholder="例：UIC MBA+MS Programs 2026 秋季班招生資訊"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="excerpt"
          label="摘要說明"
          tooltip="顯示在文章列表卡片上的簡短介紹（50–100 字為宜）"
        >
          <TextArea
            rows={2}
            placeholder="簡短說明此次招生資訊重點..."
            showCount
            maxLength={200}
          />
        </Form.Item>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="category"
              label="所屬分類"
              initialValue="enrollment"
              tooltip="招生資訊類型文章固定歸屬 enrollment 分類，影響前台篩選顯示"
            >
              <Select disabled>
                <Select.Option value="enrollment">🎓 招生資訊</Select.Option>
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
              tooltip="顯示於文章頁面頂部的橫幅圖片，建議尺寸 1000×571px"
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
              tooltip="文章大圖的實際寬度"
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="imageHeight"
              label="大圖高度（px）"
              initialValue={571}
              tooltip="文章大圖的實際高度"
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* 招生資訊區塊 */}
      <Card
        title="� 招生資訊區塊"
        style={{ marginBottom: 16 }}
        extra={
          <Text type="secondary" style={{ fontSize: 12 }}>
            依招生批次新增，每個批次獨立一個區塊（例：Spring 2026 春期班、Fall
            2026 秋期班）
          </Text>
        }
      >
        <Form.List name="content">
          {(
            contentFields,
            { add: addContent, remove: removeContent, move: moveContent },
          ) => (
            <>
              {contentFields.map(({ key, name, ...restField }, index) => (
                <Card
                  key={`content-${key}`}
                  size="small"
                  style={{
                    marginBottom: 16,
                    border: "2px solid #1890ff",
                    borderRadius: 8,
                  }}
                  title={
                    <span style={{ color: "#1890ff", fontWeight: "bold" }}>
                      � 資訊區塊 {index + 1}
                    </span>
                  }
                  extra={
                    <Space size={4}>
                      <Tooltip title="上移">
                        <Button
                          size="small"
                          icon={<ArrowUpOutlined />}
                          disabled={index === 0}
                          onClick={() => moveContent(index, index - 1)}
                        />
                      </Tooltip>
                      <Tooltip title="下移">
                        <Button
                          size="small"
                          icon={<ArrowDownOutlined />}
                          disabled={index === contentFields.length - 1}
                          onClick={() => moveContent(index, index + 1)}
                        />
                      </Tooltip>
                      <Button
                        size="small"
                        danger
                        icon={<MinusCircleOutlined />}
                        onClick={() => removeContent(name)}
                      >
                        刪除
                      </Button>
                    </Space>
                  }
                >
                  <Row gutter={16}>
                    <Col span={15}>
                      <Form.Item
                        {...restField}
                        name={[name, "title"]}
                        label="區塊標題"
                        tooltip="顯示為此區塊的大標題，例：Spring 2026 春期班資訊、申請此次提首期"
                      >
                        <Input placeholder="例：Spring 2026 春季班資訊" />
                      </Form.Item>
                    </Col>
                    <Col span={9}>
                      <Form.Item
                        {...restField}
                        name={[name, "flagImage"]}
                        label="國家旗幟"
                        tooltip="顯示於標題旁的國旗圖示，選擇學校所在國家"
                      >
                        <Select
                          placeholder="選擇國旗"
                          allowClear
                          options={FLAG_OPTIONS}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Divider
                    orientation="left"
                    plain
                    style={{ marginTop: 0, marginBottom: 12 }}
                  >
                    <Text type="secondary" style={{ fontSize: 13 }}>
                      📌 內容項目（可新增多項）
                    </Text>
                  </Divider>

                  {/* Section 項目 */}
                  <Form.List name={[name, "sections"]}>
                    {(
                      sectionFields,
                      {
                        add: addSection,
                        remove: removeSection,
                        move: moveSection,
                      },
                    ) => (
                      <div style={{ paddingLeft: 8 }}>
                        {sectionFields.map(
                          ({ key: sk, name: sn, ...rsf }, sIndex) => (
                            <Card
                              key={`section-${sk}`}
                              size="small"
                              type="inner"
                              style={{
                                marginBottom: 12,
                                backgroundColor: "#fafafa",
                                borderRadius: 6,
                              }}
                              title={
                                <Text type="secondary" style={{ fontSize: 13 }}>
                                  項目 {sIndex + 1}
                                </Text>
                              }
                              extra={
                                <Space size={4}>
                                  <Button
                                    size="small"
                                    icon={<ArrowUpOutlined />}
                                    disabled={sIndex === 0}
                                    onClick={() =>
                                      moveSection(sIndex, sIndex - 1)
                                    }
                                  />
                                  <Button
                                    size="small"
                                    icon={<ArrowDownOutlined />}
                                    disabled={
                                      sIndex === sectionFields.length - 1
                                    }
                                    onClick={() =>
                                      moveSection(sIndex, sIndex + 1)
                                    }
                                  />
                                  <Button
                                    size="small"
                                    danger
                                    icon={<MinusCircleOutlined />}
                                    onClick={() => removeSection(sn)}
                                  />
                                </Space>
                              }
                            >
                              <Row gutter={12} align="top">
                                <Col span={7}>
                                  <Form.Item
                                    {...rsf}
                                    name={[sn, "icon"]}
                                    label="前方圖示"
                                    tooltip="顯示在說明文字前方的圖示符號"
                                  >
                                    <Select
                                      placeholder="選擇圖示"
                                      allowClear
                                      options={ICON_OPTIONS}
                                      optionRender={(option) => (
                                        <Space>
                                          <span>
                                            {icons[option.data.value] ||
                                              option.data.value}
                                          </span>
                                          <span>{option.label}</span>
                                        </Space>
                                      )}
                                    />
                                  </Form.Item>
                                </Col>
                                <Col span={17}>
                                  <Form.Item
                                    {...rsf}
                                    name={[sn, "text"]}
                                    label="說明文字"
                                    tooltip="此項目要呈現的主要文字說明"
                                  >
                                    <TextArea
                                      rows={1}
                                      autoSize={{ minRows: 1, maxRows: 4 }}
                                      placeholder="例：申請截止日期、學費、開課資訊..."
                                    />
                                  </Form.Item>
                                </Col>
                              </Row>

                              {/* 子項目清單 */}
                              <Form.List name={[sn, "list"]}>
                                {(
                                  listFields,
                                  { add: addList, remove: removeList },
                                ) => (
                                  <div>
                                    {listFields.length > 0 && (
                                      <Text
                                        type="secondary"
                                        style={{
                                          fontSize: 12,
                                          display: "block",
                                          marginBottom: 6,
                                        }}
                                      >
                                        • 子項目清單：
                                      </Text>
                                    )}
                                    {listFields.map(
                                      ({ key: lk, name: ln, ...rlf }) => (
                                        <Space
                                          key={`list-${lk}`}
                                          style={{
                                            display: "flex",
                                            marginBottom: 6,
                                          }}
                                          align="baseline"
                                        >
                                          <Form.Item
                                            {...rlf}
                                            name={[ln]}
                                            style={{
                                              margin: 0,
                                              flex: 1,
                                              minWidth: 300,
                                            }}
                                          >
                                            <Input placeholder="例：MBA：Jan/15/2025" />
                                          </Form.Item>
                                          <MinusCircleOutlined
                                            onClick={() => removeList(ln)}
                                            style={{ color: "#ff4d4f" }}
                                          />
                                        </Space>
                                      ),
                                    )}
                                    <Button
                                      type="dashed"
                                      size="small"
                                      onClick={() => addList()}
                                      icon={<PlusOutlined />}
                                      style={{ marginTop: 4 }}
                                    >
                                      新增子項目
                                    </Button>
                                  </div>
                                )}
                              </Form.List>
                            </Card>
                          ),
                        )}

                        <Button
                          type="dashed"
                          onClick={() => addSection()}
                          block
                          icon={<PlusOutlined />}
                          style={{ borderColor: "#1890ff", color: "#1890ff" }}
                        >
                          新增內容項目
                        </Button>
                      </div>
                    )}
                  </Form.List>
                </Card>
              ))}

              <Button
                type="dashed"
                onClick={() => addContent()}
                block
                icon={<PlusOutlined />}
                size="large"
                style={{
                  borderColor: "#52c41a",
                  color: "#52c41a",
                  borderWidth: 2,
                  marginTop: 4,
                }}
              >
                ＋ 新增資訊區塊
              </Button>
            </>
          )}
        </Form.List>
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

      {/* 預覽 Modal */}
      <Modal
        title="📋 文章預覽"
        open={showPreview}
        onCancel={() => setShowPreview(false)}
        footer={[
          <Button key="close" onClick={() => setShowPreview(false)}>
            關閉
          </Button>,
        ]}
        width={760}
      >
        <div style={{ maxHeight: "70vh", overflowY: "auto", padding: "8px 0" }}>
          <EnrollmentPreview values={previewValues} />
        </div>
      </Modal>

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

export default EnrollmentEditor;
