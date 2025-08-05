import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RequirementItem = ({ 
  requirement, 
  onStatusChange, 
  onNotesChange, 
  onAttachEvidence,
  onViewDetails,
  isSelected,
  onSelect
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localNotes, setLocalNotes] = useState(requirement?.notes || "");

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'in-progress': return 'Clock';
      case 'pending': return 'Circle';
      case 'failed': return 'XCircle';
      default: return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success/10';
      case 'in-progress': return 'text-warning bg-warning/10';
      case 'pending': return 'text-muted-foreground bg-muted';
      case 'failed': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-error';
      case 'medium': return 'bg-warning';
      case 'low': return 'bg-success';
      default: return 'bg-muted-foreground';
    }
  };

  const handleNotesBlur = () => {
    if (localNotes !== requirement?.notes) {
      onNotesChange(requirement?.id, localNotes);
    }
  };

  const handleStatusToggle = (newStatus) => {
    onStatusChange(requirement?.id, newStatus);
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-professional transition-all duration-200 ${
      isSelected ? 'ring-2 ring-primary border-primary' : 'hover:shadow-document'
    }`}>
      <div className="p-4">
        <div className="flex items-start space-x-3">
          {/* Priority Indicator */}
          <div className={`w-1 h-16 rounded-full ${getPriorityColor(requirement?.priority)} flex-shrink-0`} />
          
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3 flex-1 min-w-0">
                <button
                  onClick={() => onSelect(requirement?.id)}
                  className="flex-shrink-0 mt-1"
                >
                  <Icon 
                    name={isSelected ? "CheckSquare" : "Square"} 
                    size={18} 
                    className={isSelected ? "text-primary" : "text-muted-foreground hover:text-foreground"}
                  />
                </button>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-medium text-muted-foreground">
                      REQ-{requirement?.id?.toString()?.padStart(3, '0')}
                    </span>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(requirement?.status)}`}>
                      <div className="flex items-center space-x-1">
                        <Icon name={getStatusIcon(requirement?.status)} size={12} />
                        <span className="capitalize">{requirement?.status?.replace('-', ' ')}</span>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {requirement?.category}
                    </span>
                  </div>
                  
                  <h4 className="text-sm font-medium text-foreground mb-2 line-clamp-2">
                    {requirement?.title}
                  </h4>
                  
                  <p className="text-xs text-muted-foreground line-clamp-3">
                    {requirement?.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-1 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
                </Button>
              </div>
            </div>

            {/* Source Reference */}
            <div className="flex items-center space-x-2 mb-3">
              <Icon name="FileText" size={14} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                Source: {requirement?.sourceDocument} - Section {requirement?.sourceSection}
              </span>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant={requirement?.status === 'completed' ? 'success' : 'outline'}
                  size="sm"
                  onClick={() => handleStatusToggle('completed')}
                  className="text-xs"
                >
                  <Icon name="Check" size={14} />
                  <span className="ml-1">Pass</span>
                </Button>
                
                <Button
                  variant={requirement?.status === 'failed' ? 'destructive' : 'outline'}
                  size="sm"
                  onClick={() => handleStatusToggle('failed')}
                  className="text-xs"
                >
                  <Icon name="X" size={14} />
                  <span className="ml-1">Fail</span>
                </Button>
              </div>

              <div className="flex items-center space-x-1">
                {requirement?.evidenceCount > 0 && (
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Icon name="Paperclip" size={12} />
                    <span>{requirement?.evidenceCount}</span>
                  </div>
                )}
                
                {requirement?.commentsCount > 0 && (
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Icon name="MessageSquare" size={12} />
                    <span>{requirement?.commentsCount}</span>
                  </div>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewDetails(requirement?.id)}
                  className="text-xs"
                >
                  Details
                </Button>
              </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
              <div className="mt-4 pt-4 border-t border-border space-y-4">
                {/* Full Description */}
                <div>
                  <h5 className="text-xs font-medium text-foreground mb-2">Full Requirement</h5>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {requirement?.fullDescription}
                  </p>
                </div>

                {/* Notes */}
                <div>
                  <Input
                    label="Compliance Notes"
                    type="text"
                    placeholder="Add notes about compliance status..."
                    value={localNotes}
                    onChange={(e) => setLocalNotes(e?.target?.value)}
                    onBlur={handleNotesBlur}
                    className="text-xs"
                  />
                </div>

                {/* Evidence */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="Paperclip" size={14} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {requirement?.evidenceCount} evidence file(s)
                    </span>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onAttachEvidence(requirement?.id)}
                    className="text-xs"
                  >
                    <Icon name="Plus" size={12} />
                    <span className="ml-1">Add Evidence</span>
                  </Button>
                </div>

                {/* Assignee */}
                {requirement?.assignee && (
                  <div className="flex items-center space-x-2">
                    <Icon name="User" size={14} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      Assigned to: {requirement?.assignee}
                    </span>
                  </div>
                )}

                {/* Due Date */}
                {requirement?.dueDate && (
                  <div className="flex items-center space-x-2">
                    <Icon name="Calendar" size={14} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      Due: {new Date(requirement.dueDate)?.toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequirementItem;