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

const bardata = [
    { date: "24/02/2025", Analamanga: 17483, AmoronIMania: 2164, Vatovavy: 91 },
    { date: "23/02/2025", Analamanga: 16078, AmoronIMania: 2164, Vatovavy: 91 },
    { date: "22/02/2025", Analamanga: 16059, AmoronIMania: 2164, Vatovavy: 91 },
    { date: "21/02/2025", Analamanga: 15627, AmoronIMania: 2164, Vatovavy: 91 },
  ];

export default function Diagram2() {
  return (
    <ResponsiveContainer width="100%" height={350}>
    <BarChart
      data={bardata}
      layout="vertical"
      margin={{ left: 40 }}
    >
      <XAxis type="number" />
      <YAxis dataKey="date" type="category" />
      <Tooltip />
      <Legend />
      <Bar dataKey="Analamanga" fill="#D8BFD8" />
      <Bar dataKey="AmoronIMania" fill="#4169E1" />
      <Bar dataKey="Vatovavy" fill="#228B22" />
    </BarChart>
  </ResponsiveContainer>
  );
}
