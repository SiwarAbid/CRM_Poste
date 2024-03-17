import React, { useState, useEffect } from "react";
import "../../../../assets/css/EmployeeForm.css";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DeleteBloc from "./FormDelete";
import FormBloc from "./FormAdd";
import {
  Gestionnaire,
  initialStateGestionnaire,
} from "../../../../initialStates/UserInitialState";
// import Success from "./Sucess";
/** EDIT FORM DELETE FORM **/
type Data_submit = {
  url: string;
  method: string;
};
const Form: React.FC<{
  value: string;
  identifiant: number;
  elements: { open: boolean; setOpen: Function };
}> = ({ identifiant, value, elements }) => {
  const [title, setTitle] = useState<string>("Add Employee");
  const [show, setshow] = useState<boolean>(false);
  const [id, setId] = useState<string>("addEmployeeModal");
  const [className, setClassName] = useState<string>("btn btn-success");
  const [btn, setBtn] = useState<string>("Add");
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [data, setData] = useState(initialStateGestionnaire);
  const [success, setSucces] = useState<boolean>(false);
  let data_submit: Data_submit = {
    url: "ajoutergestionnaire",
    method: "POST",
  };
  console.log("data: ", data);

  const handleClose = () => {
    elements.setOpen(!elements.open);
  };
  useEffect(() => {
    if (value === "DELETE") {
      setTitle("Delete Employee");
      setshow(true);
      setId("deleteEmployeeModal");
      setClassName("btn btn-danger");
      setBtn("Delete");
    } else if (value === "EDIT") {
      setTitle("Edit Employee");
      setId("editEmployeeModal");
      setClassName("btn btn-info");
      setBtn("Save");
    } else setTitle("Add Employee");
  }, [value]);
  const onSubmit = (data: Gestionnaire, data_submit: Data_submit) => {
    console.log("Onsubmit");
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/${data_submit.url}`,
          {
            method: data_submit.method,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        if (response.ok) {
          handleClose();
          setSucces(true);
        } else {
          throw new Error("Erreur lors de la soumission du formulaire");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("handleSubmit", success);
    e.preventDefault();
    if (value === "DELETE")
      data_submit = {
        url: "supprimergestionnaire",
        method: "DELETE",
      };
    else if (value === "EDIT")
      data_submit = {
        url: "modifiergestionnaire",
        method: "PUT",
      };
    onSubmit(data, data_submit);
  };
  return (
    <>
      {/* {success ? <Success /> : ""} */}
      <Modal
        open={elements.open}
        onClose={handleClose}
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        container={() => rootRef.current!}
      >
        <ModalDialog
          aria-labelledby="server-modal-title"
          aria-describedby="server-modal-description"
          layout="center"
        >
          <div id={id} className="modal fade">
            <div className="modal-dialog">
              <div className="modal-content">
                <form onSubmit={(e) => handleSubmit(e)}>
                  <div className="modal-header">
                    <h4 className="modal-title">{title}</h4>
                  </div>
                  {/* {show ? (
                    <DeleteBloc  id={identifiant} elements={elements}/>
                  ) : (
                    <FormBloc  elements={elements} />
                  )} */}
                  <div className="modal-footer">
                    <input
                      type="button"
                      className="btn btn-default"
                      data-dismiss="modal"
                      value="Cancel"
                    />
                    <input type="submit" className={className} value={btn} />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default Form;
