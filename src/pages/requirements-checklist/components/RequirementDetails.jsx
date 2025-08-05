import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RequirementDetails = ({ 
  requirement, 
  onClose, 
  onStatusChange, 
  onNotesChange,
  onAttachEvidence,
  onAddComment
}) => {
  const [newComment, setNewComment] = useState("");
  const [localNotes, setLocalNotes] = useState(requirement?.notes || "");

  if (!requirement) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-professional p-6">
        <div className="text-center text-muted-foreground">
          <Icon name="FileSearch" size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-sm">Select a requirement to view details</p>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'in-progress': return 'Clock';
      case 'pending': return 'Circle';
      case 'failed': return 'XCircle';
      default: return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success/10';
      case 'in-progress': return 'text-warning bg-warning/10';
      case 'pending': return 'text-muted-foreground bg-muted';
      case 'failed': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-error';
      case 'medium': return 'bg-warning';
      case 'low': return 'bg-success';
      default: return 'bg-muted-foreground';
    }
  };

  const handleNotesBlur = () => {
    if (localNotes !== requirement?.notes) {
      onNotesChange(requirement?.id, localNotes);
    }
  };

  const handleAddComment = () => {
    if (newComment?.trim()) {
      onAddComment(requirement?.id, newComment?.trim());
      setNewComment("");
    }
  };

  const mockComments = [
    {
      id: 1,
      author: "Sarah Johnson",
      content: "Reviewed the policy document. This requirement needs additional clarification on the implementation timeline.",
      timestamp: new Date(Date.now() - 3600000),
      avatar: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      id: 2,
      author: "Mike Chen",
      content: "Added supporting evidence from the technical specifications document.",
      timestamp: new Date(Date.now() - 7200000),
      avatar: "https://randomuser.me/api/portraits/men/45.jpg"
    }
  ];

  const mockEvidenceFiles = [
    {
      id: 1,
      name: "Technical_Specifications_v2.pdf",
      size: "2.4 MB",
      uploadedBy: "Mike Chen",
      uploadedAt: new Date(Date.now() - 86400000)
    },
    {
      id: 2,
      name: "Compliance_Matrix.xlsx",
      size: "1.8 MB",
      uploadedBy: "Sarah Johnson",
      uploadedAt: new Date(Date.now() - 172800000)
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-professional">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-1 h-8 rounded-full ${getPriorityColor(requirement?.priority)}`} />
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                REQ-{requirement?.id?.toString()?.padStart(3, '0')}
              </h3>
              <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(requirement?.status)}`}>
                <Icon name={getStatusIcon(requirement?.status)} size={12} />
                <span className="capitalize">{requirement?.status?.replace('-', ' ')}</span>
              </div>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
          >
            <Icon name="X" size={16} />
          </Button>
        </div>
      </div>
      <div className="p-4 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
        {/* Requirement Info */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2">{requirement?.title}</h4>
          <p className="text-xs text-muted-foreground leading-relaxed mb-4">
            {requirement?.fullDescription}
          </p>
          
          <div className="space-y-2 text-xs">
            <div className="flex items-center space-x-2">
              <Icon name="Tag" size={14} className="text-muted-foreground" />
              <span className="text-muted-foreground">Category:</span>
              <span className="text-foreground">{requirement?.category}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="FileText" size={14} className="text-muted-foreground" />
              <span className="text-muted-foreground">Source:</span>
              <span className="text-foreground">{requirement?.sourceDocument}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="Hash" size={14} className="text-muted-foreground" />
              <span className="text-muted-foreground">Section:</span>
              <span className="text-foreground">{requirement?.sourceSection}</span>
            </div>

            {requirement?.assignee && (
              <div className="flex items-center space-x-2">
                <Icon name="User" size={14} className="text-muted-foreground" />
                <span className="text-muted-foreground">Assigned to:</span>
                <span className="text-foreground">{requirement?.assignee}</span>
              </div>
            )}

            {requirement?.dueDate && (
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={14} className="text-muted-foreground" />
                <span className="text-muted-foreground">Due Date:</span>
                <span className="text-foreground">
                  {new Date(requirement.dueDate)?.toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Status Actions */}
        <div>
          <h5 className="text-xs font-medium text-foreground mb-3">Compliance Status</h5>
          <div className="flex items-center space-x-2">
            <Button
              variant={requirement?.status === 'completed' ? 'success' : 'outline'}
              size="sm"
              onClick={() => onStatusChange(requirement?.id, 'completed')}
              className="text-xs"
            >
              <Icon name="Check" size={14} />
              <span className="ml-1">Pass</span>
            </Button>
            
            <Button
              variant={requirement?.status === 'in-progress' ? 'warning' : 'outline'}
              size="sm"
              onClick={() => onStatusChange(requirement?.id, 'in-progress')}
              className="text-xs"
            >
              <Icon name="Clock" size={14} />
              <span className="ml-1">In Progress</span>
            </Button>
            
            <Button
              variant={requirement?.status === 'failed' ? 'destructive' : 'outline'}
              size="sm"
              onClick={() => onStatusChange(requirement?.id, 'failed')}
              className="text-xs"
            >
              <Icon name="X" size={14} />
              <span className="ml-1">Fail</span>
            </Button>
          </div>
        </div>

        {/* Notes */}
        <div>
          <Input
            label="Compliance Notes"
            type="text"
            placeholder="Add notes about compliance status, implementation details, or concerns..."
            value={localNotes}
            onChange={(e) => setLocalNotes(e?.target?.value)}
            onBlur={handleNotesBlur}
            description="Document your compliance assessment and any relevant details"
          />
        </div>

        {/* Evidence Files */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h5 className="text-xs font-medium text-foreground">Evidence Files</h5>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAttachEvidence(requirement?.id)}
              className="text-xs"
            >
              <Icon name="Plus" size={12} />
              <span className="ml-1">Add Evidence</span>
            </Button>
          </div>
          
          <div className="space-y-2">
            {mockEvidenceFiles?.map((file) => (
              <div key={file?.id} className="flex items-center space-x-3 p-2 bg-muted rounded-md">
                <Icon name="Paperclip" size={14} className="text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{file?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {file?.size} • Uploaded by {file?.uploadedBy} • {file?.uploadedAt?.toLocaleDateString()}
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  <Icon name="Download" size={12} />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Comments */}
        <div>
          <h5 className="text-xs font-medium text-foreground mb-3">Comments</h5>
          
          {/* Add Comment */}
          <div className="mb-4">
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e?.target?.value)}
                className="flex-1"
              />
              <Button
                variant="default"
                size="sm"
                onClick={handleAddComment}
                disabled={!newComment?.trim()}
              >
                <Icon name="Send" size={14} />
              </Button>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-3">
            {mockComments?.map((comment) => (
              <div key={comment?.id} className="flex space-x-3">
                <img
                  src={comment?.avatar}
                  alt={comment?.author}
                  className="w-6 h-6 rounded-full flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-medium text-foreground">{comment?.author}</span>
                    <span className="text-xs text-muted-foreground">
                      {comment?.timestamp?.toLocaleDateString()} at {comment?.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{comment?.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequirementDetails;