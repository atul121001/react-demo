import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Lazy load the Remote1Routes component
const Remote1Routes = lazy(() => import('@acme/remote1'));

// Lazy load the Remote2 component
const Remote2App = lazy(() => import('@acme/remote2'));

function ShellHome() {
  return (
    <div>
      <h2><span role="img" aria-label="house">🏠</span> Shell Home - HMR Working!</h2>
      <p style={{ color: 'blue', fontWeight: 'bold' }}>
        Shell HMR Update at {new Date().toLocaleTimeString()}
      </p>
      <p>This should update instantly without page refresh!</p>
    </div>
  );
}

function LoadingFallback({ remoteName }: { remoteName: string }) {
  return <div>Loading {remoteName}...</div>;
}

export default function App() {
  return (
    <Router>
      <nav style={{ padding: 16, borderBottom: '1px solid #ddd' }}>
        <Link to="/" style={{ marginRight: 16 }}>Home</Link>
        <Link to="/remote1" style={{ marginRight: 16 }}>Remote1</Link>
        <Link to="/remote2">Remote2</Link>
      </nav>
      <div style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<ShellHome />} />
          <Route 
            path="/remote1/*" 
            element={
              <Suspense fallback={<LoadingFallback remoteName="Remote1" />}>
                <Remote1Routes />
              </Suspense>
            } 
          />
          <Route 
            path="/remote2" 
            element={
              <Suspense fallback={<LoadingFallback remoteName="Remote2" />}>
                <Remote2App />
              </Suspense>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}


