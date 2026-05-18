import React from "react";
import icons from "../../data/json/icons.json";

const hashText = (text = "") => {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString();
};

const renderInline = (content) => {
  if (!Array.isArray(content)) {
    return typeof content === "string" ? content : null;
  }

  return content.map((item, i) => {
    if (item.type === "text") {
      let node = item.text;
      if (item.styles?.bold) node = <strong key={i}>{node}</strong>;
      if (item.styles?.italic) node = <em key={i}>{node}</em>;
      if (item.styles?.underline) node = <u key={i}>{node}</u>;
      if (item.styles?.strikethrough) node = <s key={i}>{node}</s>;
      if (item.styles?.code) node = <code key={i}>{node}</code>;
      if (typeof node === "string") return <span key={i}>{node}</span>;
      return node;
    }

    if (item.type === "link") {
      return (
        <a key={i} href={item.href} target="_blank" rel="noopener noreferrer">
          {renderInline(item.content)}
        </a>
      );
    }

    return null;
  });
};

const renderBlockNoteContent = (blocks) => {
  if (!Array.isArray(blocks)) return null;

  const elements = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];
    if (!block) {
      i++;
      continue;
    }

    if (block.type === "paragraph") {
      elements.push(
        <p key={block.id || i}>
          {renderInline(block.content)}
          {block.children?.length > 0 && renderBlockNoteContent(block.children)}
        </p>,
      );
      i++;
    } else if (block.type === "heading") {
      const level = block.props?.level || 2;
      const Tag = `h${level}`;
      elements.push(
        <Tag key={block.id || i}>{renderInline(block.content)}</Tag>,
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
          <li key={blocks[i].id || i}>
            {renderInline(blocks[i].content)}
            {blocks[i].children?.length > 0 &&
              renderBlockNoteContent(blocks[i].children)}
          </li>,
        );
        i++;
      }

      const ListTag = isOrdered ? "ol" : "ul";
      elements.push(<ListTag key={`list-${i}`}>{items}</ListTag>);
    } else if (block.type === "image") {
      elements.push(
        <figure key={block.id || i} style={{ margin: "16px 0" }}>
          <img
            src={block.props?.url}
            alt={block.props?.caption || ""}
            style={{ maxWidth: "100%", borderRadius: 4 }}
          />
          {block.props?.caption && (
            <figcaption style={{ color: "#888", fontSize: 13, marginTop: 4 }}>
              {block.props.caption}
            </figcaption>
          )}
        </figure>,
      );
      i++;
    } else {
      if (block.content) {
        elements.push(<p key={block.id || i}>{renderInline(block.content)}</p>);
      }
      i++;
    }
  }

  return elements;
};

const renderSections = (sections, isNested = false) => {
  if (!Array.isArray(sections)) return null;

  return sections.map((item) => {
    const key = item.id || hashText(item.text || JSON.stringify(item));

    return (
      <div key={key} className={`detail-item ${isNested ? "nested" : ""}`}>
        <p>
          {item.icon && (
            <span className="detail-icon">{icons[item.icon] || item.icon}</span>
          )}
          {item.text}
        </p>
        {item.list && (
          <ul>
            {item.list.map((listItem) => (
              <li key={hashText(listItem)}>{listItem}</li>
            ))}
          </ul>
        )}
        {(item.items && renderSections(item.items, true)) ||
          (item.subItems && renderSections(item.subItems, true))}
      </div>
    );
  });
};

function BlogContentRenderer({ blog }) {
  if (typeof blog.content === "string") {
    return blog.content
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line, idx) => <p key={idx}>{line}</p>);
  }

  if (blog.content?._type === "blocknote") {
    return renderBlockNoteContent(blog.content.blocks || []);
  }

  if (blog.type === "enrollment") {
    return blog.content.map((semesterInfo, index) => (
      <div key={index} className="semester-section">
        <h2 className="emoji-support">
          {semesterInfo.flagImage && (
            <img
              src={semesterInfo.flagImage}
              alt="flag"
              className="flag-icon"
              loading="lazy"
            />
          )}
          {semesterInfo.title}
        </h2>
        {renderSections(
          semesterInfo.sections || semesterInfo.details || semesterInfo.items,
        )}
      </div>
    ));
  }

  if (blog.type === "article" && typeof blog.content === "object") {
    return renderSections(
      blog.content.sections || blog.content.details || blog.content.items,
    );
  }

  return null;
}

export default BlogContentRenderer;
