import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe, Award, FileText, ArrowRight, CheckCircle2 } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  category: 'visa' | 'oci' | 'passport';
  isActive: boolean;
}

interface ApiServiceSelectionStepProps {
  selectedService: string;
  onServiceSelect: (service: string) => void;
  onNext: () => void;
  services: Service[];
  applicationParams: {
    citizenship: string;
    residence: string;
    destination: string;
  };
}

const categoryInfo = {
  visa: {
    icon: Globe,
    title: 'Visa Services',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    description: 'Various visa types for travel and residence'
  },
  oci: {
    icon: Award,
    title: 'OCI Services',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    description: 'Overseas Citizen of India related services'
  },
  passport: {
    icon: FileText,
    title: 'Passport Services',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    description: 'Passport applications and renewals'
  }
};

export const ApiServiceSelectionStep: React.FC<ApiServiceSelectionStepProps> = ({
  selectedService,
  onServiceSelect,
  onNext,
  services,
  applicationParams,
}) => {
  const activeServices = services.filter(service => service.isActive);
  
  const groupedServices = activeServices.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  const countries: Record<string, { name: string; flag: string }> = {
    'UA': { name: 'Ukraine', flag: '🇺🇦' },
    'BH': { name: 'Bahrain', flag: '🇧🇭' },
    'IN': { name: 'India', flag: '🇮🇳' },
    'US': { name: 'United States', flag: '🇺🇸' },
    'UK': { name: 'United Kingdom', flag: '🇬🇧' },
    'CA': { name: 'Canada', flag: '🇨🇦' },
    'AU': { name: 'Australia', flag: '🇦🇺' },
    'DE': { name: 'Germany', flag: '🇩🇪' },
    'FR': { name: 'France', flag: '🇫🇷' },
    'AE': { name: 'UAE', flag: '🇦🇪' },
    'SA': { name: 'Saudi Arabia', flag: '🇸🇦' },
    'QA': { name: 'Qatar', flag: '🇶🇦' },
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Select Your Service</h2>
        <p className="text-muted-foreground mb-4">
          Choose the service you need based on your selected criteria
        </p>
        
        {/* Selected Countries Display */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="flex items-center gap-1">
            <span>Citizenship:</span>
            <span>{countries[applicationParams.citizenship]?.flag}</span>
            <span>{countries[applicationParams.citizenship]?.name}</span>
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <span>Residence:</span>
            <span>{countries[applicationParams.residence]?.flag}</span>
            <span>{countries[applicationParams.residence]?.name}</span>
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <span>Destination:</span>
            <span>{countries[applicationParams.destination]?.flag}</span>
            <span>{countries[applicationParams.destination]?.name}</span>
          </Badge>
        </div>
      </div>
      
      <div className="space-y-6 mb-8">
        {Object.entries(groupedServices).map(([category, categoryServices]) => {
          const info = categoryInfo[category as keyof typeof categoryInfo];
          const Icon = info.icon;
          
          return (
            <Card key={category} className="border-0 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${info.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${info.color}`} />
                  </div>
                  <div>
                    <div className="text-lg">{info.title}</div>
                    <CardDescription className="text-sm">{info.description}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="ml-auto">
                    {categoryServices.length} available
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categoryServices.map((service) => (
                    <div
                      key={service.id}
                      className={`
                        relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                        ${selectedService === service.id
                          ? 'border-primary bg-primary/5 shadow-md'
                          : 'border-border bg-background hover:border-primary/50 hover:shadow-sm'
                        }
                      `}
                      onClick={() => onServiceSelect(service.id)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-base font-semibold mb-1 text-foreground">
                            {service.name}
                          </h3>
                          
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-success" />
                            <span>Available for your selection</span>
                          </div>
                        </div>
                        
                        <div className={`
                          w-6 h-6 rounded-full border-2 flex items-center justify-center
                          ${selectedService === service.id
                            ? 'border-primary bg-primary'
                            : 'border-border'
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
              </CardContent>
            </Card>
          );
        })}
        
        {activeServices.length === 0 && (
          <Card className="border-dashed border-2 border-muted">
            <CardContent className="text-center py-12">
              <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No Services Available</h3>
              <p className="text-muted-foreground">
                No services are currently available for the selected country combination.
                Please try different selections.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
      
      <div className="flex justify-end pt-6 border-t border-border">
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
    </div>
  );
};