import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { trainingTimes as defaultData } from "@/data/modelResults";
import type { TrainingTime } from "@/data/analyzeData";

const COLORS = [
  "hsl(210, 85%, 45%)",
  "hsl(195, 60%, 45%)",
  "hsl(165, 60%, 40%)",
  "hsl(38, 92%, 50%)",
  "hsl(145, 65%, 42%)",
];

interface Props { trainingTimes?: TrainingTime[] }

const TrainingTimeComparison = ({ trainingTimes }: Props) => {
  const data = trainingTimes ?? defaultData;
  return (
    <div className="graph-container">
      <h3 className="text-lg font-semibold text-foreground mb-1">Training Time Comparison</h3>
      <p className="text-sm text-muted-foreground mb-4">Time in seconds for each model training</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 90%)" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{ background: "hsl(0, 0%, 100%)", border: "1px solid hsl(210, 20%, 90%)", borderRadius: "8px" }}
            formatter={(value: number) => [`${value}s`, "Training Time"]}
          />
          <Bar dataKey="time" radius={[6, 6, 0, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrainingTimeComparison;
