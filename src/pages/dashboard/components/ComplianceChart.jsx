import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ComplianceChart = ({ chartType = 'bar', data, title }) => {
  const COLORS = ['#1E3A8A', '#059669', '#F59E0B', '#DC2626', '#64748B'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg shadow-document p-3">
          <p className="text-sm font-medium text-popover-foreground">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm text-muted-foreground">
              <span className="font-medium" style={{ color: entry?.color }}>
                {entry?.name}:
              </span>
              {' '}
              {entry?.value}
              {chartType === 'bar' && '%'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
        <XAxis 
          dataKey="name" 
          stroke="var(--color-muted-foreground)"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis 
          stroke="var(--color-muted-foreground)"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar 
          dataKey="value" 
          fill="var(--color-primary)"
          radius={[4, 4, 0, 0]}
          name="Compliance Rate"
        />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderPieChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
          dataKey="value"
        >
          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );

  return (
    <div className="bg-card border border-border rounded-lg shadow-professional">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      <div className="p-4">
        <div className="w-full h-64" aria-label={`${title} Chart`}>
          {chartType === 'bar' ? renderBarChart() : renderPieChart()}
        </div>
        
        {/* Legend for Pie Chart */}
        {chartType === 'pie' && (
          <div className="mt-4 flex flex-wrap gap-4 justify-center">
            {data?.map((entry, index) => (
              <div key={entry?.name} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS?.[index % COLORS?.length] }}
                />
                <span className="text-sm text-muted-foreground">{entry?.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplianceChart;