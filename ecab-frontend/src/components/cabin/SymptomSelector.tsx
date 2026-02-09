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
    { id: 'limbs', label: 'Tay chân & Cơ xương', symptoms: ['Đau nhức tay chân', 'Tê bì', 'Đau khớp', 'Mỏi cơ', 'Run chân tay'] },
    { id: 'general', label: 'Toàn thân', symptoms: ['Sốt cao', 'Mệt mỏi', 'Ớn lạnh', 'Suy nhược'] },
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
        const symptoms = selectedSymptoms.join(' ').toLowerCase();
        const vitals = new Set<string>();

        if (symptoms.includes('ngực') || symptoms.includes('tim') || symptoms.includes('hồi hộp')) {
            vitals.add('bp');
            vitals.add('spo2');
        }
        if (symptoms.includes('khó thở') || symptoms.includes('ho')) {
            vitals.add('spo2');
            vitals.add('temp');
        }
        if (symptoms.includes('sốt') || symptoms.includes('đau đầu') || symptoms.includes('khớp')) {
            vitals.add('temp');
            vitals.add('bp');
        }
        if (symptoms.includes('chóng mặt') || symptoms.includes('tê bì')) {
            vitals.add('bp');
            vitals.add('spo2');
        }

        if (vitals.size === 0 && selectedSymptoms.length > 0) {
            return ['bp', 'spo2', 'temp'];
        }

        return Array.from(vitals);
    };

    const handleContinue = () => {
        if (selectedSymptoms.length === 0) {
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
                ? "AI đề xuất lộ trình đo phù hợp với triệu chứng của bạn."
                : "Vui lòng chọn vùng cơ thể và triệu chứng bạn đang gặp phải. Chạm vào tay chân nếu bị đau nhức."}
            onBack={showRecommendation ? () => setShowRecommendation(false) : onBack}
        >
            <div className="h-full relative">

                {/* RECOMMENDATION MODAL */}
                {showRecommendation && (
                    <div className="absolute inset-0 z-20 bg-black/80 backdrop-blur-xl rounded-3xl p-8 flex flex-col items-center justify-center animate-fade-in-up">
                        <h3 className="text-3xl font-display font-bold text-white mb-2">Đề xuất Lộ trình Đo</h3>
                        <p className="text-slate-400 mb-8 text-lg">Phân tích từ triệu chứng: <span className="text-white font-medium">{selectedSymptoms.join(', ')}</span></p>

                        <div className="grid grid-cols-2 gap-8 w-full max-w-4xl">
                            <button
                                onClick={() => onNext(selectedSymptoms, 'targeted', recommendedVitals)}
                                className="group glass-card p-8 text-left border-teal-500/50 hover:bg-teal-500/10 transition-all relative ring-2 ring-teal-500"
                            >
                                <div className="absolute top-4 right-4 bg-teal-500 text-black font-bold px-3 py-1 rounded-full text-sm">KHUYÊN DÙNG</div>
                                <h4 className="text-2xl font-bold text-white mb-2">Đo Trọng tâm</h4>
                                <p className="text-slate-300 mb-4">Chỉ đo các chỉ số cần thiết (Nhanh chóng).</p>
                                <div className="flex flex-wrap gap-2">
                                    {recommendedVitals.map(v => (
                                        <span key={v} className="px-3 py-1 rounded bg-teal-500/20 text-teal-300 text-sm font-medium border border-teal-500/20">
                                            {getVitalLabel(v)}
                                        </span>
                                    ))}
                                </div>
                            </button>

                            <button
                                onClick={() => onNext(selectedSymptoms, 'full')}
                                className="group glass-card p-8 text-left hover:bg-white/5 transition-all opacity-80 hover:opacity-100"
                            >
                                <h4 className="text-2xl font-bold text-white mb-2">Đo Tổng quát</h4>
                                <p className="text-slate-300 mb-4">Kiểm tra toàn bộ 4 chỉ số sinh hiệu.</p>
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

                {/* MAIN CONTENT */}
                <div className="h-full grid grid-cols-12 gap-8">
                    {/* Left: Body Map */}
                    <div className="col-span-8 glass-card relative flex items-center justify-center bg-teal-900/5">
                        {/* Full Body Silhouette SVG */}
                        <div className="h-[90%] aspect-[1/2] relative">
                            <svg viewBox="0 0 200 600" className="w-full h-full drop-shadow-2xl">
                                {/* Base Body Silhouette - Visual only */}
                                <path
                                    d="M100,20 C120,20 135,35 135,55 C135,75 120,90 100,90 C80,90 65,75 65,55 C65,35 80,20 100,20 Z M100,95 C130,95 155,105 160,135 L170,250 C172,270 155,280 145,260 L140,180 L140,280 L145,450 C147,470 125,480 115,460 L105,300 L95,300 L85,460 C75,480 53,470 55,450 L60,280 L60,180 L55,260 C45,280 28,270 30,250 L40,135 C45,105 70,95 100,95 Z"
                                    fill="#1e293b"
                                    stroke="#334155"
                                    strokeWidth="2"
                                />

                                {/* Interactive Zones - Using distinct fill check */}
                                {/* NOTE: We're using explicit paths that cover each area generously */}

                                {/* HEAD */}
                                <path
                                    d="M100,20 C120,20 135,35 135,55 C135,75 120,90 100,90 C80,90 65,75 65,55 C65,35 80,20 100,20 Z"
                                    fill={selectedPart === 'head' ? '#14b8a6' : 'transparent'}
                                    fillOpacity={selectedPart === 'head' ? '0.4' : '0'}
                                    className="transition-all cursor-pointer hover:fill-white/10"
                                    onClick={() => setSelectedPart('head')}
                                    pointerEvents="all"
                                />

                                {/* CHEST - Adjusted to not overlap arms too much */}
                                <path
                                    d="M100,95 C120,95 140,105 142,135 L145,180 L55,180 L58,135 C60,105 80,95 100,95 Z"
                                    fill={selectedPart === 'chest' ? '#14b8a6' : 'transparent'}
                                    fillOpacity={selectedPart === 'chest' ? '0.4' : '0'}
                                    className="transition-all cursor-pointer hover:fill-white/10"
                                    onClick={() => setSelectedPart('chest')}
                                    pointerEvents="all"
                                />

                                {/* STOMACH */}
                                <path
                                    d="M55,180 L145,180 L140,280 L60,280 Z"
                                    fill={selectedPart === 'stomach' ? '#14b8a6' : 'transparent'}
                                    fillOpacity={selectedPart === 'stomach' ? '0.4' : '0'}
                                    className="transition-all cursor-pointer hover:fill-white/10"
                                    onClick={() => setSelectedPart('stomach')}
                                    pointerEvents="all"
                                />

                                {/* RIGHT ARM (Viewer's Right) */}
                                <path
                                    d="M142,135 L160,135 L170,250 C172,270 155,280 145,260 L145,180 Z"
                                    fill={selectedPart === 'limbs' ? '#14b8a6' : 'transparent'}
                                    fillOpacity={selectedPart === 'limbs' ? '0.4' : '0'}
                                    className="transition-all cursor-pointer hover:fill-white/10"
                                    onClick={() => setSelectedPart('limbs')}
                                    pointerEvents="all"
                                />

                                {/* LEFT ARM (Viewer's Left) */}
                                <path
                                    d="M58,135 L40,135 L30,250 C28,270 45,280 55,260 L55,180 Z"
                                    fill={selectedPart === 'limbs' ? '#14b8a6' : 'transparent'}
                                    fillOpacity={selectedPart === 'limbs' ? '0.4' : '0'}
                                    className="transition-all cursor-pointer hover:fill-white/10"
                                    onClick={() => setSelectedPart('limbs')}
                                    pointerEvents="all"
                                />

                                {/* LEGS */}
                                <path
                                    d="M140,280 L145,450 C147,470 125,480 115,460 L105,300 L95,300 L85,460 C75,480 53,470 55,450 L60,280 Z"
                                    fill={selectedPart === 'limbs' ? '#14b8a6' : 'transparent'}
                                    fillOpacity={selectedPart === 'limbs' ? '0.4' : '0'}
                                    className="transition-all cursor-pointer hover:fill-white/10"
                                    onClick={() => setSelectedPart('limbs')}
                                    pointerEvents="all"
                                />

                                {/* GENERAL / WHOLE BODY OVERLAY (Optional - click outside) */}
                                {/* We use a separate button for 'general' below the body map maybe? Or just keep it as a category. */}
                            </svg>
                        </div>

                        {/* General Toggle */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                            <button
                                onClick={() => setSelectedPart('general')}
                                className={`px-6 py-2 rounded-full border transition-all ${selectedPart === 'general' ? 'bg-teal-500/20 border-teal-500 text-teal-300' : 'border-white/10 bg-black/40 text-slate-400 hover:bg-white/10'}`}
                            >
                                Triệu chứng Toàn thân
                            </button>
                        </div>
                    </div>

                    {/* Right: Symptoms & Actions */}
                    <div className="col-span-4 flex flex-col h-full gap-6">
                        {/* Symptoms List */}
                        <div className="glass-card flex-1 p-6 overflow-y-auto">
                            <h3 className="text-xl font-display font-semibold text-white mb-6 border-l-4 border-teal-500 pl-3">
                                {BODY_PARTS.find(p => p.id === selectedPart)?.label}
                            </h3>
                            <div className="space-y-3">
                                {BODY_PARTS.find(p => p.id === selectedPart)?.symptoms.map(symptom => (
                                    <button
                                        key={symptom}
                                        onClick={() => toggleSymptom(symptom)}
                                        className={`w-full p-4 rounded-xl border text-left transition-all ${selectedSymptoms.includes(symptom)
                                                ? 'bg-teal-500/20 border-teal-500 text-white'
                                                : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                                            }`}
                                    >
                                        {symptom}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Action Button Area */}
                        <div className="h-auto">
                            <button
                                onClick={handleContinue}
                                className={`w-full py-4 rounded-xl text-lg font-bold transition-all flex items-center justify-center gap-2 ${selectedSymptoms.length > 0
                                        ? 'bg-teal-500 hover:bg-teal-400 text-black shadow-lg'
                                        : 'bg-slate-700 text-slate-400'
                                    }`}
                            >
                                Tiếp tục hành trình
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </button>
                            {/* Spacer for safety */}
                            <div className="h-4"></div>
                        </div>
                    </div>
                </div>
            </div>
        </StepLayout>
    );
}
