import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { modelMetrics as defaultData } from "@/data/modelResults";
import type { ModelMetric } from "@/data/analyzeData";

const COLORS = [
  "hsl(210, 85%, 45%)",
  "hsl(195, 60%, 45%)",
  "hsl(165, 60%, 40%)",
  "hsl(38, 92%, 50%)",
  "hsl(145, 65%, 42%)",
];

interface Props { modelMetrics?: ModelMetric[] }

const AccuracyComparison = ({ modelMetrics }: Props) => {
  const data = modelMetrics ?? defaultData;
  const min = Math.max(0, Math.min(...data.map((d) => d.accuracy)) - 1);
  return (
    <div className="graph-container">
      <h3 className="text-lg font-semibold text-foreground mb-1">Model Accuracy Comparison</h3>
      <p className="text-sm text-muted-foreground mb-4">Accuracy (%) across all trained models</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 90%)" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis domain={[min, 100.2]} tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{ background: "hsl(0, 0%, 100%)", border: "1px solid hsl(210, 20%, 90%)", borderRadius: "8px" }}
            formatter={(value: number) => [`${value.toFixed(2)}%`, "Accuracy"]}
          />
          <Bar dataKey="accuracy" radius={[6, 6, 0, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AccuracyComparison;
