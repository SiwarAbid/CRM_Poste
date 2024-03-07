import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/StyleLogin.css";
import Person from "@mui/icons-material/Person";
import Password from "@mui/icons-material/Password";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import Cookies from "js-cookie";

interface User {
  matricule: string;
  password: string;
}
interface UserInfo {
  id_user: number;
  nom_prenom: string;
  user_name: string;
  contact: JSON;
  adresse: JSON;
  password: string;
  status: number;
}
export const PageLogin: React.FC = () => {
  const [matricule, setMatricule] = useState("");
  const [password, setPassword] = useState("");
  const [OK, setOK] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [token, setToken] = useState(Cookies.get("token") || "");

  const navigate = useNavigate();
  const initialUser: User = {
    matricule: matricule,
    password: password,
  };
  const getNext = async (data: {
    token: string;
    user: Array<UserInfo>;
  }): Promise<boolean | undefined> => {
    try {
      console.log("getNext ***");
      const response = await fetch("http://localhost:3000/accueil", {
        method: "GET",
        headers: {
          Authorization: `${data.token}`,
          Status: `${data.user[0].status}`,
        },
      });
      console.log("response: ", response);
      const responseData = await response.json();
      console.log("responseData Token: ", responseData);
      if (response.ok) return true;
      else if (!response.ok) return false;
      else
        throw new Error(
          "Une erreur s'est produite lors de la recupere le token."
        );
    } catch (error) {
      throw new Error(
        "Une erreur s'est produite lors de la soumission du token."
      );
    }
  };
  const submitForm = async (data: User): Promise<void> => {
    try {
      console.log("SUBMITFORM ");

      const response = await fetch("http://localhost:3000/userLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();

      console.log("response: ", response);
      console.log("responseData: ", responseData);

      if (response.ok) {
        setOK(false);
        setToken(responseData.token);
        console.log("token: ", responseData.token);
        Cookies.set(`token${responseData.user[0].status}`, responseData.token); // Stockez le token dans un cookie
        const next = await getNext(responseData);
        if (next)
          if (responseData.user[0].status === 0) navigate("/accueil");
          else if (responseData.user[0].status === 1) navigate("/CRM-ONP");
          else navigate("/LaPosteTunisienne");
        else setIsModalOpen(true);
      } else if (!response.ok) {
        setOK(true);
        throw new Error(
          "Une erreur s'est produite lors de la soumission du formulaire."
        );
      }
    } catch (error) {
      console.log("SUBMITFORM ERROR");

      console.error("Erreur de connexion :", error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("HANDLESUBMIT appeleé");
    e.preventDefault();
    submitForm(initialUser);
  };
  const showModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const AlertData: React.FC = () => {
    return (
      <div className="alert alert-danger alert-dismissable fade in">
        <strong>Oh snap!</strong> Change a few things up and try submitting
        again.
      </div>
    );
  };
  const AlertToken: React.FC = () => {
    const rootRef = React.useRef<HTMLDivElement>(null);
    console.log("rootRef: ", rootRef);
    return (
      <>
        <Modal
          disablePortal
          disableEnforceFocus
          disableAutoFocus
          open={isModalOpen}
          onClick={showModal}
          container={() => rootRef.current!}
        >
          <ModalDialog
            aria-labelledby="server-modal-title"
            aria-describedby="server-modal-description"
            layout="center"
          >
            <Typography id="server-modal-title" level="h2">
              Error:
            </Typography>
            <Typography id="server-modal-description" textColor="text.tertiary">
              Invalid Security Code
            </Typography>
          </ModalDialog>
        </Modal>
      </>
    );
  };
  return (
    <div>
      {isModalOpen ? <AlertToken /> : ""}
      <div className="wrapper">
        <form className="login_box" onSubmit={handleSubmit}>
          {OK ? <AlertData /> : ""}
          <div className="login-header">
            <span>Login</span>
          </div>
          <div className="input_box">
            <input
              type="text"
              id="user"
              className="input-field"
              placeholder="Matricule"
              required
              onChange={(e) => setMatricule(e.target.value)}
            />
            <label htmlFor="user" className="label">
              Matricule
            </label>
            <i className="bx bx-user icon">
              <Person />
            </i>
          </div>
          <div className="input_box">
            <input
              type="password"
              id="pass"
              className="input-field"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="pass" className="label">
              Password
            </label>
            <i className="bx bx-lock-alt icon">
              <Password />
            </i>
          </div>
          <div className="remember-forgot">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <div className="forgot">
              <a href="/k">Forgot password?</a>
            </div>
          </div>
          <div className="input_box">
            <input type="submit" className="input-submit" value="Login" />
          </div>
          <div className="register">
            <span>
              Don't have an account? <a href="/k">Register</a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
