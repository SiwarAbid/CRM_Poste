import React, { useState, useEffect } from "react";
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
import ProfilClient from "../components/ClientsComponents/ProfilClient";
import SettingProfil from "../components/ClientsComponents/SettingProfilClient";
import { hover } from "@testing-library/user-event/dist/hover";
import { useParams } from "react-router-dom";
import Account from "../components/ClientsComponents/Account";
import Consulter from "../components/ClientsComponents/Consulter";
import ImporterCompte from "../components/ClientsComponents/ImporterCompte";
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
// interface DetailsUser {
//   PI: {
//     typePI: string;
//     numPI: string;
//     datePI: string;
//     image: {
//       recto: string;
//       verso: string;
//     };
//   };
// }
export interface User {
  user?: userData;
  client?: clientData;
}
interface userData {
  id_user?: number;
  user_name?: string;
  nom?: string;
  prenom?: string;
  email?: string;
  phone?: number;
  adresse?: string;
  password?: string;
  status?: number;
}

interface clientData {
  cin_client?: string;
  civil?: string;
  brith?: {
    lieu_birth: string;
    date_birth: string;
  };
  pi?: {
    type_pi: string;
    num_pi: number;
    img?: {
      recto: string;
      verso: string;
    }
  };
  info?: {
    compte: {
      // epargne: { num: string; img: string };
      // ccp: { num: string; img: string };
      [key: string]: { num: string; img: string };

    };
  };
}
const App: React.FC = () => {
  const { id } = useParams(); // Utilisation de useParams pour récupérer l'ID de l'URL
  const [dataUser, setDataUser] = useState<User>({});

  const updateUser = (user: userData) => {
    setDataUser((prevData) => ({ ...prevData, user }));
  };

  const updateClient = (client: clientData) => {
    setDataUser((prevData) => ({ ...prevData, client }));
  };
  useEffect(() => {
    fetch(`http://localhost:3000/getProfil/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        if (res.ok) {
          // console.log("Res: ", res);
          // console.log("Success"); //Ajoutez le console.log pour indiquer le succès
          return res.json();
        } else {
          throw new Error("Erreur lors de la requête"); // Gérez les erreurs ici si nécessaire
        }
      })
      .then((data) => {
        // console.log("data***** Ligne 129: ", data);
        updateUser(data.user);
        getClient();
      });
  }, [id]);
  console.log("data user***** Ligne 133: ", dataUser);

  const getClient = () => {
    fetch(`http://localhost:3000/getProfilClient/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        if (res.ok) {
          // console.log("Res: ", res);
          // console.log("Success"); //Ajoutez le console.log pour indiquer le succès
          return res.json();
        } else {
          throw new Error("Erreur lors de la requête"); // Gérez les erreurs ici si nécessaire
        }
      })
      .then((data) => {
        // console.log("data***** Ligne 129: ", data);
        updateClient(data.user);
      });
  };
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
        <Account
          user_name={dataUser.user?.nom}
          image=""
          user_adresse={dataUser.user?.adresse}
          user_email={dataUser.user?.email}
          user_phone={dataUser.user?.phone}
        />
      </Header>

      <Layout>
        <Sider style={{ background: "#0D1551" }}>
          <Menu
            defaultSelectedKeys={["7"]}
            items={items}
            style={{
              background: "#0D1551",
              marginTop: "0px",
            }}
            theme="dark"
          />
        </Sider>
        <Content style={{ margin: "0 16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: "#F2F2F2",
            }}
          >
            {/* <ImporterCompte data={dataUser} /> */}
            {/* <ProfilClient name_user={dataUser.nom} />
            <SettingProfil
              username={dataUser.user_name}
              first_name={dataUser.nom}
              last_name={dataUser.nom}
              prof=""
              adresse=""
              user_email={dataUser.email}
              user_phone={dataUser.phone}
              date_birth={dataUser.date_birth}
              lieu_birth={dataUser.lieu_birth}
              status_civil=""
              cat_prof=""
              id={dataUser.id_user}
              // details_user={dataUser.details_user}
            />*/}
            <Consulter /> 
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
