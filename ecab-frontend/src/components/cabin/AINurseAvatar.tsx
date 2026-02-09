'use client';

import { useRef, useEffect } from 'react';

interface AINurseAvatarProps {
    isSpeaking?: boolean;
    speechText?: string;
}

export default function AINurseAvatar({ isSpeaking = false, speechText }: AINurseAvatarProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(() => {
                // Autoplay might be blocked, handle gracefully
            });
        }
    }, []);

    return (
        <div className={`nurse-avatar ${isSpeaking ? 'speaking' : ''}`}>
            {/* Speech Bubble */}
            {speechText && (
                <div className="speech-bubble animate-fade-in-up">
                    <p className="text-lg font-medium text-warm-white leading-relaxed">
                        {speechText}
                    </p>
                </div>
            )}

            {/* Video Avatar */}
            <video
                ref={videoRef}
                src="/images/Tạo_Video_Cô_Y_Tá_Chuyển_Động.mp4"
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
            />

            {/* Speaking Indicator */}
            {isSpeaking && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="w-2 h-6 bg-teal-400 rounded-full"
                            style={{
                                animation: `speaking-bar 0.8s ease-in-out ${i * 0.1}s infinite`,
                            }}
                        />
                    ))}
                </div>
            )}

            <style jsx>{`
        @keyframes speaking-bar {
          0%, 100% { height: 8px; }
          50% { height: 24px; }
        }
      `}</style>
        </div>
    );
}
