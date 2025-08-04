import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Globe, 
  ArrowRight, 
  Shield, 
  Clock, 
  CheckCircle2, 
  MapPin,
  FileText,
  Award,
  Users,
  Briefcase,
  GraduationCap,
  Plane,
  Heart,
  ChevronRight,
  Sparkles,
  Star
} from 'lucide-react';

interface ConsularLandingProps {
  onStartApplication: (params: { citizenship: string; residence: string; destination: string; services: Service[] }) => void;
}

interface Service {
  id: string;
  name: string;
  category: 'visa' | 'oci' | 'passport';
  isActive: boolean;
}

interface Country {
  code: string;
  name: string;
  flag: string;
  region: string;
}

const countries: Country[] = [
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦', region: 'Europe' },
  { code: 'BH', name: 'Bahrain', flag: '🇧🇭', region: 'Middle East' },
  { code: 'IN', name: 'India', flag: '🇮🇳', region: 'Asia' },
  { code: 'US', name: 'United States', flag: '🇺🇸', region: 'North America' },
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧', region: 'Europe' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', region: 'North America' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', region: 'Oceania' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', region: 'Europe' },
  { code: 'FR', name: 'France', flag: '🇫🇷', region: 'Europe' },
  { code: 'AE', name: 'UAE', flag: '🇦🇪', region: 'Middle East' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', region: 'Middle East' },
  { code: 'QA', name: 'Qatar', flag: '🇶🇦', region: 'Middle East' },
];

// Mock API response with the provided structure
const mockApiResponse: Service[] = [
  {
    "id": "student-visa-duration-up-to-five-years-entries-single-multiple",
    "name": "Student Visa",
    "category": "visa",
    "isActive": true
  },
  {
    "id": "business-visa-duration-up-to-one-year-entries-single-multiple",
    "name": "Business Visa",
    "category": "visa",
    "isActive": true
  },
  {
    "id": "tourist-visa-duration-up-to-one-year-entries-multiple",
    "name": "Tourist Visa",
    "category": "visa",
    "isActive": true
  },
  {
    "id": "transit-visa-duration-up-to-fifteen-days-entries-single-double",
    "name": "Transit Visa",
    "category": "visa",
    "isActive": true
  },
  {
    "id": "employment-visa-duration-up-to-six-months-entries-single-multiple",
    "name": "Employment Visa",
    "category": "visa",
    "isActive": true
  },
  {
    "id": "medical-visa-6mo-single-multiple",
    "name": "Medical Visa",
    "category": "visa",
    "isActive": true
  },
  {
    "id": "oci-transfer-to-new-passport",
    "name": "OCI Transfer to New Passport",
    "category": "oci",
    "isActive": true
  },
  {
    "id": "apply-oci-card",
    "name": "Apply for OCI Card",
    "category": "oci",
    "isActive": true
  },
  {
    "id": "replacement-oci-card",
    "name": "Replacement OCI Card in lieu of lost, damaged or stolen OCI Card",
    "category": "oci",
    "isActive": true
  }
];

const categoryInfo = {
  visa: {
    icon: Globe,
    title: 'Visa Services',
    description: 'Tourist, Business, Employment & Medical visas',
    color: '#3B82F6',
    bgColor: '#EFF6FF',
    accent: '#DBEAFE',
    gradient: 'from-blue-500 to-indigo-600',
    textGradient: 'from-blue-600 to-indigo-700'
  },
  oci: {
    icon: Award,
    title: 'OCI Services',
    description: 'Overseas Citizen of India applications',
    color: '#10B981',
    bgColor: '#ECFDF5',
    accent: '#D1FAE5',
    gradient: 'from-emerald-500 to-green-600',
    textGradient: 'from-emerald-600 to-green-700'
  },
  passport: {
    icon: FileText,
    title: 'Passport Services',
    description: 'Passport renewals and applications',
    color: '#F59E0B',
    bgColor: '#FFFBEB',
    accent: '#FEF3C7',
    gradient: 'from-amber-500 to-orange-600',
    textGradient: 'from-amber-600 to-orange-700'
  }
};

const CountrySelector: React.FC<{
  title: string;
  description: string;
  selected: string;
  onSelect: (code: string) => void;
  countries: Country[];
}> = ({ title, description, selected, onSelect, countries }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedCountry = countries.find(c => c.code === selected);
  
  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-4 bg-card border border-input-border rounded-xl hover:bg-primary/5 hover:border-primary/30 hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            {selectedCountry ? (
              <>
                <span className="text-2xl">{selectedCountry.flag}</span>
                <div className="text-left">
                  <div className="font-medium text-foreground">{selectedCountry.name}</div>
                  <div className="text-xs text-muted-foreground">{selectedCountry.region}</div>
                </div>
              </>
            ) : (
              <div className="text-muted-foreground">Select a country</div>
            )}
          </div>
          <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 right-0 z-50 mt-2 bg-popover border border-border rounded-xl shadow-premium max-h-64 overflow-y-auto animate-fade-in">
            <div className="p-2">
              {countries.map((country) => (
                <button
                  key={country.code}
                  onClick={() => {
                    onSelect(country.code);
                    setIsOpen(false);
                  }}
                  className="w-full p-3 hover:bg-primary/5 hover:shadow-sm rounded-lg transition-all duration-200 flex items-center gap-3 text-left transform hover:translate-x-1"
                >
                  <span className="text-xl">{country.flag}</span>
                  <div>
                    <div className="font-medium text-foreground">{country.name}</div>
                    <div className="text-xs text-muted-foreground">{country.region}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const ConsularLanding: React.FC<ConsularLandingProps> = ({ onStartApplication }) => {
  const [citizenship, setCitizenship] = useState<string>('');
  const [residence, setResidence] = useState<string>('');
  const [destination, setDestination] = useState<string>('IN');
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('visa');

  const fetchServices = async () => {
    if (!citizenship || !residence || !destination) return;
    
    setLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        setServices(mockApiResponse);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching services:', error);
      setServices(mockApiResponse);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [citizenship, residence, destination]);

  const canProceed = citizenship && residence && destination && services.some(s => s.isActive);
  const activeServices = services.filter(service => service.isActive);
  const groupedServices = activeServices.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  const handleStartApplication = (selectedService?: Service) => {
    if (selectedService) {
      // Start application with specific service
      onStartApplication({ citizenship, residence, destination, services: [selectedService] });
    } else if (canProceed) {
      // Start application with all services
      onStartApplication({ citizenship, residence, destination, services: activeServices });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/3 to-accent/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur-md sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-premium group-hover:shadow-lg transform group-hover:scale-105 transition-all duration-300">
                <Globe className="w-7 h-7 text-primary-foreground group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">SKYLANE</h1>
                <p className="text-sm text-muted-foreground">Indian Consular Application Centre</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm text-muted-foreground">Premium Service</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center mb-16">
            <Badge variant="secondary" className="mb-8 px-6 py-3 text-sm bg-card shadow-premium border-border/50 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 animate-fade-in">
              <Shield className="w-4 h-4 mr-2 text-primary" />
              Trusted Partner to the Embassy of India
              <Star className="w-3 h-3 ml-2 text-accent animate-pulse" />
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-8 leading-tight animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Welcome to{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent relative">
                SKYLANE
                <div className="absolute inset-0 bg-gradient-primary bg-clip-text text-transparent opacity-50 blur-sm"></div>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.4s' }}>
              An exclusive trusted partner to the Embassy of India, Bahrain which manages the administrative function of the consular section.
            </p>

            {/* Floating elements */}
            <div className="absolute top-10 left-10 hidden lg:block animate-bounce" style={{ animationDelay: '1s' }}>
              <div className="w-2 h-2 bg-primary rounded-full opacity-40"></div>
            </div>
            <div className="absolute top-20 right-20 hidden lg:block animate-bounce" style={{ animationDelay: '2s' }}>
              <div className="w-3 h-3 bg-accent rounded-full opacity-40"></div>
            </div>
            <div className="absolute bottom-20 left-1/4 hidden lg:block animate-bounce" style={{ animationDelay: '3s' }}>
              <div className="w-1 h-1 bg-primary rounded-full opacity-60"></div>
            </div>
          </div>

          {/* Enhanced Country Selection */}
          <div className="max-w-6xl mx-auto animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Card className="bg-background/80 backdrop-blur-md border border-border/50 shadow-premium overflow-hidden hover:shadow-lg transform hover:-translate-y-1 transition-all duration-500 group">
              <div className="bg-gradient-to-r from-primary/10 via-transparent to-accent/10 p-8 relative overflow-hidden">
                {/* Subtle animation overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="text-center mb-8 relative z-10">
                  <h2 className="text-3xl font-bold text-foreground mb-3 flex items-center justify-center gap-3">
                    Start Your Application
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center animate-pulse">
                      <ArrowRight className="w-4 h-4 text-primary-foreground" />
                    </div>
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    Select your countries to discover available consular services
                  </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mb-8 relative z-10">
                  <CountrySelector
                    title="Your Citizenship"
                    description="Country that issued your passport"
                    selected={citizenship}
                    onSelect={setCitizenship}
                    countries={countries}
                  />
                  
                  <CountrySelector
                    title="Your Residence"
                    description="Country where you currently live"
                    selected={residence}
                    onSelect={setResidence}
                    countries={countries}
                  />
                  
                  <CountrySelector
                    title="Destination"
                    description="Country you're applying for services"
                    selected={destination}
                    onSelect={setDestination}
                    countries={[{ code: 'IN', name: 'India', flag: '🇮🇳', region: 'Asia' }]}
                  />
                </div>

                {loading && (
                  <div className="text-center py-12 relative z-10">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto"></div>
                      <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin mx-auto absolute top-2 left-1/2 transform -translate-x-1/2" style={{ animationDirection: 'reverse' }}></div>
                      <div className="w-8 h-8 border-2 border-primary/40 border-t-transparent rounded-full animate-spin mx-auto absolute top-4 left-1/2 transform -translate-x-1/2"></div>
                    </div>
                    <p className="text-muted-foreground mt-4 text-lg animate-pulse">Discovering available services...</p>
                    <div className="flex justify-center gap-1 mt-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                )}

                {activeServices.length > 0 && !loading && (
                  <div className="space-y-6 relative z-10 animate-fade-in">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-foreground mb-2 flex items-center justify-center gap-2">
                        Available Services
                        <Badge variant="secondary" className="bg-success text-success-foreground animate-pulse">
                          {activeServices.length}
                        </Badge>
                      </h3>
                      <p className="text-muted-foreground">Choose from {activeServices.length} available services</p>
                    </div>

                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                      <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3 mb-6 bg-card/50 backdrop-blur-sm border border-border/50 p-1 h-auto shadow-md">
                        {Object.entries(groupedServices).map(([category, categoryServices]) => {
                          const info = categoryInfo[category as keyof typeof categoryInfo];
                          const Icon = info.icon;
                          
                          return (
                            <TabsTrigger 
                              key={category} 
                              value={category}
                              className="flex-col gap-2 p-4 h-auto data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-primary/20 hover:bg-background/80 transition-all duration-200 group"
                            >
                              <div className="flex items-center gap-2">
                                <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" style={{ color: info.color }} />
                                <span className="font-medium">{info.title}</span>
                              </div>
                              <Badge 
                                variant="secondary" 
                                className="text-xs shadow-sm"
                                style={{ backgroundColor: `${info.color}15`, color: info.color }}
                              >
                                {categoryServices.length} services
                              </Badge>
                            </TabsTrigger>
                          );
                        })}
                      </TabsList>

                      {Object.entries(groupedServices).map(([category, categoryServices]) => {
                        const info = categoryInfo[category as keyof typeof categoryInfo];
                        const Icon = info.icon;
                        
                        return (
                          <TabsContent key={category} value={category} className="space-y-4 animate-fade-in">
                            <div className="text-center mb-6">
                              <div 
                                className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 group"
                                style={{ backgroundColor: info.bgColor }}
                              >
                                <Icon className="w-8 h-8 group-hover:rotate-12 transition-transform duration-300" style={{ color: info.color }} />
                              </div>
                              <h4 className="text-xl font-semibold text-foreground mb-2">{info.title}</h4>
                              <p className="text-muted-foreground">{info.description}</p>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-4">
                              {categoryServices.map((service, index) => (
                                <Card 
                                  key={service.id} 
                                  className="border border-border/50 shadow-md hover:shadow-premium hover:border-primary/30 transition-all duration-300 cursor-pointer group overflow-hidden transform hover:-translate-y-1 hover:scale-[1.02] animate-fade-in"
                                  style={{ animationDelay: `${index * 0.1}s` }}
                                  onClick={() => handleStartApplication(service)}
                                >
                                  <div className={`absolute inset-0 bg-gradient-to-r ${info.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                  <CardContent className="p-6 relative">
                                    <div className="flex items-start gap-4">
                                      <div 
                                        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:-rotate-3`}
                                        style={{ backgroundColor: info.bgColor }}
                                      >
                                        <CheckCircle2 className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" style={{ color: info.color }} />
                                      </div>
                                      <div className="flex-1">
                                        <h5 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">{service.name}</h5>
                                        <div className="flex items-center justify-between">
                                          <Badge 
                                            variant="secondary" 
                                            className="text-xs font-medium shadow-sm"
                                            style={{ 
                                              backgroundColor: info.accent,
                                              color: info.color 
                                            }}
                                          >
                                            Available
                                          </Badge>
                                          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-200" />
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-2 group-hover:text-opacity-80">
                                          Click to start application
                                        </p>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </TabsContent>
                        );
                      })}
                    </Tabs>
                  </div>
                )}

                <div className="text-center pt-8">
                  <Button 
                    onClick={() => handleStartApplication()}
                    disabled={!canProceed || loading}
                    size="lg" 
                    className="text-lg px-12 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Start Application
                    <ArrowRight className="w-6 h-6 ml-3" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Simple 4-Step Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our streamlined process ensures quick and efficient service delivery
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[
              {
                step: '01',
                icon: Globe,
                title: 'Select Service',
                description: 'Choose your preferred consular service from our comprehensive list.',
                color: 'hsl(var(--primary))'
              },
              {
                step: '02',
                icon: FileText,
                title: 'Collect Documents',
                description: 'Gather all required documents including passport and supporting materials.',
                color: 'hsl(var(--accent))'
              },
              {
                step: '03',
                icon: Clock,
                title: 'Upload & Verify',
                description: 'Submit your documents online for pre-verification and faster processing.',
                color: 'hsl(var(--success))'
              },
              {
                step: '04',
                icon: MapPin,
                title: 'Visit ICAC',
                description: 'Complete your application submission at our Bahrain office.',
                color: 'hsl(var(--warning))'
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-8 text-center">
                    <div 
                      className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.step}
                    </div>
                    <div 
                      className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${item.color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: item.color }} />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-4 mb-6 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center">
                <Globe className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <span className="font-bold text-foreground text-lg">SKYLANE</span>
                <p className="text-xs text-muted-foreground">Consular Services</p>
              </div>
            </div>
            <p className="text-muted-foreground text-center md:text-right">
              © 2024 Skylane. All rights reserved. | Trusted partner for consular services
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};