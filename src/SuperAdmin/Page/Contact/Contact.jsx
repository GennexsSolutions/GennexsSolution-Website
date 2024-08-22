import React, { useState, useEffect } from 'react';
import { Button, Layout, Menu, Divider, Modal, message, Table, Form, Input, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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

function ContactAdmin() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);


  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = ({ key }) => {
    console.log(`Navigating to: ${key}`); // Debugging output
    navigate(key);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [setdata, setData] = useState([]);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  const [formData, setFormData] = useState({
    description: '',
    tell: '',
    email: '',
    village: "",
    district: "",
    province: ""
  });

  const handleValue = (changedValues) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      ...changedValues,
    }));
  };
  

  //get Data
  const getData = async () => {
    axios.get('https://api-website-admin-gennexsolutions.onrender.com/contact/getData')
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }
  useEffect(() => {
    getData()

  }, []);

  const handleUpdate = (record) => {
    setFormData({
      description: record.description,
      tell: record.tell,
      email: record.email,
      village: record.village,
      district: record.district,
      province: record.province,
    });
    setEditItemId(record._id);
    setIsEditMode(true);
    setIsModalVisible(true);
  };


  const handleDelete = async () => {
    try {
      // Send a DELETE request with Axios using the deleteItemId
      await axios.delete(
        `https://api-website-admin-gennexsolutions.onrender.com/contact/delete/${deleteItemId}`
      );

      // Handle success, e.g., show a success message or update the data
      console.log("Data deleted successfully!");

      // Close the delete confirmation modal
      setDeleteConfirmVisible(false);

      // Fetch data again or update the state to reflect the changes
      getData();
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error("Error deleting data:", error);
    }
  };

  const handleShowdialog = () => {
    setIsModalVisible(true);
  };



  const handleCancel = () => {
    setIsModalVisible(false);
  };





  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formDataTosend = new FormData();
      formDataTosend.append("description", formData.description);
      formDataTosend.append("tell", formData.tell);
      formDataTosend.append("email", formData.email);
      formDataTosend.append("village", formData.village);
      formDataTosend.append("district", formData.district);
      formDataTosend.append("province", formData.province);
      console.log(formDataTosend);
      
  
      if (isEditMode) {
        await axios.put(`http://localhost:3000/contact/update/${editItemId}`, formDataTosend, {
          headers: {
            'Content-Type': 'multipart/form-data', // Ensure the header is set
          },
        });
        message.success('Data updated successfully!');
      } else {
        await axios.post('http://localhost:3000/contact/addContact', formDataTosend, {
        
        });
        message.success('Data added successfully!');
      }
  
      getData();
      setIsModalVisible(false);
      setIsEditMode(false);
      setEditItemId(null);
    } catch (error) {
      console.error('Error:', error);
      message.error('Failed to submit data.');
    }
  };
  

  const columns = [
    {
      title: 'ລາຍລະອຽດ',
      dataIndex: 'description',
      render: (text) => (
        <div>
          <a>{text}</a>
        </div>
      ),
    },
    {
      title: 'ເບີໂທ',
      dataIndex: 'tell',
      render: (text) => (
        <div>
          <a>{text}</a>
        </div>
      ),
    },
    {
      title: 'ອີເມວ',
      dataIndex: 'email',
      render: (text) => (
        <div>
          <a>{text}</a>
        </div>
      ),
    },
    {
      title: 'ບ້ານ',
      dataIndex: 'village',
      render: (text) => (
        <div>
          <a>{text}</a>
        </div>
      ),
    },
    {
      title: 'ເມືອງ',
      dataIndex: 'district',
      render: (text) => (
        <div>
          <a>{text}</a>
        </div>
      ),
    },
    {
      title: 'ແຂວງ',
      dataIndex: 'province',
      render: (text) => (
        <div>
          <a>{text}</a>
        </div>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <span>
          <Button onClick={() => handleUpdate(record)} type="primary" style={{ marginRight: 8 }}>ແກ້ໄຂ</Button>
          <Button onClick={() => showDeleteConfirm(record._id)} type="default" style={{ color: '#ff0000' }}>ລົບ</Button>
        </span>
      ),
    },
  ];


  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };


  const handleCancelDelete = () => {
    setDeleteConfirmVisible(false);
  };

  const showDeleteConfirm = (itemId) => {
    setDeleteItemId(itemId);
    setDeleteConfirmVisible(true);
  };

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
        <Menu
          theme="dark"
          mode="inline"
          onClick={handleMenuClick}
          items={[
            { key: '/admin/home', icon: <HomeOutlined />, label: 'Home' },
            { key: '/admin/about', icon: <InfoCircleOutlined />, label: 'About Us' },
            { key: '/admin/contact', icon: <ContactsOutlined />, label: 'Contact Us' },
            { key: '/admin/service', icon: <CustomerServiceOutlined />, label: 'Services' },
            { key: '/admin/project', icon: <ProjectOutlined />, label: 'Project' },
            { key: '/admin/teams', icon: <TeamOutlined />, label: 'Teams' },
            { key: '/admin/customer', icon: <CustomerServiceOutlined />, label: 'Customer' },
          ]}
        />
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
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <div>
            <Button onClick={handleShowdialog} type="primary" style={{ marginBottom: 16 }}>
              ເພີ່ມຂໍ້ມູນ
            </Button>
            <Table columns={columns} dataSource={setdata} onChange={onChange} />
            <Modal
              title={isEditMode ? "ແກ້ໄຂຂໍ້ມູນ" : "ເພີ່ມຂໍ້ມູນໃໝ່"}
              visible={isModalVisible}
              onOk={handleSubmit}
              onCancel={handleCancel}
            >

              <Form layout="vertical"
                name="wrap"
                labelAlign="left"
                labelWrap
                colon={false}
                onValuesChange={handleValue} >
                <Form.Item label="ລາຍລະອຽດ" name="description" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="ເບີໂທ" name="tell" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="ອີເມວ" name="email" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="ບ້ານ" name="village" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="ເມືອງ" name="district" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="ແຂວງ" name="province" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>

              </Form>

            </Modal>

            <Modal
              title="ແຈ້ງເຕືອນ"
              visible={deleteConfirmVisible}
              onCancel={handleCancelDelete}
              footer={[
                <Button key="cancel" onClick={handleCancelDelete}>
                  ບໍ່! ຕົກລົງ
                </Button>,
                <Button key="delete" type="primary" danger onClick={handleDelete}>
                  ຕົກລົງ
                </Button>,
              ]}
              destroyOnClose={true}
            >
              ທ່ານຕ້ອງການທີ່ຈະລົບຂໍ້ມູນນີ້ແທ້ ຫຼື ບໍ່?
            </Modal>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default ContactAdmin;
