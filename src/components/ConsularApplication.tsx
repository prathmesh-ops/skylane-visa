import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, FileText, Upload, MapPin, ArrowRight, ArrowLeft } from 'lucide-react';
import { ServiceSelection } from './steps/ServiceSelection';
import { DocumentCollection } from './steps/DocumentCollection';
import { DocumentUpload } from './steps/DocumentUpload';
import { SubmissionConfirmation } from './steps/SubmissionConfirmation';

interface ApplicationData {
  service: string;
  documents: string[];
  uploadedFiles: File[];
  personalInfo: Record<string, string>;
}

const steps = [
  { id: 1, title: 'Select Service', icon: FileText, description: 'Choose your required consular service' },
  { id: 2, title: 'Collect Documents', icon: CheckCircle2, description: 'Gather all required documents' },
  { id: 3, title: 'Upload Documents', icon: Upload, description: 'Submit documents for verification' },
  { id: 4, title: 'Submit Application', icon: MapPin, description: 'Visit ICAC for final submission' },
];

export const ConsularApplication = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    service: '',
    documents: [],
    uploadedFiles: [],
    personalInfo: {},
  });

  const progress = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateApplicationData = (data: Partial<ApplicationData>) => {
    setApplicationData(prev => ({ ...prev, ...data }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ServiceSelection
            selectedService={applicationData.service}
            onServiceSelect={(service) => updateApplicationData({ service })}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <DocumentCollection
            service={applicationData.service}
            documents={applicationData.documents}
            onDocumentsUpdate={(documents) => updateApplicationData({ documents })}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <DocumentUpload
            documents={applicationData.documents}
            uploadedFiles={applicationData.uploadedFiles}
            onFilesUpdate={(uploadedFiles) => updateApplicationData({ uploadedFiles })}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 4:
        return (
          <SubmissionConfirmation
            applicationData={applicationData}
            onPrevious={handlePrevious}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-light/5 to-accent-light/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Indian Consular Application Centre
              </h1>
              <p className="text-muted-foreground">Bahrain - Premium Application Portal</p>
            </div>
          </div>
          <Badge variant="secondary" className="px-4 py-1">
            Trusted Partner to Embassy of India, Bahrain
          </Badge>
        </div>

        {/* Progress Section */}
        <Card className="mb-8 shadow-premium bg-gradient-card border-0 animate-slide-in">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="text-xl">Application Progress</CardTitle>
              <Badge variant="outline" className="bg-primary-light text-primary">
                Step {currentStep} of {steps.length}
              </Badge>
            </div>
            <Progress value={progress} className="h-2 mb-6" />
            
            {/* Step indicators */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {steps.map((step, index) => {
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                const Icon = step.icon;
                
                return (
                  <div key={step.id} className="flex items-center gap-3">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                      ${isCompleted ? 'bg-success text-success-foreground shadow-md' : 
                        isActive ? 'bg-primary text-primary-foreground shadow-lg' : 
                        'bg-muted text-muted-foreground'}
                    `}>
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-sm font-medium truncate ${
                        isActive ? 'text-primary' : isCompleted ? 'text-success' : 'text-muted-foreground'
                      }`}>
                        {step.title}
                      </h3>
                      <p className="text-xs text-muted-foreground hidden md:block">
                        {step.description}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-muted-foreground hidden md:block" />
                    )}
                  </div>
                );
              })}
            </div>
          </CardHeader>
        </Card>

        {/* Main Content */}
        <div className="animate-fade-in">
          {renderStepContent()}
        </div>
      </div>
    </div>
  );
};