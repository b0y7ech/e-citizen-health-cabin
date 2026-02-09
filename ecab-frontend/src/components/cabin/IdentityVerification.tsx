'use client';

import { useState } from 'react';
import StepLayout from '../layout/StepLayout';
import FaceIDScan from './FaceIDScan';
import CCCDScan from './CCCDScan';

interface IdentityVerificationProps {
    onComplete: (method: string, data?: any) => void;
    onBack: () => void;
}

type Method = 'select' | 'faceid' | 'cccd';

export default function IdentityVerification({ onComplete, onBack }: IdentityVerificationProps) {
    const [method, setMethod] = useState<Method>('select');
    const [showAnonymousForm, setShowAnonymousForm] = useState(false);
    const [anonymousData, setAnonymousData] = useState({ gender: '', birthYear: '' });

    const getNurseMessage = () => {
        if (showAnonymousForm) return "Để kết quả đo chính xác, vui lòng cung cấp thông tin Năm sinh và Giới tính.";
        switch (method) {
            case 'faceid': return "Vui lòng nhìn thẳng vào camera và giữ yên khuôn mặt.";
            case 'cccd': return "Đặt thẻ CCCD vào khay đọc phía dưới màn hình.";
            default: return "Vui lòng chọn phương thức xác thực để lưu kết quả vào Hồ sơ sức khỏe.";
        }
    };

    const handleSimulatedSuccess = () => {
        setTimeout(() => {
            onComplete(method);
        }, 5000);
    };

    const handleAnonymousComplete = () => {
        onComplete('anonymous', anonymousData);
    };

    const handleBack = () => {
        if (showAnonymousForm) {
            setShowAnonymousForm(false);
            return;
        }
        if (method !== 'select') {
            setMethod('select');
            return;
        }
        onBack();
    };

    return (
        <StepLayout
            title="Xác thực Danh tính"
            step={2}
            totalSteps={2}
            nurseMessage={getNurseMessage()}
            onBack={handleBack}
        >
            <div className="h-full grid grid-cols-12 gap-8">

                {/* Content Area - Changed to span-9 to give more space, avoiding right corner */}
                <div className="col-span-9 h-full flex flex-col justify-center pl-12 pr-12">

                    {method === 'select' && !showAnonymousForm && (
                        <div className="w-full flex flex-col items-center justify-center animate-fade-in-up space-y-12">

                            {/* Cards Container - Centered */}
                            <div className="flex gap-10 justify-center w-full">
                                {/* FaceID Option */}
                                <button
                                    onClick={() => { setMethod('faceid'); handleSimulatedSuccess(); }}
                                    className="group relative w-80 h-96 glass-card p-10 flex flex-col items-center justify-center text-center transition-all duration-300 hover:bg-white/10 hover:-translate-y-2 border-2 border-transparent hover:border-teal-400"
                                >
                                    <div className="w-32 h-32 rounded-full bg-teal-500/20 flex items-center justify-center mb-8 border-2 border-teal-500/30 group-hover:bg-teal-500/30 group-hover:border-teal-400 shadow-[0_0_30px_rgba(20,184,166,0.1)]">
                                        <svg className="w-16 h-16 text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-3xl font-display font-bold text-white mb-3 tracking-wide">FaceID</h3>
                                    <p className="text-slate-300 text-lg leading-relaxed">Quét khuôn mặt nhanh chóng<br />(Đã đăng ký)</p>

                                    {/* Status Indicator */}
                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                        <span className="text-green-400 text-sm">Sẵn sàng</span>
                                    </div>
                                </button>

                                {/* CCCD Option */}
                                <button
                                    onClick={() => { setMethod('cccd'); handleSimulatedSuccess(); }}
                                    className="group relative w-80 h-96 glass-card p-10 flex flex-col items-center justify-center text-center transition-all duration-300 hover:bg-white/10 hover:-translate-y-2 border-2 border-transparent hover:border-gold-400"
                                >
                                    <div className="w-32 h-32 rounded-full bg-orange-500/20 flex items-center justify-center mb-8 border-2 border-orange-500/30 group-hover:bg-orange-500/30 group-hover:border-orange-400 shadow-[0_0_30px_rgba(249,115,22,0.1)]">
                                        <svg className="w-16 h-16 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-3xl font-display font-bold text-white mb-3 tracking-wide">CCCD Gắn Chip</h3>
                                    <p className="text-slate-300 text-lg leading-relaxed">Quét thẻ Căn cước công dân<br />(NFC Reader)</p>
                                </button>
                            </div>

                            {/* Skip Option - Centered and Larger */}
                            <div className="pt-8">
                                <button
                                    onClick={() => setShowAnonymousForm(true)}
                                    className="group flex items-center gap-4 px-8 py-4 rounded-full border border-slate-600 hover:bg-white/10 hover:border-white/40 transition-all"
                                >
                                    <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center group-hover:bg-teal-500 group-hover:text-black transition-colors">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                    <span className="text-xl text-slate-300 group-hover:text-white font-medium">Bỏ qua quá trình định danh</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Anonymous Form - Larger and Centered */}
                    {showAnonymousForm && (
                        <div className="w-full max-w-2xl mx-auto bg-glass-bg border border-glass-border rounded-[2rem] p-10 animate-fade-in-up shadow-2xl backdrop-blur-xl">
                            <div className="mb-8 text-center">
                                <h4 className="text-3xl font-display font-bold text-white mb-2">Chế độ Khám Ẩn danh</h4>
                                <p className="text-slate-400 text-xl">Cung cấp thông tin cơ bản cho AI Nurse</p>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <label className="block text-lg font-medium text-slate-300 mb-4 ml-1">Giới tính</label>
                                    <div className="flex gap-6">
                                        <button
                                            onClick={() => setAnonymousData(prev => ({ ...prev, gender: 'male' }))}
                                            className={`flex-1 py-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${anonymousData.gender === 'male'
                                                    ? 'bg-teal-500/20 border-teal-500 text-white shadow-[0_0_20px_rgba(45,212,191,0.2)]'
                                                    : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:border-white/20'
                                                }`}
                                        >
                                            <span className="text-4xl">👨</span>
                                            <span className="text-2xl font-medium">Nam</span>
                                        </button>
                                        <button
                                            onClick={() => setAnonymousData(prev => ({ ...prev, gender: 'female' }))}
                                            className={`flex-1 py-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${anonymousData.gender === 'female'
                                                    ? 'bg-teal-500/20 border-teal-500 text-white shadow-[0_0_20px_rgba(45,212,191,0.2)]'
                                                    : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:border-white/20'
                                                }`}
                                        >
                                            <span className="text-4xl">👩</span>
                                            <span className="text-2xl font-medium">Nữ</span>
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-lg font-medium text-slate-300 mb-4 ml-1">Năm sinh</label>
                                    <div className="relative">
                                        <select
                                            value={anonymousData.birthYear}
                                            onChange={(e) => setAnonymousData(prev => ({ ...prev, birthYear: e.target.value }))}
                                            className="w-full bg-black/40 border border-white/20 rounded-2xl px-8 py-5 text-white text-2xl focus:outline-none focus:border-teal-500 appearance-none cursor-pointer hover:bg-black/50 transition-colors"
                                        >
                                            <option value="">Chọn năm sinh</option>
                                            {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(year => (
                                                <option key={year} value={year}>{year}</option>
                                            ))}
                                        </select>
                                        <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleAnonymousComplete()}
                                    disabled={!anonymousData.gender || !anonymousData.birthYear}
                                    className={`w-full btn-primary mt-8 py-5 text-2xl flex items-center justify-center gap-4 shadow-xl transform active:scale-95 transition-all ${(!anonymousData.gender || !anonymousData.birthYear) ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:scale-[1.02]'
                                        }`}
                                >
                                    <span>Bắt đầu đo sinh hiệu</span>
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Simulation Views - Centered and Large */}
                    {method === 'faceid' && (
                        <div className="w-full max-w-2xl mx-auto aspect-[3/4] animate-fade-in-up">
                            <div className="glass-card w-full h-full p-2 overflow-hidden shadow-2xl border-teal-500/30">
                                <FaceIDScan />
                            </div>
                        </div>
                    )}
                    {method === 'cccd' && (
                        <div className="w-full max-w-3xl mx-auto aspect-video animate-fade-in-up">
                            <div className="glass-card w-full h-full p-8 flex items-center justify-center shadow-2xl border-orange-500/30">
                                <CCCDScan />
                            </div>
                        </div>
                    )}

                </div>

                {/* Right Area - Reserved for Nurse */}
                <div className="col-span-3"></div>

            </div>
        </StepLayout>
    );
}
