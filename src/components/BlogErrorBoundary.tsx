'use client';

import React from 'react';

interface BlogErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface BlogErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class BlogErrorBoundary extends React.Component<BlogErrorBoundaryProps, BlogErrorBoundaryState> {
  constructor(props: BlogErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): BlogErrorBoundaryState {
    console.error('Blog Error Boundary caught error:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Blog Error Boundary componentDidCatch:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="text-center py-12">
          <div className="mx-auto max-w-md">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Blog loading error</h3>
            <p className="mt-2 text-gray-500">
              There was an issue loading the blog. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 inline-flex items-center justify-center rounded-xl bg-brand-800 px-4 py-2 text-base font-bold text-white shadow-lg hover:bg-brand-700 transition duration-200"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default BlogErrorBoundary;
