import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UploadSummary = ({ 
  policyFile, 
  programFile, 
  projectName, 
  documentCategory, 
  onStartAnalysis, 
  isAnalyzing = false 
}) => {
  const isReadyForAnalysis = policyFile && programFile && projectName && documentCategory;

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const getCategoryLabel = (value) => {
    const categories = {
      'healthcare': 'Healthcare Compliance',
      'financial': 'Financial Regulations',
      'environmental': 'Environmental Standards',
      'safety': 'Safety Protocols',
      'quality': 'Quality Assurance',
      'data-privacy': 'Data Privacy & Security',
      'employment': 'Employment Law',
      'construction': 'Construction Standards',
      'food-safety': 'Food Safety Regulations',
      'other': 'Other'
    };
    return categories?.[value] || value;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Upload Summary</h3>
        <p className="text-sm text-muted-foreground">
          Review your project details before starting the compliance analysis
        </p>
      </div>
      <div className="space-y-6">
        {/* Project Information */}
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Icon name="FolderOpen" size={20} className="text-primary mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Project Name</p>
              <p className="text-sm text-muted-foreground">
                {projectName || 'Not specified'}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Icon name="Tag" size={20} className="text-primary mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Category</p>
              <p className="text-sm text-muted-foreground">
                {documentCategory ? getCategoryLabel(documentCategory) : 'Not selected'}
              </p>
            </div>
          </div>
        </div>

        {/* Document Status */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">Document Status</h4>
          
          {/* Policy Document */}
          <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              policyFile ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              <Icon name={policyFile ? "CheckCircle" : "Circle"} size={16} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Policy Document</p>
              {policyFile ? (
                <p className="text-xs text-muted-foreground">
                  {policyFile?.name} ({formatFileSize(policyFile?.size)})
                </p>
              ) : (
                <p className="text-xs text-muted-foreground">No file uploaded</p>
              )}
            </div>
          </div>

          {/* Program Document */}
          <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              programFile ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              <Icon name={programFile ? "CheckCircle" : "Circle"} size={16} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Program Document</p>
              {programFile ? (
                <p className="text-xs text-muted-foreground">
                  {programFile?.name} ({formatFileSize(programFile?.size)})
                </p>
              ) : (
                <p className="text-xs text-muted-foreground">No file uploaded</p>
              )}
            </div>
          </div>
        </div>

        {/* Analysis Action */}
        <div className="pt-4 border-t border-border">
          {isReadyForAnalysis ? (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-success">
                <Icon name="CheckCircle" size={16} />
                <span>Ready to start compliance analysis</span>
              </div>
              <Button
                variant="default"
                onClick={onStartAnalysis}
                disabled={isAnalyzing}
                loading={isAnalyzing}
                fullWidth
                className="h-12"
              >
                {isAnalyzing ? 'Starting Analysis...' : 'Start Compliance Analysis'}
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-warning">
                <Icon name="AlertCircle" size={16} />
                <span>Complete all required fields to proceed</span>
              </div>
              <div className="text-xs text-muted-foreground space-y-1">
                {!projectName && <p>• Project name is required</p>}
                {!documentCategory && <p>• Document category must be selected</p>}
                {!policyFile && <p>• Policy document must be uploaded</p>}
                {!programFile && <p>• Program document must be uploaded</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadSummary;