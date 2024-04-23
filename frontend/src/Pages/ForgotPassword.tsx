import React, { useState } from "react";
import { Modal } from "antd";
import "../assets/css/ForgotStyle.css";

const FieldMail: React.FC = () => {
  const currentStep = 0;
  const [email, setEmail] = useState("");
  const [check, SetCheck] = useState(false);

  const handleNextStep = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email);
    fetch("http://localhost:3000/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => {
        if (res.ok) {
          console.log("Success"); // Ajoutez le console.log pour indiquer le succès
          SetCheck(true);
          return res.json(); // Continuez avec la conversion en JSON
        } else {
          throw new Error("Erreur lors de la requête"); // Gérez les erreurs ici si nécessaire
        }
      })
      .then((data) => {
        console.log("userRegister: ", data);
      });
    // Logique de soumission du formulaire
    // Par exemple, envoyer les données à un endpoint
    // et gérer la réponse
  };
  const handleOk = () => {
    SetCheck(false);
  };
  const handleCancel = () => {
    SetCheck(false);
  };
  /** CSS MOdal */
  const ModalCheckMail = () => {
    return (
      <Modal
        title="Verify your email"
        open={check}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        Almost there! We've sent a verification email to {email}. You need to
        verify your email address to log into CRM La Poste Tunisienne.
        <form className="form-a" onSubmit={handleNextStep}>
          <p>
            If you don't recieve a code.{" "}
            <button className="resend" type="submit">
              Resend
            </button>
          </p>
        </form>
      </Modal>
    );
  };
  return (
    <section className="forms-section">
      {check ? <ModalCheckMail /> : ""}
      <div className="forms">
        <div className="box">
          <div className="form-wrapper forgot is-active">
            <button type="button" className="switcher switcher-login">
              Forgot Password
              <span className="underline"></span>
            </button>
          </div>
          <div className="steps">
            <ul className="step-tab-items">
              <li className="step-item active">1</li>
              <li className="step-item">2</li>
              <li className="step-item">3</li>
            </ul>
            <div className="step-tabs">
              <div className="card-arrierplan"></div>
              <div
                className={`step-tab ${currentStep === 0 ? "active" : ""}`}
                id="step-01"
              >
                <form onSubmit={handleNextStep} className="form-controll">
                  <div className="form-input">
                    <label htmlFor="email">E-mail:</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-a">
                    <div className="form-a">
                      <a href="/"> Back to Sign In </a>
                    </div>
                  </div>

                  <div className="form-submit">
                    <button className="form-btn" type="submit">
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FieldMail;
