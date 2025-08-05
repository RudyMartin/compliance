import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProgressOverview = ({ 
  totalRequirements, 
  completedRequirements, 
  inProgressRequirements,
  failedRequirements,
  categoryProgress,
  onExportReport,
  onGenerateReport
}) => {
  const completionPercentage = totalRequirements > 0 
    ? Math.round((completedRequirements / totalRequirements) * 100) 
    : 0;

  const pendingRequirements = totalRequirements - completedRequirements - inProgressRequirements - failedRequirements;

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-error';
  };

  const getProgressBgColor = (percentage) => {
    if (percentage >= 80) return 'bg-success';
    if (percentage >= 60) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="space-y-4">
      {/* Overall Progress */}
      <div className="bg-card border border-border rounded-lg shadow-professional p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground">Overall Progress</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onExportReport}
              className="text-xs"
            >
              <Icon name="Download" size={12} />
              <span className="ml-1">Export</span>
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={onGenerateReport}
              className="text-xs"
            >
              <Icon name="FileText" size={12} />
              <span className="ml-1">Report</span>
            </Button>
          </div>
        </div>

        {/* Progress Circle */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative w-16 h-16">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                className="text-muted"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray={`${completionPercentage * 1.76} 176`}
                className={getProgressColor(completionPercentage)}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-sm font-semibold ${getProgressColor(completionPercentage)}`}>
                {completionPercentage}%
              </span>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full" />
                <span className="text-muted-foreground">Completed:</span>
                <span className="font-medium text-foreground">{completedRequirements}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-warning rounded-full" />
                <span className="text-muted-foreground">In Progress:</span>
                <span className="font-medium text-foreground">{inProgressRequirements}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-muted-foreground rounded-full" />
                <span className="text-muted-foreground">Pending:</span>
                <span className="font-medium text-foreground">{pendingRequirements}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-error rounded-full" />
                <span className="text-muted-foreground">Failed:</span>
                <span className="font-medium text-foreground">{failedRequirements}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${getProgressBgColor(completionPercentage)}`}
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>
      {/* Category Progress */}
      <div className="bg-card border border-border rounded-lg shadow-professional p-4">
        <h3 className="text-sm font-semibold text-foreground mb-4">Progress by Category</h3>
        
        <div className="space-y-3">
          {categoryProgress?.map((category) => {
            const categoryPercentage = category?.total > 0 
              ? Math.round((category?.completed / category?.total) * 100) 
              : 0;
            
            return (
              <div key={category?.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name={category?.icon} size={14} className="text-muted-foreground" />
                    <span className="text-xs font-medium text-foreground">{category?.name}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="text-muted-foreground">
                      {category?.completed}/{category?.total}
                    </span>
                    <span className={`font-medium ${getProgressColor(categoryPercentage)}`}>
                      {categoryPercentage}%
                    </span>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${getProgressBgColor(categoryPercentage)}`}
                    style={{ width: `${categoryPercentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card border border-border rounded-lg shadow-professional p-3">
          <div className="flex items-center space-x-2">
            <Icon name="Target" size={16} className="text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Compliance Rate</p>
              <p className={`text-sm font-semibold ${getProgressColor(completionPercentage)}`}>
                {completionPercentage}%
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-lg shadow-professional p-3">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-error" />
            <div>
              <p className="text-xs text-muted-foreground">Failed Items</p>
              <p className="text-sm font-semibold text-error">{failedRequirements}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-lg shadow-professional p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Recent Activity</h3>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-xs">
            <Icon name="CheckCircle" size={12} className="text-success" />
            <span className="text-muted-foreground">REQ-045 marked as completed</span>
            <span className="text-muted-foreground">• 2 min ago</span>
          </div>
          
          <div className="flex items-center space-x-2 text-xs">
            <Icon name="MessageSquare" size={12} className="text-primary" />
            <span className="text-muted-foreground">Comment added to REQ-032</span>
            <span className="text-muted-foreground">• 15 min ago</span>
          </div>
          
          <div className="flex items-center space-x-2 text-xs">
            <Icon name="Paperclip" size={12} className="text-accent" />
            <span className="text-muted-foreground">Evidence attached to REQ-028</span>
            <span className="text-muted-foreground">• 1 hour ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressOverview;