import React, { ChangeEvent } from "react";
interface FieldProps {
  step: number;
  nextStep: () => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFocus: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  focused: boolean;
}
const FieldPassword: React.FC<FieldProps> = ({ step, nextStep, handleChange }) => {
  return (
    <fieldset style={{ display: step === 1 ? "block" : "none" }}    className="form form-login">
      <label id="password" htmlFor="password">
        New Password:
      </label>
      <input type="password" name="password" id="password" required />
      <label id="confirmpassword" htmlFor="confirmpassword">
        Confirm Password:
      </label>
      <input
        type="password"
        name="confirmpassword"
        id="confirmpassword"
        required
      />
      <button type="submit" className="btn-login">
        Send
      </button>
    </fieldset>
  );
}

export default FieldPassword;
