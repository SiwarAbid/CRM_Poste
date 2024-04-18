import React from "react";
interface ProgressBarProps {
  step: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step }) => {
  return (
    <ul id="progressbar">
      <li className={step === 1 ? "active" : ""}>E-mail</li>
      <li className={step === 2 ? "active" : ""}>Code</li>
      <li className={step === 3 ? "active" : ""}>Password</li>
    </ul>
  );
};

export default ProgressBar;
