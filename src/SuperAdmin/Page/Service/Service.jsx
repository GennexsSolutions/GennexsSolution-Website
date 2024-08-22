import React, { useState, useEffect } from 'react';
import { Button, Layout, Menu, theme, Divider, Modal, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../Components/ServiceCompo/ServiceCompo';
import AddItemForm from '../../Components/ServiceCompo/AddItmeCompo';
import EditItemForm from '../../Components/ServiceCompo/EditeFormCompo'; // Import EditItemForm
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

function ServiceAdmin() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const getData = async () => {
    try {
      const res = await axios.get('http://localhost:3000/service/getData');
      setData(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleAddItem =async (newItem) => {
    const itemWithId = { ...newItem, _id: Date.now().toString() };
    setData([...data, itemWithId]);
    setIsAddModalVisible(false);
    await getData();
   
  };

  const handleEditItem = (updatedItem) => {
    setData(data.map(item => (item._id === updatedItem._id ? updatedItem : item)));
    setIsEditModalVisible(false);
    getData(); // Refresh data after update
  };

  const handleMenuClick = ({ key }) => {
    console.log(`Navigating to: ${key}`);
    navigate(key);
  };

  const handleEdit = (item) => {
    console.log("Editing item:", item); // Debug log
    setCurrentItem(item);
    setIsEditModalVisible(true);
  };

  const handleDelete = (item) => {
    console.log(`Deleting item: ${item._id}`);

    Modal.confirm({
      title: 'Are you sure?',
      content: 'Do you really want to delete this item?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:3000/service/delete/${item._id}`);
          setData(data.filter((dataItem) => dataItem._id !== item._id));
          getData();
          message.success('ລົບຂໍ້ມູນສຳເລັດແລ້ວ');
        } catch (err) {
          console.error('Failed to delete item:', err);
          message.error('Failed to delete item.');
        }
      },
    });
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
            { key: '/admin/customer', icon:<CustomerServiceOutlined />, label: 'Customer' },
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
            <DataTable
              data={data}
              onEdit={(item) => handleEdit(item)}
              onDelete={(item) => handleDelete(item)}
              onAdd={() => setIsAddModalVisible(true)}
            />

            <AddItemForm
              visible={isAddModalVisible}
              onCreate={handleAddItem}
              onCancel={() => setIsAddModalVisible(false)}
            />

            {currentItem && (
              <EditItemForm
                open={isEditModalVisible}
                onUpdate={handleEditItem}
                onCancel={() => setIsEditModalVisible(false)}
                initialData={currentItem}
              />
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default ServiceAdmin;
