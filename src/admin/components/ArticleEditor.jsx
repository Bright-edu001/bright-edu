import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Select,
  Space,
  Divider,
  Row,
  Col,
  Upload,
  Modal,
  Spin,
  Empty,
} from "antd";
import {
  PlusOutlined,
  MinusCircleOutlined,
  SaveOutlined,
  UploadOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import useStorageImagePicker from "../hooks/useStorageImagePicker";

const { Option } = Select;
const { TextArea } = Input;

// 預設 Emoji 圖示選項
const ICON_OPTIONS = [
  {
    label: "系統圖示 (建議對應後台 SVG)",
    options: [
      { label: "✅ Check (勾選)", value: "check" },
      { label: "➡️ Arrow (箭頭)", value: "arrow" },
      { label: "📖 Book (書本)", value: "book" },
      { label: "🎉 Party (派對)", value: "party" },
      { label: "💡 Point (亮點)", value: "point" },
      { label: "⭐ Star (星星)", value: "star" },
    ],
  },
  {
    label: "常用 Emoji 圖示",
    options: [
      { label: "✅ 預設圖示", value: "✅" },
      { label: "🔥 火焰", value: "🔥" },
      { label: "✨ 閃爍", value: "✨" },
      { label: "Book", value: "book" },
      { label: "School", value: "school" },
      { label: "Grad", value: "grad" },
      { label: "Career", value: "career" },
    ],
  },
];

const FLAG_OPTIONS = [
  { label: "🇺🇸 美國 (USA)", value: "/images/flags/us-flag.webp" },
  { label: "🇬🇧 英國 (UK)", value: "/images/flags/uk-flag.webp" },
  { label: "🇨🇦 加拿大 (Canada)", value: "/images/flags/canada-flag.webp" },
  {
    label: "🇦🇺 澳洲 (Australia)",
    value: "/images/flags/australia-flag.webp",
  },
  { label: "🇳🇿 紐西蘭 (New Zealand)", value: "/images/flags/nz-flag.webp" },
];

const ArticleEditor = ({ initialValues, onSave, onCancel }) => {
  const [form] = Form.useForm();
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const {
    isPickerVisible,
    loadingImages,
    storageImages,
    openImagePicker,
    handleSelectImage,
    closePicker,
    handleUpload,
  } = useStorageImagePicker(form, {
    messages: {
      loadImagesError: "Error loading images.",
      selectImageSuccess: "Image selected",
    },
  });

  // 用於回填初始資料
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const onFinish = (values) => {
    // 確保空陣列值以 [] 處理，避免 undefined 影響結果
    const formattedValues = {
      ...values,
      content: (values.content || []).map((c) => ({
        ...c,
        sections: (c.sections || []).map((s) => ({
          ...s,
          list: s.list || [],
        })),
      })),
    };
    onSave(formattedValues);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ content: [] }}
    >
      <Card title="文章基本資料" className="mb-4">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="title"
              label="標題 (Title)"
              rules={[{ required: true, message: "請輸入標題" }]}
            >
              <Input placeholder="文章大標題" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="category"
              label="分類 (Category)"
              rules={[{ required: true, message: "請選擇分類" }]}
            >
              <Select placeholder="選擇分類">
                <Option value="enrollment">招生活動 (enrollment)</Option>
                <Option value="news">最新消息 (news)</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="image" label="主圖 URL (Image)">
              <Space.Compact style={{ width: "100%" }}>
                <Input placeholder="/images/blog/your-image.webp" />
                <Button
                  icon={<PictureOutlined />}
                  onClick={() => openImagePicker("image")}
                  title="從圖庫選擇"
                />
                <Upload
                  customRequest={(options) =>
                    handleUpload(options, "image", setUploadingImage)
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
            <Form.Item name="thumbnail" label="縮圖 URL (Thumbnail)">
              <Space.Compact style={{ width: "100%" }}>
                <Input placeholder="/images/blog/thumbnail/your-image.webp" />
                <Button
                  icon={<PictureOutlined />}
                  onClick={() => openImagePicker("thumbnail")}
                  title="從圖庫選擇"
                />
                <Upload
                  customRequest={(options) =>
                    handleUpload(options, "thumbnail", setUploadingThumbnail)
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
        <Form.Item name="excerpt" label="摘要 (Excerpt)">
          <TextArea rows={2} placeholder="文章摘要，顯示在列表卡片上" />
        </Form.Item>
      </Card>

      <Card title="文章內容編輯 (支援多層編輯)" className="mb-4">
        {/* 第一層：Content 陣列 */}
        <Form.List name="content">
          {(contentFields, { add: addContent, remove: removeContent }) => (
            <div className="content-list">
              {contentFields.map(({ key, name, ...restField }, index) => (
                <Card
                  key={`content-${key}`}
                  size="small"
                  title={`段落 (Level 1) #${index + 1}`}
                  extra={
                    <Button
                      type="text"
                      danger
                      icon={<MinusCircleOutlined />}
                      onClick={() => removeContent(name)}
                    >
                      刪除段落
                    </Button>
                  }
                  style={{ marginBottom: 16, border: "1px solid #1890ff" }}
                >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        {...restField}
                        name={[name, "title"]}
                        label="學期標題 / 區塊名稱 (Title)"
                      >
                        <Input placeholder="例：Spring 2026" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        {...restField}
                        name={[name, "flagImage"]}
                        label="國旗圖示 URL (Flag Image)"
                      >
                        <Select
                          placeholder="選擇或輸入國旗路徑"
                          allowClear
                          showSearch
                          options={FLAG_OPTIONS}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Divider orientation="left" plain>
                    章節設定 (Level 2: Sections)
                  </Divider>

                  {/* 第二層：Sections 陣列 */}
                  <Form.List name={[name, "sections"]}>
                    {(
                      sectionFields,
                      { add: addSection, remove: removeSection },
                    ) => (
                      <div className="section-list" style={{ marginLeft: 24 }}>
                        {sectionFields.map(
                          (
                            {
                              key: sectionKey,
                              name: sectionName,
                              ...restSectionField
                            },
                            sIndex,
                          ) => (
                            <Card
                              key={`section-${sectionKey}`}
                              size="small"
                              type="inner"
                              title={`段落 #${sIndex + 1}`}
                              extra={
                                <Button
                                  type="text"
                                  danger
                                  icon={<MinusCircleOutlined />}
                                  onClick={() => removeSection(sectionName)}
                                />
                              }
                              style={{
                                marginBottom: 16,
                                backgroundColor: "#fcfcfc",
                              }}
                            >
                              <Row gutter={16}>
                                <Col span={8}>
                                  <Form.Item
                                    {...restSectionField}
                                    name={[sectionName, "icon"]}
                                    label="標示圖示 (Icon)"
                                  >
                                    <Select
                                      placeholder="選擇或直接輸入 Emoji"
                                      allowClear
                                      showSearch
                                      options={ICON_OPTIONS}
                                      style={{ width: "100%" }}
                                    />
                                  </Form.Item>
                                </Col>
                                <Col span={16}>
                                  <Form.Item
                                    {...restSectionField}
                                    name={[sectionName, "text"]}
                                    label="主要文字 (Text)"
                                  >
                                    <TextArea
                                      rows={1}
                                      autoSize
                                      placeholder="段落主要說明內容"
                                    />
                                  </Form.Item>
                                </Col>
                              </Row>

                              <Divider
                                orientation="left"
                                style={{ fontSize: "12px", margin: "10px 0" }}
                                plain
                              >
                                細項列表 (Level 3: List)
                              </Divider>

                              {/* 第三層：List 陣列 */}
                              <Form.List name={[sectionName, "list"]}>
                                {(
                                  listFields,
                                  { add: addList, remove: removeList },
                                ) => (
                                  <div style={{ marginLeft: 24 }}>
                                    {listFields.map(
                                      (
                                        {
                                          key: listKey,
                                          name: listName,
                                          ...restListField
                                        },
                                        lIndex,
                                      ) => (
                                        <Space
                                          key={`list-${listKey}`}
                                          style={{
                                            display: "flex",
                                            marginBottom: 8,
                                          }}
                                          align="baseline"
                                        >
                                          <Form.Item
                                            {...restListField}
                                            name={[listName]}
                                            style={{
                                              margin: 0,
                                              minWidth: "400px",
                                            }}
                                          >
                                            <Input placeholder="詳細條目內容 (子項目)" />
                                          </Form.Item>
                                          <MinusCircleOutlined
                                            onClick={() => removeList(listName)}
                                            style={{ color: "red" }}
                                          />
                                        </Space>
                                      ),
                                    )}
                                    <Button
                                      type="dashed"
                                      onClick={() => addList()}
                                      block
                                      icon={<PlusOutlined />}
                                      style={{ marginTop: 8 }}
                                    >
                                      新增子項目 (List Item)
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
                          新增段落 (Section)
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
              >
                新增大段落 (Content Level 1)
              </Button>
            </div>
          )}
        </Form.List>
      </Card>

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
        title="從圖庫選擇"
        open={isPickerVisible}
        onCancel={closePicker}
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
                gap: "10px",
                maxHeight: "500px",
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
                      fontSize: "12px",
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

export default ArticleEditor;
