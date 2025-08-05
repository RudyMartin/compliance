import React from 'react';
import Icon from '../../../components/AppIcon';

const ProjectOverviewCards = ({ overviewData }) => {
  const cards = [
    {
      title: "Total Projects",
      value: overviewData?.totalProjects,
      icon: "FolderOpen",
      color: "text-primary",
      bgColor: "bg-primary/10",
      change: "+12%",
      changeType: "positive"
    },
    {
      title: "Active Reviews",
      value: overviewData?.activeReviews,
      icon: "FileSearch",
      color: "text-warning",
      bgColor: "bg-warning/10",
      change: "+8%",
      changeType: "positive"
    },
    {
      title: "Completed",
      value: overviewData?.completed,
      icon: "CheckCircle",
      color: "text-success",
      bgColor: "bg-success/10",
      change: "+15%",
      changeType: "positive"
    },
    {
      title: "Compliance Rate",
      value: `${overviewData?.complianceRate}%`,
      icon: "Shield",
      color: "text-accent",
      bgColor: "bg-accent/10",
      change: "+3%",
      changeType: "positive"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards?.map((card, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6 shadow-professional hover:shadow-document transition-professional">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${card?.bgColor}`}>
              <Icon name={card?.icon} size={24} className={card?.color} />
            </div>
            <div className={`text-xs font-medium px-2 py-1 rounded-full ${
              card?.changeType === 'positive' ? 'text-success bg-success/10' : 'text-error bg-error/10'
            }`}>
              {card?.change}
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">{card?.value}</p>
            <p className="text-sm text-muted-foreground">{card?.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectOverviewCards;