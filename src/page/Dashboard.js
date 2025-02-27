import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
// import { MailOutline, Outbox, Business, People } from "@mui/icons-material";
import { People, DirectionsRun, Home, Waves } from "@mui/icons-material";
import Diagram1 from "../component/Diagramm/diagram1";
import Diagram2 from "../component/Diagramm/diagram2";
import Diagram3 from "../component/Diagramm/diagram3";
import Diagram4 from "../component/Diagramm/diagram4";
import Diagram5 from "../component/Diagramm/diagram5";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const stats = {
  personnesDecedees: 22,
  deplacesActuelles: 7294,
  deplacesCumulees: 13763,
  casesInondees: 3671,
  casesDetruites: 15,
};

const cardData = [
  {
    label: "PERSONNES DÉCÉDÉES",
    value: stats.personnesDecedees,
    icon: <People />,
  },
  {
    label: "DÉPLACÉES ACTUELLES",
    value: stats.deplacesActuelles,
    icon: <DirectionsRun />,
  },
  {
    label: "DÉPLACÉES CUMULÉES",
    value: stats.deplacesCumulees,
    icon: <DirectionsRun />,
  },
  { label: "CASES INONDÉES", value: stats.casesInondees, icon: <Waves /> },
  { label: "CASES DÉTRUITES", value: stats.casesDetruites, icon: <Home /> },
];
const donner = [
  {
    label: "PERSONNES DÉCÉDÉES",
    value: stats.personnesDecedees,
    icon: <People />,
  },
  {
    label: "DÉPLACÉES ACTUELLES",
    value: stats.deplacesActuelles,
    icon: <DirectionsRun />,
  },
];

const styles = {
  dashboard: {
    padding: "20px",
    backgroundColor: "#9392c9",
    minHeight: "100vh",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#b3b2d1",
    padding: "10px",
    borderRadius: "5px",
    bottom: "10px",
  },
  title: {
    marginBottom: "30px",
    color: "#1976d2",
    fontWeight: "bold",
  },
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#444",
    color: "#fff",
    padding: "10px 20px",
    minWidth: "180px",
    borderRadius: "5px",
  },
  icon: {
    fontSize: "50px",
    marginRight: "10px",
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    gap: "10px",
  },
  label: {
    fontSize: "12px",
    fontWeight: "bold",
  },
  value: {
    fontSize: "18px",
    fontWeight: "bold",
  },
};

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    courrierEntrant: 0,
    courrierSortant: 0,
    directions: 0,
    utilisateurs: 0,
  });

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div style={styles.dashboard}>
      {/* Graphiques */}
      <Grid container spacing={2} style={{ marginBottom: 10 }}>
        <Grid item xs={12} md={6}>
          <CardContent style={{ backgroundColor: "white", height: 300 }}>
            <div style={{ height: 300 }}>
              <Diagram1 />
            </div>
          </CardContent>

          <CardContent
            style={{
              backgroundColor: "#444",
              height: 100,
              color: "#bfe9ff",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 16px",
            }}
          >
            {/* Texte */}
            <div
              style={{
                paddingRight: 16,

                paddingRight: "16px",
                marginRight: "16px",
              }}
            >
              <Typography
                style={{
                  ...styles.value,
                  borderBottom: "1px solid #bfe9ff",
                  paddingBottom: "2px",
                  display: "inline-block",
                }}
              >
                PERSONNES SINISTREES
              </Typography>

              <Typography style={styles.label}>
                04 REGIONS TOUCHEES SUR 23
              </Typography>
            </div>

            {/* Ligne de séparation */}
            <div
              style={{
                borderLeft: "2px solid #bfe9ff",
                height: "60%",
                margin: "0 16px",
              }}
            ></div>

            {/* Icône agrandie */}
            <People style={{ fontSize: 50 }} />

            {/* Ligne de séparation */}
            <div
              style={{
                borderLeft: "2px solid #bfe9ff",
                height: "60%",
                margin: "0 16px",
              }}
            ></div>

            {/* Chiffre */}
            <Typography style={styles.value}>19 764</Typography>
          </CardContent>
        </Grid>
        <Grid item xs={12} md={6}>
          <CardContent style={{ backgroundColor: "#fff", height: 400 }}>
            <h3
              style={{
                fontSize: 24,
              }}
            >
              SITE D’HEBERGEMENT (Personnes)
            </h3>
            <div style={{ height: 400 }}>
              <Diagram3 />
            </div>
          </CardContent>
        </Grid>
        <Grid item xs={12} md={6}>
          <CardContent style={{ backgroundColor: "#fff", height: 400 }}>
            <div style={{ height: 400 }}>
              <Diagram2 />
            </div>
          </CardContent>
        </Grid>

        {/* Application de flexDirection et justifyContent */}
        <Grid item xs={12} md={6}>
          <CardContent style={{ backgroundColor: "#fff", height: 400 }}>
            <h3
              style={{
                fontSize: 24,
                textAlign: "center",
              }}
            >
              SUIVI SITUATION DU 23/02/25
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: "20px",
                height: 400,
              }}
            >
              <div
                style={{ flex: 1, display: "flex", justifyContent: "center" }}
              >
                <Diagram4 />
              </div>
              <div
                style={{ flex: 1, display: "flex", justifyContent: "center" }}
              >
                <Diagram5 />
              </div>
            </div>
          </CardContent>
        </Grid>
      </Grid>

      {/* Cartes avec icônes */}
      <div style={styles.cardContainer}>
        {cardData.map((card, index) => (
          <Card key={index} style={styles.card}>
            {card.icon && React.cloneElement(card.icon, { style: styles.icon })}
            <CardContent style={styles.textContainer}>
              <Typography style={styles.label}>{card.label}</Typography>
              <Typography style={styles.value}>{card.value}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
