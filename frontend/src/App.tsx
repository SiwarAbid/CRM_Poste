import "./App.css";
import Accueil from "./components/Accueil";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Vente from "./components/VenteComponents/Vente";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/vente" element={<Vente />} />
      </Routes>
    </Router>
  );
}

export default App;
