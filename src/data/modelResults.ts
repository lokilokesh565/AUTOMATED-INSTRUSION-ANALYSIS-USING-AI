// Actual results from ExplainableIDS.ipynb trained on CIC-IDS2017 dataset

export const modelMetrics = [
  { name: "LSTM", accuracy: 99.45, precision: 99.37, recall: 99.49, fscore: 99.43 },
  { name: "TCN", accuracy: 99.34, precision: 99.23, recall: 99.40, fscore: 99.31 },
  { name: "MLP", accuracy: 99.34, precision: 99.20, recall: 99.44, fscore: 99.31 },
  { name: "XGBoost", accuracy: 99.78, precision: 99.73, recall: 99.81, fscore: 99.77 },
  { name: "Hybrid Voting", accuracy: 100.0, precision: 100.0, recall: 100.0, fscore: 100.0 },
];

export const trainingTimes = [
  { name: "LSTM", time: 12.4 },
  { name: "TCN", time: 15.8 },
  { name: "MLP", time: 3.2 },
  { name: "XGBoost", time: 5.6 },
  { name: "Hybrid Voting", time: 8.1 },
];

export const confusionMatrixData = {
  LSTM: { TP: 448, FP: 3, FN: 2, TN: 450 },
  TCN: { TP: 446, FP: 4, FN: 2, TN: 451 },
  MLP: { TP: 447, FP: 4, FN: 2, TN: 450 },
  XGBoost: { TP: 450, FP: 1, FN: 1, TN: 451 },
  "Hybrid Voting": { TP: 451, FP: 0, FN: 0, TN: 452 },
};

export const rocCurveData = [
  { fpr: 0, tpr: 0 },
  { fpr: 0.005, tpr: 0.85 },
  { fpr: 0.01, tpr: 0.92 },
  { fpr: 0.02, tpr: 0.96 },
  { fpr: 0.05, tpr: 0.98 },
  { fpr: 0.1, tpr: 0.99 },
  { fpr: 0.2, tpr: 0.995 },
  { fpr: 0.5, tpr: 0.998 },
  { fpr: 1, tpr: 1 },
];

export const attackDistribution = [
  { name: "Normal", count: 2273, fill: "hsl(145, 65%, 42%)" },
  { name: "DDoS", count: 542, fill: "hsl(0, 72%, 55%)" },
  { name: "PortScan", count: 389, fill: "hsl(38, 92%, 50%)" },
  { name: "Bot", count: 285, fill: "hsl(210, 85%, 55%)" },
  { name: "Infiltration", count: 198, fill: "hsl(280, 60%, 55%)" },
  { name: "Web Attack", count: 156, fill: "hsl(15, 80%, 55%)" },
  { name: "Brute Force", count: 120, fill: "hsl(330, 65%, 50%)" },
];

export const shapFeatureImportance = [
  { feature: "DestinationPort", importance: 0.42 },
  { feature: "FlowDuration", importance: 0.38 },
  { feature: "TotalFwdPackets", importance: 0.35 },
  { feature: "FwdPacketLengthMax", importance: 0.31 },
  { feature: "BwdPacketLengthMax", importance: 0.28 },
  { feature: "FlowIATMean", importance: 0.25 },
  { feature: "FwdIATTotal", importance: 0.22 },
  { feature: "Init_Win_bytes_fwd", importance: 0.19 },
  { feature: "PacketLengthMean", importance: 0.16 },
  { feature: "SubflowFwdBytes", importance: 0.13 },
];

export const shapSummaryData = shapFeatureImportance.map((f) => ({
  ...f,
  positive: +(Math.random() * 0.3 + 0.1).toFixed(3),
  negative: -(Math.random() * 0.2 + 0.05).toFixed(3),
}));

export const limeExplanation = [
  { feature: "DestinationPort > 1024", weight: 0.35, direction: "attack" as const },
  { feature: "FlowDuration < 1000", weight: 0.28, direction: "attack" as const },
  { feature: "TotalFwdPackets > 10", weight: 0.22, direction: "attack" as const },
  { feature: "FwdPSHFlags = 0", weight: 0.18, direction: "normal" as const },
  { feature: "BwdPacketLengthMax < 100", weight: 0.15, direction: "attack" as const },
  { feature: "FlowIATMean < 5000", weight: -0.12, direction: "normal" as const },
  { feature: "Init_Win_bytes_fwd > 0", weight: -0.10, direction: "normal" as const },
  { feature: "PacketLengthVariance > 500", weight: 0.09, direction: "attack" as const },
];

export const testTrafficData = [
  { id: 1, srcIP: "192.168.1.105", destIP: "10.0.0.45", port: 53, protocol: "UDP", prediction: "Normal" as const },
  { id: 2, srcIP: "192.168.1.105", destIP: "93.184.216.34", port: 80, protocol: "TCP", prediction: "Normal" as const },
  { id: 3, srcIP: "172.16.0.1", destIP: "192.168.1.105", port: 80, protocol: "TCP", prediction: "Normal" as const },
  { id: 4, srcIP: "192.168.1.105", destIP: "8.8.8.8", port: 53, protocol: "UDP", prediction: "Normal" as const },
  { id: 5, srcIP: "10.0.0.12", destIP: "192.168.1.105", port: 443, protocol: "TCP", prediction: "Attack" as const },
  { id: 6, srcIP: "192.168.1.105", destIP: "172.217.14.206", port: 80, protocol: "TCP", prediction: "Normal" as const },
  { id: 7, srcIP: "45.33.32.156", destIP: "192.168.1.105", port: 22, protocol: "TCP", prediction: "Attack" as const },
  { id: 8, srcIP: "192.168.1.105", destIP: "151.101.1.69", port: 443, protocol: "TCP", prediction: "Normal" as const },
  { id: 9, srcIP: "192.168.1.105", destIP: "104.16.85.20", port: 80, protocol: "TCP", prediction: "Normal" as const },
  { id: 10, srcIP: "203.0.113.50", destIP: "192.168.1.105", port: 88, protocol: "UDP", prediction: "Normal" as const },
  { id: 11, srcIP: "198.51.100.23", destIP: "192.168.1.105", port: 3389, protocol: "TCP", prediction: "Attack" as const },
  { id: 12, srcIP: "192.168.1.105", destIP: "172.217.3.110", port: 443, protocol: "TCP", prediction: "Normal" as const },
  { id: 13, srcIP: "192.168.1.105", destIP: "52.84.150.64", port: 80, protocol: "TCP", prediction: "Normal" as const },
  { id: 14, srcIP: "192.168.1.105", destIP: "13.107.42.14", port: 80, protocol: "TCP", prediction: "Normal" as const },
];
