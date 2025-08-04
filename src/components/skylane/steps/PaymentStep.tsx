import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  CreditCard, 
  Shield, 
  ArrowRight, 
  ArrowLeft, 
  Lock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface PaymentStepProps {
  payment: {
    firstName: string;
    lastName: string;
    email: string;
    amount: number;
  };
  onPaymentUpdate: (payment: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const serviceFees = {
  'passport-fresh': 45.000,
  'passport-renewal': 35.000,
  'visa-tourist': 25.000,
  'visa-business': 30.000,
  'identity-verification': 15.000,
  'immigration-consultation': 50.000
};

export const PaymentStep: React.FC<PaymentStepProps> = ({
  payment,
  onPaymentUpdate,
  onNext,
  onPrevious,
}) => {
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleInputChange = (field: string, value: string) => {
    onPaymentUpdate({
      ...payment,
      [field]: value
    });
  };

  const handlePayment = async () => {
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      onNext();
    }, 3000);
  };

  const serviceFee = 35.000; // Default service fee
  const preVerificationFee = 10.000;
  const processingFee = 5.000;
  const totalAmount = serviceFee + preVerificationFee + processingFee;

  const isFormComplete = payment.firstName && payment.lastName && payment.email;

  return (
    <Card className="shadow-premium bg-gradient-card border-0">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-3">
          <CreditCard className="w-7 h-7 text-primary" />
          Secure Payment
        </CardTitle>
        <CardDescription className="text-base">
          Complete your payment to confirm your appointment booking
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Payment Summary */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Payment Summary</h3>
          
          <Card className="bg-card border">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Fee</span>
                  <span className="font-medium">BD {serviceFee.toFixed(3)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pre-verification Fee</span>
                  <span className="font-medium">BD {preVerificationFee.toFixed(3)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Processing Fee</span>
                  <span className="font-medium">BD {processingFee.toFixed(3)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span className="text-primary">BD {totalAmount.toFixed(3)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Billing Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Billing Information</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="text-sm font-medium">
                First Name *
              </Label>
              <Input
                id="firstName"
                type="text"
                placeholder="Enter first name"
                value={payment.firstName || ''}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="lastName" className="text-sm font-medium">
                Last Name *
              </Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Enter last name"
                value={payment.lastName || ''}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email address"
              value={payment.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="mt-1"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Receipt and appointment details will be sent to this email
            </p>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Payment Method</h3>
          
          <div className="grid gap-3">
            <div
              className={`
                p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                ${paymentMethod === 'card'
                  ? 'border-primary bg-primary-light shadow-lg'
                  : 'border-border bg-card hover:border-primary/30'
                }
              `}
              onClick={() => setPaymentMethod('card')}
            >
              <div className="flex items-center gap-3">
                <div className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center
                  ${paymentMethod === 'card'
                    ? 'border-primary bg-primary'
                    : 'border-muted-foreground'
                  }
                `}>
                  {paymentMethod === 'card' && (
                    <div className="w-3 h-3 rounded-full bg-primary-foreground" />
                  )}
                </div>
                <CreditCard className="w-5 h-5 text-primary" />
                <div>
                  <h4 className="font-semibold">Credit/Debit Card</h4>
                  <p className="text-sm text-muted-foreground">
                    Secure payment via Stripe
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-green-800 mb-1">Secure Payment</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• 256-bit SSL encryption protects your data</li>
                <li>• PCI DSS compliant payment processing</li>
                <li>• No card details stored on our servers</li>
                <li>• Instant payment confirmation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-orange-800 mb-1">Important Terms</h4>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Payment is non-refundable once appointment is confirmed</li>
                <li>• Rescheduling is allowed up to 24 hours before appointment</li>
                <li>• No-shows will forfeit the entire payment</li>
                <li>• Processing may take 2-3 business days after appointment</li>
              </ul>
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
            disabled={processing}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <Button
            onClick={handlePayment}
            disabled={!isFormComplete || processing}
            size="lg"
            className="min-w-[160px] bg-green-600 hover:bg-green-700"
          >
            {processing ? (
              <>
                <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin mr-2" />
                Processing...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 mr-2" />
                Pay BD {totalAmount.toFixed(3)}
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};