import React from "react";
import {
  Button,
  Space,
  Select,
  Tooltip,
  Badge,
  Popconfirm,
} from "antd";
import {
  ReloadOutlined,
  ExportOutlined,
  SyncOutlined,
  ClearOutlined,
  ClockCircleOutlined,
  PauseCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Option } = Select;

function ContactFormsToolbar({
  statusFilter,
  onStatusFilterChange,
  syncLoading,
  onSync,
  autoSyncStatus,
  onOpenAutoSync,
  selectedRowCount,
  batchDeleteLoading,
  onBatchDelete,
  formsCount,
  onClearAll,
  onExport,
  onReload,
}) {
  return (
    <Space>
      <Select
        value={statusFilter}
        onChange={onStatusFilterChange}
        style={{ width: 120 }}
      >
        <Option value="all">全部狀態</Option>
        <Option value="pending">待處理</Option>
        <Option value="processing">處理中</Option>
        <Option value="completed">已完成</Option>
      </Select>
      <Button
        icon={<SyncOutlined />}
        onClick={onSync}
        loading={syncLoading}
        type="primary"
      >
        同步到 Google Sheets
      </Button>
      <Tooltip
        title={
          autoSyncStatus?.enabled
            ? `自動同步已啟用，每 ${autoSyncStatus.intervalHours} 小時執行一次`
            : "設定自動同步功能"
        }
      >
        <Badge
          dot={autoSyncStatus?.enabled}
          color={autoSyncStatus?.enabled ? "green" : "gray"}
        >
          <Button
            icon={
              autoSyncStatus?.enabled ? (
                <PauseCircleOutlined />
              ) : (
                <ClockCircleOutlined />
              )
            }
            onClick={onOpenAutoSync}
            type={autoSyncStatus?.enabled ? "default" : "dashed"}
          >
            自動同步
          </Button>
        </Badge>
      </Tooltip>
      <Popconfirm
        title="批量刪除"
        description={`確定要刪除選中的 ${selectedRowCount} 筆資料嗎？此操作無法復原。`}
        onConfirm={onBatchDelete}
        okText="確定刪除"
        cancelText="取消"
        okType="danger"
        disabled={selectedRowCount === 0}
      >
        <Button
          icon={<DeleteOutlined />}
          disabled={selectedRowCount === 0}
          loading={batchDeleteLoading}
          danger
        >
          刪除選中項目 ({selectedRowCount})
        </Button>
      </Popconfirm>
      <Popconfirm
        title="清除所有資料"
        description={`確定要清除所有 ${formsCount} 筆聯絡表單資料嗎？此操作無法復原。`}
        onConfirm={onClearAll}
        okText="確定清除"
        cancelText="取消"
        okType="danger"
      >
        <Button icon={<ClearOutlined />} disabled={formsCount === 0} danger>
          清除所有資料
        </Button>
      </Popconfirm>
      <Button
        icon={<ExportOutlined />}
        onClick={onExport}
        disabled={formsCount === 0}
      >
        匯出 CSV
      </Button>
      <Button icon={<ReloadOutlined />} onClick={onReload}>
        重新整理
      </Button>
    </Space>
  );
}

export default ContactFormsToolbar;
