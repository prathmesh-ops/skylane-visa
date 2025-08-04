import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronDown, ChevronRight, Calendar, FileText, Phone, Upload, User, CreditCard, Check, Clock } from 'lucide-react';

// Import step components
import { ApplicationOverviewStep } from './steps/ApplicationOverviewStep';
import { OtpVerificationStep } from './steps/OtpVerificationStep';
import { ApiServiceSelectionStep } from './steps/ApiServiceSelectionStep';
import { DocumentCollectionStep } from './steps/DocumentCollectionStep';
import { DocumentUploadStep } from './steps/DocumentUploadStep';
import { PhoneVerificationStep } from './steps/PhoneVerificationStep';
import { FormsUploadStep } from './steps/FormsUploadStep';
import { PersonalInfoStep } from './steps/PersonalInfoStep';
import { AppointmentSchedulingStep } from './steps/AppointmentSchedulingStep';
import { PreviewConfirmationStep } from './steps/PreviewConfirmationStep';
import { PaymentStep } from './steps/PaymentStep';
import { SuccessStep } from './steps/SuccessStep';

interface BookingData {
  service: string;
  documents: string[];
  uploadedFiles: File[];
  phoneNumber: string;
  isPhoneVerified: boolean;
  formsAndIds: Record<string, File[]>;
  personalInfo: Record<string, any>;
  appointment: {
    center: string;
    date: string;
    time: string;
  };
  payment: {
    firstName: string;
    lastName: string;
    email: string;
    amount: number;
  };
}

interface Service {
  id: string;
  name: string;
  category: 'visa' | 'oci' | 'passport';
  isActive: boolean;
}

interface ApplicationParams {
  citizenship: string;
  residence: string;
  destination: string;
  services: Service[];
}

interface SkylaneBookingProps {
  onBackToHome: () => void;
  applicationParams: ApplicationParams;
}

const steps = [
  { 
    id: 1, 
    title: 'Application Overview', 
    description: 'Review service and requirements',
    icon: FileText,
    category: 'Setup'
  },
  { 
    id: 2, 
    title: 'Phone Verification', 
    description: 'Verify with OTP',
    icon: Phone,
    category: 'Setup'
  },
  { 
    id: 3, 
    title: 'Select Service', 
    description: 'Choose your required service',
    icon: FileText,
    category: 'Setup'
  },
  { 
    id: 4, 
    title: 'Collect Documents', 
    description: 'Required document checklist',
    icon: FileText,
    category: 'Setup'
  },
  { 
    id: 5, 
    title: 'Upload & Pre-verify', 
    description: 'Upload documents for verification',
    icon: Upload,
    category: 'Documentation'
  },
  { 
    id: 6, 
    title: 'Additional Verification', 
    description: 'Additional verification if needed',
    icon: Phone,
    category: 'Verification'
  },
  { 
    id: 7, 
    title: 'Upload Forms & IDs', 
    description: 'Submit forms and identity documents',
    icon: Upload,
    category: 'Documentation'
  },
  { 
    id: 8, 
    title: 'Personal Information', 
    description: 'Complete your profile',
    icon: User,
    category: 'Information'
  },
  { 
    id: 9, 
    title: 'Schedule Appointment', 
    description: 'Choose date and time',
    icon: Calendar,
    category: 'Booking'
  },
  { 
    id: 10, 
    title: 'Preview & Confirm', 
    description: 'Review your application',
    icon: Check,
    category: 'Review'
  },
  { 
    id: 11, 
    title: 'Payment', 
    description: 'Secure payment processing',
    icon: CreditCard,
    category: 'Payment'
  },
  { 
    id: 12, 
    title: 'Confirmation', 
    description: 'Success and details',
    icon: CheckCircle2,
    category: 'Complete'
  },
];

// Group steps by category
const stepCategories = [
  { name: 'Setup', steps: steps.filter(s => s.category === 'Setup') },
  { name: 'Documentation', steps: steps.filter(s => s.category === 'Documentation') },
  { name: 'Verification', steps: steps.filter(s => s.category === 'Verification') },
  { name: 'Information', steps: steps.filter(s => s.category === 'Information') },
  { name: 'Booking', steps: steps.filter(s => s.category === 'Booking') },
  { name: 'Review', steps: steps.filter(s => s.category === 'Review') },
  { name: 'Payment', steps: steps.filter(s => s.category === 'Payment') },
  { name: 'Complete', steps: steps.filter(s => s.category === 'Complete') },
];

export const SkylaneBooking: React.FC<SkylaneBookingProps> = ({ onBackToHome, applicationParams }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'Setup': true,
    'Documentation': false,
    'Verification': false,
    'Information': false,
    'Booking': false,
    'Review': false,
    'Payment': false,
    'Complete': false,
  });
  const [bookingData, setBookingData] = useState<BookingData>({
    service: '',
    documents: [],
    uploadedFiles: [],
    phoneNumber: '',
    isPhoneVerified: false,
    formsAndIds: {},
    personalInfo: {},
    appointment: {
      center: '',
      date: '',
      time: ''
    },
    payment: {
      firstName: '',
      lastName: '',
      email: '',
      amount: 0
    }
  });

  const progress = (currentStep / steps.length) * 100;

  // Auto-expand category containing current step
  React.useEffect(() => {
    const currentStepData = steps.find(s => s.id === currentStep);
    if (currentStepData) {
      setExpandedCategories(prev => ({
        ...prev,
        [currentStepData.category]: true
      }));
    }
  }, [currentStep]);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

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

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData(prev => ({ ...prev, ...data }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ApplicationOverviewStep
            onNext={handleNext}
            applicationParams={applicationParams}
          />
        );
      case 2:
        return (
          <OtpVerificationStep
            onNext={handleNext}
            phoneNumber={bookingData.phoneNumber}
          />
        );
      case 3:
        return (
          <ApiServiceSelectionStep
            selectedService={bookingData.service}
            onServiceSelect={(service) => updateBookingData({ service })}
            onNext={handleNext}
            services={applicationParams.services}
            applicationParams={applicationParams}
          />
        );
      case 4:
        return (
          <DocumentCollectionStep
            service={bookingData.service}
            documents={bookingData.documents}
            onDocumentsUpdate={(documents) => updateBookingData({ documents })}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 5:
        return (
          <DocumentUploadStep
            documents={bookingData.documents}
            uploadedFiles={bookingData.uploadedFiles}
            onFilesUpdate={(uploadedFiles) => updateBookingData({ uploadedFiles })}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 6:
        return (
          <PhoneVerificationStep
            phoneNumber={bookingData.phoneNumber}
            isVerified={bookingData.isPhoneVerified}
            onPhoneUpdate={(phoneNumber) => updateBookingData({ phoneNumber })}
            onVerificationComplete={() => updateBookingData({ isPhoneVerified: true })}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 7:
        return (
          <FormsUploadStep
            formsAndIds={bookingData.formsAndIds}
            onFormsUpdate={(formsAndIds) => updateBookingData({ formsAndIds })}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 8:
        return (
          <PersonalInfoStep
            personalInfo={bookingData.personalInfo}
            onInfoUpdate={(personalInfo) => updateBookingData({ personalInfo })}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 9:
        return (
          <AppointmentSchedulingStep
            appointment={bookingData.appointment}
            onAppointmentUpdate={(appointment) => updateBookingData({ appointment })}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 10:
        return (
          <PreviewConfirmationStep
            bookingData={bookingData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 11:
        return (
          <PaymentStep
            payment={bookingData.payment}
            onPaymentUpdate={(payment) => updateBookingData({ payment })}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 12:
        return (
          <SuccessStep
            bookingData={bookingData}
            onBackToHome={onBackToHome}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary-light/30">
      {/* Premium Header */}
      <div className="bg-card/80 backdrop-blur-md border-b border-border shadow-sm px-6 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Button 
            onClick={onBackToHome} 
            variant="ghost" 
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
          
          <div className="text-center">
            <h1 className="text-xl font-semibold bg-gradient-primary bg-clip-text text-transparent">Book Appointment</h1>
            <p className="text-sm text-muted-foreground">Skylane Premium Services</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Step {currentStep} of {steps.length}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Premium Left Sidebar - Collapsible Steps Navigation */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-card/90 backdrop-blur-md rounded-xl border border-border shadow-premium p-6 sticky top-24 animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Booking Steps</h2>
                  <p className="text-xs text-muted-foreground">Premium Service Flow</p>
                </div>
              </div>
              
              <div className="space-y-2">
                {stepCategories.map((category, categoryIndex) => {
                  const hasActiveStep = category.steps.some(step => step.id === currentStep);
                  const hasCompletedSteps = category.steps.some(step => currentStep > step.id);
                  const allCompleted = category.steps.every(step => currentStep > step.id);
                  const isExpanded = expandedCategories[category.name];
                  
                  return (
                    <Collapsible 
                      key={category.name} 
                      open={isExpanded}
                      onOpenChange={() => toggleCategory(category.name)}
                    >
                      <CollapsibleTrigger className="w-full">
                        <div className={`
                          flex items-center justify-between w-full p-3 rounded-lg transition-all duration-200 hover:bg-muted/50
                          ${hasActiveStep ? 'bg-primary/10 ring-1 ring-primary/20' : 
                            allCompleted ? 'bg-success/10' : 'bg-muted/30'}
                        `}>
                          <div className="flex items-center gap-3">
                            <div className={`
                              w-6 h-6 rounded-md flex items-center justify-center text-xs font-medium transition-all
                              ${allCompleted ? 'bg-success text-success-foreground' :
                                hasActiveStep ? 'bg-primary text-primary-foreground' :
                                hasCompletedSteps ? 'bg-warning text-warning-foreground' :
                                'bg-muted text-muted-foreground'}
                            `}>
                              {allCompleted ? (
                                <Check className="w-3 h-3" />
                              ) : (
                                categoryIndex + 1
                              )}
                            </div>
                            <span className={`text-sm font-medium ${
                              hasActiveStep ? 'text-primary' :
                              allCompleted ? 'text-success' :
                              'text-foreground'
                            }`}>
                              {category.name}
                            </span>
                          </div>
                          <ChevronDown className={`
                            w-4 h-4 transition-transform duration-200 text-muted-foreground
                            ${isExpanded ? 'rotate-180' : ''}
                          `} />
                        </div>
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent className="mt-1">
                        <div className="ml-4 space-y-1 animate-slide-in">
                          {category.steps.map((step, stepIndex) => {
                            const isActive = currentStep === step.id;
                            const isCompleted = currentStep > step.id;
                            const Icon = step.icon;
                            
                            return (
                              <div key={step.id} className="relative">
                                <div className={`
                                  flex items-center gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer
                                  ${isActive ? 'bg-primary/10 ring-1 ring-primary/30 shadow-md' :
                                    isCompleted ? 'bg-success/5 hover:bg-success/10' :
                                    'hover:bg-muted/40'}
                                `}>
                                  <div className={`
                                    w-7 h-7 rounded-lg flex items-center justify-center transition-all
                                    ${isCompleted ? 'bg-success text-success-foreground shadow-md' : 
                                      isActive ? 'bg-primary text-primary-foreground shadow-md' : 
                                      'bg-muted text-muted-foreground'}
                                  `}>
                                    {isCompleted ? (
                                      <CheckCircle2 className="w-4 h-4" />
                                    ) : (
                                      <Icon className="w-4 h-4" />
                                    )}
                                  </div>
                                  
                                  <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-medium truncate ${
                                      isActive ? 'text-primary' : 
                                      isCompleted ? 'text-success' : 
                                      'text-foreground'
                                    }`}>
                                      {step.title}
                                    </p>
                                    <p className="text-xs text-muted-foreground truncate">{step.description}</p>
                                  </div>
                                  
                                  {isActive && (
                                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                  )}
                                </div>
                                
                                {stepIndex < category.steps.length - 1 && (
                                  <div className={`
                                    ml-6 w-0.5 h-3 transition-colors
                                    ${isCompleted ? 'bg-success/30' : 'bg-border'}
                                  `} />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  );
                })}
              </div>
              
              {/* Premium Progress Bar */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                  <span className="font-medium">Overall Progress</span>
                  <Badge variant="secondary" className="text-xs">
                    {Math.round(progress)}%
                  </Badge>
                </div>
                <div className="relative">
                  <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-primary h-full rounded-full transition-all duration-500 ease-out relative"
                      style={{ width: `${progress}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </div>
                  </div>
                  <div className="absolute -top-1 transition-all duration-500" style={{ left: `${Math.max(0, progress - 2)}%` }}>
                    <div className="w-5 h-5 bg-primary rounded-full shadow-lg border-2 border-card flex items-center justify-center">
                      <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>Started</span>
                  <span>Completed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Main Content Area */}
          <div className="flex-1">
            <div className="bg-card/90 backdrop-blur-md rounded-xl border border-border shadow-premium overflow-hidden animate-fade-in">
              {renderStepContent()}
            </div>
          </div>

          {/* Premium Right Sidebar - Summary */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-card/90 backdrop-blur-md rounded-xl border border-border shadow-premium p-6 sticky top-24 animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-success flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-success-foreground" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Booking Summary</h2>
                  <p className="text-xs text-muted-foreground">Your application details</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {bookingData.service && (
                  <div className="p-3 bg-muted/40 rounded-lg border border-border/50">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Selected Service</p>
                    <p className="text-sm text-foreground font-medium capitalize">{bookingData.service.replace('-', ' ')}</p>
                  </div>
                )}
                
                {bookingData.appointment.center && (
                  <div className="p-3 bg-muted/40 rounded-lg border border-border/50">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Service Center</p>
                    <p className="text-sm text-foreground font-medium">{bookingData.appointment.center}</p>
                  </div>
                )}
                
                {bookingData.appointment.date && (
                  <div className="p-3 bg-muted/40 rounded-lg border border-border/50">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Appointment Date</p>
                    <p className="text-sm text-foreground font-medium">
                      {new Date(bookingData.appointment.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                )}
                
                {bookingData.appointment.time && (
                  <div className="p-3 bg-muted/40 rounded-lg border border-border/50">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Time</p>
                    <p className="text-sm text-foreground font-medium">{bookingData.appointment.time}</p>
                  </div>
                )}
                
                {bookingData.documents.length > 0 && (
                  <div className="p-3 bg-muted/40 rounded-lg border border-border/50">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Documents Required</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {bookingData.documents.length} documents
                      </Badge>
                    </div>
                  </div>
                )}
                
                {bookingData.uploadedFiles.length > 0 && (
                  <div className="p-3 bg-muted/40 rounded-lg border border-border/50">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Files Uploaded</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {bookingData.uploadedFiles.length} files
                      </Badge>
                      <CheckCircle2 className="w-4 h-4 text-success" />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-6 pt-6 border-t border-border">
                <div className="bg-gradient-card p-4 rounded-lg border border-border/50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Total Fee</span>
                    <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                      {bookingData.payment.amount ? `BD ${bookingData.payment.amount}` : 'TBD'}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Includes all service charges</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};