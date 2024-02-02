import React from "react";
import ModuleCard from "./module";
import { Row } from "antd";
import "../../assets/css/Style.css";

const Module: React.FC = () => {
  const handleModuleClick = (moduleId: string) => {
    if (moduleId === "vente") {
      //page vente
    }
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
          onClick={() => handleModuleClick("client")}
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
