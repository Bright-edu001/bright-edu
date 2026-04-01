// 新聞內容檢視元件，負責渲染結構化新聞段落
import React from "react";
import { Card, Tag, Typography, Space } from "antd";
import {
  StarOutlined, // 排名段落 icon
  TrophyOutlined, // 活動 icon
  ExclamationCircleOutlined, // 一般重點 icon
} from "@ant-design/icons";

const { Text } = Typography;

/**
 * NewsContentViewer
 * @param {Object} content - 結構化新聞內容物件，包含 sections 陣列
 * @returns 段落渲染結果
 */
const NewsContentViewer = ({ content }) => {
  // 若內容不存在或 sections 欄位缺失，則以原始 JSON 或字串顯示
  if (!content || !content.sections) {
    return (
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
        {typeof content === "object"
          ? JSON.stringify(content, null, 2)
          : content}
      </div>
    );
  }

  // 根據 iconType 回傳對應 icon 元件
  const getIcon = (iconType) => {
    switch (iconType) {
      case "star":
        return <StarOutlined style={{ color: "#faad14" }} />; // 排名
      case "party":
        return <TrophyOutlined style={{ color: "#52c41a" }} />; // 活動
      case "point":
        return <ExclamationCircleOutlined style={{ color: "#1890ff" }} />; // 一般重點
      default:
        return null;
    }
  };

  // 根據 iconType 回傳對應標籤顏色
  const getTagColor = (iconType) => {
    switch (iconType) {
      case "star":
        return "gold";
      case "party":
        return "green";
      case "point":
        return "blue";
      default:
        return "default";
    }
  };

  // 渲染所有段落，每個 section 可能有 icon、TOP 標籤、子項目
  return (
    <div style={{ marginTop: "8px" }}>
      {content.sections.map((section, sectionIndex) => (
        <Card
          key={sectionIndex}
          style={{ marginBottom: 16 }}
          bodyStyle={{ padding: "16px" }}
        >
          {/* 段落主標題區塊，包含 icon 與文字或 TOP 標籤 */}
          <div style={{ marginBottom: 12 }}>
            <Space align="center">
              {/* 段落 icon */}
              {section.icon && getIcon(section.icon)}
              {/* 若為排名段落則顯示 TOP 標籤，否則顯示一般文字 */}
              {section.text.startsWith("TOP ") ? (
                <Tag
                  color={getTagColor(section.icon)}
                  style={{ fontSize: "16px", padding: "4px 8px" }}
                >
                  {section.text}
                </Tag>
              ) : (
                <Text strong style={{ fontSize: "16px" }}>
                  {section.text}
                </Text>
              )}
            </Space>
          </div>

          {/* 段落子項目區塊，若有 items 則逐一渲染 */}
          {section.items && section.items.length > 0 && (
            <div style={{ marginLeft: 16 }}>
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} style={{ marginBottom: 8 }}>
                  <Space align="center">
                    {/* 子項目 icon */}
                    {item.icon && getIcon(item.icon)}
                    {/* 子項目文字 */}
                    <Text>{item.text}</Text>
                  </Space>
                </div>
              ))}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

export default NewsContentViewer;
