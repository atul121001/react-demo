const fs = require('fs');
const path = require('path');

// Create heavy data processing library
function createDataProcessingLib() {
  const libDir = path.join(__dirname, '../libs/shared/data-processing');
  
  // Create directory structure
  fs.mkdirSync(libDir, { recursive: true });
  fs.mkdirSync(path.join(libDir, 'src'), { recursive: true });
  
  // Create project.json
  const projectJson = {
    name: "shared-data-processing",
    sourceRoot: "libs/shared/data-processing/src",
    projectType: "library",
    targets: {
      build: {
        executor: "@nx/vite:build",
        outputs: ["{options.outputPath}"],
        options: {
          outputPath: "dist/libs/shared/data-processing"
        }
      },
      test: {
        executor: "@nx/vite:test"
      },
      lint: {
        executor: "@nx/eslint:lint"
      }
    },
    tags: ["scope:shared", "type:data-access"]
  };
  
  fs.writeFileSync(path.join(libDir, 'project.json'), JSON.stringify(projectJson, null, 2));
  
  // Create heavy data processing service
  const dataService = `export class DataProcessingService {
  private cache = new Map();
  
  processLargeDataset(data: any[]) {
    // Heavy computation simulation
    const results = [];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const processed = {
        id: item.id,
        value: Math.sqrt(item.value * Math.random() * 1000),
        timestamp: Date.now(),
        metadata: this.generateMetadata(item)
      };
      results.push(processed);
    }
    return results;
  }
  
  private generateMetadata(item: any) {
    return {
      hash: this.hashCode(JSON.stringify(item)),
      complexity: Math.random() * 100,
      dependencies: Array.from({length: 10}, () => Math.random())
    };
  }
  
  private hashCode(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash;
  }
  
  async processAsync(data: any[]) {
    // Simulate async heavy processing
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.processLargeDataset(data);
  }
}`;

  fs.writeFileSync(path.join(libDir, 'src', 'data-processing.service.ts'), dataService);
  
  // Create index
  fs.writeFileSync(path.join(libDir, 'src', 'index.ts'), `export * from './data-processing.service';`);
  
  console.log('Created shared-data-processing library');
}

// Create heavy UI components library
function createHeavyUILib() {
  const libDir = path.join(__dirname, '../libs/shared/heavy-ui-components');
  
  fs.mkdirSync(libDir, { recursive: true });
  fs.mkdirSync(path.join(libDir, 'src'), { recursive: true });
  
  const projectJson = {
    name: "shared-heavy-ui-components",
    sourceRoot: "libs/shared/heavy-ui-components/src",
    projectType: "library",
    targets: {
      build: {
        executor: "@nx/vite:build",
        outputs: ["{options.outputPath}"],
        options: {
          outputPath: "dist/libs/shared/heavy-ui-components"
        }
      },
      test: {
        executor: "@nx/vite:test"
      },
      lint: {
        executor: "@nx/eslint:lint"
      }
    },
    tags: ["scope:shared", "type:ui"]
  };
  
  fs.writeFileSync(path.join(libDir, 'project.json'), JSON.stringify(projectJson, null, 2));
  
  // Create heavy chart component
  const chartComponent = `import React, { useMemo } from 'react';

export function HeavyChart({ data }: { data: any[] }) {
  const processedData = useMemo(() => {
    // Heavy computation for chart data
    return data.map((item, index) => ({
      x: index,
      y: Math.sin(item.value) * Math.cos(item.timestamp) * 100,
      color: \`hsl(\${(index * 137.5) % 360}, 70%, 50%)\`,
      metadata: {
        original: item,
        processed: Date.now(),
        complexity: Math.random() * 1000
      }
    }));
  }, [data]);
  
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc' }}>
      <h3>Heavy Chart Component</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '2px' }}>
        {processedData.map((point, idx) => (
          <div
            key={idx}
            style={{
              height: '20px',
              backgroundColor: point.color,
              opacity: 0.7
            }}
            title={\`Value: \${point.y.toFixed(2)}\`}
          />
        ))}
      </div>
    </div>
  );
}`;

  fs.writeFileSync(path.join(libDir, 'src', 'heavy-chart.component.tsx'), chartComponent);
  
  // Create heavy table component
  const tableComponent = `import React, { useMemo } from 'react';

export function HeavyTable({ data }: { data: any[] }) {
  const processedRows = useMemo(() => {
    return data.map((row, index) => {
      // Heavy row processing
      const processed = {
        ...row,
        computed: {
          sum: Object.values(row).reduce((acc: number, val: any) => 
            typeof val === 'number' ? acc + val : acc, 0),
          hash: JSON.stringify(row).split('').reduce((a, b) => {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a;
          }, 0),
          complexity: Math.random() * 1000
        }
      };
      return processed;
    });
  }, [data]);
  
  return (
    <div style={{ padding: '20px' }}>
      <h3>Heavy Table Component</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Data</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Computed</th>
          </tr>
        </thead>
        <tbody>
          {processedRows.map((row, idx) => (
            <tr key={idx}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{idx}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                {JSON.stringify(row).substring(0, 50)}...
              </td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                Sum: {row.computed.sum.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}`;

  fs.writeFileSync(path.join(libDir, 'src', 'heavy-table.component.tsx'), tableComponent);
  
  // Create index
  fs.writeFileSync(path.join(libDir, 'src', 'index.ts'), 
    `export * from './heavy-chart.component';
export * from './heavy-table.component';`);
  
  console.log('Created shared-heavy-ui-components library');
}

// Create analytics library
function createAnalyticsLib() {
  const libDir = path.join(__dirname, '../libs/shared/analytics');
  
  fs.mkdirSync(libDir, { recursive: true });
  fs.mkdirSync(path.join(libDir, 'src'), { recursive: true });
  
  const projectJson = {
    name: "shared-analytics",
    sourceRoot: "libs/shared/analytics/src",
    projectType: "library",
    targets: {
      build: {
        executor: "@nx/vite:build",
        outputs: ["{options.outputPath}"],
        options: {
          outputPath: "dist/libs/shared/analytics"
        }
      },
      test: {
        executor: "@nx/vite:test"
      },
      lint: {
        executor: "@nx/eslint:lint"
      }
    },
    tags: ["scope:shared", "type:feature"]
  };
  
  fs.writeFileSync(path.join(libDir, 'project.json'), JSON.stringify(projectJson, null, 2));
  
  const analyticsService = `export class AnalyticsService {
  private metrics = new Map();
  
  trackEvent(event: string, data: any) {
    const timestamp = Date.now();
    const processedData = this.processEventData(data);
    
    this.metrics.set(\`\${event}_\${timestamp}\`, {
      event,
      data: processedData,
      timestamp,
      hash: this.generateHash(processedData)
    });
  }
  
  private processEventData(data: any) {
    // Heavy data processing
    return {
      ...data,
      processed: true,
      complexity: Math.random() * 1000,
      metadata: Array.from({length: 50}, () => Math.random())
    };
  }
  
  private generateHash(data: any) {
    return JSON.stringify(data).split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
  }
  
  getMetrics() {
    return Array.from(this.metrics.values());
  }
}`;

  fs.writeFileSync(path.join(libDir, 'src', 'analytics.service.ts'), analyticsService);
  fs.writeFileSync(path.join(libDir, 'src', 'index.ts'), `export * from './analytics.service';`);
  
  console.log('Created shared-analytics library');
}

// Run generation
console.log('Generating heavy libraries...');
createDataProcessingLib();
createHeavyUILib();
createAnalyticsLib();
console.log('Heavy libraries generated successfully!');
