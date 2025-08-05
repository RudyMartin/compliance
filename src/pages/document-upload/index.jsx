import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ProjectContextBar from '../../components/ui/ProjectContextBar';
import QuickActionMenu from '../../components/ui/QuickActionMenu';
import DocumentUploadPanel from './components/DocumentUploadPanel';
import ProjectDetailsForm from './components/ProjectDetailsForm';
import AdvancedOptionsPanel from './components/AdvancedOptionsPanel';
import UploadSummary from './components/UploadSummary';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const DocumentUpload = () => {
  const navigate = useNavigate();
  
  // Form state
  const [projectName, setProjectName] = useState('');
  const [documentCategory, setDocumentCategory] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

  // File upload state
  const [policyFile, setPolicyFile] = useState(null);
  const [programFile, setProgramFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState({});
  const [isUploading, setIsUploading] = useState({});

  // Analysis state
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Advanced options state
  const [advancedOptions, setAdvancedOptions] = useState({
    analysisDepth: 'detailed',
    priorityFilter: 'all',
    extractNumerical: true,
    extractDeadlines: true,
    extractConditional: true,
    semanticMatching: true,
    generateSuggestions: true,
    detailedAuditTrail: false
  });

  const validateFile = (file) => {
    const maxSize = 50 * 1024 * 1024; // 50MB
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];

    if (file?.size > maxSize) {
      return 'File size must be less than 50MB';
    }

    if (!allowedTypes?.includes(file?.type) && !file?.name?.match(/\.(pdf|doc|docx|txt)$/i)) {
      return 'File format not supported. Please upload PDF, DOC, DOCX, or TXT files';
    }

    return null;
  };

  const simulateUpload = (file, type) => {
    return new Promise((resolve) => {
      setIsUploading(prev => ({ ...prev, [type]: true }));
      setUploadProgress(prev => ({ ...prev, [type]: 0 }));

      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const currentProgress = prev[type] || 0;
          const newProgress = Math.min(currentProgress + Math.random() * 30, 100);
          
          if (newProgress >= 100) {
            clearInterval(interval);
            setIsUploading(prev => ({ ...prev, [type]: false }));
            resolve();
          }
          
          return { ...prev, [type]: newProgress };
        });
      }, 200);
    });
  };

  const handleFileUpload = async (file, type) => {
    const validationError = validateFile(file);
    if (validationError) {
      setErrors(prev => ({ ...prev, [type]: validationError }));
      return;
    }

    setErrors(prev => ({ ...prev, [type]: null }));

    try {
      await simulateUpload(file, type);
      
      if (type === 'policy') {
        setPolicyFile(file);
      } else {
        setProgramFile(file);
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, [type]: 'Upload failed. Please try again.' }));
    }
  };

  const handleRemoveFile = (type) => {
    if (type === 'policy') {
      setPolicyFile(null);
    } else {
      setProgramFile(null);
    }
    setUploadProgress(prev => ({ ...prev, [type]: 0 }));
    setErrors(prev => ({ ...prev, [type]: null }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!projectName?.trim()) {
      newErrors.projectName = 'Project name is required';
    }

    if (!documentCategory) {
      newErrors.documentCategory = 'Document category is required';
    }

    if (!policyFile) {
      newErrors.policy = 'Policy document is required';
    }

    if (!programFile) {
      newErrors.program = 'Program document is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleStartAnalysis = async () => {
    if (!validateForm()) {
      return;
    }

    setIsAnalyzing(true);

    // Simulate analysis initialization
    setTimeout(() => {
      navigate('/document-comparison', {
        state: {
          projectName,
          documentCategory,
          description,
          policyFile: policyFile?.name,
          programFile: programFile?.name,
          advancedOptions
        }
      });
    }, 2000);
  };

  const handleQuickAction = (action) => {
    console.log(`Quick action: ${action}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProjectContextBar
        projectName={projectName || "New Compliance Project"}
        documentType="Document Upload"
        complianceStatus="Setup"
        completionPercentage={0}
        onSave={() => console.log('Save project')}
        onExport={() => console.log('Export project')}
        onBookmark={() => console.log('Bookmark project')}
      />
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Upload" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Document Upload</h1>
                <p className="text-muted-foreground">
                  Upload your policy and program documents to begin compliance analysis
                </p>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                  1
                </div>
                <span className="font-medium text-foreground">Upload Documents</span>
              </div>
              <div className="w-8 h-px bg-border"></div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-xs">
                  2
                </div>
                <span className="text-muted-foreground">Compare & Analyze</span>
              </div>
              <div className="w-8 h-px bg-border"></div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-xs">
                  3
                </div>
                <span className="text-muted-foreground">Generate Report</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Document Upload Panels */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DocumentUploadPanel
                  title="Policy Document"
                  type="policy"
                  onFileUpload={handleFileUpload}
                  uploadedFile={policyFile}
                  onRemoveFile={handleRemoveFile}
                  isUploading={isUploading?.policy}
                  uploadProgress={uploadProgress?.policy || 0}
                />

                <DocumentUploadPanel
                  title="Program Document"
                  type="program"
                  onFileUpload={handleFileUpload}
                  uploadedFile={programFile}
                  onRemoveFile={handleRemoveFile}
                  isUploading={isUploading?.program}
                  uploadProgress={uploadProgress?.program || 0}
                />
              </div>

              {/* Error Messages */}
              {(errors?.policy || errors?.program) && (
                <div className="bg-error/10 border border-error/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Icon name="AlertCircle" size={20} className="text-error mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-error">Upload Errors</p>
                      {errors?.policy && (
                        <p className="text-sm text-error">Policy Document: {errors?.policy}</p>
                      )}
                      {errors?.program && (
                        <p className="text-sm text-error">Program Document: {errors?.program}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Project Details Form */}
              <ProjectDetailsForm
                projectName={projectName}
                setProjectName={setProjectName}
                documentCategory={documentCategory}
                setDocumentCategory={setDocumentCategory}
                description={description}
                setDescription={setDescription}
                errors={errors}
              />

              {/* Advanced Options */}
              <AdvancedOptionsPanel
                options={advancedOptions}
                setOptions={setAdvancedOptions}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Upload Summary */}
              <UploadSummary
                policyFile={policyFile}
                programFile={programFile}
                projectName={projectName}
                documentCategory={documentCategory}
                onStartAnalysis={handleStartAnalysis}
                isAnalyzing={isAnalyzing}
              />

              {/* Help Card */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <Icon name="HelpCircle" size={20} className="text-primary mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">Need Help?</h3>
                    <p className="text-xs text-muted-foreground">
                      Tips for successful document upload
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-muted-foreground">
                  <div className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={14} className="text-success mt-0.5" />
                    <p>Ensure documents are text-searchable PDFs or Word files</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={14} className="text-success mt-0.5" />
                    <p>Policy documents should contain clear requirements and standards</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={14} className="text-success mt-0.5" />
                    <p>Program documents should detail current practices and procedures</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={14} className="text-success mt-0.5" />
                    <p>Use descriptive project names for easy identification</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <Button variant="outline" size="sm" fullWidth>
                    <Icon name="ExternalLink" size={14} />
                    <span className="ml-2">View Documentation</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <QuickActionMenu
        onAnnotate={() => handleQuickAction('annotate')}
        onBookmark={() => handleQuickAction('bookmark')}
        onMapRequirement={() => handleQuickAction('map')}
        onSaveProgress={() => handleQuickAction('save')}
        onExportSection={() => handleQuickAction('export')}
        onHighlight={() => handleQuickAction('highlight')}
      />
    </div>
  );
};

export default DocumentUpload;