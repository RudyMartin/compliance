import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ProjectDetailsForm = ({ 
  projectName, 
  setProjectName, 
  documentCategory, 
  setDocumentCategory, 
  description, 
  setDescription,
  errors = {}
}) => {
  const categoryOptions = [
    { value: 'healthcare', label: 'Healthcare Compliance' },
    { value: 'financial', label: 'Financial Regulations' },
    { value: 'environmental', label: 'Environmental Standards' },
    { value: 'safety', label: 'Safety Protocols' },
    { value: 'quality', label: 'Quality Assurance' },
    { value: 'data-privacy', label: 'Data Privacy & Security' },
    { value: 'employment', label: 'Employment Law' },
    { value: 'construction', label: 'Construction Standards' },
    { value: 'food-safety', label: 'Food Safety Regulations' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Project Details</h3>
        <p className="text-sm text-muted-foreground">
          Provide information about your compliance analysis project
        </p>
      </div>
      <div className="space-y-6">
        <Input
          label="Project Name"
          type="text"
          placeholder="Enter project name (e.g., Healthcare Compliance Review 2024)"
          value={projectName}
          onChange={(e) => setProjectName(e?.target?.value)}
          error={errors?.projectName}
          required
          description="Choose a descriptive name for your compliance project"
        />

        <Select
          label="Document Category"
          placeholder="Select compliance category"
          options={categoryOptions}
          value={documentCategory}
          onChange={setDocumentCategory}
          error={errors?.documentCategory}
          required
          description="Select the primary compliance domain for this analysis"
          searchable
        />

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Project Description
            <span className="text-muted-foreground ml-1">(Optional)</span>
          </label>
          <textarea
            placeholder="Provide additional context about this compliance analysis project..."
            value={description}
            onChange={(e) => setDescription(e?.target?.value)}
            rows={4}
            className="w-full px-3 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none transition-professional"
          />
          <p className="text-xs text-muted-foreground">
            Optional description to help identify and organize this project
          </p>
          {errors?.description && (
            <p className="text-xs text-error">{errors?.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsForm;