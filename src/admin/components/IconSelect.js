import React from "react";
import { Select } from "antd";
import icons from "../../data/json/icons.json";

const { Option } = Select;

const IconSelect = (props) => (
  <Select {...props} placeholder="選擇圖示">
    {Object.entries(icons).map(([key, emoji]) => (
      <Option key={key} value={key}>
        {emoji} {key}
      </Option>
    ))}
  </Select>
);

export default IconSelect;
