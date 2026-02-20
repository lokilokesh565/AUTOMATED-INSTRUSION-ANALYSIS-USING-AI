import { useState, useRef } from "react";
import { Upload, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DatasetUploaderProps {
  onDataLoaded: (data: Record<string, string | number>[], fileName: string) => void;
  uploadedFileName: string | null;
  onClear: () => void;
}

const parseCSV = (text: string): Record<string, string | number>[] => {
  const lines: string[] = [];
  let currentLine = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"' && inQuotes && nextChar === '"') {
      currentLine += '"';
      i++;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (currentLine.trim()) lines.push(currentLine);
      currentLine = "";
      if (char === "\r" && nextChar === "\n") i++;
    } else {
      currentLine += char;
    }
  }
  if (currentLine.trim()) lines.push(currentLine);

  if (lines.length < 2) return [];

  const parseRow = (line: string) => {
    const cells = [];
    let currentCell = "";
    let insideQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"' && insideQuotes && line[i + 1] === '"') {
        currentCell += '"';
        i++;
      } else if (c === '"') {
        insideQuotes = !insideQuotes;
      } else if (c === "," && !insideQuotes) {
        cells.push(currentCell.trim());
        currentCell = "";
      } else {
        currentCell += c;
      }
    }
    cells.push(currentCell.trim());
    return cells;
  };

  const headers = parseRow(lines[0]);
  const rows: Record<string, string | number>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseRow(lines[i]);
    if (values.length !== headers.length) continue;
    const row: Record<string, string | number> = {};
    headers.forEach((h, j) => {
      const val = values[j];
      const num = Number(val);
      row[h] = (val !== "" && !isNaN(num)) ? num : val;
    });
    rows.push(row);
  }
  return rows;
};


const DatasetUploader = ({ onDataLoaded, uploadedFileName, onClear }: DatasetUploaderProps) => {
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setError("");
    if (!file.name.endsWith(".csv")) {
      setError("Please upload a CSV file");
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setError("File size must be less than 20MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const data = parseCSV(text);
      if (data.length === 0) {
        setError("No valid data rows found in CSV");
        return;
      }
      onDataLoaded(data, file.name);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="card-cyber p-5">
      <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
        <FileText className="w-4 h-4 text-primary" />
        Upload Test Dataset
      </h3>

      {uploadedFileName ? (
        <div className="flex items-center justify-between bg-success/10 border border-success/20 rounded-lg px-4 py-3">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-success" />
            <span className="text-sm font-medium text-foreground">{uploadedFileName}</span>
            <span className="text-xs text-muted-foreground">— Ready for scanning</span>
          </div>
          <button onClick={onClear} className="text-muted-foreground hover:text-danger transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            }`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-foreground font-medium">
            Drop your CSV file here or <span className="text-primary">browse</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            CSV format • Max 20MB • Network traffic test data
          </p>
          <input
            ref={inputRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </div>
      )}

      {error && <p className="text-xs text-danger mt-2">{error}</p>}
    </div>
  );
};

export default DatasetUploader;
