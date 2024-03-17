import React, { useState } from "react";
import "../../../../assets/css/EmployeeForm.css";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
/** handleClose always true !! */
const DeleteBloc: React.FC<{
  ids: number[];
  elements: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };
}> = ({ ids, elements }) => {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [success, setSucces] = useState<boolean>(false);

  const handleClose = () => {
    console.log("HandleClose !! ", elements.open);
    elements.setOpen(false);
    console.log("HandleClosed **  ", elements.open);
  };
  const onSubmit = (ids: number[]) => {
    console.log("Onsubmit");
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/supprimerGestionnaires`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(ids),
          }
        );
        console.log("response: ", response);
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

    onSubmit(ids);
  };
  return (
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
        <div id="deleteEmployeeModal" className="modal fade">
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="modal-header">
                  <h4 className="modal-title">Delete Employee</h4>
                </div>
                <p>Are you sure you want to delete these Records?</p>
                <p className="text-warning">
                  <small>This action cannot be undone.</small>
                </p>
                <div className="modal-footer">
                  <input
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                    value="Cancel"
                  />
                  <input
                    type="submit"
                    className="btn btn-danger"
                    value="Delete"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </ModalDialog>
    </Modal>
  );
};
/** CSS Alert Delete */

export default DeleteBloc;
