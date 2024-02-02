import React from "react";
import Head from "./AccuielComponents/Head";
import Module from "./AccuielComponents/modules";
import Accueil from "./AccuielComponents/Accueil";

const App: React.FC = () => {
  return (
    <>
      <Head />
      <br />
      <Accueil />
      <br />
      <Module />
    </>
  );
};

export default App;
