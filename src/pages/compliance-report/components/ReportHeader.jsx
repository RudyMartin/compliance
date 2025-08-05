import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportHeader = ({ reportData, onExport, onShare, onPrint }) => {
  const [exportDropdownOpen, setExportDropdownOpen] = useState(false);
  const [shareDropdownOpen, setShareDropdownOpen] = useState(false);

  const exportOptions = [
    { label: 'Export as PDF', icon: 'FileText', format: 'pdf' },
    { label: 'Export as Excel', icon: 'FileSpreadsheet', format: 'excel' },
    { label: 'Export as Word', icon: 'FileText', format: 'word' },
    { label: 'Export Summary', icon: 'FileDown', format: 'summary' }
  ];

  const shareOptions = [
    { label: 'Share via Email', icon: 'Mail', method: 'email' },
    { label: 'Generate Link', icon: 'Link', method: 'link' },
    { label: 'Schedule Report', icon: 'Calendar', method: 'schedule' },
    { label: 'Add to Dashboard', icon: 'LayoutDashboard', method: 'dashboard' }
  ];

  const handleExport = (format) => {
    onExport(format);
    setExportDropdownOpen(false);
  };

  const handleShare = (method) => {
    onShare(method);
    setShareDropdownOpen(false);
  };

  const getStatusBadge = (status) => {
    const badges = {
      'draft': 'bg-muted text-muted-foreground',
      'in-review': 'bg-warning/10 text-warning',
      'approved': 'bg-success/10 text-success',
      'final': 'bg-primary/10 text-primary'
    };
    return badges?.[status] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-professional mb-8">
      {/* Main Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Icon name="FileText" size={24} className="text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {reportData?.title}
              </h1>
              <p className="text-muted-foreground mb-3">
                {reportData?.description}
              </p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={16} />
                  <span>Generated: {reportData?.generatedDate}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="User" size={16} />
                  <span>By: {reportData?.generatedBy}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} />
                  <span>Version: {reportData?.version}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(reportData?.status)}`}>
              {reportData?.status?.charAt(0)?.toUpperCase() + reportData?.status?.slice(1)}
            </span>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Project Info */}
            <div className="flex items-center space-x-3 px-4 py-2 bg-muted/50 rounded-lg">
              <Icon name="FolderOpen" size={16} className="text-primary" />
              <div>
                <div className="text-sm font-medium text-foreground">
                  {reportData?.projectName}
                </div>
                <div className="text-xs text-muted-foreground">
                  {reportData?.documentCount} documents analyzed
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="hidden md:flex items-center space-x-6 text-sm">
              <div className="text-center">
                <div className="text-lg font-bold text-success">
                  {reportData?.quickStats?.compliant}
                </div>
                <div className="text-xs text-muted-foreground">Compliant</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-error">
                  {reportData?.quickStats?.nonCompliant}
                </div>
                <div className="text-xs text-muted-foreground">Non-Compliant</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-warning">
                  {reportData?.quickStats?.partial}
                </div>
                <div className="text-xs text-muted-foreground">Partial</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Print Button */}
            <Button variant="outline" size="sm" onClick={onPrint}>
              <Icon name="Printer" size={16} />
              <span className="ml-2 hidden sm:inline">Print</span>
            </Button>

            {/* Share Dropdown */}
            <div className="relative">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShareDropdownOpen(!shareDropdownOpen)}
              >
                <Icon name="Share" size={16} />
                <span className="ml-2 hidden sm:inline">Share</span>
                <Icon name="ChevronDown" size={14} className="ml-1" />
              </Button>

              {shareDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-document z-50">
                  <div className="py-2">
                    {shareOptions?.map((option) => (
                      <button
                        key={option?.method}
                        onClick={() => handleShare(option?.method)}
                        className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-professional"
                      >
                        <Icon name={option?.icon} size={16} />
                        <span>{option?.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Export Dropdown */}
            <div className="relative">
              <Button 
                variant="default" 
                size="sm"
                onClick={() => setExportDropdownOpen(!exportDropdownOpen)}
              >
                <Icon name="Download" size={16} />
                <span className="ml-2">Export</span>
                <Icon name="ChevronDown" size={14} className="ml-1" />
              </Button>

              {exportDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-document z-50">
                  <div className="py-2">
                    {exportOptions?.map((option) => (
                      <button
                        key={option?.format}
                        onClick={() => handleExport(option?.format)}
                        className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-professional"
                      >
                        <Icon name={option?.icon} size={16} />
                        <span>{option?.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Report Metadata */}
      <div className="p-6 bg-muted/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">
              Analysis Period
            </h4>
            <p className="text-sm text-muted-foreground">
              {reportData?.analysisPeriod?.start} - {reportData?.analysisPeriod?.end}
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">
              Policy Framework
            </h4>
            <p className="text-sm text-muted-foreground">
              {reportData?.policyFramework}
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">
              Compliance Standard
            </h4>
            <p className="text-sm text-muted-foreground">
              {reportData?.complianceStandard}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;