import React, { useState } from "react";
import { SettingOutlined } from "@ant-design/icons";
import "../../assets/css/profil.css";
interface propsProfil {
  name_user: string;
}
const ProfilClient: React.FC<propsProfil> = ({ name_user }) => {
  // const imageUrl = '../assets/imgs/user.png';

  const [sectionVisible, setSectionVisible] = useState("");

  const toggleSection = (sectionName: string) => {
    setSectionVisible((prevSection) =>
      prevSection === sectionName ? "" : sectionName
    );
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header-menu">
          <a href="/setting">
            <SettingOutlined
              style={{
                marginLeft: 30,
                zIndex: 2,
                position: "absolute",
                marginTop: 35,
              }}
            />
          </a>

          <i className="fa fa-bars"></i>
        </div>
        <div
          className="card-header-headshot"

        ></div>
      </div>
      <div className="card-content-member">
        <h4 className="m-t-0">{name_user}</h4>
        <div
          className="panel-group"
          id="accordion"
          role="tablist"
          aria-multiselectable="true"
        >
          <div className="panel panel-default">
            <div className="panel-heading " role="tab" id="headingOne">
              <h4 className="panel-title ">
                <div>
                  <button
                    onClick={() => toggleSection("ccp")}
                    className="SelectSectionUser"
                  >
                    Compte CCP
                  </button>
                  {sectionVisible === "ccp" && (
                    <div>
                      <ul className="listeLiens">
                        <li>
                          <a href="/consulter-ccp">Consulter mon compte</a>
                        </li>
                        <li>
                          <a href="/importer-ccp">Importer mon compte</a>
                        </li>
                        <li>
                          <a href="/informations-ccp">
                            Information sur mon compte
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                <div>
                  <button
                    onClick={() => toggleSection("epargne")}
                    className="SelectSectionUser"
                  >
                    Compte Epargne
                  </button>
                  {sectionVisible === "epargne" && (
                    <div>
                      <ul className="listeLiens">
                        <li>
                          <a href="/consulter-epargne">Consulter mon compte</a>
                        </li>
                        <li>
                          <a href="/importer-epargne">Importer mon compte</a>
                        </li>
                        <li>
                          <a href="/informations-epargne">
                            Information sur mon compte
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                <div>
                  <button
                    onClick={() => toggleSection("carte")}
                    className="SelectSectionUser"
                  >
                    Cartes
                  </button>
                  {sectionVisible === "carte" && (
                    <div>
                      <ul className="listeLiens">
                        <li>
                          <a href="/consulter-carte">Consulter ma carte</a>
                        </li>
                        <li>
                          <a href="/importer-carte">Importer ma carte</a>
                        </li>
                        <li>
                          <a href="/informations-carte">
                            Information sur ma carte
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                <div>
                  <a href="/mandat">
                    <button className="SelectSectionUser">Mandat</button>
                  </a>
                </div>
                <div>
                  <button
                    onClick={() => toggleSection("courrier")}
                    className="SelectSectionUser"
                  >
                    E-Courrier
                  </button>
                  {sectionVisible === "courrier" && (
                    <div>
                      <ul className="listeLiens">
                        <li>
                          <a href="/envoie-courrier">
                            Envoyer un courrier / colis
                          </a>
                        </li>
                        <li>
                          <a href="/suivi-courrier">Suivi courrier / colis</a>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilClient;
