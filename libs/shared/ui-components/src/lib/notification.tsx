import React, { useState, useEffect, useCallback } from 'react';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
  closable?: boolean;
  actions?: Array<{
    label: string;
    onClick: () => void;
    style?: 'primary' | 'secondary';
  }>;
}

export interface NotificationProps {
  notification: Notification;
  onClose: (id: string) => void;
}

export function NotificationComponent({ notification, onClose }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (notification.duration && notification.duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, notification.duration);

      return () => clearTimeout(timer);
    }
  }, [notification.duration]);

  const handleClose = useCallback(() => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose(notification.id);
    }, 300); // Match animation duration
  }, [notification.id, onClose]);

  const getTypeStyles = () => {
    switch (notification.type) {
      case 'success':
        return {
          backgroundColor: '#d4edda',
          borderColor: '#c3e6cb',
          color: '#155724',
          icon: '✓'
        };
      case 'error':
        return {
          backgroundColor: '#f8d7da',
          borderColor: '#f5c6cb',
          color: '#721c24',
          icon: '✕'
        };
      case 'warning':
        return {
          backgroundColor: '#fff3cd',
          borderColor: '#ffeaa7',
          color: '#856404',
          icon: '⚠'
        };
      default:
        return {
          backgroundColor: '#d1ecf1',
          borderColor: '#bee5eb',
          color: '#0c5460',
          icon: 'ℹ'
        };
    }
  };

  const typeStyles = getTypeStyles();

  return (
    <div
      style={{
        backgroundColor: typeStyles.backgroundColor,
        border: `1px solid ${typeStyles.borderColor}`,
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        minWidth: '300px',
        transform: isVisible && !isLeaving ? 'translateX(0)' : 'translateX(100%)',
        opacity: isVisible && !isLeaving ? 1 : 0,
        transition: 'all 0.3s ease-in-out',
        position: 'relative'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        {/* Icon */}
        <div
          style={{
            fontSize: '20px',
            color: typeStyles.color,
            flexShrink: 0,
            marginTop: '2px'
          }}
        >
          {typeStyles.icon}
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h4
            style={{
              margin: '0 0 4px 0',
              fontSize: '16px',
              fontWeight: '600',
              color: typeStyles.color
            }}
          >
            {notification.title}
          </h4>
          
          {notification.message && (
            <p
              style={{
                margin: '0 0 12px 0',
                fontSize: '14px',
                color: typeStyles.color,
                lineHeight: '1.4'
              }}
            >
              {notification.message}
            </p>
          )}

          {/* Actions */}
          {notification.actions && notification.actions.length > 0 && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {notification.actions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.onClick}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    backgroundColor: action.style === 'primary' ? typeStyles.color : 'transparent',
                    color: action.style === 'primary' ? 'white' : typeStyles.color,
                    border: action.style === 'primary' ? 'none' : `1px solid ${typeStyles.color}`
                  }}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Close button */}
        {notification.closable !== false && (
          <button
            onClick={handleClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '18px',
              color: typeStyles.color,
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px',
              flexShrink: 0,
              opacity: 0.7,
              transition: 'opacity 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.7';
            }}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

// Notification Manager Hook
export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification: Notification = {
      id,
      duration: 5000, // Default 5 seconds
      closable: true,
      ...notification
    };

    setNotifications(prev => [...prev, newNotification]);
    return id;
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  // Convenience methods
  const success = useCallback((title: string, message?: string, options?: Partial<Notification>) => {
    return addNotification({ type: 'success', title, message, ...options });
  }, [addNotification]);

  const error = useCallback((title: string, message?: string, options?: Partial<Notification>) => {
    return addNotification({ type: 'error', title, message, ...options });
  }, [addNotification]);

  const warning = useCallback((title: string, message?: string, options?: Partial<Notification>) => {
    return addNotification({ type: 'warning', title, message, ...options });
  }, [addNotification]);

  const info = useCallback((title: string, message?: string, options?: Partial<Notification>) => {
    return addNotification({ type: 'info', title, message, ...options });
  }, [addNotification]);

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info
  };
}

// Notification Container Component
export function NotificationContainer({ notifications, onClose }: { 
  notifications: Notification[]; 
  onClose: (id: string) => void; 
}) {
  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        maxHeight: '100vh',
        overflow: 'hidden'
      }}
    >
      {notifications.map(notification => (
        <NotificationComponent
          key={notification.id}
          notification={notification}
          onClose={onClose}
        />
      ))}
    </div>
  );
}
