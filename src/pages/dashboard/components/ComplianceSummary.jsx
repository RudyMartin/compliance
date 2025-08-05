import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComplianceSummary = ({ alerts, deadlines, trends }) => {
  const navigate = useNavigate();

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'text-error bg-error/10 border-error/20',
      medium: 'text-warning bg-warning/10 border-warning/20',
      low: 'text-success bg-success/10 border-success/20'
    };
    return colors?.[priority] || colors?.medium;
  };

  const formatDeadline = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Due Today';
    if (diffDays === 1) return 'Due Tomorrow';
    if (diffDays < 7) return `${diffDays} days left`;
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-6">
      {/* Priority Alerts */}
      <div className="bg-card border border-border rounded-lg shadow-professional">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Priority Alerts</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/compliance-report')}
            >
              <span className="text-sm">View All</span>
              <Icon name="ChevronRight" size={14} className="ml-1" />
            </Button>
          </div>
        </div>
        <div className="p-4">
          {alerts?.length > 0 ? (
            <div className="space-y-3">
              {alerts?.slice(0, 5)?.map((alert) => (
                <div 
                  key={alert.id}
                  className={`p-3 rounded-lg border ${getPriorityColor(alert.priority)} cursor-pointer hover:opacity-80 transition-professional`}
                  onClick={() => navigate('/document-comparison', { state: { alertId: alert.id } })}
                >
                  <div className="flex items-start space-x-3">
                    <Icon 
                      name={alert.priority === 'high' ? 'AlertTriangle' : alert.priority === 'medium' ? 'AlertCircle' : 'Info'} 
                      size={16} 
                      className="mt-0.5 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{alert.title}</p>
                      <p className="text-xs opacity-80 mt-1">{alert.description}</p>
                      <div className="flex items-center mt-2 text-xs opacity-70">
                        <Icon name="Clock" size={12} className="mr-1" />
                        <span>{alert.project}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <Icon name="CheckCircle" size={32} className="mx-auto text-success mb-2" />
              <p className="text-sm text-muted-foreground">No priority alerts</p>
            </div>
          )}
        </div>
      </div>
      {/* Upcoming Deadlines */}
      <div className="bg-card border border-border rounded-lg shadow-professional">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Upcoming Deadlines</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/project-management')}
            >
              <span className="text-sm">Manage</span>
              <Icon name="ChevronRight" size={14} className="ml-1" />
            </Button>
          </div>
        </div>
        <div className="p-4">
          {deadlines?.length > 0 ? (
            <div className="space-y-3">
              {deadlines?.slice(0, 4)?.map((deadline) => (
                <div 
                  key={deadline?.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-professional cursor-pointer"
                  onClick={() => navigate('/document-comparison', { state: { projectId: deadline?.projectId } })}
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{deadline?.title}</p>
                      <p className="text-xs text-muted-foreground">{deadline?.project}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className={`text-xs font-medium ${
                      deadline?.daysLeft <= 1 ? 'text-error' : 
                      deadline?.daysLeft <= 3 ? 'text-warning' : 'text-muted-foreground'
                    }`}>
                      {formatDeadline(deadline?.dueDate)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <Icon name="Calendar" size={32} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No upcoming deadlines</p>
            </div>
          )}
        </div>
      </div>
      {/* Compliance Trends */}
      <div className="bg-card border border-border rounded-lg shadow-professional">
        <div className="p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Compliance Trends</h3>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            {trends?.map((trend) => (
              <div key={trend?.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{trend?.category}</span>
                  <span className="text-sm text-muted-foreground">{trend?.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      trend?.percentage >= 90 ? 'bg-success' :
                      trend?.percentage >= 70 ? 'bg-warning' : 'bg-error'
                    }`}
                    style={{ width: `${trend?.percentage}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{trend?.completed} of {trend?.total} requirements</span>
                  <div className="flex items-center space-x-1">
                    <Icon 
                      name={trend?.trend === 'up' ? 'TrendingUp' : trend?.trend === 'down' ? 'TrendingDown' : 'Minus'} 
                      size={12} 
                      className={
                        trend?.trend === 'up' ? 'text-success' :
                        trend?.trend === 'down' ? 'text-error' : 'text-muted-foreground'
                      }
                    />
                    <span>{trend?.change}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg shadow-professional">
        <div className="p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        </div>
        <div className="p-4 space-y-3">
          <Button
            variant="default"
            fullWidth
            onClick={() => navigate('/document-upload')}
            iconName="Upload"
            iconPosition="left"
          >
            Upload Documents
          </Button>
          <Button
            variant="outline"
            fullWidth
            onClick={() => navigate('/requirements-checklist')}
            iconName="CheckSquare"
            iconPosition="left"
          >
            Create Checklist
          </Button>
          <Button
            variant="outline"
            fullWidth
            onClick={() => navigate('/compliance-report')}
            iconName="FileText"
            iconPosition="left"
          >
            Generate Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComplianceSummary;