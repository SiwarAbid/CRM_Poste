import React from "react";

const FieldCode: React.FC = () => {
  const currentStep = 1;

  const handleSubmit = () => {
    //
  };
  return (
    <div
      className={`step-tab ${currentStep === 1 ? "active" : ""}`}
      id="step-02"
    >
      <div className="form-controll">
        <div className="form-input">
          <label htmlFor="code">Verification code: </label>
          <input type="text" name="code" id="code" required />
        </div>
        <div className="form-a">
          <div className="form-a">
            {" "}
            <p>
              {" "}
              If you don't recieve a code.{" "}
              <a className="resend" href="/forgot">
                Resend{" "}
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="form-submit">
        <button className="form-btn" type="button" onClick={handleSubmit}>
          Send
        </button>
      </div>
    </div>
  );
};

export default FieldCode;
