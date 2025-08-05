import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const AdvancedOptionsPanel = ({ 
  options, 
  setOptions 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const analysisDepthOptions = [
    { value: 'basic', label: 'Basic Analysis', description: 'Standard requirement extraction and mapping' },
    { value: 'detailed', label: 'Detailed Analysis', description: 'Comprehensive analysis with context understanding' },
    { value: 'comprehensive', label: 'Comprehensive Analysis', description: 'Deep analysis with regulatory insights' }
  ];

  const priorityLevelOptions = [
    { value: 'all', label: 'All Requirements' },
    { value: 'high', label: 'High Priority Only' },
    { value: 'medium-high', label: 'Medium & High Priority' }
  ];

  const handleOptionChange = (key, value) => {
    setOptions(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-professional"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <Icon name="Settings" size={20} className="text-primary" />
          <div>
            <h3 className="text-sm font-semibold text-foreground">Advanced Options</h3>
            <p className="text-xs text-muted-foreground">
              Configure analysis parameters and extraction preferences
            </p>
          </div>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-muted-foreground" 
        />
      </div>
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-border">
          <div className="pt-4 space-y-6">
            {/* Analysis Depth */}
            <Select
              label="Analysis Depth"
              placeholder="Select analysis level"
              options={analysisDepthOptions}
              value={options?.analysisDepth}
              onChange={(value) => handleOptionChange('analysisDepth', value)}
              description="Choose the level of detail for compliance analysis"
            />

            {/* Priority Filter */}
            <Select
              label="Requirement Priority Filter"
              placeholder="Select priority level"
              options={priorityLevelOptions}
              value={options?.priorityFilter}
              onChange={(value) => handleOptionChange('priorityFilter', value)}
              description="Filter requirements by priority level"
            />

            {/* Extraction Options */}
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">Extraction Preferences</h4>
                <div className="space-y-3">
                  <Checkbox
                    label="Extract numerical requirements"
                    description="Identify specific numbers, percentages, and measurements"
                    checked={options?.extractNumerical}
                    onChange={(e) => handleOptionChange('extractNumerical', e?.target?.checked)}
                  />
                  
                  <Checkbox
                    label="Extract deadline requirements"
                    description="Identify time-based and deadline requirements"
                    checked={options?.extractDeadlines}
                    onChange={(e) => handleOptionChange('extractDeadlines', e?.target?.checked)}
                  />
                  
                  <Checkbox
                    label="Extract conditional requirements"
                    description="Identify requirements with conditions or exceptions"
                    checked={options?.extractConditional}
                    onChange={(e) => handleOptionChange('extractConditional', e?.target?.checked)}
                  />
                </div>
              </div>

              {/* Analysis Options */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">Analysis Features</h4>
                <div className="space-y-3">
                  <Checkbox
                    label="Enable semantic matching"
                    description="Use AI to understand context and meaning beyond exact text matches"
                    checked={options?.semanticMatching}
                    onChange={(e) => handleOptionChange('semanticMatching', e?.target?.checked)}
                  />
                  
                  <Checkbox
                    label="Generate compliance suggestions"
                    description="Provide recommendations for addressing compliance gaps"
                    checked={options?.generateSuggestions}
                    onChange={(e) => handleOptionChange('generateSuggestions', e?.target?.checked)}
                  />
                  
                  <Checkbox
                    label="Create detailed audit trail"
                    description="Maintain comprehensive logs of analysis decisions and mappings"
                    checked={options?.detailedAuditTrail}
                    onChange={(e) => handleOptionChange('detailedAuditTrail', e?.target?.checked)}
                  />
                </div>
              </div>
            </div>

            {/* Reset Options */}
            <div className="pt-4 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOptions({
                  analysisDepth: 'detailed',
                  priorityFilter: 'all',
                  extractNumerical: true,
                  extractDeadlines: true,
                  extractConditional: true,
                  semanticMatching: true,
                  generateSuggestions: true,
                  detailedAuditTrail: false
                })}
              >
                <Icon name="RotateCcw" size={16} />
                <span className="ml-2">Reset to Defaults</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedOptionsPanel;