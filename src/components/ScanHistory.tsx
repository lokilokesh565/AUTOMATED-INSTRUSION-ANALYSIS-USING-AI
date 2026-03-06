import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { History, FileText, Calendar, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { type AnalysisResult } from "@/data/analyzeData";

interface ScanHistoryProps {
    onSelectScan: (result: AnalysisResult) => void;
    refreshTrigger: number;
}

const ScanHistory = ({ onSelectScan, refreshTrigger }: ScanHistoryProps) => {
    const [scans, setScans] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchScans = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("scans")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching scans:", error);
        } else {
            setScans(data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchScans();
    }, [refreshTrigger]);

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const { error } = await supabase.from("scans").delete().eq("id", id);
        if (error) {
            toast.error("Failed to delete scan");
        } else {
            toast.success("Scan deleted");
            fetchScans();
        }
    };

    if (loading && scans.length === 0) {
        return <div className="p-8 text-center text-muted-foreground animate-pulse">Loading history...</div>;
    }

    if (scans.length === 0) {
        return (
            <div className="card-cyber p-8 text-center">
                <History className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground">No scan history found</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                <History className="w-5 h-5 text-primary" /> Scan History
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {scans.map((scan) => (
                    <div
                        key={scan.id}
                        onClick={() => onSelectScan(scan.results)}
                        className="card-cyber p-4 cursor-pointer hover:border-primary/50 transition-all group relative animate-fade-in"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-primary" />
                                <span className="font-medium truncate max-w-[150px]">{scan.file_name}</span>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-danger hover:text-danger hover:bg-danger/10"
                                onClick={(e) => handleDelete(scan.id, e)}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(scan.created_at).toLocaleDateString()}
                            </div>
                            <div className="text-right font-semibold text-primary">
                                {scan.best_model_accuracy.toFixed(2)}%
                            </div>
                        </div>

                        <div className="text-[10px] bg-secondary/50 rounded p-2 flex justify-between">
                            <span>{scan.total_rows.toLocaleString()} rows</span>
                            <span className="font-medium capitalize">{scan.best_model_name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ScanHistory;
