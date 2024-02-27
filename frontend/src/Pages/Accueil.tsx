import React from "react";
import NavBar from "../components/StandardComponents/NavBar";
import DrawerMenu from "../components/StandardComponents/DrawerMenu";
// import Accueil from "../components/AccuielComponents/Accueil";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Dashboard from "../components/AccuielComponents/Dashbord";
// import Module from "./AccuielComponents/modules";
const App: React.FC = () => {
  return (
    <Grid container spacing={0}>
      <Grid xs={12}>
        <NavBar />
      </Grid>
      <Grid xs={3}>
        <DrawerMenu />
      </Grid>
      <Grid>
        {/* <Module /> */}
        {/* <Accueil /> */}
        <Dashboard />
      </Grid>
    </Grid>
  );
};

export default App;
