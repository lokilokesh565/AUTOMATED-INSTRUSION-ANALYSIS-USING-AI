import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { limeExplanation as defaultData } from "@/data/modelResults";
import type { LimeEntry } from "@/data/analyzeData";

interface Props { limeData?: LimeEntry[] }

const LIMEExplanation = ({ limeData }: Props) => {
  const data = limeData ?? defaultData;
  return (
    <div className="graph-container">
      <h3 className="text-lg font-semibold text-foreground mb-1">LIME Local Explanation</h3>
      <p className="text-sm text-muted-foreground mb-4">Feature contributions for a single prediction</p>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 120, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 90%)" />
          <XAxis type="number" tick={{ fontSize: 11 }} />
          <YAxis type="category" dataKey="feature" tick={{ fontSize: 10 }} width={140} />
          <Tooltip
            contentStyle={{ background: "hsl(0, 0%, 100%)", border: "1px solid hsl(210, 20%, 90%)", borderRadius: "8px" }}
            formatter={(value: number) => [value.toFixed(3), "Weight"]}
          />
          <Bar dataKey="weight" radius={[0, 4, 4, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.direction === "attack" ? "hsl(0, 72%, 55%)" : "hsl(210, 85%, 45%)"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex gap-4 justify-center mt-3 text-xs">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-danger inline-block" /> Attack indicator
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-primary inline-block" /> Normal indicator
        </span>
      </div>
    </div>
  );
};

export default LIMEExplanation;
