import React, { useState } from "react";
import { DollarOutlined } from "@ant-design/icons";
import "../../assets/css/Consulter.css";
function Consulter() {
  const [sectionVisible, setSectionVisible] = useState("");

  const toggleSection = (sectionName: string) => {
    setSectionVisible((prevSection) =>
      prevSection === sectionName ? "" : sectionName
    );
  };
  return (
    <div className="card-consulter">
      <div className="div-1">
        <div className="col-xl-4">
          <div className="solde-div">
            <div className="title-solde">
              <DollarOutlined
                style={{
                  fontSize: "25px",
                }}
              />
              <label
                style={{
                  textAlign: "center",
                  fontFamily: "Alice",
                  fontWeight: "500",
                  fontSize: "25px",
                  marginLeft: "10px",
                }}
              >
                Solde
              </label>
            </div>
            <div className="card-solde">1234.00 TND</div>
          </div>
          <div className="username-consulter">Mr. User</div>
        </div>
      </div>
      <div className="div-2">
        <div>
          <button
            onClick={() => toggleSection("ccp")}
            className="infoSectionConsulter"
          >
            Information compte
          </button>
          {sectionVisible === "ccp" && (
            <div
              style={{
                // display: "inline-block",
                marginTop: "-290px",
                width: "100%",
                // writingMode: "vertical-rl",
                whiteSpace: "pre-wrap",
                height: "20px",
                marginLeft: "90px",
              }}
            >
              <p>
                num: 170000000xxxxxxxxxx <br />
                nom : user user *******************************************
                *******************************************
                *******************************************
                *******************************************
                *******************************************
                *******************************************
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Consulter;
