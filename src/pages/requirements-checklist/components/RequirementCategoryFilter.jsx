import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const RequirementCategoryFilter = ({ 
  categories, 
  selectedCategories, 
  onCategoryChange,
  statusFilters,
  selectedStatus,
  onStatusChange,
  priorityFilters,
  selectedPriority,
  onPriorityChange,
  onClearFilters
}) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    status: true,
    priority: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

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
      case 'completed': return 'text-success';
      case 'in-progress': return 'text-warning';
      case 'pending': return 'text-muted-foreground';
      case 'failed': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-professional">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Filters</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-xs"
          >
            Clear All
          </Button>
        </div>
      </div>
      <div className="p-4 space-y-4">
        {/* Categories Filter */}
        <div>
          <button
            onClick={() => toggleSection('categories')}
            className="flex items-center justify-between w-full text-sm font-medium text-foreground hover:text-primary transition-professional"
          >
            <span>Categories</span>
            <Icon 
              name={expandedSections?.categories ? "ChevronUp" : "ChevronDown"} 
              size={16} 
            />
          </button>
          
          {expandedSections?.categories && (
            <div className="mt-3 space-y-2">
              {categories?.map((category) => (
                <div key={category?.id} className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedCategories?.includes(category?.id)}
                    onChange={(e) => onCategoryChange(category?.id, e?.target?.checked)}
                    size="sm"
                  />
                  <div className="flex items-center space-x-2 flex-1 min-w-0">
                    <Icon name={category?.icon} size={14} className="text-muted-foreground flex-shrink-0" />
                    <span className="text-xs text-foreground truncate">{category?.name}</span>
                    <span className="text-xs text-muted-foreground">({category?.count})</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Status Filter */}
        <div>
          <button
            onClick={() => toggleSection('status')}
            className="flex items-center justify-between w-full text-sm font-medium text-foreground hover:text-primary transition-professional"
          >
            <span>Status</span>
            <Icon 
              name={expandedSections?.status ? "ChevronUp" : "ChevronDown"} 
              size={16} 
            />
          </button>
          
          {expandedSections?.status && (
            <div className="mt-3 space-y-2">
              {statusFilters?.map((status) => (
                <div key={status.value} className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedStatus?.includes(status.value)}
                    onChange={(e) => onStatusChange(status.value, e?.target?.checked)}
                    size="sm"
                  />
                  <div className="flex items-center space-x-2 flex-1">
                    <Icon 
                      name={getStatusIcon(status.value)} 
                      size={14} 
                      className={`${getStatusColor(status.value)} flex-shrink-0`}
                    />
                    <span className="text-xs text-foreground">{status.label}</span>
                    <span className="text-xs text-muted-foreground">({status.count})</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Priority Filter */}
        <div>
          <button
            onClick={() => toggleSection('priority')}
            className="flex items-center justify-between w-full text-sm font-medium text-foreground hover:text-primary transition-professional"
          >
            <span>Priority</span>
            <Icon 
              name={expandedSections?.priority ? "ChevronUp" : "ChevronDown"} 
              size={16} 
            />
          </button>
          
          {expandedSections?.priority && (
            <div className="mt-3 space-y-2">
              {priorityFilters?.map((priority) => (
                <div key={priority?.value} className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedPriority?.includes(priority?.value)}
                    onChange={(e) => onPriorityChange(priority?.value, e?.target?.checked)}
                    size="sm"
                  />
                  <div className="flex items-center space-x-2 flex-1">
                    <div className={`w-2 h-2 rounded-full ${
                      priority?.value === 'high' ? 'bg-error' :
                      priority?.value === 'medium' ? 'bg-warning' : 'bg-success'
                    }`} />
                    <span className="text-xs text-foreground">{priority?.label}</span>
                    <span className="text-xs text-muted-foreground">({priority?.count})</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequirementCategoryFilter;