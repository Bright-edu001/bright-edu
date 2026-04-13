// 新聞內容檢視元件，負責渲染結構化新聞段落
import React from "react";
import { Card, Tag, Typography, Space } from "antd";
import {
  StarOutlined,
  TrophyOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

// ── 簡易 BlockNote 純文字渲染（後台檢視用）─────────────────────────────
const renderBNInline = (content) => {
  if (!content) return null;
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return null;
  return content.map((item, i) => {
    if (item.type === "text") {
      let node = item.text;
      if (item.styles?.bold) node = <strong key={i}>{node}</strong>;
      if (item.styles?.italic) node = <em key={i}>{node}</em>;
      if (typeof node === "string") return <span key={i}>{node}</span>;
      return node;
    }
    if (item.type === "link")
      return (
        <a key={i} href={item.href}>
          {renderBNInline(item.content)}
        </a>
      );
    return null;
  });
};

const BlockNoteViewer = ({ blocks }) => {
  if (!Array.isArray(blocks) || blocks.length === 0) {
    return <Text type="secondary">（無內容）</Text>;
  }
  const elements = [];
  let i = 0;
  while (i < blocks.length) {
    const block = blocks[i];
    if (!block) {
      i++;
      continue;
    }
    if (block.type === "paragraph") {
      elements.push(<p key={block.id || i}>{renderBNInline(block.content)}</p>);
      i++;
    } else if (block.type === "heading") {
      const level = block.props?.level || 2;
      const Tag = `h${level}`;
      elements.push(
        <Tag key={block.id || i} style={{ marginTop: 12 }}>
          {renderBNInline(block.content)}
        </Tag>,
      );
      i++;
    } else if (
      block.type === "bulletListItem" ||
      block.type === "numberedListItem"
    ) {
      const isOrdered = block.type === "numberedListItem";
      const items = [];
      while (i < blocks.length && blocks[i]?.type === block.type) {
        items.push(
          <li key={blocks[i].id || i}>{renderBNInline(blocks[i].content)}</li>,
        );
        i++;
      }
      const ListTag = isOrdered ? "ol" : "ul";
      elements.push(<ListTag key={`list-${i}`}>{items}</ListTag>);
    } else if (block.type === "image") {
      elements.push(
        <div key={block.id || i} style={{ margin: "8px 0" }}>
          <img
            src={block.props?.url}
            alt={block.props?.caption || ""}
            style={{
              maxWidth: "100%",
              maxHeight: 200,
              objectFit: "contain",
              borderRadius: 4,
            }}
          />
          {block.props?.caption && (
            <div style={{ color: "#888", fontSize: 12 }}>
              {block.props.caption}
            </div>
          )}
        </div>,
      );
      i++;
    } else {
      if (block.content)
        elements.push(
          <p key={block.id || i}>{renderBNInline(block.content)}</p>,
        );
      i++;
    }
  }
  return <div style={{ lineHeight: 1.8 }}>{elements}</div>;
};
// ─────────────────────────────────────────────────────────────────────────

/**
 * NewsContentViewer
 * 支援：新版 BlockNote 格式、舊版 sections 格式、純字串
 */
const NewsContentViewer = ({ content }) => {
  // 新版 BlockNote 格式
  if (content && content._type === "blocknote") {
    return (
      <div
        style={{
          marginTop: 8,
          padding: "12px 16px",
          background: "#fafafa",
          borderRadius: 4,
        }}
      >
        <BlockNoteViewer blocks={content.blocks || []} />
      </div>
    );
  }

  // 舊版 sections 格式或無 sections 時
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

  const getIcon = (iconType) => {
    switch (iconType) {
      case "star":
        return <StarOutlined style={{ color: "#faad14" }} />;
      case "party":
        return <TrophyOutlined style={{ color: "#52c41a" }} />;
      case "point":
        return <ExclamationCircleOutlined style={{ color: "#1890ff" }} />;
      default:
        return null;
    }
  };

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

  return (
    <div style={{ marginTop: "8px" }}>
      {content.sections.map((section, sectionIndex) => (
        <Card
          key={sectionIndex}
          style={{ marginBottom: 16 }}
          bodyStyle={{ padding: "16px" }}
        >
          <div style={{ marginBottom: 12 }}>
            <Space align="center">
              {section.icon && getIcon(section.icon)}
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

          {section.items && section.items.length > 0 && (
            <div style={{ marginLeft: 16 }}>
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} style={{ marginBottom: 8 }}>
                  <Space align="center">
                    {item.icon && getIcon(item.icon)}
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
