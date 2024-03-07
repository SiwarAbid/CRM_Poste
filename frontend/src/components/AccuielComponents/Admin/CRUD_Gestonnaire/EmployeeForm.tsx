import React, { useState, useEffect } from "react";
import "../../../../assets/css/EmployeeForm.css";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DeleteBloc from "./FormDelete";
import FormBloc from "./FormAddEdit";

const Form: React.FC<{
  value: string;
  elements: { open: boolean; setOpen: Function };
}> = ({ value, elements }) => {
  const [title, setTitle] = useState<string>("Add Employee");
  const [show, setshow] = useState<boolean>(false);
  const [id, setId] = useState<string>("addEmployeeModal");
  const [className, setClassName] = useState<string>("btn btn-success");
  const [btn, setBtn] = useState<string>("Add");
  const rootRef = React.useRef<HTMLDivElement>(null);

 

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
        <div id={id} className="modal fade">
          <div className="modal-dialog">
            <div className="modal-content">
              <form>
                <div className="modal-header">
                  <h4 className="modal-title">{title}</h4>
                </div>
                {show ? <DeleteBloc /> : <FormBloc />}
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
  );
};

export default Form;
