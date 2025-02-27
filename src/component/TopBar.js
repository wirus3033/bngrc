import React from "react";
import { AppBar, Toolbar, Box, Typography } from "@mui/material";
// import logo from "../assets/logoFinance.png";

const Topbar = () => {
  return (
    <AppBar
      position="sticky"
      style={{
        background: "#364b67",
        borderBottom: "1px solid white",
      }}
    >
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
        POINTS DE SITUATIONS
        </Typography>

        {/* Section Dropdown */}


        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
        24/02/2025
        </Typography>
        
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;