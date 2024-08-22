import React, { useState, useEffect } from 'react';
import { Button, Layout, Menu, Divider, Modal, message, Table, Form, Input,theme } from 'antd';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  ContactsOutlined,
  CustomerServiceOutlined,
  ProjectOutlined,
  TeamOutlined
} from '@ant-design/icons';
import logo from '../../../assets/images/logo.jpeg';

const { Header, Sider, Content } = Layout;

const HomeAdmin = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [data, setData] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({ description: "", image: [] });
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const getData = async () => {
    try {
      const res = await axios.get('https://api-website-admin-gennexsolutions.onrender.com/home/getData');
      setData(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  const handleAddItem = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("description", formData.description);

    fileList.forEach((file, index) => {
      if (file.originFileObj) {
        formDataToSend.append(`image`, file.originFileObj);
      }
    });

    try {
      await axios.post('http://localhost:3000/home/insertHome', formDataToSend, { headers: { 'Content-Type': 'multipart/form-data' } });
      message.success("ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ");
      setIsModalVisible(false);
      setFileList([]);
      setFormData({ description: "", image: [] });
      getData();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setFileList([]);
  };

  const handleChangeValue = (changedValues) => {
    setFormData({
        ...formData,
        ...changedValues,
    });
  };

  const onChangeImage = ({ fileList }) => {
    setFileList(fileList);
};
const onPreview = async (file) => {
  let src = file.url;
  if (!src) {
      src = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj);
          reader.onload = () => resolve(reader.result);
      });
  }
  const image = new Image();
  image.src = src;
  const imgWindow = window.open(src);
  imgWindow?.document.write(image.outerHTML);
};
const handleRemoveImage = async (file) => {
  try {
      if (file.url) {
          const imageName = file.url.split('/').pop();
          await axios.delete(`https://api-website-admin-gennexsolutions.onrender.com/home/deleteImage/${imageName}`);
          message.success('ລົບຮູບພາບສຳເລັດ');
          getData(); // Refresh data
      }
  } catch (error) {
      console.error("Error deleting image:", error);
      message.error('Failed to delete image');
  }
};


const handleUpdateOk = async () => {
  try {
    // Create a new FormData object to send the updated data
    const formDataToSend = new FormData();
    formDataToSend.append("description", formData.description);

    // Append the images to the form data
    fileList.forEach((file, index) => {
      if (file.originFileObj) {
        formDataToSend.append(`image`, file.originFileObj);
      }
    });

    // Make the PUT request to update the data with the specific ID
    const response = await axios.put(`http://localhost:3000/home/update/${currentItem._id}`, formDataToSend, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    message.success("ອັບເດດຂໍ້ມູນສຳເລັດ")

    // Close the modal and reset the form and fileList states
    setIsUpdateModalVisible(false);
    setFileList([]);
    setFormData({ description: "", image: [] });

    // Refresh the data
    getData();
  } catch (error) {
    console.error('Error:', error);
    message.error('Failed to update the item');
  }
};



const handleUpdate = (record) => {
  setCurrentItem(record);
  setFormData({
      description: record.description,
      image: record.image ? record.image.map((img) => ({
          uid: img,
          name: img,
          status: 'done',
          url: `https://api-website-admin-gennexsolutions.onrender.com/images/${img}`,
      })) : [],
  });

  const fileList = record.image
      ? record.image.map((img) => ({
          uid: img,
          name: img,
          status: 'done',
          url: `https://api-website-admin-gennexsolutions.onrender.com/images/${img}`,
      }))
      : [];
  setFileList(fileList);

  setIsUpdateModalVisible(true);
};

const handleCancelUpdate = () => {
  setIsUpdateModalVisible(false);
  setFileList([]);
  setFormData({ description: "", image: [] });
};

const handleCancelDelete = () => {
  setDeleteConfirmVisible(false);
};
const handleDelete = async () => {
  try {
    await axios.delete(`https://api-website-admin-gennexsolutions.onrender.com/home/delete/${deleteItemId}`);
    message.success("ລົບຂໍ້ມູນສຳເລັດ");
    setDeleteConfirmVisible(false);
    getData(); // Refresh data
  } catch (error) {
    console.error("Error deleting data:", error);
    message.error("Failed to delete the item");
  }
};
const showDeleteConfirm = (id) => {
  setDeleteItemId(id);
  setDeleteConfirmVisible(true);
};



  const columns = [
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      render: (images) => {
        const imageUrl = `https://api-website-admin-gennexsolutions.onrender.com/images/${images}`;
        return images ? <img className='rounded-full h-20 w-20' src={imageUrl} alt='image' /> : <span>No image available</span>;
      },
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <span>
          <Button onClick={() => handleUpdate(record)} type="primary" style={{ marginRight: 8 }}>Edit</Button>
          <Button onClick={() => showDeleteConfirm(record._id)} type="default" style={{ color: '#ff0000' }}>Delete</Button>
        </span>
      ),
    },
  ];

  return (
    <Layout className="h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <div className="flex items-center justify-center pt-10">
          <img className="w-20 p-2 rounded-full" src={logo} alt="Logo" />
          {!collapsed && (
            <h1 className="text-white font-bold text-xl">Gennex Solutions</h1>
          )}
        </div>
        <Divider className="bg-white" />
        <Menu theme="dark" mode="inline" onClick={handleMenuClick} items={[
          { key: '/admin/home', icon: <HomeOutlined />, label: 'Home' },
          { key: '/admin/about', icon: <InfoCircleOutlined />, label: 'About Us' },
          { key: '/admin/contact', icon: <ContactsOutlined />, label: 'Contact Us' },
          { key: '/admin/service', icon: <CustomerServiceOutlined />, label: 'Services' },
          { key: '/admin/project', icon: <ProjectOutlined />, label: 'Project' },
          { key: '/admin/teams', icon: <TeamOutlined />, label: 'Teams' },
          { key: '/admin/customer', icon:<CustomerServiceOutlined />, label: 'Customer' },
        ]} />
      </Sider>
      <Layout>
      <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280 }}>
        <div>
            <Button onClick={handleAddItem} type="primary" style={{ marginBottom: 16 }}>
                Add New
            </Button>

            <Table columns={columns} dataSource={data} pagination={{ onChange: (page) => console.log(page) }} />

            <Modal
                title="Add New Data"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    layout="vertical"
                    name="wrap"
                    labelAlign="left"
                    labelWrap
                    colon={false}
                    onValuesChange={handleChangeValue}
                >
                    <Form.Item label="Description" name="description" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Image">
                        <ImgCrop rotationSlider>
                            <Upload
                                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                listType="picture-card"
                                fileList={fileList}
                                onChange={onChangeImage}
                                onPreview={onPreview}
                                onRemove={handleRemoveImage}
                            >
                                {fileList.length < 5 && '+ Upload'}
                            </Upload>
                        </ImgCrop>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Edit Data"
                visible={isUpdateModalVisible}
                onOk={handleUpdateOk}
                onCancel={handleCancelUpdate}
            >
                <Form
                    layout="vertical"
                    name="updateForm"
                    labelAlign="left"
                    labelWrap
                    colon={false}
                    onValuesChange={handleChangeValue}
                    initialValues={{ description: currentItem?.description }}
                >
                    <Form.Item label="Description" name="description" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Image">
                        <ImgCrop rotationSlider>
                            <Upload
                                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                listType="picture-card"
                                fileList={fileList}
                                onChange={onChangeImage}
                                onPreview={onPreview}
                                onRemove={handleRemoveImage}
                            >
                                {fileList.length < 5 && '+ Upload'}
                            </Upload>
                        </ImgCrop>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Confirm Delete"
                visible={deleteConfirmVisible}
                onCancel={handleCancelDelete}
                footer={[
                    <Button key="cancel" onClick={handleCancelDelete}>
                        No, Cancel
                    </Button>,
                    <Button key="delete" type="primary" danger onClick={handleDelete}>
                        Yes, Delete
                    </Button>,
                ]}
                destroyOnClose={true}
            >
                Are you sure you want to delete this item?
            </Modal>
        </div>
        </Content>
      </Layout>
    </Layout>
  );
}
export default HomeAdmin;
