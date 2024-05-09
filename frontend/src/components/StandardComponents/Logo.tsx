import React from "react";
import logo from "../../assets/imgs/LogoPTT.jpg";

function Logo() {
  return (
    <div style={{ gridArea: "2 / 1 / 3 / 2" }}>
      <img
        src={logo}
        alt="Logo La Poste Tunisienne"
        style={{
          width: "175px",
          marginTop: "250px",
        }}
      />
      <p
        style={{
          fontSize: "25px",
          fontWeight: "inherit",
          color: "#F2BE22" /* Couleur du texte */,
          textAlign: "center",
          fontFamily: "fantasy"
        }}
      >
        La Poste Tunisienne
      </p>
    </div>
  );
}

export default Logo;
