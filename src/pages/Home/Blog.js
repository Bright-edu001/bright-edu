import React from "react";
import "./Blog.scss";
import ImageTextSection from "../../components/ImageTextSection/ImageTextSection";
import { Link } from "react-router-dom";
import { enrollmentEvents, news } from "../../data/blog"; // 新增：從共用資料檔案引入

function BlogSection({ title, items }) {
  return (
    <section className="blog-section">
      <h2 className="blog-section-title">{title}</h2>
      <div className="blog-grid">
        {items.map((item) => (
          <Link to={item.link} className="blog-card" key={item.id}>
            <img src={item.image} alt={item.title} className="blog-card-img" />
            <div className="blog-card-content">
              <h3 className="blog-card-title">{item.title}</h3>
              <p className="blog-card-excerpt">{item.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Blog() {
  return (
    <div className="blog-page">
      <ImageTextSection
        title="活動與文章"
        imageUrl="/media/Uic/Questions-bro.png"
        imageAlt="活動與文章"
      />

      <div className="blog-content">
        <BlogSection title="招生活動" items={enrollmentEvents} />
        <BlogSection title="最新消息" items={news} />
      </div>
    </div>
  );
}

export default Blog;
