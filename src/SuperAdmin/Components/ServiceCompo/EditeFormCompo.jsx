import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Modal, Space, Upload, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const EditItemForm = ({ open, onUpdate, onCancel, initialData }) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const getData = async () => {
        try {
          const res = await axios.get('http://localhost:3000/service/getData');
          setData(res.data.data);
        } catch (err) {
          console.error(err);
        }
      };
    
     

    useEffect(() => {
        if (initialData) {
            form.setFieldsValue({
                name: initialData.name,
                subname: initialData.subname,
                description: initialData.description || [],
            });

            if (initialData.image) {
                setFileList([{ uid: initialData._id, url: `http://localhost:3000/images/${initialData.image}`, name: initialData.image }]);
            } else {
                setFileList([]);
            }
        }
        getData();
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
            formData.append('subname', values.subname);
            formData.append('description', JSON.stringify(values.description)); // Serialize the description list
    
            // Handle image file
            if (fileList.length > 0 && fileList[0].originFileObj) {
                formData.append('image', fileList[0].originFileObj);
            } else {
                formData.append('image', initialData?.image || '');
            }
    
            try {
                const response = await axios.put(`http://localhost:3000/service/update/${initialData._id}`, formData, {
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

                                    {/* Subtitles Form List */}
                                    <Form.List name={[name, 'subtitle']}>
                                        {(subFields, { add: addSubtitle, remove: removeSubtitle }) => (
                                            <>
                                                {subFields.map((subField, subIndex) => (
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
                                                    <Button type="dashed" onClick={() => addSubtitle()} icon={<PlusOutlined />}>
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

export default EditItemForm;
