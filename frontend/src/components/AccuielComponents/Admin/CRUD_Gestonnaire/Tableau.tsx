import React, { useEffect, useState } from "react";
import "../../../../assets/css/TableauEmployee.css";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import FormAdd from "./FormAdd";
import FormDelete from "./FormDelete";
import FormEdit from "./FormEdit";
import {
  Gestionnaire,
  Data,
  User,
} from "../../../../initialStates/UserInitialState";
/** CSS Forms Ainsi le refrechir de page on peut ajouter le filtrage */

export default function TableauEmployes() {
  const [gestionnaireArray, setGestionnaireArray] = useState<Gestionnaire[]>(
    []
  );
  const [userArray, setUserArray] = useState<User[]>([]);
  const [showDel, setShowformDelete] = useState<boolean>(false);
  const [showOneDel, setShowformOneDelete] = useState<boolean>(false);
  const [showAdd, setShowformAdd] = useState<boolean>(false);
  const [showEdit, setShowformEdit] = useState<boolean>(false);
  const [data, setData] = useState<Data>({
    user: {
      id_user: 0,
      nom_prenom: "",
      user_name: "",
      contact: {
        email: "",
        telephone: "",
      },
      adresse: {
        rue: "",
        pays: "",
        ville: "",
        code_postal: "",
      },
      password: "",
      status: 0,
    },
    ges: {
      matricule_gestionnaire: "",
      id_user: 0,
      nom_prenom: "",
      post: "",
      bureau_postal: 0,
      acces: {
        client: false,
        reclamation: false,
        offre: false,
      },
      info_sup: {},
    },
  });
  const [id, setId] = useState<number[]>([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<number[]>([]);
  // console.log("selectedCheckboxes: ", selectedCheckboxes);
  const styles: React.CSSProperties = {
    marginTop: "10px",
    marginLeft: "250px",
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/gestionnaires`);
        if (response.ok) {
          const data = await response.json();
          let dataArray = Array.from(data.user);
          // console.log("data: ", data);
          setUserArray(dataArray as User[]);
          dataArray = Array.from(data.gestionnaire);
          setGestionnaireArray(dataArray as Gestionnaire[]);
        } else {
          throw new Error("Erreur lors de la récupération des données");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  // console.log("data: ", dataArray);
  const handleCheckboxChange = (id: number) => {
    const updatedCheckboxes = selectedCheckboxes.includes(id)
      ? selectedCheckboxes.filter((checkboxId) => checkboxId !== id)
      : [...selectedCheckboxes, id];
    setSelectedCheckboxes(updatedCheckboxes);
  };

  return (
    <>
      <div className="container" style={styles}>
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-xs-6">
                  <h2>
                    Manage <b>Employees</b>
                  </h2>
                </div>
                <div className="col-xs-6">
                  <a
                    href="#addEmployeeModal"
                    className="btn btn-success"
                    data-toggle="modal"
                    onClick={() => setShowformAdd(true)}
                  >
                    <i className="material-icons">
                      <AddIcon />
                    </i>
                    <span>Add New Employee</span>
                  </a>
                  <a
                    href="#deleteEmployeeModal"
                    className="btn btn-danger"
                    data-toggle="modal"
                    onClick={() => setShowformDelete(true)}
                  >
                    <i className="material-icons">
                      <RemoveCircleIcon />
                    </i>
                    <span>Delete</span>
                  </a>
                </div>
              </div>
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>
                    <span className="custom-checkbox">
                      <input
                        type="checkbox"
                        id="selectAll"
                        onChange={() => {
                          const allCheckboxIds = userArray.map(
                            (user) => user.id_user
                          );
                          setSelectedCheckboxes(
                            selectedCheckboxes.length === allCheckboxIds.length
                              ? []
                              : allCheckboxIds
                          );
                        }}
                      />
                      <label htmlFor="selectAll"></label>
                    </span>
                  </th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Post</th>
                  <th>Post Office</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {userArray.map((user, index) => {
                  const gestionnairesAssocies = gestionnaireArray.filter(
                    (ges) => ges.id_user === user.id_user
                  );
                  return (
                    <tr key={index}>
                      <td>
                        <span className="custom-checkbox">
                          <input
                            type="checkbox"
                            id={`checkbox${index}`}
                            name="options[]"
                            value={user.id_user}
                            checked={selectedCheckboxes.includes(user.id_user)}
                            onChange={() => handleCheckboxChange(user.id_user)}
                          />
                          <label htmlFor={`checkbox${index}`}></label>
                        </span>
                      </td>
                      <td>{user.nom_prenom}</td>
                      <td>{user.contact.email}</td>
                      <td>{user.contact.telephone}</td>
                      {gestionnaireArray
                        .filter((ges) => ges.id_user === user.id_user)
                        .map((ges, i) => (
                          <React.Fragment key={i}>
                            <td>{ges.post}</td>
                            <td>{ges.bureau_postal}</td>
                          </React.Fragment>
                        ))}

                      <td>
                        <a
                          href="#editEmployeeModal"
                          className="edit"
                          data-toggle="modal"
                        >
                          <i
                            className="material-icons"
                            data-toggle="tooltip"
                            title="Edit"
                            onClick={() => {
                              setShowformEdit(true);
                              setData({
                                user: user,
                                ges: gestionnairesAssocies[0],
                              });
                            }}
                          >
                            <ModeEditIcon />
                          </i>
                        </a>
                        <a
                          href="#deleteEmployeeModal"
                          className="delete"
                          data-toggle="modal"
                        >
                          <i
                            className="material-icons"
                            data-toggle="tooltip"
                            title="Delete"
                            onClick={() => {
                              setShowformOneDelete(true);
                              setId([user.id_user]);
                            }}
                          >
                            <DeleteIcon />
                          </i>
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {showDel ? (
              <FormDelete
                ids={selectedCheckboxes}
                elements={{ open: true, setOpen: setShowformDelete }}
              />
            ) : showAdd ? (
              <FormAdd elements={{ open: true, setOpen: setShowformAdd }} />
            ) : showEdit ? (
              <FormEdit
                gestionnaire={data}
                elements={{ open: true, setOpen: setShowformEdit }}
              />
            ) : showOneDel ? (
              <FormDelete
                ids={id}
                elements={{ open: true, setOpen: setShowformDelete }}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}
