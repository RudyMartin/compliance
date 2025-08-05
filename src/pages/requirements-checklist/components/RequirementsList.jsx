import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import RequirementItem from './RequirementItem';

const RequirementsList = ({ 
  requirements, 
  onStatusChange, 
  onNotesChange, 
  onAttachEvidence,
  onViewDetails,
  selectedRequirements,
  onSelectionChange,
  onBulkAction
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("priority");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showBulkActions, setShowBulkActions] = useState(false);

  const sortOptions = [
    { value: "priority", label: "Priority" },
    { value: "status", label: "Status" },
    { value: "category", label: "Category" },
    { value: "title", label: "Title" },
    { value: "dueDate", label: "Due Date" }
  ];

  const bulkActions = [
    { value: "mark-completed", label: "Mark as Completed", icon: "Check" },
    { value: "mark-in-progress", label: "Mark as In Progress", icon: "Clock" },
    { value: "mark-pending", label: "Mark as Pending", icon: "Circle" },
    { value: "assign", label: "Assign to User", icon: "User" },
    { value: "export", label: "Export Selected", icon: "Download" }
  ];

  const filteredAndSortedRequirements = requirements?.filter(req => 
      req?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      req?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      req?.category?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    )?.sort((a, b) => {
      let aValue = a?.[sortBy];
      let bValue = b?.[sortBy];
      
      if (sortBy === 'priority') {
        const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
        aValue = priorityOrder?.[a?.priority] || 0;
        bValue = priorityOrder?.[b?.priority] || 0;
      }
      
      if (sortBy === 'dueDate') {
        aValue = new Date(a.dueDate || '9999-12-31');
        bValue = new Date(b.dueDate || '9999-12-31');
      }
      
      if (typeof aValue === 'string') {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const handleSelectAll = (checked) => {
    if (checked) {
      const allIds = filteredAndSortedRequirements?.map(req => req?.id);
      onSelectionChange(allIds);
    } else {
      onSelectionChange([]);
    }
  };

  const handleBulkAction = (action) => {
    if (selectedRequirements?.length > 0) {
      onBulkAction(action, selectedRequirements);
      setShowBulkActions(false);
    }
  };

  const isAllSelected = selectedRequirements?.length === filteredAndSortedRequirements?.length && filteredAndSortedRequirements?.length > 0;
  const isSomeSelected = selectedRequirements?.length > 0 && selectedRequirements?.length < filteredAndSortedRequirements?.length;

  return (
    <div className="space-y-4">
      {/* Search and Controls */}
      <div className="bg-card border border-border rounded-lg shadow-professional p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Icon 
                name="Search" 
                size={16} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <input
                type="text"
                placeholder="Search requirements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e?.target?.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
          </div>

          {/* Sort Controls */}
          <div className="flex items-center space-x-2">
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
              placeholder="Sort by"
              className="w-32"
            />
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              <Icon name={sortOrder === 'asc' ? "ArrowUp" : "ArrowDown"} size={14} />
            </Button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedRequirements?.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-sm text-foreground">
                  {selectedRequirements?.length} requirement(s) selected
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSelectionChange([])}
                >
                  Clear Selection
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                {bulkActions?.map((action) => (
                  <Button
                    key={action?.value}
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkAction(action?.value)}
                    className="text-xs"
                  >
                    <Icon name={action?.icon} size={12} />
                    <span className="ml-1 hidden sm:inline">{action?.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Requirements List Header */}
      <div className="bg-card border border-border rounded-lg shadow-professional">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Checkbox
                checked={isAllSelected}
                onChange={(e) => handleSelectAll(e?.target?.checked)}
                indeterminate={isSomeSelected}
              />
              <h3 className="text-sm font-semibold text-foreground">
                Requirements ({filteredAndSortedRequirements?.length})
              </h3>
            </div>
            
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full" />
                <span>Completed</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-warning rounded-full" />
                <span>In Progress</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full" />
                <span>Pending</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-error rounded-full" />
                <span>Failed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Requirements List */}
        <div className="p-4 space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
          {filteredAndSortedRequirements?.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-sm text-muted-foreground">
                {searchTerm ? 'No requirements match your search criteria' : 'No requirements found'}
              </p>
            </div>
          ) : (
            filteredAndSortedRequirements?.map((requirement) => (
              <RequirementItem
                key={requirement?.id}
                requirement={requirement}
                onStatusChange={onStatusChange}
                onNotesChange={onNotesChange}
                onAttachEvidence={onAttachEvidence}
                onViewDetails={onViewDetails}
                isSelected={selectedRequirements?.includes(requirement?.id)}
                onSelect={(id) => {
                  const newSelection = selectedRequirements?.includes(id)
                    ? selectedRequirements?.filter(reqId => reqId !== id)
                    : [...selectedRequirements, id];
                  onSelectionChange(newSelection);
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RequirementsList;