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
  const style = { display: "inline-block" };
  return (
    <div>
      <Row gutter={16} style={style}>
        <ModuleCard
          title="Partucilier"
          onClick={() => handleModuleClick("client")}
        />
        <ModuleCard
          title="Entreprise"
          onClick={() => handleModuleClick("entreprise")}
        />
      </Row>
    </div>
  );
};

export default Module;
