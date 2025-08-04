import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { User, Upload, FileText, X, CheckCircle2, ArrowRight, ArrowLeft, Camera, BookOpen } from 'lucide-react';

interface PersonalInfoStepProps {
  personalInfo: Record<string, any>;
  onInfoUpdate: (info: Record<string, any>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  personalInfo,
  onInfoUpdate,
  onNext,
  onPrevious,
}) => {
  const passportFileRef = useRef<HTMLInputElement>(null);
  const photoFileRef = useRef<HTMLInputElement>(null);
  const visaFileRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: string, value: string) => {
    onInfoUpdate({
      ...personalInfo,
      [field]: value
    });
  };

  const handleFileUpload = (field: string, files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    onInfoUpdate({
      ...personalInfo,
      [field]: file
    });
  };

  const handleRemoveFile = (field: string) => {
    const updatedInfo = { ...personalInfo };
    delete updatedInfo[field];
    onInfoUpdate(updatedInfo);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const requiredFields = [
    'passportNumber',
    'passportFile',
    'profilePhoto'
  ];

  const isComplete = requiredFields.every(field => personalInfo[field]);

  return (
    <Card className="shadow-premium bg-gradient-card border-0">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-3">
          <User className="w-7 h-7 text-primary" />
          Personal Information
        </CardTitle>
        <CardDescription className="text-base">
          Complete your personal information and upload required documents
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Passport Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Passport Information
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="passportNumber" className="text-sm font-medium">
                Passport Number *
              </Label>
              <Input
                id="passportNumber"
                type="text"
                placeholder="Enter passport number"
                value={personalInfo.passportNumber || ''}
                onChange={(e) => handleInputChange('passportNumber', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="passportExpiry" className="text-sm font-medium">
                Passport Expiry Date
              </Label>
              <Input
                id="passportExpiry"
                type="date"
                value={personalInfo.passportExpiry || ''}
                onChange={(e) => handleInputChange('passportExpiry', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          {/* Passport Upload */}
          <div>
            <Label className="text-sm font-medium mb-2 block">
              Passport Copy (Front & Back) *
            </Label>
            
            {!personalInfo.passportFile ? (
              <div
                className="border-2 border-dashed border-primary/30 rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 hover:bg-primary-light/5 transition-all duration-200"
                onClick={() => passportFileRef.current?.click()}
              >
                <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-1">
                  Click to upload passport copy
                </p>
                <p className="text-xs text-muted-foreground">
                  PDF, JPG, PNG - Max 5MB
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-3 bg-card border rounded-lg">
                <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    {personalInfo.passportFile.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatFileSize(personalInfo.passportFile.size)}
                  </p>
                </div>
                <Badge variant="success" className="text-xs">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Uploaded
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveFile('passportFile')}
                  className="text-destructive hover:text-destructive p-1"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
            
            <input
              ref={passportFileRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload('passportFile', e.target.files)}
              className="hidden"
            />
          </div>
        </div>

        {/* Profile Photo */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Camera className="w-5 h-5 text-primary" />
            Profile Photo
          </h3>
          
          {!personalInfo.profilePhoto ? (
            <div
              className="border-2 border-dashed border-primary/30 rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 hover:bg-primary-light/5 transition-all duration-200"
              onClick={() => photoFileRef.current?.click()}
            >
              <Camera className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-1">
                Upload your profile photo *
              </p>
              <p className="text-xs text-muted-foreground">
                JPG, PNG - Passport size photo
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-3 p-3 bg-card border rounded-lg">
              <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                <Camera className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">
                  {personalInfo.profilePhoto.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(personalInfo.profilePhoto.size)}
                </p>
              </div>
              <Badge variant="success" className="text-xs">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Uploaded
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveFile('profilePhoto')}
                className="text-destructive hover:text-destructive p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
          
          <input
            ref={photoFileRef}
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={(e) => handleFileUpload('profilePhoto', e.target.files)}
            className="hidden"
          />
        </div>

        {/* Visa Document (Optional) */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Visa Document
            <Badge variant="secondary" className="text-xs ml-2">Optional</Badge>
          </h3>
          
          {!personalInfo.visaDocument ? (
            <div
              className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 hover:bg-primary-light/5 transition-all duration-200"
              onClick={() => visaFileRef.current?.click()}
            >
              <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-1">
                Upload visa document copy (if applicable)
              </p>
              <p className="text-xs text-muted-foreground">
                PDF, JPG, PNG - Max 5MB
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-3 p-3 bg-card border rounded-lg">
              <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">
                  {personalInfo.visaDocument.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(personalInfo.visaDocument.size)}
                </p>
              </div>
              <Badge variant="success" className="text-xs">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Uploaded
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveFile('visaDocument')}
                className="text-destructive hover:text-destructive p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
          
          <input
            ref={visaFileRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileUpload('visaDocument', e.target.files)}
            className="hidden"
          />
        </div>

        {/* Requirements Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">Photo Requirements</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Recent photo taken within the last 6 months</li>
            <li>• White or light colored background</li>
            <li>• Face should be clearly visible and centered</li>
            <li>• No glasses, hats, or head coverings (unless religious)</li>
            <li>• Image size: 35mm x 45mm (passport size)</li>
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