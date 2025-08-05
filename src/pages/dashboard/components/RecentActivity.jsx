import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivity = ({ activities }) => {
  const navigate = useNavigate();

  const getActivityIcon = (type) => {
    const icons = {
      'document-upload': 'Upload',
      'analysis-complete': 'CheckCircle',
      'requirement-mapped': 'Link',
      'report-generated': 'FileText',
      'project-created': 'FolderPlus',
      'compliance-check': 'Shield',
      'annotation-added': 'MessageSquare',
      'deadline-approaching': 'Clock'
    };
    return icons?.[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colors = {
      'document-upload': 'text-primary',
      'analysis-complete': 'text-success',
      'requirement-mapped': 'text-accent',
      'report-generated': 'text-secondary',
      'project-created': 'text-primary',
      'compliance-check': 'text-warning',
      'annotation-added': 'text-muted-foreground',
      'deadline-approaching': 'text-error'
    };
    return colors?.[type] || 'text-muted-foreground';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return activityTime?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleActivityClick = (activity) => {
    switch (activity?.type) {
      case 'document-upload':
        navigate('/document-upload');
        break;
      case 'analysis-complete':
      case 'requirement-mapped': navigate('/document-comparison', { state: { projectId: activity?.projectId } });
        break;
      case 'report-generated': navigate('/compliance-report', { state: { reportId: activity?.reportId } });
        break;
      case 'project-created': navigate('/project-management', { state: { projectId: activity?.projectId } });
        break;
      default:
        navigate('/dashboard');
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-professional">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/project-management')}
          >
            <span className="text-sm">View All</span>
            <Icon name="ChevronRight" size={14} className="ml-1" />
          </Button>
        </div>
      </div>
      <div className="p-4">
        {activities?.length > 0 ? (
          <div className="space-y-4">
            {activities?.slice(0, 8)?.map((activity) => (
              <div 
                key={activity?.id}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-professional cursor-pointer"
                onClick={() => handleActivityClick(activity)}
              >
                <div className={`p-2 rounded-full bg-muted/50 ${getActivityColor(activity?.type)}`}>
                  <Icon name={getActivityIcon(activity?.type)} size={16} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground">{activity?.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{activity?.description}</p>
                      {activity?.projectName && (
                        <div className="flex items-center mt-2">
                          <Icon name="FolderOpen" size={12} className="text-muted-foreground mr-1" />
                          <span className="text-xs text-muted-foreground">{activity?.projectName}</span>
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                      {formatTimeAgo(activity?.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Icon name="Activity" size={32} className="mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No recent activity</p>
            <p className="text-xs text-muted-foreground mt-1">
              Start by uploading documents or creating a new project
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;