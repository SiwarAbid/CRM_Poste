import React, { useState } from "react";
import "../../../../assets/css/EmployeeForm.css";
// import Modal from "@mui/joy/Modal";
// import ModalDialog from "@mui/joy/ModalDialog";
import { Data, GesDataSend } from "../../../../initialStates/UserInitialState";
import { message } from "antd";

const FormEdit: React.FC<{
  elements: { open: boolean; setOpen: Function};
  gestionnaire: Data;
}> = ({ gestionnaire, elements }) => {
  // const rootRef = React.useRef<HTMLDivElement>(null);
  // const [success, setSucces] = useState<boolean>(false);
  const [data, setData] = useState<GesDataSend>({
    matricule_gestionnaire: gestionnaire.ges.matricule_gestionnaire,
    id_user: gestionnaire.user.id_user,
    nom_prenom: gestionnaire.user.nom_prenom,
    email: gestionnaire.user.email,
    phone: gestionnaire.user.phone,
    post: gestionnaire.ges.post,
    bureau_postal: gestionnaire.ges.bureau_postal,
    acces: gestionnaire.ges.acces,
  });
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
  const onSubmit = (data: GesDataSend) => {
    console.log("Onsubmit");
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/modifiergestionnaire`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
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
  const handleClose = () => {
    elements.setOpen(!elements.open);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("handleSubmit", success);
    e.preventDefault();
    if (data === undefined) console.error("data is undefined !!!");
    else onSubmit(data);
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
  return (
    <>
      {/* <Modal
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
          <div id="editEmployeeModal" className="modal fade">
            <div className="modal-dialog">
              <div className="modal-content"> */}
      <form
        onSubmit={(e) => handleSubmit(e)}
        style={{ width: 200, height: 200, marginLeft: 300 }}
      >
        {contextHolder}

        {/* <div className="modal-header"> */}
        <h4 className="modal-title">Edit Employee</h4>
        {/* </div> */}
        {/* <div className="modal-body">
                    <div className="form-group"> */}
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
        {/* </div>
                    <div className="form-group"> */}
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
        {/* </div>
                    <div className="form-group"> */}
        <label>Email</label>
        <input
          type="email"
          name="email"
          // className="form-control"
          required
          onChange={handleInputChange}
          value={data.email}
        />
        {/* </div>
                    <div className="form-group"> */}
        <label>Phone</label>
        <input
          type="text"
          name="phone"
          // className="form-control"
          maxLength={8}
          minLength={8}
          required
          onChange={handleInputChange}
          value={data.phone}
        ></input>
        {/* </div>
                    <div className="form-group"> */}
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
        {/* </div>
                    <div className="form-group"> */}
        <label>Post Office</label>
        <input
          type="text"
          name="bureau_postal"
          // className="form-control"
          maxLength={4}
          minLength={4}
          required
          onChange={handleInputChange}
          value={data.bureau_postal}
        ></input>
        {/* </div>
                    <div className="form-group"> */}
        <label>Access limit</label>
        <select
          name="acces"
          // className="form-control"
          required
          value={
            data.acces.client
              ? "client"
              : data.acces.reclamation
              ? "reclamation"
              : "offre"
          }
          onChange={handleSelectChange}
        >
          <option value="">Select</option>
          <option value="client">Manage customers</option>
          <option value="reclamation">Manage tickets</option>
          <option value="offre">Manage offers</option>
        </select>
        {/* </div>
                  </div>
                  <div className="modal-footer"> */}
        <input
          type="button"
          className="btn btn-default"
          data-dismiss="modal"
          value="Cancel"
        />
        <input type="submit" className="btn btn-info" value="Save" />
        {/* </div> */}
      </form>
      {/* </div>
            </div>
          </div>
        </ModalDialog>
      </Modal> */}
    </>
  );
};

export default FormEdit;
