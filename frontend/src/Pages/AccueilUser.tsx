import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  SendOutlined,
  HomeOutlined,
  ProfileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme, Avatar } from "antd";
import logo from "../assets/imgs/PTT.png";
import Tickets from "../components/UserSpaceComponents/Tickets";
import ProfilClient from "./ProfilClient";
const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
const links = [
  "/LaPosteTunisienne",
  "/Profil",
  "#tickets",
  "#ticket_en_cours",
  "#ticket_resolu",
  "#ticket_en attent",
  "#ticket_reject",
  "#dashbord",
];
const items: MenuItem[] = [
  getItem("Home", "0", <HomeOutlined />),
  getItem("Profil","7", <ProfileOutlined/>),
  getItem("Tickets", "sub1", <SendOutlined />, [
    getItem("All", "1"),
    getItem("En cours", "2"),
    getItem("Resolu", "3"),
    getItem("En attente", "4"),
    getItem("Reject", "5"),
  ]),
  getItem("Dashbord", "6", <PieChartOutlined />),
  //   getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  //   getItem('Files', '9', <FileOutlined />),
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ padding: 0, background: "#27708C", display: "flex" }}>
        <Avatar
          shape="square"
          size={53}
          icon={<img alt="" src={logo} />}
          style={{ backgroundColor: "transparent", marginLeft: "10px" }}
        />

        <label
          style={{ color: "#F2BE22", marginLeft: "5px", marginTop: "-3px" }}
        >
          <b>La Poste Tunisienne</b>
        </label>
      </Header>

      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{ background: "#27708C" }}
        >
          <div className="demo-logo-vertical"></div>
          <Menu
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
            style={{ background: "#27708C", marginTop: "20px" }}
          />
        </Sider>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <ProfilClient />
          </div>
        </Content>
        {/* <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
};

export default App;
