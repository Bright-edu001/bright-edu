import React from "react";
import { Tooltip, Tag, Space, Button, Popconfirm } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

export const createContactFormsColumns = ({
  onView,
  onEdit,
  onDelete,
  getStatusColor,
  getStatusText,
}) => [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
    width: 100,
    sorter: (a, b) => a.name.localeCompare(b.name, "zh-TW"),
    showSorterTooltip: false,
  },
  {
    title: "信箱",
    dataIndex: "email",
    key: "email",
    width: 200,
    sorter: (a, b) => a.email.localeCompare(b.email),
    showSorterTooltip: false,
  },
  {
    title: "LINE ID",
    dataIndex: "lineId",
    key: "lineId",
    width: 120,
    sorter: (a, b) => {
      const aValue = a.lineId || "";
      const bValue = b.lineId || "";
      return aValue.localeCompare(bValue);
    },
    showSorterTooltip: false,
    render: (text) => text || "-",
  },
  {
    title: "訊息",
    dataIndex: "message",
    key: "message",
    ellipsis: {
      showTitle: false,
    },
    sorter: (a, b) => a.message.localeCompare(b.message, "zh-TW"),
    showSorterTooltip: false,
    render: (text) => (
      <Tooltip placement="topLeft" title={text}>
        {text}
      </Tooltip>
    ),
  },
  {
    title: "狀態",
    dataIndex: "status",
    key: "status",
    width: 100,
    sorter: (a, b) => {
      const statusOrder = { pending: 1, processing: 2, completed: 3 };
      return statusOrder[a.status] - statusOrder[b.status];
    },
    showSorterTooltip: false,
    render: (status) => (
      <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
    ),
  },
  {
    title: "建立時間",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 150,
    sorter: (a, b) => {
      const aTime = dayjs(a.createdAt);
      const bTime = dayjs(b.createdAt);
      return aTime.isBefore(bTime) ? -1 : aTime.isAfter(bTime) ? 1 : 0;
    },
    defaultSortOrder: "descend", // 預設按建立時間降序排列（最新的在前）
    showSorterTooltip: false,
    render: (date) => dayjs(date).format("MM/DD HH:mm"),
  },
  {
    title: "操作",
    key: "actions",
    width: 150,
    render: (_, record) => (
      <Space size="small">
        <Button
          type="text"
          icon={<EyeOutlined />}
          onClick={() => onView(record)}
          size="small"
        />
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={() => onEdit(record)}
          size="small"
        />
        <Popconfirm
          title="確定要刪除這筆資料嗎？"
          onConfirm={() => onDelete(record.id)}
          okText="確定"
          cancelText="取消"
        >
          <Button type="text" danger icon={<DeleteOutlined />} size="small" />
        </Popconfirm>
      </Space>
    ),
  },
];
