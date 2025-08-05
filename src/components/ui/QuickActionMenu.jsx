import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActionMenu = ({ 
  onAnnotate,
  onBookmark,
  onMapRequirement,
  onSaveProgress,
  onExportSection,
  onHighlight
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  // Show quick actions only on specific pages
  const showOnPages = ['/document-comparison', '/requirements-checklist', '/document-upload'];
  const shouldShow = showOnPages?.includes(location.pathname);

  if (!shouldShow) {
    return null;
  }

  const quickActions = [
    {
      id: 'annotate',
      label: 'Annotate',
      icon: 'MessageSquare',
      onClick: onAnnotate,
      color: 'text-primary'
    },
    {
      id: 'highlight',
      label: 'Highlight',
      icon: 'Highlighter',
      onClick: onHighlight,
      color: 'text-warning'
    },
    {
      id: 'bookmark',
      label: 'Bookmark',
      icon: 'Bookmark',
      onClick: onBookmark,
      color: 'text-accent'
    },
    {
      id: 'map',
      label: 'Map Requirement',
      icon: 'Link',
      onClick: onMapRequirement,
      color: 'text-secondary'
    },
    {
      id: 'save',
      label: 'Save Progress',
      icon: 'Save',
      onClick: onSaveProgress,
      color: 'text-success'
    },
    {
      id: 'export',
      label: 'Export Section',
      icon: 'Download',
      onClick: onExportSection,
      color: 'text-muted-foreground'
    }
  ];

  return (
    <>
      {/* Desktop Floating Menu */}
      <div className="hidden md:block fixed bottom-6 right-6 z-50">
        <div className={`transition-all duration-300 ${isExpanded ? 'space-y-2' : ''}`}>
          {/* Action Buttons */}
          {isExpanded && (
            <div className="space-y-2 mb-2">
              {quickActions?.map((action) => (
                <div
                  key={action?.id}
                  className="flex items-center justify-end space-x-3 animate-fade-in"
                >
                  <div className="bg-popover px-3 py-1 rounded-md shadow-professional border border-border">
                    <span className="text-xs font-medium text-popover-foreground whitespace-nowrap">
                      {action?.label}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={action?.onClick}
                    className="w-12 h-12 bg-card shadow-document hover:shadow-lg transition-all duration-200"
                  >
                    <Icon name={action?.icon} size={20} className={action?.color} />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Main Toggle Button */}
          <Button
            variant="default"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-14 h-14 bg-primary hover:bg-primary/90 shadow-document hover:shadow-lg transition-all duration-200"
          >
            <Icon 
              name={isExpanded ? "X" : "Plus"} 
              size={24} 
              className="text-primary-foreground transition-transform duration-200"
            />
          </Button>
        </div>
      </div>
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-document">
        <div className="px-4 py-2">
          <div className="flex items-center justify-between">
            {quickActions?.slice(0, 4)?.map((action) => (
              <Button
                key={action?.id}
                variant="ghost"
                size="sm"
                onClick={action?.onClick}
                className="flex flex-col items-center space-y-1 px-2 py-2 min-w-0"
              >
                <Icon name={action?.icon} size={18} className={action?.color} />
                <span className="text-xs text-muted-foreground truncate">
                  {action?.label?.split(' ')?.[0]}
                </span>
              </Button>
            ))}
            
            {/* More Actions Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex flex-col items-center space-y-1 px-2 py-2"
            >
              <Icon name="MoreHorizontal" size={18} />
              <span className="text-xs text-muted-foreground">More</span>
            </Button>
          </div>

          {/* Expanded Mobile Actions */}
          {isExpanded && (
            <div className="mt-2 pt-2 border-t border-border">
              <div className="flex items-center justify-center space-x-4">
                {quickActions?.slice(4)?.map((action) => (
                  <Button
                    key={action?.id}
                    variant="ghost"
                    size="sm"
                    onClick={action?.onClick}
                    className="flex flex-col items-center space-y-1 px-3 py-2"
                  >
                    <Icon name={action?.icon} size={18} className={action?.color} />
                    <span className="text-xs text-muted-foreground">
                      {action?.label}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default QuickActionMenu;