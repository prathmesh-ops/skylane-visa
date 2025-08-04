import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Clock, Star, ArrowRight } from 'lucide-react';

interface ServiceSelectionStepProps {
  selectedService: string;
  onServiceSelect: (service: string) => void;
  onNext: () => void;
}

const services = [
  {
    id: 'passport-fresh',
    title: 'Fresh Passport Application',
    description: 'New passport application with complete documentation',
    processing: '15-20 days',
    popular: true,
    price: 'BD 45.000',
  },
  {
    id: 'passport-renewal',
    title: 'Passport Renewal',
    description: 'Renew your existing passport with updated information',
    processing: '10-15 days',
    popular: true,
    price: 'BD 35.000',
  },
  {
    id: 'visa-tourist',
    title: 'Tourist Visa',
    description: 'Single or multiple entry tourist visa application',
    processing: '5-10 days',
    popular: false,
    price: 'BD 25.000',
  },
  {
    id: 'visa-business',
    title: 'Business Visa',
    description: 'Business visa for commercial activities',
    processing: '7-12 days',
    popular: false,
    price: 'BD 30.000',
  },
  {
    id: 'identity-verification',
    title: 'Identity Verification',
    description: 'Document attestation and identity verification',
    processing: '3-5 days',
    popular: false,
    price: 'BD 15.000',
  },
  {
    id: 'immigration-consultation',
    title: 'Immigration Consultation',
    description: 'Professional consultation for immigration processes',
    processing: '1-2 days',
    popular: false,
    price: 'BD 50.000',
  },
];

export const ServiceSelectionStep: React.FC<ServiceSelectionStepProps> = ({
  selectedService,
  onServiceSelect,
  onNext,
}) => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Select Your Service</h2>
        <p className="text-gray-600">
          Choose the service you need to get started with your appointment booking
        </p>
      </div>
      
      <div className="space-y-4 mb-8">
        {services.map((service) => (
          <div
            key={service.id}
            className={`
              relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-200
              ${selectedService === service.id
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm'
              }
            `}
            onClick={() => onServiceSelect(service.id)}
          >
            {service.popular && (
              <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <Star className="w-3 h-3" />
                Popular
              </div>
            )}
            
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-3">
                  {service.description}
                </p>
                
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-600">
                      {service.processing}
                    </span>
                  </div>
                  <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm font-medium">
                    {service.price}
                  </div>
                </div>
              </div>
              
              <div className={`
                w-6 h-6 rounded-full border-2 flex items-center justify-center
                ${selectedService === service.id
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-300'
                }
              `}>
                {selectedService === service.id && (
                  <div className="w-3 h-3 rounded-full bg-white" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-end pt-6 border-t border-gray-200">
        <Button
          onClick={onNext}
          disabled={!selectedService}
          size="lg"
          className="min-w-[120px] bg-blue-600 hover:bg-blue-700"
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};