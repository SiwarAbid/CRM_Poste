import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import NotificationIcon from "./NotificationIcon";
import AccountIcon from "./AccountIcon";

const NavBar = () => {
  return (
    <AppBar position="fixed" style={{ backgroundColor: "#0C1859" }}>
      <Toolbar>
        <Logo />
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          style={{
            color: "#F9C429",
            fontFamily: "Rubik Glitch Pop",
          }}
        >
          La Poste Tunisienne
        </Typography>
        <Typography sx={{ flexGrow: 5 }}>
          <SearchBar />
        </Typography>
        <ThemeToggle />
        <NotificationIcon />
        <AccountIcon />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
