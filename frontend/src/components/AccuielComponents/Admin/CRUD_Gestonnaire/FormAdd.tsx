import React, { useState } from "react";
import {
  Gestionnaire,
  initialStateGestionnaire,
} from "../../../../initialStates/UserInitialState";
import { message } from "antd";

// import Modal from "@mui/joy/Modal";
// import ModalDialog from "@mui/joy/ModalDialog";
import "../../../../assets/css/EmployeeForm.css";

/** Je pense en tant que admit il n'a pas necessaire de faire des modification sur l'adresse et mail mais je peut faire modification sur
 * matricule password poste bloqué/débloqué etc..
 */

const FormBloc: React.FC<{
  elements: { open: boolean; setOpen: Function };
}> = ({ elements }) => {
  const [data, setData] = useState(initialStateGestionnaire);
  // const rootRef = React.useRef<HTMLDivElement>(null);
  // const [success, setSucces] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();

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
  console.log("data: ", data);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setData({
      ...data,
      acces: {
        ...data.acces,
        client: value === "client",
        reclamation: value === "reclamation",
        offre: value === "offre",
      },
    });
  };
  // console.log("data: ", data);
  const onSubmit = (data: Gestionnaire) => {
    console.log("Onsubmit");
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/ajoutergestionnaire`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        console.log(response);
        if (response.ok) {
          const result = await response.json();
          console.log("result: ", result);
          success();
          handleClose();
          // setSucces(true);
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
  const handleClose = () => {
    elements.setOpen(!elements.open);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // console.log("handleSubmit", success);
    e.preventDefault();
    onSubmit(data);
  };
  return (
    // <Modal
    //   open={true}
    //   // open={elements.open}
    //   // onClose={handleClose}
    //   // disablePortal
    //   // disableEnforceFocus
    //   // disableAutoFocus
    //   // container={() => rootRef.current!}
    // >
    //  <ModalDialog
    // // aria-labelledby="server-modal-title"
    // // aria-describedby="server-modal-description"
    // // layout="center"
    // >
    //   <div id="addEmployeeModal" className="modal-kk fade-ges">
    //      // <div className="modal-dialog">
    //    // <div className="modal-content">
    <form onSubmit={(e) => handleSubmit(e)}>
      {contextHolder}

      <div className="modal-header">
        <h4 className="modal-title">Add Employee</h4>
      </div>
      <div className="modal-body">
        <div className="form-group">
          <label>Matricule</label>
          <input
            type="text"
            name="matricule_gestionnaire"
            // className="form-control"
            required
            maxLength={11}
            onChange={handleInputChange}
            value={data.matricule_gestionnaire}
          />
        </div>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="nom_prenom"
            // className="form-control"
            required
            maxLength={30}
            onChange={handleInputChange}
            value={data.nom_prenom}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            // className="form-control"
            required
            onChange={handleInputChange}
            // value={data.email}
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="number"
            name="phone"
            // className="form-control"
            maxLength={8}
            minLength={8}
            required
            onChange={handleInputChange}
            // value={Number(data.phone)}
          ></input>
        </div>
        <div className="form-group">
          <label>Post</label>
          <select
            name="post"
            // className="form-control"
            required
            onChange={handleInputChange}
            value={data.post}
          >
            <option value="">Select</option>
            <option value="chef_bureau">Office manager</option>
            <option value="agent">Agent</option>
            <option value="responsable_marketing">Marketing manager</option>
            <option value="responsable_relation_client">
              Customer relations manager
            </option>
          </select>
        </div>
        <div className="form-group">
          <label>Post Office</label>
          <input
            type="number"
            name="bureau_postal"
            // className="form-control"
            maxLength={4}
            minLength={4}
            required
            onChange={handleInputChange}
            value={Number(data.bureau_postal)}
          ></input>
        </div>
        <div className="form-group">
          <label>Access limit</label>
          <select
            name="acces"
            // className="form-control"
            required
            onChange={handleSelectChange}
          >
            <option value="">Select</option>
            <option value="client">Manage customers</option>
            <option value="reclamation">Manage tickets</option>
            <option value="offre">Manage offers</option>
          </select>
        </div>
      </div>
      <div className="modal-footer">
        <input
          type="button"
          // className="btn btn-default"
          data-dismiss="modal"
          value="Cancel"
        />
        <input type="submit" className="btn btn-success" value="Add" />
      </div>
    </form>
    //   </div>
    //  </div>
    //  </div>
    //   </ModalDialog>
    // </Modal>
  );
};
/** CSS Form Add ** Form Edit*/

export default FormBloc;
