import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { attackDistribution as defaultData } from "@/data/modelResults";
import type { AttackEntry } from "@/data/analyzeData";

interface Props { distribution?: AttackEntry[] }

const AttackDistribution = ({ distribution }: Props) => {
  const data = distribution ?? defaultData;
  return (
    <div className="graph-container">
      <h3 className="text-lg font-semibold text-foreground mb-1">Attack vs Normal Detection</h3>
      <p className="text-sm text-muted-foreground mb-4">Traffic classification distribution</p>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={110}
            paddingAngle={3}
            dataKey="count"
            nameKey="name"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={{ strokeWidth: 1 }}
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ background: "hsl(0, 0%, 100%)", border: "1px solid hsl(210, 20%, 90%)", borderRadius: "8px" }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttackDistribution;
