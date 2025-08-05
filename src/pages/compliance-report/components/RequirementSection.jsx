import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RequirementSection = ({ section, isExpanded, onToggle }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'compliant':
        return { icon: 'CheckCircle', color: 'text-success' };
      case 'non-compliant':
        return { icon: 'XCircle', color: 'text-error' };
      case 'partial':
        return { icon: 'AlertCircle', color: 'text-warning' };
      case 'pending':
        return { icon: 'Clock', color: 'text-muted-foreground' };
      default:
        return { icon: 'Circle', color: 'text-muted-foreground' };
    }
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      high: 'bg-error/10 text-error',
      medium: 'bg-warning/10 text-warning',
      low: 'bg-success/10 text-success'
    };
    return colors?.[priority?.toLowerCase()] || 'bg-muted text-muted-foreground';
  };

  const handleItemSelect = (itemId) => {
    setSelectedItems(prev => 
      prev?.includes(itemId) 
        ? prev?.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const compliancePercentage = Math.round(
    (section?.requirements?.filter(req => req?.status === 'compliant')?.length / section?.requirements?.length) * 100
  );

  return (
    <div className="bg-card border border-border rounded-lg shadow-professional mb-6">
      {/* Section Header */}
      <div 
        className="flex items-center justify-between p-6 cursor-pointer hover:bg-muted/50 transition-professional"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-4 flex-1">
          <div className="flex items-center space-x-3">
            <Icon 
              name={isExpanded ? "ChevronDown" : "ChevronRight"} 
              size={20} 
              className="text-muted-foreground" 
            />
            <div className={`p-2 rounded-lg ${section?.bgColor}`}>
              <Icon name={section?.icon} size={20} className={section?.color} />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-semibold text-foreground">
                {section?.title}
              </h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityBadge(section?.priority)}`}>
                {section?.priority} Priority
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {section?.description}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Compliance Percentage */}
          <div className="text-right">
            <div className="text-2xl font-bold text-foreground">
              {compliancePercentage}%
            </div>
            <div className="text-xs text-muted-foreground">
              {section?.requirements?.filter(req => req?.status === 'compliant')?.length} of {section?.requirements?.length}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${compliancePercentage}%` }}
            />
          </div>
        </div>
      </div>
      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-border">
          {/* Section Actions */}
          <div className="px-6 py-4 bg-muted/30 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Icon name="Filter" size={16} />
                  <span className="ml-2">Filter</span>
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Download" size={16} />
                  <span className="ml-2">Export Section</span>
                </Button>
              </div>
              
              {selectedItems?.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    {selectedItems?.length} selected
                  </span>
                  <Button variant="outline" size="sm">
                    <Icon name="MessageSquare" size={16} />
                    <span className="ml-2">Add Comment</span>
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Requirements List */}
          <div className="p-6">
            <div className="space-y-4">
              {section?.requirements?.map((requirement) => {
                const statusInfo = getStatusIcon(requirement?.status);
                const isSelected = selectedItems?.includes(requirement?.id);
                
                return (
                  <div 
                    key={requirement?.id}
                    className={`border border-border rounded-lg p-4 transition-professional ${
                      isSelected ? 'bg-primary/5 border-primary/20' : 'hover:bg-muted/30'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      {/* Selection Checkbox */}
                      <button
                        onClick={() => handleItemSelect(requirement?.id)}
                        className="mt-1 flex-shrink-0"
                      >
                        <div className={`w-4 h-4 border-2 rounded ${
                          isSelected 
                            ? 'bg-primary border-primary' :'border-border hover:border-primary/50'
                        } flex items-center justify-center`}>
                          {isSelected && (
                            <Icon name="Check" size={12} className="text-primary-foreground" />
                          )}
                        </div>
                      </button>

                      {/* Status Icon */}
                      <div className="flex-shrink-0 mt-1">
                        <Icon name={statusInfo?.icon} size={20} className={statusInfo?.color} />
                      </div>

                      {/* Requirement Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-sm font-medium text-foreground">
                            {requirement?.title}
                          </h4>
                          <span className="text-xs text-muted-foreground flex-shrink-0 ml-4">
                            REQ-{requirement?.id}
                          </span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">
                          {requirement?.description}
                        </p>

                        {/* Gap Analysis */}
                        {requirement?.gaps && requirement?.gaps?.length > 0 && (
                          <div className="mb-3">
                            <h5 className="text-xs font-medium text-foreground mb-2">
                              Identified Gaps:
                            </h5>
                            <ul className="space-y-1">
                              {requirement?.gaps?.map((gap, index) => (
                                <li key={index} className="text-xs text-error flex items-start space-x-2">
                                  <Icon name="AlertCircle" size={12} className="mt-0.5 flex-shrink-0" />
                                  <span>{gap}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Recommendations */}
                        {requirement?.recommendations && requirement?.recommendations?.length > 0 && (
                          <div className="mb-3">
                            <h5 className="text-xs font-medium text-foreground mb-2">
                              Recommendations:
                            </h5>
                            <ul className="space-y-1">
                              {requirement?.recommendations?.map((rec, index) => (
                                <li key={index} className="text-xs text-success flex items-start space-x-2">
                                  <Icon name="Lightbulb" size={12} className="mt-0.5 flex-shrink-0" />
                                  <span>{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Document References */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span>Policy Ref: {requirement?.policyRef}</span>
                            <span>Program Ref: {requirement?.programRef || 'Not Found'}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Icon name="MessageSquare" size={14} />
                              <span className="ml-1">Comment</span>
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Icon name="ExternalLink" size={14} />
                              <span className="ml-1">View</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequirementSection;