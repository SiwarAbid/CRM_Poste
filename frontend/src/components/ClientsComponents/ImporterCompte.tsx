import React, { useState } from "react";
import { Steps, Result } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import "../../assets/css/ImporteCompte.css";
import { User } from "../../Pages/AccueilUser";

interface propsImporte {
  data: User;
}
const ImporterCompte: React.FC<propsImporte> = ({ data }) => {
  // const dataImport = {
  //   user: {
  //     nom: data?.user?.nom,
  //     prenom: data?.user?.prenom,
  //     email: data?.user?.email,
  //     phone: data?.user?.phone,
  //   },
  //   client: {
  //     cin_client: data?.client?.cin_client,
  //     imgs: {
  //       recto: "",
  //       verso: "",
  //     },
  //     compte: {},
  //   },
  // };
  return (
    <div className="contenierImportCompte">
      <StepsSection data={data} />
    </div>
  );
};

export default ImporterCompte;

interface propsContent {
  next: () => void;
  prev: () => void;
  data?: User;
}
const InfoPers: React.FC<propsContent> = ({ next, data }) => {
  return (
    <div className="CardContentImport">
      <div className="header-box">
        <h4 className="title-InfoPers-Import">Personnel Informations</h4>
        <br />
      </div>
      <div className="body-box">
        <form>
          <div className="form-group">
            <label className="label-input">First Name :</label>
            <input
              type="text"
              className="input-Import"
              name="nom"
              style={{ marginLeft: "25px" }}
              value={data?.user?.nom}
              disabled
            />
          </div>
          <div className="form-group">
            <label className="label-input">Last Name :</label>
            <input
              type="text"
              className="input-Import"
              name="prenom"
              style={{ marginLeft: "25px" }}
              value={data?.user?.prenom}
              disabled
            />
          </div>
          <div className="form-group">
            <label className="label-input">Phone :</label>
            <input
              type="tel"
              className="input-Import"
              name="phone"
              style={{ marginLeft: "51px" }}
              value={data?.user?.phone}
              disabled
            />
          </div>
          <div className="form-group">
            <label className="label-input">E-mail :</label>
            <input
              type="email"
              className="input-Import"
              name="email"
              style={{ marginLeft: "51px" }}
              value={data?.user?.email}
              disabled
            />
          </div>
          <div className="form-submit">
            <input
              type="submit"
              className="btnNext-Import"
              value="Next"
              onClick={() => next()}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const PieceIdentite: React.FC<propsContent> = ({ next, prev, data }) => {
  console.log("data: ***", data);
  return (
    <div className="CardContentImport">
      <div className="header-box">
        <h4 className="title-InfoPers-Import">Identity Doc</h4>
        <br />
      </div>
      <div className="body-box">
        <form>
          <div className="form-group">
            <label className="label-input">Num CIN :</label>
            <input
              type="text"
              className="input-Import"
              name="cin"
              style={{ marginLeft: "25px" }}
              value={data?.client?.cin_client}
              disabled
            />
          </div>
          <div className="form-group">
            <label className="label-input">CIN Recto :</label>
            <input
              type="file"
              className="input-Import"
              name="cin_recto"
              required
            />
          </div>
          <div className="form-group">
            <label className="label-input">CIN Verso :</label>
            <input
              type="file"
              className="input-Import"
              name="cin_verso"
              required
            />
          </div>
          <div
            className="form-submit-groupe"
            style={{ appearance: "none", display: "flex" }}
          >
            <input
              type="button"
              className="btnPrev-Import"
              value="Previous"
              onClick={() => prev()}
            />
            <input
              type="submit"
              className="btnNext-Import-groupe"
              value="Next"
              onClick={() => next()}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const InfoCompte: React.FC<propsContent> = ({ next, prev, data }) => {
  const [compteSelectionnee, SetCompteSelectionnee] = useState("epargne");
  const [numCompte, setNumCompte] = useState("");
  const [imgCompte, setImgCompte] = useState("");

  const handleChangeCompte = (e: React.ChangeEvent<HTMLSelectElement>) => {
    SetCompteSelectionnee(e.target.value);
  };
  const handleChangeNumCompte = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumCompte(e.target.value);
  };

  const handleChangeImgCompte = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImgCompte(e.target.value);
  };

  return (
    <div className="CardContentImport">
      <div className="header-box">
        <h4 className="title-InfoPers-Import">Compte Informations</h4>
        <br />
      </div>
      <div className="body-box">
        <form>
          <div className="form-group">
            <label className="label-input">Type :</label>
            <div className="iconeInfo">
              <InfoCircleOutlined />
            </div>
            <select
              className="input-Import"
              style={{ marginLeft: "86px", height: "40px" }}
              required
              value={compteSelectionnee}
              onChange={(e) => handleChangeCompte}
            >
              <option value="epargne">Compte Epargne</option>
              <option value="ccp">Compte Courrant Postal</option>
            </select>
          </div>
          <div className="form-group">
            <label className="label-input">Num compte :</label>
            <input
              type="text"
              className="input-Import"
              name="num"
              style={{ marginLeft: "57px" }}
              required
              value={numCompte}
              // value={data?.client?.info?.compte[compteSelectionnee]?.num}
              onChange={handleChangeNumCompte}
            />
          </div>
          <div className="form-group">
            <label className="label-input">Picture of Compte :</label>
            <input
              type="file"
              className="input-Import"
              name="img"
              style={{ marginLeft: "25px" }}
              required
              value={imgCompte}
              // value={data?.client?.info?.compte[compteSelectionnee]?.img}
              onChange={handleChangeImgCompte}
            />
          </div>
          <div
            className="form-submit-groupe"
            style={{
              appearance: "none",
              display: "flex",
            }}
          >
            <input
              type="button"
              className="btnPrev-Import"
              value="Previous"
              onClick={() => prev()}
            />
            <input
              type="submit"
              className="btnNext-Import-groupe"
              value="Submit"
              onClick={() => next()}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const Sucess = () => {
  return (
    <div className="CardContentImport">
      <Result status="success" title="Your demand sent successfully" />
    </div>
  );
};

const StepsSection: React.FC<propsImporte> = ({ data }) => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const steps = [
    {
      // Personnel Informations
      title: "",
      content: <InfoPers next={next} prev={prev} data={data} />,
    },
    {
      // Identity Doc
      title: "",
      content: <PieceIdentite next={next} prev={prev} data={data} />,
    },
    {
      // Compte Informations
      title: "",
      content: <InfoCompte next={next} prev={prev} />,
    },
    {
      // Sucess
      title: "",
      content: <Sucess />,
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <>
      <Steps
        current={current}
        items={items}
        style={{
          width: 300,
          marginLeft: "220px",
          marginTop: "80px",
          appearance: "none",
        }}
      />
      <div>{steps[current].content}</div>
    </>
  );
};
