import { Routes, Route, Link } from 'react-router-dom';
import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import Chart from 'chart.js/auto';
import * as lodash from 'lodash';
import { permissionService, UserPermissions } from '@acme/shared/data-access-permissions';
import { 
  DataTable, 
  Chart as HeavyChart, 
  Modal, 
  Form, 
  NotificationContainer,
  useNotifications,
  useModal
} from '@acme/shared/ui-components';

function Remote1Home() {
  // Test tree shaking - lodash imported but NOT USED
  // const data = [1, 2, 3, 4, 5];
  // const doubled = lodash.map(data, x => x * 2); // COMMENTED OUT - not used
  
  const [permissions, setPermissions] = useState<UserPermissions>(permissionService.getPermissions());
  const { notifications, removeNotification, success, error } = useNotifications();
  const { isOpen: isModalOpen, open: openModal, close: closeModal } = useModal();
  
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
    success('Permission Updated', `Remote2 access ${!permissions.canAccessRemote2 ? 'granted' : 'revoked'}`);
  };

  const handleFormSubmit = (data: Record<string, any>) => {
    console.log('Form submitted:', data);
    success('Form Submitted', 'Your data has been saved successfully!');
    closeModal();
  };
  
  return (
    <div>
      <h3>Remote1 Home - Heavy UI Components Demo!</h3>
      <p>Welcome to Remote1! Now using heavy UI components library</p>
      <p style={{ color: 'green', fontWeight: 'bold' }}>This demonstrates Nx caching with heavy libraries!</p>
      
      {/* Heavy Chart Component */}
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
        <h4>Heavy Chart Component</h4>
        <HeavyChart 
          data={[
            { label: 'Q1', value: 120 },
            { label: 'Q2', value: 190 },
            { label: 'Q3', value: 300 },
            { label: 'Q4', value: 250 }
          ]}
          type="bar"
          width={800}
          height={500}
        />
      </div>

      {/* Heavy Data Table Component */}
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
        <h4>Heavy Data Table Component</h4>
        <DataTable
          data={[
            { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
            { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Moderator', status: 'Active' },
            { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Pending' },
            { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'Active' }
          ]}
          columns={[
            { key: 'id', title: 'ID', sortable: true },
            { key: 'name', title: 'Name', sortable: true },
            { key: 'email', title: 'Email', sortable: true },
            { key: 'role', title: 'Role', sortable: true },
            { 
              key: 'status', 
              title: 'Status', 
              sortable: true,
              render: (value: any) => (
                <span style={{ 
                  padding: '4px 8px', 
                  borderRadius: '4px',
                  backgroundColor: value === 'Active' ? '#d4edda' : value === 'Inactive' ? '#f8d7da' : '#fff3cd',
                  color: value === 'Active' ? '#155724' : value === 'Inactive' ? '#721c24' : '#856404'
                }}>
                  {value}
                </span>
              )
            }
          ]}
          pageSize={3}
          searchable={true}
        />
      </div>
      
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
        <h4>Heavy UI Components Demo</h4>
        <p>Test the heavy components:</p>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button 
            onClick={openModal}
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
            Open Heavy Form Modal
          </button>
          <button 
            onClick={() => success('Test Notification', 'This is a test notification from Remote1!')}
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            Show Notification
          </button>
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

      {/* Heavy Modal with Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Heavy Form Modal"
        size="large"
      >
        <Form
          fields={[
            { name: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'Enter your name' },
            { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'Enter your email' },
            { name: 'role', label: 'Role', type: 'select', required: true, options: [
              { value: 'admin', label: 'Administrator' },
              { value: 'user', label: 'User' },
              { value: 'moderator', label: 'Moderator' }
            ]},
            { name: 'bio', label: 'Bio', type: 'textarea', placeholder: 'Tell us about yourself' },
            { name: 'newsletter', label: 'Subscribe to newsletter', type: 'checkbox' }
          ]}
          onSubmit={handleFormSubmit}
          submitText="Save Data"
          resetText="Clear Form"
        />
      </Modal>

      {/* Notification Container */}
      <NotificationContainer 
        notifications={notifications} 
        onClose={removeNotification} 
      />
      
      {/* <p>Doubled values: {doubled.join(', ')}</p> */}
    </div>
  );
}

function Remote1Products() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const { success } = useNotifications();

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

  const handleProductClick = (productName: string) => {
    success('Product Selected', `You clicked on ${productName}!`);
  };

  return (
    <div>
      <h3>Remote1 Products - Heavy Components Demo!</h3>
      <p>List of products with heavy UI components... (HMR Update at {new Date().toLocaleTimeString()})</p>
      
      {/* Original Chart.js Chart */}
      <div style={{ background: '#f0f8ff', padding: '10px', borderRadius: '4px', marginBottom: '20px' }}>
        <p>Original Chart.js Chart:</p>
        <canvas ref={chartRef} width="400" height="200"></canvas>
      </div>

      {/* Heavy Chart Component */}
      <div style={{ background: '#f0f8ff', padding: '10px', borderRadius: '4px', marginBottom: '20px' }}>
        <p>Heavy Chart Component (Line Chart):</p>
        <HeavyChart 
          data={[
            { label: 'Jan', value: 65 },
            { label: 'Feb', value: 59 },
            { label: 'Mar', value: 80 },
            { label: 'Apr', value: 81 },
            { label: 'May', value: 56 },
            { label: 'Jun', value: 55 }
          ]}
          type="line"
          width={800}
          height={500}
        />
      </div>

      {/* Heavy Chart Component - Pie Chart */}
      <div style={{ background: '#f0f8ff', padding: '10px', borderRadius: '4px', marginBottom: '20px' }}>
        <p>Heavy Chart Component (Pie Chart):</p>
        <HeavyChart 
          data={[
            { label: 'Desktop', value: 45 },
            { label: 'Mobile', value: 35 },
            { label: 'Tablet', value: 20 }
          ]}
          type="pie"
          width={600}
          height={500}
        />
      </div>

      {/* Product Data Table */}
      <div style={{ background: '#f0f8ff', padding: '10px', borderRadius: '4px' }}>
        <p>Product Data Table:</p>
        <DataTable
          data={[
            { id: 1, name: 'Product A', category: 'Electronics', price: 299.99, stock: 50, rating: 4.5 },
            { id: 2, name: 'Product B', category: 'Clothing', price: 49.99, stock: 100, rating: 4.2 },
            { id: 3, name: 'Product C', category: 'Books', price: 19.99, stock: 200, rating: 4.8 },
            { id: 4, name: 'Product D', category: 'Home', price: 199.99, stock: 25, rating: 4.1 },
            { id: 5, name: 'Product E', category: 'Sports', price: 79.99, stock: 75, rating: 4.6 }
          ]}
          columns={[
            { key: 'id', title: 'ID', sortable: true },
            { key: 'name', title: 'Product Name', sortable: true },
            { key: 'category', title: 'Category', sortable: true },
            { key: 'price', title: 'Price', sortable: true, render: (value) => `$${value}` },
            { key: 'stock', title: 'Stock', sortable: true },
            { 
              key: 'rating', 
              title: 'Rating', 
              sortable: true,
              render: (value: any) => (
                <span style={{ 
                  padding: '4px 8px', 
                  borderRadius: '4px',
                  backgroundColor: value >= 4.5 ? '#d4edda' : value >= 4.0 ? '#fff3cd' : '#f8d7da',
                  color: value >= 4.5 ? '#155724' : value >= 4.0 ? '#856404' : '#721c24'
                }}>
                  ⭐ {value}
                </span>
              )
            },
            {
              key: 'actions',
              title: 'Actions',
              render: (value: any, row: any) => (
                <button 
                  onClick={() => handleProductClick(row.name)}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  View
                </button>
              )
            }
          ]}
          pageSize={3}
          searchable={true}
        />
      </div>
    </div>
  );
}

function Remote1Settings() {
  const { success, error, warning, info } = useNotifications();
  const { isOpen: isFormModalOpen, open: openFormModal, close: closeFormModal } = useModal();

  const handleSettingsSubmit = (data: Record<string, any>) => {
    console.log('Settings submitted:', data);
    success('Settings Saved', 'Your preferences have been updated successfully!');
    closeFormModal();
  };

  const testNotifications = () => {
    success('Success!', 'This is a success notification');
    setTimeout(() => error('Error!', 'This is an error notification'), 1000);
    setTimeout(() => warning('Warning!', 'This is a warning notification'), 2000);
    setTimeout(() => info('Info!', 'This is an info notification'), 3000);
  };

  return (
    <div>
      <h3>Remote1 Settings - Heavy Components Demo!</h3>
      <p>Configure your preferences with heavy UI components.</p>
      
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
        <h4>Notification System Test</h4>
        <p>Test all notification types:</p>
        <button 
          onClick={testNotifications}
          style={{
            backgroundColor: '#6f42c1',
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
          Test All Notifications
        </button>
        <button 
          onClick={openFormModal}
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
          Open Settings Form
        </button>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
        <h4>Settings Data Table</h4>
        <DataTable
          data={[
            { setting: 'Theme', value: 'Dark', category: 'Appearance', status: 'Active' },
            { setting: 'Language', value: 'English', category: 'Localization', status: 'Active' },
            { setting: 'Notifications', value: 'Enabled', category: 'Alerts', status: 'Active' },
            { setting: 'Auto-save', value: 'Disabled', category: 'Data', status: 'Inactive' },
            { setting: 'Analytics', value: 'Enabled', category: 'Privacy', status: 'Active' }
          ]}
          columns={[
            { key: 'setting', title: 'Setting', sortable: true },
            { key: 'value', title: 'Value', sortable: true },
            { key: 'category', title: 'Category', sortable: true },
            { 
              key: 'status', 
              title: 'Status', 
              sortable: true,
              render: (value: any) => (
                <span style={{ 
                  padding: '4px 8px', 
                  borderRadius: '4px',
                  backgroundColor: value === 'Active' ? '#d4edda' : '#f8d7da',
                  color: value === 'Active' ? '#155724' : '#721c24'
                }}>
                  {value}
                </span>
              )
            }
          ]}
          pageSize={5}
          searchable={true}
        />
      </div>

      {/* Settings Form Modal */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={closeFormModal}
        title="Settings Configuration"
        size="large"
      >
        <Form
          fields={[
            { name: 'theme', label: 'Theme', type: 'select', required: true, options: [
              { value: 'light', label: 'Light Theme' },
              { value: 'dark', label: 'Dark Theme' },
              { value: 'auto', label: 'Auto (System)' }
            ]},
            { name: 'language', label: 'Language', type: 'select', required: true, options: [
              { value: 'en', label: 'English' },
              { value: 'es', label: 'Spanish' },
              { value: 'fr', label: 'French' },
              { value: 'de', label: 'German' }
            ]},
            { name: 'notifications', label: 'Enable Notifications', type: 'checkbox' },
            { name: 'autoSave', label: 'Auto-save Changes', type: 'checkbox' },
            { name: 'analytics', label: 'Enable Analytics', type: 'checkbox' },
            { name: 'timezone', label: 'Timezone', type: 'select', options: [
              { value: 'utc', label: 'UTC' },
              { value: 'est', label: 'Eastern Time' },
              { value: 'pst', label: 'Pacific Time' },
              { value: 'cet', label: 'Central European Time' }
            ]},
            { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Describe your preferences...' }
          ]}
          onSubmit={handleSettingsSubmit}
          submitText="Save Settings"
          resetText="Reset to Defaults"
        />
      </Modal>
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


