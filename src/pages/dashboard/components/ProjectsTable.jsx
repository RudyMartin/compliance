import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectsTable = ({ projects, onViewProject, onContinueAnalysis }) => {
  const [sortField, setSortField] = useState('lastActivity');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filterStatus, setFilterStatus] = useState('all');
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    const colors = {
      'completed': 'text-success bg-success/10',
      'in-progress': 'text-warning bg-warning/10',
      'pending': 'text-muted-foreground bg-muted',
      'failed': 'text-error bg-error/10'
    };
    return colors?.[status] || colors?.pending;
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredProjects = projects?.filter(project => 
    filterStatus === 'all' || project?.status === filterStatus
  );

  const sortedProjects = [...filteredProjects]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];
    
    if (sortField === 'lastActivity') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-professional">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Recent Projects</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/project-management')}
          >
            <Icon name="Plus" size={16} />
            <span className="ml-2">New Project</span>
          </Button>
        </div>
        
        {/* Filters */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Filter:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e?.target?.value)}
              className="text-sm border border-border rounded-md px-3 py-1 bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
      </div>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 hover:text-foreground transition-professional"
                >
                  <span>Project Name</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Document Types</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-1 hover:text-foreground transition-professional"
                >
                  <span>Status</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Progress</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('lastActivity')}
                  className="flex items-center space-x-1 hover:text-foreground transition-professional"
                >
                  <span>Last Activity</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedProjects?.map((project) => (
              <tr 
                key={project?.id} 
                className="border-b border-border hover:bg-muted/30 transition-professional cursor-pointer"
                onClick={() => onViewProject(project?.id)}
              >
                <td className="p-4">
                  <div>
                    <p className="font-medium text-foreground">{project?.name}</p>
                    <p className="text-sm text-muted-foreground">{project?.description}</p>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {project?.documentTypes?.map((type, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-secondary/20 text-secondary text-xs rounded-full"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project?.status)}`}>
                    {project?.status?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${project?.progress}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">{project?.progress}%</span>
                  </div>
                </td>
                <td className="p-4 text-sm text-muted-foreground">
                  {formatDate(project?.lastActivity)}
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e?.stopPropagation();
                        navigate('/document-comparison', { state: { projectId: project?.id } });
                      }}
                    >
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onContinueAnalysis(project?.id);
                      }}
                    >
                      <Icon name="Play" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="md:hidden p-4 space-y-4">
        {sortedProjects?.map((project) => (
          <div 
            key={project?.id}
            className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-professional cursor-pointer"
            onClick={() => onViewProject(project?.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground truncate">{project?.name}</h4>
                <p className="text-sm text-muted-foreground mt-1">{project?.description}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ml-2 ${getStatusColor(project?.status)}`}>
                {project?.status?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())}
              </span>
            </div>
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${project?.progress}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground">{project?.progress}%</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {formatDate(project?.lastActivity)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {project?.documentTypes?.slice(0, 2)?.map((type, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-secondary/20 text-secondary text-xs rounded-full"
                  >
                    {type}
                  </span>
                ))}
                {project?.documentTypes?.length > 2 && (
                  <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                    +{project?.documentTypes?.length - 2}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e?.stopPropagation();
                    navigate('/document-comparison', { state: { projectId: project?.id } });
                  }}
                >
                  <Icon name="Eye" size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e?.stopPropagation();
                    onContinueAnalysis(project?.id);
                  }}
                >
                  <Icon name="Play" size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {sortedProjects?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="FolderOpen" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h4 className="text-lg font-medium text-foreground mb-2">No Projects Found</h4>
          <p className="text-muted-foreground mb-4">
            {filterStatus === 'all' ? "You haven't created any projects yet." : `No projects with status"${filterStatus}" found.`
            }
          </p>
          <Button
            variant="default"
            onClick={() => navigate('/project-management')}
          >
            <Icon name="Plus" size={16} />
            <span className="ml-2">Create New Project</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectsTable;