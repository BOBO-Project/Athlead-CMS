import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Breadcrumb, Layout, Menu, Typography } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import useLocalStorage from "../hooks/useLocalStorage";
import { STORAGE_KEY, WEB_PATH } from "../constants";
import LOGO from "../logo.svg";

const { Content, Sider } = Layout;
const { Title } = Typography;

const getItem = (label, key, icon, children) => {
  return {
    key,
    icon,
    children,
    label,
  };
};

const items = [
  getItem("User", "user", <UserOutlined />),
  getItem("Partner", "partner", <UnorderedListOutlined />),
  getItem("Logout", "logout", <LogoutOutlined />),
];

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { removeItem, getItem } = useLocalStorage();

  const pagename = pathname.replace("/", "");

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const token = getItem(STORAGE_KEY.token);

    if (!token) {
      navigate(WEB_PATH.login);
    }
  }, []);

  const handleChangeMenu = (value) => {
    if (value.key === "logout") {
      removeItem(STORAGE_KEY.token);
      navigate(WEB_PATH.login);
    } else {
      navigate(`/${value.key}`);
    }
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 20,
            marginBottom: 25,
          }}
        >
          <img src={LOGO} width={collapsed ? 60 : 180} alt="logo" />
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={handleChangeMenu}
        />
      </Sider>
      <Layout className="site-layout">
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>
              <Title level={3}>{pagename}</Title>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
