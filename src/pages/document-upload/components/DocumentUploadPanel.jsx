import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentUploadPanel = ({ 
  title, 
  type, 
  onFileUpload, 
  uploadedFile, 
  onRemoveFile, 
  isUploading = false,
  uploadProgress = 0 
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e?.dataTransfer?.files);
    if (files?.length > 0) {
      onFileUpload(files?.[0], type);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    if (files?.length > 0) {
      onFileUpload(files?.[0], type);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef?.current?.click();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">
          Upload your {type?.toLowerCase()} document for compliance analysis
        </p>
      </div>
      {!uploadedFile ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
            isDragOver
              ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              isDragOver ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              <Icon name="Upload" size={24} />
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">
                {isDragOver ? 'Drop your file here' : 'Drag and drop your file here'}
              </p>
              <p className="text-xs text-muted-foreground">
                or click to browse from your computer
              </p>
            </div>

            <Button
              variant="outline"
              onClick={handleBrowseClick}
              disabled={isUploading}
            >
              <Icon name="FolderOpen" size={16} />
              <span className="ml-2">Browse Files</span>
            </Button>

            <div className="text-xs text-muted-foreground space-y-1">
              <p>Supported formats: PDF, DOC, DOCX, TXT</p>
              <p>Maximum file size: 50MB</p>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      ) : (
        <div className="space-y-4">
          {/* File Preview */}
          <div className="border border-border rounded-lg p-4 bg-muted/30">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="FileText" size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {uploadedFile?.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(uploadedFile?.size)} • {uploadedFile?.type || 'Unknown format'}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <Icon name="CheckCircle" size={14} className="text-success" />
                  <span className="text-xs text-success">Upload complete</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveFile(type)}
                className="text-error hover:text-error hover:bg-error/10"
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          </div>

          {/* Replace File Option */}
          <div className="flex items-center justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBrowseClick}
              disabled={isUploading}
            >
              <Icon name="RefreshCw" size={16} />
              <span className="ml-2">Replace File</span>
            </Button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      )}
      {/* Upload Progress */}
      {isUploading && (
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Uploading...</span>
            <span className="text-foreground font-medium">{uploadProgress}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUploadPanel;