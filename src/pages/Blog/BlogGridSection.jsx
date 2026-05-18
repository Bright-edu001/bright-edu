import React from "react";
import ArticleCard from "../../components/ArticleCard/ArticleCard";

function BlogGridSection({ title, items, imageType, renderItem }) {
  return (
    <section className="blog-section">
      {title && <h2 className="blog-section-title">{title}</h2>}
      <div className="blog-grid">
        {items.map((item) =>
          renderItem ? (
            renderItem(item)
          ) : (
            <ArticleCard key={item.id} item={item} imageType={imageType} />
          ),
        )}
      </div>
    </section>
  );
}

export default BlogGridSection;
