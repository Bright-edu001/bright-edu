import React from "react";
import { Card, Tag, List, Typography, Space } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CalendarOutlined,
  BookOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const StructuredContentViewer = ({ content }) => {
  if (!content || !Array.isArray(content)) {
    return (
      <div
        style={{
          whiteSpace: "pre-wrap",
          backgroundColor: "#f5f5f5",
          padding: "16px",
          borderRadius: "4px",
          marginTop: "8px",
          maxHeight: "400px",
          overflow: "auto",
        }}
      >
        {typeof content === "object"
          ? JSON.stringify(content, null, 2)
          : content}
      </div>
    );
  }

  return (
    <div style={{ marginTop: "8px" }}>
      {content.map((section, sectionIndex) => (
        <Card
          key={sectionIndex}
          style={{ marginBottom: 16 }}
          title={
            <Space>
              <img
                src={section.flagImage}
                alt="flag"
                style={{ width: 20, height: "auto" }}
              />
              <span>{section.title}</span>
              <Tag color="blue">{section.semester}</Tag>
            </Space>
          }
        >
          {section.sections?.map((item, itemIndex) => {
            if (item.text === "開課日期" && item.items) {
              return (
                <div key={itemIndex} style={{ marginBottom: 16 }}>
                  <Title level={5}>
                    <CalendarOutlined /> {item.text}
                  </Title>
                  {item.items.map((program, programIndex) => {
                    const programType = program.text.split("：")[0];
                    const programDate = program.text.split("：")[1];

                    return (
                      <Card
                        key={programIndex}
                        size="small"
                        style={{ marginBottom: 8 }}
                        title={
                          <Space>
                            <Tag
                              color={programType === "MBA" ? "blue" : "green"}
                            >
                              {programType}
                            </Tag>
                            <Text>{programDate}</Text>
                          </Space>
                        }
                      >
                        {program.subItems?.map((subItem, subIndex) => (
                          <div key={subIndex}>
                            <Title level={5}>
                              <BookOutlined /> {subItem.text}
                            </Title>
                            <List
                              size="small"
                              dataSource={subItem.list || []}
                              renderItem={(listItem) => (
                                <List.Item>{listItem}</List.Item>
                              )}
                            />
                          </div>
                        ))}
                      </Card>
                    );
                  })}
                </div>
              );
            } else if (item.text === "Deadline" && item.items) {
              return (
                <div key={itemIndex} style={{ marginBottom: 16 }}>
                  <Title level={5}>
                    <CalendarOutlined /> {item.text}
                  </Title>
                  {item.items.map((deadline, deadlineIndex) => (
                    <Tag key={deadlineIndex} color="red">
                      {deadline.text}
                    </Tag>
                  ))}
                </div>
              );
            } else {
              return (
                <div key={itemIndex} style={{ marginBottom: 8 }}>
                  <Space>
                    {item.icon === "check" ? (
                      <CheckCircleOutlined style={{ color: "green" }} />
                    ) : (
                      <CloseCircleOutlined style={{ color: "red" }} />
                    )}
                    <Text strong>{item.text}</Text>
                  </Space>
                </div>
              );
            }
          })}
        </Card>
      ))}
    </div>
  );
};

export default StructuredContentViewer;
