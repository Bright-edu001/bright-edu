import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Card,
  Space,
  Tag,
  Row,
  Col,
  Divider,
  Alert,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Option } = Select;
const { TextArea } = Input;

const StructuredContentEditor = ({ value, onChange }) => {
  const [sections, setSections] = useState(value || []);

  // 當 value 屬性改變時，更新內部狀態
  useEffect(() => {
    setSections(value || []);
  }, [value]);

  const handleSectionChange = (sectionIndex, field, newValue) => {
    const newSections = [...sections];
    newSections[sectionIndex] = {
      ...newSections[sectionIndex],
      [field]: newValue,
    };
    setSections(newSections);
    onChange && onChange(newSections);
  };

  const addSection = () => {
    const newSection = {
      semester: "",
      title: "",
      flagImage: "/images/flags/us-flag.webp",
      sections: [
        {
          icon: "check",
          text: "目前已經開放申請",
        },
        {
          icon: "check",
          text: "開課日期",
          items: [],
        },
        {
          icon: "check",
          text: "Deadline",
          items: [
            {
              icon: "arrow",
              text: "",
            },
          ],
        },
      ],
    };
    const newSections = [...sections, newSection];
    setSections(newSections);
    onChange && onChange(newSections);
  };

  const removeSection = (sectionIndex) => {
    const newSections = sections.filter((_, index) => index !== sectionIndex);
    setSections(newSections);
    onChange && onChange(newSections);
  };

  const addProgram = (sectionIndex, programType) => {
    const newSections = [...sections];
    const courseDateSection = newSections[sectionIndex].sections.find(
      (s) => s.text === "開課日期"
    );

    if (courseDateSection) {
      const newProgram = {
        icon: "arrow",
        text: `${programType}：`,
        subItems: [
          {
            icon: "book",
            text: `${programType}開課領域:`,
            list:
              programType === "MBA"
                ? [
                    "Management 管理學領域",
                    "Business Analytics 商業分析領域",
                    "Finance 金融財經領域",
                    "Marketing 行銷領域",
                    "Human Resource Management 人力資源管理領域",
                  ]
                : [
                    "MS in Supply Chain and Operations Management",
                    "MS in Business Analytics",
                    "MS in Finance",
                    "MS in Management Information Systems",
                    "MS in Marketing",
                    "MS in Accounting",
                  ],
          },
        ],
      };

      if (!courseDateSection.items) {
        courseDateSection.items = [];
      }
      courseDateSection.items.push(newProgram);
    }

    setSections(newSections);
    onChange && onChange(newSections);
  };

  const updateProgramDate = (sectionIndex, programIndex, date) => {
    const newSections = [...sections];
    const courseDateSection = newSections[sectionIndex].sections.find(
      (s) => s.text === "開課日期"
    );

    if (courseDateSection && courseDateSection.items[programIndex]) {
      const programType =
        courseDateSection.items[programIndex].text.split("：")[0];
      courseDateSection.items[programIndex].text = `${programType}：${date}`;
    }

    setSections(newSections);
    onChange && onChange(newSections);
  };

  const updateDeadline = (sectionIndex, date) => {
    const newSections = [...sections];
    const deadlineSection = newSections[sectionIndex].sections.find(
      (s) => s.text === "Deadline"
    );

    if (deadlineSection && deadlineSection.items[0]) {
      deadlineSection.items[0].text = `${date} (目前最新公布截止日、若有更新則以更新為準)`;
    }

    setSections(newSections);
    onChange && onChange(newSections);
  };

  const updateApplicationStatus = (sectionIndex, status) => {
    const newSections = [...sections];
    const statusSection = newSections[sectionIndex].sections[0];

    if (statusSection) {
      statusSection.icon = status;
      statusSection.text =
        status === "check" ? "目前已經開放申請" : "尚未開放申請";
    }

    setSections(newSections);
    onChange && onChange(newSections);
  };

  const updateSpecializationList = (sectionIndex, programIndex, newList) => {
    const newSections = [...sections];
    const courseDateSection = newSections[sectionIndex].sections.find(
      (s) => s.text === "開課日期"
    );

    if (
      courseDateSection &&
      courseDateSection.items[programIndex] &&
      courseDateSection.items[programIndex].subItems[0]
    ) {
      courseDateSection.items[programIndex].subItems[0].list = newList
        .split("\n")
        .filter((item) => item.trim());
    }

    setSections(newSections);
    onChange && onChange(newSections);
  };

  const removeProgramFromSection = (sectionIndex, programIndex) => {
    const newSections = [...sections];
    const courseDateSection = newSections[sectionIndex].sections.find(
      (s) => s.text === "開課日期"
    );

    if (courseDateSection && courseDateSection.items) {
      courseDateSection.items.splice(programIndex, 1);
    }

    setSections(newSections);
    onChange && onChange(newSections);
  };

  return (
    <div>
      <Alert
        message="結構化內容編輯器"
        description="您可以為每個學期創建一個章節，包含申請狀態、開課日期和截止日期等資訊。"
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />

      {sections.map((section, sectionIndex) => (
        <Card
          key={sectionIndex}
          title={
            <Space>
              <span>章節 {sectionIndex + 1}</span>
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => removeSection(sectionIndex)}
                size="small"
              >
                刪除章節
              </Button>
            </Space>
          }
          style={{ marginBottom: 16 }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="學期" required>
                <Input
                  value={section.semester}
                  onChange={(e) =>
                    handleSectionChange(
                      sectionIndex,
                      "semester",
                      e.target.value
                    )
                  }
                  placeholder="例：Spring 2026"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="標題" required>
                <Input
                  value={section.title}
                  onChange={(e) =>
                    handleSectionChange(sectionIndex, "title", e.target.value)
                  }
                  placeholder="例：Spring 2026 春季班資訊"
                />
              </Form.Item>
            </Col>
          </Row>

          <Divider>申請狀態</Divider>
          <Form.Item label="申請狀態">
            <Select
              value={section.sections[0]?.icon || "check"}
              onChange={(status) =>
                updateApplicationStatus(sectionIndex, status)
              }
            >
              <Option value="check">
                <CheckCircleOutlined style={{ color: "green" }} />{" "}
                目前已經開放申請
              </Option>
              <Option value="none">
                <CloseCircleOutlined style={{ color: "red" }} /> 尚未開放申請
              </Option>
            </Select>
          </Form.Item>

          <Divider>課程資訊</Divider>
          <div style={{ marginBottom: 16 }}>
            <Space>
              <Button
                type="dashed"
                icon={<PlusOutlined />}
                onClick={() => addProgram(sectionIndex, "MBA")}
              >
                新增 MBA 課程
              </Button>
              <Button
                type="dashed"
                icon={<PlusOutlined />}
                onClick={() => addProgram(sectionIndex, "MS")}
              >
                新增 MS 課程
              </Button>
            </Space>
          </div>

          {section.sections
            .find((s) => s.text === "開課日期")
            ?.items?.map((program, programIndex) => {
              const programType = program.text.split("：")[0];
              const currentDate = program.text.split("：")[1] || "";

              return (
                <Card
                  key={programIndex}
                  size="small"
                  title={
                    <Space>
                      <Tag color={programType === "MBA" ? "blue" : "green"}>
                        {programType}
                      </Tag>
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() =>
                          removeProgramFromSection(sectionIndex, programIndex)
                        }
                        size="small"
                      >
                        刪除
                      </Button>
                    </Space>
                  }
                  style={{ marginBottom: 8 }}
                >
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item label="開課日期">
                        <DatePicker
                          value={
                            currentDate
                              ? dayjs(currentDate, "MMM/DD/YYYY")
                              : null
                          }
                          onChange={(date, dateString) =>
                            updateProgramDate(
                              sectionIndex,
                              programIndex,
                              date ? date.format("MMM/DD/YYYY") : ""
                            )
                          }
                          format="MMM/DD/YYYY"
                          placeholder="選擇開課日期"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={16}>
                      <Form.Item label="課程領域 (每行一個)">
                        <TextArea
                          rows={4}
                          value={program.subItems?.[0]?.list?.join("\n") || ""}
                          onChange={(e) =>
                            updateSpecializationList(
                              sectionIndex,
                              programIndex,
                              e.target.value
                            )
                          }
                          placeholder="每行輸入一個課程領域"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              );
            })}

          <Divider>截止日期</Divider>
          <Form.Item label="申請截止日期">
            <DatePicker
              value={
                section.sections
                  .find((s) => s.text === "Deadline")
                  ?.items?.[0]?.text?.match(/^([^(]+)/)?.[1]
                  ?.trim()
                  ? dayjs(
                      section.sections
                        .find((s) => s.text === "Deadline")
                        ?.items?.[0]?.text?.match(/^([^(]+)/)?.[1]
                        ?.trim(),
                      "MMM/YYYY"
                    )
                  : null
              }
              onChange={(date, dateString) =>
                updateDeadline(
                  sectionIndex,
                  date ? date.format("MMM/YYYY") : ""
                )
              }
              format="MMM/YYYY"
              placeholder="選擇截止日期"
              picker="month"
            />
          </Form.Item>
        </Card>
      ))}

      <Button
        type="dashed"
        onClick={addSection}
        icon={<PlusOutlined />}
        style={{ width: "100%", marginTop: 16 }}
      >
        新增章節
      </Button>
    </div>
  );
};

export default StructuredContentEditor;
