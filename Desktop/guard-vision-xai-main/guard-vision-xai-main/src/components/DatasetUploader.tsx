import { useState, useRef } from "react";
import { Upload, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DatasetUploaderProps {
  onDataLoaded: (data: Record<string, string | number>[], fileName: string) => void;
  uploadedFileName: string | null;
  onClear: () => void;
}

const parseCSV = (text: string): Record<string, string | number>[] => {
  const lines = text.trim().split("\n");
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map((h) => h.trim());
  const rows: Record<string, string | number>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",").map((v) => v.trim());
    if (values.length !== headers.length) continue;
    const row: Record<string, string | number> = {};
    headers.forEach((h, j) => {
      const num = Number(values[j]);
      row[h] = isNaN(num) ? values[j] : num;
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
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
            dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
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
