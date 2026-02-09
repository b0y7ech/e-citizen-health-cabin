'use client';

import WelcomeScreen from "@/components/cabin/WelcomeScreen";
import SymptomSelector from "@/components/cabin/SymptomSelector";
import IdentityVerification from "@/components/cabin/IdentityVerification";
import VitalsProcess from "@/components/cabin/VitalsProcess";
import HealthReport from "@/components/cabin/HealthReport";
import TelehealthConnect from "@/components/cabin/TelehealthConnect";
import ServiceOptions from "@/components/cabin/ServiceOptions";
import FinalConfirmation from "@/components/cabin/FinalConfirmation";
import { useState } from "react";

type Step = 'welcome' | 'symptoms' | 'identity' | 'vitals' | 'report' | 'telehealth' | 'services' | 'finish';

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  const [reportData, setReportData] = useState({
    symptoms: [] as string[],
    vitalsMode: 'full' as 'full' | 'targeted',
    targetedVitals: [] as string[],
    identityMethod: '',
    anonymousInfo: null as any,
    vitals: null as any,
    prescription: null as any,
  });

  const handleWelcomeStart = () => {
    setCurrentStep('symptoms');
  };

  const handleSymptomsNext = (symptoms: string[], vitalsMode: 'full' | 'targeted', targetedVitals?: string[]) => {
    setReportData(prev => ({
      ...prev,
      symptoms,
      vitalsMode,
      targetedVitals: targetedVitals || []
    }));
    setCurrentStep('identity');
  };

  const handleIdentityComplete = (method: string, data?: any) => {
    setReportData(prev => ({
      ...prev,
      identityMethod: method,
      anonymousInfo: data
    }));
    setCurrentStep('vitals');
  };

  const handleVitalsComplete = (data: any) => {
    setReportData(prev => ({ ...prev, vitals: data }));
    setCurrentStep('report');
  };

  const handleReportTelehealth = () => {
    setCurrentStep('telehealth');
  };

  const handleReportComplete = () => {
    setCurrentStep('finish');
  };

  const handleTelehealthComplete = (prescription: any) => {
    setReportData(prev => ({ ...prev, prescription }));
    setCurrentStep('services');
  };

  const handleServicesComplete = () => {
    setCurrentStep('finish');
  };

  const handleReset = () => {
    // Reset all data
    setReportData({
      symptoms: [],
      vitalsMode: 'full',
      targetedVitals: [],
      identityMethod: '',
      anonymousInfo: null,
      vitals: null,
      prescription: null,
    });
    setCurrentStep('welcome');
  };

  const handleBack = () => {
    if (currentStep === 'symptoms') setCurrentStep('welcome');
    if (currentStep === 'identity') setCurrentStep('symptoms');
    if (currentStep === 'vitals') setCurrentStep('identity');
    if (currentStep === 'report') setCurrentStep('vitals');
    if (currentStep === 'telehealth') setCurrentStep('report');
    if (currentStep === 'services') setCurrentStep('telehealth');
  };

  return (
    <main>
      {currentStep === 'welcome' && (
        <WelcomeScreen onStart={handleWelcomeStart} />
      )}

      {currentStep === 'symptoms' && (
        <SymptomSelector
          onNext={handleSymptomsNext}
          onBack={handleBack}
        />
      )}

      {currentStep === 'identity' && (
        <IdentityVerification
          onComplete={handleIdentityComplete}
          onBack={handleBack}
        />
      )}

      {currentStep === 'vitals' && (
        <VitalsProcess
          stepsToMeasure={reportData.vitalsMode === 'targeted' ? reportData.targetedVitals : undefined}
          onComplete={handleVitalsComplete}
          onBack={handleBack}
        />
      )}

      {currentStep === 'report' && (
        <HealthReport
          data={reportData}
          onComplete={handleReportComplete}
          onTelehealth={handleReportTelehealth}
          onBack={handleBack}
        />
      )}

      {currentStep === 'telehealth' && (
        <TelehealthConnect
          onComplete={handleTelehealthComplete}
          onBack={handleBack}
        />
      )}

      {currentStep === 'services' && (
        <ServiceOptions
          prescription={reportData.prescription}
          onComplete={handleServicesComplete}
          onBack={handleBack}
        />
      )}

      {currentStep === 'finish' && (
        <FinalConfirmation
          onReset={handleReset}
        />
      )}
    </main>
  );
}
