import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ProjectContextBar from '../../components/ui/ProjectContextBar';
import QuickActionMenu from '../../components/ui/QuickActionMenu';
import DocumentViewer from './components/DocumentViewer';
import ComplianceChecklist from './components/ComplianceChecklist';
import DocumentToolbar from './components/DocumentToolbar';
import SplitPaneResizer from './components/SplitPaneResizer';

const DocumentComparison = () => {
  const [leftPaneWidth, setLeftPaneWidth] = useState(50);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSynced, setIsSynced] = useState(true);
  const [syncedScrollPosition, setSyncedScrollPosition] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState(null);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showAnnotations, setShowAnnotations] = useState(false);
  const [highlightMode, setHighlightMode] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isProcessingAnalysis, setIsProcessingAnalysis] = useState(false);

  // Mock document data
  const policyDocument = {
    id: 'policy-001',
    title: 'Healthcare Compliance Policy 2024',
    type: 'policy',
    uploadDate: '2025-01-03',
    content: `HEALTHCARE COMPLIANCE POLICY 2024

Section 1: Introduction
This policy establishes comprehensive healthcare compliance requirements for all system implementations.

Section 2: Security Requirements
2.1 Multi-factor Authentication
All systems must implement role-based access controls with multi-factor authentication for all user accounts. This includes mandatory two-factor authentication using approved methods.

2.2 Data Encryption Standards  
AES-256 encryption for data at rest and TLS 1.3 for data in transit must be implemented across all systems handling protected health information.

Section 3: Privacy Requirements
3.1 PHI Handling Procedures
Protected Health Information must follow minimum necessary standard for all access. Access logs must be maintained and reviewed regularly.

3.2 Breach Notification Requirements
Immediate containment within 1 hour and notification procedures must be established with clear escalation paths.

Section 4: Quality Assurance
4.1 Continuous Monitoring
Real-time system monitoring and alerting capabilities must be implemented with 24/7 coverage.

4.2 Documentation Requirements
All compliance activities must be documented with detailed audit trails and regular reviews.

Section 5: Training Requirements
5.1 Staff Training Requirements
Initial HIPAA training within 30 days and annual refresher training required for all personnel.

5.2 Ongoing Education Programs
Continuous education including security awareness and threat briefings must be provided quarterly.`
  };

  const programDocument = {
    id: 'program-001',
    title: 'Healthcare Management System Documentation',
    type: 'program',
    uploadDate: '2025-01-04',
    content: `HEALTHCARE MANAGEMENT SYSTEM DOCUMENTATION

System Overview
Our healthcare management system provides comprehensive patient data management with security features.

Authentication System
The system implements basic username/password authentication with optional SMS-based verification for administrative users.

Data Security
Patient data is encrypted using AES-128 encryption for database storage. API communications use HTTPS with TLS 1.2.

Access Controls
Role-based permissions are implemented with three user levels: Admin, Provider, and Read-only.

Monitoring Capabilities
System includes basic error logging and daily backup procedures. Manual monitoring reports are generated weekly.

Privacy Features
Patient access is logged and reviewed monthly. Data sharing requires approval through administrative interface.

Training Documentation
New user training materials are available online. Annual compliance training is recommended but not enforced.

Audit Features
System maintains basic access logs for 90 days. Compliance reports can be generated on demand.`
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e?.ctrlKey || e?.metaKey) {
        switch (e?.key) {
          case 's':
            e?.preventDefault();
            handleSaveProgress();
            break;
          case 'f':
            e?.preventDefault();
            setIsFullscreen(!isFullscreen);
            break;
          case 'b':
            e?.preventDefault();
            setShowBookmarks(!showBookmarks);
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isFullscreen, showBookmarks]);

  const handlePaneResize = (newLeftWidth) => {
    setLeftPaneWidth(newLeftWidth);
  };

  const handleLeftPaneScroll = (scrollTop) => {
    if (isSynced) {
      setSyncedScrollPosition(scrollTop);
    }
  };

  const handleRightPaneScroll = (scrollTop) => {
    if (isSynced) {
      setSyncedScrollPosition(scrollTop);
    }
  };

  const handleSyncToggle = (synced) => {
    setIsSynced(synced);
  };

  const handleRequirementClick = (requirement) => {
    setSelectedRequirement(requirement);
    // Auto-scroll to relevant section in documents
    console.log('Navigate to requirement:', requirement);
  };

  const handleStatusUpdate = (requirementId, newStatus) => {
    console.log('Update requirement status:', requirementId, newStatus);
  };

  const handleAddComment = (requirementId, comment) => {
    console.log('Add comment to requirement:', requirementId, comment);
  };

  const handleSaveProgress = () => {
    console.log('Saving progress...');
    // Show success notification
  };

  const handleExportReport = () => {
    console.log('Exporting compliance report...');
  };

  const handleBookmark = (bookmarkData) => {
    console.log('Adding bookmark:', bookmarkData);
  };

  const handleAnnotate = (annotationData) => {
    console.log('Adding annotation:', annotationData);
  };

  const handleHighlight = (highlightData) => {
    console.log('Adding highlight:', highlightData);
  };

  const handleMapRequirement = () => {
    console.log('Mapping requirement...');
  };

  const handleExportSection = () => {
    console.log('Exporting section...');
  };

  const handleAnalysisComplete = (result) => {
    setAnalysisResult(result);
    setIsProcessingAnalysis(false);
    
    // Update project context with analysis results
    console.log('Analysis completed:', result);
  };

  const handleStartAnalysis = () => {
    setIsProcessingAnalysis(true);
  };

  const rightPaneWidth = isSidebarCollapsed ? 100 - leftPaneWidth : 100 - leftPaneWidth - 20;
  const sidebarWidth = isSidebarCollapsed ? 3 : 20;

  // Update completion percentage based on analysis
  const completionPercentage = analysisResult?.completionPercentage || 68;
  const complianceStatus = isProcessingAnalysis ? 'Analyzing...' : analysisResult?.overallStatus ||'In Progress';

  return (
    <>
      <Helmet>
        <title>Document Comparison - ComplianceChecker</title>
        <meta name="description" content="Compare program documents against policy requirements with synchronized viewing and compliance tracking." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <ProjectContextBar
          projectName="Healthcare Compliance Review 2024"
          documentType="Policy vs Program Documentation"
          complianceStatus={complianceStatus}
          completionPercentage={completionPercentage}
          lastSaved={analysisResult ? 'Analysis completed' : '2 minutes ago'}
          onSave={handleSaveProgress}
          onExport={handleExportReport}
          onBookmark={() => setShowBookmarks(!showBookmarks)}
        />

        <main className="pt-32">
          <div className="px-4 lg:px-6 py-6">
            <Breadcrumb />
            
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Document Comparison
              </h1>
              <p className="text-muted-foreground">
                Compare policy requirements with program documentation to identify compliance gaps and track progress.
              </p>
            </div>

            {/* Document Toolbar */}
            <DocumentToolbar
              onSyncToggle={handleSyncToggle}
              isSynced={isSynced}
              onBookmarkView={setShowBookmarks}
              onAnnotationView={setShowAnnotations}
              onHighlightToggle={setHighlightMode}
              onExportReport={handleExportReport}
              onSaveProgress={handleSaveProgress}
              onFullscreen={() => setIsFullscreen(!isFullscreen)}
              isFullscreen={isFullscreen}
            />

            {/* Main Content Area */}
            <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-background pt-16' : 'relative'}`}>
              <div className="flex h-[calc(100vh-280px)] bg-card border border-border rounded-lg overflow-hidden">
                {/* Left Pane - Policy Document */}
                <div style={{ width: `${leftPaneWidth}%` }} className="relative">
                  <DocumentViewer
                    document={policyDocument}
                    title="Policy Document"
                    onSearch={(term) => console.log('Search policy:', term)}
                    onBookmark={handleBookmark}
                    onAnnotate={handleAnnotate}
                    onHighlight={handleHighlight}
                    syncedScrollPosition={isSynced ? syncedScrollPosition : null}
                    onScroll={handleLeftPaneScroll}
                    isLeftPane={true}
                  />
                </div>

                {/* Resizer */}
                <SplitPaneResizer
                  onResize={handlePaneResize}
                  initialLeftWidth={leftPaneWidth}
                  minWidth={25}
                  maxWidth={75}
                />

                {/* Right Pane - Program Document */}
                <div style={{ width: `${rightPaneWidth}%` }} className="relative">
                  <DocumentViewer
                    document={programDocument}
                    title="Program Document"
                    onSearch={(term) => console.log('Search program:', term)}
                    onBookmark={handleBookmark}
                    onAnnotate={handleAnnotate}
                    onHighlight={handleHighlight}
                    syncedScrollPosition={isSynced ? syncedScrollPosition : null}
                    onScroll={handleRightPaneScroll}
                    isLeftPane={false}
                  />
                </div>

                {/* Compliance Checklist Sidebar */}
                <div style={{ width: `${sidebarWidth}%` }} className="relative">
                  <ComplianceChecklist
                    policyDocument={policyDocument}
                    programDocument={programDocument}
                    onRequirementClick={handleRequirementClick}
                    onStatusUpdate={handleStatusUpdate}
                    onAddComment={handleAddComment}
                    isCollapsed={isSidebarCollapsed}
                    onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    onAnalysisComplete={handleAnalysisComplete}
                  />
                </div>
              </div>
            </div>

            {/* Mobile View - Tabbed Interface */}
            <div className="lg:hidden mt-6">
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="flex border-b border-border">
                  <button className="flex-1 px-4 py-3 text-sm font-medium bg-primary text-primary-foreground">
                    Policy Document
                  </button>
                  <button className="flex-1 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground">
                    Program Document
                  </button>
                  <button className="flex-1 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground">
                    Requirements
                  </button>
                </div>
                
                <div className="h-96">
                  <DocumentViewer
                    document={policyDocument}
                    title="Policy Document"
                    onSearch={(term) => console.log('Search policy:', term)}
                    onBookmark={handleBookmark}
                    onAnnotate={handleAnnotate}
                    onHighlight={handleHighlight}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Quick Action Menu */}
        <QuickActionMenu
          onAnnotate={handleAnnotate}
          onBookmark={handleBookmark}
          onMapRequirement={handleMapRequirement}
          onSaveProgress={handleSaveProgress}
          onExportSection={handleExportSection}
          onHighlight={handleHighlight}
        />
      </div>
    </>
  );
};

export default DocumentComparison;