import React from "react";
import { Badge, Descriptions, Form, InputNumber, Modal, Switch } from "antd";
import {
  PauseCircleOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";

function ContactFormAutoSyncModal({
  open,
  form,
  autoSyncStatus,
  onSubmit,
  onCancel,
}) {
  return (
    <Modal
      title="自動同步設定"
      open={open}
      onOk={() => form.submit()}
      onCancel={onCancel}
      okText="保存設定"
      cancelText="取消"
      width={500}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        initialValues={{
          enabled: false,
          intervalHours: 3,
        }}
      >
        <Form.Item name="enabled" valuePropName="checked" label="啟用自動同步">
          <Switch
            checkedChildren={<PlayCircleOutlined />}
            unCheckedChildren={<PauseCircleOutlined />}
          />
        </Form.Item>

        <Form.Item
          name="intervalHours"
          label="同步間隔（小時）"
          rules={[
            { required: true, message: "請設定同步間隔" },
            {
              type: "number",
              min: 1,
              max: 24,
              message: "請輸入 1-24 小時之間的數值",
            },
          ]}
        >
          <InputNumber
            min={1}
            max={24}
            step={1}
            style={{ width: "100%" }}
            placeholder="每幾小時執行一次同步"
          />
        </Form.Item>

        {autoSyncStatus && (
          <div
            style={{
              marginTop: 16,
              padding: 12,
              backgroundColor: "#f5f5f5",
              borderRadius: 6,
            }}
          >
            <Descriptions title="目前狀態" size="small" column={1}>
              <Descriptions.Item label="狀態">
                <Badge
                  status={autoSyncStatus.enabled ? "processing" : "default"}
                  text={autoSyncStatus.enabled ? "運行中" : "已停止"}
                />
              </Descriptions.Item>
              {autoSyncStatus.enabled && (
                <>
                  <Descriptions.Item label="同步間隔">
                    每 {autoSyncStatus.intervalHours} 小時
                  </Descriptions.Item>
                  {autoSyncStatus.lastSyncTime && (
                    <Descriptions.Item label="上次同步">
                      {new Date(autoSyncStatus.lastSyncTime).toLocaleString()}
                    </Descriptions.Item>
                  )}
                  {autoSyncStatus.nextSyncTime && (
                    <Descriptions.Item label="下次同步">
                      {new Date(autoSyncStatus.nextSyncTime).toLocaleString()}
                    </Descriptions.Item>
                  )}
                  {autoSyncStatus.retryCount > 0 && (
                    <Descriptions.Item label="重試次數">
                      <Badge
                        count={autoSyncStatus.retryCount}
                        color="orange"
                        style={{ backgroundColor: "#ff7875" }}
                      />
                      / {autoSyncStatus.maxRetries}
                    </Descriptions.Item>
                  )}
                </>
              )}
            </Descriptions>
          </div>
        )}

        <div
          style={{
            marginTop: 16,
            padding: 12,
            backgroundColor: "#e6f7ff",
            borderRadius: 6,
          }}
        >
          <h4 style={{ margin: "0 0 8px 0", color: "#1890ff" }}>
            💡 功能說明
          </h4>
          <ul
            style={{
              margin: 0,
              paddingLeft: 20,
              fontSize: "14px",
              color: "#666",
            }}
          >
            <li>
              自動同步會在設定的時間間隔內將 Firestore 資料同步到 Google Sheets
            </li>
            <li>如果連續失敗 3 次，自動同步會暫停，需要重新啟用</li>
            <li>建議設定 3-24 小時的間隔，避免過於頻繁的同步</li>
            <li>即使啟用自動同步，您仍可以隨時手動執行同步</li>
          </ul>
        </div>
      </Form>
    </Modal>
  );
}

export default ContactFormAutoSyncModal;
