import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Clock, Star, ArrowRight } from 'lucide-react';

interface ServiceSelectionProps {
  selectedService: string;
  onServiceSelect: (service: string) => void;
  onNext: () => void;
}

const services = [
  {
    id: 'passport-fresh-minor',
    title: 'Fresh Passport – Minor',
    description: 'New passport application for children under 18 years',
    processing: '10-15 days',
    popular: true,
    price: 'BD 25.000',
  },
  {
    id: 'passport-reissue-minor',
    title: 'Passport Reissue – Minor',
    description: 'Passport renewal for minors with existing passport',
    processing: '8-12 days',
    popular: false,
    price: 'BD 25.000',
  },
  {
    id: 'passport-replacement',
    title: 'Passport Replacement',
    description: 'For lost, damaged, or stolen passports',
    processing: '12-18 days',
    popular: false,
    price: 'BD 30.000',
  },
  {
    id: 'emergency-certificate',
    title: 'Emergency Certificate',
    description: 'Urgent travel document for emergency situations',
    processing: '2-3 days',
    popular: false,
    price: 'BD 15.000',
  },
  {
    id: 'passport-reissue-adult',
    title: 'Passport Reissue - Adult',
    description: 'Passport renewal for adults with existing passport',
    processing: '10-15 days',
    popular: true,
    price: 'BD 25.000',
  },
  {
    id: 'police-clearance',
    title: 'Police Clearance Certificate',
    description: 'Based on passport for background verification',
    processing: '15-20 days',
    popular: false,
    price: 'BD 20.000',
  },
];

export const ServiceSelection: React.FC<ServiceSelectionProps> = ({
  selectedService,
  onServiceSelect,
  onNext,
}) => {
  return (
    <Card className="shadow-premium bg-gradient-card border-0">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-3">
          <FileText className="w-7 h-7 text-primary" />
          Select Your Service
        </CardTitle>
        <CardDescription className="text-base">
          Choose the consular service you need to get started with your application
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          {services.map((service) => (
            <div
              key={service.id}
              className={`
                relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-200
                ${selectedService === service.id
                  ? 'border-primary bg-primary-light shadow-lg'
                  : 'border-border bg-card hover:border-primary/30 hover:shadow-md'
                }
              `}
              onClick={() => onServiceSelect(service.id)}
            >
              {service.popular && (
                <Badge className="absolute -top-2 -right-2 bg-gradient-success">
                  <Star className="w-3 h-3 mr-1" />
                  Popular
                </Badge>
              )}
              
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">
                        {service.processing}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-primary">
                      {service.price}
                    </Badge>
                  </div>
                </div>
                
                <div className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center
                  ${selectedService === service.id
                    ? 'border-primary bg-primary'
                    : 'border-muted-foreground'
                  }
                `}>
                  {selectedService === service.id && (
                    <div className="w-3 h-3 rounded-full bg-primary-foreground" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-end pt-6 border-t">
          <Button
            onClick={onNext}
            disabled={!selectedService}
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