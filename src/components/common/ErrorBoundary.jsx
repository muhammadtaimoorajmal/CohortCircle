import React from 'react';
import { resetToSeed } from '../../services/storageService';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('CohortCircle ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleResetAndReload = () => {
    try {
      resetToSeed();
    } catch (e) {
      console.error('Failed to reset during error recovery:', e);
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <main
          role="alert"
          aria-live="assertive"
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            backgroundColor: 'var(--color-bg-primary, #0f172a)',
            color: 'var(--color-text-primary, #f8fafc)',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
        >
          <div
            style={{
              maxWidth: '560px',
              width: '100%',
              backgroundColor: 'var(--color-surface, #1e293b)',
              border: '1px solid var(--color-border, #334155)',
              borderRadius: '12px',
              padding: '32px',
              textAlign: 'center',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)'
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                color: '#ef4444',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                fontSize: '24px',
                fontWeight: 'bold'
              }}
              aria-hidden="true"
            >
              !
            </div>
            <h1
              style={{
                fontSize: '22px',
                fontWeight: '700',
                marginBottom: '12px',
                color: 'var(--color-text-primary, #f8fafc)'
              }}
            >
              Something went wrong
            </h1>
            <p
              style={{
                fontSize: '14px',
                lineHeight: '1.6',
                color: 'var(--color-text-secondary, #94a3b8)',
                marginBottom: '24px'
              }}
            >
              CohortCircle encountered an unexpected rendering error. Your local data remains
              protected in your browser. You can reload the page or restore the initial demonstration state.
            </p>
            <div
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}
            >
              <button
                type="button"
                onClick={this.handleReload}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: 'var(--color-primary, #4f46e5)',
                  color: '#ffffff',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Reload Page
              </button>
              <button
                type="button"
                onClick={this.handleResetAndReload}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: '1px solid var(--color-border, #475569)',
                  backgroundColor: 'transparent',
                  color: 'var(--color-text-primary, #f8fafc)',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Reset Demo State & Reload
              </button>
            </div>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
