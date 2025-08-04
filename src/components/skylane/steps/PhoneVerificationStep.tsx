import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Phone, CheckCircle2, ArrowRight, ArrowLeft, MessageSquare } from 'lucide-react';

interface PhoneVerificationStepProps {
  phoneNumber: string;
  isVerified: boolean;
  onPhoneUpdate: (phone: string) => void;
  onVerificationComplete: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const PhoneVerificationStep: React.FC<PhoneVerificationStepProps> = ({
  phoneNumber,
  isVerified,
  onPhoneUpdate,
  onVerificationComplete,
  onNext,
  onPrevious,
}) => {
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!phoneNumber || phoneNumber.length < 8) return;
    
    setLoading(true);
    // Simulate OTP sending
    setTimeout(() => {
      setOtpSent(true);
      setLoading(false);
    }, 1500);
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) return;
    
    setLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      onVerificationComplete();
      setLoading(false);
    }, 1500);
  };

  const formatPhoneNumber = (value: string) => {
    // Simple phone number formatting for Bahrain (+973)
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.startsWith('973')) {
      return `+${cleaned}`;
    }
    return cleaned.startsWith('+') ? value : `+973${cleaned}`;
  };

  return (
    <Card className="shadow-premium bg-gradient-card border-0">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-3">
          <Phone className="w-7 h-7 text-primary" />
          Phone Verification
        </CardTitle>
        <CardDescription className="text-base">
          Verify your phone number with OTP to continue with your application
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Verification Status */}
        {isVerified && (
          <div className="flex items-center gap-3 p-4 bg-success/10 border border-success/20 rounded-lg">
            <CheckCircle2 className="w-5 h-5 text-success" />
            <div>
              <h4 className="font-semibold text-success">Phone Number Verified</h4>
              <p className="text-sm text-success/80">
                Your phone number {phoneNumber} has been successfully verified
              </p>
            </div>
          </div>
        )}

        {!isVerified && (
          <>
            {/* Phone Number Input */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="phone" className="text-base font-medium">
                  Phone Number
                </Label>
                <div className="mt-2">
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+973 XXXX XXXX"
                    value={phoneNumber}
                    onChange={(e) => onPhoneUpdate(formatPhoneNumber(e.target.value))}
                    className="text-lg py-3"
                    disabled={otpSent}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  We'll send you a verification code via SMS
                </p>
              </div>

              {!otpSent && (
                <Button
                  onClick={handleSendOtp}
                  disabled={!phoneNumber || phoneNumber.length < 8 || loading}
                  size="lg"
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin mr-2" />
                      Sending OTP...
                    </>
                  ) : (
                    <>
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Send OTP
                    </>
                  )}
                </Button>
              )}
            </div>

            {/* OTP Input */}
            {otpSent && (
              <div className="space-y-4">
                <div className="text-center p-4 bg-primary-light/10 rounded-lg">
                  <MessageSquare className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold text-primary">OTP Sent</h4>
                  <p className="text-sm text-muted-foreground">
                    We've sent a 6-digit code to {phoneNumber}
                  </p>
                </div>

                <div>
                  <Label htmlFor="otp" className="text-base font-medium">
                    Enter OTP Code
                  </Label>
                  <div className="mt-2">
                    <Input
                      id="otp"
                      type="text"
                      placeholder="000000"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="text-lg py-3 text-center tracking-widest font-mono"
                      maxLength={6}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-muted-foreground">
                      Enter the 6-digit code
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setOtpSent(false);
                        setOtp('');
                      }}
                      className="text-primary"
                    >
                      Change Number
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={handleVerifyOtp}
                  disabled={otp.length !== 6 || loading}
                  size="lg"
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin mr-2" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Verify OTP
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    Didn't receive the code?
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSendOtp}
                    disabled={loading}
                  >
                    Resend OTP
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Security Notice */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <h4 className="font-semibold text-orange-800 mb-1">Security Notice</h4>
          <p className="text-sm text-orange-700">
            Your phone number will be used for appointment reminders and important updates. 
            We never share your personal information with third parties.
          </p>
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
            disabled={!isVerified}
            size="lg"
            className="min-w-[120px]"
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};