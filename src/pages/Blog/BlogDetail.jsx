import React from "react";
import "./BlogDetail.scss";
import { useParams, Link } from "react-router-dom";
import { useBlogData } from "../../hooks/useBlogData";
import MbaAreasHero from "../../components/MbaAreasHero/MbaAreasHero";
import SearchBar from "../../components/SearchBar/SearchBar";
// import "../../styles/critical.css";
import icons from "../../data/json/icons.json";

const hashText = (text = "") => {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString();
};

// ─── BlockNote 格式渲染器 ───────────────────────────────────────────────
const renderInline = (content) => {
  if (!Array.isArray(content)) {
    // content 也可能是字串（BlockNote 簡短格式）
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
      // 不支援的型別，嘗試渲染 content
      if (block.content) {
        elements.push(<p key={block.id || i}>{renderInline(block.content)}</p>);
      }
      i++;
    }
  }
  return elements;
};
// ────────────────────────────────────────────────────────────────────────

// 遞迴渲染內容區塊的函式
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

function BlogDetail() {
  const { id } = useParams();
  const {
    enrollmentEvents = [],
    news = [],
    loading,
    error,
  } = useBlogData(["enrollmentEvents", "news"]);

  // 合併所有資料
  const all = [...enrollmentEvents, ...news];
  const blog = all.find((item) => String(item.id) === String(id));

  // 新增：處理載入與錯誤狀態
  if (loading) {
    return <div>載入中...</div>;
  }

  if (error) {
    return <div>讀取文章時發生錯誤: {error}</div>;
  }

  // 新增：判斷分類
  let subtitle = "";
  if (blog) {
    if (enrollmentEvents.some((item) => String(item.id) === String(blog.id))) {
      subtitle = "招生活動";
    } else if (news.some((item) => String(item.id) === String(blog.id))) {
      subtitle = "最新消息";
    }
  }

  // 計算分類參數用於Link
  const categoryParam = subtitle === "招生活動" ? "enrollment" : "news";

  // 搜尋與分類按鈕導向由 SearchContext handleSearch, handleCategoryClick 管理

  if (!blog) {
    return <div>找不到文章</div>;
  }

  return (
    <div>
      <MbaAreasHero />
      <div className="blog-detail-mainrow">
        <div className="blog-detail-main">
          <img
            className="blog-detail-image"
            src={blog.image}
            alt={blog.title}
            width={blog.imageWidth ?? 1000}
            height={blog.imageHeight ?? 571}
            fetchPriority="high"
          />
          <h1 className="blog-detail-title emoji-support">{blog.title}</h1>
          {/* 分類標籤：改用Link以提供href */}
          <Link
            className="blog-detail-category-label"
            to={`/blog?category=${categoryParam}`}
            title={`查看${subtitle}分類`}
          >
            {subtitle}
          </Link>
          <p className="blog-detail-excerpt">{blog.excerpt}</p>
          <div className="blog-detail-content">
            {typeof blog.content === "string"
              ? blog.content
                  .split("\n")
                  .filter((line) => line.trim() !== "")
                  .map((line, idx) => <p key={idx}>{line}</p>)
              : blog.content?._type === "blocknote"
                ? renderBlockNoteContent(blog.content.blocks || [])
                : blog.type === "enrollment"
                  ? blog.content.map((semesterInfo, index) => (
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
                          semesterInfo.sections ||
                            semesterInfo.details ||
                            semesterInfo.items,
                        )}
                      </div>
                    ))
                  : blog.type === "article" && typeof blog.content === "object"
                    ? renderSections(
                        blog.content.sections ||
                          blog.content.details ||
                          blog.content.items,
                      )
                    : null}
          </div>
          <Link to="/blog" className="blog-back-btn blog-detail-back">
            ← 返回部落格
          </Link>
          {/* 這裡可根據需求擴充更多內容 */}
        </div>
        <aside className="blog-detail-sidebar">
          {/* 關鍵字搜尋欄 */}
          <SearchBar placeholder="搜尋..." />
        </aside>
      </div>
    </div>
  );
}

export default BlogDetail;
