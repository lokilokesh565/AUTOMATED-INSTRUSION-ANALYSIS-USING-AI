// Landing Page for IDS
import { useNavigate } from "react-router-dom";

import {
    Shield,
    ShieldCheck,
    Brain,
    Activity,
    BarChart3,
    Lock,
    Zap,
    Eye,
    ChevronRight,
    Network,
    AlertTriangle,
    Database,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
    {
        icon: Brain,
        title: "Multi-Model AI Engine",
        desc: "Combines MLP, LSTM, XGBoost and a Hybrid Voting ensemble to achieve near-perfect intrusion detection accuracy.",
    },
    {
        icon: Eye,
        title: "Explainable AI (XAI)",
        desc: "Every prediction is backed by SHAP feature importance and LIME explanations so you always understand why a decision was made.",
    },
    {
        icon: Activity,
        title: "Real-Time Traffic Analysis",
        desc: "Processes raw network packets on the fly, classifying each flow as normal or an attack within seconds.",
    },
    {
        icon: BarChart3,
        title: "Rich Visualisations",
        desc: "ROC curves, confusion matrices, attack distribution charts and model accuracy comparisons — all generated automatically.",
    },
    {
        icon: Database,
        title: "Custom Dataset Upload",
        desc: "Upload your own CSV network-traffic dataset and instantly see analysis results tailored to your data.",
    },
    {
        icon: Lock,
        title: "Secure & Private",
        desc: "All analysis is performed locally in your browser session. Your data never leaves your machine.",
    },
];

const attackTypes = [
    { label: "DoS / DDoS", color: "bg-red-500" },
    { label: "Port Scan", color: "bg-orange-500" },
    { label: "Brute Force", color: "bg-yellow-500" },
    { label: "Web Attacks", color: "bg-purple-500" },
    { label: "Infiltration", color: "bg-pink-500" },
    { label: "Normal Traffic", color: "bg-emerald-500" },
];

const steps = [
    {
        num: "01",
        title: "Upload Dataset",
        desc: "Drag & drop a CSV file of network traffic, or run a scan on the built-in CIC-IDS2017 dataset.",
    },
    {
        num: "02",
        title: "AI Classification",
        desc: "Four ML models analyse every packet flow in parallel and vote on the final prediction.",
    },
    {
        num: "03",
        title: "Review & Explain",
        desc: "Inspect SHAP & LIME explanations to understand exactly which features triggered an alert.",
    },
];

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

            {/* ── NAV ── */}
            <nav className="fixed top-0 inset-x-0 z-50 bg-card/70 backdrop-blur-md border-b border-border">
                <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Shield className="w-6 h-6 text-primary" />
                        <span className="font-bold text-foreground tracking-wide">IDS</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
                            Sign In
                        </Button>
                        <Button size="sm" onClick={() => navigate("/login")}>
                            Get Started <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                    </div>
                </div>
            </nav>

            {/* ── HERO ── */}
            <section className="relative min-h-screen flex items-center justify-center pt-16 px-6 overflow-hidden">
                {/* Glow blobs */}
                <div className="absolute top-1/4 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative max-w-4xl mx-auto text-center animate-fade-in">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-6">
                        <Zap className="w-4 h-4" />
                        Explainable AI · Network Security · Real-Time Detection
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
                        Automated Intrusion Analysis Using AI{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">

                        </span>
                    </h1>

                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                        IDS is an advanced Network Intrusion Detection System that uses
                        ensemble machine learning models — MLP, LSTM, XGBoost and a Hybrid
                        Voting classifier — to detect cyber threats with explainable,
                        transparent AI.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button
                            size="lg"
                            className="text-base px-8 py-6 rounded-xl shadow-lg shadow-primary/30"
                            onClick={() => navigate("/login")}
                        >
                            Get Started <ChevronRight className="w-5 h-5 ml-2" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="text-base px-8 py-6 rounded-xl"
                            onClick={() => navigate("/register")}
                        >
                            Create Account
                        </Button>
                    </div>

                    {/* Floating stat pills */}
                    <div className="mt-14 flex flex-wrap justify-center gap-4">
                        {[
                            { icon: ShieldCheck, label: "~100% Detection Accuracy" },
                            { icon: Network, label: "4 ML Models" },
                            { icon: AlertTriangle, label: "6 Attack Types Detected" },
                        ].map(({ icon: Icon, label }) => (
                            <div
                                key={label}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm text-muted-foreground"
                            >
                                <Icon className="w-4 h-4 text-primary" />
                                {label}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ABOUT ── */}
            <section className="py-24 px-6 bg-card/40 border-y border-border">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl font-bold mb-3">What is IDS?</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            A full-stack AI security platform that combines state-of-the-art machine
                            learning with explainability tools so security analysts can trust and
                            verify every detection.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="card-cyber p-6 space-y-4">
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                                <Brain className="w-5 h-5 text-primary" /> The Problem
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Traditional signature-based IDS systems miss novel attacks and produce
                                too many false positives. Black-box ML models improve accuracy but
                                security teams can't explain why a threat was flagged — limiting trust
                                and adoption.
                            </p>
                        </div>
                        <div className="card-cyber p-6 space-y-4">
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-primary" /> Our Solution
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                IDS pairs powerful ensemble classification with SHAP and LIME
                                explanations to give analysts both accuracy and transparency. Every
                                alert comes with a feature-level explanation so you know exactly what
                                triggered it.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FEATURES ── */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl font-bold mb-3">Key Features</h2>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            Everything you need to detect, understand and respond to network threats.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map(({ icon: Icon, title, desc }) => (
                            <div
                                key={title}
                                className="card-cyber p-6 hover:border-primary/50 transition-colors duration-300 group"
                            >
                                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                                    <Icon className="w-5 h-5 text-primary" />
                                </div>
                                <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ATTACK TYPES ── */}
            <section className="py-20 px-6 bg-card/40 border-y border-border">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-3">Attack Types Detected</h2>
                    <p className="text-muted-foreground mb-10">
                        Trained on the CIC-IDS2017 dataset — one of the most comprehensive network
                        intrusion benchmarks available.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {attackTypes.map(({ label, color }) => (
                            <div
                                key={label}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm"
                            >
                                <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
                                {label}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── HOW IT WORKS ── */}
            <section className="py-24 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl font-bold mb-3">How It Works</h2>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            Three simple steps from raw traffic data to explainable threat insights.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {steps.map(({ num, title, desc }) => (
                            <div key={num} className="relative card-cyber p-6 text-center">
                                <div className="text-5xl font-extrabold text-primary/20 mb-3 leading-none">
                                    {num}
                                </div>
                                <h3 className="font-semibold text-foreground text-lg mb-2">{title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-24 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-cyan-500/5 pointer-events-none" />
                <div className="relative max-w-2xl mx-auto text-center">
                    <ShieldCheck className="w-14 h-14 text-primary mx-auto mb-6" />
                    <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Network?</h2>
                    <p className="text-muted-foreground mb-8">
                        Sign in or create a free account to start analysing network traffic with
                        AI-powered intrusion detection.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button
                            size="lg"
                            className="text-base px-8 py-6 rounded-xl shadow-lg shadow-primary/30"
                            onClick={() => navigate("/login")}
                        >
                            Get Started — Sign In <ChevronRight className="w-5 h-5 ml-2" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="text-base px-8 py-6 rounded-xl"
                            onClick={() => navigate("/register")}
                        >
                            Create Account
                        </Button>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer className="border-t border-border py-6 px-6 text-center text-sm text-muted-foreground">
                <div className="flex items-center justify-center gap-2 mb-1">
                    <Shield className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-foreground">IDS</span>
                </div>
                Intrusion Detection System · Automated Intrusion Analysis Using AI
            </footer>
        </div>
    );
};

export default Landing;
