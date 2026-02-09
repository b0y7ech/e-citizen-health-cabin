'use client';

import { ReactNode } from 'react';
import AINurseAvatar from '../cabin/AINurseAvatar';

interface StepLayoutProps {
    children: ReactNode;
    title: string;
    step: number;
    totalSteps?: number;
    nurseMessage?: string;
    onBack?: () => void;
    showNurse?: boolean;
}

export default function StepLayout({
    children,
    title,
    step,
    totalSteps = 3,
    nurseMessage,
    onBack,
    showNurse = true,
}: StepLayoutProps) {
    return (
        <div className="kiosk-container relative flex flex-col bg-slate-900/90">
            {/* Background Gradient Mesh */}
            <div className="gradient-mesh opacity-40" />

            {/* Header */}
            <header className="relative z-10 pt-8 px-10 pb-4 flex items-center justify-between border-b border-white/10 bg-black/20 backdrop-blur-md">
                <div className="flex items-center gap-6">
                    {onBack && (
                        <button
                            onClick={onBack}
                            className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                        >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}

                    <div>
                        <h1 className="font-display text-2xl font-semibold text-white tracking-wide">{title}</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="flex gap-1">
                                {[...Array(totalSteps)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${i + 1 === step
                                                ? 'w-8 bg-teal-400'
                                                : i + 1 < step
                                                    ? 'w-4 bg-teal-600'
                                                    : 'w-4 bg-white/20'
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-xs text-teal-200/60 font-medium ml-2">
                                Bước {step}/{totalSteps}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="status-indicator py-1.5 px-4">
                    <div className="status-dot w-2 h-2" />
                    <span className="text-xs text-white/80">Hệ thống đang hoạt động</span>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 flex-1 overflow-hidden p-8">
                <div className="h-full flex flex-col">
                    {children}
                </div>
            </main>

            {/* AI Nurse Avatar - Persistent Position */}
            {showNurse && (
                <div className="absolute right-8 bottom-8 z-20 transition-all duration-500 transform translate-y-0">
                    <div className="relative transform scale-75 origin-bottom-right">
                        <AINurseAvatar
                            isSpeaking={!!nurseMessage}
                            speechText={nurseMessage}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
