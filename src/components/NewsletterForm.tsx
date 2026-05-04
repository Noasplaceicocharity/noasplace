'use client';

import { useState } from 'react';

const NewsletterForm = () => {
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          mobile: '',
          userType: 'Community supporter / local resident',
        }),
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="newsletter-email"
          name="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border-0 bg-white/10 px-4 py-2.5 text-white placeholder:text-white/60 transition-colors focus:bg-white/20 focus:ring-2 focus:ring-white/50"
          placeholder="Email"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className={`w-full rounded-lg px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${
          status === 'loading'
            ? 'cursor-not-allowed bg-white/20 text-white/50'
            : 'bg-white text-brand-800 hover:scale-105 hover:bg-white/90'
        }`}
      >
        {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
      </button>

      {(status === 'success' || status === 'error') && (
        <div
          className={`rounded-lg p-3 text-center text-sm ${
            status === 'success'
              ? 'bg-white/20 text-white'
              : 'bg-red-500/20 text-white'
          }`}
        >
          {status === 'success'
            ? 'Thank you for subscribing!'
            : errorMessage}
        </div>
      )}
    </form>
  );
};

export default NewsletterForm;
