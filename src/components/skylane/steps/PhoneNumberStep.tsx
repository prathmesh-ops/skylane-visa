import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Phone, ArrowRight, ArrowLeft, MessageSquare, Shield } from 'lucide-react';

interface PhoneNumberStepProps {
  phoneNumber: string;
  onPhoneUpdate: (phone: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const PhoneNumberStep: React.FC<PhoneNumberStepProps> = ({
  phoneNumber,
  onPhoneUpdate,
  onNext,
  onPrevious,
}) => {
  const [isValidating, setIsValidating] = useState(false);

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, '');
    
    // Handle Bahrain numbers
    if (cleaned.startsWith('973')) {
      const number = cleaned.slice(3);
      if (number.length <= 8) {
        return `+973 ${number.replace(/(\d{4})(\d{0,4})/, '$1 $2').trim()}`;
      }
    } else if (cleaned.length <= 8) {
      return `+973 ${cleaned.replace(/(\d{4})(\d{0,4})/, '$1 $2').trim()}`;
    }
    
    return phoneNumber; // Return current value if invalid
  };

  const validateAndProceed = async () => {
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    if (cleanNumber.length >= 11) { // +973 + 8 digits
      setIsValidating(true);
      // Simulate validation
      setTimeout(() => {
        setIsValidating(false);
        onNext();
      }, 1000);
    }
  };

  const isValidPhone = () => {
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    return cleanNumber.length >= 11; // +973 + 8 digits
  };

  return (
    <div className="animate-fade-in">
      <Card className="shadow-premium bg-gradient-card border-0 max-w-2xl mx-auto">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-lg">
              <Phone className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl md:text-3xl">Enter Phone Number</CardTitle>
          <CardDescription className="text-base md:text-lg text-muted-foreground">
            We'll send you a verification code to secure your application
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6 px-4 md:px-6">
          {/* Country Info */}
          <div className="flex items-center justify-center gap-2 p-3 bg-primary-light/10 rounded-lg">
            <Badge variant="secondary" className="text-sm">
              🇧🇭 Bahrain (+973)
            </Badge>
            <span className="text-sm text-muted-foreground">Selected Country</span>
          </div>

          {/* Phone Number Input */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="phone" className="text-base font-medium">
                Mobile Number
              </Label>
              <div className="mt-2">
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+973 XXXX XXXX"
                  value={phoneNumber}
                  onChange={(e) => onPhoneUpdate(formatPhoneNumber(e.target.value))}
                  className="text-lg py-3 text-center md:text-left"
                  maxLength={15}
                />
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-sm text-muted-foreground">
                  Enter your Bahrain mobile number
                </p>
                {isValidPhone() && (
                  <Badge variant="outline" className="text-success border-success">
                    Valid ✓
                  </Badge>
                )}
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <MessageSquare className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-800 text-sm">SMS Verification</h4>
                  <p className="text-xs text-blue-700">
                    We'll send a 6-digit code
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <Shield className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-green-800 text-sm">Secure Process</h4>
                  <p className="text-xs text-green-700">
                    Your data is protected
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-semibold text-amber-800 mb-2 text-sm md:text-base">
              Why do we need your phone number?
            </h4>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• Appointment reminders and updates</li>
              <li>• Application status notifications</li>
              <li>• Emergency contact for consular services</li>
            </ul>
            <p className="text-xs text-amber-600 mt-2">
              We never share your information with third parties
            </p>
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
              onClick={validateAndProceed}
              disabled={!isValidPhone() || isValidating}
              size="lg"
              className="min-w-[140px] order-1 sm:order-2"
            >
              {isValidating ? (
                <>
                  <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin mr-2" />
                  Validating...
                </>
              ) : (
                <>
                  Send Code
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};