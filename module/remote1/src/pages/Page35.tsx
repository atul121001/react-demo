import React from 'react';

export default function Page35() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Remote1 - Page 35</h2>
      <p>This is page 35 of Remote1 with heavy content simulation.</p>
      
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
            <button onClick={() => alert('Page 35 - Card ' + (idx + 1) + ' clicked')}>
              Click Me
            </button>
          </div>
        ))}
      </div>
      
      {/* Heavy data simulation */}
      <div style={{ marginTop: '30px' }}>
        <h3>Data Table - Page 35</h3>
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
        <h3>Complex Calculations - Page 35</h3>
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
                <p>Complex computation completed for page 35</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}