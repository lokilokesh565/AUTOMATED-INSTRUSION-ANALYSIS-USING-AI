import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
// Graph data derived from analyzeData.ts
import type { ShapEntry } from "@/data/analyzeData";

interface Props { shapData?: ShapEntry[] }

const SHAPSummary = ({ shapData }: Props) => {
  const data = shapData || [];
  return (
    <div className="graph-container">
      <h3 className="text-lg font-semibold text-foreground mb-1">SHAP Summary Plot</h3>
      <p className="text-sm text-muted-foreground mb-4">Feature impact on model output</p>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 80, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 90%)" />
          <XAxis type="number" tick={{ fontSize: 11 }} />
          <YAxis type="category" dataKey="feature" tick={{ fontSize: 10 }} width={100} />
          <Tooltip contentStyle={{ background: "hsl(0, 0%, 100%)", border: "1px solid hsl(210, 20%, 90%)", borderRadius: "8px" }} />
          <ReferenceLine x={0} stroke="hsl(210, 20%, 70%)" />
          <Bar dataKey="positive" fill="hsl(0, 72%, 55%)" name="Pushes to Attack" radius={[0, 4, 4, 0]} />
          <Bar dataKey="negative" fill="hsl(210, 85%, 45%)" name="Pushes to Normal" radius={[4, 0, 0, 4]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SHAPSummary;
