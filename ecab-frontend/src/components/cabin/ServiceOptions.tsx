'use client';

import { useState } from 'react';
import StepLayout from '../layout/StepLayout';

interface Prescription {
    doctor: string;
    diagnosis: string;
    medications: Array<{
        name: string;
        dosage: string;
        quantity: number;
        price: number;
    }>;
    totalAmount: number;
}

interface ServiceOptionsProps {
    prescription: Prescription;
    onComplete: () => void;
    onBack: () => void;
}

export default function ServiceOptions({ prescription, onComplete, onBack }: ServiceOptionsProps) {
    const [activeTab, setActiveTab] = useState<'pharmacy' | 'booking'>('pharmacy');
    const [showPayment, setShowPayment] = useState(false);

    // Format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const getNurseMessage = () => {
        if (showPayment) return "Vui lòng quét mã QR để thanh toán. Đơn thuốc sẽ được giao đến địa chỉ của bạn trong 2 giờ.";
        if (activeTab === 'pharmacy') return "Bác sĩ đã kê đơn thuốc điện tử. Bạn có thể đặt mua và giao thuốc tận nhà ngay tại đây.";
        return "Nếu cần khám chuyên sâu, tôi có thể giúp bạn đặt lịch hẹn ưu tiên tại các bệnh viện liên kết.";
    };

    return (
        <StepLayout
            title="Dịch vụ & Tiện ích"
            step={6}
            totalSteps={6}
            nurseMessage={getNurseMessage()}
            onBack={showPayment ? () => setShowPayment(false) : onBack}
        >
            <div className="h-full flex flex-col gap-6 animate-fade-in-up">

                {/* Navigation Tabs */}
                {!showPayment && (
                    <div className="flex p-1 bg-black/30 rounded-full w-fit mx-auto border border-white/10">
                        <button
                            onClick={() => setActiveTab('pharmacy')}
                            className={`px-8 py-3 rounded-full text-lg font-medium transition-all ${activeTab === 'pharmacy' ? 'bg-teal-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            💊 Đơn thuốc & Giao hàng
                        </button>
                        <button
                            onClick={() => setActiveTab('booking')}
                            className={`px-8 py-3 rounded-full text-lg font-medium transition-all ${activeTab === 'booking' ? 'bg-teal-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            🏥 Đặt lịch khám
                        </button>
                    </div>
                )}

                <div className="flex-1 overflow-hidden relative">
                    {/* Tab Content: Pharmacy */}
                    {activeTab === 'pharmacy' && !showPayment && (
                        <div className="h-full grid grid-cols-12 gap-8">
                            {/* Prescription View */}
                            <div className="col-span-8 animate-fade-in-up">
                                <div className="glass-card h-full flex flex-col p-0 overflow-hidden">
                                    <div className="p-6 border-b border-white/10 bg-white/5 flex justify-between items-center">
                                        <div>
                                            <h3 className="text-xl font-display font-semibold text-white">Đơn thuốc Điện tử</h3>
                                            <p className="text-teal-400 text-sm">Kê bởi {prescription.doctor}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-slate-400 text-xs uppercase tracking-wider">Chẩn đoán</span>
                                            <p className="text-white font-medium">{prescription.diagnosis}</p>
                                        </div>
                                    </div>

                                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                        {prescription.medications.map((med, idx) => (
                                            <div key={idx} className="flex justify-between items-center p-4 rounded-xl bg-black/20 border border-white/5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-400 font-bold">
                                                        {idx + 1}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-lg font-medium text-white">{med.name}</h4>
                                                        <p className="text-slate-400 text-sm">{med.dosage}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-white font-bold">{formatCurrency(med.price)}</p>
                                                    <p className="text-slate-500 text-sm">SL: {med.quantity}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-6 border-t border-white/10 bg-white/5">
                                        <div className="flex justify-between items-center mb-6">
                                            <span className="text-slate-300 text-lg">Tổng thanh toán</span>
                                            <span className="text-3xl font-display font-bold text-teal-400">{formatCurrency(prescription.totalAmount)}</span>
                                        </div>
                                        <button
                                            onClick={() => setShowPayment(true)}
                                            className="w-full btn-primary py-4 text-xl flex items-center justify-center gap-3"
                                        >
                                            Thanh toán & Giao ngay (2h)
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Pharmacy Partners */}
                            <div className="col-span-4 space-y-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                                <div className="glass-card p-6">
                                    <h3 className="text-slate-300 mb-4 font-medium">Đối tác cung ứng</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-600/20 border border-blue-500/40 cursor-pointer hover:bg-blue-600/30 transition-all">
                                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                                                <span className="text-blue-600 font-bold text-xs">LC</span>
                                            </div>
                                            <div>
                                                <h4 className="text-white font-medium">Nhà thuốc Long Châu</h4>
                                                <p className="text-green-400 text-xs flex items-center gap-1">
                                                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                                    Có sẵn • Giao 30p
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 opacity-60">
                                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                                                <span className="text-green-600 font-bold text-xs">PM</span>
                                            </div>
                                            <div>
                                                <h4 className="text-white font-medium">Pharmacity</h4>
                                                <p className="text-slate-400 text-xs">Hết hàng một số loại</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Payment View */}
                    {showPayment && (
                        <div className="h-full flex items-center justify-center animate-fade-in-up">
                            <div className="glass-card p-8 max-w-4xl w-full grid grid-cols-2 gap-12 items-center relative">
                                <button
                                    onClick={() => setShowPayment(false)}
                                    className="absolute top-4 left-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                </button>

                                <div className="text-center">
                                    <h3 className="text-2xl font-display font-medium text-white mb-2">Thanh toán Đơn thuốc</h3>
                                    <p className="text-slate-400 mb-8">Sử dụng App Ngân hàng hoặc Ví điện tử</p>

                                    <div className="bg-white p-4 rounded-2xl inline-block shadow-2xl">
                                        {/* Placeholder QR */}
                                        <div className="w-64 h-64 bg-slate-100 flex items-center justify-center rounded-lg">
                                            <svg className="w-full h-full text-slate-800" viewBox="0 0 100 100" fill="currentColor">
                                                <path d="M10 10h30v30h-30zM50 10h10v10h-10zM70 10h20v20h-20zM10 50h20v20h-20zM10 80h10v10h-10z" opacity="0.8" />
                                                <text x="50" y="55" fontSize="10" textAnchor="middle" fill="#000">VIETQR MOCK</text>
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex justify-center gap-4">
                                        <img src="https://img.icons8.com/color/48/mo-mo.png" alt="Momo" className="w-8 h-8 opacity-80" />
                                        <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="w-8 h-8 opacity-80" />
                                        <img src="https://img.icons8.com/color/48/mastercard.png" alt="Mastercard" className="w-8 h-8 opacity-80" />
                                    </div>
                                </div>

                                <div className="space-y-6 border-l border-white/10 pl-12">
                                    <div>
                                        <span className="text-slate-400 text-sm">Người nhận</span>
                                        <p className="text-white text-lg font-medium">Nguyễn Văn A</p>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 text-sm">Địa chỉ giao hàng</span>
                                        <p className="text-white text-lg font-medium">32/5 Lê Duẩn, Quận 1, TP.HCM</p>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 text-sm">Tổng thanh toán</span>
                                        <p className="text-3xl text-teal-400 font-bold">{formatCurrency(prescription.totalAmount)}</p>
                                    </div>

                                    <button
                                        onClick={onComplete}
                                        className="w-full btn-primary py-4 mt-4"
                                    >
                                        Đã thanh toán xong
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Booking View (Simplified) */}
                    {activeTab === 'booking' && (
                        <div className="h-full flex items-center justify-center animate-fade-in-up">
                            <div className="text-center p-12 glass-card max-w-2xl">
                                <div className="w-24 h-24 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-4xl">🏥</span>
                                </div>
                                <h3 className="text-2xl text-white font-medium mb-4">Tính năng Đặt lịch đang phát triển</h3>
                                <p className="text-slate-400 mb-8">Hệ thống đang kết nối với Bệnh viện Đại học Y Dược TP.HCM để lấy lịch trống.</p>
                                <button onClick={onComplete} className="px-8 py-3 rounded-full border border-white/20 text-white hover:bg-white/10">
                                    Bỏ qua bước này
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </StepLayout>
    );
}
