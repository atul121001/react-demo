import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Lazy load the Remote1Routes component
const Remote1Routes = lazy(() => import('@acme/remote1').then(module => ({ 
  default: module.Remote1Routes 
})));

function ShellHome() {
  return (
    <div>
      <h2>🏠 Shell Home - HMR Working!</h2>
      <p style={{ color: 'blue', fontWeight: 'bold' }}>
        Shell HMR Update at {new Date().toLocaleTimeString()}
      </p>
      <p>This should update instantly without page refresh!</p>
    </div>
  );
}

function LoadingFallback() {
  return <div>Loading Remote1...</div>;
}

export default function App() {
  return (
    <Router>
      <nav style={{ padding: 16, borderBottom: '1px solid #ddd' }}>
        <Link to="/" style={{ marginRight: 16 }}>Home</Link>
        <Link to="/remote1">Remote1</Link>
      </nav>
      <div style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<ShellHome />} />
          <Route 
            path="/remote1/*" 
            element={
              <Suspense fallback={<LoadingFallback />}>
                <Remote1Routes />
              </Suspense>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}


