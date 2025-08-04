import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Download, FileText, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';

interface DocumentCollectionStepProps {
  service: string;
  documents: string[];
  onDocumentsUpdate: (documents: string[]) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const serviceDocuments: Record<string, Array<{id: string, name: string, required: boolean, hasTemplate: boolean}>> = {
  'passport-fresh': [
    { id: 'birth-certificate', name: 'Birth Certificate', required: true, hasTemplate: false },
    { id: 'national-id', name: 'National ID Copy', required: true, hasTemplate: false },
    { id: 'photos', name: 'Passport Size Photos (2)', required: true, hasTemplate: false },
    { id: 'application-form', name: 'Passport Application Form', required: true, hasTemplate: true },
    { id: 'parent-consent', name: 'Parent Consent Letter', required: false, hasTemplate: true },
  ],
  'passport-renewal': [
    { id: 'old-passport', name: 'Old Passport Copy', required: true, hasTemplate: false },
    { id: 'national-id', name: 'National ID Copy', required: true, hasTemplate: false },
    { id: 'photos', name: 'Recent Passport Photos (2)', required: true, hasTemplate: false },
    { id: 'renewal-form', name: 'Passport Renewal Form', required: true, hasTemplate: true },
  ],
  'visa-tourist': [
    { id: 'passport', name: 'Valid Passport', required: true, hasTemplate: false },
    { id: 'photos', name: 'Visa Application Photos (2)', required: true, hasTemplate: false },
    { id: 'visa-form', name: 'Tourist Visa Application Form', required: true, hasTemplate: true },
    { id: 'travel-itinerary', name: 'Travel Itinerary', required: true, hasTemplate: true },
    { id: 'bank-statement', name: 'Bank Statement (3 months)', required: true, hasTemplate: false },
  ],
  // Add more service documents as needed
};

export const DocumentCollectionStep: React.FC<DocumentCollectionStepProps> = ({
  service,
  documents,
  onDocumentsUpdate,
  onNext,
  onPrevious,
}) => {
  const requiredDocs = serviceDocuments[service] || [];
  
  React.useEffect(() => {
    // Auto-select all required documents
    const requiredDocIds = requiredDocs.filter(doc => doc.required).map(doc => doc.id);
    onDocumentsUpdate(requiredDocIds);
  }, [service]);

  const toggleDocument = (docId: string) => {
    const doc = requiredDocs.find(d => d.id === docId);
    if (doc?.required) return; // Can't unselect required documents
    
    if (documents.includes(docId)) {
      onDocumentsUpdate(documents.filter(id => id !== docId));
    } else {
      onDocumentsUpdate([...documents, docId]);
    }
  };

  const handleDownloadTemplate = (docId: string) => {
    // Simulate template download
    console.log(`Downloading template for ${docId}`);
  };

  return (
    <Card className="shadow-premium bg-gradient-card border-0">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-3">
          <FileText className="w-7 h-7 text-primary" />
          Required Documents
        </CardTitle>
        <CardDescription className="text-base">
          Prepare all required documents for your {service.replace('-', ' ')} application
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Important Notice */}
        <div className="flex items-start gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-orange-800 mb-1">Important Notice</h4>
            <p className="text-sm text-orange-700">
              Please ensure all documents are clear, readable, and in the specified format. 
              Original documents will be required during your appointment.
            </p>
          </div>
        </div>

        {/* Document Checklist */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            Document Checklist
          </h3>
          <div className="space-y-3">
            {requiredDocs.map((doc) => {
              const isSelected = documents.includes(doc.id);
              return (
                <div
                  key={doc.id}
                  className={`
                    flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200
                    ${isSelected ? 'border-success bg-success/5' : 'border-border bg-card'}
                    ${!doc.required ? 'cursor-pointer hover:border-primary/30' : ''}
                  `}
                  onClick={() => !doc.required ? toggleDocument(doc.id) : undefined}
                >
                  <div className="flex items-center gap-4">
                    <div className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center
                      ${isSelected ? 'border-success bg-success text-success-foreground' : 'border-muted-foreground'}
                    `}>
                      {isSelected && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{doc.name}</span>
                        {doc.required && (
                          <Badge variant="destructive" className="text-xs">Required</Badge>
                        )}
                      </div>
                      {doc.hasTemplate && (
                        <p className="text-sm text-muted-foreground">Template available for download</p>
                      )}
                    </div>
                  </div>
                  
                  {doc.hasTemplate && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadTemplate(doc.id);
                      }}
                      className="flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Template
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-primary-light/10 rounded-lg p-4">
          <h4 className="font-semibold text-primary mb-2">Summary</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Required documents:</span>
              <span className="ml-2 font-medium">
                {requiredDocs.filter(doc => doc.required).length}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Optional documents:</span>
              <span className="ml-2 font-medium">
                {requiredDocs.filter(doc => !doc.required && documents.includes(doc.id)).length}
              </span>
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
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <Button
            onClick={onNext}
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