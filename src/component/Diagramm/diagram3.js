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

const ww = [
  { name: "BP PITCHERANA 46 C", value: 148 },
  { name: "TM KOTOPORO", value: 79 },
  { name: "BP FONOHANA", value: 543 },
  { name: "KANDANA ANTER", value: 283 },
  { name: "GRAINS SALLE G", value: 21 },
  { name: "TM HONGOKA", value: 74 },
  { name: "TM ELO MAL", value: 180 },
  { name: "FP SOAMIANA", value: 100 },
  { name: "TM HONGOKA", value: 402 },
  { name: "BP SOAMIANA", value: 244 },
  { name: "DIG AL SUD B", value: 1160 },
  { name: "BP ANJOMA", value: 572 },
  { name: "EP ANJOMA", value: 100 },
];

export default function Diagram3() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={ww} margin={{ top: 5, right: 25, left: 25, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          angle={-45}
          textAnchor="end"
          interval={0}
          stroke="#000"
          tick={{ fontSize: 10 }}
        />
        <YAxis stroke="#000" />
        <Tooltip />
        {/* <Legend /> */}
        <Bar dataKey="value" fill="#6495ED" />
      </BarChart>
    </ResponsiveContainer>
  );
}
