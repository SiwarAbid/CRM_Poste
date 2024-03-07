import React, { useEffect, useState } from "react";
// import "../../../../assets/css/TableauEmployee.css";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Form from "./EmployeeForm";
// import Modal from "@mui/joy/Modal";
// import ModalDialog from "@mui/joy/ModalDialog";
/**il faut avoir matricule agent
 * check box of all
 * CRUD
 * FORM
 */
interface UserData {
  id_user: number;
  nom_prenom: string;
  username: string;
  password: string;
  contact: Contact;
  status: string;
  adresse: Adresse;
}
type Contact = {
  email: string;
  telephone: number;
};
type Adresse = {
  pays: string;
  ville: string;
  code_postal: number;
};
// const DeleteBloc: React.FC = () => {
//   return (
//     <>
//       <p>Are you sure you want to delete these Records?</p>
//       <p className="text-warning">
//         <small>This action cannot be undone.</small>
//       </p>
//     </>
//   );
// };
// const FormBloc = () => {
//   return (
//     <div className="modal-body">
//       <div className="form-group">
//         <label>Name</label>
//         <input type="text" className="form-control" required />
//       </div>
//       <div className="form-group">
//         <label>Email</label>
//         <input type="email" className="form-control" required />
//       </div>
//       <div className="form-group">
//         <label>Address</label>
//         <textarea className="form-control" required></textarea>
//       </div>
//       <div className="form-group">
//         <label>Phone</label>
//         <input type="text" className="form-control" required />
//       </div>
//     </div>
//   );
// };
// const Form: React.FC<{
//   value: string;
//   elements: { open: boolean; setOpen: Function };
// }> = ({ value, elements }) => {
//   const [title, setTitle] = useState<string>("Add Employee");
//   const [show, setshow] = useState<boolean>(false);
//   const [id, setId] = useState<string>("addEmployeeModal");
//   const [className, setClassName] = useState<string>("btn btn-success");
//   const [btn, setBtn] = useState<string>("Add");
//   const rootRef = React.useRef<HTMLDivElement>(null);

//   const handleClose = () => {
//     elements.setOpen(!elements.open);
//   };
//   useEffect(() => {
//     if (value === "DELETE") {
//       setTitle("Delete Employee");
//       setshow(true);
//       setId("deleteEmployeeModal");
//       setClassName("btn btn-danger");
//       setBtn("Delete");
//     } else if (value === "EDIT") {
//       setTitle("Edit Employee");
//       setId("editEmployeeModal");
//       setClassName("btn btn-info");
//       setBtn("Save");
//     } else setTitle("Add Employee");
//   }, [value]);
//   return (
//     <Modal
//       open={elements.open}
//       onClose={handleClose}
//       disablePortal
//       disableEnforceFocus
//       disableAutoFocus
//       container={() => rootRef.current!}
//     >
//       <ModalDialog
//         aria-labelledby="server-modal-title"
//         aria-describedby="server-modal-description"
//         layout="center"
//       >
//         <div id={id} className="modal fade">
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <form>
//                 <div className="modal-header">
//                   <h4 className="modal-title">{title}</h4>
//                 </div>
//                 {show ? <DeleteBloc /> : <FormBloc />}
//                 <div className="modal-footer">
//                   <input
//                     type="button"
//                     className="btn btn-default"
//                     data-dismiss="modal"
//                     value="Cancel"
//                   />
//                   <input type="submit" className={className} value={btn} />
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </ModalDialog>
//     </Modal>
//   );
// };

export default function TableauEmployes() {
  const [dataArray, setData] = useState<UserData[]>([]);
  const [showDel, setShowformDelete] = useState<boolean>(false);
  const [showAdd, setShowformAdd] = useState<boolean>(false);
  const [showEdit, setShowformEdit] = useState<boolean>(false);

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
          const dataArray = Array.from(data.result);

          setData(dataArray as UserData[]);
        } else {
          throw new Error("Erreur lors de la récupération des données");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  console.log("data: ", dataArray);

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
                      <input type="checkbox" id="selectAll" />
                      <label htmlFor="selectAll"></label>
                    </span>
                  </th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dataArray.map((value, index) => (
                  <tr>
                    <td>
                      <span className="custom-checkbox">
                        <input
                          type="checkbox"
                          id="checkbox5"
                          name="options[]"
                          value="1"
                        />
                        <label htmlFor="checkbox5"></label>
                      </span>
                    </td>
                    <td>{value.nom_prenom}</td>
                    <td>{value.contact.email}</td>
                    <td>
                      {value.adresse.code_postal} {value.adresse.ville}
                      {","}
                      {value.adresse.pays}
                      {"."}
                    </td>
                    <td>{value.contact.telephone}</td>
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
                            setShowformDelete(true);
                          }}
                        >
                          <DeleteIcon />
                        </i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {showDel ? (
              <Form
                value="DELETE"
                elements={{ open: true, setOpen: setShowformDelete }}
              />
            ) : showAdd ? (
              <Form
                value="ADD"
                elements={{ open: true, setOpen: setShowformAdd }}
              />
            ) : showEdit ? (
              <Form
                value="EDIT"
                elements={{ open: true, setOpen: setShowformEdit }}
              />
            ) : (
              ""
            )}

            {/* <div className="clearfix">
              <div className="hint-text">
                Showing <b>5</b> out of <b>25</b> entries
              </div>
              <ul className="pagination">
                <li className="page-item disabled">
                  <a href="#ici">Previous</a>
                </li>
                <li className="page-item">
                  <a href="#ici" className="page-link">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a href="#ici" className="page-link">
                    2
                  </a>
                </li>
                <li className="page-item active">
                  <a href="#ici" className="page-link">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a href="#ici" className="page-link">
                    4
                  </a>
                </li>
                <li className="page-item">
                  <a href="#ici" className="page-link">
                    5
                  </a>
                </li>
                <li className="page-item">
                  <a href="#ici" className="page-link">
                    Next
                  </a>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
