'use client';

import { useEffect, useState, useRef } from 'react';

interface VitalsMonitorProps {
    type: 'bmi' | 'bp' | 'spo2' | 'temp';
    value: any;
    isMeasuring: boolean;
    label: string;
    unit: string;
}

export default function VitalsMonitor({ type, value, isMeasuring, label, unit }: VitalsMonitorProps) {
    // BMI Visualization
    if (type === 'bmi') {
        const { weight, height, bmi } = value || { weight: 0, height: 0, bmi: 0 };
        return (
            <div className="w-full h-full flex flex-col items-center justify-center gap-8 animate-fade-in-up">
                <div className="flex gap-12">
                    <div className="glass-card p-6 min-w-[180px] flex flex-col items-center">
                        <span className="text-slate-400 mb-2 text-lg">Chiều cao</span>
                        <div className="flex items-baseline gap-2">
                            <span className={`text-4xl font-display font-semibold transition-all ${isMeasuring ? 'text-teal-400 animate-pulse' : 'text-white'}`}>
                                {height}
                            </span>
                            <span className="text-slate-500">cm</span>
                        </div>
                    </div>

                    <div className="glass-card p-6 min-w-[180px] flex flex-col items-center">
                        <span className="text-slate-400 mb-2 text-lg">Cân nặng</span>
                        <div className="flex items-baseline gap-2">
                            <span className={`text-4xl font-display font-semibold transition-all ${isMeasuring ? 'text-teal-400 animate-pulse' : 'text-white'}`}>
                                {weight}
                            </span>
                            <span className="text-slate-500">kg</span>
                        </div>
                    </div>
                </div>

                {!isMeasuring && bmi > 0 && (
                    <div className="mt-4 p-4 rounded-xl bg-teal-500/10 border border-teal-500/30">
                        <span className="text-teal-300 text-xl font-medium">BMI: {bmi} - Bình thường</span>
                    </div>
                )}
            </div>
        );
    }

    // Blood Pressure Visualization (Gauge)
    if (type === 'bp') {
        const { sys, dia } = value || { sys: 0, dia: 0 };
        return (
            <div className="w-full h-full flex flex-col items-center justify-center animate-fade-in-up">
                <div className="relative w-64 h-64 border-8 border-slate-700/50 rounded-full flex items-center justify-center mb-8">
                    {isMeasuring && (
                        <div className="absolute inset-0 border-8 border-t-teal-400 border-r-teal-400 border-b-transparent border-l-transparent rounded-full animate-spin" />
                    )}
                    <div className="text-center">
                        <div className="text-5xl font-display font-bold text-white mb-2">
                            {sys}<span className="text-2xl text-slate-500 font-normal">/</span>{dia}
                        </div>
                        <span className="text-slate-400">mmHg</span>
                    </div>
                </div>
                <div className="text-lg text-teal-300 font-medium">
                    {isMeasuring ? 'Đang bơm khí...' : 'Đo hoàn tất'}
                </div>
            </div>
        );
    }

    // SpO2 Visualization (Waveform)
    if (type === 'spo2') {
        const { spo2, bpm } = value || { spo2: 0, bpm: 0 };
        return (
            <div className="w-full h-full flex flex-col items-center justify-center gap-8 animate-fade-in-up">
                {/* Heartbeat Graph Simulation */}
                <div className="w-full max-w-2xl h-48 bg-black/40 rounded-2xl border border-white/10 relative overflow-hidden flex items-end">
                    <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(5,1fr)]">
                        {Array.from({ length: 100 }).map((_, i) => (
                            <div key={i} className="border-[0.5px] border-teal-500/10" />
                        ))}
                    </div>

                    {/* Moving Line */}
                    <div className="absolute inset-y-0 w-1 bg-teal-400/80 shadow-[0_0_15px_rgba(45,212,191,0.8)] z-10 animate-scan-horizontal" />

                    {/* SVG Wave */}
                    <svg className="w-full h-full p-4" viewBox="0 0 400 100" preserveAspectRatio="none">
                        <path d="M0 50 L20 50 L30 20 L40 80 L50 50 L80 50 L90 20 L100 80 L110 50 L140 50 L150 20 L160 80 L170 50 L200 50 L210 20 L220 80 L230 50 L260 50 L270 20 L280 80 L290 50 L320 50 L330 20 L340 80 L350 50 L380 50 L390 20 L400 80"
                            fill="none" stroke="rgba(45,212,191,0.8)" strokeWidth="3"
                            className={isMeasuring ? 'animate-pulse' : ''}
                        />
                    </svg>
                </div>

                <div className="flex gap-12">
                    <div className="text-center">
                        <div className="text-6xl font-display font-bold text-teal-400 mb-2">{spo2}<span className="text-2xl">%</span></div>
                        <span className="text-slate-400 uppercase tracking-wider">SpO2</span>
                    </div>
                    <div className="text-center">
                        <div className="text-6xl font-display font-bold text-coral-400 mb-2">{bpm}</div>
                        <span className="text-slate-400 uppercase tracking-wider">BPM</span>
                    </div>
                </div>
            </div>
        );
    }

    // Temp Visualization
    if (type === 'temp') {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center animate-fade-in-up">
                <div className="relative w-40 h-80 bg-glass-bg rounded-full border border-white/20 p-2 mb-8">
                    <div className="w-full bg-slate-700/50 rounded-full h-full relative overflow-hidden">
                        <div
                            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500 via-teal-400 to-red-400 transition-all duration-1000 ease-out"
                            style={{ height: isMeasuring ? '60%' : '50%' }}
                        />
                    </div>
                    {/* Ticks */}
                    <div className="absolute right-4 top-4 bottom-4 w-4 flex flex-col justify-between text-[10px] text-slate-400">
                        <span>40°</span>
                        <span>38°</span>
                        <span>36°</span>
                        <span>34°</span>
                    </div>
                </div>

                <div className="text-6xl font-display font-bold text-white">
                    {value}<span className="text-3xl text-slate-400">°C</span>
                </div>
            </div>
        );
    }

    return null;
}
