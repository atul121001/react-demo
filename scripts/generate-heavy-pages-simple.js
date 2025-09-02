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
            <button onClick={() => alert('Page ${i} - Card ' + (idx + 1) + ' clicked')}>
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
                <h5>Calculation {idx + 1}</h5>
                <p>Result: {result.toFixed(2)}</p>
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
            <button onClick={() => alert('Analytics Page ${i} - Card ' + (idx + 1) + ' clicked')}>
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
              <h4>Chart {idx + 1}</h4>
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
                <h5>Dataset {idx + 1}</h5>
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

// Run the generation
console.log('Generating heavy application structure...');
generateRemote1Pages();
generateRemote2Pages();
console.log('Heavy application structure generated successfully!');
