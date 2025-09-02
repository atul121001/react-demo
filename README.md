# Nx React Microfrontend Workspace

A modern microfrontend architecture built with Nx, React, and Vite, featuring dynamic imports, granular permission-based access control, and optimized CI/CD workflows.

## 🏗️ Architecture Overview

This workspace implements a **microfrontend architecture** with three main applications:

- **Shell App** (`apps/shell`) - Main container application that dynamically loads microfrontends
- **Remote1** (`module/remote1`) - Permission management microfrontend
- **Remote2** (`module/remote2`) - Content microfrontend with granular section-based permissions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm

### Installation
```bash
# Install dependencies
npm install

# Start the development server
npx nx serve shell
```

The application will be available at `http://localhost:4200/`

## 📁 Project Structure

```
nx-react/
├── apps/
│   └── shell/                    # Main container application
├── module/
│   ├── remote1/                  # Permission management microfrontend
│   └── remote2/                  # Content microfrontend
├── libs/
│   └── shared/
│       ├── ui-components/        # Shared UI components
│       └── data-access-permissions/ # Permission service
├── scripts/
│   └── test-nx-cache.ps1        # Nx caching demonstration script
└── .gitlab-ci.yml               # GitLab CI/CD configuration
```

## 🎯 Key Features

### 1. Dynamic Microfrontend Loading
- **Shell app** dynamically imports Remote1 and Remote2 using React's `lazy()` and `Suspense`
- **Code splitting** for optimal bundle sizes
- **Independent deployment** capability for each microfrontend

### 2. Granular Permission System
- **Real-time permission updates** across microfrontends
- **Section-based access control** for Remote2:
  - 📊 Dashboard Section
  - 📈 Analytics Section  
  - ⚙️ Settings Section
  - ✏️ Edit Data Section
- **Persistent storage** using localStorage
- **Cross-microfrontend communication** via custom events

### 3. Nx Workspace Benefits
- **Intelligent caching** - Only rebuilds changed projects
- **Dependency graph** - Automatic dependency resolution
- **Monorepo management** - Single repository for all applications
- **Consistent tooling** - Shared ESLint, TypeScript, and build configurations

## 🔧 Development Commands

### Build Commands
```bash
# Build all applications
npx nx run-many --target=build --projects=shell,remote1,remote2

# Build only shell (includes dependencies)
npx nx build shell

# Build specific application
npx nx build remote1
npx nx build remote2
```

### Development Commands
```bash
# Start shell application
npx nx serve shell

# Start individual microfrontends
npx nx serve remote1
npx nx serve remote2
```

### Testing Commands
```bash
# Test all projects
npx nx run-many --target=test --all

# Test specific project
npx nx test shell
```

### Linting Commands
```bash
# Lint all projects
npx nx run-many --target=lint --all

# Lint specific project
npx nx lint shell
```

## 🎮 Permission System Usage

### Testing the Permission Flow

1. **Start the application**:
   ```bash
   npx nx serve shell
   ```

2. **Access Remote1** (Permission Management):
   - Navigate to `http://localhost:4200/remote1`
   - Use the "Remote2 Section Permissions" controls to toggle access

3. **Test Remote2** (Content Display):
   - Navigate to `http://localhost:4200/remote2`
   - Watch sections appear/disappear based on permissions
   - Real-time updates without page refresh

### Permission Controls

**Remote1 Permission Management:**
- ✅ **General Access** - Toggle access to entire Remote2 app
- ✅ **Dashboard Section** - Control dashboard visibility
- ✅ **Analytics Section** - Control analytics visibility  
- ✅ **Settings Section** - Control settings visibility
- ✅ **Edit Data Section** - Control data editing capabilities

**Remote2 Section Display:**
- 📊 **Dashboard** (Green) - User stats, revenue, sessions
- 📈 **Analytics** (Yellow) - Performance metrics
- ⚙️ **Settings** (Blue) - Application configuration
- ✏️ **Edit Data** (Pink) - Data management tools

## 🏗️ Build & Deployment

### Single App Deployment (Recommended)
Deploy only the **shell application** which bundles all dependencies:

```bash
# Build shell (includes all dependencies)
npx nx build shell

# Deploy dist/shell/ folder
```

### Microfrontend Deployment
Deploy each microfrontend independently:

```bash
# Build all applications
npx nx run-many --target=build --projects=shell,remote1,remote2

# Deploy each dist/ folder separately
```

## 🚀 CI/CD with GitLab

The workspace includes optimized GitLab CI/CD configuration:

### Pipeline Stages
1. **Build** - Builds shell application and dependencies
2. **Deploy Preview** - Deploys to staging environment
3. **Deploy Production** - Deploys to production environment

### Key Features
- **Nx caching** for faster builds
- **Single app deployment** strategy
- **Artifact management** for efficient deployments

## 🧪 Testing Nx Caching

Use the provided PowerShell script to demonstrate Nx's intelligent caching:

```powershell
# Run the caching demonstration
.\scripts\test-nx-cache.ps1
```

This script demonstrates:
- **Initial build** - Builds all projects
- **Unchanged build** - Uses cache for unchanged projects
- **Dependency change** - Rebuilds affected projects only

## 📚 Library Structure

### Shared Libraries

**`@acme/shared/ui-components`**
- Reusable UI components
- Storybook integration
- Consistent design system

**`@acme/shared/data-access-permissions`**
- Permission service with singleton pattern
- localStorage persistence
- Cross-microfrontend communication
- Real-time permission updates

### TypeScript Path Mappings

```json
{
  "@acme/remote1": ["module/remote1/src/app/app.tsx"],
  "@acme/remote2": ["module/remote2/src/app/app.tsx"],
  "@acme/shared/ui": ["libs/shared/ui-components/src/index.ts"],
  "@acme/shared/data-access-permissions": ["libs/shared/data-access-permissions/src/index.ts"]
}
```

## 🔍 Troubleshooting

### Common Issues

**Import Resolution Errors:**
```bash
# Clear Nx cache
npx nx reset

# Restart development server
npx nx serve shell
```

**Permission System Not Working:**
- Check browser console for debugging logs
- Verify localStorage is enabled
- Ensure both microfrontends are using the same permission service

**Build Failures:**
```bash
# Clean and rebuild
npx nx reset
npx nx build shell
```

## 🛠️ Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Monorepo**: Nx
- **Styling**: Inline styles (can be extended with CSS-in-JS)
- **State Management**: Custom permission service with localStorage
- **CI/CD**: GitLab CI
- **Package Manager**: npm

## 📖 Additional Resources

- [Nx Documentation](https://nx.dev)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Microfrontend Architecture Guide](https://micro-frontends.org)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.