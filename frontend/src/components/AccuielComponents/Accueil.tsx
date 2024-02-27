import React from "react";
import image from "../../assets/imgs/Design1.png";
const styles = {
  paragraphe: {
    marginTop: "200px",
    fontFamily: "YanoneKaffeesatz",
  },
  image: {
    marginLeft: "400px",
    marginTop: "-300px",
  },
};
const Accueil: React.FC = () => {
  return (
    <>
      <div>
        <h1 style={styles.paragraphe}>La Poste, Encore la Plus Fidèle.</h1>
        <img alt="imageFidalitéPoste" src={image} style={styles.image} />
      </div>
      <div></div>
    </>
  );
};

export default Accueil;
