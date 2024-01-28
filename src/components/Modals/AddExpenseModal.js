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

function AddExpenseModal({
    isExpenseModalVisible,
    handleExpenseCancel,
    onFinish,
}) {
    const [form] = Form.useForm();

    return (
        <Modal
            style={{ fontWeight: 400 }}
            title="Add Expense"
            open={isExpenseModalVisible}
            onCancel={handleExpenseCancel}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={(values) => {
                    onFinish(values, "expense");
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
                    {/* <InputNumber /> */}
                </Form.Item>
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
                        <Select.Option value="food">Food</Select.Option>
                        <Select.Option value="education">Education</Select.Option>
                        <Select.Option value="shopping">Shopping</Select.Option>
                        <Select.Option value="trading">Trading</Select.Option>
                        <Select.Option value="others">Others</Select.Option>
                    </Select>
                </Form.Item>
                <Button className="btn btn-blue" type="primary" htmlType="submit">
                    Add Expense
                </Button>
            </Form>
        </Modal>
    );
}

export default AddExpenseModal;
