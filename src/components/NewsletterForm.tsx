'use client';

import { useState } from 'react';

const NewsletterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
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
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          mobile: '',
          userType: 'Community supporter / local resident',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="newsletter-firstName" className="sr-only">
            First Name
          </label>
          <input
            type="text"
            id="newsletter-firstName"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border-0 bg-white/10 text-white placeholder:text-white/60 focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-colors"
            placeholder="First Name"
          />
        </div>
        <div>
          <label htmlFor="newsletter-lastName" className="sr-only">
            Last Name
          </label>
          <input
            type="text"
            id="newsletter-lastName"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border-0 bg-white/10 text-white placeholder:text-white/60 focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-colors"
            placeholder="Last Name"
          />
        </div>
      </div>
      <div>
        <label htmlFor="newsletter-email" className="sr-only">
          Email Address
        </label>
        <input
          type="email"
          id="newsletter-email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-lg border-0 bg-white/10 text-white placeholder:text-white/60 focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-colors"
          placeholder="Email Address"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className={`w-full px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
          status === 'loading' 
            ? 'bg-white/20 text-white/50 cursor-not-allowed' 
            : 'bg-white text-brand-800 hover:bg-white/90 hover:scale-105'
        }`}
      >
        {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
      </button>

      {(status === 'success' || status === 'error') && (
        <div className={`rounded-lg p-3 text-sm text-center ${
          status === 'success' 
            ? 'bg-white/20 text-white' 
            : 'bg-red-500/20 text-white'
        }`}>
          {status === 'success' 
            ? 'Thank you for subscribing!' 
            : errorMessage}
        </div>
      )}
    </form>
  );
};

export default NewsletterForm;

