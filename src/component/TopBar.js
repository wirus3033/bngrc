import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Topbar = () => {
  // Récupérer la date du jour
  const today = new Date().toLocaleDateString("fr-FR");

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

        {/* Section date mise à jour automatiquement */}
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          {today}
        </Typography>
        {/* Fin de la section date */}
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
