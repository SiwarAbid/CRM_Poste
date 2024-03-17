import React from "react";
import "./App.css";
import Accueil from "./Pages/Accueil";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Vente from "./components/VenteComponents/Vente";
import { Liste } from "./components/ClientsComponents/Liste";
import { PageLogin } from "./Pages/Login";
import Cookies from "js-cookie";
import Token from "./components/StandardComponents/403_";
import NotFound from "./components/StandardComponents/404_";
import Connexion from "./components/LogClientComponents/Connexion";
function App() {
  const token = Cookies.get("token0");
  return (
    <Router>
      <Routes>
        <Route path="/connexion" element={<Connexion />} />
        <Route
          path="/accueil"
          element={token === undefined || null ? <Token /> : <Accueil />}
        />
        <Route path="/" element={<PageLogin />} />
        <Route
          path="/vente"
          element={token === undefined || null ? <Token /> : <Vente />}
        />
        <Route
          path="/clients"
          element={token === undefined || null ? <Token /> : <Liste />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
