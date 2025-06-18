'use client';

import React from 'react';

/**
 * ErrorBoundary component to catch JavaScript errors in child components
 * and display a fallback UI instead of crashing the entire application
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { fallback, children } = this.props;

    if (hasError) {
      // You can render any custom fallback UI
      if (fallback) {
        return fallback(error, errorInfo);
      }
      
      return (
        <div className="p-6 mx-auto my-8 bg-red-50 rounded-lg shadow-md max-w-2xl border border-red-200">
          <h2 className="mb-4 text-xl font-bold text-red-700">Something went wrong</h2>
          <p className="mb-4 text-red-600">
            We're sorry, but there was an error loading this part of the page.
          </p>
          <details className="p-4 mt-4 bg-white rounded border border-red-100">
            <summary className="font-medium text-red-800 cursor-pointer">
              Error details
            </summary>
            <pre className="mt-2 p-2 overflow-auto text-sm text-gray-800 bg-gray-50 rounded">
              {error && error.toString()}
              <br />
              {errorInfo && errorInfo.componentStack}
            </pre>
          </details>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            onClick={() => window.location.reload()}
          >
            Reload page
          </button>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;