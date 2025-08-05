import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ProjectContextBar from '../../components/ui/ProjectContextBar';
import QuickActionMenu from '../../components/ui/QuickActionMenu';
import ProjectOverviewCards from './components/ProjectOverviewCards';
import ProjectFilters from './components/ProjectFilters';
import ProjectsTable from './components/ProjectsTable';
import ProjectTemplates from './components/ProjectTemplates';
import RecentActivity from './components/RecentActivity';

const ProjectManagement = () => {
  const navigate = useNavigate();
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    assignee: 'all',
    compliance: 'all'
  });

  // Mock data for overview cards
  const overviewData = {
    totalProjects: 24,
    activeReviews: 8,
    completed: 16,
    complianceRate: 87
  };

  // Mock projects data
  const [projects] = useState([
    {
      id: 'proj-001',
      name: 'Healthcare HIPAA Compliance Review 2024',
      description: 'Comprehensive HIPAA compliance assessment for patient data handling procedures',
      createdAt: '2024-07-15T10:30:00Z',
      documentType: 'Policy Documentation',
      assignee: 'Sarah Wilson',
      status: 'Active',
      compliance: 92,
      lastActivity: '2024-08-05T14:20:00Z'
    },
    {
      id: 'proj-002',
      name: 'Financial SOX Compliance Audit',
      description: 'Sarbanes-Oxley compliance verification for financial reporting processes',
      createdAt: '2024-07-10T09:15:00Z',
      documentType: 'Financial Reports',
      assignee: 'Michael Chen',
      status: 'Completed',
      compliance: 98,
      lastActivity: '2024-08-04T16:45:00Z'
    },
    {
      id: 'proj-003',
      name: 'GDPR Privacy Policy Assessment',
      description: 'European GDPR compliance review for data protection and privacy policies',
      createdAt: '2024-07-20T11:45:00Z',
      documentType: 'Privacy Policies',
      assignee: 'Emily Davis',
      status: 'Active',
      compliance: 76,
      lastActivity: '2024-08-05T12:10:00Z'
    },
    {
      id: 'proj-004',
      name: 'ISO 27001 Security Framework',
      description: 'Information security management system compliance verification',
      createdAt: '2024-06-28T14:20:00Z',
      documentType: 'Security Policies',
      assignee: 'John Doe',
      status: 'On Hold',
      compliance: 64,
      lastActivity: '2024-08-03T09:30:00Z'
    },
    {
      id: 'proj-005',
      name: 'Government Contract Compliance',
      description: 'Federal contract compliance requirements verification and documentation',
      createdAt: '2024-07-25T08:00:00Z',
      documentType: 'Contract Documentation',
      assignee: 'Sarah Wilson',
      status: 'Active',
      compliance: 83,
      lastActivity: '2024-08-05T11:15:00Z'
    },
    {
      id: 'proj-006',
      name: 'Environmental Compliance Report',
      description: 'EPA environmental regulations compliance assessment',
      createdAt: '2024-06-15T13:30:00Z',
      documentType: 'Environmental Reports',
      assignee: 'Michael Chen',
      status: 'Archived',
      compliance: 95,
      lastActivity: '2024-07-30T15:20:00Z'
    }
  ]);

  // Mock recent activity data
  const [recentActivities] = useState([
    {
      id: 'act-001',
      user: 'Sarah Wilson',
      action: 'completed review for',
      target: 'Healthcare HIPAA Compliance Review 2024',
      details: 'All requirements verified and documented',
      type: 'completed',
      timestamp: '2024-08-05T14:20:00Z'
    },
    {
      id: 'act-002',
      user: 'Michael Chen',
      action: 'uploaded new document to',
      target: 'Financial SOX Compliance Audit',
      details: 'Added Q3 financial statements for review',
      type: 'uploaded',
      timestamp: '2024-08-05T13:45:00Z'
    },
    {
      id: 'act-003',
      user: 'Emily Davis',
      action: 'commented on',
      target: 'GDPR Privacy Policy Assessment',
      details: 'Requested clarification on data retention policies',
      type: 'commented',
      timestamp: '2024-08-05T12:10:00Z'
    },
    {
      id: 'act-004',
      user: 'John Doe',
      action: 'created new project',
      target: 'Cybersecurity Framework Review',
      details: 'Initial setup and document upload completed',
      type: 'created',
      timestamp: '2024-08-05T10:30:00Z'
    },
    {
      id: 'act-005',
      user: 'Sarah Wilson',
      action: 'exported compliance report for',
      target: 'Government Contract Compliance',
      details: 'Generated PDF report for stakeholder review',
      type: 'exported',
      timestamp: '2024-08-05T09:15:00Z'
    }
  ]);

  // Filter and sort projects
  const filteredAndSortedProjects = React.useMemo(() => {
    let filtered = projects?.filter(project => {
      const matchesSearch = project?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
                           project?.assignee?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
                           project?.documentType?.toLowerCase()?.includes(filters?.search?.toLowerCase());
      
      const matchesStatus = filters?.status === 'all' || project?.status?.toLowerCase() === filters?.status;
      
      const matchesAssignee = filters?.assignee === 'all'|| project?.assignee?.toLowerCase()?.replace(' ', '-') === filters?.assignee;
      
      const matchesCompliance = filters?.compliance === 'all' ||
                               (filters?.compliance === 'high' && project?.compliance >= 90) ||
                               (filters?.compliance === 'medium' && project?.compliance >= 70 && project?.compliance < 90) ||
                               (filters?.compliance === 'low' && project?.compliance >= 50 && project?.compliance < 70) ||
                               (filters?.compliance === 'critical' && project?.compliance < 50);
      
      return matchesSearch && matchesStatus && matchesAssignee && matchesCompliance;
    });

    // Sort projects
    filtered?.sort((a, b) => {
      let aValue = a?.[sortConfig?.key];
      let bValue = b?.[sortConfig?.key];
      
      if (sortConfig?.key === 'createdAt' || sortConfig?.key === 'lastActivity') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (aValue < bValue) {
        return sortConfig?.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig?.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return filtered;
  }, [projects, filters, sortConfig]);

  // Handlers
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = (searchTerm) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      assignee: 'all',
      compliance: 'all'
    });
  };

  const handleSelectProject = (projectId) => {
    setSelectedProjects(prev => 
      prev?.includes(projectId) 
        ? prev?.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const handleSelectAll = () => {
    setSelectedProjects(
      selectedProjects?.length === filteredAndSortedProjects?.length 
        ? [] 
        : filteredAndSortedProjects?.map(p => p?.id)
    );
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleBulkAction = (action) => {
    console.log('Bulk action:', action, 'on projects:', selectedProjects);
    // Implement bulk actions here
  };

  const handleViewProject = (projectId) => {
    navigate('/document-comparison', { state: { projectId } });
  };

  const handleEditProject = (projectId) => {
    console.log('Edit project:', projectId);
    // Implement edit functionality
  };

  const handleDuplicateProject = (projectId) => {
    console.log('Duplicate project:', projectId);
    // Implement duplicate functionality
  };

  const handleGenerateReport = (projectId) => {
    navigate('/compliance-report', { state: { projectId } });
  };

  const handleCreateFromTemplate = (templateId) => {
    console.log('Create project from template:', templateId);
    // Implement template creation
  };

  const handleManageTemplates = () => {
    console.log('Manage templates');
    // Implement template management
  };

  // Quick action handlers
  const handleAnnotate = () => {
    console.log('Annotate action');
  };

  const handleBookmark = () => {
    console.log('Bookmark action');
  };

  const handleMapRequirement = () => {
    console.log('Map requirement action');
  };

  const handleSaveProgress = () => {
    console.log('Save progress action');
  };

  const handleExportSection = () => {
    console.log('Export section action');
  };

  const handleHighlight = () => {
    console.log('Highlight action');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <ProjectContextBar
        projectName="Project Management Dashboard"
        documentType="Management Interface"
        complianceStatus="Active"
        completionPercentage={75}
        lastSaved="Auto-saved"
        onSave={() => console.log('Save dashboard state')}
        onExport={() => console.log('Export dashboard data')}
        onBookmark={() => console.log('Bookmark dashboard')}
      />

      <main className="pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <Breadcrumb />
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Project Management</h1>
            <p className="text-muted-foreground">
              Organize, track, and manage your compliance document analysis projects with comprehensive oversight capabilities.
            </p>
          </div>

          {/* Overview Cards */}
          <ProjectOverviewCards overviewData={overviewData} />

          {/* Project Templates */}
          <ProjectTemplates 
            onCreateFromTemplate={handleCreateFromTemplate}
            onManageTemplates={handleManageTemplates}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Filters */}
              <ProjectFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onSearch={handleSearch}
                onClearFilters={handleClearFilters}
                onBulkAction={handleBulkAction}
                selectedProjects={selectedProjects}
              />

              {/* Projects Table */}
              <ProjectsTable
                projects={filteredAndSortedProjects}
                selectedProjects={selectedProjects}
                onSelectProject={handleSelectProject}
                onSelectAll={handleSelectAll}
                onSort={handleSort}
                sortConfig={sortConfig}
                onViewProject={handleViewProject}
                onEditProject={handleEditProject}
                onDuplicateProject={handleDuplicateProject}
                onGenerateReport={handleGenerateReport}
              />
            </div>

            <div className="space-y-6">
              {/* Recent Activity */}
              <RecentActivity activities={recentActivities} />
            </div>
          </div>
        </div>
      </main>

      <QuickActionMenu
        onAnnotate={handleAnnotate}
        onBookmark={handleBookmark}
        onMapRequirement={handleMapRequirement}
        onSaveProgress={handleSaveProgress}
        onExportSection={handleExportSection}
        onHighlight={handleHighlight}
      />
    </div>
  );
};

export default ProjectManagement;