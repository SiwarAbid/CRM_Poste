import React, { ChangeEvent } from "react";
interface FieldProps {
  step: number;
  nextStep: () => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFocus: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  focused: boolean;
}
const FieldMail: React.FC<FieldProps> = ({ step, nextStep, handleChange }) => {
  return (
    <fieldset style={{ display: step === 1 ? "block" : "none" }}  className="form form-login">
      <label id="email" htmlFor="email">
        E-Mail:
      </label>
      <input type="email" name="email" id="email" required />
      <a href="/connexion">Back to sign in</a>
      <button type="submit" className="btn-login">
        Send
      </button>
    </fieldset>
  );
};

export default FieldMail;
