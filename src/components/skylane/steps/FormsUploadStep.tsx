import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, X, CheckCircle2, ArrowRight, ArrowLeft, FolderOpen, User, CreditCard } from 'lucide-react';

interface FormsUploadStepProps {
  formsAndIds: Record<string, File[]>;
  onFormsUpdate: (forms: Record<string, File[]>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const requiredForms = [
  {
    id: 'passport-form',
    title: 'Passport Application Form',
    description: 'Completed and signed passport application form',
    icon: FileText,
    required: true
  },
  {
    id: 'xrc-form',
    title: 'XRC Form',
    description: 'External Registration Certificate form',
    icon: FileText,
    required: true
  },
  {
    id: 'national-id',
    title: 'National ID',
    description: 'Clear copy of front and back of National ID',
    icon: CreditCard,
    required: true
  },
  {
    id: 'birth-certificate',
    title: 'Birth Certificate',
    description: 'Original birth certificate or certified copy',
    icon: FileText,
    required: true
  },
  {
    id: 'parent-id',
    title: 'Parent\'s ID',
    description: 'Copy of parent or guardian identification',
    icon: User,
    required: false
  },
  {
    id: 'visa-documents',
    title: 'Visa Documents',
    description: 'Current visa or residence permit documents',
    icon: FileText,
    required: false
  }
];

export const FormsUploadStep: React.FC<FormsUploadStepProps> = ({
  formsAndIds,
  onFormsUpdate,
  onNext,
  onPrevious,
}) => {
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleFileSelect = (formId: string, files: FileList | null) => {
    if (!files) return;
    
    const newFiles = Array.from(files);
    const updatedForms = {
      ...formsAndIds,
      [formId]: [...(formsAndIds[formId] || []), ...newFiles]
    };
    onFormsUpdate(updatedForms);
  };

  const handleRemoveFile = (formId: string, fileIndex: number) => {
    const updatedFiles = (formsAndIds[formId] || []).filter((_, index) => index !== fileIndex);
    const updatedForms = {
      ...formsAndIds,
      [formId]: updatedFiles
    };
    onFormsUpdate(updatedForms);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const requiredFormsCount = requiredForms.filter(form => form.required).length;
  const completedRequiredForms = requiredForms.filter(form => 
    form.required && (formsAndIds[form.id]?.length > 0)
  ).length;
  const isComplete = completedRequiredForms === requiredFormsCount;

  return (
    <Card className="shadow-premium bg-gradient-card border-0">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-3">
          <FolderOpen className="w-7 h-7 text-primary" />
          Upload Forms & IDs
        </CardTitle>
        <CardDescription className="text-base">
          Upload your completed application forms and identity documents
        </CardDescription>
        
        <div className="flex items-center justify-between pt-4">
          <div className="text-sm text-muted-foreground">
            {completedRequiredForms} of {requiredFormsCount} required forms uploaded
          </div>
          <Badge variant={isComplete ? "success" : "secondary"} className="px-3 py-1">
            {isComplete ? 'Complete' : 'In Progress'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {requiredForms.map((form) => {
          const Icon = form.icon;
          const files = formsAndIds[form.id] || [];
          const hasFiles = files.length > 0;
          
          return (
            <div key={form.id} className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    hasFiles ? 'bg-success/20' : 'bg-primary-light'
                  }`}>
                    <Icon className={`w-5 h-5 ${hasFiles ? 'text-success' : 'text-primary'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground">{form.title}</h4>
                      {form.required && (
                        <Badge variant="destructive" className="text-xs">Required</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{form.description}</p>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRefs.current[form.id]?.click()}
                  className="flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Upload
                </Button>
              </div>

              <input
                ref={(el) => fileInputRefs.current[form.id] = el}
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={(e) => handleFileSelect(form.id, e.target.files)}
                className="hidden"
              />

              {/* Uploaded Files for this form */}
              {files.length > 0 && (
                <div className="ml-13 space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-card border rounded-lg"
                    >
                      <div className="w-8 h-8 bg-primary-light rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4 text-primary" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">
                          {file.name}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{formatFileSize(file.size)}</span>
                          <span>•</span>
                          <span className="capitalize">{file.type.split('/')[1] || 'Unknown'}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant="success" className="text-xs">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Uploaded
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveFile(form.id, index)}
                          className="text-destructive hover:text-destructive p-1"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload area for empty state */}
              {files.length === 0 && (
                <div
                  className="ml-13 border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 hover:bg-primary-light/5 transition-all duration-200"
                  onClick={() => fileInputRefs.current[form.id]?.click()}
                >
                  <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload {form.title.toLowerCase()}
                  </p>
                </div>
              )}
            </div>
          );
        })}

        {/* Upload Guidelines */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">Upload Guidelines</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Maximum file size: 5MB per document</li>
            <li>• Supported formats: PDF, JPG, PNG, DOC, DOCX</li>
            <li>• Ensure documents are clear and readable</li>
            <li>• Upload both front and back for ID documents</li>
          </ul>
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
            disabled={!isComplete}
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