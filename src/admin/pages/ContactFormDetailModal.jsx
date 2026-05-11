import React from "react";
import { Button, Modal, Tag } from "antd";
import dayjs from "dayjs";

function ContactFormDetailModal({
  open,
  contactForm,
  onClose,
  getStatusColor,
  getStatusText,
}) {
  return (
    <Modal
      title="聯絡表單詳細資料"
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          關閉
        </Button>,
      ]}
      width={600}
    >
      {contactForm && (
        <div>
          <p>
            <strong>姓名：</strong> {contactForm.name}
          </p>
          <p>
            <strong>信箱：</strong> {contactForm.email}
          </p>
          <p>
            <strong>LINE ID：</strong> {contactForm.lineId || "未提供"}
          </p>
          <p>
            <strong>訊息內容：</strong>
          </p>
          <p
            style={{
              background: "#f5f5f5",
              padding: "10px",
              borderRadius: "4px",
              whiteSpace: "pre-wrap",
            }}
          >
            {contactForm.message}
          </p>
          <p>
            <strong>狀態：</strong>
            <Tag color={getStatusColor(contactForm.status)}>
              {getStatusText(contactForm.status)}
            </Tag>
          </p>
          <p>
            <strong>建立時間：</strong>
            {dayjs(contactForm.createdAt).format("YYYY-MM-DD HH:mm:ss")}
          </p>
          <p>
            <strong>來源：</strong> {contactForm.source || "未知"}
          </p>
          {contactForm.metadata && (
            <div>
              <p>
                <strong>來源網址：</strong> {contactForm.metadata.url}
              </p>
              <p>
                <strong>推薦頁面：</strong>{" "}
                {contactForm.metadata.referrer || "直接訪問"}
              </p>
            </div>
          )}
          {contactForm.notes && (
            <p>
              <strong>備註：</strong> {contactForm.notes}
            </p>
          )}
        </div>
      )}
    </Modal>
  );
}

export default ContactFormDetailModal;
