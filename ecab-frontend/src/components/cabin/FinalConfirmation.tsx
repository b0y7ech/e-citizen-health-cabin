'use client';

import { useEffect, useState } from 'react';

interface FinalConfirmationProps {
    onReset: () => void;
}

export default function FinalConfirmation({ onReset }: FinalConfirmationProps) {
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    onReset();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [onReset]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl animate-fade-in-up">
            <div className="flex flex-col items-center text-center p-12 max-w-2xl">

                {/* Success Icon */}
                <div className="w-32 h-32 rounded-full bg-teal-500/20 border-2 border-teal-500 flex items-center justify-center mb-8 animate-pulse-ring">
                    <svg className="w-16 h-16 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h2 className="text-5xl font-display font-bold text-white mb-4">Hoàn tất!</h2>
                <p className="text-xl text-slate-300 mb-12 leading-relaxed">
                    Kết quả kiểm tra sức khỏe đã được lưu trữ thành công.<br />
                    Cảm ơn bạn đã sử dụng dịch vụ <strong>E-Citizen Health Cabin</strong>.
                </p>

                <button
                    onClick={onReset}
                    className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
                >
                    Kết thúc phiên làm việc ngay ({countdown}s)
                </button>
            </div>
        </div>
    );
}
