import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Accueil from "../components/AccuielComponents/Accueil";

import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  IconButton,
  Badge,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import logo from "../assets/imgs/LogoPTT.jpg";
import SearchIcon from "@mui/icons-material/Search";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Gestionnaire from "../components/AccuielComponents/Admin/CRUD_Gestonnaire/Gestionnaire";

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
const listItem = [
  "Accueil",
  "Gestionnaires",
  "Paramètre",
  "Déconnexion",
  "Inscription",
];
const links = [
  "",
  "",
  "accueil/parametre",
  "/",
  "#",
];

const DrawerMenu: React.FC<{ onSelect: (selectedItem: string) => void }> = ({
  onSelect,
}) => {
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  const handleItemClick = (item: string, index: number) => {
    onSelect(item);
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
          <ListItemButton component="a" key={index}>
            <ListItem key={index} onClick={() => handleItemClick(item, index)}>
              <ListItemText
                primary={item}
                style={{
                  fontFamily: "Alice",
                  ...styleItems,
                  ...(clickedIndex === index && styleItemHover),
                }}
              />
            </ListItem>
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

// pas de fonctionnalité
function AccountIcon() {
  return (
    <IconButton color="inherit">
      <Avatar>
        <AccountCircleIcon />
      </Avatar>
    </IconButton>
  );
}

// pas de fonctionnalité
function NotificationIcon() {
  return (
    <IconButton color="inherit">
      <Badge badgeContent={4} color="error">
        <NotificationsIcon />
      </Badge>
    </IconButton>
  );
}
// pas de fonctionnalité
function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}
// pas de fonctionnalité
function SearchBar() {
  return (
    <TextField
      id="search"
      label="Recherche"
      variant="standard"
      size="small"
      style={{ marginRight: "10px", fontFamily: "Alice", color: "#ffff" }}
      InputLabelProps={{
        style: { color: "#ffff", fontFamily: "Alice" },
      }}
      InputProps={{
        style: { color: "#ffff", fontFamily: "Alice" },
        startAdornment: <SearchIcon style={{ color: "#ffff" }} />,
      }}
    />
  );
}

function Logo() {
  return (
    <img
      src={logo}
      alt="Logo La Poste Tunisienne"
      style={{ width: "60px", marginRight: "10px" }}
    />
  );
}

const NavBar = () => {
  return (
    <AppBar position="fixed" style={{ backgroundColor: "#0E1958" }}>
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

const MainContent: React.FC<{ selectedItem: string }> = ({ selectedItem }) => {
  console.log("selectItem: ", selectedItem)
  return (
    <div>
      {selectedItem === "Inscription" ? (
        <></>
      ) : selectedItem === "Gestionnaires" ? (
        <Gestionnaire />
      ) : (
        <Accueil />
      )}
    </div>
  );
};
const App: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>("Accueil");
  const handleSelectItem = (item: string) => {
    setSelectedItem(item);
  };
  return (
    <Grid container spacing={0}>
      <Grid xs={12}>
        <NavBar />
      </Grid>
      <Grid xs={3}>
        <DrawerMenu onSelect={handleSelectItem} />
      </Grid>
      <Grid>
        <MainContent selectedItem={selectedItem} />
      </Grid>
    </Grid>
  );
};

export default App;
