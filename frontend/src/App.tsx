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
import ProfilClient from "./components/AccuielComponents/Gestionnaire/Clients";
// import ProfilClient from "./components/ClientsComponents/ImporterCompte";
import FieldMail from "./Pages/ForgotPassword";
import GestionnaireSection from "./components/AccuielComponents/Admin/CRUD_Gestonnaire/Gestionnaire";
import Suivi from "./components/ClientsComponents/Suivi";
import EnvoiColis from "./components/ClientsComponents/EnvoiColis";
function App() {
  const tokenAdmin = Cookies.get("token0");
  const tokenUser = Cookies.get("token2");
  // const tokenGestionnaire = Cookies.get("token1");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Connexion />} />
        <Route path="/forgot" element={<FieldMail />} />
        <Route
          path="/LaPosteTunisienne/:id"
          element={
            tokenUser === undefined || null ? <Token /> : <AccueilUser />
          }
        />
        {/* <Route
          path="/Profil"
          element={
            tokenUser === undefined || null ? <Token /> : <ProfilClient />
          }
        /> */}
        {/* <Route path="/test" element={<ProfilClient />} /> */}
        {/* <Route
          path="/test"
          element={
            <Suivi
              // label={"The mandate number: "}
              // name={"num_mandat"}
              // suivi={"Mandat"}
              label={"The package number: "}
              name={"num_colis"}
              suivi={"Colis"}
              title={"Package"}
            />
          }
        /> */}
        <Route path="/test" element={<EnvoiColis />} />
        <Route
          path="/accueil"
          element={tokenAdmin === undefined || null ? <Token /> : <Accueil />}
        />
        <Route
          path="/gestionnaire"
          element={
            tokenAdmin === undefined || null ? (
              <Token />
            ) : (
              <GestionnaireSection />
            )
          }
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
