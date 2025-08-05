import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';

import QuickActionMenu from '../../components/ui/QuickActionMenu';
import MetricsCard from './components/MetricsCard';
import ProjectsTable from './components/ProjectsTable';
import ComplianceSummary from './components/ComplianceSummary';
import ComplianceChart from './components/ComplianceChart';
import RecentActivity from './components/RecentActivity';

import Button from '../../components/ui/Button';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Mock data for metrics
  const metricsData = [
    {
      title: "Total Projects",
      value: "24",
      change: "+12%",
      changeType: "positive",
      icon: "FolderOpen",
      color: "primary"
    },
    {
      title: "Pending Reviews",
      value: "8",
      change: "-3%",
      changeType: "negative",
      icon: "Clock",
      color: "warning"
    },
    {
      title: "Compliance Rate",
      value: "87%",
      change: "+5%",
      changeType: "positive",
      icon: "Shield",
      color: "success"
    },
    {
      title: "Overdue Items",
      value: "3",
      change: "+1",
      changeType: "negative",
      icon: "AlertTriangle",
      color: "error"
    }
  ];

  // Mock data for projects
  const projectsData = [
    {
      id: 1,
      name: "Healthcare Compliance Review 2024",
      description: "Annual policy compliance verification for healthcare protocols",
      documentTypes: ["Policy", "Procedure", "Guidelines"],
      status: "in-progress",
      progress: 68,
      lastActivity: "2025-01-05T17:30:00Z"
    },
    {
      id: 2,
      name: "Financial Audit Documentation",
      description: "SOX compliance documentation review and analysis",
      documentTypes: ["Financial", "Audit", "Controls"],
      status: "completed",
      progress: 100,
      lastActivity: "2025-01-04T14:20:00Z"
    },
    {
      id: 3,
      name: "Data Privacy Impact Assessment",
      description: "GDPR compliance review for new data processing activities",
      documentTypes: ["Privacy", "Legal", "Technical"],
      status: "pending",
      progress: 25,
      lastActivity: "2025-01-03T09:15:00Z"
    },
    {
      id: 4,
      name: "Environmental Safety Standards",
      description: "ISO 14001 compliance verification for manufacturing processes",
      documentTypes: ["Environmental", "Safety", "Standards"],
      status: "in-progress",
      progress: 45,
      lastActivity: "2025-01-05T11:45:00Z"
    },
    {
      id: 5,
      name: "Cybersecurity Framework Review",
      description: "NIST cybersecurity framework compliance assessment",
      documentTypes: ["Security", "Technical", "Framework"],
      status: "failed",
      progress: 15,
      lastActivity: "2025-01-02T16:30:00Z"
    }
  ];

  // Mock data for compliance alerts
  const alertsData = [
    {
      id: 1,
      title: "Missing Risk Assessment Documentation",
      description: "Healthcare project requires updated risk assessment forms",
      priority: "high",
      project: "Healthcare Compliance Review 2024"
    },
    {
      id: 2,
      title: "Incomplete Control Testing",
      description: "Financial audit missing 3 control test procedures",
      priority: "medium",
      project: "Financial Audit Documentation"
    },
    {
      id: 3,
      title: "Outdated Privacy Notice",
      description: "Privacy notice version doesn't match current template",
      priority: "low",
      project: "Data Privacy Impact Assessment"
    }
  ];

  // Mock data for deadlines
  const deadlinesData = [
    {
      id: 1,
      title: "Healthcare Compliance Final Review",
      project: "Healthcare Compliance Review 2024",
      dueDate: "2025-01-08T23:59:59Z",
      daysLeft: 3,
      projectId: 1
    },
    {
      id: 2,
      title: "Environmental Standards Submission",
      project: "Environmental Safety Standards",
      dueDate: "2025-01-12T17:00:00Z",
      daysLeft: 7,
      projectId: 4
    },
    {
      id: 3,
      title: "Cybersecurity Framework Update",
      project: "Cybersecurity Framework Review",
      dueDate: "2025-01-15T12:00:00Z",
      daysLeft: 10,
      projectId: 5
    }
  ];

  // Mock data for compliance trends
  const trendsData = [
    {
      category: "Documentation Quality",
      percentage: 92,
      completed: 184,
      total: 200,
      trend: "up",
      change: "+3"
    },
    {
      category: "Regulatory Compliance",
      percentage: 78,
      completed: 156,
      total: 200,
      trend: "down",
      change: "-2"
    },
    {
      category: "Risk Management",
      percentage: 85,
      completed: 170,
      total: 200,
      trend: "up",
      change: "+5"
    },
    {
      category: "Process Adherence",
      percentage: 89,
      completed: 178,
      total: 200,
      trend: "stable",
      change: "0"
    }
  ];

  // Mock data for charts
  const complianceByCategory = [
    { name: "Healthcare", value: 87 },
    { name: "Financial", value: 94 },
    { name: "Environmental", value: 76 },
    { name: "Cybersecurity", value: 82 },
    { name: "Privacy", value: 91 }
  ];

  const requirementStatus = [
    { name: "Completed", value: 156 },
    { name: "In Progress", value: 89 },
    { name: "Pending", value: 34 },
    { name: "Failed", value: 12 }
  ];

  // Mock data for recent activities
  const activitiesData = [
    {
      id: 1,
      type: "analysis-complete",
      title: "Compliance Analysis Completed",
      description: "Healthcare policy analysis finished with 3 gaps identified",
      projectName: "Healthcare Compliance Review 2024",
      projectId: 1,
      timestamp: "2025-01-05T17:30:00Z"
    },
    {
      id: 2,
      type: "document-upload",
      title: "New Documents Uploaded",
      description: "5 policy documents uploaded for environmental standards review",
      projectName: "Environmental Safety Standards",
      projectId: 4,
      timestamp: "2025-01-05T15:45:00Z"
    },
    {
      id: 3,
      type: "requirement-mapped",
      title: "Requirements Mapped",
      description: "12 new requirements mapped to existing documentation",
      projectName: "Financial Audit Documentation",
      projectId: 2,
      timestamp: "2025-01-05T14:20:00Z"
    },
    {
      id: 4,
      type: "report-generated",
      title: "Compliance Report Generated",
      description: "Monthly compliance report generated and exported",
      projectName: "Data Privacy Impact Assessment",
      projectId: 3,
      reportId: "RPT-2025-001",
      timestamp: "2025-01-05T12:10:00Z"
    },
    {
      id: 5,
      type: "deadline-approaching",
      title: "Deadline Approaching",
      description: "Healthcare compliance review due in 3 days",
      projectName: "Healthcare Compliance Review 2024",
      projectId: 1,
      timestamp: "2025-01-05T09:00:00Z"
    },
    {
      id: 6,
      type: "annotation-added",
      title: "Annotation Added",
      description: "Risk assessment section annotated with compliance notes",
      projectName: "Environmental Safety Standards",
      projectId: 4,
      timestamp: "2025-01-04T16:30:00Z"
    }
  ];

  const handleViewProject = (projectId) => {
    navigate('/document-comparison', { state: { projectId } });
  };

  const handleContinueAnalysis = (projectId) => {
    navigate('/requirements-checklist', { state: { projectId } });
  };

  const handleQuickAction = (action) => {
    console.log(`Quick action: ${action}`);
    // Implement quick action handlers
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          <Breadcrumb />
          
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                  Welcome back! Here's your compliance overview for {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => navigate('/document-upload')}
                  iconName="Upload"
                  iconPosition="left"
                >
                  Upload Documents
                </Button>
                <Button
                  variant="default"
                  onClick={() => navigate('/project-management')}
                  iconName="Plus"
                  iconPosition="left"
                >
                  New Project
                </Button>
              </div>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metricsData?.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                color={metric?.color}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            {/* Projects Table - 8 columns */}
            <div className="lg:col-span-8">
              <ProjectsTable
                projects={projectsData}
                onViewProject={handleViewProject}
                onContinueAnalysis={handleContinueAnalysis}
              />
            </div>

            {/* Compliance Summary - 4 columns */}
            <div className="lg:col-span-4">
              <ComplianceSummary
                alerts={alertsData}
                deadlines={deadlinesData}
                trends={trendsData}
              />
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ComplianceChart
              chartType="bar"
              data={complianceByCategory}
              title="Compliance Rate by Category"
            />
            <ComplianceChart
              chartType="pie"
              data={requirementStatus}
              title="Requirement Status Distribution"
            />
          </div>

          {/* Recent Activity */}
          <div className="mb-8">
            <RecentActivity activities={activitiesData} />
          </div>
        </div>
      </main>
      {/* Quick Action Menu */}
      <QuickActionMenu
        onAnnotate={() => handleQuickAction('annotate')}
        onBookmark={() => handleQuickAction('bookmark')}
        onMapRequirement={() => handleQuickAction('map-requirement')}
        onSaveProgress={() => handleQuickAction('save-progress')}
        onExportSection={() => handleQuickAction('export-section')}
        onHighlight={() => handleQuickAction('highlight')}
      />
    </div>
  );
};

export default Dashboard;