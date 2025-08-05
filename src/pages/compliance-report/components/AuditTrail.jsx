import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AuditTrail = ({ auditData }) => {
  const [expandedItems, setExpandedItems] = useState([]);
  const [filterType, setFilterType] = useState('all');

  const toggleExpanded = (itemId) => {
    setExpandedItems(prev => 
      prev?.includes(itemId) 
        ? prev?.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getActionIcon = (action) => {
    const icons = {
      'review': 'Eye',
      'approve': 'CheckCircle',
      'reject': 'XCircle',
      'comment': 'MessageSquare',
      'edit': 'Edit',
      'export': 'Download',
      'create': 'Plus',
      'delete': 'Trash2'
    };
    return icons?.[action?.toLowerCase()] || 'Activity';
  };

  const getActionColor = (action) => {
    const colors = {
      'approve': 'text-success',
      'reject': 'text-error',
      'review': 'text-primary',
      'comment': 'text-warning',
      'edit': 'text-secondary',
      'export': 'text-accent',
      'create': 'text-success',
      'delete': 'text-error'
    };
    return colors?.[action?.toLowerCase()] || 'text-muted-foreground';
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      return date?.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const filteredData = auditData?.filter(item => {
    if (filterType === 'all') return true;
    return item?.action?.toLowerCase() === filterType;
  });

  const actionTypes = [...new Set(auditData.map(item => item.action))];

  return (
    <div className="bg-card border border-border rounded-lg shadow-professional">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon name="History" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Audit Trail
              </h3>
              <p className="text-sm text-muted-foreground">
                Complete history of compliance review activities
              </p>
            </div>
          </div>
          
          <Button variant="outline" size="sm">
            <Icon name="Download" size={16} />
            <span className="ml-2">Export Trail</span>
          </Button>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-2">
          <Button
            variant={filterType === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterType('all')}
          >
            All Activities
          </Button>
          {actionTypes?.map(action => (
            <Button
              key={action}
              variant={filterType === action?.toLowerCase() ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterType(action?.toLowerCase())}
            >
              {action}
            </Button>
          ))}
        </div>
      </div>
      {/* Audit Items */}
      <div className="p-6">
        <div className="space-y-4">
          {filteredData?.map((item) => {
            const isExpanded = expandedItems?.includes(item?.id);
            const actionIcon = getActionIcon(item?.action);
            const actionColor = getActionColor(item?.action);

            return (
              <div key={item?.id} className="border border-border rounded-lg">
                {/* Main Item */}
                <div 
                  className="p-4 cursor-pointer hover:bg-muted/30 transition-professional"
                  onClick={() => toggleExpanded(item?.id)}
                >
                  <div className="flex items-start space-x-4">
                    {/* Timeline Indicator */}
                    <div className="flex flex-col items-center">
                      <div className={`p-2 rounded-full bg-card border-2 ${actionColor?.replace('text-', 'border-')}`}>
                        <Icon name={actionIcon} size={16} className={actionColor} />
                      </div>
                      {filteredData?.indexOf(item) < filteredData?.length - 1 && (
                        <div className="w-px h-8 bg-border mt-2" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-sm font-medium text-foreground">
                            {item?.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {item?.description}
                          </p>
                        </div>
                        <Icon 
                          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                          size={16} 
                          className="text-muted-foreground flex-shrink-0 ml-4" 
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium text-secondary-foreground">
                                {item?.user?.charAt(0)}
                              </span>
                            </div>
                            <span>{item?.user}</span>
                          </div>
                          <span>•</span>
                          <span>{formatTimestamp(item?.timestamp)}</span>
                          {item?.requirementId && (
                            <>
                              <span>•</span>
                              <span>REQ-{item?.requirementId}</span>
                            </>
                          )}
                        </div>
                        
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item?.action === 'approve' ? 'bg-success/10 text-success' :
                          item?.action === 'reject'? 'bg-error/10 text-error' : 'bg-primary/10 text-primary'
                        }`}>
                          {item?.action}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-border p-4 bg-muted/20">
                    <div className="space-y-4">
                      {/* Detailed Information */}
                      {item?.details && (
                        <div>
                          <h5 className="text-sm font-medium text-foreground mb-2">
                            Details:
                          </h5>
                          <p className="text-sm text-muted-foreground">
                            {item?.details}
                          </p>
                        </div>
                      )}

                      {/* Changes Made */}
                      {item?.changes && item?.changes?.length > 0 && (
                        <div>
                          <h5 className="text-sm font-medium text-foreground mb-2">
                            Changes Made:
                          </h5>
                          <ul className="space-y-1">
                            {item?.changes?.map((change, index) => (
                              <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                                <Icon name="ArrowRight" size={12} className="mt-1 flex-shrink-0" />
                                <span>{change}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Comments */}
                      {item?.comments && (
                        <div>
                          <h5 className="text-sm font-medium text-foreground mb-2">
                            Comments:
                          </h5>
                          <div className="bg-card border border-border rounded-lg p-3">
                            <p className="text-sm text-foreground">
                              "{item?.comments}"
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Metadata */}
                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>Session ID: {item?.sessionId}</span>
                          <span>IP: {item?.ipAddress}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Icon name="Copy" size={14} />
                            <span className="ml-1">Copy ID</span>
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Icon name="ExternalLink" size={14} />
                            <span className="ml-1">View Context</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredData?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="History" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No audit trail found
            </h3>
            <p className="text-sm text-muted-foreground">
              No activities match the selected filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditTrail;