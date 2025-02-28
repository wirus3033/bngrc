import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Diagram1({ onSelectRegions }) {
  const [chartData, setChartData] = useState([]);
  const [regions, setRegions] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [selectedRegionsState, setSelectedRegionsState] = useState([]);

  // Charger les régions depuis l'API
  useEffect(() => {
    fetch("http://localhost:4000/api/regions")
      .then(response => response.json())
      .then(data => setRegions(Array.isArray(data) ? data : []))
      .catch(error => console.error("Erreur lors de la récupération des régions:", error));
  }, []);

  // Charger les données depuis l'API
  useEffect(() => {
    fetch("http://localhost:4000/api/data/")
      .then(response => response.json())
      .then(data => setRawData(data))
      .catch(error => console.error("Erreur lors de la récupération des données:", error));
  }, []);

  // Restaurer les régions sélectionnées depuis le localStorage
  useEffect(() => {
    const savedRegions = localStorage.getItem("selectedRegions");
    if (savedRegions) {
      const parsedRegions = JSON.parse(savedRegions);
      setSelectedRegionsState(parsedRegions);
      if (onSelectRegions) onSelectRegions(parsedRegions);
    }
  }, []);

  // Filtrer les données en fonction des régions sélectionnées
  useEffect(() => {
    if (!rawData.length) return;

    let filteredData = rawData.filter(entry => entry.categories_id === 3);
    if (selectedRegionsState.length > 0) {
      filteredData = filteredData.filter(entry => {
        const regionName = regions.find(r => r.id === entry.region_id)?.nom;
        return regionName && selectedRegionsState.includes(regionName);
      });
    }

    const formattedData = filteredData
      .map(entry => ({
        date: new Date(entry.date).toLocaleDateString("fr-FR"),
        value: entry.nombre,
        region: regions.find(r => r.id === entry.region_id)?.nom || "Inconnue",
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    setChartData(formattedData);
  }, [selectedRegionsState, rawData, regions]);

  // Gérer la sélection/désélection des régions
  const handleSelectRegion = (region) => {
    setSelectedRegionsState(prev => {
      const newSelection = prev.includes(region)
        ? prev.filter(r => r !== region)
        : [...prev, region];
      localStorage.setItem("selectedRegions", JSON.stringify(newSelection));
      if (onSelectRegions) onSelectRegions(newSelection);
      return newSelection;
    });
  };

  // Désélectionner toutes les régions
  const handleDeselectAll = () => {
    setSelectedRegionsState([]);
    localStorage.removeItem("selectedRegions");
    if (onSelectRegions) onSelectRegions([]);
  };

  return (
    <div
      style={{
        backgroundColor: "#5D6B94",
        padding: "15px",
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      {/* Dropdown pour sélectionner les régions */}
      <div className="d-flex justify-content-center mt-0">
        <Dropdown>
          <Dropdown.Toggle variant="primary">
            {selectedRegionsState.length > 0
              ? `${selectedRegionsState.length} régions sélectionnées`
              : "Touts les Régions"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleDeselectAll}>
              ❌ Désélectionner tout
            </Dropdown.Item>
            {regions.map(region => (
              <Dropdown.Item
                key={region.id}
                onClick={() => handleSelectRegion(region.nom)}
              >
                {selectedRegionsState.includes(region.nom) ? "✔ " : ""}
                {region.nom}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* Graphique */}
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="0" vertical={false} stroke="#BFE9FF" />
          <XAxis dataKey="date" stroke="#FFFFFF" tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#5D6B94",
              border: "1px solid #BFE9FF",
              color: "#FFFFFF",
              fontSize: "12px",
            }}
            labelFormatter={(label, payload) =>
              payload.length > 0
                ? `${payload[0].payload.region} : ${label}`
                : "Inconnue"
            }
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#BFE9FF"
            strokeWidth={3}
            dot={{ fill: "#BFE9FF", strokeWidth: 2 }}
          >
            <LabelList dataKey="value" position="top" fill="#BFE9FF" fontSize={12} />
          </Line>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
