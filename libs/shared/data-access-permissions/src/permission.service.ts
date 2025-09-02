// Permission management service for microfrontend access control
export interface UserPermissions {
  canAccessRemote1: boolean;
  canAccessRemote2: boolean;
  canAccessAdmin: boolean;
  // Granular permissions for specific sections
  canViewRemote2Dashboard: boolean;
  canViewRemote2Analytics: boolean;
  canViewRemote2Settings: boolean;
  canEditRemote2Data: boolean;
}

export class PermissionService {
  private static instance: PermissionService;
  private permissions: UserPermissions;
  private listeners: Array<(permissions: UserPermissions) => void> = [];
  private storageKey = 'microfrontend-permissions';

  constructor() {
    // Load permissions from localStorage or use defaults
    this.permissions = this.loadPermissions();
    
    // Listen for storage changes from other tabs/windows
    window.addEventListener('storage', this.handleStorageChange.bind(this));
    
    // Listen for custom events from same tab
    window.addEventListener('permissions-updated', this.handleCustomEvent.bind(this));
  }

  private handleCustomEvent(event: Event): void {
    const customEvent = event as CustomEvent;
    console.log('PermissionService: Received custom event', customEvent.detail);
    this.permissions = customEvent.detail;
    this.notifyListeners();
  }

  private handleStorageChange(event: StorageEvent): void {
    if (event.key === this.storageKey && event.newValue) {
      try {
        const newPermissions = JSON.parse(event.newValue);
        console.log('PermissionService: Received storage change', newPermissions);
        this.permissions = newPermissions;
        this.notifyListeners();
      } catch (error) {
        console.warn('Failed to parse permissions from storage event:', error);
      }
    }
  }

  private loadPermissions(): UserPermissions {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to load permissions from localStorage:', error);
    }
    
    // Default permissions
    return {
      canAccessRemote1: true,
      canAccessRemote2: true,
      canAccessAdmin: false,
      // Granular permissions - all enabled by default
      canViewRemote2Dashboard: true,
      canViewRemote2Analytics: true,
      canViewRemote2Settings: true,
      canEditRemote2Data: true
    };
  }

  private savePermissions(): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.permissions));
    } catch (error) {
      console.warn('Failed to save permissions to localStorage:', error);
    }
  }

  static getInstance(): PermissionService {
    if (!PermissionService.instance) {
      PermissionService.instance = new PermissionService();
    }
    return PermissionService.instance;
  }

  getPermissions(): UserPermissions {
    return { ...this.permissions };
  }

  updatePermissions(newPermissions: Partial<UserPermissions>): void {
    console.log('PermissionService: Updating permissions', newPermissions);
    this.permissions = { ...this.permissions, ...newPermissions };
    console.log('PermissionService: New permissions state', this.permissions);
    this.savePermissions();
    this.notifyListeners();
    
    // Dispatch custom event for same-tab communication
    window.dispatchEvent(new CustomEvent('permissions-updated', { 
      detail: this.permissions 
    }));
  }

  subscribe(listener: (permissions: UserPermissions) => void): () => void {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  private notifyListeners(): void {
    console.log('PermissionService: Notifying', this.listeners.length, 'listeners');
    this.listeners.forEach((listener, index) => {
      try {
        console.log('PermissionService: Calling listener', index);
        listener(this.getPermissions());
      } catch (error) {
        console.error('Error in permission listener:', error);
      }
    });
  }

  // Check specific permission
  hasPermission(permission: keyof UserPermissions): boolean {
    return this.permissions[permission];
  }
}

// Global instance
export const permissionService = PermissionService.getInstance();
