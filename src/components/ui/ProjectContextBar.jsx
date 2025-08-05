import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const ProjectContextBar = ({ 
  projectName = "Healthcare Compliance Review 2024",
  documentType = "Policy Documentation",
  complianceStatus = "In Progress",
  completionPercentage = 68,
  lastSaved = "2 minutes ago",
  onSave,
  onExport,
  onBookmark
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-success bg-success/10';
      case 'in progress':
        return 'text-warning bg-warning/10';
      case 'pending':
        return 'text-muted-foreground bg-muted';
      case 'failed':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="sticky top-16 z-40 bg-card border-b border-border shadow-professional">
      <div className="px-4 lg:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Project Info */}
          <div className="flex items-center space-x-4 min-w-0 flex-1">
            <div className="flex items-center space-x-3 min-w-0">
              <div className="flex-shrink-0">
                <Icon name="FolderOpen" size={20} className="text-primary" />
              </div>
              <div className="min-w-0">
                <h2 className="text-sm font-semibold text-foreground truncate">
                  {projectName}
                </h2>
                <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                  <span>{documentType}</span>
                  <span>•</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(complianceStatus)}`}>
                    {complianceStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="hidden md:flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-foreground">
                  {completionPercentage}%
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Last Saved Indicator */}
            <div className="hidden lg:flex items-center space-x-2 text-xs text-muted-foreground">
              <Icon name="Clock" size={14} />
              <span>Saved {lastSaved}</span>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBookmark}
                className="hidden sm:flex"
              >
                <Icon name="Bookmark" size={16} />
                <span className="ml-2">Bookmark</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={onSave}
              >
                <Icon name="Save" size={16} />
                <span className="ml-2 hidden sm:inline">Save</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={onExport}
              >
                <Icon name="Download" size={16} />
                <span className="ml-2 hidden sm:inline">Export</span>
              </Button>

              {/* Mobile Expand Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="md:hidden"
              >
                <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Expanded View */}
        {isExpanded && (
          <div className="md:hidden mt-3 pt-3 border-t border-border">
            <div className="space-y-3">
              {/* Progress */}
              <div className="flex items-center space-x-3">
                <span className="text-xs text-muted-foreground">Progress:</span>
                <div className="flex items-center space-x-2 flex-1">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${completionPercentage}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-foreground">
                    {completionPercentage}%
                  </span>
                </div>
              </div>

              {/* Last Saved */}
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Icon name="Clock" size={14} />
                <span>Last saved {lastSaved}</span>
              </div>

              {/* Mobile Actions */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBookmark}
                  className="flex-1"
                >
                  <Icon name="Bookmark" size={16} />
                  <span className="ml-2">Bookmark</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectContextBar;