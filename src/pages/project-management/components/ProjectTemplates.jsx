import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ProjectTemplates = ({ onCreateFromTemplate, onManageTemplates }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const templates = [
    {
      id: 'healthcare-hipaa',
      name: 'Healthcare HIPAA Compliance',
      description: 'Template for healthcare organizations ensuring HIPAA compliance requirements',
      category: 'Healthcare',
      documentsCount: 12,
      estimatedTime: '2-3 weeks',
      icon: 'Heart',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      id: 'financial-sox',
      name: 'Financial SOX Compliance',
      description: 'Sarbanes-Oxley compliance template for financial institutions',
      category: 'Financial',
      documentsCount: 18,
      estimatedTime: '3-4 weeks',
      icon: 'DollarSign',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'gdpr-privacy',
      name: 'GDPR Privacy Compliance',
      description: 'European GDPR compliance template for data protection',
      category: 'Privacy',
      documentsCount: 8,
      estimatedTime: '1-2 weeks',
      icon: 'Shield',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'iso-27001',
      name: 'ISO 27001 Security',
      description: 'Information security management system compliance template',
      category: 'Security',
      documentsCount: 15,
      estimatedTime: '4-5 weeks',
      icon: 'Lock',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'government-contract',
      name: 'Government Contract Compliance',
      description: 'Template for government contractor compliance requirements',
      category: 'Government',
      documentsCount: 22,
      estimatedTime: '5-6 weeks',
      icon: 'Building',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      id: 'custom-template',
      name: 'Custom Template',
      description: 'Create a custom compliance template from scratch',
      category: 'Custom',
      documentsCount: 0,
      estimatedTime: 'Variable',
      icon: 'Plus',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50'
    }
  ];

  const visibleTemplates = isExpanded ? templates : templates?.slice(0, 3);

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6 shadow-professional">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Project Templates</h3>
          <p className="text-sm text-muted-foreground">
            Start with pre-configured compliance templates to accelerate your project setup
          </p>
        </div>
        <Button
          variant="outline"
          iconName="Settings"
          iconPosition="left"
          onClick={onManageTemplates}
        >
          Manage Templates
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {visibleTemplates?.map((template) => (
          <div
            key={template?.id}
            className="border border-border rounded-lg p-4 hover:shadow-document transition-professional cursor-pointer group"
            onClick={() => onCreateFromTemplate(template?.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 rounded-lg ${template?.bgColor}`}>
                <Icon name={template?.icon} size={20} className={template?.color} />
              </div>
              <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">
                {template?.category}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <h4 className="font-medium text-foreground group-hover:text-primary transition-professional">
                {template?.name}
              </h4>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {template?.description}
              </p>
            </div>

            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Documents:</span>
                <span className="font-medium">{template?.documentsCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Est. Time:</span>
                <span className="font-medium">{template?.estimatedTime}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-professional"
                iconName="ArrowRight"
                iconPosition="right"
              >
                Use Template
              </Button>
            </div>
          </div>
        ))}
      </div>
      {templates?.length > 3 && (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {isExpanded ? 'Show Less' : `Show ${templates?.length - 3} More Templates`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectTemplates;