// Graph data derived from analyzeData.ts
import type { CMData } from "@/data/analyzeData";

interface Props { cm?: CMData; bestModelName?: string }

const ConfusionMatrix = ({ cm, bestModelName }: Props) => {
  const model = bestModelName || "Hybrid Voting";
  const data = cm || { TP: 0, FP: 0, FN: 0, TN: 0 };

  const cells = [
    { label: "True Positive", value: data.TP, row: 0, col: 0 },
    { label: "False Positive", value: data.FP, row: 0, col: 1 },
    { label: "False Negative", value: data.FN, row: 1, col: 0 },
    { label: "True Negative", value: data.TN, row: 1, col: 1 },
  ];

  return (
    <div className="graph-container">
      <h3 className="text-lg font-semibold text-foreground mb-1">Confusion Matrix</h3>
      <p className="text-sm text-muted-foreground mb-4">{model} — Best performing model</p>
      <div className="flex justify-center">
        <div>
          <div className="flex mb-2">
            <div className="w-20" />
            <div className="w-24 text-center text-xs font-medium text-muted-foreground">Predicted Normal</div>
            <div className="w-24 text-center text-xs font-medium text-muted-foreground">Predicted Attack</div>
          </div>
          {[0, 1].map((row) => (
            <div key={row} className="flex items-center">
              <div className="w-20 text-xs font-medium text-muted-foreground text-right pr-2">
                {row === 0 ? "Actual Normal" : "Actual Attack"}
              </div>
              {[0, 1].map((col) => {
                const cell = cells.find((c) => c.row === row && c.col === col)!;
                const isDiagonal = row === col;
                return (
                  <div
                    key={col}
                    className={`w-24 h-20 flex flex-col items-center justify-center rounded-lg m-1 transition-all ${isDiagonal
                      ? "bg-success/20 border border-success/30"
                      : cell.value === 0
                        ? "bg-muted border border-border"
                        : "bg-danger/20 border border-danger/30"
                      }`}
                  >
                    <span className={`text-2xl font-bold ${isDiagonal ? "text-success" : cell.value === 0 ? "text-muted-foreground" : "text-danger"}`}>
                      {cell.value.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-muted-foreground mt-1">{cell.label}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConfusionMatrix;
