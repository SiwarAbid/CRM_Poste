import React from "react";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
function Token() {
  const rootRef = React.useRef<HTMLDivElement>(null);

  return (
    <Modal
      disablePortal
      disableEnforceFocus
      disableAutoFocus
      open={true}
      container={() => rootRef.current!}
    >
      <ModalDialog
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
        layout="center"
      >
        <Typography id="server-modal-title" level="h2">
          Error:
        </Typography>
        <Typography id="server-modal-description" textColor="text.tertiary">
          You're unauthorized
        </Typography>
      </ModalDialog>
    </Modal>
  );
}

export default Token;
