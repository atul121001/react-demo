import React from 'react';

export default {
  title: 'Design System/Design Tokens',
  parameters: {
    layout: 'fullscreen'
  }
};

const ColorSwatch = ({ name, value, description }: { name: string; value: string; description: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
    <div
      style={{
        width: '60px',
        height: '60px',
        backgroundColor: value,
        borderRadius: '8px',
        marginRight: '16px',
        border: '1px solid #ddd'
      }}
    />
    <div>
      <strong>{name}</strong>
      <br />
      <code style={{ fontSize: '12px', color: '#666' }}>{value}</code>
      <br />
      <span style={{ fontSize: '14px', color: '#888' }}>{description}</span>
    </div>
  </div>
);

export const Colors = () => (
  <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
    <h1>🎨 Color Tokens</h1>
    <p>Our design system color palette for consistent branding.</p>
    
    <h2>Brand Colors</h2>
    <ColorSwatch 
      name="Primary Blue" 
      value="#0066ff" 
      description="Main brand color used in CTAs and hero buttons" 
    />
    <ColorSwatch 
      name="Dark Background" 
      value="#1a1a2e" 
      description="Hero section background color" 
    />
    <ColorSwatch 
      name="Text White" 
      value="#ffffff" 
      description="Primary text color on dark backgrounds" 
    />
    
    <h2>Usage Guidelines</h2>
    <ul>
      <li>Use Primary Blue for interactive elements and CTAs</li>
      <li>Dark Background creates dramatic hero sections</li>
      <li>Ensure proper contrast ratios for accessibility</li>
    </ul>
  </div>
);

export const Typography = () => (
  <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
    <h1>📝 Typography</h1>
    <p>Typography scale and font usage guidelines.</p>
    
    <div style={{ marginBottom: '32px' }}>
      <h1 style={{ fontSize: '48px', marginBottom: '8px' }}>Heading 1 - 48px</h1>
      <p style={{ color: '#666', fontSize: '14px' }}>Used for hero titles and main page headings</p>
    </div>
    
    <div style={{ marginBottom: '32px' }}>
      <h2 style={{ fontSize: '20px', marginBottom: '8px' }}>Heading 2 - 20px</h2>
      <p style={{ color: '#666', fontSize: '14px' }}>Used for hero subtitles and section headings</p>
    </div>
    
    <div style={{ marginBottom: '32px' }}>
      <p style={{ fontSize: '18px', marginBottom: '8px' }}>Button Text - 18px</p>
      <p style={{ color: '#666', fontSize: '14px' }}>Used for call-to-action buttons</p>
    </div>
  </div>
);
