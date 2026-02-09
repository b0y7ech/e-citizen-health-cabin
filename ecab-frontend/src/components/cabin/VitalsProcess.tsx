'use client';

import { useState, useEffect } from 'react';
import StepLayout from '../layout/StepLayout';
import VitalsMonitor from './VitalsMonitor';

interface VitalsProcessProps {
    onComplete: (data: any) => void;
    onBack: () => void;
    stepsToMeasure?: string[]; // Optional: if provided, only measure these. If undefined/empty, measure all.
}

const ALL_STEPS = [
    { id: 'bmi', label: 'Cân nặng & Chiều cao', message: 'Vui lòng bỏ giày dép và đứng thẳng lên bàn cân.', duration: 4000 },
    { id: 'bp', label: 'Huyết áp', message: 'Hãy ngồi thoải mái, đặt tay trái vào vòng bít để đo huyết áp.', duration: 5000 },
    { id: 'spo2', label: 'SpO2 & Nhịp tim', message: 'Đặt ngón tay trỏ vào cảm biến ánh sáng để đo Oxy trong máu.', duration: 4500 },
    { id: 'temp', label: 'Thân nhiệt', message: 'Giữ trán cách cảm biến khoảng 10cm và đứng yên.', duration: 3000 },
];

export default function VitalsProcess({ onComplete, onBack, stepsToMeasure }: VitalsProcessProps) {
    // Filter steps based on props. If no props, use all.
    const activeSteps = stepsToMeasure && stepsToMeasure.length > 0
        ? ALL_STEPS.filter(s => stepsToMeasure.includes(s.id))
        : ALL_STEPS;

    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isMeasuring, setIsMeasuring] = useState(false);
    const [vitalsData, setVitalsData] = useState({
        bmi: { weight: 0, height: 0, bmi: 0 },
        bp: { sys: 0, dia: 0 },
        spo2: { spo2: 0, bpm: 0 },
        temp: 0,
    });

    const step = activeSteps[currentStepIndex];

    useEffect(() => {
        if (!step) return;

        // Start measuring when step changes
        setIsMeasuring(true);
        let interval: NodeJS.Timeout;

        // Simulation logic
        if (step.id === 'bmi') {
            let w = 40, h = 150;
            interval = setInterval(() => {
                w += 1; h += 0.5;
                if (w > 65) w = 65;
                if (h > 170) h = 170;
                setVitalsData(prev => ({ ...prev, bmi: { weight: w, height: h, bmi: 0 } }));
            }, 100);
        }
        else if (step.id === 'bp') {
            let sys = 100, dia = 60;
            interval = setInterval(() => {
                sys = Math.min(120, sys + 1);
                dia = Math.min(80, dia + 0.5);
                setVitalsData(prev => ({ ...prev, bp: { sys: Math.floor(sys), dia: Math.floor(dia) } }));
            }, 100);
        }
        else if (step.id === 'spo2') {
            setVitalsData(prev => ({ ...prev, spo2: { spo2: 98, bpm: 75 } }));
        }
        else if (step.id === 'temp') {
            let t = 35.0;
            interval = setInterval(() => {
                t = Math.min(36.5, t + 0.1);
                setVitalsData(prev => ({ ...prev, temp: parseFloat(t.toFixed(1)) }));
            }, 200);
        }

        // Finish step
        const timer = setTimeout(() => {
            setIsMeasuring(false);
            clearInterval(interval);

            // Finalize data (Mock values)
            if (step.id === 'bmi') {
                setVitalsData(prev => ({ ...prev, bmi: { weight: 65, height: 170, bmi: 22.5 } }));
            }
            // Keep synthesized values for others

            // Auto move next
            setTimeout(() => {
                if (currentStepIndex < activeSteps.length - 1) {
                    setCurrentStepIndex(prev => prev + 1);
                } else {
                    onComplete(vitalsData);
                }
            }, 2000);
        }, step.duration);

        return () => {
            clearTimeout(timer);
            if (interval) clearInterval(interval);
        };
    }, [currentStepIndex, step]); // Add step dependency

    if (!step) return null;

    return (
        <StepLayout
            title="Đo chỉ số sinh hiệu"
            step={3}
            totalSteps={6}
            nurseMessage={`${step.message} (${currentStepIndex + 1}/${activeSteps.length})`}
            onBack={onBack}
        >
            <div className="h-full flex flex-col">
                {/* Step Indicator */}
                <div className="flex justify-center gap-4 mb-8">
                    {activeSteps.map((s, i) => (
                        <div
                            key={s.id}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${i === currentStepIndex ? 'bg-teal-500 text-white' :
                                    i < currentStepIndex ? 'bg-teal-500/30 text-teal-200' : 'bg-white/5 text-slate-500'
                                }`}
                        >
                            {s.label}
                        </div>
                    ))}
                </div>

                {/* Monitor Area */}
                <div className="flex-1 glass-card p-8 bg-black/20">
                    <VitalsMonitor
                        type={step.id as any}
                        value={vitalsData[step.id as keyof typeof vitalsData]}
                        isMeasuring={isMeasuring}
                        label={step.label}
                        unit=""
                    />
                </div>
            </div>
        </StepLayout>
    );
}
