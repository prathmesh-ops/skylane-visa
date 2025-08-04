import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, FileText, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';

interface DocumentCollectionProps {
  service: string;
  documents: string[];
  onDocumentsUpdate: (documents: string[]) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const documentRequirements: Record<string, Array<{
  id: string;
  title: string;
  description: string;
  required: boolean;
}>> = {
  'passport-fresh-minor': [
    {
      id: 'birth-certificate',
      title: 'Birth Certificate',
      description: 'Original birth certificate with apostille/attestation',
      required: true,
    },
    {
      id: 'parents-passport',
      title: 'Parents Passport Copy',
      description: 'Copy of both parents valid passports',
      required: true,
    },
    {
      id: 'photographs',
      title: 'Passport Photographs',
      description: '2 recent passport-size photographs (white background)',
      required: true,
    },
    {
      id: 'residence-proof',
      title: 'Residence Proof',
      description: 'CPR copy of the minor and parents',
      required: true,
    },
    {
      id: 'no-objection',
      title: 'No Objection Certificate',
      description: 'From the embassy if parents are of different nationalities',
      required: false,
    },
  ],
  'passport-reissue-adult': [
    {
      id: 'current-passport',
      title: 'Current Passport',
      description: 'Original passport for renewal',
      required: true,
    },
    {
      id: 'photographs',
      title: 'Passport Photographs',
      description: '2 recent passport-size photographs (white background)',
      required: true,
    },
    {
      id: 'residence-proof',
      title: 'Residence Proof',
      description: 'Valid CPR copy',
      required: true,
    },
    {
      id: 'employment-certificate',
      title: 'Employment Certificate',
      description: 'Letter from employer or business license',
      required: true,
    },
  ],
  'emergency-certificate': [
    {
      id: 'police-report',
      title: 'Police Report',
      description: 'In case of lost/stolen passport',
      required: true,
    },
    {
      id: 'travel-tickets',
      title: 'Travel Documents',
      description: 'Confirmed flight tickets showing travel urgency',
      required: true,
    },
    {
      id: 'photographs',
      title: 'Passport Photographs',
      description: '2 recent passport-size photographs (white background)',
      required: true,
    },
    {
      id: 'identity-proof',
      title: 'Identity Proof',
      description: 'Any government-issued ID with photograph',
      required: true,
    },
  ],
};

export const DocumentCollection: React.FC<DocumentCollectionProps> = ({
  service,
  documents,
  onDocumentsUpdate,
  onNext,
  onPrevious,
}) => {
  const serviceDocuments = documentRequirements[service] || [];
  const requiredDocuments = serviceDocuments.filter(doc => doc.required);
  const optionalDocuments = serviceDocuments.filter(doc => !doc.required);
  
  const completedRequired = requiredDocuments.filter(doc => 
    documents.includes(doc.id)
  ).length;
  
  const isReadyToNext = completedRequired === requiredDocuments.length;

  const handleDocumentToggle = (documentId: string) => {
    const updatedDocuments = documents.includes(documentId)
      ? documents.filter(id => id !== documentId)
      : [...documents, documentId];
    onDocumentsUpdate(updatedDocuments);
  };

  return (
    <Card className="shadow-premium bg-gradient-card border-0">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-3">
          <CheckCircle2 className="w-7 h-7 text-primary" />
          Collect Required Documents
        </CardTitle>
        <CardDescription className="text-base">
          Ensure you have all the required documents before proceeding to upload
        </CardDescription>
        
        <div className="flex items-center gap-4 pt-4">
          <Badge variant={isReadyToNext ? "default" : "secondary"} className="px-3 py-1">
            {completedRequired} of {requiredDocuments.length} required documents
          </Badge>
          {!isReadyToNext && (
            <div className="flex items-center gap-2 text-warning">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">Missing required documents</span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Required Documents */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-destructive" />
            Required Documents
          </h3>
          <div className="space-y-3">
            {requiredDocuments.map((document) => (
              <div
                key={document.id}
                className={`
                  flex items-start gap-4 p-4 rounded-lg border transition-all duration-200
                  ${documents.includes(document.id)
                    ? 'border-success bg-success/5'
                    : 'border-border bg-card hover:border-primary/30'
                  }
                `}
              >
                <Checkbox
                  id={document.id}
                  checked={documents.includes(document.id)}
                  onCheckedChange={() => handleDocumentToggle(document.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <label
                    htmlFor={document.id}
                    className="font-medium text-foreground cursor-pointer block mb-1"
                  >
                    {document.title}
                    <Badge variant="destructive" className="ml-2 text-xs">
                      Required
                    </Badge>
                  </label>
                  <p className="text-sm text-muted-foreground">
                    {document.description}
                  </p>
                </div>
                {documents.includes(document.id) && (
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-1" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Optional Documents */}
        {optionalDocuments.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-muted-foreground" />
              Optional Documents
            </h3>
            <div className="space-y-3">
              {optionalDocuments.map((document) => (
                <div
                  key={document.id}
                  className={`
                    flex items-start gap-4 p-4 rounded-lg border transition-all duration-200
                    ${documents.includes(document.id)
                      ? 'border-accent bg-accent-light'
                      : 'border-border bg-card hover:border-primary/30'
                    }
                  `}
                >
                  <Checkbox
                    id={document.id}
                    checked={documents.includes(document.id)}
                    onCheckedChange={() => handleDocumentToggle(document.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <label
                      htmlFor={document.id}
                      className="font-medium text-foreground cursor-pointer block mb-1"
                    >
                      {document.title}
                      <Badge variant="outline" className="ml-2 text-xs">
                        Optional
                      </Badge>
                    </label>
                    <p className="text-sm text-muted-foreground">
                      {document.description}
                    </p>
                  </div>
                  {documents.includes(document.id) && (
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <Button
            onClick={onPrevious}
            variant="outline"
            size="lg"
            className="min-w-[120px]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <Button
            onClick={onNext}
            disabled={!isReadyToNext}
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