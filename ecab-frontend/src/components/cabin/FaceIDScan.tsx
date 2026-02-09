'use client';

import { useEffect, useState } from 'react';

export default function FaceIDScan() {
    const [scanState, setScanState] = useState<'scanning' | 'identifying' | 'verified'>('scanning');

    useEffect(() => {
        // Simulation of FaceID process
        const timer1 = setTimeout(() => setScanState('identifying'), 2000);
        const timer2 = setTimeout(() => setScanState('verified'), 4500);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    return (
        <div className="relative w-full h-full min-h-[400px] flex flex-col items-center justify-center">
            {/* Scanner Container */}
            <div className="relative w-64 h-64">
                {/* Face Outline */}
                <div className={`absolute inset-0 border-4 rounded-[3rem] transition-colors duration-500 ${scanState === 'verified' ? 'border-green-400' : 'border-teal-500/30'
                    }`}>
                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-teal-400 rounded-tl-[2.8rem]" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-teal-400 rounded-tr-[2.8rem]" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-teal-400 rounded-bl-[2.8rem]" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-teal-400 rounded-br-[2.8rem]" />
                </div>

                {/* Scanning Beam */}
                {scanState !== 'verified' && (
                    <div className="absolute inset-x-0 h-1/2 bg-gradient-to-b from-teal-400/0 via-teal-400/20 to-teal-400/0 animate-scan"
                        style={{ animationDuration: '2s' }} />
                )}

                {/* Face Icon / Camera Feed Placeholder */}
                <div className="absolute inset-4 rounded-[2.5rem] overflow-hidden bg-black/40 flex items-center justify-center">
                    {scanState === 'verified' ? (
                        <svg className="w-24 h-24 text-green-400 animate-fade-in-up" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    ) : (
                        <svg className="w-32 h-32 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                        </svg>
                    )}
                </div>
            </div>

            {/* Status Text */}
            <div className="mt-8 text-center space-y-2">
                <h3 className="text-xl font-display font-medium text-white">
                    {scanState === 'scanning' && 'Đang quét khuôn mặt...'}
                    {scanState === 'identifying' && 'Đang xác thực...'}
                    {scanState === 'verified' && 'Xác thực thành công'}
                </h3>
                <p className="text-teal-200/60 text-sm">
                    {scanState === 'verified' ? 'Xin chào, Nguyễn Văn A' : 'Vui lòng giữ yên khuôn mặt'}
                </p>
            </div>
        </div>
    );
}
