'use client';

import { useState } from 'react';

type UserType = 
  | 'Parent / Carer of a child with SEND'
  | 'Adult with SEND'
  | 'Professional (teacher, NHS, etc.)'
  | 'Community supporter / local resident'
  | 'Other';

const MailchimpSubscribeForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    userType: '' as UserType,
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
        body: JSON.stringify(formData),
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
        mobile: '',
        userType: '' as UserType,
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const userTypes: UserType[] = [
    'Parent / Carer of a child with SEND',
    'Adult with SEND',
    'Professional (teacher, NHS, etc.)',
    'Community supporter / local resident',
    'Other'
  ];

  return (
    <div className="relative">
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

      <form onSubmit={handleSubmit} className="relative space-y-6 max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-ink/80 mb-2">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border-0 bg-brand-50/50 text-ink placeholder:text-ink/50 focus:ring-2 focus:ring-brand-800"
              placeholder="Your first name"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-ink/80 mb-2">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border-0 bg-brand-50/50 text-ink placeholder:text-ink/50 focus:ring-2 focus:ring-brand-800"
              placeholder="Your last name"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-ink/80 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border-0 bg-brand-50/50 text-ink placeholder:text-ink/50 focus:ring-2 focus:ring-brand-800"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label htmlFor="mobile" className="block text-sm font-medium text-ink/80 mb-2">
            Mobile Number
          </label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border-0 bg-brand-50/50 text-ink placeholder:text-ink/50 focus:ring-2 focus:ring-brand-800"
            placeholder="Your mobile number (optional)"
          />
        </div>

        <div>
          <label htmlFor="userType" className="block text-sm font-medium text-ink/80 mb-2">
            I&apos;m a... *
          </label>
          <select
            id="userType"
            name="userType"
            required
            value={formData.userType}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border-0 bg-brand-50/50 text-ink placeholder:text-ink/50 focus:ring-2 focus:ring-brand-800"
          >
            <option value="">Please select...</option>
            {userTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className={`inline-flex w-full items-center justify-center rounded-xl px-8 py-4 text-lg font-bold shadow-lg transition duration-200 
            ${status === 'loading' 
              ? 'bg-brand-200 text-ink/50 cursor-not-allowed' 
              : 'bg-[#FFB800] text-ink hover:bg-[#ffc533] hover:scale-105'}`}
        >
          {status === 'loading' ? 'Subscribing...' : 'Show Your Support'}
          {status !== 'loading' && (
            <svg className="ml-2 size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          )}
        </button>

        {(status === 'success' || status === 'error') && (
          <div className={`rounded-xl p-4 text-center font-medium ${
            status === 'success' 
              ? 'bg-brand-50 text-brand-800 ring-1 ring-brand-100' 
              : 'bg-red-50 text-red-800 ring-1 ring-red-100'
          }`}>
            {status === 'success' 
              ? 'Thank you for showing your support! We\'ll keep you updated on our progress.' 
              : errorMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default MailchimpSubscribeForm;
