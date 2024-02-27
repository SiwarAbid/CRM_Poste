import "./App.css";
import Accueil from "./Pages/Accueil";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Vente from "./components/VenteComponents/Vente";
import { Liste } from "./components/ClientsComponents/Liste";
import { PageLogin } from "./Pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/accueil" element={<Accueil />} />
        <Route path="/" element={<PageLogin />} />
        <Route path="/vente" element={<Vente />} />
        <Route path="/clients" element={<Liste />} />
      </Routes>
    </Router>
  );
}

export default App;
