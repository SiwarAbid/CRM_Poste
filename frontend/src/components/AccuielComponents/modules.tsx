import React from "react";
import ModuleCard from "./module";
import { useNavigate } from "react-router-dom";
import { Row } from "antd";
import "../../assets/css/Style.css";

const Module: React.FC = () => {
  const navigate = useNavigate();
  const handleModuleClick = (moduleId: string) => {
    navigate(moduleId);
    console.log(moduleId);
  };

  return (
    <div>
      <Row gutter={16}>
        <ModuleCard
          title="Gestion de Vente"
          description="Description du module..."
          onClick={() => handleModuleClick("vente")}
        />
        <ModuleCard
          title="Gestion de Client"
          description="Description du module..."
          onClick={() => handleModuleClick("clients")}
        />
        <ModuleCard
          title="Gestion d'Opportunité"
          description="Description du module..."
          onClick={() => handleModuleClick("opportunite")}
        />
      </Row>
    </div>
  );
};

export default Module;
