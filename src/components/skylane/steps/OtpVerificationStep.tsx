import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { 
  Shield, 
  ArrowRight, 
  Clock, 
  RefreshCw,
  CheckCircle2,
  Smartphone
} from 'lucide-react';

interface OtpVerificationStepProps {
  onNext: () => void;
  phoneNumber?: string;
}

export const OtpVerificationStep: React.FC<OtpVerificationStepProps> = ({ 
  onNext, 
  phoneNumber = "+973 XXXX XXXX" 
}) => {
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [isVerifying, setIsVerifying] = useState(false);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) return;
    
    setIsVerifying(true);
    // Simulate API call
    setTimeout(() => {
      setIsVerifying(false);
      onNext();
    }, 2000);
  };

  const handleResendOtp = () => {
    setTimeLeft(120);
    setCanResend(false);
    setOtp('');
  };

  const isOtpValid = otp.length === 6;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-green-50/30 to-emerald-50/20 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Phone Verification</h1>
              <p className="text-muted-foreground">Verify your phone number to continue</p>
            </div>
          </div>
          <Progress value={20} className="w-full h-2" />
        </div>

        {/* OTP Verification Card */}
        <Card className="border-0 shadow-xl bg-background/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-10 h-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl mb-2">Enter Verification Code</CardTitle>
            <p className="text-muted-foreground">
              We've sent a 6-digit verification code to
            </p>
            <p className="font-semibold text-foreground">{phoneNumber}</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* OTP Input */}
            <div className="flex flex-col items-center space-y-4">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={setOtp}
                className="gap-3"
              >
                <InputOTPGroup className="gap-3">
                  <InputOTPSlot 
                    index={0} 
                    className="w-14 h-14 text-2xl font-bold border-2 rounded-xl focus:border-green-500 focus:ring-green-500/20" 
                  />
                  <InputOTPSlot 
                    index={1} 
                    className="w-14 h-14 text-2xl font-bold border-2 rounded-xl focus:border-green-500 focus:ring-green-500/20" 
                  />
                  <InputOTPSlot 
                    index={2} 
                    className="w-14 h-14 text-2xl font-bold border-2 rounded-xl focus:border-green-500 focus:ring-green-500/20" 
                  />
                </InputOTPGroup>
                <InputOTPGroup className="gap-3">
                  <InputOTPSlot 
                    index={3} 
                    className="w-14 h-14 text-2xl font-bold border-2 rounded-xl focus:border-green-500 focus:ring-green-500/20" 
                  />
                  <InputOTPSlot 
                    index={4} 
                    className="w-14 h-14 text-2xl font-bold border-2 rounded-xl focus:border-green-500 focus:ring-green-500/20" 
                  />
                  <InputOTPSlot 
                    index={5} 
                    className="w-14 h-14 text-2xl font-bold border-2 rounded-xl focus:border-green-500 focus:ring-green-500/20" 
                  />
                </InputOTPGroup>
              </InputOTP>

              {/* Timer */}
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="text-sm">
                  {timeLeft > 0 ? `Code expires in ${formatTime(timeLeft)}` : 'Code expired'}
                </span>
              </div>
            </div>

            {/* Resend OTP */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-3">
                Didn't receive the code?
              </p>
              <Button
                variant="outline"
                onClick={handleResendOtp}
                disabled={!canResend}
                className="gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Resend Code
              </Button>
            </div>

            {/* Verify Button */}
            <div className="pt-4">
              <Button 
                onClick={handleVerifyOtp}
                disabled={!isOtpValid || isVerifying}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Verify & Continue
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </div>

            {/* Security Note */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-800 mb-1">Security Notice</h4>
                  <p className="text-sm text-green-700">
                    This verification code is valid for 2 minutes and can only be used once. 
                    Never share this code with anyone.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};