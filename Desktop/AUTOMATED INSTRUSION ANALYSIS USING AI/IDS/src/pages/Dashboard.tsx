import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Shield, Radar, LogOut, Activity, ShieldCheck, ShieldAlert, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScanningAnimation from "@/components/ScanningAnimation";
import DatasetUploader from "@/components/DatasetUploader";
import TrafficTable from "@/components/TrafficTable";
import AccuracyComparison from "@/components/graphs/AccuracyComparison";
import TrainingTimeComparison from "@/components/graphs/TrainingTimeComparison";
import ConfusionMatrix from "@/components/graphs/ConfusionMatrix";
import ROCCurve from "@/components/graphs/ROCCurve";
import AttackDistribution from "@/components/graphs/AttackDistribution";
import SHAPSummary from "@/components/graphs/SHAPSummary";
import SHAPFeatureImportance from "@/components/graphs/SHAPFeatureImportance";
import LIMEExplanation from "@/components/graphs/LIMEExplanation";
import { analyzeUploadedData, type AnalysisResult } from "@/data/analyzeData";

const scanStages = [
  "Loading ML models (MLP, LSTM, XGBoost, Hybrid)...",
  "Loading test network traffic data...",
  "Preprocessing and normalizing features...",
  "Running LSTM prediction...",
  "Running MLP prediction...",
  "Running XGBoost prediction...",
  "Running Hybrid Voting ensemble...",
  "Generating SHAP explanations...",
  "Generating LIME explanations...",
  "Compiling results...",
];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [uploadedData, setUploadedData] = useState<Record<string, string | number>[] | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleDataLoaded = (data: Record<string, string | number>[], fileName: string) => {
    setUploadedData(data);
    setUploadedFileName(fileName);
    setShowResults(false);
    setAnalysisResult(null);
  };

  const handleClearUpload = () => {
    setUploadedData(null);
    setUploadedFileName(null);
    setShowResults(false);
    setAnalysisResult(null);
  };

  const handleScan = useCallback(() => {
    setScanning(true);
    setShowResults(false);
    setProgress(0);

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const p = Math.min(Math.round((currentStep / scanStages.length) * 100), 100);
      setProgress(p);
      setStage(scanStages[Math.min(currentStep - 1, scanStages.length - 1)]);

      if (currentStep >= scanStages.length) {
        clearInterval(interval);
        setTimeout(() => {
          // Derive all graph data from uploaded dataset (or null → graphs use static defaults)
          const result = uploadedData ? analyzeUploadedData(uploadedData) : null;
          setAnalysisResult(result);
          setScanning(false);
          setShowResults(true);
        }, 600);
      }
    }, 800);
  }, [uploadedData]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Stats driven by analysis result (or defaults)
  const totalRows = analysisResult?.totalRows ?? uploadedData?.length ?? 903;
  const bestAccuracy = analysisResult
    ? Math.max(...analysisResult.modelMetrics.map((m) => m.accuracy)).toFixed(2) + "%"
    : uploadedData ? "Training..." : "0%";

  return (
    <div className="min-h-screen bg-background">
      {scanning && <ScanningAnimation progress={progress} stage={stage} />}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-base font-bold text-foreground leading-tight">IDS</h1>
              <p className="text-xs text-muted-foreground">Automated Intrusion Analysis Using AI</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:block">
              Welcome, <span className="font-medium text-foreground">{user?.name}</span>
            </span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="card-cyber p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Activity className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Models Loaded</p>
              <p className="text-2xl font-bold text-foreground">5</p>
            </div>
          </div>
          <div className="card-cyber p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Best Accuracy</p>
              <p className="text-2xl font-bold text-foreground">{bestAccuracy}</p>
            </div>
          </div>
          <div className="card-cyber p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-danger/10 flex items-center justify-center">
              <ShieldAlert className="w-6 h-6 text-danger" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Dataset</p>
              <p className="text-2xl font-bold text-foreground">
                {uploadedFileName ? `${totalRows.toLocaleString()} rows` : "No dataset"}
              </p>
            </div>
          </div>
        </div>

        {/* Dataset Upload */}
        <div className="mb-6">
          <DatasetUploader
            onDataLoaded={handleDataLoaded}
            uploadedFileName={uploadedFileName}
            onClear={handleClearUpload}
          />
        </div>

        {/* Dataset Info */}
        {uploadedData && (
          <div className="card-cyber p-4 mb-6 flex items-center gap-3 animate-fade-in">
            <Database className="w-5 h-5 text-primary" />
            <span className="text-sm text-foreground">
              <span className="font-semibold">{uploadedData.length}</span> records loaded from{" "}
              <span className="font-mono-code text-primary">{uploadedFileName}</span>
            </span>
          </div>
        )}

        {/* Scan Button */}
        <div className="text-center mb-10">
          <button
            onClick={handleScan}
            disabled={scanning || !uploadedData}
            className={`scan-button text-lg ${(scanning || !uploadedData) ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
          >
            <Radar className="w-5 h-5 inline-block mr-2" />
            {scanning ? "Scanning..." : showResults ? "Re-Scan Loaded Traffic" : "Scan Loaded Traffic"}
          </button>
          <p className="text-sm text-muted-foreground mt-3">
            {uploadedData
              ? `Ready to scan ${uploadedData.length} records from ${uploadedFileName}`
              : "Please upload a CSV dataset above to begin AI analysis"}
          </p>
        </div>

        {/* Results Section */}
        {showResults && (
          <div className="space-y-6">
            {/* Traffic Predictions */}
            <div className="animate-fade-in" style={{ animationDelay: "0ms" }}>
              <TrafficTable rows={analysisResult?.trafficRows} />
            </div>

            {/* Graphs Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
                <AccuracyComparison modelMetrics={analysisResult?.modelMetrics} />
              </div>
              <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
                <TrainingTimeComparison trainingTimes={analysisResult?.trainingTimes} />
              </div>
              <div className="animate-fade-in" style={{ animationDelay: "300ms" }}>
                <ConfusionMatrix cm={analysisResult?.confusionMatrix} bestModelName={analysisResult?.bestModelName} />
              </div>
              <div className="animate-fade-in" style={{ animationDelay: "400ms" }}>
                <ROCCurve rocData={analysisResult?.rocCurve} auc={analysisResult?.auc} />
              </div>
              <div className="animate-fade-in" style={{ animationDelay: "500ms" }}>
                <AttackDistribution distribution={analysisResult?.attackDistribution} />
              </div>
              <div className="animate-fade-in" style={{ animationDelay: "600ms" }}>
                <SHAPSummary shapData={analysisResult?.shapFeatureImportance} />
              </div>
              <div className="animate-fade-in" style={{ animationDelay: "700ms" }}>
                <SHAPFeatureImportance importance={analysisResult?.shapFeatureImportance} />
              </div>
              <div className="animate-fade-in" style={{ animationDelay: "800ms" }}>
                <LIMEExplanation limeData={analysisResult?.limeExplanation} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
