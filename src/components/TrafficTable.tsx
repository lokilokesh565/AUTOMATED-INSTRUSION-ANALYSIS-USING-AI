// Graph data derived from analyzeData.ts
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { TrafficRow } from "@/data/analyzeData";

interface Props { rows?: TrafficRow[] }

const TrafficTable = ({ rows }: Props) => {
  const data = rows || [];
  const normalCount = data.filter((t) => t.prediction === "Normal").length;
  const attackCount = data.filter((t) => t.prediction === "Attack").length;

  return (
    <div className="graph-container">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Network Traffic Predictions</h3>
          <p className="text-sm text-muted-foreground">{data.length} packets analyzed</p>
        </div>
        <div className="flex gap-2">
          <Badge className="status-normal">{normalCount} Normal</Badge>
          <Badge className="status-attack">{attackCount} Attack</Badge>
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-xs">#</TableHead>
              <TableHead className="text-xs">Source IP</TableHead>
              <TableHead className="text-xs">Destination IP</TableHead>
              <TableHead className="text-xs">Port</TableHead>
              <TableHead className="text-xs">Protocol</TableHead>
              <TableHead className="text-xs">Prediction</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-mono-code text-xs text-muted-foreground">{row.id}</TableCell>
                <TableCell className="font-mono-code text-xs">{row.srcIP}</TableCell>
                <TableCell className="font-mono-code text-xs">{row.destIP}</TableCell>
                <TableCell className="font-mono-code text-xs">{row.port}</TableCell>
                <TableCell className="text-xs">{row.protocol}</TableCell>
                <TableCell>
                  <Badge className={row.prediction === "Normal" ? "status-normal" : "status-attack"}>
                    {row.prediction}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TrafficTable;
