import React from "react";

const CourseList = ({ items }) => (
  <div className="course-list">
    <ul className="course-item">
      {items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  </div>
);

export default CourseList;
