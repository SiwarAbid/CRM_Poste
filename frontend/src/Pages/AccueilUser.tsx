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
import title from "../assets/imgs/LaPoste.png";
import Tickets from "../components/UserSpaceComponents/Tickets";
import ProfilClient from "../components/ClientsComponents/SettingProfilClient";
import { hover } from "@testing-library/user-event/dist/hover";
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
  getItem("Profil", "7", <ProfileOutlined />),
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
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          padding: 5,
          background: "#0D1551",
          display: "flex",
          height: 80,
        }}
      >
        <Avatar
          shape="square"
          size={75}
          icon={<img alt="logo la poste" src={logo} />}
          style={{ backgroundColor: "transparent", marginLeft: "35px" }}
        />
        <img
          alt="La Poste Tunisienne"
          src={title}
          style={{ backgroundColor: "transparent", marginLeft: "10px" }}
        />
      </Header>

      <Layout>
        <Sider style={{ background: "#0D1551" }}>
          <Menu
            defaultSelectedKeys={["1"]}
            // mode="inline"
            items={items}
            style={{
              background: "#0D1551",
              marginTop: "0px",
            }}
            theme="dark"
          />
        </Sider>
        <Content style={{ margin: "0 16px" }}>
          {/* <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: "#F2F2F2",
              // borderRadius: borderRadiusLG,
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
