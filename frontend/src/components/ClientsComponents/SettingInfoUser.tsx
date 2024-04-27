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
const SettingInfoUser: React.FC<PropsProps> = (props) => {
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

  function formatDateStringToDate(dateString: string) {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  }
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dateString = formatDateStringToDate(event.target.value);
    console.log("dateOfBirth: ", dateString);
    setDataUserSetting({ ...dataUserSetting, date_birth: dateString });
  };

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
    fetch(`http://localhost:3000/updateUserInfo/${props.props.id}`, {
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
        <div className="cardSettingProfil-header">User Details</div>
        <br />

        <div className="cardSettingProfil-body">
          <form onSubmit={handleSubmit}>
            {/* <!-- Form Row--> */}
            <div className="row gx-3 mb-3">
              {/* <!-- Form Group (civilite)--> */}
              <div className="col-md-6">
                <label className="small mb-1" htmlFor="signup-civil">
                  Civil Status
                </label>
                <select
                  className="form-control select"
                  id="signup-civil"
                  required
                  name="civil"
                  value={dataUserSetting.status_civil}
                  onChange={handleInputChangeSettingProfil}
                >
                  <option value="M">M</option>
                  <option value="Mme">Mme</option>
                  <option value="Mlle">Mlle</option>
                </select>
              </div>
              {/* <!-- Form Group (first name)--> */}
              <div className="col-md-6">
                <label className="small mb-1" htmlFor="inputFirstName">
                  First name
                </label>
                <input
                  className="form-control inputFirstName"
                  id="inputFirstName"
                  type="text"
                  placeholder="Enter your first name"
                  name="first_name"
                  value={dataUserSetting.first_name}
                  onChange={handleInputChangeSettingProfil}
                />
              </div>
              {/* <!-- Form Group (last name)--> */}
              <div className="col-md-6">
                <label
                  className="small mb-1 labelLastName"
                  htmlFor="inputLastName"
                >
                  Last name
                </label>
                <input
                  className="form-control inputLastName"
                  id="inputLastName"
                  type="text"
                  placeholder="Enter your last name"
                  name="last_name"
                  value={dataUserSetting.last_name}
                  onChange={handleInputChangeSettingProfil}
                />
              </div>
            </div>
            <br />

            {/* <!-- Form Row        --> */}
            <div className="row gx-3 mb-3">
              {/* <!-- Form Group (organization name)--> */}
              <div className="col-md-6">
                <label className="small mb-1" htmlFor="inputOrgName">
                  Place of brith
                </label>
                <input
                  className="form-control inputPlaceBirth"
                  id="inputPlaceBirth"
                  type="text"
                  placeholder="Enter your place of birth"
                  name="lieu_birth"
                  value={dataUserSetting.lieu_birth}
                  onChange={handleInputChangeSettingProfil}
                />
              </div>
              {/* <!-- Form Group (birthday)--> */}
              <div className="col-md-6">
                <label className="small mb-1" htmlFor="inputBirthday">
                  Birthday
                </label>
                <input
                  className="form-control inputBirth"
                  id="inputBirthday"
                  type="date"
                  name="date_birth"
                  placeholder="Enter your birthday"
                  value={dataUserSetting.date_birth}
                  onChange={handleDateChange}
                />
              </div>
            </div>
            <br />

            {/* <!-- Form Row        --> */}
            <div className="row gx-3 mb-3">
              {/* <!-- Form Group (organization name)--> */}
              <div className="col-md-6">
                <label className="small mb-1" htmlFor="inputCatProf">
                  Professional Category
                </label>
                <select
                  className="form-control select inputPlaceBirth"
                  id="inputCatProf"
                  required
                  name="cat_prof"
                  value={dataUserSetting.cat_prof}
                  onChange={handleInputChangeSettingProfil}
                >
                  <option value="" disabled selected hidden>
                    Professional Category
                  </option>
                  <option value="Farmer">Farmer</option>
                  <option value="Artisan">Artisan</option>
                  <option value="Artist">Artist</option>
                  <option value="Banker">Banker</option>
                  <option value="Senior Manager">Senior Manager</option>
                  <option value="Merchant">Merchant</option>
                  <option value="Student">Student</option>
                  <option value="Self Employed">Self Employed</option>
                  <option value="Civil Servant">Civil Servant</option>
                  <option value="Manager/CEO">Manager/CEO</option>
                  <option value="Senior Official">Senior Official</option>
                  <option value="Worker">Worker</option>
                  <option value="Postman">Postman</option>
                  <option value="Employee">Employee</option>
                  <option value="Startupper">Startupper</option>
                </select>
              </div>
              {/* <!-- Form Group (location)--> */}
              <div className="col-md-6">
                <label className="small mb-1" htmlFor="inputProffession">
                  Proffession
                </label>
                <input
                  className="form-control inputBirth"
                  id="inputProffession"
                  type="text"
                  placeholder="Enter your location"
                  name="prof"
                  value={dataUserSetting.prof}
                  onChange={handleInputChangeSettingProfil}
                />
              </div>
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

export default SettingInfoUser;
