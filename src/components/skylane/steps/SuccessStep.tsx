import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Download, MapPin, Calendar, Clock, Home, RefreshCw } from 'lucide-react';

interface SuccessStepProps {
  bookingData: any;
  onBackToHome: () => void;
}

export const SuccessStep: React.FC<SuccessStepProps> = ({
  bookingData,
  onBackToHome,
}) => {
  const qrCodeData = `SKYLANE-${Date.now()}`; // Generate QR code data
  
  const handleDownloadPDF = () => {
    // Simulate PDF download
    console.log('Downloading appointment summary PDF...');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-premium bg-gradient-card border-0">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-success-foreground" />
          </div>
          <CardTitle className="text-2xl text-success">
            Payment Successful!
          </CardTitle>
          <CardDescription className="text-base">
            Your appointment has been confirmed. Please save the details below.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* QR Code */}
          <div className="text-center p-6 bg-card border rounded-lg">
            <div className="w-32 h-32 bg-muted mx-auto mb-4 rounded-lg flex items-center justify-center">
              <span className="text-xs text-muted-foreground">QR Code</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Show this QR code at the service center
            </p>
          </div>

          {/* Appointment Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Appointment Details</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Manama Service Center</p>
                  <p className="text-sm text-muted-foreground">Building 123, Road 456, Manama</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">{new Date().toLocaleDateString()}</p>
                  <p className="text-sm text-muted-foreground">Appointment Date</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">10:00 AM</p>
                  <p className="text-sm text-muted-foreground">Please arrive 15 minutes early</p>
                </div>
              </div>
            </div>
          </div>

          {/* Document Checklist */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">Bring These Documents</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Original passport and copies</li>
              <li>• National ID (original and copy)</li>
              <li>• Completed application forms</li>
              <li>• Passport-sized photographs</li>
              <li>• Payment confirmation</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button onClick={handleDownloadPDF} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Reschedule
            </Button>
            <Button onClick={onBackToHome}>
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};