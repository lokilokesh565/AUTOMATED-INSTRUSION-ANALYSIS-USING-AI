import { Shield } from "lucide-react";

interface ScanningAnimationProps {
  progress: number;
  stage: string;
}

const ScanningAnimation = ({ progress, stage }: ScanningAnimationProps) => {
  return (
    <div className="scanning-overlay">
      <div className="card-cyber p-10 text-center max-w-sm mx-4">
        <div className="relative inline-flex items-center justify-center mb-6">
          <div className="w-20 h-20 rounded-full border-4 border-primary/20 flex items-center justify-center">
            <Shield className="w-8 h-8 text-primary animate-pulse-slow" />
          </div>
          <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-transparent border-t-primary animate-spin-slow" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Scanning Network Traffic</h3>
        <p className="text-sm text-muted-foreground mb-4 font-mono-code">{stage}</p>
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">{progress}%</p>
      </div>
    </div>
  );
};

export default ScanningAnimation;
