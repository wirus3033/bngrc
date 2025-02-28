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
import BarDiagram1 from "../component/Diagramm/bardiagram1";

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
  const [selectedRegions, setSelectedRegions] = useState([]); // Stocke les régions sélectionnées
  const [personnesSinistrees, setPersonnesSinistrees] = useState(0); // Nombre total de sinistrés
  const [totalRegions, setTotalRegions] = useState(23); // Nombre total de régions
  const [nombreTotalRegions, setNombreTotalRegions] = useState(0); // Nombre total de régions dans la BD
  const [regionsAvecDonnees, setRegionsAvecDonnees] = useState(0); // Nb de régions qui ont des données (touchées)
  

  useEffect(() => {
    fetch("http://localhost:4000/api/regions") // API des régions
    .then(response => response.json())
    .then(data => {
      setNombreTotalRegions(data.length); // Stocke le nombre total de régions existantes
    })
    .catch(error => console.error("Erreur lors de la récupération des régions:", error));

  fetch("http://localhost:4000/api/sinistres") // API des données sinistrés
    .then(response => response.json())
    .then(data => {
      const uniqueRegions = [...new Set(data.map(item => item.region_nom))]; // Récupère les régions touchées
      setRegionsAvecDonnees(uniqueRegions.length); // Stocke le nombre de régions avec des données
    })
    .catch(error => console.error("Erreur lors de la récupération des sinistrés:", error));
    fetch("http://localhost:4000/api/regions") // API des régions
    .then(response => response.json())
    .then(data => {
      setNombreTotalRegions(data.length); // Mettre à jour le nombre total de régions
    })
    .catch(error => console.error("Erreur lors de la récupération des régions:", error));
    
    fetch("http://localhost:4000/api/data") // API contenant les données des sinistrés
      .then(response => response.json())
      .then(data => {
        // 1️⃣ Filtrer uniquement les personnes sinistrées (categories_id === 3)
        const sinistresData = data.filter(item => item.categories_id === 3);
  
        // 2️⃣ Obtenir la liste des régions uniques ayant des données
        const uniqueRegions = [...new Set(sinistresData.map(item => item.region_id))];
        setTotalRegions(uniqueRegions.length); // Mettre à jour le nombre total de régions touchées
  
        if (selectedRegions.length === 0) {
          // 3️⃣ Aucune région sélectionnée → Prendre le total des sinistrés
          const totalSinistres = sinistresData.reduce((acc, curr) => acc + curr.nombre, 0);
          setPersonnesSinistrees(totalSinistres);
        } else {
          // 4️⃣ Convertir les noms des régions sélectionnées en `region_id`
          fetch("http://localhost:4000/api/regions")
            .then(response => response.json())
            .then(regionData => {
              const selectedRegionIds = regionData
                .filter(region => selectedRegions.includes(region.nom))
                .map(region => region.id);
  
              // 5️⃣ Filtrer les données selon les `region_id` sélectionnés
              const filteredData = sinistresData.filter(item => selectedRegionIds.includes(item.region_id));
              const totalSinistres = filteredData.reduce((acc, curr) => acc + curr.nombre, 0);
              setPersonnesSinistrees(totalSinistres);
            })
            .catch(error => console.error("Erreur lors de la récupération des régions:", error));
        }
      })
      .catch(error => console.error("Erreur lors de la récupération des sinistrés:", error));
  }, [selectedRegions]); // Exécuter lorsque `selectedRegions` change     

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
            <Diagram1 onSelectRegions={setSelectedRegions} />
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
            <BarDiagram1 
  selectedRegions={selectedRegions} 
  personnesSinistrees={personnesSinistrees} 
  totalRegions={totalRegions} 
  nombreTotalRegions={nombreTotalRegions} 
  regionsAvecDonnees={regionsAvecDonnees}
/>
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
