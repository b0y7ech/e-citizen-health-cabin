'use client';

import { useState, useEffect, useRef } from 'react';

interface CameraDetectionProps {
    onUserDetected?: () => void;
    isActive?: boolean;
    state: 'standby' | 'detecting' | 'detected';
}

export default function CameraDetection({ onUserDetected, isActive = true, state }: CameraDetectionProps) {
    const [scanPosition, setScanPosition] = useState(0);

    useEffect(() => {
        if (state === 'detecting') {
            const interval = setInterval(() => {
                setScanPosition(prev => (prev + 1) % 100);
            }, 30);
            return () => clearInterval(interval);
        }
    }, [state]);

    // Simulate user detection after 3 seconds for demo
    useEffect(() => {
        if (state === 'detecting' && onUserDetected) {
            const timeout = setTimeout(() => {
                onUserDetected();
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [state, onUserDetected]);

    return (
        <div className="camera-view relative w-full aspect-[3/4] max-h-[500px]">
            {/* Camera Feed Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800/60 to-slate-900/80 flex items-center justify-center">
                {state === 'standby' && (
                    <div className="text-center space-y-4">
                        <div className="w-24 h-24 mx-auto rounded-full border-4 border-dashed border-teal-400/40 flex items-center justify-center">
                            <svg className="w-12 h-12 text-teal-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <p className="text-teal-400/60 text-lg">Camera đang chờ...</p>
                    </div>
                )}

                {state === 'detecting' && (
                    <>
                        {/* Scan Line */}
                        <div
                            className="absolute left-4 right-4 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent"
                            style={{ top: `${scanPosition}%`, opacity: 0.8 }}
                        />

                        {/* Corner Brackets */}
                        <div className="absolute inset-8">
                            {/* Top Left */}
                            <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-teal-400 rounded-tl-lg" />
                            {/* Top Right */}
                            <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-teal-400 rounded-tr-lg" />
                            {/* Bottom Left */}
                            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-teal-400 rounded-bl-lg" />
                            {/* Bottom Right */}
                            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-teal-400 rounded-br-lg" />
                        </div>

                        {/* Center Target */}
                        <div className="relative">
                            <div className="w-32 h-32 border-2 border-teal-400 rounded-full animate-pulse-ring" />
                            <div className="absolute inset-0 w-32 h-32 border-2 border-teal-400/50 rounded-full animate-pulse-ring" style={{ animationDelay: '0.5s' }} />
                        </div>

                        <p className="absolute bottom-8 left-0 right-0 text-center text-teal-300 text-xl font-medium">
                            Đang tìm kiếm người dùng...
                        </p>
                    </>
                )}

                {state === 'detected' && (
                    <div className="text-center space-y-4 animate-fade-in-up">
                        <div className="w-32 h-32 mx-auto rounded-full border-4 border-green-400 bg-green-400/20 flex items-center justify-center">
                            <svg className="w-16 h-16 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <p className="text-green-300 text-2xl font-semibold">Đã phát hiện người dùng!</p>
                    </div>
                )}
            </div>

            {/* Overlay Border */}
            <div className={`camera-overlay ${state === 'detecting' ? 'detecting' : ''}`} />
        </div>
    );
}
