'use client';

import { useState } from 'react';
import Image from 'next/image';

export const DownloadResource = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const pdfUrl = '/PDF/10_Things_Every_Family_with_Additional_Needs_Should_Know_in_Calderdale.pdf';
  const pdfFilename = '10_Things_Every_Family_with_Additional_Needs_Should_Know_in_Calderdale.pdf';

  const downloadPdfFile = async () => {
    const response = await fetch(pdfUrl);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = pdfFilename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(blobUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
    
    // Open the PDF in a new tab synchronously; do not touch the current tab
    const newTab = window.open(pdfUrl, '_blank', 'noopener,noreferrer');
    if (newTab === null) {
      setMessage('Please allow pop-ups to view the PDF. You can also check your email for a copy.');
    }

    try {
      const response = await fetch('/api/subscribe-resource', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Something went wrong');

      // Trigger a file download to the device
      try {
        await downloadPdfFile();
      } catch {
        // If download fails, we still showed the PDF in a tab; inform gently
      }
      setStatus('success');
      setMessage('Thank you! The guide has opened in a new tab and a download has started. We\'ve also emailed you a copy.');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Failed to subscribe');
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-brand-100">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top right infinity */}
        <svg className="absolute -right-12 top-8 h-28 w-44 rotate-12 text-[#40BFBF]/20" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="8">
          <path d="M30,25 C30,15 35,10 45,10 C55,10 60,15 60,25 C60,35 55,40 45,40 C35,40 30,35 30,25 M70,25 C70,15 75,10 85,10 C95,10 100,15 100,25 C100,35 95,40 85,40 C75,40 70,35 70,25" />
        </svg>
        {/* Bottom left squiggle */}
        <svg className="absolute -left-8 bottom-12 h-24 w-44 text-[#FFB800]/20" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="6">
          <path d="M0,15 Q25,0 50,15 T100,15" strokeLinecap="round" />
        </svg>
        {/* Scattered dots */}
        <div className="absolute right-1/4 top-1/4 size-4 rounded-full bg-[#6E3482]/20" />
        <div className="absolute left-1/3 bottom-1/3 size-3 rounded-full bg-[#40BFBF]/20" />
      </div>

      <div className="relative flex flex-col md:flex-row items-center gap-8 p-8 sm:p-12">
        <div className="md:w-1/2">
          <Image
            src="/images/10_Things_Every_Family_with_Additional_Needs_Should_Know_in_Calderdale.jpg"
            alt="10 Things Every Family with Additional Needs Should Know in Calderdale"
            width={500}
            height={375}
            className="rounded-2xl shadow-lg ring-1 ring-brand-100"
          />
        </div>
        
        <div className="md:w-1/2 space-y-6">
          <div>
            <h2 className="text-3xl font-extrabold text-ink">Free Resource Guide</h2>
            <h3 className="mt-4 text-xl font-bold text-brand-800">
              10 Things Every Family with Additional Needs Should Know in Calderdale
            </h3>
          </div>
          
          <p className="text-lg text-ink/80">
            Get instant access to our comprehensive guide packed with essential information
            for families with additional needs in Calderdale.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-ink/80 mb-2">
                Enter your email to receive the guide
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-4 py-3 rounded-xl border-0 bg-brand-50/50 text-ink placeholder:text-ink/50 focus:ring-2 focus:ring-brand-800"
              />
            </div>

            <p className="text-xs text-ink/60 text-center">
              By entering your email, you consent to us contacting you about our services and updates.
            </p>

            <button
              type="submit"
              disabled={status === 'loading'}
              className={`inline-flex w-full items-center justify-center rounded-xl px-8 py-4 text-lg font-bold shadow-lg transition duration-200 
                ${status === 'loading' 
                  ? 'bg-brand-200 text-ink/50 cursor-not-allowed' 
                  : 'bg-[#FFB800] text-ink hover:bg-[#ffc533] hover:scale-105'}`}
            >
              {status === 'loading' ? 'Sending...' : 'Get Your Free Guide'}
              {status !== 'loading' && (
                <svg className="ml-2 size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
              )}
            </button>

            {message && (
              <div className={`rounded-xl p-4 text-center font-medium ${
                status === 'success' 
                  ? 'bg-brand-50 text-brand-800 ring-1 ring-brand-100' 
                  : 'bg-red-50 text-red-800 ring-1 ring-red-100'
              }`}>
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default DownloadResource;
