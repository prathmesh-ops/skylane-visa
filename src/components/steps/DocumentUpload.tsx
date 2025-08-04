import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Upload, FileText, X, CheckCircle2, AlertCircle, ArrowRight, ArrowLeft, Cloud } from 'lucide-react';

interface DocumentUploadProps {
  documents: string[];
  uploadedFiles: File[];
  onFilesUpdate: (files: File[]) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({
  documents,
  uploadedFiles,
  onFilesUpdate,
  onNext,
  onPrevious,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadProgress = (uploadedFiles.length / documents.length) * 100;
  const isComplete = uploadedFiles.length === documents.length;

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newFiles = [...uploadedFiles, ...files];
    onFilesUpdate(newFiles.slice(0, documents.length)); // Limit to required documents
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    onFilesUpdate(newFiles);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    const newFiles = [...uploadedFiles, ...files];
    onFilesUpdate(newFiles.slice(0, documents.length));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className="shadow-premium bg-gradient-card border-0">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-3">
          <Upload className="w-7 h-7 text-primary" />
          Upload Documents
        </CardTitle>
        <CardDescription className="text-base">
          Upload your documents for pre-verification. Maximum file size: 5MB per document.
        </CardDescription>
        
        <div className="flex items-center gap-4 pt-4">
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-2">
              <span>Upload Progress</span>
              <span>{uploadedFiles.length} of {documents.length} documents</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
          </div>
          <Badge variant={isComplete ? "success" : "secondary"} className="px-3 py-1">
            {isComplete ? 'Complete' : 'In Progress'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Upload Area */}
        <div
          className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center transition-all duration-200 hover:border-primary/50 hover:bg-primary-light/10 cursor-pointer"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <Cloud className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            Drop files here or click to browse
          </h3>
          <p className="text-muted-foreground mb-4">
            Supported formats: PDF, JPG, PNG, DOC, DOCX
          </p>
          <Button variant="outline" className="min-w-[140px]">
            <Upload className="w-4 h-4 mr-2" />
            Browse Files
          </Button>
        </div>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Uploaded Documents ({uploadedFiles.length})
            </h3>
            <div className="space-y-3">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-card border rounded-lg hover:shadow-md transition-all duration-200"
                >
                  <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
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
                    <Badge variant="success">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Uploaded
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveFile(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Required Documents List */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-muted-foreground" />
            Required Documents Checklist
          </h3>
          <div className="grid gap-3">
            {documents.map((docId, index) => {
              const hasFile = index < uploadedFiles.length;
              return (
                <div
                  key={docId}
                  className={`
                    flex items-center gap-3 p-3 rounded-lg border
                    ${hasFile ? 'border-success bg-success/5' : 'border-border bg-card'}
                  `}
                >
                  <div className={`
                    w-6 h-6 rounded-full flex items-center justify-center
                    ${hasFile ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'}
                  `}>
                    {hasFile ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <span className="text-xs font-bold">{index + 1}</span>
                    )}
                  </div>
                  <span className={`font-medium ${hasFile ? 'text-success' : 'text-muted-foreground'}`}>
                    Document {index + 1}
                    {hasFile && ` - ${uploadedFiles[index]?.name}`}
                  </span>
                </div>
              );
            })}
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