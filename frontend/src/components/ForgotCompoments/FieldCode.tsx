import React, { ChangeEvent } from "react";
interface FieldProps {
  step: number;
  nextStep: () => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFocus: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  focused: boolean;
}
const FieldCode: React.FC<FieldProps> = ({ step, nextStep, handleChange }) => {
  return (
    <fieldset
      style={{ display: step === 1 ? "block" : "none" }}
      className="form form-login"
    >
      <label id="code" htmlFor="code">
        Verification code
      </label>
      <input type="text" name="code" id="code" required />
      If you don't recieve a code. <a href="/">Resend</a>
      <button type="submit" className="btn-login">
        Send
      </button>
    </fieldset>
  );
};

export default FieldCode;
