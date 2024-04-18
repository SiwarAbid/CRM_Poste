import React from "react";
import "./App.css";
import Accueil from "./Pages/Accueil";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Vente from "./components/VenteComponents/Vente";
import { Liste } from "./components/ClientsComponents/Liste";
import Cookies from "js-cookie";
import Token from "./components/StandardComponents/403_";
import NotFound from "./components/StandardComponents/404_";
import Connexion from "./Pages/Connexion";
import AccueilUser from "./Pages/AccueilUser";
import ProfilClient from "./Pages/ProfilClient";
import Forgot from "./Pages/Forgot";
function App() {
  const tokenAdmin = Cookies.get("token0");
  const tokenUser = Cookies.get("token2");
  // const tokenGestionnaire = Cookies.get("token1");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Connexion />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route
          path="/LaPosteTunisienne"
          element={
            tokenUser === undefined || null ? <Token /> : <AccueilUser />
          }
        />
        <Route
          path="/Profil"
          element={
            tokenUser === undefined || null ? <Token /> : <ProfilClient />
          }
        />
        <Route
          path="/accueil"
          element={tokenAdmin === undefined || null ? <Token /> : <Accueil />}
        />
        <Route
          path="/vente"
          element={tokenAdmin === undefined || null ? <Token /> : <Vente />}
        />
        <Route
          path="/clients"
          element={tokenAdmin === undefined || null ? <Token /> : <Liste />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
