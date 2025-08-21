import React from "react";
import { Button, Form, Input, Space, Card, message } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import IconSelect from "../components/IconSelect";
import { saveEnrollmentNews } from "../data/enrollmentNewsApi";

const EnrollmentNewsPage = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const serialized = { sections: values.sections || [] };
    try {
      await saveEnrollmentNews(serialized);
      message.success("資料已儲存");
      form.resetFields();
    } catch (err) {
      console.error(err);
      message.error("儲存失敗");
    }
  };

  return (
    <Card title="招生活動 / 最新消息 編輯">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.List name="sections">
          {(fields, { add, remove }) => (
            <div>
              {fields.map((field) => (
                <Card
                  key={field.key}
                  type="inner"
                  title={
                    <Space align="center">
                      <Form.Item
                        {...field}
                        name={[field.name, "title"]}
                        fieldKey={[field.fieldKey, "title"]}
                        rules={[{ required: true, message: "請輸入標題" }]}
                        style={{ marginBottom: 0 }}
                      >
                        <Input placeholder="Section 標題" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Space>
                  }
                  style={{ marginBottom: 16 }}
                >
                  <Form.List name={[field.name, "items"]}>
                    {(itemFields, { add: addItem, remove: removeItem }) => (
                      <div>
                        {itemFields.map((item) => (
                          <Space
                            key={item.key}
                            align="baseline"
                            style={{ display: "flex", marginBottom: 8 }}
                          >
                            <Form.Item
                              {...item}
                              name={[item.name, "icon"]}
                              fieldKey={[item.fieldKey, "icon"]}
                              rules={[
                                { required: true, message: "請選擇 icon" },
                              ]}
                            >
                              <IconSelect />
                            </Form.Item>
                            <Form.Item
                              {...item}
                              name={[item.name, "text"]}
                              fieldKey={[item.fieldKey, "text"]}
                              rules={[
                                { required: true, message: "請輸入內容" },
                              ]}
                            >
                              <Input placeholder="內容" />
                            </Form.Item>
                            <MinusCircleOutlined
                              onClick={() => removeItem(item.name)}
                            />
                          </Space>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => addItem()}
                            icon={<PlusOutlined />}
                          >
                            新增 Item
                          </Button>
                        </Form.Item>
                      </div>
                    )}
                  </Form.List>
                </Card>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  block
                >
                  新增 Section
                </Button>
              </Form.Item>
            </div>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            儲存
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default EnrollmentNewsPage;
