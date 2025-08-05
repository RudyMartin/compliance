import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivity = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'created':
        return 'Plus';
      case 'updated':
        return 'Edit';
      case 'completed':
        return 'CheckCircle';
      case 'commented':
        return 'MessageSquare';
      case 'uploaded':
        return 'Upload';
      case 'exported':
        return 'Download';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'created':
        return 'text-primary bg-primary/10';
      case 'updated':
        return 'text-warning bg-warning/10';
      case 'completed':
        return 'text-success bg-success/10';
      case 'commented':
        return 'text-accent bg-accent/10';
      case 'uploaded':
        return 'text-secondary bg-secondary/10';
      case 'exported':
        return 'text-muted-foreground bg-muted';
      default:
        return 'text-muted-foreground bg-muted';
    }
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
    
    return activityTime?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-professional">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <button className="text-sm text-primary hover:text-primary/80 transition-professional">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-3 group">
            <div className={`flex-shrink-0 p-2 rounded-lg ${getActivityColor(activity?.type)}`}>
              <Icon name={getActivityIcon(activity?.type)} size={16} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{activity?.user}</span>
                    {' '}
                    <span className="text-muted-foreground">{activity?.action}</span>
                    {' '}
                    <span className="font-medium text-primary hover:underline cursor-pointer">
                      {activity?.target}
                    </span>
                  </p>
                  {activity?.details && (
                    <p className="text-xs text-muted-foreground">{activity?.details}</p>
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
      {activities?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Activity" size={48} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">No recent activity</p>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;