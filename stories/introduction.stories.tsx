import React from 'react';

export default {
  title: 'Design System/Introduction',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Welcome to the @acme/ui Design System documentation.'
      }
    }
  }
};

export const Welcome = () => (
  <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', maxWidth: '800px' }}>
    <h1>🎨 @acme/ui Design System</h1>
    <p>A comprehensive React component library built with modern development practices.</p>
    
    <h2>📚 Components</h2>
    <ul>
      <li><strong>Hero</strong> - Hero sections with title, subtitle, and call-to-action</li>
      <li><strong>Ui</strong> - Basic UI component</li>
    </ul>
    
    <h2>🚀 Installation & Usage</h2>
    <pre style={{ 
      background: '#f5f5f5', 
      padding: '20px', 
      borderRadius: '8px',
      fontSize: '14px',
      overflowX: 'auto'
    }}>
{`npm install @acme/ui

import { Hero, Ui } from '@acme/ui';

function App() {
  return (
    <div>
      <Hero 
        title="Welcome"
        subtitle="Build amazing things"
        cta="Get Started"
        onCtaClick={() => console.log('clicked')}
      />
      <Ui />
    </div>
  );
}`}
    </pre>
    
    <h2>🎯 Design Principles</h2>
    <ul>
      <li><strong>Consistency</strong> - Uniform design across all components</li>
      <li><strong>Accessibility</strong> - WCAG 2.1 AA compliant</li>
      <li><strong>Performance</strong> - Optimized for modern browsers</li>
      <li><strong>Developer Experience</strong> - TypeScript support and clear APIs</li>
    </ul>
  </div>
);

Welcome.parameters = {
  layout: 'fullscreen'
};
