'use client';

import { useState } from 'react';

export default function CCCDScan() {
    const [isAnimationPlaying, setIsAnimationPlaying] = useState(true);

    return (
        <div className="relative w-full h-full min-h-[400px] flex flex-col items-center justify-center">
            {/* Card Reader Illustration */}
            <div className="relative w-80 h-48 bg-slate-800/80 rounded-2xl border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden transform rotate-x-12 perspective-1000">
                <div className="absolute top-4 left-4 right-4 h-8 bg-black/40 rounded-md" />

                {/* Card Insert Animation */}
                <div className="absolute w-40 h-24 bg-gradient-to-br from-blue-300 to-blue-500 rounded-lg shadow-lg flex items-center justify-center animate-pulse z-10"
                    style={{
                        animation: 'card-insert 3s ease-in-out infinite',
                        top: '60%'
                    }}>
                    <div className="w-8 h-8 bg-yellow-400/80 rounded" />
                    <div className="absolute bottom-2 left-2 right-2 h-1 bg-white/30 rounded" />
                    <div className="absolute bottom-4 left-2 w-12 h-1 bg-white/30 rounded" />
                </div>

                {/* Scanning Light */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-400/20 to-transparent w-[200%] animate-scan-horizontal" style={{ animationDuration: '2s' }} />
            </div>

            {/* Instructions */}
            <div className="mt-10 text-center space-y-3 max-w-sm">
                <h3 className="text-xl font-display font-medium text-white">Đặt thẻ CCCD vào đầu đọc</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                    Vui lòng đặt mặt sau của thẻ CCCD gắn chip vào khu vực đầu đọc phía dưới màn hình.
                </p>

                <div className="pt-4 flex justify-center gap-4">
                    <div className="flex items-center gap-2 text-xs text-teal-300/80 bg-teal-900/30 px-3 py-1.5 rounded-full border border-teal-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                        Đang chờ thẻ...
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes card-insert {
          0% { transform: translateY(40px) scale(0.9); opacity: 0; }
          20% { transform: translateY(0) scale(1); opacity: 1; }
          80% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-40px) scale(0.9); opacity: 0; }
        }
        @keyframes scan-horizontal {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(50%); }
        }
        .animate-scan-horizontal {
          animation: scan-horizontal 2s linear infinite;
        }
      `}</style>
        </div>
    );
}
