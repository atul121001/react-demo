import { useState, useEffect } from 'react';
import styles from './common.module.css';
import { permissionService, UserPermissions } from './permission.service';

export function Common() {
  const [permissions, setPermissions] = useState<UserPermissions>(permissionService.getPermissions());

  useEffect(() => {
    console.log('Common: Setting up permission subscription');
    const unsubscribe = permissionService.subscribe((newPermissions) => {
      console.log('Common: Received permission update', newPermissions);
      setPermissions(newPermissions);
    });
    return unsubscribe;
  }, []);

  const handleClick = () => {
    console.log('Common component clicked from shared library!');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Component source: @acme/shared/common');
    console.log('Current permissions:', permissions);
  };

  const toggleWidgetPermission = () => {
    permissionService.updatePermissions({
      canViewWidget: !permissions.canViewWidget
    });
  };

  const toggleEditPermission = () => {
    permissionService.updatePermissions({
      canEditData: !permissions.canEditData
    });
  };

  const toggleAdminPermission = () => {
    permissionService.updatePermissions({
      canAccessAdmin: !permissions.canAccessAdmin
    });
  };

  return (
    <div className={styles['container']}>
      <h1>Welcome to Common!</h1>
      <p>This is a shared component from the common library.</p>
      
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3 style={{ marginBottom: '15px', color: '#495057' }}>Permission Controls</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input 
              type="checkbox" 
              checked={permissions.canViewWidget}
              onChange={toggleWidgetPermission}
            />
            <span>Can View Widget (affects Remote2)</span>
          </label>
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input 
              type="checkbox" 
              checked={permissions.canEditData}
              onChange={toggleEditPermission}
            />
            <span>Can Edit Data</span>
          </label>
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input 
              type="checkbox" 
              checked={permissions.canAccessAdmin}
              onChange={toggleAdminPermission}
            />
            <span>Can Access Admin</span>
          </label>
        </div>
        
        <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#e9ecef', borderRadius: '4px' }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Current Permissions:</h4>
          <div style={{ fontSize: '12px', color: '#6c757d' }}>
            Widget: {permissions.canViewWidget ? '✅' : '❌'} | 
            Edit: {permissions.canEditData ? '✅' : '❌'} | 
            Admin: {permissions.canAccessAdmin ? '✅' : '❌'}
          </div>
        </div>
      </div>
      
      <button onClick={handleClick} style={{
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        marginTop: '15px'
      }}>
        Click me to log to console
      </button>
    </div>
  );
}

export default Common;