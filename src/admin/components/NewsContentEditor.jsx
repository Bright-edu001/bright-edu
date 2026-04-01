// 新聞內容編輯器，支援段落與子項目結構化編輯
import React, { useState, useEffect } from "react";
import {
  Button, // 按鈕元件
  Form, // 表單元件
  Input, // 文字輸入框
  Select, // 下拉選單
  InputNumber, // 數字輸入框
  Card, // 卡片區塊
  Space, // 間距元件
  Row,
  Col, // 格線排版
  Divider, // 分隔線
  Alert, // 提示訊息
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;

/**
 * NewsContentEditor
 * @param {Object} value - 外部傳入的內容物件，包含 sections 陣列
 * @param {Function} onChange - 當內容變更時的回呼
 */
const NewsContentEditor = ({ value, onChange }) => {
  // sections 狀態，儲存所有段落
  const [sections, setSections] = useState(value?.sections || []);

  // 外部 value 改變時，更新本地狀態
  useEffect(() => {
    setSections(value?.sections || []);
  }, [value]);

  // 當段落資料變更時，更新狀態並通知父層
  const handleSectionsChange = (newSections) => {
    setSections(newSections);
    onChange && onChange({ sections: newSections });
  };

  // 新增一個段落
  const addSection = () => {
    const newSection = {
      text: "",
      icon: null,
      items: [],
    };
    const newSections = [...sections, newSection];
    handleSectionsChange(newSections);
  };

  // 刪除指定段落
  const removeSection = (sectionIndex) => {
    const newSections = sections.filter((_, index) => index !== sectionIndex);
    handleSectionsChange(newSections);
  };

  // 更新指定段落的欄位
  const updateSection = (sectionIndex, field, newValue) => {
    const newSections = [...sections];
    newSections[sectionIndex] = {
      ...newSections[sectionIndex],
      [field]: newValue,
    };
    handleSectionsChange(newSections);
  };

  // 新增子項目到指定段落
  const addItem = (sectionIndex) => {
    const newSections = [...sections];
    if (!newSections[sectionIndex].items) {
      newSections[sectionIndex].items = [];
    }
    newSections[sectionIndex].items.push({
      text: "",
      icon: null,
    });
    handleSectionsChange(newSections);
  };

  // 刪除指定段落的子項目
  const removeItem = (sectionIndex, itemIndex) => {
    const newSections = [...sections];
    newSections[sectionIndex].items.splice(itemIndex, 1);
    handleSectionsChange(newSections);
  };

  // 更新指定段落的子項目欄位
  const updateItem = (sectionIndex, itemIndex, field, newValue) => {
    const newSections = [...sections];
    newSections[sectionIndex].items[itemIndex] = {
      ...newSections[sectionIndex].items[itemIndex],
      [field]: newValue,
    };
    handleSectionsChange(newSections);
  };

  /**
   * 渲染段落主編輯區塊
   * @param {Object} section - 段落物件
   * @param {number} sectionIndex - 段落索引
   */
  const renderTopSection = (section, sectionIndex) => {
    // 判斷是否為排名段落（TOP 開頭）
    const isTopRanking = section.text && section.text.startsWith("TOP ");
    // 取得排名數字，預設 80
    const topNumber = isTopRanking
      ? parseInt(section.text.replace("TOP ", "")) || 80
      : 80;

    return (
      <div>
        {/* 段落類型選擇（一般/排名） */}
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={24}>
            <Form.Item label="段落類型">
              <Select
                value={isTopRanking ? "ranking" : "normal"}
                onChange={(type) => {
                  const newSections = [...sections];
                  if (type === "ranking") {
                    // 切換為排名段落
                    newSections[sectionIndex] = {
                      ...newSections[sectionIndex],
                      text: `TOP ${topNumber}`,
                      icon: "star",
                    };
                  } else {
                    // 切換為一般段落
                    newSections[sectionIndex] = {
                      ...newSections[sectionIndex],
                      text: "",
                      icon: null,
                    };
                  }
                  handleSectionsChange(newSections);
                }}
                placeholder="選擇段落類型"
              >
                <Option value="normal">📝 一般段落</Option>
                <Option value="ranking">🏆 排名段落</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* 根據段落類型顯示不同編輯選項 */}
        {isTopRanking ? (
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="排名類型">
                <Select
                  value={section.icon || "star"}
                  onChange={(iconType) =>
                    updateSection(sectionIndex, "icon", iconType)
                  }
                >
                  <Option value="star">⭐ 星級排名</Option>
                  <Option value="point">📌 重點資訊</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="排名數字">
                <InputNumber
                  min={1}
                  max={500}
                  value={topNumber}
                  onChange={(number) =>
                    updateSection(sectionIndex, "text", `TOP ${number}`)
                  }
                  placeholder="例：80"
                />
              </Form.Item>
            </Col>
          </Row>
        ) : (
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="圖標類型">
                <Select
                  value={section.icon}
                  onChange={(iconType) =>
                    updateSection(sectionIndex, "icon", iconType)
                  }
                  placeholder="選擇圖標"
                  allowClear
                >
                  <Option value="star">⭐ 星級</Option>
                  <Option value="party">🎉 慶祝</Option>
                  <Option value="point">📌 重點</Option>
                  <Option value={null}>無圖標</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label="文字內容">
                <Input
                  value={section.text}
                  onChange={(e) =>
                    updateSection(sectionIndex, "text", e.target.value)
                  }
                  placeholder="請輸入文字內容"
                />
              </Form.Item>
            </Col>
          </Row>
        )}
      </div>
    );
  };

  // 主渲染區塊，包含所有段落與子項目編輯
  return (
    <div>
      {/* 編輯器提示訊息 */}
      <Alert
        message="新聞內容編輯器"
        description="您可以創建多個段落，每個段落可以包含標題和子項目。支援排名顯示（TOP 數字）功能。"
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />

      {/* 段落列表 */}
      {sections.map((section, sectionIndex) => (
        <Card
          key={sectionIndex}
          title={
            <Space>
              <span>段落 {sectionIndex + 1}</span>
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => removeSection(sectionIndex)}
                size="small"
              >
                刪除段落
              </Button>
            </Space>
          }
          style={{ marginBottom: 16 }}
        >
          {/* 段落主編輯區塊（類型、icon、文字、排名） */}
          {renderTopSection(section, sectionIndex)}

          <Divider>子項目</Divider>

          {/* 子項目列表 */}
          {section.items?.map((item, itemIndex) => (
            <Card
              key={itemIndex}
              size="small"
              title={
                <Space>
                  <span>項目 {itemIndex + 1}</span>
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => removeItem(sectionIndex, itemIndex)}
                    size="small"
                  >
                    刪除
                  </Button>
                </Space>
              }
              style={{ marginBottom: 8 }}
            >
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label="圖標類型">
                    <Select
                      value={item.icon}
                      onChange={(iconType) =>
                        updateItem(sectionIndex, itemIndex, "icon", iconType)
                      }
                      placeholder="選擇圖標"
                      allowClear
                    >
                      <Option value="star">⭐ 星級</Option>
                      <Option value="party">🎉 慶祝</Option>
                      <Option value="point">📌 重點</Option>
                      <Option value={null}>無圖標</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={16}>
                  <Form.Item label="文字內容">
                    <Input
                      value={item.text}
                      onChange={(e) =>
                        updateItem(
                          sectionIndex,
                          itemIndex,
                          "text",
                          e.target.value
                        )
                      }
                      placeholder="請輸入文字內容"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          ))}

          {/* 新增子項目按鈕 */}
          <Button
            type="dashed"
            onClick={() => addItem(sectionIndex)}
            icon={<PlusOutlined />}
            style={{ width: "100%" }}
          >
            新增子項目
          </Button>
        </Card>
      ))}

      {/* 新增段落按鈕 */}
      <Button
        type="dashed"
        onClick={addSection}
        icon={<PlusOutlined />}
        style={{ width: "100%", marginTop: 16 }}
      >
        新增段落
      </Button>
    </div>
  );
};

export default NewsContentEditor;
