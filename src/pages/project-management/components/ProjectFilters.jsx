import React from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const ProjectFilters = ({ 
  filters, 
  onFilterChange, 
  onSearch, 
  onClearFilters,
  onBulkAction,
  selectedProjects 
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'on-hold', label: 'On Hold' },
    { value: 'archived', label: 'Archived' }
  ];

  const assigneeOptions = [
    { value: 'all', label: 'All Assignees' },
    { value: 'john-doe', label: 'John Doe' },
    { value: 'sarah-wilson', label: 'Sarah Wilson' },
    { value: 'michael-chen', label: 'Michael Chen' },
    { value: 'emily-davis', label: 'Emily Davis' }
  ];

  const complianceOptions = [
    { value: 'all', label: 'All Compliance Levels' },
    { value: 'high', label: 'High (90-100%)' },
    { value: 'medium', label: 'Medium (70-89%)' },
    { value: 'low', label: 'Low (50-69%)' },
    { value: 'critical', label: 'Critical (<50%)' }
  ];

  const bulkActions = [
    { value: 'archive', label: 'Archive Selected' },
    { value: 'export', label: 'Export Selected' },
    { value: 'reassign', label: 'Reassign Selected' },
    { value: 'duplicate', label: 'Duplicate Selected' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6 shadow-professional">
      {/* Search and Quick Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <Input
              type="search"
              placeholder="Search projects by name, type, or assignee..."
              value={filters?.search}
              onChange={(e) => onSearch(e?.target?.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            iconName="Plus"
            iconPosition="left"
            onClick={() => {}}
          >
            New Project
          </Button>
          
          <Button
            variant="outline"
            iconName="Upload"
            iconPosition="left"
            onClick={() => {}}
          >
            Import
          </Button>
        </div>
      </div>
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Select
          label="Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
        />
        
        <Select
          label="Assignee"
          options={assigneeOptions}
          value={filters?.assignee}
          onChange={(value) => onFilterChange('assignee', value)}
        />
        
        <Select
          label="Compliance Level"
          options={complianceOptions}
          value={filters?.compliance}
          onChange={(value) => onFilterChange('compliance', value)}
        />
        
        <div className="flex items-end">
          <Button
            variant="ghost"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={onClearFilters}
            className="w-full"
          >
            Clear Filters
          </Button>
        </div>
      </div>
      {/* Bulk Actions */}
      {selectedProjects?.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <span className="text-sm font-medium text-foreground">
            {selectedProjects?.length} project{selectedProjects?.length > 1 ? 's' : ''} selected
          </span>
          
          <div className="flex items-center space-x-2">
            <Select
              placeholder="Bulk actions..."
              options={bulkActions}
              value=""
              onChange={onBulkAction}
              className="min-w-40"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectFilters;