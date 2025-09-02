import { useState, useEffect } from 'react';
// import { permissionService, UserPermissions } from '@acme/shared/data-access-permissions';
// import { DataTable, Chart as HeavyChart, Modal, Form, NotificationContainer, useNotifications, useModal } from '@acme/shared/ui-components';
import { Common, permissionService, UserPermissions } from '@acme/shared/common';

export default function App() {
  // Use the shared permission service
  const [permissions, setPermissions] = useState<UserPermissions>(permissionService.getPermissions());

  useEffect(() => {
    console.log('Remote2: Setting up permission subscription');
    const unsubscribe = permissionService.subscribe((newPermissions) => {
      console.log('Remote2: Received permission update', newPermissions);
      setPermissions(newPermissions);
    });
    return unsubscribe;
  }, []);

  const navigateToRemote1 = () => {
    // Navigate to remote1 using the shell's routing
    window.location.href = '/remote1';
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#2563eb', marginBottom: '20px' }}>Remote 2 Application - Updated123!</h1>
      
      {/* Use the shared Common component */}
      <div style={{ 
        backgroundColor: '#f0fdf4', 
        padding: '20px', 
        borderRadius: '8px',
        border: '1px solid #bbf7d0',
        marginBottom: '20px'
      }}>
        <h2 style={{ color: '#166534', marginBottom: '15px' }}>📊 Shared Component Demo</h2>
        <p style={{ color: '#15803d', lineHeight: '1.6', marginBottom: '15px' }}>
          This section demonstrates the shared Common component from the library.
        </p>
        <Common />
      </div>

      {/* Conditional Widget - Only shows if permission is granted */}
      {permissions.canViewWidget ? (
        <div style={{ 
          backgroundColor: '#d1ecf1', 
          padding: '20px', 
          borderRadius: '8px',
          border: '1px solid #bee5eb',
          marginBottom: '20px'
        }}>
          <h2 style={{ color: '#0c5460', marginBottom: '15px' }}>🎯 Special Widget</h2>
          <p style={{ color: '#0c5460', lineHeight: '1.6', marginBottom: '15px' }}>
            This widget is only visible because you have the "Can View Widget" permission enabled!
          </p>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '15px', 
            borderRadius: '6px', 
            border: '1px solid #bee5eb',
            marginBottom: '15px'
          }}>
            <h4 style={{ color: '#0c5460', marginBottom: '10px' }}>Widget Content</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
              <div style={{ padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                <strong>Metric 1:</strong> 1,234
              </div>
              <div style={{ padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                <strong>Metric 2:</strong> 567
              </div>
              <div style={{ padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                <strong>Metric 3:</strong> 890
              </div>
            </div>
          </div>
          <p style={{ fontSize: '12px', color: '#6c757d', fontStyle: 'italic' }}>
            💡 Toggle the "Show Widget in Remote2" permission in Remote1 to hide/show this widget
          </p>
        </div>
      ) : (
        <div style={{ 
          backgroundColor: '#f8d7da', 
          padding: '20px', 
          borderRadius: '8px',
          border: '1px solid #f5c6cb',
          marginBottom: '20px'
        }}>
          <h2 style={{ color: '#721c24', marginBottom: '15px' }}>🚫 Widget Hidden</h2>
          <p style={{ color: '#721c24', lineHeight: '1.6', marginBottom: '15px' }}>
            The special widget is hidden because you don't have the "Can View Widget" permission.
          </p>
          <p style={{ fontSize: '12px', color: '#6c757d' }}>
            💡 Go to Remote1 and enable "Show Widget in Remote2" permission to see the widget
          </p>
        </div>
      )}

      {/* Navigation Section */}
      <div style={{ 
        backgroundColor: '#f8fafc', 
        padding: '20px', 
        borderRadius: '8px',
        border: '1px solid #e2e8f0'
      }}>
        <h4 style={{ color: '#475569', marginBottom: '10px' }}>Navigation</h4>
        <p style={{ color: '#64748b', marginBottom: '15px' }}>Navigate between microfrontends:</p>
        <button 
          onClick={navigateToRemote1}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            marginRight: '10px'
          }}
        >
          Go to Remote1
        </button>
      </div>
    </div>
  );
}
