import React from "react";
import logo from "../../assets/imgs/LogoPTT.jpg";

function Logo() {
  return (
    <img
      src={logo}
      alt="Logo La Poste Tunisienne"
      style={{ width: "60px", marginRight: "10px" }}
    />
  );
}

export default Logo;
