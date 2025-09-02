import React, { useMemo } from 'react';

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface ChartProps {
  data: ChartDataPoint[];
  type?: 'bar' | 'line' | 'pie';
  width?: number;
  height?: number;
  showLegend?: boolean;
}

export function Chart({ data, type = 'bar', width = 400, height = 300, showLegend = true }: ChartProps) {
  // Heavy data processing for chart rendering
  const processedData = useMemo(() => {
    const maxValue = Math.max(...data.map(d => d.value));
    const minValue = Math.min(...data.map(d => d.value));
    const range = maxValue - minValue;
    
    return data.map((point, index) => {
      const normalizedValue = range > 0 ? (point.value - minValue) / range : 0.5;
      const color = point.color || `hsl(${(index * 137.5) % 360}, 70%, 50%)`;
      
      return {
        ...point,
        normalizedValue,
        percentage: range > 0 ? ((point.value - minValue) / range) * 100 : 50,
        color,
        // Heavy computation for visual effects
        shadow: `0 2px 4px rgba(0,0,0,${0.1 + normalizedValue * 0.2})`,
        gradient: `linear-gradient(135deg, ${color}, ${color}dd)`
      };
    });
  }, [data]);

  const renderBarChart = () => {
    const containerHeight = height - 80; // Reserve space for labels
    const maxValue = Math.max(...processedData.map(p => p.value));
    
    return (
      <div style={{ display: 'flex', alignItems: 'end', height: containerHeight, gap: '8px', padding: '10px 0' }}>
        {processedData.map((point, index) => {
          const barHeight = (point.value / maxValue) * (containerHeight - 30); // 30px for label space
          return (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: '60px' }}>
              <div
                style={{
                  width: '80%',
                  minWidth: '50px',
                  height: `${Math.max(barHeight, 20)}px`,
                  backgroundColor: point.color,
                  borderRadius: '6px 6px 0 0',
                  boxShadow: point.shadow,
                  background: point.gradient,
                  transition: 'all 0.3s ease'
                }}
                title={`${point.label}: ${point.value}`}
              />
              <div style={{ fontSize: '12px', marginTop: '5px', textAlign: 'center', fontWeight: 'bold' }}>
                {point.label}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderLineChart = () => (
    <svg width={width} height={height} style={{ border: '1px solid #ddd' }}>
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          {processedData.map((point, index) => (
            <stop
              key={index}
              offset={`${(index / (processedData.length - 1)) * 100}%`}
              stopColor={point.color}
            />
          ))}
        </linearGradient>
      </defs>
      
      {/* Grid lines */}
      {Array.from({ length: 5 }, (_, i) => (
        <line
          key={i}
          x1="40"
          y1={40 + (i * (height - 80) / 4)}
          x2={width - 20}
          y2={40 + (i * (height - 80) / 4)}
          stroke="#e0e0e0"
          strokeWidth="1"
        />
      ))}
      
      {/* Data line */}
      <polyline
        fill="none"
        stroke="url(#lineGradient)"
        strokeWidth="3"
        points={processedData.map((point, index) => {
          const x = 40 + (index * (width - 60) / (processedData.length - 1));
          const y = height - 40 - (point.percentage * (height - 80) / 100);
          return `${x},${y}`;
        }).join(' ')}
      />
      
      {/* Data points */}
      {processedData.map((point, index) => {
        const x = 40 + (index * (width - 60) / (processedData.length - 1));
        const y = height - 40 - (point.percentage * (height - 80) / 100);
        return (
          <circle
            key={index}
            cx={x}
            cy={y}
            r="4"
            fill={point.color}
            stroke="#fff"
            strokeWidth="2"
          />
        );
      })}
    </svg>
  );

  const renderPieChart = () => {
    let cumulativePercentage = 0;
    const radius = Math.min(width, height) / 2 - 20;
    const centerX = width / 2;
    const centerY = height / 2;
    
    return (
      <svg width={width} height={height}>
        {processedData.map((point, index) => {
          const percentage = (point.value / processedData.reduce((sum, p) => sum + p.value, 0)) * 100;
          const startAngle = (cumulativePercentage / 100) * 360;
          const endAngle = ((cumulativePercentage + percentage) / 100) * 360;
          
          const startAngleRad = (startAngle * Math.PI) / 180;
          const endAngleRad = (endAngle * Math.PI) / 180;
          
          const x1 = centerX + radius * Math.cos(startAngleRad);
          const y1 = centerY + radius * Math.sin(startAngleRad);
          const x2 = centerX + radius * Math.cos(endAngleRad);
          const y2 = centerY + radius * Math.sin(endAngleRad);
          
          const largeArcFlag = percentage > 50 ? 1 : 0;
          
          const pathData = [
            `M ${centerX} ${centerY}`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            'Z'
          ].join(' ');
          
          cumulativePercentage += percentage;
          
          return (
            <path
              key={index}
              d={pathData}
              fill={point.color}
              stroke="#fff"
              strokeWidth="2"
              data-title={`${point.label}: ${percentage.toFixed(1)}%`}
            />
          );
        })}
      </svg>
    );
  };

  const renderChart = () => {
    switch (type) {
      case 'line':
        return renderLineChart();
      case 'pie':
        return renderPieChart();
      default:
        return renderBarChart();
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>
        {type.charAt(0).toUpperCase() + type.slice(1)} Chart
      </h3>
      
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {renderChart()}
      </div>
      
      {showLegend && (
        <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
          {processedData.map((point, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: point.color,
                  borderRadius: '2px'
                }}
              />
              <span style={{ fontSize: '14px' }}>{point.label}: {point.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
