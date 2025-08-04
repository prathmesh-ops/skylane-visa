import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Shield, 
  Users, 
  Clock, 
  CheckCircle2, 
  Upload, 
  Calendar,
  CreditCard,
  MapPin,
  ArrowRight,
  BookOpen,
  Award,
  Globe
} from 'lucide-react';

interface SkylaneProps {
  onBookAppointment: () => void;
}

const services = [
  {
    icon: FileText,
    title: 'Passport',
    description: 'Fresh passport applications, renewals, and replacements',
    color: 'text-blue-600'
  },
  {
    icon: Award,
    title: 'Visa',
    description: 'Tourist, business, and immigration visa services',
    color: 'text-green-600'
  },
  {
    icon: Globe,
    title: 'Immigration',
    description: 'Immigration consultancy and documentation',
    color: 'text-purple-600'
  },
  {
    icon: Shield,
    title: 'Identity',
    description: 'Identity verification and attestation services',
    color: 'text-orange-600'
  }
];

const steps = [
  {
    number: '01',
    title: 'Select Service',
    description: 'Choose your required service from our comprehensive list'
  },
  {
    number: '02',
    title: 'Document Collection',
    description: 'Get guided help with document requirements and templates'
  },
  {
    number: '03',
    title: 'Pre-Verification',
    description: 'Upload documents for secure pre-verification'
  },
  {
    number: '04',
    title: 'Book Appointment',
    description: 'Schedule your visit at your preferred time and location'
  }
];

export const SkylaneLanding: React.FC<SkylaneProps> = ({ onBookAppointment }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-light/5 to-accent-light/10">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">SKYLANE</h1>
                <p className="text-xs text-muted-foreground">Appointment Services</p>
              </div>
            </div>
            <Button onClick={onBookAppointment} size="lg" className="hidden md:flex">
              Book Appointment
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              Trusted Partner for Government Services
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Book Your Service with{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Ease
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Guided steps, document help, and secure pre-verification. 
              Experience hassle-free appointment booking for passport, visa, and identity services.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                onClick={onBookAppointment} 
                size="lg" 
                className="text-lg px-8 py-6"
              >
                Book Appointment Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                View Services
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Applications</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">99%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">Services</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Core Services
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive government service solutions designed to simplify your application process
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 bg-background">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto rounded-2xl bg-primary-light/20 flex items-center justify-center mb-4`}>
                      <Icon className={`w-8 h-8 ${service.color}`} />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Simple Steps to Your Appointment
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our streamlined process ensures a smooth experience from start to finish
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground text-xl font-bold shadow-lg">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-primary/30 -translate-x-1/2" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose Skylane?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-success/20 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-success" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Pre-Verification</h3>
              <p className="text-muted-foreground text-sm">
                Secure document verification before your appointment
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-primary/20 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Time Saving</h3>
              <p className="text-muted-foreground text-sm">
                Skip the queues with our streamlined booking system
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure & Trusted</h3>
              <p className="text-muted-foreground text-sm">
                Bank-level security for all your documents and data
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-primary border-0 text-primary-foreground shadow-2xl">
            <CardContent className="text-center py-12 px-6">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Book Your Appointment?
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers who trust Skylane for their government service needs
              </p>
              <Button 
                onClick={onBookAppointment}
                size="lg" 
                variant="secondary"
                className="text-lg px-8 py-6"
              >
                Start Your Application
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background/50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">SKYLANE</span>
            </div>
            <p className="text-muted-foreground text-sm text-center md:text-right">
              © 2024 Skylane. All rights reserved. | Trusted partner for government services
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};