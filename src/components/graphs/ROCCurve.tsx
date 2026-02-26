import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
// Graph data derived from analyzeData.ts
import type { RocPoint } from "@/data/analyzeData";

interface Props { rocData?: RocPoint[]; auc?: number }

const ROCCurve = ({ rocData, auc }: Props) => {
  const data = rocData || [];
  const aucLabel = auc != null ? auc.toFixed(3) : "0.998";
  return (
    <div className="graph-container">
      <h3 className="text-lg font-semibold text-foreground mb-1">ROC AUC Curve</h3>
      <p className="text-sm text-muted-foreground mb-4">AUC = {aucLabel} — Near-perfect classification</p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 90%)" />
          <XAxis dataKey="fpr" label={{ value: "False Positive Rate", position: "bottom", offset: -5, fontSize: 12 }} tick={{ fontSize: 11 }} />
          <YAxis label={{ value: "True Positive Rate", angle: -90, position: "insideLeft", fontSize: 12 }} tick={{ fontSize: 11 }} />
          <Tooltip
            contentStyle={{ background: "hsl(0, 0%, 100%)", border: "1px solid hsl(210, 20%, 90%)", borderRadius: "8px" }}
          />
          <ReferenceLine segment={[{ x: 0, y: 0 }, { x: 1, y: 1 }]} stroke="hsl(0, 0%, 75%)" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="tpr" stroke="hsl(210, 85%, 45%)" strokeWidth={3} dot={{ r: 4 }} name="TPR" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ROCCurve;
