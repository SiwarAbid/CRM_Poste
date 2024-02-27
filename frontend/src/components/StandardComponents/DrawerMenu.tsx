import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";

const drawerWidth = 240;
const whiteColor = "#E5E1E1";
const blueColor = "#0E1958";
const styles = {
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    marginTop: "64px",
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: blueColor,
    marginTop: "64px",
  },
};

const styleItems: React.CSSProperties = {
  fontFamily: "Alice",
  display: "inline-block",
  padding: "0.5em 1.7em",
  margin: "0 0.1em 0.1em 0",
  border: `0.16em solid ${whiteColor}`,
  borderRadius: "2em",
  boxSizing: "border-box",

  fontWeight: 300,
  color: "#ffffff",
  textShadow: "0 0.04em 0.04em rgba(255, 255, 255, 0.253)",
  textAlign: "center",
  transition: "all 0.2s",
};

const styleItemHover: React.CSSProperties = {
  color: "black",
  fontFamily: "Alice",
  backgroundColor: whiteColor,
};
const listItem = ["Accueil", "Paramètre", "Déconnexion", "Inscription"];
const DrawerMenu: React.FC = () => {
  const [etat, setEtat] = useState<Boolean>(true);
  const [clickedIndex, setClickedIndex] = useState<number>(0);

  const handleEtat = () => {
    setEtat(!etat);
  };

  const handleClick = (index: number) => {
    setClickedIndex(index);
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      style={styles.drawer}
      PaperProps={{ style: styles.drawerPaper }}
    >
      <List>
        {listItem.map((item, index) => (
          <ListItem button key={index} onClick={() => handleClick(index)}>
            <ListItemText
              primary={item}
              style={{
                fontFamily: "Alice",
                ...styleItems,
                ...(clickedIndex === index && styleItemHover),
              }}
              onClick={handleEtat}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default DrawerMenu;
