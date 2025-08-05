import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const ProjectsTable = ({ 
  projects, 
  selectedProjects, 
  onSelectProject, 
  onSelectAll, 
  onSort, 
  sortConfig,
  onViewProject,
  onEditProject,
  onDuplicateProject,
  onGenerateReport 
}) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'text-primary bg-primary/10';
      case 'completed':
        return 'text-success bg-success/10';
      case 'on-hold':
        return 'text-warning bg-warning/10';
      case 'archived':
        return 'text-muted-foreground bg-muted';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getComplianceColor = (percentage) => {
    if (percentage >= 90) return 'text-success';
    if (percentage >= 70) return 'text-primary';
    if (percentage >= 50) return 'text-warning';
    return 'text-error';
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getSortIcon = (column) => {
    if (sortConfig?.key !== column) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const handleSort = (column) => {
    onSort(column);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-professional overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 p-4">
                <Checkbox
                  checked={selectedProjects?.length === projects?.length && projects?.length > 0}
                  onChange={onSelectAll}
                />
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-2 text-sm font-semibold text-foreground hover:text-primary transition-professional"
                >
                  <span>Project Name</span>
                  <Icon name={getSortIcon('name')} size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('createdAt')}
                  className="flex items-center space-x-2 text-sm font-semibold text-foreground hover:text-primary transition-professional"
                >
                  <span>Created</span>
                  <Icon name={getSortIcon('createdAt')} size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <span className="text-sm font-semibold text-foreground">Document Type</span>
              </th>
              <th className="text-left p-4">
                <span className="text-sm font-semibold text-foreground">Assignee</span>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-2 text-sm font-semibold text-foreground hover:text-primary transition-professional"
                >
                  <span>Status</span>
                  <Icon name={getSortIcon('status')} size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('compliance')}
                  className="flex items-center space-x-2 text-sm font-semibold text-foreground hover:text-primary transition-professional"
                >
                  <span>Compliance</span>
                  <Icon name={getSortIcon('compliance')} size={14} />
                </button>
              </th>
              <th className="text-center p-4">
                <span className="text-sm font-semibold text-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {projects?.map((project) => (
              <tr
                key={project?.id}
                className="border-b border-border hover:bg-muted/30 transition-professional"
                onMouseEnter={() => setHoveredRow(project?.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="p-4">
                  <Checkbox
                    checked={selectedProjects?.includes(project?.id)}
                    onChange={() => onSelectProject(project?.id)}
                  />
                </td>
                <td className="p-4">
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{project?.name}</p>
                    <p className="text-xs text-muted-foreground">{project?.description}</p>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm text-muted-foreground">
                    {formatDate(project?.createdAt)}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="FileText" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{project?.documentType}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-secondary-foreground">
                        {project?.assignee?.split(' ')?.map(n => n?.[0])?.join('')}
                      </span>
                    </div>
                    <span className="text-sm text-foreground">{project?.assignee}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project?.status)}`}>
                    {project?.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-1">
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-300 ${
                            project?.compliance >= 90 ? 'bg-success' :
                            project?.compliance >= 70 ? 'bg-primary' :
                            project?.compliance >= 50 ? 'bg-warning' : 'bg-error'
                          }`}
                          style={{ width: `${project?.compliance}%` }}
                        />
                      </div>
                    </div>
                    <span className={`text-sm font-medium ${getComplianceColor(project?.compliance)}`}>
                      {project?.compliance}%
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewProject(project?.id)}
                    >
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEditProject(project?.id)}
                    >
                      <Icon name="Edit" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDuplicateProject(project?.id)}
                    >
                      <Icon name="Copy" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onGenerateReport(project?.id)}
                    >
                      <Icon name="FileText" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4 p-4">
        {projects?.map((project) => (
          <div key={project?.id} className="border border-border rounded-lg p-4 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <Checkbox
                  checked={selectedProjects?.includes(project?.id)}
                  onChange={() => onSelectProject(project?.id)}
                />
                <div className="space-y-1 flex-1">
                  <h3 className="font-medium text-foreground">{project?.name}</h3>
                  <p className="text-sm text-muted-foreground">{project?.description}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project?.status)}`}>
                {project?.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Created:</span>
                <p className="font-medium text-foreground">{formatDate(project?.createdAt)}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Type:</span>
                <p className="font-medium text-foreground">{project?.documentType}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Assignee:</span>
                <p className="font-medium text-foreground">{project?.assignee}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Compliance:</span>
                <p className={`font-medium ${getComplianceColor(project?.compliance)}`}>
                  {project?.compliance}%
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div className="flex-1 mr-4">
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      project?.compliance >= 90 ? 'bg-success' :
                      project?.compliance >= 70 ? 'bg-primary' :
                      project?.compliance >= 50 ? 'bg-warning' : 'bg-error'
                    }`}
                    style={{ width: `${project?.compliance}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewProject(project?.id)}
                >
                  <Icon name="Eye" size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEditProject(project?.id)}
                >
                  <Icon name="Edit" size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsTable;