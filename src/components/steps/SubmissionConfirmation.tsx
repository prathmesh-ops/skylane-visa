import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, Clock, Phone, Mail, CheckCircle2, ArrowLeft, Calendar, FileText } from 'lucide-react';

interface SubmissionConfirmationProps {
  applicationData: {
    service: string;
    documents: string[];
    uploadedFiles: File[];
    personalInfo: Record<string, string>;
  };
  onPrevious: () => void;
}

const serviceNames: Record<string, string> = {
  'passport-fresh-minor': 'Fresh Passport – Minor',
  'passport-reissue-minor': 'Passport Reissue – Minor',
  'passport-replacement': 'Passport Replacement (Lost/Damaged/Stolen)',
  'emergency-certificate': 'Emergency Certificate',
  'passport-reissue-adult': 'Passport Reissue - Adult',
  'police-clearance': 'Police Clearance Certificate',
};

export const SubmissionConfirmation: React.FC<SubmissionConfirmationProps> = ({
  applicationData,
  onPrevious,
}) => {
  const applicationId = `ICAC-${Date.now().toString().slice(-6)}`;
  const serviceName = serviceNames[applicationData.service] || 'Selected Service';

  return (
    <div className="space-y-6">
      {/* Success Card */}
      <Card className="shadow-premium bg-gradient-success border-0 text-success-foreground">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Application Prepared Successfully!</h2>
            <p className="text-success-foreground/90 mb-4">
              Your documents have been uploaded and verified. Please visit ICAC to complete your application.
            </p>
            <Badge variant="secondary" className="bg-white/20 text-success-foreground px-4 py-2">
              Application ID: {applicationId}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Application Summary */}
      <Card className="shadow-lg bg-gradient-card border-0">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-3">
            <FileText className="w-6 h-6 text-primary" />
            Application Summary
          </CardTitle>
          <CardDescription>
            Review your application details before visiting ICAC
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-foreground">Service Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Type:</span>
                  <span className="font-medium">{serviceName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Application ID:</span>
                  <span className="font-mono">{applicationId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Documents Uploaded:</span>
                  <span className="font-medium">{applicationData.uploadedFiles.length}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3 text-foreground">Next Steps</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                  <span className="text-sm">Visit ICAC office with original documents</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                  <span className="text-sm">Complete biometric verification</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    3
                  </div>
                  <span className="text-sm">Submit application and receive receipt</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ICAC Information */}
      <Card className="shadow-lg bg-gradient-card border-0">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-3">
            <MapPin className="w-6 h-6 text-primary" />
            Visit ICAC Office
          </CardTitle>
          <CardDescription>
            Complete your application submission at our office
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Office Hours
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunday - Thursday:</span>
                  <span>8:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Friday - Saturday:</span>
                  <span className="text-destructive">Closed</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Processing Time
              </h3>
              <div className="bg-primary-light p-3 rounded-lg">
                <p className="text-sm text-primary font-medium">
                  Your application will be processed within 10-15 business days
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">+973 1234 5678</p>
                    <p className="text-sm text-muted-foreground">Main Office</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">info@icac-bahrain.com</p>
                    <p className="text-sm text-muted-foreground">Email Support</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Building 123, Road 456</p>
                    <p className="text-sm text-muted-foreground">
                      Diplomatic Area, Manama<br />
                      Kingdom of Bahrain
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button
          onClick={onPrevious}
          variant="outline"
          size="lg"
          className="min-w-[120px]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        
        <div className="flex gap-3">
          <Button variant="outline" size="lg">
            Download Summary
          </Button>
          <Button variant="premium" size="lg">
            Book Appointment
          </Button>
        </div>
      </div>
    </div>
  );
};