import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { processDocumentAnalysis, getComplianceStats, validateDocument, formatRequirementsForAnalysis } from '../../../utils/documentProcessor';

const ComplianceChecklist = ({ 
  policyDocument,
  programDocument,
  onRequirementClick, 
  onStatusUpdate, 
  onAddComment,
  isCollapsed,
  onToggleCollapse,
  onAnalysisComplete
}) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequirement, setSelectedRequirement] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [requirements, setRequirements] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState(null);
  const [lastAnalysis, setLastAnalysis] = useState(null);

  // Base requirements template
  const baseRequirements = [
    {
      id: 'req-001',
      category: 'security',
      title: 'Multi-factor Authentication',
      description: 'All systems must implement role-based access controls with multi-factor authentication for all user accounts.',
      status: 'pending',
      priority: 'high',
      section: 'Section 2.1',
      comments: []
    },
    {
      id: 'req-002',
      category: 'security',
      title: 'Data Encryption Standards',
      description: 'AES-256 encryption for data at rest and TLS 1.3 for data in transit must be implemented.',
      status: 'pending',
      priority: 'critical',
      section: 'Section 2.2',
      comments: []
    },
    {
      id: 'req-003',
      category: 'privacy',
      title: 'PHI Handling Procedures',
      description: 'Protected Health Information must follow minimum necessary standard for all access.',
      status: 'pending',
      priority: 'high',
      section: 'Section 3.1',
      comments: []
    },
    {
      id: 'req-004',
      category: 'privacy',
      title: 'Breach Notification Requirements',
      description: 'Immediate containment within 1 hour and notification procedures must be established.',
      status: 'pending',
      priority: 'high',
      section: 'Section 3.2',
      comments: []
    },
    {
      id: 'req-005',
      category: 'quality',
      title: 'Continuous Monitoring',
      description: 'Real-time system monitoring and alerting capabilities must be implemented.',
      status: 'pending',
      priority: 'medium',
      section: 'Section 4.1',
      comments: []
    },
    {
      id: 'req-006',
      category: 'quality',
      title: 'Documentation Requirements',
      description: 'All compliance activities must be documented with detailed audit trails.',
      status: 'pending',
      priority: 'medium',
      section: 'Section 4.2',
      comments: []
    },
    {
      id: 'req-007',
      category: 'training',
      title: 'Staff Training Requirements',
      description: 'Initial HIPAA training within 30 days and annual refresher training required.',
      status: 'pending',
      priority: 'medium',
      section: 'Section 5.1',
      comments: []
    },
    {
      id: 'req-008',
      category: 'training',
      title: 'Ongoing Education Programs',
      description: 'Continuous education including security awareness and threat briefings.',
      status: 'pending',
      priority: 'low',
      section: 'Section 5.2',
      comments: []
    }
  ];

  useEffect(() => {
    // Initialize with base requirements
    setRequirements(baseRequirements);
  }, []);

  useEffect(() => {
    // Auto-analyze when both documents are available
    if (policyDocument && programDocument && !isAnalyzing && !lastAnalysis) {
      handleAnalyzeCompliance();
    }
  }, [policyDocument, programDocument]);

  const categories = [
    { id: 'all', label: 'All Requirements', count: requirements?.length },
    { id: 'security', label: 'Security', count: requirements?.filter(r => r?.category === 'security')?.length },
    { id: 'privacy', label: 'Privacy', count: requirements?.filter(r => r?.category === 'privacy')?.length },
    { id: 'quality', label: 'Quality', count: requirements?.filter(r => r?.category === 'quality')?.length },
    { id: 'training', label: 'Training', count: requirements?.filter(r => r?.category === 'training')?.length }
  ];

  const handleAnalyzeCompliance = async () => {
    if (!policyDocument || !programDocument) {
      setAnalysisError('Both policy and program documents are required for analysis.');
      return;
    }

    if (!validateDocument(policyDocument) || !validateDocument(programDocument)) {
      setAnalysisError('Documents must contain valid content for analysis.');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisError(null);

    try {
      const formattedRequirements = formatRequirementsForAnalysis(requirements);
      
      const analysisResult = await processDocumentAnalysis(
        policyDocument,
        programDocument,
        formattedRequirements
      );

      setRequirements(analysisResult?.requirements || requirements);
      setLastAnalysis(analysisResult);
      
      if (onAnalysisComplete) {
        onAnalysisComplete(analysisResult);
      }
    } catch (error) {
      console.error('Analysis failed:', error);
      setAnalysisError(error?.message || 'Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'compliant':
        return { icon: 'CheckCircle', color: 'text-success' };
      case 'non-compliant':
        return { icon: 'XCircle', color: 'text-error' };
      case 'partial':
        return { icon: 'AlertCircle', color: 'text-warning' };
      case 'pending':
        return { icon: 'Clock', color: 'text-muted-foreground' };
      default:
        return { icon: 'Circle', color: 'text-muted-foreground' };
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'bg-error text-error-foreground';
      case 'high':
        return 'bg-warning text-warning-foreground';
      case 'medium':
        return 'bg-secondary text-secondary-foreground';
      case 'low':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const filteredRequirements = requirements?.filter(req => {
    const matchesCategory = activeCategory === 'all' || req?.category === activeCategory;
    const matchesSearch = req?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         req?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleRequirementClick = (requirement) => {
    setSelectedRequirement(requirement);
    if (onRequirementClick) {
      onRequirementClick(requirement);
    }
  };

  const handleStatusChange = (requirementId, newStatus) => {
    setRequirements(prev => prev?.map(req => 
      req?.id === requirementId ? { ...req, status: newStatus } : req
    ));
    
    if (onStatusUpdate) {
      onStatusUpdate(requirementId, newStatus);
    }
  };

  const handleAddComment = (requirementId) => {
    if (commentText?.trim()) {
      const newComment = {
        id: Date.now(),
        author: 'Current User',
        text: commentText?.trim(),
        timestamp: new Date()?.toISOString()
      };

      setRequirements(prev => prev?.map(req => 
        req?.id === requirementId 
          ? { ...req, comments: [...(req?.comments || []), newComment] }
          : req
      ));

      if (onAddComment) {
        onAddComment(requirementId, commentText?.trim());
      }
      
      setCommentText('');
    }
  };

  const stats = getComplianceStats(requirements);

  if (isCollapsed) {
    return (
      <div className="w-12 h-full bg-card border-l border-border flex flex-col items-center py-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="mb-4"
        >
          <Icon name="ChevronLeft" size={20} />
        </Button>
        
        {isAnalyzing && (
          <div className="w-8 h-8 mb-4 flex items-center justify-center">
            <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full" />
          </div>
        )}
        
        <div className="flex flex-col space-y-2">
          <div className="w-2 h-8 bg-success rounded-full" title="Compliant" />
          <div className="w-2 h-6 bg-error rounded-full" title="Non-compliant" />
          <div className="w-2 h-4 bg-warning rounded-full" title="Partial" />
          <div className="w-2 h-3 bg-muted rounded-full" title="Pending" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 h-full bg-card border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Compliance Checklist</h3>
          <div className="flex items-center space-x-2">
            {isAnalyzing && (
              <div className="w-4 h-4 animate-spin border-2 border-primary border-t-transparent rounded-full" />
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
            >
              <Icon name="ChevronRight" size={20} />
            </Button>
          </div>
        </div>

        {/* Analysis Controls */}
        <div className="mb-4">
          <Button
            onClick={handleAnalyzeCompliance}
            disabled={isAnalyzing || !policyDocument || !programDocument}
            className="w-full mb-2"
            size="sm"
          >
            {isAnalyzing ? (
              <>
                <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Icon name="Brain" size={16} className="mr-2" />
                {lastAnalysis ? 'Re-analyze' : 'Analyze Compliance'}
              </>
            )}
          </Button>
          
          {analysisError && (
            <div className="text-xs text-error bg-error/10 p-2 rounded-md">
              {analysisError}
            </div>
          )}
          
          {lastAnalysis && (
            <div className="text-xs text-muted-foreground">
              Last analyzed: {new Date(lastAnalysis?.analysisTimestamp)?.toLocaleTimeString()}
            </div>
          )}
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="text-center p-2 bg-success/10 rounded-md">
            <div className="text-lg font-bold text-success">{stats?.compliant}%</div>
            <div className="text-xs text-muted-foreground">Compliant</div>
          </div>
          <div className="text-center p-2 bg-error/10 rounded-md">
            <div className="text-lg font-bold text-error">{stats?.nonCompliant}%</div>
            <div className="text-xs text-muted-foreground">Non-compliant</div>
          </div>
        </div>

        {/* Search */}
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
            className="w-full pl-10 pr-4 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
      {/* Categories */}
      <div className="p-4 border-b border-border">
        <div className="space-y-1">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setActiveCategory(category?.id)}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-professional ${
                activeCategory === category?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <span>{category?.label}</span>
              <span className="text-xs">{category?.count}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Requirements List */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 space-y-3">
          {filteredRequirements?.map((requirement) => {
            const statusInfo = getStatusIcon(requirement?.status);
            
            return (
              <div
                key={requirement?.id}
                className={`p-3 border border-border rounded-lg cursor-pointer transition-professional hover:shadow-professional ${
                  selectedRequirement?.id === requirement?.id ? 'ring-2 ring-ring' : ''
                }`}
                onClick={() => handleRequirementClick(requirement)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={statusInfo?.icon} 
                      size={16} 
                      className={statusInfo?.color} 
                    />
                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(requirement?.priority)}`}>
                      {requirement?.priority}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">{requirement?.section}</span>
                </div>
                <h4 className="font-medium text-foreground mb-1 text-sm">
                  {requirement?.title}
                </h4>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                  {requirement?.description}
                </p>
                
                {requirement?.evidence && (
                  <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded mb-2">
                    <strong>AI Analysis:</strong> {requirement?.evidence}
                  </div>
                )}
                
                {requirement?.confidence && (
                  <div className="text-xs text-muted-foreground mb-2">
                    Confidence: {Math.round(requirement?.confidence * 100)}%
                  </div>
                )}
                
                {requirement?.comments?.length > 0 && (
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Icon name="MessageSquare" size={12} />
                    <span>{requirement?.comments?.length} comment{requirement?.comments?.length !== 1 ? 's' : ''}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Selected Requirement Details */}
      {selectedRequirement && (
        <div className="border-t border-border p-4 bg-muted/30">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-foreground text-sm">Quick Actions</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedRequirement(null)}
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-muted-foreground">Status:</span>
              <select
                value={selectedRequirement?.status}
                onChange={(e) => handleStatusChange(selectedRequirement?.id, e?.target?.value)}
                className="text-xs bg-background border border-border rounded px-2 py-1"
              >
                <option value="pending">Pending</option>
                <option value="partial">Partial</option>
                <option value="compliant">Compliant</option>
                <option value="non-compliant">Non-compliant</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <textarea
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e?.target?.value)}
                className="w-full text-xs bg-background border border-border rounded px-2 py-1 resize-none"
                rows={2}
              />
              <Button
                size="sm"
                onClick={() => handleAddComment(selectedRequirement?.id)}
                disabled={!commentText?.trim()}
                className="w-full"
              >
                Add Comment
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplianceChecklist;