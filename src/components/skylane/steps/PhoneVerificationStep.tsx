import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Phone, CheckCircle2, ArrowRight, ArrowLeft, MessageSquare, Timer } from 'lucide-react';

interface PhoneVerificationStepProps {
  phoneNumber: string;
  isVerified: boolean;
  onVerificationComplete: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const PhoneVerificationStep: React.FC<PhoneVerificationStepProps> = ({
  phoneNumber,
  isVerified,
  onVerificationComplete,
  onNext,
  onPrevious,
}) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  React.useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) return;
    
    setLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      onVerificationComplete();
      setLoading(false);
    }, 1500);
  };

  const handleResendOtp = () => {
    setTimeLeft(60);
    setCanResend(false);
    setOtp('');
  };

  const goBackToPhoneNumber = () => {
    onPrevious();
  };

  return (
    <div className="animate-fade-in">
      <Card className="shadow-premium bg-gradient-card border-0 max-w-2xl mx-auto">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-lg">
              <MessageSquare className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl md:text-3xl">Verify Your Phone</CardTitle>
          <CardDescription className="text-base md:text-lg text-muted-foreground">
            Enter the 6-digit code sent to {phoneNumber}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6 px-4 md:px-6">
          {/* Verification Status */}
          {isVerified ? (
            <div className="animate-scale-in">
              <div className="flex items-center gap-3 p-4 bg-success/10 border border-success/20 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-success">Phone Number Verified</h4>
                  <p className="text-sm text-success/80">
                    Your phone number has been successfully verified
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Phone Number Display */}
              <div className="text-center p-4 bg-primary-light/10 rounded-lg">
                <Phone className="w-8 h-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold text-primary text-lg">Code Sent</h4>
                <p className="text-sm text-muted-foreground">
                  We've sent a 6-digit verification code to
                </p>
                <p className="text-base font-semibold text-foreground mt-1">
                  {phoneNumber}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goBackToPhoneNumber}
                  className="text-primary mt-2"
                >
                  Change Number
                </Button>
              </div>

              {/* OTP Input */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="otp" className="text-base font-medium">
                    Verification Code
                  </Label>
                  <div className="mt-2">
                    <Input
                      id="otp"
                      type="text"
                      placeholder="000000"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="text-xl md:text-2xl py-4 text-center tracking-[0.5em] font-mono"
                      maxLength={6}
                      autoComplete="one-time-code"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 text-center">
                    Enter the 6-digit code sent to your phone
                  </p>
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
                      Verifying Code...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Verify Code
                    </>
                  )}
                </Button>

                {/* Resend Section */}
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Didn't receive the code?
                  </p>
                  {canResend ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleResendOtp}
                      disabled={loading}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Resend Code
                    </Button>
                  ) : (
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Timer className="w-4 h-4" />
                      Resend in {timeLeft}s
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Security Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2 text-sm md:text-base">
              Security Notice
            </h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Never share your verification code with anyone</li>
              <li>• The code expires in 10 minutes</li>
              <li>• Contact support if you face any issues</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t">
            <Button
              onClick={onPrevious}
              variant="outline"
              size="lg"
              className="min-w-[120px] order-2 sm:order-1"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <Button
              onClick={onNext}
              disabled={!isVerified}
              size="lg"
              className="min-w-[120px] order-1 sm:order-2"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};