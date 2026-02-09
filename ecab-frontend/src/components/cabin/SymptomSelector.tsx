'use client';

import { useState } from 'react';
import StepLayout from '../layout/StepLayout';

interface SymptomSelectorProps {
    onNext: (symptoms: string[], vitalsMode: 'full' | 'targeted', targetedVitals?: string[]) => void;
    onBack: () => void;
}

const BODY_PARTS = [
    { id: 'head', label: 'Đầu', symptoms: ['Đau đầu', 'Chóng mặt', 'Mất ngủ'] },
    { id: 'chest', label: 'Ngực', symptoms: ['Đau ngực', 'Khó thở', 'Hồi hộp', 'Ho khan', 'Đau nhói tim'] },
    { id: 'stomach', label: 'Bụng', symptoms: ['Đau bụng', 'Buồn nôn', 'Khó tiêu'] },
    { id: 'body', label: 'Toàn thân', symptoms: ['Sốt cao', 'Mệt mỏi', 'Đau nhức'] },
];

export default function SymptomSelector({ onNext, onBack }: SymptomSelectorProps) {
    const [selectedPart, setSelectedPart] = useState('chest');
    const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
    const [showRecommendation, setShowRecommendation] = useState(false);

    const toggleSymptom = (symptom: string) => {
        setSelectedSymptoms(prev =>
            prev.includes(symptom)
                ? prev.filter(s => s !== symptom)
                : [...prev, symptom]
        );
    };

    const getRecommendedVitals = () => {
        // Simple logic engine
        const symptoms = selectedSymptoms.join(' ').toLowerCase();
        const vitals = new Set<string>();

        // Always measure BMI/Weight as partial check? Maybe active user want quick check.
        // Let's stick to user request: "Ví dụ chỉ đo huyết áp và SPO2"

        if (symptoms.includes('đau ngực') || symptoms.includes('hồi hộp') || symptoms.includes('tim')) {
            vitals.add('bp'); // Blood Pressure
            vitals.add('spo2'); // SpO2 included Heart Rate
        }
        if (symptoms.includes('khó thở') || symptoms.includes('ho')) {
            vitals.add('spo2');
            vitals.add('temp');
        }
        if (symptoms.includes('sốt') || symptoms.includes('đau đầu')) {
            vitals.add('temp');
            vitals.add('bp');
        }
        if (symptoms.includes('chóng mặt')) {
            vitals.add('bp');
        }

        // If no specific match but selected something, default to simple check
        if (vitals.size === 0 && selectedSymptoms.length > 0) {
            return ['bp', 'spo2', 'temp'];
        }

        return Array.from(vitals);
    };

    const handleContinue = () => {
        if (selectedSymptoms.length === 0) {
            // No symptom -> Full check by default? Or ask? 
            // Let's assume full check if healthy
            onNext([], 'full');
        } else {
            setShowRecommendation(true);
        }
    };

    const recommendedVitals = getRecommendedVitals();

    const getVitalLabel = (id: string) => {
        switch (id) {
            case 'bp': return 'Huyết áp';
            case 'spo2': return 'SpO2 & Nhịp tim';
            case 'temp': return 'Thân nhiệt';
            case 'bmi': return 'Chiều cao & Cân nặng';
            default: return id;
        }
    };

    return (
        <StepLayout
            title="Khảo sát Triệu chứng"
            step={1}
            totalSteps={2}
            nurseMessage={showRecommendation
                ? "Dựa trên triệu chứng bạn chọn, tôi đề xuất lộ trình đo rút gọn để tiết kiệm thời gian."
                : "Bạn đang cảm thấy không khỏe ở đâu? Hãy chọn vùng cơ thể và triệu chứng tương ứng."}
            onBack={showRecommendation ? () => setShowRecommendation(false) : onBack}
        >
            <div className="h-full flex gap-8 relative">

                {/* RECOMMENDATION MODAL OVERLAY */}
                {showRecommendation && (
                    <div className="absolute inset-0 z-20 bg-black/80 backdrop-blur-xl rounded-3xl p-8 flex flex-col items-center justify-center animate-fade-in-up">
                        <h3 className="text-3xl font-display font-bold text-white mb-2">Đề xuất Lộ trình Đo</h3>
                        <p className="text-slate-400 mb-8 text-lg">AI Nurse phân tích dựa trên: <span className="text-white font-medium">{selectedSymptoms.join(', ')}</span></p>

                        <div className="grid grid-cols-2 gap-8 w-full max-w-4xl">
                            {/* Option 1: Targeted */}
                            <button
                                onClick={() => onNext(selectedSymptoms, 'targeted', recommendedVitals)}
                                className="group glass-card p-8 text-left border-teal-500/50 hover:bg-teal-500/10 transition-all relative overflow-hidden ring-2 ring-teal-500 shadow-[0_0_30px_rgba(20,184,166,0.2)]"
                            >
                                <div className="absolute top-4 right-4 bg-teal-500 text-black font-bold px-3 py-1 rounded-full text-sm">KHUYÊN DÙNG</div>
                                <div className="w-16 h-16 rounded-full bg-teal-500/20 flex items-center justify-center mb-6 text-teal-300">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                </div>
                                <h4 className="text-2xl font-bold text-white mb-2">Đo Trọng tâm</h4>
                                <p className="text-slate-300 mb-4 text-sm">Chỉ đo các chỉ số liên quan trực tiếp đến triệu chứng (Nhanh chóng).</p>
                                <div className="flex flex-wrap gap-2">
                                    {recommendedVitals.map(v => (
                                        <span key={v} className="px-3 py-1 rounded bg-teal-500/20 text-teal-300 text-sm font-medium border border-teal-500/20">
                                            {getVitalLabel(v)}
                                        </span>
                                    ))}
                                </div>
                            </button>

                            {/* Option 2: Full */}
                            <button
                                onClick={() => onNext(selectedSymptoms, 'full')}
                                className="group glass-card p-8 text-left hover:bg-white/5 transition-all opacity-80 hover:opacity-100"
                            >
                                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6 text-slate-300 group-hover:text-white">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <h4 className="text-2xl font-bold text-white mb-2">Đo Tổng quát</h4>
                                <p className="text-slate-300 mb-4 text-sm">Kiểm tra toàn bộ 4 chỉ số sinh hiệu (Chính xác nhất).</p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 rounded bg-white/10 text-slate-300 text-sm">BMI</span>
                                    <span className="px-3 py-1 rounded bg-white/10 text-slate-300 text-sm">Huyết áp</span>
                                    <span className="px-3 py-1 rounded bg-white/10 text-slate-300 text-sm">SpO2</span>
                                    <span className="px-3 py-1 rounded bg-white/10 text-slate-300 text-sm">Thân nhiệt</span>
                                </div>
                            </button>
                        </div>
                    </div>
                )}

                {/* LEFT: Body Map - 3D Skeleton Visualization */}
                <div className="flex-1 glass-card p-8 relative flex items-center justify-center bg-teal-900/10">
                    <div className="absolute top-4 left-4 bg-teal-900/50 px-4 py-2 rounded text-teal-300 border border-teal-500/30 text-xs font-mono">
                        BODY SCAN ACTIVE
                    </div>

                    {/* Stylized Body Map SVG */}
                    <div className="h-[80%] aspect-[1/2] relative opacity-80">
                        {/* Head */}
                        <button
                            onClick={() => setSelectedPart('head')}
                            className={`absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-2 transition-all ${selectedPart === 'head' ? 'bg-teal-500/20 border-teal-400 shadow-[0_0_20px_rgba(45,212,191,0.4)]' : 'border-white/10 hover:bg-white/5'}`}
                        />
                        {/* Chest */}
                        <button
                            onClick={() => setSelectedPart('chest')}
                            className={`absolute top-28 left-1/2 -translate-x-1/2 w-32 h-28 rounded-2xl border-2 transition-all ${selectedPart === 'chest' ? 'bg-teal-500/20 border-teal-400 shadow-[0_0_20px_rgba(45,212,191,0.4)]' : 'border-white/10 hover:bg-white/5'}`}
                        />
                        {/* Stomach */}
                        <button
                            onClick={() => setSelectedPart('stomach')}
                            className={`absolute top-60 left-1/2 -translate-x-1/2 w-28 h-24 rounded-2xl border-2 transition-all ${selectedPart === 'stomach' ? 'bg-teal-500/20 border-teal-400 shadow-[0_0_20px_rgba(45,212,191,0.4)]' : 'border-white/10 hover:bg-white/5'}`}
                        />
                        {/* Arms */}
                        <div className="absolute top-28 -left-4 w-8 h-48 border-2 border-white/10 -rotate-12 rounded-full" />
                        <div className="absolute top-28 -right-4 w-8 h-48 border-2 border-white/10 rotate-12 rounded-full" />
                        {/* Legs */}
                        <div className="absolute top-84 left-0 w-10 h-64 border-2 border-white/10 -rotate-6 rounded-full" />
                        <div className="absolute top-84 right-0 w-10 h-64 border-2 border-white/10 rotate-6 rounded-full" />
                    </div>

                    {/* Grid Effect Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(45,212,191,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(45,212,191,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
                </div>

                {/* RIGHT: Symptom List */}
                <div className="w-[450px] flex flex-col gap-6">
                    <div className="glass-card p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-display font-semibold text-white mb-6 pl-2 border-l-4 border-teal-500">
                            Triệu chứng vùng {BODY_PARTS.find(p => p.id === selectedPart)?.label}
                        </h3>

                        <div className="space-y-4 flex-1">
                            {BODY_PARTS.find(p => p.id === selectedPart)?.symptoms.map(symptom => (
                                <button
                                    key={symptom}
                                    onClick={() => toggleSymptom(symptom)}
                                    className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all group ${selectedSymptoms.includes(symptom)
                                            ? 'bg-teal-500/20 border-teal-500 shadow-lg'
                                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                                        }`}
                                >
                                    <span className={`text-lg transition-colors ${selectedSymptoms.includes(symptom) ? 'text-white font-medium' : 'text-slate-300'}`}>
                                        {symptom}
                                    </span>
                                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${selectedSymptoms.includes(symptom) ? 'bg-teal-500 border-teal-500' : 'border-slate-500'
                                        }`}>
                                        {selectedSymptoms.includes(symptom) && (
                                            <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ACTION BUTTON - MOVED TO CENTER/LEFT TO AVOID NURSE OVERLAP */}
                    {/* Previously Next was bottom right. Now moved inside the flow or left constrained */}
                    <div className="h-24 flex items-end">
                        <button
                            onClick={handleContinue}
                            disabled={selectedSymptoms.length === 0}
                            className={`w-full py-5 rounded-full text-xl font-display font-semibold transition-all flex items-center justify-center gap-3 shadow-xl ${selectedSymptoms.length > 0
                                    ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white hover:scale-[1.02]'
                                    : 'bg-slate-700/50 text-slate-500 cursor-not-allowed hidden' // Hide if not active to keep clean
                                }`}
                        >
                            <span>Tiếp tục</span>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </button>
                    </div>
                </div>

            </div>
        </StepLayout>
    );
}
