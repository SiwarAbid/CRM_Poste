import React, { useState } from "react";
import "../../assets/css/TableauEmployee.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
// import FormAdd from "./Admin/CRUD_Gestonnaire/FormAdd";
import FormDelete from "./FormDelete";
import { User } from "../../initialStates/UserInitialState";
// import propsEdit from "./Gestionnaire/Clients";
/** CSS Forms Ainsi le refrechir de page on peut ajouter le filtrage */

interface propsTableau {
  nameTable: string;
  listAtt: Array<string>;
  liste: () => JSX.Element[];
  // userArray: User[];
  showAdd: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };
  FormAdd: JSX.Element;
}
type propsEdit = {
  open: boolean;
  setopen: React.Dispatch<React.SetStateAction<boolean>>;
};
const Tableau: React.FC<propsTableau> = ({
  nameTable,
  listAtt,
  liste,
  FormAdd,
}) => {
  const [showDel, setShowformDelete] = useState<boolean>(false);
  const [showAdd, setShowformAdd] = useState<boolean>(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<number[]>([]);

  return (
    <>
      <div
        className="container-gestion-compte ges"
        style={{ marginTop: "0px", marginLeft: "300px" }}
      >
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row ges">
                <div className="col-xs-6">
                  <h2>
                    Manage <b>{nameTable}</b>
                  </h2>
                </div>
                <div className="col-xs-6">
                  <button
                    className="btn btn-success"
                    data-toggle="modal"
                    onClick={() => setShowformAdd(true)}
                    style={{ marginTop: -35 }}
                  >
                    <i className="material-icons">
                      <AddIcon />
                    </i>
                    <span>Add New {nameTable}</span>
                  </button>
                  {/* <button
                    className="btn btn-danger"
                    data-toggle="modal"
                    onClick={() => setShowformDelete(true)}
                    style={{ marginLeft: 450, marginTop: 10 }}
                  >
                    <i className="material-icons">
                      <RemoveCircleIcon />
                    </i>
                    <span>Reset password</span>
                  </button> */}
                </div>
              </div>
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  {/* <th>
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
                  </th> */}
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  {listAtt.map((att, index) => {
                    return <th key={index}>{att}</th>;
                  })}
                </tr>
              </thead>
              <tbody>{liste()}</tbody>
            </table>
            {showDel ? (
              <FormDelete
                ids={selectedCheckboxes}
                elements={{ open: true, setOpen: setShowformDelete }}
              />
            ) : showAdd ? (
              FormAdd
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Tableau;
