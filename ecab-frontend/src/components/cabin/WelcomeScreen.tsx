'use client';

import { useState, useEffect, useCallback } from 'react';
import ParticleBackground from '../ui/ParticleBackground';
import CameraDetection from './CameraDetection';
import AINurseAvatar from './AINurseAvatar';

type WelcomeState = 'standby' | 'detecting' | 'greeting' | 'ready';

interface WelcomeScreenProps {
    onStart?: () => void;
}

const GREETING_MESSAGES = [
    "Xin chào! Chào mừng bạn đến với Cabin Sức khỏe Thông minh.",
    "Tôi là trợ lý AI của bạn. Hãy để tôi hướng dẫn bạn kiểm tra sức khỏe hôm nay.",
];

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
    const [state, setState] = useState<WelcomeState>('standby');
    const [currentMessage, setCurrentMessage] = useState<string>('');
    const [messageIndex, setMessageIndex] = useState(0);

    // Auto-start detection after initial load
    useEffect(() => {
        const timer = setTimeout(() => {
            setState('detecting');
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    // Handle user detected
    const handleUserDetected = useCallback(() => {
        setState('greeting');
        setCurrentMessage(GREETING_MESSAGES[0]);
    }, []);

    // Cycle through greeting messages
    useEffect(() => {
        if (state === 'greeting') {
            const interval = setInterval(() => {
                setMessageIndex((prev) => {
                    const next = prev + 1;
                    if (next >= GREETING_MESSAGES.length) {
                        setState('ready');
                        return prev;
                    }
                    setCurrentMessage(GREETING_MESSAGES[next]);
                    return next;
                });
            }, 4000);
            return () => clearInterval(interval);
        }
    }, [state]);

    // Handle start button click
    const handleStart = () => {
        if (onStart) {
            onStart();
        } else {
            // Navigate to step 2 - placeholder for now
            alert('Chuyển sang Bước 2: Sàng lọc Thông tin Sức khỏe');
        }
    };

    return (
        <div className="kiosk-container relative flex flex-col">
            {/* Gradient Mesh Background */}
            <div className="gradient-mesh" />

            {/* Particle Animation */}
            <ParticleBackground />

            {/* Header */}
            <header className="relative z-10 pt-12 px-10">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-lg">
                            <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.06-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93H13v-.93zM13 7h5.24c.25.31.48.65.68 1H13V7zm0 3h6.74c.08.33.15.66.19 1H13v-1zm0 9.93V19h2.87c-.87.48-1.84.8-2.87.93zM18.24 17H13v-1h5.92c-.2.35-.43.69-.68 1zm1.5-3H13v-1h6.93c-.04.34-.11.67-.19 1z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="font-display text-2xl font-semibold text-white">E-Citizen</h1>
                            <p className="text-teal-300 text-sm">Health Cabin</p>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="status-indicator">
                        <div className="status-dot" />
                        <span className="text-sm text-white/80">Hệ thống sẵn sàng</span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-10 py-8">
                {/* Welcome Title */}
                <div className="text-center mb-10 space-y-4">
                    {state === 'standby' && (
                        <div className="animate-fade-in-up">
                            <h2 className="welcome-title">Xin chào!</h2>
                            <p className="welcome-subtitle mt-4">Vui lòng đến gần để bắt đầu</p>
                        </div>
                    )}

                    {state === 'detecting' && (
                        <div className="animate-fade-in-up">
                            <h2 className="welcome-title">Đang nhận diện...</h2>
                            <p className="welcome-subtitle mt-4">Vui lòng đứng trước camera</p>
                        </div>
                    )}

                    {(state === 'greeting' || state === 'ready') && (
                        <div className="animate-fade-in-up">
                            <h2 className="welcome-title">Chào mừng bạn!</h2>
                            <p className="welcome-subtitle mt-4">
                                Cabin Sức khỏe Thông minh E-Citizen
                            </p>
                        </div>
                    )}
                </div>

                {/* Camera View */}
                <div className="w-full max-w-md mb-8">
                    <CameraDetection
                        state={state === 'standby' ? 'standby' : state === 'detecting' ? 'detecting' : 'detected'}
                        onUserDetected={handleUserDetected}
                    />
                </div>

                {/* Start Button - Only show when ready */}
                {state === 'ready' && (
                    <div className="animate-fade-in-up">
                        <button onClick={handleStart} className="btn-primary flex items-center gap-4">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            Bắt Đầu Khám Sức Khỏe
                        </button>
                    </div>
                )}
            </main>

            {/* AI Nurse Avatar */}
            <AINurseAvatar
                isSpeaking={state === 'greeting'}
                speechText={state === 'greeting' ? currentMessage : undefined}
            />

            {/* Footer */}
            <footer className="relative z-10 pb-8 px-10">
                <div className="flex items-center justify-center gap-2 text-white/40 text-sm">
                    <span>Powered by</span>
                    <span className="font-semibold text-white/60">GoTRUST</span>
                    <span>•</span>
                    <span>AI Healthcare</span>
                </div>
            </footer>
        </div>
    );
}
