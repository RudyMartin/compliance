import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentViewer = ({ 
  document, 
  title, 
  onSearch, 
  onBookmark, 
  onAnnotate,
  onHighlight,
  syncedScrollPosition,
  onScroll,
  isLeftPane = true
}) => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const viewerRef = useRef(null);
  const contentRef = useRef(null);

  // Mock document content for demonstration
  const mockContent = document?.content || `
    SECTION 1: INTRODUCTION
    
    This document outlines the comprehensive policy requirements for healthcare compliance management systems. All program implementations must adhere to the following standards and procedures to ensure regulatory compliance and operational excellence.
    
    1.1 PURPOSE AND SCOPE
    The purpose of this policy is to establish clear guidelines for healthcare data management, patient privacy protection, and regulatory reporting requirements. This policy applies to all healthcare facilities, staff members, and third-party vendors who handle protected health information (PHI).
    
    1.2 REGULATORY FRAMEWORK
    This policy is designed to ensure compliance with:
    - Health Insurance Portability and Accountability Act (HIPAA)
    - Health Information Technology for Economic and Clinical Health (HITECH) Act
    - Food and Drug Administration (FDA) regulations
    - Centers for Medicare & Medicaid Services (CMS) requirements
    
    SECTION 2: DATA SECURITY REQUIREMENTS
    
    2.1 ACCESS CONTROLS
    All systems must implement role-based access controls (RBAC) with the following minimum requirements:
    - Multi-factor authentication for all user accounts
    - Regular password updates every 90 days
    - Automatic session timeout after 15 minutes of inactivity
    - Audit logging of all access attempts and data modifications
    
    2.2 ENCRYPTION STANDARDS
    Data encryption requirements include:
    - AES-256 encryption for data at rest
    - TLS 1.3 for data in transit
    - End-to-end encryption for sensitive communications
    - Secure key management with regular rotation
    
    SECTION 3: PATIENT PRIVACY PROTECTION
    
    3.1 PHI HANDLING PROCEDURES
    Protected Health Information must be handled according to these procedures:
    - Minimum necessary standard for all PHI access
    - Written authorization required for non-routine disclosures
    - Business Associate Agreements (BAAs) for all third-party vendors
    - Regular privacy impact assessments
    
    3.2 BREACH NOTIFICATION REQUIREMENTS
    In the event of a data breach:
    - Immediate containment and assessment within 1 hour
    - Notification to privacy officer within 4 hours
    - Patient notification within 60 days if required
    - Regulatory reporting within 72 hours
    
    SECTION 4: QUALITY ASSURANCE
    
    4.1 MONITORING AND AUDITING
    Continuous monitoring requirements include:
    - Real-time system monitoring and alerting
    - Monthly security assessments
    - Quarterly compliance audits
    - Annual third-party security evaluations
    
    4.2 DOCUMENTATION REQUIREMENTS
    All compliance activities must be documented with:
    - Detailed audit trails and logs
    - Regular compliance reports
    - Risk assessment documentation
    - Training records and certifications
    
    SECTION 5: TRAINING AND AWARENESS
    
    5.1 STAFF TRAINING REQUIREMENTS
    All personnel must complete:
    - Initial HIPAA training within 30 days of employment
    - Annual refresher training
    - Role-specific security training
    - Incident response training
    
    5.2 ONGOING EDUCATION
    Continuous education programs must include:
    - Regular security awareness updates
    - Emerging threat briefings
    - Best practice sharing sessions
    - Compliance update communications
  `;

  const totalPages = Math.ceil(mockContent?.length / 2000); // Simulate pages

  useEffect(() => {
    if (syncedScrollPosition && contentRef?.current) {
      contentRef.current.scrollTop = syncedScrollPosition;
    }
  }, [syncedScrollPosition]);

  const handleScroll = (e) => {
    if (onScroll) {
      onScroll(e?.target?.scrollTop);
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50));
  };

  const handleResetZoom = () => {
    setZoomLevel(100);
  };

  const handleSearch = (e) => {
    e?.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const text = selection?.toString()?.trim();
    if (text) {
      setSelectedText(text);
    }
  };

  const handleBookmark = () => {
    if (onBookmark) {
      onBookmark({
        page: currentPage,
        text: selectedText,
        position: contentRef?.current?.scrollTop || 0
      });
    }
  };

  const handleAnnotate = () => {
    if (onAnnotate) {
      onAnnotate({
        page: currentPage,
        text: selectedText,
        position: contentRef?.current?.scrollTop || 0
      });
    }
  };

  const handleHighlight = () => {
    if (onHighlight) {
      onHighlight({
        page: currentPage,
        text: selectedText,
        position: contentRef?.current?.scrollTop || 0
      });
    }
  };

  return (
    <div className="flex flex-col h-full bg-card border border-border rounded-lg overflow-hidden">
      {/* Document Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          <Icon name="FileText" size={20} className="text-primary flex-shrink-0" />
          <div className="min-w-0">
            <h3 className="font-semibold text-foreground truncate">{title}</h3>
            <p className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSearchVisible(!isSearchVisible)}
            className="hidden sm:flex"
          >
            <Icon name="Search" size={16} />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBookmark}
            disabled={!selectedText}
          >
            <Icon name="Bookmark" size={16} />
          </Button>
        </div>
      </div>
      {/* Search Bar */}
      {isSearchVisible && (
        <div className="p-3 border-b border-border bg-muted/20">
          <form onSubmit={handleSearch} className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Icon 
                name="Search" 
                size={16} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <input
                type="text"
                placeholder="Search in document..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e?.target?.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <Button type="submit" size="sm">
              Find
            </Button>
          </form>
        </div>
      )}
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border-b border-border bg-muted/20">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <Icon name="ChevronLeft" size={16} />
          </Button>
          
          <span className="text-sm text-muted-foreground px-2">
            {currentPage} / {totalPages}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <Icon name="ChevronRight" size={16} />
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomOut}
            disabled={zoomLevel <= 50}
          >
            <Icon name="ZoomOut" size={16} />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleResetZoom}
            className="min-w-16"
          >
            {zoomLevel}%
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomIn}
            disabled={zoomLevel >= 200}
          >
            <Icon name="ZoomIn" size={16} />
          </Button>
        </div>
      </div>
      {/* Document Content */}
      <div 
        ref={contentRef}
        className="flex-1 overflow-auto p-6 bg-background"
        onScroll={handleScroll}
        onMouseUp={handleTextSelection}
      >
        <div 
          ref={viewerRef}
          className="prose prose-sm max-w-none"
          style={{ 
            fontSize: `${zoomLevel}%`,
            lineHeight: '1.6'
          }}
        >
          <div className="whitespace-pre-wrap text-foreground">
            {mockContent}
          </div>
        </div>
      </div>
      {/* Selection Actions */}
      {selectedText && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-popover border border-border rounded-lg shadow-document p-2">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleAnnotate}
            >
              <Icon name="MessageSquare" size={16} />
              <span className="ml-1 hidden sm:inline">Annotate</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleHighlight}
            >
              <Icon name="Highlighter" size={16} />
              <span className="ml-1 hidden sm:inline">Highlight</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedText('')}
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentViewer;