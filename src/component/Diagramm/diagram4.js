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

const cc = [
  {
    category: "Réparation Infra",
    "En retard": 0,
    "En cours": 2,
    Fait: 0,
    "À communiquer": 1,
  },
  {
    category: "Réponse Humanitaire",
    "En retard": 1,
    "En cours": 1,
    Fait: 7,
    "À communiquer": 2,
  },
  {
    category: "Représentation et visibilité",
    "En retard": 0,
    "En cours": 2,
    Fait: 2,
    "À communiquer": 0,
  },
  {
    category: "Secours et sauvetage",
    "En retard": 0,
    "En cours": 1,
    Fait: 1,
    "À communiquer": 0,
  },
  {
    category: "Situation de site",
    "En retard": 0,
    "En cours": 0,
    Fait: 0,
    "À communiquer": 2,
  },
];

const colors = {
    "En retard": "#FF6600",
    "En cours": "#AAAAAA",
    Fait: "#66CC66",
    "À communiquer": "#3366CC",
  };

export default function Diagram3() {
  return (
    <ResponsiveContainer width="70%" height={250}>
      <BarChart data={cc} margin={{ top: 10, right: 10, left: 10, bottom: 2 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" stroke="#fff" />
        <YAxis stroke="#fff" />
        <Tooltip />
        <Legend />
        {Object.keys(colors).map((key) => (
          <Bar key={key} dataKey={key} stackId="a" fill={colors[key]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
