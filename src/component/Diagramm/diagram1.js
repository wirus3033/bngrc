import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Diagram1() {
  const [chartData, setChartData] = useState([]);
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("Toutes");

  useEffect(() => {
    fetch("https://api-bngrc.onrender.com/api/regions")
      .then(response => response.json())
      .then(data => setRegions([{ id: 0, nom: "Toutes" }, ...data]))
      .catch(error => console.error("Erreur lors de la récupération des régions:", error));
  }, []);

  useEffect(() => {
    fetch("https://api-bngrc.onrender.com/api/data/")
      .then(response => response.json())
      .then(data => {
        let filteredData = data
          .filter(entry => entry.categories_id === 3); // Filtrer pour "PERSONNES SINISTREES"
        
        if (selectedRegion !== "Toutes") {
          filteredData = filteredData.filter(entry => entry.region_id === regions.find(r => r.nom === selectedRegion)?.id);
        }

        filteredData = filteredData
          .map(entry => ({
            date: entry.date,
            value: entry.nombre,
          }))
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .map(entry => ({
            date: new Date(entry.date).toLocaleDateString("fr-FR"),
            value: entry.value,
          }));

        setChartData(filteredData);
      })
      .catch(error => console.error("Erreur lors de la récupération des données:", error));
  }, [selectedRegion]);

  return (
    <div>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="date" stroke="#000" dy={10} />
          <YAxis stroke="#000" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#6495ED"
            strokeWidth={3}
            dot={{ stroke: "#6495ED", strokeWidth: 2, r: 4 }}
          >
            <LabelList dataKey="value" position="top" fill="#000" fontSize={14} />
          </Line>
        </LineChart>
      </ResponsiveContainer>
      <div className="d-flex justify-content-start mt-0 ms-3">
        <Dropdown>
          <Dropdown.Toggle variant="primary">{selectedRegion}</Dropdown.Toggle>
          <Dropdown.Menu>
            {regions.map(region => (
              <Dropdown.Item key={region.id} onClick={() => setSelectedRegion(region.nom)}>
                {region.nom}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}