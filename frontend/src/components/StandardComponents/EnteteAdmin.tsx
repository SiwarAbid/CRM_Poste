import React from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import NavBar from "./NavBar";
import DrawerMenu from "./DrawerMenu";
function EnteteAdmin() {
  return (
    <>
      <Grid xs={12}>
        <NavBar />
      </Grid>
      <Grid xs={3}>
        <DrawerMenu />
      </Grid>
    </>
  );
}

export default EnteteAdmin;
