'use client';

import { useState } from 'react';
import StepLayout from '../layout/StepLayout';

interface HealthReportProps {
    data: {
        symptoms: string[];
        identityMethod: string;
        anonymousInfo: any;
        vitals: {
            bmi: { weight: number; height: number; bmi: number };
            bp: { sys: number; dia: number };
            spo2: { spo2: number; bpm: number };
            temp: number;
        };
    };
    onComplete: () => void;
    onTelehealth: () => void;
    onBack: () => void;
}

export default function HealthReport({ data, onComplete, onTelehealth, onBack }: HealthReportProps) {
    const [isSaving, setIsSaving] = useState(false);
    const [saveMethod, setSaveMethod] = useState<'none' | 'profile' | 'qr'>('none');

    const handleSaveProfile = () => {
        setSaveMethod('profile');
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            onComplete();
        }, 3000);
    };

    const handleSaveQR = () => {
        setSaveMethod('qr');
        setIsSaving(true);
        // Simulate generation
        setTimeout(() => {
            setIsSaving(false);
            onComplete();
        }, 3000);
    };

    const getNurseMessage = () => {
        if (isSaving) {
            if (saveMethod === 'profile') return "Đang đồng bộ dữ liệu vào hồ sơ sức khỏe cá nhân của bạn...";
            if (saveMethod === 'qr') return "Đang tạo mã QR bảo mật cho kết quả khám của bạn...";
        }
        return "Đây là kết quả kiểm tra sức khỏe tổng quát. Vui lòng chọn cách thức lưu trữ hoặc kết nối với bác sĩ nếu cần tư vấn thêm.";
    };

    return (
        <StepLayout
            title="Kết quả Kiểm tra Sức khỏe"
            step={4}
            totalSteps={6}
            nurseMessage={getNurseMessage()}
            onBack={onBack}
        >
            <div className="h-full flex flex-col gap-6 animate-fade-in-up">

                {/* Main Dashboard - Grid Layout */}
                <div className="flex-1 grid grid-cols-12 gap-6 overflow-y-auto pr-2 custom-scrollbar">

                    {/* Left Column: Personal Info & Symptoms (4 cols) */}
                    <div className="col-span-4 space-y-6">
                        {/* ID Card */}
                        <div className="glass-card p-6 bg-gradient-to-br from-teal-900/40 to-black/40">
                            <h3 className="text-slate-400 text-sm uppercase tracking-wider mb-4">Thông tin Hành chính</h3>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                                    <span className="text-2xl">👤</span>
                                </div>
                                <div>
                                    {data.identityMethod === 'anonymous' ? (
                                        <>
                                            <div className="text-xl font-display font-semibold text-white">Khách Ẩn danh</div>
                                            <div className="text-slate-400 text-sm">
                                                {data.anonymousInfo?.gender === 'male' ? 'Nam' : 'Nữ'} • {data.anonymousInfo?.birthYear}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="text-xl font-display font-semibold text-white">Nguyễn Văn A</div>
                                            <div className="text-teal-400 text-sm flex items-center gap-1">
                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                                                Đã xác thực ({data.identityMethod === 'faceid' ? 'FaceID' : 'CCCD'})
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Symptoms Card */}
                        <div className="glass-card p-6">
                            <h3 className="text-slate-400 text-sm uppercase tracking-wider mb-4">Triệu chứng Ghi nhận</h3>
                            <div className="flex flex-wrap gap-2">
                                {data.symptoms.length > 0 ? (
                                    data.symptoms.map((sym, i) => (
                                        <span key={i} className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-300 border border-red-500/20 text-sm font-medium">
                                            {sym}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-slate-500 italic">Không ghi nhận triệu chứng</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Vitals Data (8 cols) */}
                    <div className="col-span-8 space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            {/* BMI Card */}
                            <div className="glass-card p-6 flex flex-col justify-between relative overflow-hidden group hover:border-teal-500/30 transition-all">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-slate-400 text-sm uppercase tracking-wider">BMI (Thể trạng)</h3>
                                    <div className="p-2 rounded-full bg-teal-500/10 text-teal-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                    </div>
                                </div>
                                <div className="flex items-end gap-3 mb-2">
                                    <span className="text-5xl font-display font-bold text-white">{data.vitals?.bmi?.bmi || '--'}</span>
                                    <span className="text-teal-400 font-medium mb-2 bg-teal-500/10 px-2 py-0.5 rounded text-sm">Bình thường</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-slate-400 border-t border-white/5 pt-4">
                                    <span>Cao: <strong className="text-white">{data.vitals?.bmi?.height} cm</strong></span>
                                    <span>•</span>
                                    <span>Nặng: <strong className="text-white">{data.vitals?.bmi?.weight} kg</strong></span>
                                </div>
                            </div>

                            {/* Blood Pressure Card */}
                            <div className="glass-card p-6 flex flex-col justify-between relative overflow-hidden group hover:border-teal-500/30 transition-all">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-slate-400 text-sm uppercase tracking-wider">Huyết áp</h3>
                                    <div className="p-2 rounded-full bg-red-500/10 text-red-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                    </div>
                                </div>
                                <div className="flex items-end gap-2 mb-2">
                                    <span className="text-5xl font-display font-bold text-white">
                                        {data.vitals?.bp?.sys}/{data.vitals?.bp?.dia}
                                    </span>
                                    <span className="text-slate-500 mb-2 text-sm">mmHg</span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-700 rounded-full mt-2 overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-teal-500 to-green-500 w-[60%]" />
                                </div>
                                <div className="flex justify-between text-xs text-slate-500 mt-1">
                                    <span>Thấp</span>
                                    <span>Bình thường</span>
                                    <span>Cao</span>
                                </div>
                            </div>

                            {/* SpO2 Card */}
                            <div className="glass-card p-6 flex flex-col justify-between relative overflow-hidden group hover:border-teal-500/30 transition-all">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-slate-400 text-sm uppercase tracking-wider">SpO2 (Oxy máu)</h3>
                                    <div className="p-2 rounded-full bg-blue-500/10 text-blue-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                                    </div>
                                </div>
                                <div className="flex items-end gap-3 mb-2">
                                    <span className="text-5xl font-display font-bold text-teal-400">{data.vitals?.spo2?.spo2}%</span>
                                </div>
                                <div className="mt-2 flex items-center gap-2 text-slate-400 text-sm">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    Nhịp tim: <strong className="text-white">{data.vitals?.spo2?.bpm} BPM</strong>
                                </div>
                            </div>

                            {/* Temp Card */}
                            <div className="glass-card p-6 flex flex-col justify-between relative overflow-hidden group hover:border-teal-500/30 transition-all">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-slate-400 text-sm uppercase tracking-wider">Thân nhiệt</h3>
                                    <div className="p-2 rounded-full bg-orange-500/10 text-orange-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                    </div>
                                </div>
                                <div className="flex items-end gap-2 mb-2">
                                    <span className="text-5xl font-display font-bold text-white">{data.vitals?.temp}</span>
                                    <span className="text-slate-500 mb-2 text-2xl">°C</span>
                                </div>
                                <div className="mt-2 text-sm text-green-400 bg-green-500/10 px-2 py-1 rounded inline-block w-fit">
                                    Bình thường
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Footer */}
                <div className="h-24 glass-card p-4 flex items-center justify-between gap-6 shrink-0 relative z-10">
                    {isSaving ? (
                        <div className="w-full flex flex-col items-center justify-center animate-fade-in-up">
                            <div className="w-8 h-8 rounded-full border-2 border-teal-500 border-t-transparent animate-spin mb-2" />
                            <span className="text-white text-lg font-medium">Đang xử lý dữ liệu...</span>
                        </div>
                    ) : (
                        <>
                            <div className="flex-1">
                                <p className="text-slate-400 text-sm">Bằng việc lưu kết quả, bạn đồng ý với <span className="text-teal-400 underline cursor-pointer">Chính sách bảo mật dữ liệu</span>.</p>
                            </div>

                            <div className="flex gap-4">
                                {/* Telehealth Connect */}
                                <button
                                    onClick={onTelehealth}
                                    className="px-8 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-all flex items-center gap-3 shadow-lg shadow-indigo-500/30 mr-auto"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                    Kết nối Bác sĩ
                                </button>

                                {/* Option 2: QR Code */}
                                <button
                                    onClick={handleSaveQR}
                                    className="px-8 py-3 rounded-full border border-white/20 hover:bg-white/5 hover:border-white/40 text-white font-medium transition-all flex items-center gap-3"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4h2v-4zm-6 0H6.4M6 20h.2M6 4h.2M20 20h.2M18 10h.2" /></svg>
                                    Lưu QR Code (Ẩn danh)
                                </button>

                                {/* Option 1: Profile */}
                                <button
                                    onClick={handleSaveProfile}
                                    className="btn-primary py-3 px-8 text-lg flex items-center gap-3 !shadow-lg"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    Lưu vào Hồ sơ Cá nhân
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </StepLayout>
    );
}
