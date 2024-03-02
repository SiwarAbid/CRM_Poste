import React from "react";
import Cookies from "js-cookie";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
const Dashboard = () => {
  const token = Cookies.get("token");
  const rootRef = React.useRef<HTMLDivElement>(null);

  return (
    <div>
      {token === undefined || null? (
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
      ) : (
        <iframe
          title="PalasteniesDataAnalysis"
          width="1240"
          height="1541.25"
          src="https://app.powerbi.com/reportEmbed?reportId=54a8f35c-e73a-4a48-bc34-4895dfddedaf&autoAuth=true&ctid=8ba21021-cbf0-4b53-94c5-98cd97b6e887"
          // frameborder={0}
          allowFullScreen={true}
          style={{ marginLeft: "240px" }}
        />
      )}
    </div>
  );
};

export default Dashboard;
