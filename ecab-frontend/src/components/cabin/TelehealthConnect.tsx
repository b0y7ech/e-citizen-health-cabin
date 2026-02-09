'use client';

import { useState, useEffect } from 'react';
import StepLayout from '../layout/StepLayout';

interface TelehealthConnectProps {
    onComplete: (prescription: any) => void;
    onBack: () => void;
}

export default function TelehealthConnect({ onComplete, onBack }: TelehealthConnectProps) {
    const [status, setStatus] = useState<'waiting' | 'connecting' | 'active' | 'ended'>('waiting');
    const [callDuration, setCallDuration] = useState(0);

    // Simulate connection flow
    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (status === 'waiting') {
            timer = setTimeout(() => setStatus('connecting'), 3000); // Wait 3s
        } else if (status === 'connecting') {
            timer = setTimeout(() => setStatus('active'), 2000); // Connect after 2s
        }

        return () => clearTimeout(timer);
    }, [status]);

    // Simulate call timer
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (status === 'active') {
            interval = setInterval(() => setCallDuration(prev => prev + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [status]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleEndCall = () => {
        setStatus('ended');
        // Simulate prescription data
        const mockPrescription = {
            doctor: "BS.CKII Nguyễn Văn B",
            diagnosis: "Tăng huyết áp độ 1, Rối loạn lipid máu",
            medications: [
                { name: "Amlodipine 5mg", dosage: "1 viên/sáng", quantity: 30, price: 85000 },
                { name: "Atorvastatin 10mg", dosage: "1 viên/tối", quantity: 30, price: 120000 },
            ],
            totalAmount: 205000
        };
        setTimeout(() => onComplete(mockPrescription), 1000);
    };

    const getNurseMessage = () => {
        if (status === 'waiting') return "Đang kết nối với bác sĩ chuyên khoa phù hợp nhất với tình trạng của bạn...";
        if (status === 'connecting') return "Đã tìm thấy Bác sĩ. Đang thiết lập kênh video an toàn...";
        if (status === 'active') return "Cuộc gọi đang diễn ra. Micrô và Camera của bạn đang hoạt động.";
        return "Cuộc tư vấn đã kết thúc. Đang lấy đơn thuốc từ bác sĩ...";
    };

    return (
        <StepLayout
            title="Tư vấn Trực tuyến (Telehealth)"
            step={5}
            totalSteps={6}
            nurseMessage={getNurseMessage()}
            onBack={onBack}
        >
            <div className="h-full flex flex-col animate-fade-in-up">

                {/* Main Content Area */}
                <div className="flex-1 relative rounded-3xl overflow-hidden bg-black/40 border border-white/10 shadow-2xl">

                    {/* WAITING STATE */}
                    {status === 'waiting' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="w-24 h-24 rounded-full border-4 border-teal-500/30 border-t-teal-500 animate-spin mb-8" />
                            <h3 className="text-2xl font-display font-medium text-white mb-2">Đang tìm bác sĩ...</h3>
                            <p className="text-slate-400">Vui lòng đợi trong giây lát, AI đang phân tích hồ sơ của bạn.</p>
                        </div>
                    )}

                    {/* CONNECTING STATE */}
                    {status === 'connecting' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-teal-900/20 backdrop-blur-sm">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 mb-6 shadow-2xl">
                                <img src="https://ui-avatars.com/api/?name=Nguyen+Van+B&background=0D9488&color=fff&size=128" alt="Doctor" className="w-full h-full object-cover" />
                            </div>
                            <h3 className="text-3xl font-display font-bold text-white mb-1">BS.CKII Nguyễn Văn B</h3>
                            <p className="text-teal-300 font-medium text-lg">Chuyên khoa Tim mạch - Bệnh viện ĐH Y Dược</p>
                            <div className="mt-8 flex items-center gap-3 px-6 py-2 rounded-full bg-black/40 border border-white/10">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-white text-sm">Đang kết nối...</span>
                            </div>
                        </div>
                    )}

                    {/* ACTIVE CALL STATE */}
                    {status === 'active' && (
                        <div className="absolute inset-0">
                            {/* Doctor Video Feed (Simulated Layer) */}
                            <div className="w-full h-full bg-slate-800 flex items-center justify-center relative">
                                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 pointer-events-none" />

                                {/* Placeholder for Simulated Doctor Video - Using generic medical bg for now */}
                                <div className="text-white/20 text-9xl">👨‍⚕️</div>

                                {/* Real-time Status Overlay */}
                                <div className="absolute top-8 left-8 flex items-center gap-4">
                                    <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-black/40 backdrop-blur border border-white/10">
                                        <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                                        <span className="text-white font-mono">{formatTime(callDuration)}</span>
                                    </div>
                                    <div className="px-4 py-2 rounded-full bg-black/40 backdrop-blur border border-white/10">
                                        <span className="text-slate-300 text-sm">BS.CKII Nguyễn Văn B</span>
                                    </div>
                                </div>

                                {/* Patient PIP (Picture-in-Picture) */}
                                <div className="absolute top-8 right-8 w-48 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl bg-black">
                                    <div className="w-full h-full bg-slate-700 flex items-center justify-center text-white/50">
                                        <span className="text-4xl">👤</span>
                                    </div>
                                    {/* Scan lines overlay for tech feel */}
                                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[length:100%_2px,3px_100%]" />
                                </div>
                            </div>

                            {/* Call Controls */}
                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6">
                                <button className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur flex items-center justify-center text-white transition-all">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                                </button>
                                <button
                                    onClick={handleEndCall}
                                    className="w-20 h-20 rounded-full bg-red-500 hover:bg-red-600 shadow-[0_0_30px_rgba(239,68,68,0.4)] flex items-center justify-center text-white transition-all transform hover:scale-105"
                                >
                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" /></svg>
                                </button>
                                <button className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur flex items-center justify-center text-white transition-all">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </StepLayout>
    );
}
