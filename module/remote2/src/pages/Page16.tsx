import React from 'react';

export default function Page16() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Remote2 - Page 16</h2>
      <p>This is page 16 of Remote2 with heavy content simulation.</p>
      
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
            <p>Analytics data for page 16 - card {idx + 1}. This simulates heavy data processing.</p>
            <button onClick={() => alert('Analytics Page 16 - Card ' + (idx + 1) + ' clicked')}>
              View Analytics
            </button>
          </div>
        ))}
      </div>
      
      {/* Heavy charts simulation */}
      <div style={{ marginTop: '30px' }}>
        <h3>Charts and Analytics - Page 16</h3>
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
                <p>Chart visualization for page 16</p>
              </div>
              <p>Data points: {Array.from({ length: 100 }, (_, i) => Math.random() * 100).length}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Heavy data processing simulation */}
      <div style={{ marginTop: '30px' }}>
        <h3>Data Processing - Page 16</h3>
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
                <p>Page: 16</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}