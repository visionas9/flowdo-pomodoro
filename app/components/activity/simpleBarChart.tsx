"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useContext } from "react";
import { Context, localDate } from "@/app/context";

// #endregion
const SimpleBarChart = () => {
  const context = useContext(Context);
  if (!context) return null;

  const { session } = context;

  const today = new Date();

  // The last seven days, oldest on the left. Matched by the full date, not the
  // weekday — otherwise last Monday's minutes land on this Monday's bar.
  const weeklyData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - i));
    const key = localDate(date);
    const seconds = session
      .filter((s) => s.date === key)
      .reduce((sum, s) => sum + s.timeDone, 0);

    return {
      name: date.toLocaleDateString("en-US", { weekday: "short" }),
      minutes: Math.round(seconds / 60),
    };
  });

  return (
    <BarChart
      style={{
        width: "100%",
        maxWidth: "700px",
        maxHeight: "70vh",
        aspectRatio: 1.618,
      }}
      responsive
      data={weeklyData}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" stroke="rgba(160,168,160,0.2)" />
      <XAxis dataKey="name" tick={{ fill: "#a0a8a0" }} />
      <YAxis
        width="auto"
        tickFormatter={(value) => `${value}m`}
        domain={[0, (max: number) => Math.max(60, max)]}
        tick={{ fill: "#a0a8a0" }}
      />
      <Tooltip
        contentStyle={{ background: "#2b2b2b", border: "none", borderRadius: 8 }}
        cursor={{ fill: "rgba(255,255,255,0.05)" }}
        formatter={(value) => [`${value} min`, "Focus"]}
      />
      <Legend />
      <Bar
        dataKey="minutes"
        fill="#8884d8"
        radius={[10, 10, 0, 0]}
      />
    </BarChart>
  );
};

export default SimpleBarChart;
