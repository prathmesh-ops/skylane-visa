import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  Clock, 
  MapPin, 
  ArrowRight, 
  CheckCircle2,
  Calendar,
  DollarSign,
  Shield,
  Users
} from 'lucide-react';

interface ApplicationOverviewStepProps {
  onNext: () => void;
  applicationParams: {
    citizenship: string;
    residence: string;
    destination: string;
    services: Array<{
      id: string;
      name: string;
      category: string;
    }>;
  };
}

export const ApplicationOverviewStep: React.FC<ApplicationOverviewStepProps> = ({ 
  onNext, 
  applicationParams 
}) => {
  const [isAccepted, setIsAccepted] = useState(false);

  const serviceFee = applicationParams.services[0]?.category === 'visa' ? 'US$ 25.00' : 'US$ 40.00';
  const processingTime = applicationParams.services[0]?.category === 'visa' ? '3-5 days' : '7-10 days';

  const steps = [
    {
      title: 'How it works?',
      items: [
        'Select your service',
        'Upload required documents', 
        'Submit your application',
        'Complete online verification',
        'Visit center for submission'
      ]
    }
  ];

  const requirements = [
    'Valid passport',
    'Recent passport-size photograph',
    'Completed application form',
    'Supporting documents as per service type',
    'Payment receipt'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-blue-50/30 to-indigo-50/20 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Application Overview</h1>
              <p className="text-muted-foreground">Review your service selection and requirements</p>
            </div>
          </div>
          <Progress value={10} className="w-full h-2" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - How it works */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-blue-600" />
                  </div>
                  How it works?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {steps[0].items.map((step, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {index + 1}
                    </div>
                    <span className="text-foreground font-medium">{step}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Visit center info */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-amber-50 to-orange-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Visit us at our center</h3>
                    <p className="text-muted-foreground mb-4">
                      Complete your application submission at our Bahrain office with all required documents.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-amber-600" />
                        <span className="text-sm text-foreground">Mon-Fri: 9:00 AM - 5:00 PM</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-amber-600" />
                        <span className="text-sm text-foreground">Indian Consular Application Centre, Bahrain</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Center Security & Inspection Report */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-green-600" />
                  </div>
                  Center Security & Inspection Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Entry Type:</span>
                      <span className="text-sm font-medium">Standard Entry</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Inspection Type:</span>
                      <span className="text-sm font-medium">Document Verification</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Security Level:</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">High</Badge>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Processing Fee:</span>
                      <span className="text-sm font-medium">{serviceFee}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Est. Processing:</span>
                      <span className="text-sm font-medium">{processingTime}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Status:</span>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">Ready</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Fee structure & Continue */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Fee structure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Service Fee:</span>
                    <span className="text-sm font-medium">{serviceFee}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Processing Fee:</span>
                    <span className="text-sm font-medium">US$ 5.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">SMS Service:</span>
                    <span className="text-sm font-medium">US$ 2.00</span>
                  </div>
                  <hr className="my-3" />
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-foreground">Total Amount:</span>
                    <span className="font-bold text-lg text-blue-600">{serviceFee === 'US$ 25.00' ? 'US$ 32.00' : 'US$ 47.00'}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Selected Service:</h4>
                  <p className="text-sm text-muted-foreground mb-2">{applicationParams.services[0]?.name}</p>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    {applicationParams.services[0]?.category.toUpperCase()}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Required Documents:</h4>
                  {requirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-muted-foreground">{req}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={isAccepted}
                      onChange={(e) => setIsAccepted(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <label htmlFor="terms" className="text-sm text-muted-foreground">
                      I agree to the terms and conditions
                    </label>
                  </div>

                  <Button 
                    onClick={onNext}
                    disabled={!isAccepted}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Continue Application
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};