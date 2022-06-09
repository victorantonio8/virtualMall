import React, { useState } from "react";
import { Button, Layout, Menu, message } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  StarOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import { NavLink, useHistory } from "react-router-dom";

const { Header, Sider, Content } = Layout;

interface DashboardProps {
  children: React.ReactChild;
}

export default function Dashboard({ children }: DashboardProps) {
  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory();
  const fivePoints = "86eff8ab-ce82-4bd5-bf16-4b540d24d166";
  const sweetPoint504 = "2f1f27a7-6d81-45a4-af1d-124b6ffcdb59";

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <NavLink to={"/"}>VirtualMall</NavLink>
          </Menu.Item>

          <Menu.Item
            key="2"
            icon={<StarOutlined style={{ fontSize: "16px" }} />}
          >
            <NavLink to={`/productsByBusiness/${fivePoints}`}>
              FivePoints
            </NavLink>
          </Menu.Item>

          <Menu.Item
            key="3"
            icon={<StarOutlined style={{ fontSize: "16px" }} />}
          >
            <NavLink to={`/productsByBusiness/${sweetPoint504}`}>
              TheSweetPoint504
            </NavLink>
          </Menu.Item>

          <Menu.Item
            key="4"
            icon={<StarOutlined style={{ fontSize: "16px" }} />}
          >
            <NavLink to={"/newsByBusiness"}>
              Noticias
            </NavLink>
          </Menu.Item>

          <Menu.Item
            key="5"
            icon={<PoweroffOutlined style={{ fontSize: "16px" }} />}
          >
            <Button
              type={"primary"}
              onClick={() => {
                localStorage.clear();
                history.push("/login");
              }}
            >
              Cerrar sesión
            </Button>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        {/* <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
        </Header> */}
        <Content
          className="site-layout-background"
          style={{
            margin: "0px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
