import { useState } from "react";
import { Button, Layout, Menu } from "antd";
import {
  PicCenterOutlined,
  StarOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import { NavLink, useHistory } from "react-router-dom";
import { ItemType } from "antd/lib/menu/hooks/useItems";

const { Sider, Content } = Layout;

interface DashboardProps {
  children: any;
}

export default function Dashboard({ children }: DashboardProps) {
  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory();
  const fivePoints = "86eff8ab-ce82-4bd5-bf16-4b540d24d166";
  const sweetPoint504 = "b26a47be-fdad-42fd-81f6-c56a561d7596";

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const generateMenuItems = () => {
    const isAdmin = localStorage.getItem("isAdmin");
    let menuItems: ItemType[] = [
      {
        key: "Home",
        label: <NavLink to={"/"}>VirtualMall</NavLink>,
      },
      {
        key: "FivePoints",
        label: (
          <NavLink to={`/productsByBusiness/${fivePoints}`}>FivePoints</NavLink>
        ),
        icon: <StarOutlined style={{ fontSize: "16px" }} />,
      },
      {
        key: "TheSweetPoint504",
        label: (
          <NavLink to={`/productsByBusiness/${sweetPoint504}`}>
            TheSweetPoint504
          </NavLink>
        ),
        icon: <StarOutlined style={{ fontSize: "16px" }} />,
      },
      {
        key: "newsByBusiness",
        label: <NavLink to={"/newsByBusiness"}>Noticias</NavLink>,
        icon: <PicCenterOutlined style={{ fontSize: "16px" }} />,
      },
      {
        key: "logout",
        label: (
          <Button
            type={"primary"}
            icon={<PoweroffOutlined style={{ fontSize: "16px" }} />}
            onClick={() => {
              localStorage.clear();
              history.push("/login");
            }}
          >
            Cerrar sesión
          </Button>
        ),
        style: {
          paddingLeft: "24px",
          position: "absolute",
          bottom: "0",
          paddingBottom: "10px",
        },
      },
    ];

    if (isAdmin === "true") {
      menuItems = [
        {
          key: "Home",
          label: <NavLink to={"/"}>VirtualMall</NavLink>,
        },
        {
          key: "Product",
          label: <NavLink to={"/products"}>Productos</NavLink>,
          icon: <StarOutlined style={{ fontSize: "16px" }} />,
        },
        {
          key: "logout",
          label: (
            <Button
              type={"primary"}
              icon={<PoweroffOutlined style={{ fontSize: "16px" }} />}
              onClick={() => {
                localStorage.clear();
                history.push("/login");
              }}
            >
              Cerrar sesión
            </Button>
          ),
          style: {
            paddingLeft: "24px",
            position: "absolute",
            bottom: "0",
            paddingBottom: "10px",
          },
        },
      ];
    }

    return menuItems;
  };

  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Menu
            theme="dark"
            mode="inline"
            items={generateMenuItems()}
            defaultSelectedKeys={["FivePoints"]}
          />
        </Sider>
        <Layout className="site-layout">
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
    </div>
  );
}
