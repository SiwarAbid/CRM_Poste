import React from "react";
import "./App.css";
import Accueil from "./Pages/Accueil";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Vente from "./components/VenteComponents/Vente";
import { Liste } from "./components/ClientsComponents/Liste";
import { PageLogin } from "./Pages/Login";
import Cookies from "js-cookie";
import Token from "./components/StandardComponents/403_";

function App() {
  const token = Cookies.get("token0");
  return (
    <Router>
      <Routes>
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
      </Routes>
    </Router>
  );
}

export default App;
