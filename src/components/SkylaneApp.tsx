import React, { useState } from 'react';
import { ConsularLanding } from './skylane/ConsularLanding';
import { SkylaneBooking } from './skylane/SkylaneBooking';

interface Service {
  id: string;
  name: string;
  category: 'visa' | 'oci' | 'passport';
  isActive: boolean;
}

interface ApplicationParams {
  citizenship: string;
  residence: string;
  destination: string;
  services: Service[];
}

export const SkylaneApp: React.FC = () => {
  const [showBooking, setShowBooking] = useState(false);
  const [applicationParams, setApplicationParams] = useState<ApplicationParams | null>(null);

  const handleStartApplication = (params: ApplicationParams) => {
    setApplicationParams(params);
    setShowBooking(true);
  };

  const handleBackToHome = () => {
    setShowBooking(false);
    setApplicationParams(null);
  };

  if (showBooking && applicationParams) {
    return <SkylaneBooking onBackToHome={handleBackToHome} applicationParams={applicationParams} />;
  }

  return <ConsularLanding onStartApplication={handleStartApplication} />;
};