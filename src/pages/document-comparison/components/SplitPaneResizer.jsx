import React, { useState, useCallback, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SplitPaneResizer = ({ 
  onResize, 
  initialLeftWidth = 50,
  minWidth = 20,
  maxWidth = 80 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [leftWidth, setLeftWidth] = useState(initialLeftWidth);

  const handleMouseDown = useCallback((e) => {
    e?.preventDefault();
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;

    const containerRect = e?.currentTarget?.getBoundingClientRect();
    const newLeftWidth = ((e?.clientX - containerRect?.left) / containerRect?.width) * 100;
    
    const clampedWidth = Math.max(minWidth, Math.min(maxWidth, newLeftWidth));
    setLeftWidth(clampedWidth);
    
    if (onResize) {
      onResize(clampedWidth);
    }
  }, [isDragging, minWidth, maxWidth, onResize]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleDoubleClick = () => {
    const resetWidth = 50;
    setLeftWidth(resetWidth);
    if (onResize) {
      onResize(resetWidth);
    }
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Resizer Handle */}
      <div
        className={`w-1 h-full bg-border hover:bg-primary cursor-col-resize transition-colors duration-200 ${
          isDragging ? 'bg-primary' : ''
        }`}
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
      />
      
      {/* Resizer Grip */}
      <div
        className={`absolute inset-y-0 -left-2 -right-2 flex items-center justify-center cursor-col-resize group ${
          isDragging ? 'bg-primary/10' : 'hover:bg-muted/50'
        }`}
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
      >
        <div className="flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-1 h-1 bg-muted-foreground rounded-full" />
          <div className="w-1 h-1 bg-muted-foreground rounded-full" />
          <div className="w-1 h-1 bg-muted-foreground rounded-full" />
          <div className="w-1 h-1 bg-muted-foreground rounded-full" />
          <div className="w-1 h-1 bg-muted-foreground rounded-full" />
        </div>
      </div>

      {/* Resize Indicator */}
      {isDragging && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-popover border border-border rounded-md px-2 py-1 shadow-document z-50">
          <div className="flex items-center space-x-2 text-xs text-popover-foreground">
            <Icon name="Move" size={12} />
            <span>{Math.round(leftWidth)}% | {Math.round(100 - leftWidth)}%</span>
          </div>
        </div>
      )}

      {/* Reset Hint */}
      {!isDragging && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="bg-popover border border-border rounded-md px-2 py-1 shadow-document">
            <span className="text-xs text-popover-foreground whitespace-nowrap">
              Double-click to reset
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SplitPaneResizer;