import React from "react";
import "../../assets/css/Envoi.css";
function EnvoiColis() {
  return (
    <div className="Contenier-envoi">
      <div className="header-envoi">
        <h4 className="title-header-envoi">Send your package</h4>
        <div className="description-header-envoi">
          <p className="pargraphe-description">description</p>
          <br />
        </div>
      </div>
      <div className="body-envoi" style={{ marginLeft: "90px" }}>
        <form>
          <div className="form-group">
            <div className="group-title">Informations Sender</div>
            <div className="group-body">
              <div style={{ display: "flex" }}>
                <label style={{ marginRight: "30px", marginTop: "15px" }}>
                  First name :
                </label>
                <input
                  className="input-envoi"
                  type="text"
                  name="nom_exp"
                  style={{ marginLeft: "14px" }}
                  value={"user"}
                  disabled
                />
              </div>
              <div style={{ display: "flex" }}>
                <label style={{ marginRight: "30px", marginTop: "15px" }}>
                  Last name :
                </label>
                <input
                  className="input-envoi"
                  type="text"
                  name="prenom_exp"
                  style={{ marginLeft: "16px" }}
                  value={"user"}
                  disabled
                />
              </div>
              <div style={{ display: "flex" }}>
                <label style={{ marginRight: "30px", marginTop: "15px" }}>
                  Phone :
                </label>
                <input
                  className="input-envoi"
                  type="tel"
                  name="phone"
                  style={{ marginLeft: "47px" }}
                  value={123}
                  disabled
                />
              </div>
              <div style={{ display: "flex" }}>
                <label style={{ marginRight: "30px", marginTop: "15px" }}>
                  Adresse :
                </label>
                <input
                  className="input-envoi"
                  type="text"
                  name="adresse"
                  style={{ marginLeft: "35px" }}
                  required
                />
              </div>
            </div>
          </div>
          <div className="group-title">Informations Recipient</div>
          <div className="group-body">
            <div style={{ display: "flex" }}>
              <label style={{ marginRight: "30px", marginTop: "15px" }}>
                First name :
              </label>
              <input
                className="input-envoi"
                type="text"
                name="nom_dest"
                style={{ marginLeft: "14px" }}
                required
              />
            </div>
            <div style={{ display: "flex" }}>
              <label style={{ marginRight: "30px", marginTop: "15px" }}>
                Last name :
              </label>
              <input
                className="input-envoi"
                type="text"
                name="prenom_dest"
                style={{ marginLeft: "16px" }}
                required
              />
            </div>
            <div style={{ display: "flex" }}>
              <label style={{ marginRight: "30px", marginTop: "15px" }}>
                Phone :
              </label>
              <input
                className="input-envoi"
                type="tel"
                name="phone"
                style={{ marginLeft: "47px" }}
                required
              />
            </div>
            <div style={{ display: "flex" }}>
              <label style={{ marginRight: "30px", marginTop: "15px" }}>
                Adresse :
              </label>
              <input
                className="input-envoi"
                type="text"
                name="adresse"
                style={{ marginLeft: "35px" }}
                required
              />
            </div>
          </div>
          <div className="group-title">Details Package</div>
          <div className="group-body">
            <div style={{ display: "flex" }}>
              <label style={{ marginRight: "30px", marginTop: "15px" }}>
                Type :
              </label>
              <select className="select-envoi" required>
                <option value="">RapidPost</option>
                <option value="">Courrier Ordinaire</option>
                <option value="">Lettre recommendé</option>
              </select>
            </div>
            <div style={{ display: "flex" }}>
              <label style={{ marginRight: "30px", marginTop: "15px" }}>
                Poids :
              </label>
              <input
                className="input-envoi"
                type="text"
                name="poids"
                style={{ marginLeft: "51px" }}
              />
            </div>
            <div style={{ display: "flex" }}>
              <label style={{ marginRight: "30px", marginTop: "15px" }}>
                Nature :
              </label>
              <select
                className="select-envoi"
                name="nature"
                style={{ marginLeft: "39px" }}
              >
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
              </select>
            </div>
            <div style={{ display: "flex" }}>
              <label style={{ marginRight: "30px", marginTop: "15px" }}>
                tarif :
              </label>
              <input
                className="input-envoi"
                type="text"
                name="tarif"
                style={{ marginLeft: "55px" }}
                disabled
              />
            </div>
            <div style={{ display: "flex" }}>
              <label style={{ marginRight: "30px", marginTop: "15px" }}>
                Poste office :
              </label>
              <input
                className="input-envoi"
                type="number"
                name="bureau_poste"
                style={{ marginLeft: "1px" }}
                required
              />
            </div>
            <div style={{ display: "flex" }}>
              <label style={{ marginRight: "30px", marginTop: "15px" }}>
                Description :
              </label>
              <textarea
                name="description"
                style={{ marginLeft: "5px", marginTop: "10px" }}
                className="textarea-envoi"
              />
            </div>
          </div>
          <div className="form-submit">
            <button className="btn-back">Back Home</button>
            <button type="submit" className="btn-submit">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EnvoiColis;
