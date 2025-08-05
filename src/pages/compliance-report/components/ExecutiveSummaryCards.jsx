import React from 'react';
import Icon from '../../../components/AppIcon';

const ExecutiveSummaryCards = ({ summaryData }) => {
  const cards = [
    {
      title: "Overall Compliance",
      value: `${summaryData?.overallCompliance}%`,
      icon: "Shield",
      color: summaryData?.overallCompliance >= 80 ? "text-success" : summaryData?.overallCompliance >= 60 ? "text-warning" : "text-error",
      bgColor: summaryData?.overallCompliance >= 80 ? "bg-success/10" : summaryData?.overallCompliance >= 60 ? "bg-warning/10" : "bg-error/10",
      trend: summaryData?.complianceTrend,
      description: "Policy adherence rate"
    },
    {
      title: "Total Requirements",
      value: summaryData?.totalRequirements,
      icon: "FileText",
      color: "text-primary",
      bgColor: "bg-primary/10",
      trend: summaryData?.requirementsTrend,
      description: "Requirements reviewed"
    },
    {
      title: "Passed Items",
      value: summaryData?.passedItems,
      icon: "CheckCircle",
      color: "text-success",
      bgColor: "bg-success/10",
      trend: summaryData?.passedTrend,
      description: "Successfully compliant"
    },
    {
      title: "Critical Gaps",
      value: summaryData?.criticalGaps,
      icon: "AlertTriangle",
      color: "text-error",
      bgColor: "bg-error/10",
      trend: summaryData?.gapsTrend,
      description: "Require immediate attention"
    }
  ];

  const getTrendIcon = (trend) => {
    if (trend > 0) return "TrendingUp";
    if (trend < 0) return "TrendingDown";
    return "Minus";
  };

  const getTrendColor = (trend) => {
    if (trend > 0) return "text-success";
    if (trend < 0) return "text-error";
    return "text-muted-foreground";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {cards?.map((card, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6 shadow-professional hover:shadow-document transition-professional">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-lg ${card?.bgColor}`}>
              <Icon name={card?.icon} size={24} className={card?.color} />
            </div>
            <div className={`flex items-center space-x-1 ${getTrendColor(card?.trend)}`}>
              <Icon name={getTrendIcon(card?.trend)} size={16} />
              <span className="text-sm font-medium">
                {Math.abs(card?.trend)}%
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              {card?.title}
            </h3>
            <div className="text-3xl font-bold text-foreground">
              {card?.value}
            </div>
            <p className="text-sm text-muted-foreground">
              {card?.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExecutiveSummaryCards;