import Link from 'next/link';

export default function BlogSetupGuide() {
  return (
    <div className="text-center py-16">
      <div className="mx-auto max-w-md">
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-brand-50 mb-6">
          <svg className="h-10 w-10 text-brand-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        
        <h3 className="text-2xl font-bold text-ink mb-4">Blog Setup Required</h3>
        <p className="text-ink/80 mb-6">
          Your blog is ready to go! You just need to connect it to your Notion workspace to start publishing content.
        </p>
        
        <div className="bg-brand-50/50 rounded-xl p-6 text-left mb-6">
          <h4 className="font-semibold text-brand-800 mb-3">Quick Setup:</h4>
          <ol className="text-sm text-ink/80 space-y-2">
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-brand-800 text-white text-xs mr-3 mt-0.5 flex-shrink-0">1</span>
              Create a Notion integration at{' '}
              <a href="https://www.notion.so/my-integrations" target="_blank" rel="noopener noreferrer" className="text-brand-800 hover:underline ml-1">
                notion.so/my-integrations
              </a>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-brand-800 text-white text-xs mr-3 mt-0.5 flex-shrink-0">2</span>
              Create a blog database in Notion with the required properties
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-brand-800 text-white text-xs mr-3 mt-0.5 flex-shrink-0">3</span>
              Add your integration token and database ID to{' '}
              <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">.env.local</code>
            </li>
          </ol>
        </div>
        
        <div className="space-y-3">
          <a
            href="/docs/BLOG_SETUP.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-brand-800 px-6 py-3 text-base font-bold text-white shadow-lg hover:bg-brand-700 transition duration-200 w-full"
          >
            View Complete Setup Guide
            <svg className="ml-2 size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </a>
          
          <p className="text-xs text-ink/60">
            Need help? Check the{' '}
            <Link href="/docs/BLOG_SETUP.md" className="text-brand-800 hover:underline">
              documentation
            </Link>{' '}
            for detailed instructions.
          </p>
        </div>
      </div>
    </div>
  );
}
