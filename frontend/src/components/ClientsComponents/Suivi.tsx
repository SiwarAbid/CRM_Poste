import React, { useState } from "react";
// import Main from "./SuiviMandat";
import { Send } from "@mui/icons-material";
import "../../assets/css/Suivi.css";

// lorsque je clique sur le champs au sideBar du Suivi Mandat les informations du mandat comme nom label etc se passe en parametre à la page Suivi.tsx
interface propsSuivi {
  label: string;
  name: string;
  suivi: string;
  title: string;
}
type Mandat = {
  id: string;
  nom_exp: string;
  prenom_exp: string;
  nom_dest: string;
  prenom_dest: string;
  date_emis: string;
  date_recp: string;
  montant: string;
  etat: string;
  others_info: [{}]; // tableau contenant un objet vide
};
type Colis = {
  id: string;
  type: string;
  poids: string;
  info_destinateur: {
    first_name: string;
    last_name: string;
    phone: number;
    adresse: string;
  };
  info_expediteur: {
    first_name: string;
    last_name: string;
    phone: number;
    adresse: string;
  };
  nature: string;
  tarif: string;
  bureau_poste: number;
  others_info: null;
  etat: string;
};
const Suivi: React.FC<propsSuivi> = ({ label, name, suivi, title }) => {
  const [num, setNum] = useState("");
  const [dataMandat, setDataMandat] = useState<Mandat>();
  const [dataColis, setDataCOlis] = useState<Colis>();
  console.log("num: ", num);
  const onSubmit = async () => {
    await fetch(`http://localhost:4000/${suivi}/${num}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log("Res: ", res);
          console.log("Success"); //Ajoutez le console.log pour indiquer le succès
          return res.json();
        } else {
          console.log("ERROR CASE: ", res);
          // error();
          throw new Error("Erreur lors de la requête"); // Gérez les erreurs ici si nécessaire
        }
      })
      .then((data) => {
        console.log("resultMandatat Data: ", data);
        if (suivi === "Mandat") setDataMandat(data as Mandat);
        else if (suivi === "Colis") setDataCOlis(data as Colis);
        // success();
      });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("handleSubmit");
    e.preventDefault();
    onSubmit();
  };
  return (
    <div className="contenier-Suivi">
      <div className="header-Suivi">
        <h4>{title} Tracking</h4>
      </div>
      <div className="body-Suivi">
        <form
          style={{ display: "flex", marginLeft: "40px" }}
          onSubmit={handleSubmit}
        >
          <label
            style={{ marginTop: "20px", color: "#2F7597" }}
            className="label-numMandat"
          >
            {label}
          </label>
          <input
            type="text"
            name={name}
            style={{ width: 400, marginLeft: "20px", marginRight: "20px" }}
            onChange={(e) => setNum(e.target.value)}
            value={num}
          />
          <button type="submit" className="btnsubmit-Suivi">
            <Send />
            <div className="text-btnSubmit-Suivi" style={{ marginLeft: "5px" }}>
              <br />
              Send
            </div>
          </button>
        </form>
        <br />
        {suivi === "Mandat" ? (
          <MainMandat resultMandat={dataMandat} />
        ) : suivi === "Colis" ? (
          <MainColis resultColis={dataColis} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Suivi;

interface propsMain {
  resultMandat?: Mandat | undefined;
  resultColis?: Colis | undefined;
}
const MainMandat: React.FC<propsMain> = ({ resultMandat }) => {
  return (
    <>
      <div
        className="container-Mandat"
        style={{ marginRight: "60px", marginTop: "70px" }}
      >
        <div className="table-responsive">
          {/* <div className="table-wrapper" > */}
          <div className="table-title">
            <div className="row mandat">
              <div className="col-xs-6">
                <h2>Mandate</h2>
              </div>
              <div className="col-xs-6"></div>
            </div>
          </div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th style={{ width: "auto" }}>Mandate Number</th>
                <th style={{ width: "auto" }}>Sender</th>
                <th style={{ width: "auto" }}>Recipient</th>
                <th style={{ width: "auto" }}>Date Issued</th>
                <th style={{ width: "auto" }}>Date Received</th>
                <th style={{ width: "auto" }}>Amount</th>
                <th style={{ width: "auto" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              <td style={{ width: "auto" }}>{resultMandat?.id}</td>
              <td style={{ width: "50px" }}>
                {resultMandat?.nom_exp} {resultMandat?.prenom_exp}
              </td>
              <td style={{ width: "50px" }}>
                {resultMandat?.nom_dest} {resultMandat?.prenom_dest}
              </td>
              <td style={{ width: "auto" }}>{resultMandat?.date_emis}</td>
              <td style={{ width: "auto" }}>{resultMandat?.date_recp}</td>
              <td style={{ width: "auto" }}>{resultMandat?.montant}</td>
              <td style={{ width: "auto" }}>{resultMandat?.etat}</td>
            </tbody>
          </table>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

const MainColis: React.FC<propsMain> = ({ resultColis }) => {
  return (
    <>
      <div
        className="container-Mandat"
        style={{ marginRight: "60px", marginTop: "70px" }}
      >
        <div className="table-responsive">
          {/* <div className="table-wrapper" > */}
          <div className="table-title">
            <div className="row mandat">
              <div className="col-xs-6">
                <h2>Package</h2>
              </div>
              <div className="col-xs-6"></div>
            </div>
          </div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th style={{ width: "auto" }}>Package Number</th>
                <th style={{ width: "auto" }}>Sender</th>
                <th style={{ width: "auto" }}>Recipient</th>
                <th style={{ width: "auto" }}>Type</th>
                <th style={{ width: "auto" }}>Nature</th>
                <th style={{ width: "auto" }}>Tarif</th>
                <th style={{ width: "auto" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              <td style={{ width: "auto" }}>{resultColis?.id}</td>
              <td style={{ width: "50px" }}>
                {resultColis?.info_expediteur.first_name}{" "}
                {resultColis?.info_expediteur.last_name}
              </td>
              <td style={{ width: "50px" }}>
                {resultColis?.info_destinateur.first_name}{" "}
                {resultColis?.info_destinateur.last_name}
              </td>
              <td style={{ width: "auto" }}>{resultColis?.type}</td>
              <td style={{ width: "auto" }}>{resultColis?.nature}</td>
              <td style={{ width: "auto" }}>{resultColis?.tarif}</td>
              <td style={{ width: "auto" }}>{resultColis?.etat}</td>
            </tbody>
          </table>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};
