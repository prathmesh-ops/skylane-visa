import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  FileText, 
  User, 
  Calendar, 
  MapPin, 
  Phone,
  Edit
} from 'lucide-react';

interface PreviewConfirmationStepProps {
  bookingData: any;
  onNext: () => void;
  onPrevious: () => void;
}

export const PreviewConfirmationStep: React.FC<PreviewConfirmationStepProps> = ({
  bookingData,
  onNext,
  onPrevious,
}) => {
  const getServiceTitle = (serviceId: string) => {
    const serviceMap: Record<string, string> = {
      'passport-fresh': 'Fresh Passport Application',
      'passport-renewal': 'Passport Renewal',
      'visa-tourist': 'Tourist Visa',
      'visa-business': 'Business Visa',
      'identity-verification': 'Identity Verification',
      'immigration-consultation': 'Immigration Consultation'
    };
    return serviceMap[serviceId] || serviceId;
  };

  const getCenterName = (centerId: string) => {
    const centerMap: Record<string, string> = {
      'manama-center': 'Manama Service Center',
      'riffa-center': 'Riffa Service Center',
      'muharraq-center': 'Muharraq Service Center'
    };
    return centerMap[centerId] || centerId;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not selected';
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const totalUploadedFiles = Object.values(bookingData.formsAndIds || {})
    .reduce((total: number, files: any) => total + (files?.length || 0), 0) + 
    (bookingData.uploadedFiles?.length || 0);

  return (
    <Card className="shadow-premium bg-gradient-card border-0">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-3">
          <CheckCircle2 className="w-7 h-7 text-primary" />
          Preview & Confirmation
        </CardTitle>
        <CardDescription className="text-base">
          Review all your information before proceeding to payment
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Service Information */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Service Information
            </h3>
            <Button variant="ghost" size="sm" onClick={() => {}}>
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </div>
          
          <Card className="bg-card border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-foreground">
                    {getServiceTitle(bookingData.service)}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Selected service for your application
                  </p>
                </div>
                <Badge variant="success">Selected</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* Contact Information */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" />
              Contact Information
            </h3>
            <Button variant="ghost" size="sm" onClick={() => {}}>
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </div>
          
          <Card className="bg-card border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-foreground">
                    {bookingData.phoneNumber || 'Not provided'}
                  </h4>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">Phone number</p>
                    {bookingData.isPhoneVerified && (
                      <Badge variant="success" className="text-xs">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* Documents Summary */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Documents Summary
            </h3>
            <Button variant="ghost" size="sm" onClick={() => {}}>
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </div>
          
          <Card className="bg-card border">
            <CardContent className="p-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {bookingData.documents?.length || 0}
                  </div>
                  <p className="text-sm text-muted-foreground">Required docs</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">
                    {totalUploadedFiles}
                  </div>
                  <p className="text-sm text-muted-foreground">Files uploaded</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {bookingData.personalInfo?.passportNumber ? 1 : 0}
                  </div>
                  <p className="text-sm text-muted-foreground">Personal info</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* Personal Information Summary */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Personal Information
            </h3>
            <Button variant="ghost" size="sm" onClick={() => {}}>
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </div>
          
          <Card className="bg-card border">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Passport Number:</span>
                  <span className="font-medium">
                    {bookingData.personalInfo?.passportNumber || 'Not provided'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Profile Photo:</span>
                  <Badge variant={bookingData.personalInfo?.profilePhoto ? "success" : "secondary"}>
                    {bookingData.personalInfo?.profilePhoto ? 'Uploaded' : 'Pending'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Passport Copy:</span>
                  <Badge variant={bookingData.personalInfo?.passportFile ? "success" : "secondary"}>
                    {bookingData.personalInfo?.passportFile ? 'Uploaded' : 'Pending'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* Appointment Details */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Appointment Details
            </h3>
            <Button variant="ghost" size="sm" onClick={() => {}}>
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </div>
          
          <Card className="bg-card border">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">
                      {getCenterName(bookingData.appointment?.center)}
                    </p>
                    <p className="text-sm text-muted-foreground">Service Center</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">
                      {formatDate(bookingData.appointment?.date)}
                    </p>
                    <p className="text-sm text-muted-foreground">Appointment Date</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">
                      {bookingData.appointment?.time || 'Not selected'}
                    </p>
                    <p className="text-sm text-muted-foreground">Appointment Time</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Final Confirmation */}
        <div className="bg-primary-light/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-semibold text-primary mb-2">Ready for Payment</h4>
              <p className="text-sm text-primary/80">
                Please review all information carefully. Once payment is processed, 
                changes may incur additional fees.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <Button
            onClick={onPrevious}
            variant="outline"
            size="lg"
            className="min-w-[120px]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <Button
            onClick={onNext}
            size="lg"
            className="min-w-[120px]"
          >
            Proceed to Payment
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};