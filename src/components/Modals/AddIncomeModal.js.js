import React from "react";
import {
  Button,
  Modal,
  DatePicker,
  Form,
  Input,
  Select,
  InputNumber,
} from "antd";

function AddIncomeModal({ isIncomeModalVisible, handleIncomeCancel, onFinish }) {
  const [form] = Form.useForm();

  return (
    <Modal
      style={{ fontWeight: 400 }}
      title="Add Income"
      open={isIncomeModalVisible}
      onCancel={handleIncomeCancel}
      footer={null}
    // closable={true}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onFinish(values, "income");
          form.resetFields();
        }}
      >
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input the name of transaction!",
            },
          ]}
        >
          <Input type="text" className="custom-input" />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              message: "Please input the amount of transaction!",
            },
          ]}
        >
          <InputNumber type="number" className="custom-input" />
        </Form.Item>
        {/* <Form.Item
          style={{ fontWeight: 600 }}
          label="Date"
          name="date "
          rules={[
            {
              required: true,
              message: "Please input date of transaction!",
            },
          ]}
        >
          <DatePicker format="YYYY-MM-DD" className="custom-input" 
          />
        </Form.Item> */}
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Date"
          name="date"
          rules={[
            {
              required: true,
              message: "Please input date of transaction!",
            },
          ]}
        >
          <DatePicker format="YYYY-MM-DD" className="custom-input" />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Tag"
          name="tag"
          rules={[
            {
              required: true,
              message: "Please select a tag!",
            },
          ]}
        >
          <Select className="select-input-2">
            <Select.Option value="salary">Salary</Select.Option>
            <Select.Option value="Freelance">Freelance</Select.Option>
            <Select.Option value="investment">Invenstment</Select.Option>
            <Select.Option value="trading">Trading</Select.Option>
            <Select.Option value="others">Others</Select.Option>
          </Select>
        </Form.Item>
        <Button className="btn btn-blue" type="primary" htmlType="submit">
          Add Income
        </Button>
      </Form>
    </Modal>
  );
}

export default AddIncomeModal;


