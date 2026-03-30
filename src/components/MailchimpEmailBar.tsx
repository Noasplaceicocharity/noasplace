'use client';

import { useState } from 'react';

export default function MailchimpEmailBar() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/subscribe-mailchimp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  return (
    <div className="mx-auto w-full max-w-xl">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 sm:flex-row sm:items-stretch"
      >
        <label htmlFor="blog-mailchimp-email" className="sr-only">
          Email address
        </label>
        <input
          id="blog-mailchimp-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="min-h-12 w-full flex-1 rounded-xl border border-brand-200/80 bg-white px-4 py-3 text-ink shadow-sm placeholder:text-ink/45 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-400/40"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className={`inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl px-6 py-3 text-base font-bold shadow-md transition duration-200 sm:px-8
            ${
              status === 'loading'
                ? 'cursor-not-allowed bg-brand-300 text-ink/60'
                : 'bg-[#FFB800] text-ink hover:scale-[1.02] hover:bg-[#ffc533]'
            }`}
        >
          {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </form>
      <p className="mt-2 text-center text-xs text-ink/60">
        Get updates from Noa&apos;s Place. You can unsubscribe any time.
      </p>
      {(status === 'success' || status === 'error') && (
        <p
          className={`mt-3 text-center text-sm font-medium ${
            status === 'success' ? 'text-brand-800' : 'text-red-800'
          }`}
          role="status"
        >
          {status === 'success'
            ? 'Thanks - you are on the list. We will be in touch soon.'
            : errorMessage}
        </p>
      )}
    </div>
  );
}
