import React, { useState } from "react";
import { message } from "antd";

interface PropsSettingProfil {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  prof: string;
  adresse: string;
  user_email: string;
  user_phone: number;
  date_birth: string;
  lieu_birth: string;
  status_civil: string;
  cat_prof: string;
}
interface PropsProps {
  props: PropsSettingProfil;
}
const SettingAccountInfo: React.FC<PropsProps> = (props) => {
  const [dataUserSetting, setDataUserSetting] = useState<{
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    prof: string;
    adresse: string;
    user_email: string;
    user_phone: number;
    date_birth: string;
    lieu_birth: string;
    status_civil: string;
    cat_prof: string;
  }>({
    id: props.props.id,
    username: props.props.username,
    first_name: props.props.first_name,
    last_name: props.props.last_name,
    prof: props.props.prof,
    adresse: props.props.adresse,
    user_email: props.props.user_email,
    user_phone: props.props.user_phone,
    date_birth: props.props.date_birth,
    lieu_birth: props.props.lieu_birth,
    status_civil: props.props.status_civil,
    cat_prof: props.props.cat_prof,
  });
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "This is an error message",
    });
  };
  console.log("props ID: ", props.props.id);
  console.log("datUseSetting: ", dataUserSetting);

  const handleInputChangeSettingProfil = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDataUserSetting({
      ...dataUserSetting,
      [name]: name === "user_phone" ? parseInt(value, 10) : value,
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("handleSubmit");
    e.preventDefault();
    fetch(`http://localhost:3000/updateUser/${props.props.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(dataUserSetting),
    })
      .then((res) => {
        if (res.ok) {
          console.log("Res: ", res);
          console.log("Success"); //Ajoutez le console.log pour indiquer le succès
          return res.json();
        } else {
          console.log("ERROR CASE: ", res);
          error();
          throw new Error("Erreur lors de la requête"); // Gérez les erreurs ici si nécessaire
        }
      })
      .then((data) => {
        console.log("Resultat Data: ", data);
        success();
      });
  };
  return (
    <div className="col-xl-8" style={{ width: "550px" }}>
      {contextHolder}
      {/* <!-- Account details cardSettingProfil--> */}
      <div className="cardSettingProfil mb-4">
        <div className="cardSettingProfil-header">Account Details</div>
        <br />

        <div className="cardSettingProfil-body">
          <form onSubmit={handleSubmit}>
            {/* <!-- Form Group (username)--> */}
            <div className="mb-3">
              <label className="small mb-1" htmlFor="inputUsername">
                Username (the identifier used to log in)
              </label>
              <input
                className="form-control"
                id="inputUsername"
                type="text"
                placeholder="Enter your username"
                name="username"
                value={dataUserSetting.username}
                onChange={handleInputChangeSettingProfil}
              />
            </div>
            <br />
            {/* <!-- Form Group (adresse)--> */}
            <div className="mb-3">
              <label className="small mb-1" htmlFor="inputUsername">
                Location
              </label>
              <input
                className="form-control"
                id="inputLocation"
                type="text"
                placeholder="Enter your location"
                name="adresse"
                value={dataUserSetting.adresse}
                onChange={handleInputChangeSettingProfil}
              />
            </div>
            <br />
            {/* <!-- Form Group (email address)--> */}
            <div className="mb-3">
              <label className="small mb-1" htmlFor="inputEmailAddress">
                Email address
              </label>
              <input
                className="form-control"
                id="inputEmailAddress"
                type="email"
                placeholder="Enter your email address"
                name="user_email"
                value={dataUserSetting.user_email}
                onChange={handleInputChangeSettingProfil}
              />
            </div>
            <br />
            {/* <!-- Form Group (phone number)--> */}
            <div className="col-md-6">
              <label className="small mb-1" htmlFor="inputPhone">
                Phone number
              </label>
              <input
                className="form-control"
                id="inputPhone"
                type="tel"
                placeholder="Enter your phone number"
                name="user_phone"
                value={dataUserSetting.user_phone.toString()}
                onChange={handleInputChangeSettingProfil}
              />
            </div>
            <br />

            {/* <!-- Save changes button--> */}
            <button className="btnSettingProfil btn-primary" type="submit">
              Save changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingAccountInfo;
