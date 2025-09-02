import { useState, useEffect } from 'react';
import { permissionService, UserPermissions } from '@acme/shared/data-access-permissions';
import { DataTable, Chart as HeavyChart, Modal, Form, NotificationContainer, useNotifications, useModal } from '@acme/shared/ui-components';

export default function App() {
  const [permissions, setPermissions] = useState<UserPermissions>(permissionService.getPermissions());
  const [hasAccess, setHasAccess] = useState(permissions.canAccessRemote2);
  const { notifications, addNotification, removeNotification } = useNotifications();
  const { open, close, isOpen } = useModal();

  useEffect(() => {
    console.log('Remote2: Setting up permission subscription');
    const unsubscribe = permissionService.subscribe((newPermissions) => {
      console.log('Remote2: Received permission update', newPermissions);
      setPermissions(newPermissions);
      setHasAccess(newPermissions.canAccessRemote2);
      
      // If access is revoked, redirect to Remote1
      if (!newPermissions.canAccessRemote2) {
        setTimeout(() => {
          window.location.href = '/remote1';
        }, 1000);
      }
    });
    
    return unsubscribe;
  }, []);

  const navigateToRemote1 = () => {
    // Navigate to remote1 using the shell's routing
    window.location.href = '/remote1';
  };

  // Show access denied message if no permission
  if (!hasAccess) {
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ 
          backgroundColor: '#fef2f2', 
          padding: '20px', 
          borderRadius: '8px',
          border: '1px solid #fecaca',
          textAlign: 'center'
        }}>
          <h1 style={{ color: '#dc2626', marginBottom: '20px' }}>Access Denied</h1>
          <h2 style={{ color: '#991b1b', marginBottom: '15px' }}>Remote 2 Access Revoked</h2>
          <p style={{ color: '#7f1d1d', lineHeight: '1.6', marginBottom: '20px' }}>
            You no longer have permission to access Remote 2. 
            Please contact your administrator or go back to Remote 1 to restore access.
          </p>
          <div style={{ marginTop: '20px' }}>
            <p style={{ color: '#7f1d1d', fontSize: '14px' }}>
              Redirecting to Remote 1 in a moment...
            </p>
            <button 
              onClick={navigateToRemote1}
              style={{
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                marginTop: '10px'
              }}
            >
              Go to Remote1 Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#2563eb', marginBottom: '20px' }}>Remote 2 Application</h1>
      
      {/* Dashboard Section */}
      {permissions.canViewRemote2Dashboard && (
        <div style={{ 
          backgroundColor: '#f0fdf4', 
          padding: '20px', 
          borderRadius: '8px',
          border: '1px solid #bbf7d0',
          marginBottom: '20px'
        }}>
          <h2 style={{ color: '#166534', marginBottom: '15px' }}>📊 Dashboard Section</h2>
          <p style={{ color: '#15803d', lineHeight: '1.6', marginBottom: '15px' }}>
            This is the dashboard section. You can see this because you have "View Dashboard Section" permission.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '6px', border: '1px solid #dcfce7' }}>
              <h4 style={{ color: '#166534', marginBottom: '8px' }}>Total Users</h4>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#15803d' }}>1,234</p>
            </div>
            <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '6px', border: '1px solid #dcfce7' }}>
              <h4 style={{ color: '#166534', marginBottom: '8px' }}>Active Sessions</h4>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#15803d' }}>89</p>
            </div>
            <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '6px', border: '1px solid #dcfce7' }}>
              <h4 style={{ color: '#166534', marginBottom: '8px' }}>Revenue</h4>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#15803d' }}>$12,345</p>
            </div>
          </div>
          
          {/* Add Heavy Chart to Dashboard */}
          <div style={{ marginTop: '20px' }}>
            <HeavyChart
              type="bar"
              data={[
                { label: 'Q1', value: 1200 },
                { label: 'Q2', value: 1900 },
                { label: 'Q3', value: 3000 },
                { label: 'Q4', value: 2800 }
              ]}
              width={600}
              height={300}
            />
          </div>
        </div>
      )}

      {/* Analytics Section */}
      {permissions.canViewRemote2Analytics && (
        <div style={{ 
          backgroundColor: '#fef3c7', 
          padding: '20px', 
          borderRadius: '8px',
          border: '1px solid #fde68a',
          marginBottom: '20px'
        }}>
          <h2 style={{ color: '#92400e', marginBottom: '15px' }}>📈 Analytics Section</h2>
          <p style={{ color: '#b45309', lineHeight: '1.6', marginBottom: '15px' }}>
            This is the analytics section. You can see this because you have "View Analytics Section" permission.
          </p>
          <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '6px', border: '1px solid #fde68a' }}>
            <h4 style={{ color: '#92400e', marginBottom: '10px' }}>Performance Metrics</h4>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <div>
                <span style={{ color: '#b45309' }}>Page Load Time: </span>
                <strong style={{ color: '#92400e' }}>1.2s</strong>
              </div>
              <div>
                <span style={{ color: '#b45309' }}>Bounce Rate: </span>
                <strong style={{ color: '#92400e' }}>23%</strong>
              </div>
              <div>
                <span style={{ color: '#b45309' }}>Conversion: </span>
                <strong style={{ color: '#92400e' }}>4.5%</strong>
              </div>
            </div>
          </div>
          
          {/* Add DataTable to Analytics */}
          <div style={{ marginTop: '20px' }}>
            <DataTable
              data={[
                { id: 1, metric: 'Page Views', value: '45,678', trend: '+12%' },
                { id: 2, metric: 'Unique Visitors', value: '23,456', trend: '+8%' },
                { id: 3, metric: 'Session Duration', value: '3m 45s', trend: '+5%' },
                { id: 4, metric: 'Conversion Rate', value: '4.5%', trend: '+2%' }
              ]}
              columns={[
                { key: 'metric', title: 'Metric' },
                { key: 'value', title: 'Value' },
                { key: 'trend', title: 'Trend' }
              ]}
            />
          </div>
        </div>
      )}

      {/* Settings Section */}
      {permissions.canViewRemote2Settings && (
        <div style={{ 
          backgroundColor: '#e0e7ff', 
          padding: '20px', 
          borderRadius: '8px',
          border: '1px solid #c7d2fe',
          marginBottom: '20px'
        }}>
          <h2 style={{ color: '#3730a3', marginBottom: '15px' }}>⚙️ Settings Section</h2>
          <p style={{ color: '#4338ca', lineHeight: '1.6', marginBottom: '15px' }}>
            This is the settings section. You can see this because you have "View Settings Section" permission.
          </p>
          <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '6px', border: '1px solid #c7d2fe' }}>
            <h4 style={{ color: '#3730a3', marginBottom: '10px' }}>Application Settings</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="checkbox" defaultChecked />
                <span style={{ color: '#4338ca' }}>Enable notifications</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="checkbox" />
                <span style={{ color: '#4338ca' }}>Dark mode</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="checkbox" defaultChecked />
                <span style={{ color: '#4338ca' }}>Auto-save</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Edit Data Section */}
      {permissions.canEditRemote2Data && (
        <div style={{ 
          backgroundColor: '#fce7f3', 
          padding: '20px', 
          borderRadius: '8px',
          border: '1px solid #fbcfe8',
          marginBottom: '20px'
        }}>
          <h2 style={{ color: '#be185d', marginBottom: '15px' }}>✏️ Edit Data Section</h2>
          <p style={{ color: '#d946ef', lineHeight: '1.6', marginBottom: '15px' }}>
            This is the data editing section. You can see this because you have "Edit Data Section" permission.
          </p>
          <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '6px', border: '1px solid #fbcfe8' }}>
            <h4 style={{ color: '#be185d', marginBottom: '10px' }}>Data Management</h4>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button 
                style={{
                  backgroundColor: '#be185d',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
                onClick={() => alert('Create new record')}
              >
                Create New
              </button>
              <button 
                style={{
                  backgroundColor: '#d946ef',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
                onClick={() => alert('Update existing record')}
              >
                Update
              </button>
              <button 
                style={{
                  backgroundColor: '#ec4899',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
                onClick={() => alert('Delete record')}
              >
                Delete
              </button>
            </div>
          </div>
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

      {/* Permission Status */}
      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        backgroundColor: '#f0fdf4', 
        borderRadius: '8px',
        border: '1px solid #bbf7d0'
      }}>
        <h4 style={{ color: '#166534', marginBottom: '10px' }}>Current Permissions</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
          <div style={{ color: '#15803d', fontSize: '14px' }}>
            Dashboard: {permissions.canViewRemote2Dashboard ? '✅' : '❌'}
          </div>
          <div style={{ color: '#15803d', fontSize: '14px' }}>
            Analytics: {permissions.canViewRemote2Analytics ? '✅' : '❌'}
          </div>
          <div style={{ color: '#15803d', fontSize: '14px' }}>
            Settings: {permissions.canViewRemote2Settings ? '✅' : '❌'}
          </div>
          <div style={{ color: '#15803d', fontSize: '14px' }}>
            Edit Data: {permissions.canEditRemote2Data ? '✅' : '❌'}
          </div>
        </div>
      </div>
      
      {/* Notification Container */}
      <NotificationContainer 
        notifications={notifications} 
        onClose={removeNotification} 
      />
    </div>
  );
}










