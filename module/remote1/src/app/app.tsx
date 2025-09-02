import { Routes, Route, Link } from 'react-router-dom';
import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import Chart from 'chart.js/auto';
import * as lodash from 'lodash';
import { permissionService, UserPermissions } from '@acme/shared/data-access-permissions';

function Remote1Home() {
  // Test tree shaking - lodash imported but NOT USED
  // const data = [1, 2, 3, 4, 5];
  // const doubled = lodash.map(data, x => x * 2); // COMMENTED OUT - not used
  
  const [permissions, setPermissions] = useState<UserPermissions>(permissionService.getPermissions());
  
  useEffect(() => {
    console.log('Remote1: Setting up permission subscription');
    const unsubscribe = permissionService.subscribe((newPermissions) => {
      console.log('Remote1: Received permission update', newPermissions);
      setPermissions(newPermissions);
    });
    return unsubscribe;
  }, []);
  
  const navigateToRemote2 = () => {
    // Navigate to remote2 using the shell's routing
    window.location.href = '/remote2';
  };

  const toggleRemote2Access = () => {
    permissionService.updatePermissions({
      canAccessRemote2: !permissions.canAccessRemote2
    });
  };
  
  return (
    <div>
      <h3>Remote1 Home - HMR Test check now!</h3>
      <p>Welcome to Remote1! HMR is working</p>
      <p style={{ color: 'green', fontWeight: 'bold' }}>This change should appear instantly!</p>
      
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
        <h4>Permission Management</h4>
        <p>Control user access to Remote2 sections:</p>
        
        <div style={{ marginBottom: '15px' }}>
          <h5>General Access</h5>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <input 
              type="checkbox" 
              checked={permissions.canAccessRemote2}
              onChange={toggleRemote2Access}
            />
            Allow access to Remote2
          </label>
          <p style={{ fontSize: '12px', color: '#666' }}>
            Status: {permissions.canAccessRemote2 ? 'Access Granted' : 'Access Denied'}
          </p>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <h5>Remote2 Section Permissions</h5>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <input 
              type="checkbox" 
              checked={permissions.canViewRemote2Dashboard}
              onChange={(e) => permissionService.updatePermissions({ canViewRemote2Dashboard: e.target.checked })}
            />
            View Dashboard Section
          </label>
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <input 
              type="checkbox" 
              checked={permissions.canViewRemote2Analytics}
              onChange={(e) => permissionService.updatePermissions({ canViewRemote2Analytics: e.target.checked })}
            />
            View Analytics Section
          </label>
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <input 
              type="checkbox" 
              checked={permissions.canViewRemote2Settings}
              onChange={(e) => permissionService.updatePermissions({ canViewRemote2Settings: e.target.checked })}
            />
            View Settings Section
          </label>
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <input 
              type="checkbox" 
              checked={permissions.canEditRemote2Data}
              onChange={(e) => permissionService.updatePermissions({ canEditRemote2Data: e.target.checked })}
            />
            Edit Data Section
          </label>
        </div>
      </div>
      
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
        <h4>Microfrontend Navigation</h4>
        <p>Click the button below to navigate to Remote2:</p>
        <button 
          onClick={navigateToRemote2}
          disabled={!permissions.canAccessRemote2}
          style={{
            backgroundColor: permissions.canAccessRemote2 ? '#007bff' : '#ccc',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: permissions.canAccessRemote2 ? 'pointer' : 'not-allowed',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          Go to Remote2
        </button>
        {!permissions.canAccessRemote2 && (
          <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
            Access denied! Enable permission above to navigate.
          </p>
        )}
      </div>
      
      {/* <p>Doubled values: {doubled.join(', ')}</p> */}
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
      <h3>Remote1 Products - Updated now!</h3>
      <p>List of products... (HMR Update at {new Date().toLocaleTimeString()})</p>
      <div style={{ background: '#f0f8ff', padding: '10px', borderRadius: '4px' }}>
        <p>This should update in real-time!</p>
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


