import React, { useState } from "react";
import { Modal } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { message } from "antd";
interface propModalPI {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: {
    id: number;
    reseaux_sociaux: {
      fcb: string;
      insta: string;
      whatsapp: string;
    };
  };
}
const App: React.FC<propModalPI> = ({ isModalOpen, setIsModalOpen, data }) => {
  const [dataRS, setDataRS] = useState<{
    fcb: string;
    insta: string;
    whatsapp: string;
  }>({
    fcb: data.reseaux_sociaux.fcb,
    insta: data.reseaux_sociaux.insta,
    whatsapp: data.reseaux_sociaux.whatsapp,
  });
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "This is an error message",
    });
  };
  const handleOk = () => {
    fetch(`http://localhost:3000/updateRS/${data.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(dataRS),
    })
      .then((res) => {
        if (res.ok) {
          console.log("Res: ", res);
          console.log("Success"); //Ajoutez le console.log pour indiquer le succès
          return res.json();
        } else {
          console.log("ERROR CASE: ", res);
          error();
          throw new Error("Erreur lors de la requête"); // Gérez les erreurs ici si nécessaire
        }
      })
      .then((data) => {
        console.log("Resultat Data: ", data);
        success();
        setIsModalOpen(false);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleInputChangeSettingProfil = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDataRS({
      ...dataRS,
      [name]: value,
    });
  };
  return (
    <>
      <Modal
        title="Social Profile"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit"
      >
        <div className="BoxModalSP">
          <div
            className="input-Facebook"
            style={{ display: "flex", width: "max-content" }}
          >
            <FacebookOutlined
              style={{ fontSize: 30, marginRight: 20, marginTop: 5 }}
            />
            <input
              type="text"
              value={dataRS.fcb}
              name="fcb"
              className="form-control"
              placeholder="https://www.facebook.com/"
              onChange={handleInputChangeSettingProfil}
            />
          </div>
          <div
            className="input-Instagramme"
            style={{ display: "flex", width: "max-content" }}
          >
            <InstagramOutlined
              style={{ fontSize: 30, marginRight: 20, marginTop: 5 }}
            />
            <input
              type="text"
              value={dataRS.insta}
              name="insta"
              className="form-control"
              placeholder="https://www.instagram.com/"
              onChange={handleInputChangeSettingProfil}
            />
          </div>
          <div
            className="input-WhatsApp"
            style={{ display: "flex", width: "max-content" }}
          >
            <WhatsAppOutlined
              style={{ fontSize: 30, marginRight: 20, marginTop: 5 }}
            />
            <input
              type="text"
              value={dataRS.whatsapp}
              name="whatsapp"
              className="form-control"
              placeholder="+216 "
              onChange={handleInputChangeSettingProfil}
            />
          </div>
        </div>
      </Modal>
      {contextHolder}
    </>
  );
};

export default App;
