import React, { memo } from "react";
import PropTypes from "prop-types";

const CourseList = ({ items = [] }) => (
  <div className="course-list">
    <ul className="course-item">
      {items.map((item, idx) => (
        <li key={item || idx}>{item}</li>
      ))}
    </ul>
  </div>
);

CourseList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
};

export default memo(CourseList);
