import React from "react";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"; // Importez l'icône que vous souhaitez utiliser

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

export default SearchBar;
