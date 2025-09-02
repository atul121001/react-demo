import React, { useState, useCallback } from 'react';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'checkbox' | 'radio';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: (value: any) => string | null;
  defaultValue?: any;
}

export interface FormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, any>) => void;
  submitText?: string;
  resetText?: string;
  showReset?: boolean;
  className?: string;
}

export function Form({ 
  fields, 
  onSubmit, 
  submitText = 'Submit', 
  resetText = 'Reset',
  showReset = true,
  className 
}: FormProps) {
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    const initialData: Record<string, any> = {};
    fields.forEach(field => {
      initialData[field.name] = field.defaultValue || '';
    });
    return initialData;
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = useCallback((field: FormField, value: any): string | null => {
    if (field.required && (!value || value.toString().trim() === '')) {
      return `${field.label} is required`;
    }

    if (field.validation) {
      return field.validation(value);
    }

    // Basic email validation
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
    }

    return null;
  }, []);

  const handleChange = (fieldName: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    
    // Validate field on change
    const field = fields.find(f => f.name === fieldName);
    if (field) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [fieldName]: error || '' }));
    }
  };

  const handleBlur = (fieldName: string) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Record<string, string> = {};
    let hasErrors = false;

    fields.forEach(field => {
      const error = validateField(field, formData[field.name]);
      if (error) {
        newErrors[field.name] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);
    setTouched(fields.reduce((acc, field) => ({ ...acc, [field.name]: true }), {}));

    if (!hasErrors) {
      onSubmit(formData);
    }
  };

  const handleReset = () => {
    const resetData: Record<string, any> = {};
    fields.forEach(field => {
      resetData[field.name] = field.defaultValue || '';
    });
    setFormData(resetData);
    setErrors({});
    setTouched({});
  };

  const renderField = (field: FormField) => {
    const hasError = touched[field.name] && errors[field.name];
    const fieldId = `field-${field.name}`;

    const baseInputStyle = {
      width: '100%',
      padding: '12px',
      border: `1px solid ${hasError ? '#dc3545' : '#ddd'}`,
      borderRadius: '4px',
      fontSize: '14px',
      transition: 'border-color 0.2s ease',
      boxSizing: 'border-box' as const
    };

    const labelStyle = {
      display: 'block',
      marginBottom: '6px',
      fontWeight: '500',
      color: hasError ? '#dc3545' : '#333'
    };

    const errorStyle = {
      color: '#dc3545',
      fontSize: '12px',
      marginTop: '4px'
    };

    switch (field.type) {
      case 'textarea':
        return (
          <div key={field.name} style={{ marginBottom: '20px' }}>
            <label htmlFor={fieldId} style={labelStyle}>
              {field.label} {field.required && <span style={{ color: '#dc3545' }}>*</span>}
            </label>
            <textarea
              id={fieldId}
              value={formData[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              onBlur={() => handleBlur(field.name)}
              placeholder={field.placeholder}
              required={field.required}
              style={{
                ...baseInputStyle,
                minHeight: '100px',
                resize: 'vertical'
              }}
            />
            {hasError && <div style={errorStyle}>{errors[field.name]}</div>}
          </div>
        );

      case 'select':
        return (
          <div key={field.name} style={{ marginBottom: '20px' }}>
            <label htmlFor={fieldId} style={labelStyle}>
              {field.label} {field.required && <span style={{ color: '#dc3545' }}>*</span>}
            </label>
            <select
              id={fieldId}
              value={formData[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              onBlur={() => handleBlur(field.name)}
              required={field.required}
              style={baseInputStyle}
            >
              <option value="">Select {field.label}</option>
              {field.options?.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {hasError && <div style={errorStyle}>{errors[field.name]}</div>}
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.name} style={{ marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData[field.name] || false}
                onChange={(e) => handleChange(field.name, e.target.checked)}
                onBlur={() => handleBlur(field.name)}
                style={{ marginRight: '8px' }}
              />
              <span style={labelStyle}>
                {field.label} {field.required && <span style={{ color: '#dc3545' }}>*</span>}
              </span>
            </label>
            {hasError && <div style={errorStyle}>{errors[field.name]}</div>}
          </div>
        );

      case 'radio':
        return (
          <div key={field.name} style={{ marginBottom: '20px' }}>
            <div style={labelStyle}>
              {field.label} {field.required && <span style={{ color: '#dc3545' }}>*</span>}
            </div>
            {field.options?.map(option => (
              <label key={option.value} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name={field.name}
                  value={option.value}
                  checked={formData[field.name] === option.value}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  onBlur={() => handleBlur(field.name)}
                  style={{ marginRight: '8px' }}
                />
                <span>{option.label}</span>
              </label>
            ))}
            {hasError && <div style={errorStyle}>{errors[field.name]}</div>}
          </div>
        );

      default:
        return (
          <div key={field.name} style={{ marginBottom: '20px' }}>
            <label htmlFor={fieldId} style={labelStyle}>
              {field.label} {field.required && <span style={{ color: '#dc3545' }}>*</span>}
            </label>
            <input
              id={fieldId}
              type={field.type}
              value={formData[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              onBlur={() => handleBlur(field.name)}
              placeholder={field.placeholder}
              required={field.required}
              style={baseInputStyle}
            />
            {hasError && <div style={errorStyle}>{errors[field.name]}</div>}
          </div>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className} style={{ maxWidth: '600px', margin: '0 auto' }}>
      {fields.map(renderField)}
      
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
        {showReset && (
          <button
            type="button"
            onClick={handleReset}
            style={{
              padding: '12px 24px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              backgroundColor: '#f8f9fa',
              color: '#333',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            {resetText}
          </button>
        )}
        <button
          type="submit"
          style={{
            padding: '12px 24px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#007bff',
            color: 'white',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          {submitText}
        </button>
      </div>
    </form>
  );
}
