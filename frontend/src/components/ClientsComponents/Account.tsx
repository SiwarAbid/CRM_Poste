import * as React from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import { useState } from "react";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "../../assets/css/AccountProfil.css";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));
interface propsModalProfil {
  isOpen: boolean;
  handleClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
  user_name: string | undefined;
  user_email: string | undefined;
  user_phone: number | undefined;
  user_adresse: string | undefined;
}
const ModalProfil: React.FC<propsModalProfil> = ({
  isOpen,
  handleClose,
  user_name,
  user_adresse,
  user_email,
  user_phone,
}) => {
  const id = isOpen ? "simple-popover" : undefined;
  return (
    <Popover
      id={id}
      open={isOpen}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      style={{
        marginTop: 35,
        marginLeft: -50,
      }}
    >
      <div className="outer-div">
        <div className="inner-div">
          <div className="front">
            <div className="front__bkg-photo">
              <a href="/setting">
                <SettingOutlined
                  style={{
                    marginLeft: 270,
                    zIndex: 2,
                    position: "absolute",
                    marginTop: 45,
                    color: "#f9c42a",
                  }}
                />
              </a>
            </div>
            <div className="front__face-photo"></div>
            <div className="front__text">
              <h3 className="front__text-header">{user_name}</h3>
              <p className="front__text-para">
                <EnvironmentOutlined />
                <p style={{ marginLeft: 10 }}>{user_adresse}</p>
              </p>
              <p className="front__text-para">
                <PhoneOutlined />{" "}
                <p style={{ marginLeft: 10 }}>+216 {user_phone}</p>
              </p>
              <p className="front__text-para">
                <MailOutlined /> <p style={{ marginLeft: 10 }}>{user_email}</p>
              </p>
              <a href="/" style={{ marginLeft: 100, paddingTop: 15 }}>
                <span className="front__text-hover">Disconnected</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Popover>
  );
};
export default function BadgeAvatars(props: {
  user_name: string | undefined;
  image: string | undefined;
  user_email: string | undefined;
  user_phone: number | undefined;
  user_adresse: string | undefined;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <Button onClick={handleClick}>
        <Stack direction="row" spacing={2} style={{ marginLeft: 1050 }}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
            style={{ marginBottom: 20 }}
          >
            <Avatar
              alt={props?.user_name}
              src={props?.image}
              style={{ marginTop: 10 }}
            />
          </StyledBadge>
        </Stack>
      </Button>
      <ModalProfil
        isOpen={isOpen}
        handleClose={handleClick}
        user_name={props?.user_name}
        user_adresse={props?.user_adresse}
        user_email={props?.user_email}
        user_phone={props?.user_phone}
      />
    </div>
  );
}
