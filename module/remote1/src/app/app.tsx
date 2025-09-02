import { Routes, Route, Link } from 'react-router-dom';
import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import Chart from 'chart.js/auto';
import * as lodash from 'lodash';
// import { permissionService, UserPermissions } from '@acme/shared/data-access-permissions';
// import { 
//   DataTable, 
//   Chart as HeavyChart, 
//   Modal, 
//   Form, 
//   NotificationContainer,
//   useNotifications,
//   useModal
// } from '@acme/shared/ui-components';
import { Common, permissionService, UserPermissions } from '@acme/shared/common';

function Remote1Home() {
  // Test tree shaking - lodash imported but NOT USED
  // const data = [1, 2, 3, 4, 5];
  // const doubled = lodash.map(data, x => x * 2); // COMMENTED OUT - not used
  
  // Use the shared permission service
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

  const toggleWidgetPermission = () => {
    permissionService.updatePermissions({
      canViewWidget: !permissions.canViewWidget
    });
  };

  // const toggleRemote2Access = () => {
  //   permissionService.updatePermissions({
  //     canAccessRemote2: !permissions.canAccessRemote2
  //   });
  //   success('Permission Updated', `Remote2 access ${!permissions.canAccessRemote2 ? 'granted' : 'revoked'}`);
  // };

  // const handleFormSubmit = (data: Record<string, any>) => {
  //   console.log('Form submitted:', data);
  //   success('Form Submitted', 'Your data has been saved successfully!');
  //   closeModal();
  // };
  
  return (
    <div>
      <h3>Remote1 Home - Using Shared Common Component!</h3>
      <p>Welcome to Remote1! Now using shared common library</p>
      <p style={{ color: 'green', fontWeight: 'bold' }}>This demonstrates Nx caching with shared libraries!</p>
      
      {/* Use the shared Common component */}
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
        <Common />
      </div>
      
      {/* Permission Controls for Remote2 */}
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fff3cd', borderRadius: '8px', border: '1px solid #ffeaa7' }}>
        <h4 style={{ color: '#856404', marginBottom: '15px' }}>🔐 Remote2 Permission Controls</h4>
        <p style={{ color: '#856404', marginBottom: '15px' }}>
          Toggle permissions that will affect what's shown in Remote2:
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '15px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input 
              type="checkbox" 
              checked={permissions.canViewWidget}
              onChange={toggleWidgetPermission}
            />
            <span style={{ color: '#856404' }}>Show Widget in Remote2</span>
          </label>
        </div>
        
        <div style={{ padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
          <h5 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#495057' }}>Current Status:</h5>
          <div style={{ fontSize: '12px', color: '#6c757d' }}>
            Widget Permission: {permissions.canViewWidget ? '✅ Enabled' : '❌ Disabled'}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h4>Navigation</h4>
        <button 
          onClick={navigateToRemote2}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          Go to Remote2
        </button>
        <p style={{ fontSize: '12px', color: '#6c757d', marginTop: '8px' }}>
          Navigate to Remote2 to see how permissions affect the widget visibility
        </p>
      </div>
    </div>
  );
}

function Remote1Routes() {
  return (
    <div style={{ border: '1px solid #ccc', padding: 16, borderRadius: 8 }}>
      <h2>Remote1</h2>
      <nav style={{ marginBottom: 12 }}>
        <Link to="/remote1/" style={{ marginRight: 12 }}>Home</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Remote1Home />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return <Remote1Routes />;
}