import React from 'react';
import { Hero } from '../libs/ui/src/lib/hero';
import { Ui } from '../libs/ui/src/lib/ui';

export default {
  title: 'Design System/Usage Patterns',
  parameters: {
    layout: 'fullscreen'
  }
};

export const LandingPagePattern = () => (
  <div>
    <Hero 
      title="Welcome to Our Platform"
      subtitle="Build amazing applications with our component library"
      cta="Get Started Today"
      onCtaClick={() => alert('Navigation to signup page')}
    />
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <Ui />
      <p style={{ marginTop: '20px', color: '#666' }}>
        Combine Hero and Ui components for effective landing pages
      </p>
    </div>
  </div>
);

export const MarketingPattern = () => (
  <div>
    <Hero 
      title="Transform Your Business Today"
      subtitle="Join thousands of companies already using our platform to scale their operations"
      cta="Start Free Trial"
      onCtaClick={() => alert('Navigation to trial signup')}
    />
    <div style={{ padding: '40px', background: '#f8f9fa' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2>Why Choose Our Platform?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div style={{ textAlign: 'center' }}>
            <Ui />
            <p><strong>Reliable</strong></p>
            <p>99.9% uptime guarantee</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Ui />
            <p><strong>Scalable</strong></p>
            <p>Grows with your business</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Ui />
            <p><strong>Secure</strong></p>
            <p>Enterprise-grade security</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const ProductPattern = () => (
  <div>
    <Hero 
      title="Product Demo"
      subtitle="See how our components work in a real product interface"
      cta="Watch Demo"
      onCtaClick={() => alert('Open demo video')}
    />
  </div>
);

export const DocsAndDonts = () => (
  <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
    <h1>✅ Do's and ❌ Don'ts</h1>
    
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginTop: '32px' }}>
      <div>
        <h2 style={{ color: '#28a745' }}>✅ Do</h2>
        <ul>
          <li>Use Hero component at the top of landing pages</li>
          <li>Keep CTA text concise and action-oriented</li>
          <li>Provide meaningful onCtaClick handlers</li>
          <li>Use consistent typography hierarchy</li>
          <li>Test on different screen sizes</li>
        </ul>
      </div>
      
      <div>
        <h2 style={{ color: '#dc3545' }}>❌ Don't</h2>
        <ul>
          <li>Use multiple Hero components on the same page</li>
          <li>Make CTA text too long or unclear</li>
          <li>Forget to handle click events</li>
          <li>Override component styles arbitrarily</li>
          <li>Use Hero component for internal pages</li>
        </ul>
      </div>
    </div>
  </div>
);
