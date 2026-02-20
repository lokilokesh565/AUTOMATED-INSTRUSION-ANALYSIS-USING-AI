import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { shapFeatureImportance as defaultData } from "@/data/modelResults";
import type { ShapEntry } from "@/data/analyzeData";

interface Props { importance?: ShapEntry[] }

const SHAPFeatureImportance = ({ importance }: Props) => {
  const data = importance ?? defaultData;
  return (
    <div className="graph-container">
      <h3 className="text-lg font-semibold text-foreground mb-1">SHAP Feature Importance</h3>
      <p className="text-sm text-muted-foreground mb-4">Mean |SHAP value| for top features</p>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 80, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 90%)" />
          <XAxis type="number" tick={{ fontSize: 11 }} />
          <YAxis type="category" dataKey="feature" tick={{ fontSize: 10 }} width={120} />
          <Tooltip
            contentStyle={{ background: "hsl(0, 0%, 100%)", border: "1px solid hsl(210, 20%, 90%)", borderRadius: "8px" }}
            formatter={(value: number) => [value.toFixed(3), "Importance"]}
          />
          <Bar dataKey="importance" fill="hsl(165, 60%, 40%)" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SHAPFeatureImportance;
