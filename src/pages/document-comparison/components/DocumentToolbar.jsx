import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentToolbar = ({
  onSyncToggle,
  isSynced = true,
  onBookmarkView,
  onAnnotationView,
  onHighlightToggle,
  onExportReport,
  onSaveProgress,
  onFullscreen,
  isFullscreen = false
}) => {
  const [activeView, setActiveView] = useState('split');
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showAnnotations, setShowAnnotations] = useState(false);
  const [highlightMode, setHighlightMode] = useState(false);

  const viewModes = [
    { id: 'split', label: 'Split View', icon: 'Columns' },
    { id: 'policy', label: 'Policy Only', icon: 'FileText' },
    { id: 'program', label: 'Program Only', icon: 'File' },
    { id: 'overlay', label: 'Overlay', icon: 'Layers' }
  ];

  const handleViewChange = (viewId) => {
    setActiveView(viewId);
  };

  const handleSyncToggle = () => {
    if (onSyncToggle) {
      onSyncToggle(!isSynced);
    }
  };

  const handleBookmarkToggle = () => {
    const newState = !showBookmarks;
    setShowBookmarks(newState);
    if (onBookmarkView) {
      onBookmarkView(newState);
    }
  };

  const handleAnnotationToggle = () => {
    const newState = !showAnnotations;
    setShowAnnotations(newState);
    if (onAnnotationView) {
      onAnnotationView(newState);
    }
  };

  const handleHighlightToggle = () => {
    const newState = !highlightMode;
    setHighlightMode(newState);
    if (onHighlightToggle) {
      onHighlightToggle(newState);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-card border-b border-border">
      {/* Left Section - View Controls */}
      <div className="flex items-center space-x-4">
        {/* View Mode Selector */}
        <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
          {viewModes?.map((mode) => (
            <Button
              key={mode?.id}
              variant={activeView === mode?.id ? "default" : "ghost"}
              size="sm"
              onClick={() => handleViewChange(mode?.id)}
              className="px-3"
            >
              <Icon name={mode?.icon} size={16} />
              <span className="ml-2 hidden sm:inline">{mode?.label}</span>
            </Button>
          ))}
        </div>

        {/* Sync Toggle */}
        <div className="flex items-center space-x-2">
          <Button
            variant={isSynced ? "default" : "outline"}
            size="sm"
            onClick={handleSyncToggle}
          >
            <Icon name={isSynced ? "Link" : "Unlink"} size={16} />
            <span className="ml-2 hidden md:inline">
              {isSynced ? "Synced" : "Sync Off"}
            </span>
          </Button>
        </div>
      </div>
      {/* Center Section - Document Navigation */}
      <div className="hidden lg:flex items-center space-x-2">
        <Button variant="ghost" size="sm">
          <Icon name="SkipBack" size={16} />
          <span className="ml-2">Previous Section</span>
        </Button>
        
        <div className="px-4 py-2 bg-muted rounded-md">
          <span className="text-sm text-muted-foreground">Section 2.1 - Access Controls</span>
        </div>
        
        <Button variant="ghost" size="sm">
          <span className="mr-2">Next Section</span>
          <Icon name="SkipForward" size={16} />
        </Button>
      </div>
      {/* Right Section - Tools and Actions */}
      <div className="flex items-center space-x-2">
        {/* Annotation Tools */}
        <div className="hidden md:flex items-center space-x-1">
          <Button
            variant={showBookmarks ? "default" : "ghost"}
            size="sm"
            onClick={handleBookmarkToggle}
          >
            <Icon name="Bookmark" size={16} />
            <span className="ml-2 hidden lg:inline">Bookmarks</span>
          </Button>
          
          <Button
            variant={showAnnotations ? "default" : "ghost"}
            size="sm"
            onClick={handleAnnotationToggle}
          >
            <Icon name="MessageSquare" size={16} />
            <span className="ml-2 hidden lg:inline">Notes</span>
          </Button>
          
          <Button
            variant={highlightMode ? "default" : "ghost"}
            size="sm"
            onClick={handleHighlightToggle}
          >
            <Icon name="Highlighter" size={16} />
            <span className="ml-2 hidden lg:inline">Highlight</span>
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onSaveProgress}
          >
            <Icon name="Save" size={16} />
            <span className="ml-2 hidden sm:inline">Save</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onExportReport}
          >
            <Icon name="Download" size={16} />
            <span className="ml-2 hidden sm:inline">Export</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onFullscreen}
          >
            <Icon name={isFullscreen ? "Minimize" : "Maximize"} size={16} />
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Button variant="ghost" size="sm">
            <Icon name="MoreVertical" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentToolbar;