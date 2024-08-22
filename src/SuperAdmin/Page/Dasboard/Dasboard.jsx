import { React, useEffect, useState } from 'react';
import { Button, Layout, Menu, theme, Divider, Table, Modal, Input, Form } from 'antd';
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

function Dashboard() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [data, setData] = useState([]); // Changed from setData to data
  const [editItemId, setEditItemId] = useState(null);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [formData, setFormData] = useState({
    description: '',
    founder: '',
    clients: '',
    projects: ''
  });

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  const handleValue = (changedValues) => {
    setFormData({
      ...formData,
      ...changedValues
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = isEditMode
        ? await axios.put(`http://localhost:3000/about/update/${editItemId}`, formData)
        : await axios.post('http://localhost:3000/about/addAbout', formData);

      console.log('Response:', response.data.data);
      getData();
      setIsModalVisible(false);
      setIsEditMode(false);
      setFormData({
        description: '',
        founder: '',
        clients: '',
        projects: ''
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getData = async () => {
    try {
      const res = await axios.get('https://api-website-admin-gennexsolutions.onrender.com/about/getData');
      setData(res.data.data); // Make sure you're setting the data correctly
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleUpdate = (record) => {
   
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://api-website-admin-gennexsolutions.onrender.com/about/delete/${deleteItemId}`);
      console.log("Data deleted successfully!");
      setDeleteConfirmVisible(false);
      getData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleShowdialog = () => {
    setFormData({
      description: '',
      founder: '',
      clients: '',
      projects: ''
    });
    setIsEditMode(false);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmVisible(false);
  };

  const showDeleteConfirm = (itemId) => {
    setDeleteItemId(itemId);
    setDeleteConfirmVisible(true);
  };

  const columns = [
    {
      title: 'ລາຍລະອຽດ',
      dataIndex: 'description',
      render: (text) => <div><a>{text}</a></div>,
    },
    {
      title: 'founder',
      dataIndex: 'founder',
      render: (text) => <div><a>{text}</a></div>,
    },
    {
      title: 'clients',
      dataIndex: 'clients',
      render: (text) => <div><a>{text}</a></div>,
    },
    {
      title: 'projects',
      dataIndex: 'projects',
      render: (text) => <div><a>{text}</a></div>,
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
            <Table columns={columns} dataSource={data} rowKey="_id" />
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
                onValuesChange={handleValue}
                initialValues={formData}
              >
                <Form.Item label="ລາຍລະອຽດ" name="description" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="founder" name="founder" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="clients" name="clients" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="projects" name="projects" rules={[{ required: true }]}>
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

export default Dashboard;
