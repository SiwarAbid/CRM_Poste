import React, { useEffect, useState } from "react";
import Tableau from "../Tableau";
import { User } from "../../../initialStates/UserInitialState";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Modal, message } from "antd";
import { SendOutlined } from "@ant-design/icons";
const Clients = () => {
  const [userArray, setUserArray] = useState<User[]>([]);
  // const [selectedCheckboxes, setSelectedCheckboxes] = useState<number[]>([]);
  const [showEdit, setShowformEdit] = useState<boolean>(false);
  const [showAdd, setShowAdd] = useState<boolean>(false);
  // const handleCheckboxChange = (id: number) => {
  //   const updatedCheckboxes = selectedCheckboxes.includes(id)
  //     ? selectedCheckboxes.filter((checkboxId) => checkboxId !== id)
  //     : [...selectedCheckboxes, id];
  //   setSelectedCheckboxes(updatedCheckboxes);
  // };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/clients`);
        console.log("response", response);
        if (response.ok) {
          //   console.log("****************");
          const data = await response.json();
          console.log("data: ", data);
          setUserArray(data.result as User[]);
          //   console.log("UsersArray: ", userArray);
        } else {
          throw new Error("Erreur lors de la récupération des données");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const listeClients = () => {
    return userArray.map((user, index) => {
      return (
        <tr key={index}>
          <td>{user.nom}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>{user.adresse}</td>
          <td>
            <button className="edit" data-toggle="modal">
              <i
                className="material-icons"
                data-toggle="tooltip"
                title="Edit"
                onClick={() => {
                  setShowformEdit(true);
                  //   setData({
                  //     user: user,
                  //   });
                }}
              >
                <ModeEditIcon />
              </i>
              <i>
                <SendOutlined />
              </i>
            </button>
          </td>
        </tr>
      );
    });
  };
  return (
    <div>
      <Tableau
        nameTable={"Users"}
        listAtt={["Adresse", "Actions"]}
        liste={listeClients}
        // userArray={[]}
        showAdd={{ open: showAdd, setOpen: setShowAdd }}
        FormAdd={<AddClient open={true} setopen={setShowAdd} />}
      />
      <EditClient open={showEdit} setopen={setShowformEdit} />
      {/* <AddClient open={showAdd} */}
    </div>
  );
};

export default Clients;

/** Form Edit **/
interface propsEdit {
  open: boolean;
  setopen: React.Dispatch<React.SetStateAction<boolean>>;
}
export type DataSend = {
  username?: string;
  first_name?: string;
  last_name?: string;
  prof?: string;
  adresse?: string;
  user_email?: string;
  user_phone?: string;
  date_birth?: string;
  lieu_birth?: string;
  status_civil?: string;
  cat_prof?: string;
  num_pi?: string;
  date_pi?: string;
};
const EditClient: React.FC<propsEdit> = ({ open, setopen }) => {
  const [currentForm, setCurrentForm] = useState<"form1" | "form2">("form1");

  const [data, setData] = useState<DataSend>({});
  const handleNextClick = () => {
    setCurrentForm(currentForm === "form1" ? "form2" : "form1");
  };
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("HANDLESUBMIT !!");
    e.preventDefault();
    onSubmit(data);
  };
  const handleClose = () => {
    setopen(false);
  };
  const success = () => {
    messageApi.open({
      type: "success",
      content: "success",
    });
  };
  const error = () => {
    messageApi.open({
      type: "error",
      content: "error",
    });
  };
  const onSubmit = (data: DataSend) => {
    console.log("Onsubmit");
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/modifierclient`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          success();
          handleClose();
        } else {
          error();
          throw new Error("Erreur lors de la soumission du formulaire");
        }
      } catch (err) {
        error();
        console.error(err);
      }
    };

    fetchData();
  };
  console.log(data);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <Modal open={open} onCancel={handleClose} footer={<></>}>
      {contextHolder}
      <div className="Modal-header">
        <h4 className="Modal-title">Edit User</h4>
      </div>
      <div className="Modal-body">
        {currentForm === "form1" && (
          <form onSubmit={(e) => handleSubmit(e)}>
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
                value={data.username}
                onChange={handleInputChange}
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
                value={data.adresse}
                onChange={handleInputChange}
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
                value={data.user_email}
                onChange={handleInputChange}
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
                value={data.user_phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="labels" style={{ display: "flex" }}>
              <input
                type="radio"
                style={{ width: 15 }}
                name="typePI"
                value="CIN"
                onChange={handleInputChange}
              />
              <p style={{ padding: 20 }}>CIN</p>
              <div className="espacediv"></div>
              <input
                type="radio"
                style={{ width: 15 }}
                name="typePI"
                value="Carte Séjour"
                onChange={handleInputChange}
              />
              <p style={{ padding: 20 }}>Carte séjour</p>
            </div>
            <label className="small mb-1" htmlFor="inputNumPI">
              Num Carte
            </label>
            <input
              className="form-control inputFirstName"
              id="inputNumPI"
              type="text"
              placeholder="Enter your num identity doc"
              name="numPI"
              value={data.num_pi}
              onChange={handleInputChange}
            />
            <div className="col-md-6">
              <label className="small mb-1" htmlFor="inputDatePI">
                Release date
              </label>
              <input
                className="form-control inputFirstName"
                id="inputDatePI"
                type="date"
                placeholder="Enter your release identity document date"
                name="date_pi"
                value={data.date_pi}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-md-6">
              <button
                className="btn-next"
                onClick={handleNextClick}
                style={{
                  appearance: "none",
                  marginLeft: 350,
                  background: "transparent",
                  borderColor: "transparent",
                  cursor: "pointer",
                }}
              >
                others Info →
              </button>
            </div>
            <input type="submit" value={"Submit"} />
          </form>
        )}
        {currentForm === "form2" && (
          <form onSubmit={(e) => handleSubmit(e)}>
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
                  value={data.status_civil}
                  onChange={handleInputChange}
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
                  value={data.first_name}
                  onChange={handleInputChange}
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
                  value={data.last_name}
                  onChange={handleInputChange}
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
                  value={data.lieu_birth}
                  onChange={handleInputChange}
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
                  value={data.date_birth}
                  onChange={handleInputChange}
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
                  value={data.cat_prof}
                  onChange={handleInputChange}
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
                  value={data.prof}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <br />
            <div className="col-md-6">
              <button
                className="btn-next"
                onClick={handleNextClick}
                style={{
                  appearance: "none",
                  marginLeft: 0,
                  background: "transparent",
                  borderColor: "transparent",
                  cursor: "pointer",
                }}
              >
                ← Back
              </button>
            </div>
            <input type="submit" value={"Submit"} />
          </form>
        )}
      </div>
    </Modal>
  );
};

const AddClient: React.FC<propsEdit> = ({ open, setopen }) => {
  const [data, setData] = useState<DataSend>({});
  const [currentForm, setCurrentForm] = useState<"form1" | "form2">("form1");
  const handleNextClick = () => {
    setCurrentForm(currentForm === "form1" ? "form2" : "form1");
  };
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("HANDLESUBMIT !!");
    e.preventDefault();
    onSubmit(data);
  };
  const handleClose = () => {
    setopen(false);
  };
  const success = () => {
    messageApi.open({
      type: "success",
      content: "success",
    });
  };
  const error = () => {
    messageApi.open({
      type: "error",
      content: "error",
    });
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const onSubmit = (data: DataSend) => {
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
          success();
          handleClose();
        } else {
          error();
          throw new Error("Erreur lors de la soumission du formulaire");
        }
      } catch (err) {
        error();
        console.error(err);
      }
    };

    fetchData();
  };
  return (
    <Modal open={open} onCancel={handleClose} footer={<></>}>
      {contextHolder}
      <div className="Modal-header">
        <h4 className="Modal-title">Add User</h4>
      </div>
      <div className="Modal-body">
        {currentForm === "form1" && (
          <form onSubmit={(e) => handleSubmit(e)}>
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
                value={data.username}
                onChange={handleInputChange}
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
                value={data.adresse}
                onChange={handleInputChange}
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
                value={data.user_email}
                onChange={handleInputChange}
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
                value={data.user_phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="labels" style={{ display: "flex" }}>
              <input
                type="radio"
                style={{ width: 15 }}
                name="typePI"
                value="CIN"
                onChange={handleInputChange}
              />
              <p style={{ padding: 20 }}>CIN</p>
              <div className="espacediv"></div>
              <input
                type="radio"
                style={{ width: 15 }}
                name="typePI"
                value="Carte Séjour"
                onChange={handleInputChange}
              />
              <p style={{ padding: 20 }}>Carte séjour</p>
            </div>
            <label className="small mb-1" htmlFor="inputNumPI">
              Num Carte
            </label>
            <input
              className="form-control inputFirstName"
              id="inputNumPI"
              type="text"
              placeholder="Enter your num identity doc"
              name="numPI"
              value={data.num_pi}
              onChange={handleInputChange}
            />
            <div className="col-md-6">
              <label className="small mb-1" htmlFor="inputDatePI">
                Release date
              </label>
              <input
                className="form-control inputFirstName"
                id="inputDatePI"
                type="date"
                placeholder="Enter your release identity document date"
                name="date_pi"
                value={data.date_pi}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-md-6">
              <button
                className="btn-next"
                onClick={handleNextClick}
                style={{
                  appearance: "none",
                  marginLeft: 350,
                  background: "transparent",
                  borderColor: "transparent",
                  cursor: "pointer",
                }}
              >
                others Info →
              </button>
            </div>
            <input type="submit" value={"Submit"} />
          </form>
        )}
        {currentForm === "form2" && (
          <form onSubmit={(e) => handleSubmit(e)}>
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
                  value={data.status_civil}
                  onChange={handleInputChange}
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
                  value={data.first_name}
                  onChange={handleInputChange}
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
                  value={data.last_name}
                  onChange={handleInputChange}
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
                  value={data.lieu_birth}
                  onChange={handleInputChange}
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
                  value={data.date_birth}
                  onChange={handleInputChange}
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
                  value={data.cat_prof}
                  onChange={handleInputChange}
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
                  value={data.prof}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <br />
            <div className="col-md-6">
              <button
                className="btn-next"
                onClick={handleNextClick}
                style={{
                  appearance: "none",
                  marginLeft: 0,
                  background: "transparent",
                  borderColor: "transparent",
                  cursor: "pointer",
                }}
              >
                ← Back
              </button>
            </div>
            <input type="submit" value={"Submit"} />
          </form>
        )}
      </div>
    </Modal>
  );
};
