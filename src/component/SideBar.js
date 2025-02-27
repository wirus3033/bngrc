import React from "react";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListIcon from "@mui/icons-material/List";
import { Box } from "@mui/system";

const Sidebar = () => {
  return (
    <div
      style={{
        width: "200px",
        background: "white",
        height: "100vh",
        position: "fixed",
        transition: "width 0.3s",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        boxShadow: "4px 0px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px 0",
        }}
      >
        <img src="../Image1.png" alt="Logo" style={{ width: "100px", height: "auto" }} />
      </div>

      <List>
        {/* Lien vers la page Dashboard */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <ListItem button style={{ display: "flex", alignItems: "center" }}>
            <ListItemIcon style={{ color: "#808080" }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" style={{ color: "#808080" }} />
          </ListItem>
        </Link>

        {/* Lien vers la page Liste */}
        <Link to="/donees" style={{ textDecoration: "none" }}>
          <ListItem button style={{ display: "flex", alignItems: "center" }}>
            <ListItemIcon style={{ color: "#808080" }}>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary="Données" style={{ color: "#808080" }} />
          </ListItem>
        </Link>
      </List>

      
      <Box sx={{ flexGrow: 1 }} />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "100px 0",
        }}
      >
        <img src="../Image2.png" alt="Logo" style={{ width: "80px", height: "auto" }} />
      </div>
    </div>
  );
};

export default Sidebar;