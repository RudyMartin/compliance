import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ProjectContextBar from '../../components/ui/ProjectContextBar';
import QuickActionMenu from '../../components/ui/QuickActionMenu';
import RequirementCategoryFilter from './components/RequirementCategoryFilter';
import RequirementsList from './components/RequirementsList';
import RequirementDetails from './components/RequirementDetails';
import ProgressOverview from './components/ProgressOverview';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const RequirementsChecklist = () => {
  const [selectedRequirements, setSelectedRequirements] = useState([]);
  const [selectedRequirementId, setSelectedRequirementId] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState([]);
  const [isMobileDetailsOpen, setIsMobileDetailsOpen] = useState(false);

  // Mock data for requirements
  const mockRequirements = [
    {
      id: 1,
      title: "Data Encryption Standards",
      description: "All patient data must be encrypted using AES-256 encryption standards both at rest and in transit.",
      fullDescription: `All patient data must be encrypted using AES-256 encryption standards both at rest and in transit. This includes database storage, file systems, backup media, and all network communications. The encryption implementation must comply with FIPS 140-2 Level 2 standards and undergo annual security audits. Key management procedures must follow industry best practices with proper key rotation schedules.`,
      category: "Security",
      priority: "high",
      status: "completed",
      sourceDocument: "HIPAA Security Rule",
      sourceSection: "164.312(a)(2)(iv)",
      assignee: "Sarah Johnson",
      dueDate: "2024-08-15",
      notes: "Implemented AES-256 encryption across all systems. Annual audit scheduled for Q4 2024.",
      evidenceCount: 3,
      commentsCount: 2
    },
    {
      id: 2,
      title: "Access Control Implementation",
      description: "Implement role-based access control with unique user identification and automatic logoff.",
      fullDescription: `Implement comprehensive role-based access control system with unique user identification, automatic logoff after predetermined time periods, and encryption/decryption capabilities. The system must maintain audit logs of all access attempts and provide administrative controls for user account management. Multi-factor authentication is required for privileged accounts.`,
      category: "Security",
      priority: "high",
      status: "in-progress",
      sourceDocument: "HIPAA Security Rule",
      sourceSection: "164.312(a)(1)",
      assignee: "Mike Chen",
      dueDate: "2024-08-20",
      notes: "RBAC framework 80% complete. MFA integration in testing phase.",
      evidenceCount: 2,
      commentsCount: 4
    },
    {
      id: 3,
      title: "Audit Log Requirements",
      description: "Maintain comprehensive audit logs of all system access and data modifications.",
      fullDescription: `Maintain comprehensive audit logs that record all system access attempts, data modifications, administrative actions, and security events. Logs must include user identification, timestamp, action performed, and outcome. Log retention period must be minimum 6 years with secure storage and regular backup procedures. Automated monitoring and alerting for suspicious activities is required.`,
      category: "Compliance",
      priority: "medium",
      status: "pending",
      sourceDocument: "HIPAA Security Rule",
      sourceSection: "164.312(b)",
      assignee: "Lisa Wang",
      dueDate: "2024-08-25",
      notes: "",
      evidenceCount: 1,
      commentsCount: 1
    },
    {
      id: 4,
      title: "Data Backup and Recovery",
      description: "Establish procedures for data backup and disaster recovery with regular testing.",
      fullDescription: `Establish comprehensive procedures for data backup and disaster recovery including regular automated backups, offsite storage, encryption of backup media, and documented recovery procedures. Recovery time objectives (RTO) and recovery point objectives (RPO) must be defined and tested quarterly. Business continuity plans must address various disaster scenarios.`,
      category: "Operations",
      priority: "high",
      status: "failed",
      sourceDocument: "HIPAA Security Rule",
      sourceSection: "164.308(a)(7)(ii)(A)",
      assignee: "David Rodriguez",
      dueDate: "2024-08-10",
      notes: "Initial backup system failed testing. Investigating alternative solutions.",
      evidenceCount: 0,
      commentsCount: 3
    },
    {
      id: 5,
      title: "Employee Training Program",
      description: "Implement comprehensive security awareness training for all employees.",
      fullDescription: `Implement comprehensive security awareness training program for all employees with initial training upon hire and annual refresher courses. Training must cover HIPAA requirements, security policies, incident reporting procedures, and social engineering awareness. Training completion must be tracked and documented with regular assessments of effectiveness.`,
      category: "Training",
      priority: "medium",
      status: "in-progress",
      sourceDocument: "HIPAA Security Rule",
      sourceSection: "164.308(a)(5)(i)",
      assignee: "Jennifer Kim",
      dueDate: "2024-09-01",
      notes: "Training modules developed. Pilot program starting next week.",
      evidenceCount: 2,
      commentsCount: 0
    },
    {
      id: 6,
      title: "Incident Response Procedures",
      description: "Develop and maintain incident response procedures for security breaches.",
      fullDescription: `Develop and maintain comprehensive incident response procedures for security breaches including detection, containment, investigation, notification, and recovery processes. Procedures must define roles and responsibilities, communication protocols, and regulatory notification requirements. Regular drills and tabletop exercises must be conducted to test effectiveness.`,
      category: "Security",
      priority: "high",
      status: "completed",
      sourceDocument: "HIPAA Security Rule",
      sourceSection: "164.308(a)(6)(ii)",
      assignee: "Robert Taylor",
      dueDate: "2024-07-30",
      notes: "Incident response plan approved and tested. Next drill scheduled for Q4.",
      evidenceCount: 4,
      commentsCount: 1
    }
  ];

  // Mock categories
  const mockCategories = [
    { id: "security", name: "Security", icon: "Shield", count: 3 },
    { id: "compliance", name: "Compliance", icon: "CheckSquare", count: 1 },
    { id: "operations", name: "Operations", icon: "Settings", count: 1 },
    { id: "training", name: "Training", icon: "GraduationCap", count: 1 }
  ];

  // Mock status filters
  const mockStatusFilters = [
    { value: "completed", label: "Completed", count: 2 },
    { value: "in-progress", label: "In Progress", count: 2 },
    { value: "pending", label: "Pending", count: 1 },
    { value: "failed", label: "Failed", count: 1 }
  ];

  // Mock priority filters
  const mockPriorityFilters = [
    { value: "high", label: "High Priority", count: 4 },
    { value: "medium", label: "Medium Priority", count: 2 },
    { value: "low", label: "Low Priority", count: 0 }
  ];

  // Filter requirements based on selected filters
  const filteredRequirements = mockRequirements?.filter(req => {
    const categoryMatch = selectedCategories?.length === 0 || selectedCategories?.includes(req?.category?.toLowerCase());
    const statusMatch = selectedStatus?.length === 0 || selectedStatus?.includes(req?.status);
    const priorityMatch = selectedPriority?.length === 0 || selectedPriority?.includes(req?.priority);
    
    return categoryMatch && statusMatch && priorityMatch;
  });

  // Calculate progress statistics
  const totalRequirements = filteredRequirements?.length;
  const completedRequirements = filteredRequirements?.filter(req => req?.status === 'completed')?.length;
  const inProgressRequirements = filteredRequirements?.filter(req => req?.status === 'in-progress')?.length;
  const failedRequirements = filteredRequirements?.filter(req => req?.status === 'failed')?.length;

  // Calculate category progress
  const categoryProgress = mockCategories?.map(category => {
    const categoryReqs = filteredRequirements?.filter(req => req?.category?.toLowerCase() === category?.id);
    const completed = categoryReqs?.filter(req => req?.status === 'completed')?.length;
    return {
      ...category,
      total: categoryReqs?.length,
      completed: completed
    };
  });

  // Get selected requirement details
  const selectedRequirement = selectedRequirementId 
    ? filteredRequirements?.find(req => req?.id === selectedRequirementId)
    : null;

  // Event handlers
  const handleCategoryChange = (categoryId, checked) => {
    setSelectedCategories(prev => 
      checked 
        ? [...prev, categoryId]
        : prev?.filter(id => id !== categoryId)
    );
  };

  const handleStatusChange = (status, checked) => {
    setSelectedStatus(prev => 
      checked 
        ? [...prev, status]
        : prev?.filter(s => s !== status)
    );
  };

  const handlePriorityChange = (priority, checked) => {
    setSelectedPriority(prev => 
      checked 
        ? [...prev, priority]
        : prev?.filter(p => p !== priority)
    );
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedStatus([]);
    setSelectedPriority([]);
  };

  const handleRequirementStatusChange = (requirementId, newStatus) => {
    console.log(`Updating requirement ${requirementId} status to ${newStatus}`);
    // In a real app, this would update the backend
  };

  const handleNotesChange = (requirementId, notes) => {
    console.log(`Updating requirement ${requirementId} notes:`, notes);
    // In a real app, this would update the backend
  };

  const handleAttachEvidence = (requirementId) => {
    console.log(`Attaching evidence to requirement ${requirementId}`);
    // In a real app, this would open a file upload dialog
  };

  const handleViewDetails = (requirementId) => {
    setSelectedRequirementId(requirementId);
    setIsMobileDetailsOpen(true);
  };

  const handleBulkAction = (action, requirementIds) => {
    console.log(`Performing bulk action ${action} on requirements:`, requirementIds);
    // In a real app, this would perform the bulk action
  };

  const handleAddComment = (requirementId, comment) => {
    console.log(`Adding comment to requirement ${requirementId}:`, comment);
    // In a real app, this would add the comment to the backend
  };

  const handleExportReport = () => {
    console.log('Exporting compliance report');
    // In a real app, this would generate and download a report
  };

  const handleGenerateReport = () => {
    console.log('Generating detailed compliance report');
    // In a real app, this would navigate to report generation page
  };

  // Project context handlers
  const handleSave = () => {
    console.log('Saving progress');
  };

  const handleExport = () => {
    console.log('Exporting checklist');
  };

  const handleBookmark = () => {
    console.log('Bookmarking checklist');
  };

  // Quick action handlers
  const handleAnnotate = () => {
    console.log('Adding annotation');
  };

  const handleHighlight = () => {
    console.log('Highlighting text');
  };

  const handleMapRequirement = () => {
    console.log('Mapping requirement');
  };

  const handleSaveProgress = () => {
    console.log('Saving progress');
  };

  const handleExportSection = () => {
    console.log('Exporting section');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProjectContextBar
        projectName="Healthcare Compliance Review 2024"
        documentType="HIPAA Security Requirements"
        complianceStatus="In Progress"
        completionPercentage={Math.round((completedRequirements / totalRequirements) * 100) || 0}
        lastSaved="2 minutes ago"
        onSave={handleSave}
        onExport={handleExport}
        onBookmark={handleBookmark}
      />

      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">Requirements Checklist</h1>
                <p className="text-muted-foreground">
                  Systematic compliance verification and progress tracking for policy requirements
                </p>
              </div>
              
              <div className="hidden lg:flex items-center space-x-3">
                <Button variant="outline" onClick={handleExportReport}>
                  <Icon name="Download" size={16} />
                  <span className="ml-2">Export Report</span>
                </Button>
                <Button variant="default" onClick={handleGenerateReport}>
                  <Icon name="FileText" size={16} />
                  <span className="ml-2">Generate Report</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar - Filters */}
            <div className="lg:col-span-3">
              <div className="space-y-4">
                <RequirementCategoryFilter
                  categories={mockCategories}
                  selectedCategories={selectedCategories}
                  onCategoryChange={handleCategoryChange}
                  statusFilters={mockStatusFilters}
                  selectedStatus={selectedStatus}
                  onStatusChange={handleStatusChange}
                  priorityFilters={mockPriorityFilters}
                  selectedPriority={selectedPriority}
                  onPriorityChange={handlePriorityChange}
                  onClearFilters={handleClearFilters}
                />
                
                {/* Progress Overview - Desktop */}
                <div className="hidden lg:block">
                  <ProgressOverview
                    totalRequirements={totalRequirements}
                    completedRequirements={completedRequirements}
                    inProgressRequirements={inProgressRequirements}
                    failedRequirements={failedRequirements}
                    categoryProgress={categoryProgress}
                    onExportReport={handleExportReport}
                    onGenerateReport={handleGenerateReport}
                  />
                </div>
              </div>
            </div>

            {/* Center - Requirements List */}
            <div className="lg:col-span-6">
              <RequirementsList
                requirements={filteredRequirements}
                onStatusChange={handleRequirementStatusChange}
                onNotesChange={handleNotesChange}
                onAttachEvidence={handleAttachEvidence}
                onViewDetails={handleViewDetails}
                selectedRequirements={selectedRequirements}
                onSelectionChange={setSelectedRequirements}
                onBulkAction={handleBulkAction}
              />
            </div>

            {/* Right Sidebar - Requirement Details */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-32">
                <RequirementDetails
                  requirement={selectedRequirement}
                  onClose={() => setSelectedRequirementId(null)}
                  onStatusChange={handleRequirementStatusChange}
                  onNotesChange={handleNotesChange}
                  onAttachEvidence={handleAttachEvidence}
                  onAddComment={handleAddComment}
                />
              </div>
            </div>
          </div>

          {/* Mobile Progress Overview */}
          <div className="lg:hidden mt-6">
            <ProgressOverview
              totalRequirements={totalRequirements}
              completedRequirements={completedRequirements}
              inProgressRequirements={inProgressRequirements}
              failedRequirements={failedRequirements}
              categoryProgress={categoryProgress}
              onExportReport={handleExportReport}
              onGenerateReport={handleGenerateReport}
            />
          </div>
        </div>
      </main>

      {/* Mobile Requirement Details Modal */}
      {isMobileDetailsOpen && selectedRequirement && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background">
          <div className="h-full overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Requirement Details</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileDetailsOpen(false)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
              
              <RequirementDetails
                requirement={selectedRequirement}
                onClose={() => setIsMobileDetailsOpen(false)}
                onStatusChange={handleRequirementStatusChange}
                onNotesChange={handleNotesChange}
                onAttachEvidence={handleAttachEvidence}
                onAddComment={handleAddComment}
              />
            </div>
          </div>
        </div>
      )}

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

export default RequirementsChecklist;