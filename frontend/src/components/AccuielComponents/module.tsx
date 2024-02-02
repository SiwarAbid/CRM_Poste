import React from "react";
import { Card, Col } from "antd";

interface ModuleCardProps {
  title: string;
  description: string;
  onClick: () => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  description,
  onClick,
}) => {
  return (
    <div onClick={onClick}>
      <Col span={8}>
        <Card title={title} bordered={false} hoverable style={{ width: 240 }}>
          {description}
        </Card>
      </Col>
    </div>
  );
};

export default ModuleCard;
