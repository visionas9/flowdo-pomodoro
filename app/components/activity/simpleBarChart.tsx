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
import { Context } from "@/app/context";

// #endregion
const SimpleBarChart = () => {
  const context = useContext(Context);
  if (!context) return null;

  const { session } = context;

  const today = new Date();

  const weeklyData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    return {
      name: date.toLocaleDateString("en-US", { weekday: "short" }),
      dayIndex: date.getDay(),
      minutes: 0,
    };
  });

  if (session && session.length > 0) {
    session.forEach((session: any) => {
      const date = new Date(session.date);
      const day = date.getDay();

      const entry = weeklyData.find((d) => d.dayIndex === day);

      if (entry) {
        entry.minutes += Math.round(session.timeDone / 60);
      }
    });
  }

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
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" tick={{ fill: "#a0a8a0" }} />
      <YAxis
        width="auto"
        tickFormatter={(value) => `${value}m`}
        domain={[0, 60]}
        tick={{ fill: "#a0a8a0" }}
      />
      <Tooltip />
      <Legend />
      <Bar
        dataKey="minutes"
        fill="#8884d8"
        activeBar={{ fill: "pink", stroke: "blue" }}
        radius={[10, 10, 0, 0]}
      />
    </BarChart>
  );
};

export default SimpleBarChart;
