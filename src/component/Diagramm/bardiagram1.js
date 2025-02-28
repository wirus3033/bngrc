import React from "react";
import { Typography } from "@mui/material";

export default function BarDiagram1({ 
  selectedRegions = [], 
  personnesSinistrees = 0, 
  totalRegions = 23, 
  nombreTotalRegions = 0 
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#4A5672", // Couleur de fond conforme à l’image
        padding: "10px 20px",
        borderRadius: "5px",
        width: "100%",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Bloc de gauche avec le titre et le sous-titre */}
      <div style={{ flex: 2, textAlign: "center" }}>
        <Typography
          style={{
            fontWeight: "bold",
            fontSize: "20px",
            color: "#BFE9FF",
            textTransform: "uppercase",
          }}
        >
          PERSONNES SINISTRÉES
        </Typography>

        {/* Ligne de séparation */}
        <div
          style={{
            width: "100%",
            height: "2px",
            backgroundColor: "#BFE9FF",
            margin: "4px 0",
          }}
        ></div>

        <Typography
          style={{
            color: "#BFE9FF",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          {selectedRegions.length > 0
            ? `${selectedRegions.length} RÉGIONS SÉLECTIONNÉES SUR ${nombreTotalRegions}`
            : `${totalRegions} RÉGIONS TOUCHÉES SUR ${nombreTotalRegions}`}
        </Typography>
      </div>

      {/* Séparateur vertical */}
      <div
        style={{
          borderLeft: "2px solid #BFE9FF",
          height: "50px",
          margin: "0 20px",
        }}
      ></div>

      {/* Icône personnalisée */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <img 
          src="/Image11.png" // Met le fichier Image11.png dans le dossier public
          alt="Icône sinistrés"
          style={{ width: "60px", height: "auto" }}
        />
      </div>

      {/* Séparateur vertical */}
      <div
        style={{
          borderLeft: "2px solid #BFE9FF",
          height: "50px",
          margin: "0 20px",
        }}
      ></div>

      {/* Bloc de droite : Nombre de sinistrés */}
      <div style={{ flex: 1, textAlign: "center" }}>
        <Typography
          style={{
            fontWeight: "bold",
            fontSize: "32px",
            color: "#FFFFFF",
          }}
        >
          {personnesSinistrees.toLocaleString()}
        </Typography>
      </div>
    </div>
  );
}
