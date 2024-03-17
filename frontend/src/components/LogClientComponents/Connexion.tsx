import React, { useEffect, useState } from "react";
import "../../assets/css/ConnexionStyle.css";
import { ClientType } from "../../initialStates/UserInitialState";
import { getNext } from "../../Pages/Login";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Connexion: React.FC = () => {
  const [dataLogin, setDataLogin] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });
  const initialdataInsecrire: ClientType = {
    civil: "M",
    nom_prenom: "",
    brith_lieu: "",
    brith_date: "",
    PI_type: "CIN",
    PI_num: "",
    email: "",
    telephone: "",
    password: "",
  };
  const [dataInscrire, setDataInscrire] =
    useState<ClientType>(initialdataInsecrire);
  const [token, setToken] = useState(Cookies.get("token2") || "");
  const navigate = useNavigate();

  useEffect(() => {
    const switchers = Array.from(document.querySelectorAll(".switcher"));

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      switchers.forEach((item: Element) =>
        item.parentElement?.classList.remove("is-active")
      );
      target.parentElement?.classList.add("is-active");
    };

    switchers.forEach((item: Element) =>
      item.addEventListener("click", handleClick as EventListener)
    );

    return () => {
      switchers.forEach((item: Element) =>
        item.removeEventListener("click", handleClick as EventListener)
      );
    };
  }, []);
  const onSubmitLogin = (data: { username: string; password: string }) => {
    console.log("Onsubmit");
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/verifyclient?username=${data.username}&password=${data.password}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const responseData = await response.json();

        if (response.ok) {
          /** Modal Succes + initialiser les champs s'insecrire */
          setToken(responseData.token);
          console.log("token: ", responseData.token);
          Cookies.set(`token2`, responseData.token);
          const next = await getNext({
            token: responseData.token,
            user: [
              {
                id_user: responseData.response[0].id_user,
                nom_prenom: "",
                user_name: "",
                contact: JSON,
                adresse: JSON,
                password: "",
                status: 2,
              },
            ],
          });
          if (next) navigate("/LaPosteTunisienne");
          console.log("** SUCCES **");
        } else {
          throw new Error("Erreur lors de la soumission du formulaire");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  };
  const handleSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("handleSubmit");
    e.preventDefault();
    onSubmitLogin(dataLogin);
  };
  const onSubmitInscrire = (data: ClientType) => {
    console.log("Onsubmit");
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/ajouterclient`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          /** Modal Succes + initialiser les champs s'insecrire */
          console.log("** SUCCES **");
        } else {
          throw new Error("Erreur lors de la soumission du formulaire");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  };
  const handleSubmitInscrire = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("handleSubmit");
    e.preventDefault();
    onSubmitInscrire(dataInscrire);
  };
  const handleInputChangeConnexion = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDataLogin({ ...dataLogin, [name]: value });
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDataInscrire({ ...dataInscrire, [name]: value });
  };
  console.log("dataInscrire: ", dataInscrire);

  return (
    <section className="forms-section">
      <div className="forms">
        <div className="form-wrapper is-active">
          <button type="button" className="switcher switcher-login">
            Login
            <span className="underline"></span>
          </button>
          <form
            className="form form-login"
            onSubmit={(e) => handleSubmitLogin(e)}
          >
            <fieldset>
              <legend>
                Please, enter your user name and password for login.
              </legend>
              <div className="input-block">
                <label htmlFor="login-username">UserName</label>
                <input
                  id="login-username"
                  type="text"
                  name="username"
                  value={dataLogin.username}
                  onChange={handleInputChangeConnexion}
                  required
                />
              </div>
              <div className="input-block">
                <label htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  type="password"
                  name="password"
                  value={dataLogin.password}
                  onChange={handleInputChangeConnexion}
                  required
                />
              </div>
            </fieldset>
            <button type="submit" className="btn-login">
              Login
            </button>
          </form>
        </div>
        <div className="form-wrapper">
          <button type="button" className="switcher switcher-signup">
            Sign Up
            <span className="underline"></span>
          </button>
          <form
            className="form form-signup"
            onSubmit={(e) => handleSubmitInscrire(e)}
          >
            <fieldset>
              <legend>
                Please, enter your email, password and password confirmation for
                sign up.
              </legend>
              <div className="input-block">
                <div className="form-item-double box-item">
                  <div className="form-item ">
                    <label htmlFor="signup-civil">Civil Status</label>
                    <select
                      id="signup-civil"
                      required
                      name="civil"
                      value={dataInscrire.civil}
                      onChange={handleInputChange}
                    >
                      <option value="M">M</option>
                      <option value="Mme">Mme</option>
                      <option value="Mlle">Mlle</option>
                    </select>
                  </div>
                  <div className="form-item ">
                    <label htmlFor="signup-name">Name & Last Name</label>
                    <input
                      id="signup-name"
                      type="text"
                      required
                      name="nom_prenom"
                      value={dataInscrire.nom_prenom}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="input-block">
                <div className="form-item-double box-item">
                  <div className="form-item ">
                    <label htmlFor="signup-placeBirth">Place of birth</label>
                    <input
                      id="signup-placeBirth"
                      type="text"
                      required
                      name="brith_lieu"
                      value={dataInscrire.brith_lieu}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-item ">
                    <label htmlFor="signup-dateBirth">Date of birth</label>
                    <input
                      type="date"
                      id="signup-dateBirth"
                      required
                      name="brith_date"
                      value={dataInscrire.brith_date}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="input-block">
                <div className="form-item-double box-item">
                  <div className="form-item ">
                    <label htmlFor="signup-typedoc">Identity Doc</label>
                    <select
                      id="signup-typedoc"
                      name="PI_type"
                      value={dataInscrire.PI_type}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="CIN">CIN</option>
                      <option value="Carte Séjour">Carte Séjour</option>
                      <option value="Passport">Passport</option>
                    </select>
                  </div>
                  <div className="form-item ">
                    <label htmlFor="signup-numid">Numero Identity</label>
                    <input
                      id="signup-numid"
                      type="text"
                      name="PI_num"
                      value={dataInscrire.PI_num}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="input-block">
                <label htmlFor="signup-email">E-mail</label>
                <input
                  id="signup-email"
                  type="email"
                  name="email"
                  value={dataInscrire.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-block">
                <label htmlFor="signup-phone">Phone</label>
                <input
                  id="signup-phone"
                  type="text"
                  name="telephone"
                  value={dataInscrire.telephone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-block">
                <div className="form-item-double box-item">
                  <div className="form-item ">
                    <label htmlFor="signup-password">Password</label>
                    <input
                      id="signup-password"
                      type="password"
                      name="password"
                      value={dataInscrire.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-item ">
                    <label htmlFor="signup-password-confirm">
                      Confirm password
                    </label>
                    <input
                      id="signup-password-confirm"
                      type="password"
                      name="confpasword"
                      //   onChange={}
                      required
                    />
                  </div>
                </div>
              </div>
            </fieldset>
            <button type="submit" className="btn-signup">
              Continue
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Connexion;
