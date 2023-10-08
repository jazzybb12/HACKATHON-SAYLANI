import React, { useState } from "react";
import { message } from "antd";
import { Layout, Menu, Button } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
import { MenuFoldOutlined, AreaChartOutlined, DashboardOutlined, UserOutlined, UsergroupAddOutlined, MenuUnfoldOutlined, ShopOutlined, DoubleRightOutlined, PicLeftOutlined, CalendarOutlined, PlusSquareFilled, LogoutOutlined, UnorderedListOutlined, DashOutlined, CheckCircleTwoTone } from "@ant-design/icons";

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const { Sider, Content } = Layout;
    const navigate = useNavigate();
    const { dispatch } = useAuthContext();
    const iconStyle = {
        color: 'black', // Change the color to your desired color
    }

    const handelLogout = () => {
       
    };
    return (

        <div className="p-2 mt-2" >
            <Layout className="p-2" style={{ borderRadius: "20px", background: "linear-gradient(to right, #79090d, #020024)", }} >
                <Sider trigger={null} collapsible collapsed={collapsed}
                    style={{
                        color: "black",
                        borderRadius: "20px",
                        minWidth: "250px",
                        minHeight: "90vh",
                        marginRight: "10px",
                        background: "transparent",
                        margin: "0px",
                        padding: "0px",
                    }} >
                    <span
                        className="heading"
                        style={{
                            borderRadius: "20px",
                            color: "white",
                            fontSize: "20px",

                            display: "inline-block",
                            height: "40px",
                            lineHeight: "60px",
                            marginLeft: "15px",
                        }} >
                        {collapsed ? "" : "SMIT"}
                    </span>
                    <Button type="text"
                        icon={collapsed ? < MenuUnfoldOutlined /> : < MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: "8px",
                            width: 50,
                            height: 64,
                            color: "black",
                            float: "right",
                        }}
                    />

                    <div className="demo-logo-vertical" />
                    <Menu style={{

                        marginTop: "20px",
                        background: "transparent",

                    }}
                        theme="light"
                        mode="inline"
                        defaultSelectedKeys={
                            ["4"]
                        }
                        items={
                            [{
                                className: "sideFont,",
                                key: "tasks",
                                label: (
                                    <Link className="sideFont" style={{ textDecoration: "none", color: "black" }}  >
                                        Admin Panel
                                    </Link>)
                            },

                            {
                                className: "sideFont",
                                key: "1",

                                icon: <DashboardOutlined style={iconStyle} />,
                                label: (
                                    <Link className="sideFont" style={{ textDecoration: "none", color: "black" }} to="/upcoming" >
                                        Dashboard
                                    </Link>
                                ),
                            },
                            {
                                key: "4",
                                icon: <UserOutlined style={iconStyle} />,
                                label: (
                                    <Link style={{ textDecoration: "none", color: "black" }} className="sideFont" to="/sticky" >
                                        Students
                                    </Link>
                                ),
                            },
                            {
                                key: "3",
                                icon: < CalendarOutlined style={iconStyle} />,
                                label: (
                                    <Link style={{ textDecoration: "none", color: "black" }} to="/calendar" className="sideFont" >
                                        Attendance
                                    </Link>
                                ),
                            },

                            {
                                key: "2",
                                icon: <AreaChartOutlined ListOutlined style={iconStyle} />,
                                label: (
                                    <Link className="sideFont" style={{ textDecoration: "none", color: "black" }} to="/today" >
                                        Course
                                    </Link>
                                ),
                            },




                            {
                                key: "10",
                                icon: < LogoutOutlined />,
                                label: "Log Out",
                                danger: true,
                                onClick: handelLogout,
                            },
                            ]
                        }
                    />
                </Sider>
                <Layout>

                    <Content style={{
                        padding: "24px 16px",
                        maxHeight: "100vh",
                        overflow: "auto",
                        background: "white",
                    }} >
                        <Outlet />

                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}