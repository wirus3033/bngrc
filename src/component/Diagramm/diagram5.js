import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LabelList,
} from "recharts";

const data = [
  { date: "24/02/2025", Analamanga: 17483, AmoronIMania: 2164, Vatovavy: 91 },
  { date: "23/02/2025", Analamanga: 16078, AmoronIMania: 2164, Vatovavy: 91 },
  { date: "22/02/2025", Analamanga: 16059, AmoronIMania: 2164, Vatovavy: 91 },
  { date: "21/02/2025", Analamanga: 15627, AmoronIMania: 2164, Vatovavy: 91 },
];

const xx = [
  { name: "Réparation Infra", value: 8, color: "#3366CC" },
  { name: "Réponse Humanitaire", value: 37, color: "#FF6600" },
  { name: "Représentation et visibilité", value: 10, color: "#FFCC00" },
  { name: "Secours et sauvetage", value: 16, color: "#AAAAAA" },
  { name: "Situation de site", value: 5, color: "#6699FF" },
  { name: "Point de situation", value: 24, color: "#66CC66" },
];

export default function Diagram5() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: -50 }}>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={xx}
            cx="50%"
            cy="50%"
            outerRadius={50}
            fill="#8884d8"
            dataKey="value"
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            labelStyle={{ fontSize: "8px", fontWeight: "bold" }}
          >
            {xx.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div style={{ marginTop: -30 }}>
      <ul style={{ textAlign: "center", fontSize: "10px", listStyleType: "none", padding: 0, justifyContent: "center" }}>
          {xx.map((entry, index) => (
            <li key={index} style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
              <span style={{ width: 10, height: 10, backgroundColor: entry.color, display: "inline-block", marginRight: 5 }}></span>
              {entry.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
