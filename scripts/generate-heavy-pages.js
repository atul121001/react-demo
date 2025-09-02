const fs = require('fs');
const path = require('path');

// Generate pages for Remote1
function generateRemote1Pages() {
  const remote1PagesDir = path.join(__dirname, '../module/remote1/src/pages');
  
  // Create pages directory if it doesn't exist
  if (!fs.existsSync(remote1PagesDir)) {
    fs.mkdirSync(remote1PagesDir, { recursive: true });
  }

  for (let i = 1; i <= 50; i++) {
    const pageContent = `import React from 'react';

export default function Page${i}() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Remote1 - Page ${i}</h2>
      <p>This is page ${i} of Remote1 with heavy content simulation.</p>
      
      {/* Heavy content simulation */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginTop: '20px' }}>
        {Array.from({ length: 20 }, (_, idx) => (
          <div key={idx} style={{ 
            padding: '15px', 
            border: '1px solid #ddd', 
            borderRadius: '8px',
            backgroundColor: '#f9f9f9'
          }}>
            <h4>Card {idx + 1}</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <button onClick={() => alert(\`Page ${i} - Card \${idx + 1} clicked\`)}>
              Click Me
            </button>
          </div>
        ))}
      </div>
      
      {/* Heavy data simulation */}
      <div style={{ marginTop: '30px' }}>
        <h3>Data Table - Page ${i}</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Name</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 50 }, (_, idx) => (
              <tr key={idx}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{idx + 1}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>User {idx + 1}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>user{idx + 1}@example.com</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '4px',
                    backgroundColor: idx % 2 === 0 ? '#d4edda' : '#f8d7da',
                    color: idx % 2 === 0 ? '#155724' : '#721c24'
                  }}>
                    {idx % 2 === 0 ? 'Active' : 'Inactive'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Complex calculations simulation */}
      <div style={{ marginTop: '30px' }}>
        <h3>Complex Calculations - Page ${i}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {Array.from({ length: 15 }, (_, idx) => {
            const result = Array.from({ length: 1000 }, (_, i) => i * Math.random()).reduce((a, b) => a + b, 0);
            return (
              <div key={idx} style={{ 
                padding: '15px', 
                border: '1px solid #ccc', 
                borderRadius: '8px',
                backgroundColor: '#f8f9fa'
              }}>
                                 <h5>Calculation \${idx + 1}</h5>
                <p>Result: \${result.toFixed(2)}</p>
                <p>Complex computation completed for page ${i}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}`;

    fs.writeFileSync(path.join(remote1PagesDir, `Page${i}.tsx`), pageContent);
  }
  
  console.log('Generated 50 pages for Remote1');
}

// Generate pages for Remote2
function generateRemote2Pages() {
  const remote2PagesDir = path.join(__dirname, '../module/remote2/src/pages');
  
  // Create pages directory if it doesn't exist
  if (!fs.existsSync(remote2PagesDir)) {
    fs.mkdirSync(remote2PagesDir, { recursive: true });
  }

  for (let i = 1; i <= 50; i++) {
    const pageContent = `import React from 'react';

export default function Page${i}() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Remote2 - Page ${i}</h2>
      <p>This is page ${i} of Remote2 with heavy content simulation.</p>
      
      {/* Heavy content simulation */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginTop: '20px' }}>
        {Array.from({ length: 25 }, (_, idx) => (
          <div key={idx} style={{ 
            padding: '15px', 
            border: '1px solid #ddd', 
            borderRadius: '8px',
            backgroundColor: '#e3f2fd'
          }}>
            <h4>Analytics Card {idx + 1}</h4>
            <p>Analytics data for page ${i} - card {idx + 1}. This simulates heavy data processing.</p>
            <button onClick={() => alert(\`Analytics Page ${i} - Card \${idx + 1} clicked\`)}>
              View Analytics
            </button>
          </div>
        ))}
      </div>
      
      {/* Heavy charts simulation */}
      <div style={{ marginTop: '30px' }}>
        <h3>Charts and Analytics - Page ${i}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          {Array.from({ length: 10 }, (_, idx) => (
            <div key={idx} style={{ 
              padding: '20px', 
              border: '1px solid #ccc', 
              borderRadius: '8px',
              backgroundColor: '#f5f5f5'
            }}>
              <h4>Chart ${idx + 1}</h4>
              <div style={{ 
                height: '200px', 
                backgroundColor: '#e0e0e0', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                borderRadius: '4px'
              }}>
                <p>Chart visualization for page ${i}</p>
              </div>
              <p>Data points: {Array.from({ length: 100 }, (_, i) => Math.random() * 100).length}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Heavy data processing simulation */}
      <div style={{ marginTop: '30px' }}>
        <h3>Data Processing - Page ${i}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
          {Array.from({ length: 20 }, (_, idx) => {
            const data = Array.from({ length: 500 }, (_, i) => ({
              id: i,
              value: Math.random() * 1000,
              timestamp: new Date().getTime() + i
            }));
            const sum = data.reduce((acc, item) => acc + item.value, 0);
            const avg = sum / data.length;
            
            return (
              <div key={idx} style={{ 
                padding: '15px', 
                border: '1px solid #ccc', 
                borderRadius: '8px',
                backgroundColor: '#fff3e0'
              }}>
                <h5>Dataset ${idx + 1}</h5>
                <p>Records: {data.length}</p>
                <p>Sum: {sum.toFixed(2)}</p>
                <p>Average: {avg.toFixed(2)}</p>
                <p>Page: ${i}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}`;

    fs.writeFileSync(path.join(remote2PagesDir, `Page${i}.tsx`), pageContent);
  }
  
  console.log('Generated 50 pages for Remote2');
}

// Generate heavy shared libraries
function generateHeavyLibraries() {
  const libsDir = path.join(__dirname, '../libs/shared');
  
  // Create heavy data processing library
  const dataProcessingDir = path.join(libsDir, 'data-processing');
  if (!fs.existsSync(dataProcessingDir)) {
    fs.mkdirSync(dataProcessingDir, { recursive: true });
  }
  
  // Create heavy UI components library
  const heavyUIComponentsDir = path.join(libsDir, 'heavy-ui-components');
  if (!fs.existsSync(heavyUIComponentsDir)) {
    fs.mkdirSync(heavyUIComponentsDir, { recursive: true });
  }
  
  // Generate data processing library
  const dataProcessingContent = `// Heavy data processing library
export class DataProcessor {
  private cache = new Map();
  
  processLargeDataset(data: any[]) {
    console.log('Processing large dataset with', data.length, 'items');
    
    // Simulate heavy processing
    const start = Date.now();
    const result = data.map((item, index) => {
      // Complex calculations
      const processed = {
        ...item,
        processed: true,
        index,
        hash: this.generateHash(item),
        timestamp: Date.now(),
        metadata: this.extractMetadata(item)
      };
      
      // Simulate processing time
      for (let i = 0; i < 1000; i++) {
        Math.random() * Math.random();
      }
      
      return processed;
    });
    
    const end = Date.now();
    console.log(\`Processing completed in \${end - start}ms\`);
    
    return result;
  }
  
  private generateHash(item: any): string {
    return btoa(JSON.stringify(item)).substring(0, 16);
  }
  
  private extractMetadata(item: any) {
    return {
      keys: Object.keys(item).length,
      size: JSON.stringify(item).length,
      type: typeof item,
      hasNested: this.hasNestedObjects(item)
    };
  }
  
  private hasNestedObjects(obj: any): boolean {
    return Object.values(obj).some(value => 
      typeof value === 'object' && value !== null
    );
  }
  
  // Heavy analytics functions
  calculateAnalytics(data: any[]) {
    const analytics = {
      total: data.length,
      sum: 0,
      average: 0,
      min: Infinity,
      max: -Infinity,
      distribution: {},
      trends: [],
      correlations: []
    };
    
    // Heavy calculations
    data.forEach((item, index) => {
      const value = item.value || 0;
      analytics.sum += value;
      analytics.min = Math.min(analytics.min, value);
      analytics.max = Math.max(analytics.max, value);
      
      // Distribution calculation
      const bucket = Math.floor(value / 10) * 10;
      analytics.distribution[bucket] = (analytics.distribution[bucket] || 0) + 1;
      
      // Trend calculation
      if (index > 0) {
        const prevValue = data[index - 1].value || 0;
        analytics.trends.push(value - prevValue);
      }
    });
    
    analytics.average = analytics.sum / data.length;
    
    // Correlation calculation
    for (let i = 0; i < Math.min(100, data.length); i++) {
      for (let j = i + 1; j < Math.min(100, data.length); j++) {
        const correlation = this.calculateCorrelation(data[i], data[j]);
        analytics.correlations.push(correlation);
      }
    }
    
    return analytics;
  }
  
  private calculateCorrelation(item1: any, item2: any): number {
    // Simulate correlation calculation
    const val1 = item1.value || 0;
    const val2 = item2.value || 0;
    return Math.random() * 2 - 1; // Random correlation between -1 and 1
  }
}

export const dataProcessor = new DataProcessor();

// Heavy utility functions
export class HeavyUtils {
  static generateRandomData(count: number) {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      value: Math.random() * 1000,
      timestamp: Date.now() + i,
      category: ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)],
      metadata: {
        source: 'generated',
        version: '1.0.0',
        checksum: Math.random().toString(36).substring(7)
      }
    }));
  }
  
  static processInBatches(data: any[], batchSize: number = 100) {
    const batches = [];
    for (let i = 0; i < data.length; i += batchSize) {
      batches.push(data.slice(i, i + batchSize));
    }
    
    return batches.map((batch, index) => ({
      batchIndex: index,
      data: batch,
      processed: batch.map(item => ({
        ...item,
        processed: true,
        batchId: index
      }))
    }));
  }
  
  static heavyComputation(input: number): number {
    let result = input;
    for (let i = 0; i < 10000; i++) {
      result = Math.sqrt(result * Math.random() + 1);
    }
    return result;
  }
}`;

  fs.writeFileSync(path.join(dataProcessingDir, 'index.ts'), dataProcessingContent);
  
  // Generate heavy UI components library
  const heavyUIComponentsContent = `import React from 'react';

// Heavy data table component
export function HeavyDataTable({ data, columns }: { data: any[], columns: string[] }) {
  return (
    <div style={{ overflow: 'auto', maxHeight: '600px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ position: 'sticky', top: 0, backgroundColor: '#f0f0f0' }}>
          <tr>
            {columns.map((col, index) => (
              <th key={index} style={{ 
                padding: '12px', 
                border: '1px solid #ddd',
                textAlign: 'left',
                fontWeight: 'bold'
              }}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} style={{ 
              backgroundColor: rowIndex % 2 === 0 ? '#f9f9f9' : 'white'
            }}>
              {columns.map((col, colIndex) => (
                <td key={colIndex} style={{ 
                  padding: '10px', 
                  border: '1px solid #ddd'
                }}>
                  {row[col] || '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Heavy chart component
export function HeavyChart({ data, type = 'bar' }: { data: any[], type?: string }) {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>Heavy Chart - {type.toUpperCase()}</h3>
      <div style={{ display: 'flex', alignItems: 'end', height: '300px', gap: '2px' }}>
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              height: \`\${(item.value / maxValue) * 100}%\`,
              backgroundColor: \`hsl(\${(index * 137.5) % 360}, 70%, 50%)\`,
              flex: 1,
              minHeight: '4px',
              borderRadius: '2px 2px 0 0',
              position: 'relative'
            }}
            title={\`\${item.label}: \${item.value}\`}
          />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
        {data.map((item, index) => (
          <span key={index} style={{ fontSize: '12px', textAlign: 'center' }}>
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// Heavy form component
export function HeavyForm({ fields, onSubmit }: { fields: any[], onSubmit: (data: any) => void }) {
  const [formData, setFormData] = React.useState({});
  
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit(formData);
    }} style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h3>Heavy Form</h3>
      {fields.map((field, index) => (
        <div key={index} style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            {field.label}:
          </label>
          {field.type === 'select' ? (
            <select
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
              onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            >
              {field.options.map((option: string, optIndex: number) => (
                <option key={optIndex} value={option}>{option}</option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
              onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            />
          )}
        </div>
      ))}
      <button 
        type="submit"
        style={{ 
          padding: '10px 20px', 
          backgroundColor: '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Submit
      </button>
    </form>
  );
}

// Heavy dashboard component
export function HeavyDashboard({ widgets }: { widgets: any[] }) {
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
      gap: '20px',
      padding: '20px'
    }}>
      {widgets.map((widget, index) => (
        <div key={index} style={{ 
          padding: '20px', 
          border: '1px solid #ddd', 
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}>
          <h4>{widget.title}</h4>
          <div style={{ marginTop: '15px' }}>
            {widget.type === 'chart' && <HeavyChart data={widget.data} type={widget.chartType} />}
            {widget.type === 'table' && <HeavyDataTable data={widget.data} columns={widget.columns} />}
            {widget.type === 'metric' && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#007bff' }}>
                  {widget.value}
                </div>
                <div style={{ color: '#666' }}>{widget.label}</div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}`;

  fs.writeFileSync(path.join(heavyUIComponentsDir, 'index.tsx'), heavyUIComponentsContent);
  
  console.log('Generated heavy shared libraries');
}

// Run the generation
console.log('Generating heavy application structure...');
generateRemote1Pages();
generateRemote2Pages();
generateHeavyLibraries();
console.log('Heavy application structure generated successfully!');
