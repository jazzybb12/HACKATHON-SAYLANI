import React, { useState } from 'react';
import './Sidebar.scss';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DoubleRightOutlined,
  UnorderedListOutlined,
  CalendarOutlined,
  FileTextOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Input, Divider } from 'antd';

import { Link } from 'react-router-dom';
import Routes from './Routes';
import { signOut } from 'firebase/auth';
import { useAuthContext } from '../../pages/Context/AuthContext'
import { auth } from '../../config/firebase';

const { Header, Sider, Content } = Layout;
const { Search } = Input;

export default function Sidbar() {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { isAuth, user, dispatch } = useAuthContext()

  const HandleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: "LOGOUT" })
        window.notify("User Signout successfully!", "Success")
      })
      .catch((err) => {
        window.notify("Something went wrong", "error")
      })
  }

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} className='bg-white p-3'>
        <div className="demo-logo-vertical" />
        <p className='ps-3 fw-bold mt-4' >Admin Panel</p>
       
        <p className='ps-3 mt-4  fs-6' ></p>

        <Menu
          theme="light"
          mode="inline"
          style={{
            border: "none"
          }}
          defaultSelectedKeys={["/"]}
          items={[
            {
              key: '/upcoming',
              icon: <DoubleRightOutlined />,
              label: <Link to="/upcoming" className='nav-link'>Dashboard</Link>,
            },
            {
              key: '/today',
              icon: <UnorderedListOutlined />,
              label: <Link to="/today" className='nav-link'>Students</Link>,
            },
            {
              key: '/calendar',
              icon: <CalendarOutlined />,
              label: <Link to="/calender" className='nav-link'>Courses</Link>,
            },
            {
              key: '/',
              icon: <FileTextOutlined />,
              label: <Link to="/" className='nav-link'>Attendance</Link>,
            },
          ]}
        />


        <Menu
          theme="light"
          mode="inline"
          style={{
            border: "none"
          }}
          items={[
            {
              key: '3',
              icon: <i className="fa-solid fa-arrow-right-from-bracket"></i>,
              label: <a className=' nav-link' onClick={HandleLogout} > Sign Out</a>,
            },
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
          <span className='fs-3 fw-bold ms-2'>Student Management System</span>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Routes />
        </Content>
      </Layout>
    </Layout>
  );
}
