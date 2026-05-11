import React from "react";
import { Form, Input, Modal, Select } from "antd";

const { Option } = Select;
const { TextArea } = Input;

function ContactFormEditModal({ open, form, onSubmit, onCancel }) {
  return (
    <Modal
      title="更新處理狀態"
      open={open}
      onOk={() => form.submit()}
      onCancel={onCancel}
      okText="更新"
      cancelText="取消"
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item
          name="status"
          label="處理狀態"
          rules={[{ required: true, message: "請選擇狀態" }]}
        >
          <Select>
            <Option value="pending">待處理</Option>
            <Option value="processing">處理中</Option>
            <Option value="completed">已完成</Option>
          </Select>
        </Form.Item>
        <Form.Item name="notes" label="備註">
          <TextArea rows={4} placeholder="可以記錄處理過程或其他備註..." />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ContactFormEditModal;
