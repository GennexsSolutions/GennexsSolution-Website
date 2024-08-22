import React, { useState } from 'react';
import { Form, Input, Button, Modal, Space, Upload, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const AddItemForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);

    const handleFileChange = ({ fileList }) => {
        console.log("File list:", fileList);
        setFileList(fileList);
    };
    

    const handleUpload = async () => {
        try {
            const values = await form.validateFields();
            console.log("Form values:", values);
    
            if (!fileList.length) {
                message.error("Please select an image file.");
                return;
            }
    
            const originalFile = fileList[0].originFileObj; // Access the actual file object
            const fileExtension = originalFile.name.split('.').pop(); // Extract the file extension
            const newFileName = `${Date.now()}.${fileExtension}`; // Generate new name with the same extension
    
            // Prepare form data
            const formData = new FormData();
            formData.append('image', originalFile, newFileName); // Append the file with the new name
    
            // Append other form data
            formData.append('name', values.name);
            formData.append('subname', values.subname);
            formData.append('description', JSON.stringify(values.description.map((desc) => ({
                title: desc.title,
                subtitle: desc.subtitles.map((subtitle) => ({
                    namesubtitle: subtitle.namesubtitle,
                })),
            }))));
    
            console.log("Prepared form data:", formData);
    
            await sendDataToAPI(formData);
            console.log("Data sent to API successfully");
    
            form.resetFields();
            setFileList([]);
            onCreate();
            message.success("Item added successfully!");
        } catch (error) {
            console.error('Error during submission:', error);
            message.error("Failed to add item.");
        }
    };
    
    

    const sendDataToAPI = async (formData) => {
        try {
            console.log("Sending data to API:", formData);
            const response = await axios.post('http://localhost:3000/service/insertservice', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Important for file uploads
                },
            });
            console.log("API response:", response.data);
    
            if (response.status !== 201) {
                throw new Error('Failed to insert data');
            }
        } catch (error) {
            if (error.response) {
                console.error("Error response data:", error.response.data);
                console.error("Error response status:", error.response.status);
                console.error("Error response headers:", error.response.headers);
            } else if (error.request) {
                console.error("Error request data:", error.request);
            } else {
                console.error("Error message:", error.message);
            }
            throw error;
        }
    };
    
    
    


    return (
        <Modal
            visible={visible}
            title="Add New Item"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={handleUpload}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{ modifier: 'public' }}
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Please input the name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="subname"
                    label="Subname"
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

                <Form.List name="description">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, fieldKey, ...restField }) => (
                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'title']}
                                        fieldKey={[fieldKey, 'title']}
                                        rules={[{ required: true, message: 'Missing title' }]}
                                    >
                                        <Input placeholder="Title" />
                                    </Form.Item>

                                    <Form.List name={[name, 'subtitles']}>
                                        {(subFields, { add: addSubtitle, remove: removeSubtitle }) => (
                                            <>
                                                {subFields.map((subField) => (
                                                    <Space key={subField.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                                        <Form.Item
                                                            {...subField}
                                                            name={[subField.name, 'namesubtitle']}
                                                            fieldKey={[subField.fieldKey, 'namesubtitle']}
                                                            rules={[{ required: true, message: 'Missing subtitle' }]}
                                                        >
                                                            <Input placeholder="Subtitle" />
                                                        </Form.Item>
                                                        <MinusCircleOutlined onClick={() => removeSubtitle(subField.name)} />
                                                    </Space>
                                                ))}
                                                <Form.Item>
                                                    <Button
                                                        type="dashed"
                                                        onClick={() => addSubtitle()}
                                                        icon={<PlusOutlined />}
                                                    >
                                                        Add Subtitle
                                                    </Button>
                                                </Form.Item>
                                            </>
                                        )}
                                    </Form.List>

                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    icon={<PlusOutlined />}
                                >
                                    Add Description
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form>
        </Modal>
    );
};

export default AddItemForm;
