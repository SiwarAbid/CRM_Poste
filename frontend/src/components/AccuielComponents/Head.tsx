import React, { useState } from "react";
import {
  AppstoreOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";

const items: MenuProps["items"] = [
  {
    label: "Accueil",
    key: "accueil",
    icon: <HomeOutlined />,
  },
  {
    label: "A propos",
    key: "info",
    icon: <InfoCircleOutlined />,
  },
  {
    label: "Nos services",
    key: "service",
    icon: <AppstoreOutlined />,
  },
  {
    label: "Contact",
    key: "contact",
    icon: <PhoneOutlined />,
  },
];

const Head: React.FC = () => {
  const [current, setCurrent] = useState("accueil");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Head;
