export interface UserPermissions {
  canViewWidget: boolean;
  canEditData: boolean;
  canAccessAdmin: boolean;
}

class PermissionService {
  private permissions: UserPermissions = {
    canViewWidget: false,
    canEditData: false,
    canAccessAdmin: false
  };

  private subscribers: Array<(permissions: UserPermissions) => void> = [];

  getPermissions(): UserPermissions {
    return { ...this.permissions };
  }

  updatePermissions(updates: Partial<UserPermissions>): void {
    this.permissions = { ...this.permissions, ...updates };
    console.log('PermissionService: Permissions updated', this.permissions);
    
    // Notify all subscribers
    this.subscribers.forEach(callback => {
      callback(this.permissions);
    });

    // Store in localStorage for persistence
    localStorage.setItem('userPermissions', JSON.stringify(this.permissions));
  }

  subscribe(callback: (permissions: UserPermissions) => void): () => void {
    this.subscribers.push(callback);
    
    // Return unsubscribe function
    return () => {
      const index = this.subscribers.indexOf(callback);
      if (index > -1) {
        this.subscribers.splice(index, 1);
      }
    };
  }

  // Load permissions from localStorage on initialization
  loadFromStorage(): void {
    try {
      const stored = localStorage.getItem('userPermissions');
      if (stored) {
        this.permissions = { ...this.permissions, ...JSON.parse(stored) };
        console.log('PermissionService: Loaded permissions from storage', this.permissions);
      }
    } catch (error) {
      console.error('PermissionService: Failed to load permissions from storage', error);
    }
  }

  // Reset to default permissions
  resetPermissions(): void {
    this.updatePermissions({
      canViewWidget: false,
      canEditData: false,
      canAccessAdmin: false
    });
  }
}

// Create singleton instance
export const permissionService = new PermissionService();

// Initialize by loading from storage
permissionService.loadFromStorage();
