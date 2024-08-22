import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Modal, Space, Upload, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const EditItemForm = ({ open, onUpdate, onCancel, initialData }) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        if (initialData) {
            form.setFieldsValue({
                name: initialData.name,
                position: initialData.position,
            });

            if (initialData.image) {
                setFileList([{ uid: initialData._id, url: `http://localhost:3000/images/${initialData.image}`, name: initialData.image }]);
            } else {
                setFileList([]);
            }
        }
       
    }, [initialData, form]);

    const handleFileChange = ({ fileList }) => {
        setFileList(fileList);
    };

    const handleUpdate = async () => {
        try {
            const values = await form.validateFields();
            console.log("Form Values:", values);
    
            // Create a FormData object
            const formData = new FormData();
            formData.append('_id', initialData._id);
            formData.append('name', values.name);
            formData.append('position', values.position); // Serialize the description list
    
            // Handle image file
            if (fileList.length > 0 && fileList[0].originFileObj) {
                formData.append('image', fileList[0].originFileObj);
            } else {
                formData.append('image', initialData?.image || '');
            }
    
            try {
                const response = await axios.put(`http://localhost:3000/teams/update/${initialData._id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
    
                console.log("Response:", response);
    
                if (response.status === 200) {
                    message.success('Item updated successfully!');
                    onUpdate({ ...values, image: fileList.length > 0 ? fileList[0].name : initialData?.image });
                    form.resetFields();
                    setFileList([]);
                    getData()
                } else {
                    throw new Error('Failed to update data');
                }
            } catch (error) {
                console.error('Failed to update data:', error.response?.data || error.message);
                message.error('Failed to update the item.');
            }
    
        } catch (error) {
            console.error('Validation Failed:', error);
            message.error('Validation failed.');
        }
    };
    

    return (
        <Modal
            open={open}
            title="Edit Item"
            okText="Update"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={handleUpdate}
        >
            <Form
                form={form}
                layout="vertical"
                name="edit_form"
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Please input the name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="position"
                    label="Position"
                    rules={[{ required: true, message: 'Please input the subname!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="image"
                    label="Image"
                >
                    <Upload
                        listType="picture"
                        fileList={fileList}
                        beforeUpload={() => false}
                        onChange={handleFileChange}
                    >
                        <Button icon={<UploadOutlined />}>Select Image</Button>
                    </Upload>
                </Form.Item>

               
            </Form>
        </Modal>
    );
};

export default EditItemForm;
