import { Routes, Route, Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function Remote1Home() {
  return (
    <div>
      <h3>🔥 Remote1 Home - HMR Test check now!</h3>
      <p>Welcome to Remote1! HMR is working 🚀</p>
      <p style={{ color: 'green', fontWeight: 'bold' }}>This change should appear instantly!</p>
    </div>
  );
}

function Remote1Products() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        // Destroy existing chart if it exists
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }
        
        // Create new chart instance
        chartInstanceRef.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Product A', 'Product B', 'Product C', 'Product D'],
            datasets: [{
              label: 'Sales',
              data: [12, 19, 3, 5],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
              ],
              borderWidth: 1
            }]
          }
        });
      }
    }

    // Cleanup function
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div>
      <h3>🛍️ Remote1 Products - Updated now!</h3>
      <p>List of products... (HMR Update at {new Date().toLocaleTimeString()})</p>
      <div style={{ background: '#f0f8ff', padding: '10px', borderRadius: '4px' }}>
        <p>🔄 This should update in real-time!</p>
        <canvas ref={chartRef} width="400" height="200"></canvas>
      </div>
    </div>
  );
}

function Remote1Settings() {
  return (
    <div>
      <h3>Remote1 Settings</h3>
      <p>Configure your preferences here.</p>
    </div>
  );
}

export function Remote1Routes() {
  return (
    <div style={{ border: '1px solid #ccc', padding: 16, borderRadius: 8 }}>
      <h2>Remote1</h2>
      <nav style={{ marginBottom: 12 }}>
        <Link to="/remote1/" style={{ marginRight: 12 }}>Home</Link>
        <Link to="/remote1/products" style={{ marginRight: 12 }}>Products</Link>
        <Link to="/remote1/settings">Settings</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Remote1Home />} />
        <Route path="/products" element={<Remote1Products />} />
        <Route path="/settings" element={<Remote1Settings />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return <Remote1Routes />;
}


