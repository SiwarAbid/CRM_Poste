import React from "react";
import Grid from "@mui/material/Grid";
import Module from "./AccuielComponents/modules";
import Accueil from "./AccuielComponents/Accueil";
import ResponsiveAppBar from "./StandardComponents/AppNav";
import MiniDrawer from "./StandardComponents/Drawer";

const App: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <ResponsiveAppBar />
      </Grid>
      <Grid xs={4}><MiniDrawer/></Grid>
      <Grid xs={8}>
        <Accueil />
        <Module />
      </Grid>
    </Grid>
  );
};

export default App;
