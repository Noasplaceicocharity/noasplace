'use client';

import { useEffect, useState } from 'react';

export default function BlogPostTester() {
  const [testResults, setTestResults] = useState<any>(null);

  useEffect(() => {
    async function testBlogPost() {
      try {
        console.log('Testing blog post access...');
        
        // Test 1: Try to fetch the specific blog post page
        const response = await fetch('/blog/introducing-noas-place');
        console.log('Blog post fetch response:', {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries())
        });
        
        const html = await response.text();
        const isValidPage = html.includes('Noa') && !html.includes('404');
        
        setTestResults({
          pageExists: response.ok,
          status: response.status,
          isValidContent: isValidPage,
          timestamp: new Date().toISOString()
        });
        
      } catch (error) {
        console.error('Blog post test error:', error);
        setTestResults({
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString()
        });
      }
    }
    
    testBlogPost();
  }, []);

  if (!testResults) {
    return <div className="text-sm text-gray-500">Testing blog post...</div>;
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm">
      <h4 className="font-bold text-blue-800">Blog Post Test Results:</h4>
      <pre className="text-xs mt-2 text-blue-700">
        {JSON.stringify(testResults, null, 2)}
      </pre>
    </div>
  );
}
