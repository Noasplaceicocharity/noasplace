'use client';

import { useState, useMemo } from 'react';
import { renderTemplate } from '@/lib/templateRenderer';

interface LetterToMpAction {
  slug: string;
  title: string;
  emailSubject: string;
  body: string;
}

interface LetterToMpClientProps {
  action: LetterToMpAction;
}

type LookupState = 'idle' | 'loading' | 'error';
type SendState = 'idle' | 'submitting' | 'success' | 'error';

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  postcode: '',
  addressLine1: '',
  email: '',
};

export default function LetterToMpClient({ action }: LetterToMpClientProps) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [step, setStep] = useState<1 | 2>(1);
  const [mpName, setMpName] = useState<string>('');
  const [mpEmail, setMpEmail] = useState<string>('');
  const [lookupState, setLookupState] = useState<LookupState>('idle');
  const [lookupError, setLookupError] = useState<string>('');
  const [sendState, setSendState] = useState<SendState>('idle');
  const [sendError, setSendError] = useState<string>('');

  const templateData = useMemo(
    () => ({
      firstName: form.firstName,
      lastName: form.lastName,
      firstname: form.firstName,
      lastname: form.lastName,
      lasname: form.lastName,
      postcode: form.postcode,
      addressLine1: form.addressLine1,
      address: form.addressLine1,
      email: form.email,
      mpName: step === 2 ? mpName : 'Your MP',
    }),
    [form, step, mpName]
  );

  const previewSubject = useMemo(
    () => renderTemplate(action.emailSubject, templateData),
    [action.emailSubject, templateData]
  );
  const previewBody = useMemo(
    () => renderTemplate(action.body, templateData),
    [action.body, templateData]
  );

  const update = (key: keyof typeof INITIAL_FORM, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLookupState('loading');
    setLookupError('');
    try {
      const res = await fetch('/api/take-action/lookup-mp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postcode: form.postcode.trim() }),
      });
      const data = (await res.json()) as { message?: string; mpName?: string; mpEmail?: string };
      if (!res.ok) {
        setLookupState('error');
        setLookupError(data.message ?? "We couldn't find your MP. Please check your postcode.");
        return;
      }
      if (data.mpName) {
        setMpName(data.mpName);
        setMpEmail(data.mpEmail ?? '');
        setStep(2);
      } else {
        setLookupState('error');
        setLookupError('Invalid response. Please try again.');
      }
    } catch {
      setLookupState('error');
      setLookupError('Network error. Please try again.');
    }
  };

  const handleSendLetter = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendState('submitting');
    setSendError('');
    try {
      const res = await fetch('/api/take-action/send-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: action.slug,
          firstName: form.firstName,
          lastName: form.lastName,
          postcode: form.postcode,
          addressLine1: form.addressLine1,
          email: form.email,
        }),
      });
      const data = (await res.json()) as { message?: string };
      if (!res.ok) {
        setSendState('error');
        setSendError(data.message ?? 'Something went wrong.');
        return;
      }
      setSendState('success');
    } catch {
      setSendState('error');
      setSendError('Network error. Please try again.');
    }
  };

  const goBackToStep1 = () => {
    setStep(1);
    setLookupState('idle');
    setLookupError('');
    setSendState('idle');
    setSendError('');
  };

  if (step === 1) {
    return (
      <div className="space-y-10">
        <div className="max-w-2xl mx-auto rounded-2xl bg-brand-800 border border-brand-500/30 p-6 sm:p-8 text-white">
          <div className="mb-6">
            <p className="text-sm font-semibold text-white/90 uppercase tracking-wide mb-2">Step 1 of 2</p>
            <h2 className="text-2xl font-extrabold text-white mb-3">Your details</h2>
            <p className="text-white/80 text-base">
              Enter your details below. We&apos;ll find your MP and then show you the letter to review before sending.
            </p>
          </div>

          <form onSubmit={handleStep1Submit} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-white mb-1">
                First name <span className="text-red-300">*</span>
              </label>
              <input
                id="firstName"
                type="text"
                required
                value={form.firstName}
                onChange={(e) => update('firstName', e.target.value)}
                className="w-full rounded-lg border border-white/30 bg-white px-4 py-2 text-ink focus:border-white focus:ring-2 focus:ring-white/50"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-white mb-1">
                Last name <span className="text-red-300">*</span>
              </label>
              <input
                id="lastName"
                type="text"
                required
                value={form.lastName}
                onChange={(e) => update('lastName', e.target.value)}
                className="w-full rounded-lg border border-white/30 bg-white px-4 py-2 text-ink focus:border-white focus:ring-2 focus:ring-white/50"
              />
            </div>
          </div>
          <div>
            <label htmlFor="addressLine1" className="block text-sm font-medium text-white mb-1">
              Address <span className="text-red-300">*</span>
            </label>
            <input
              id="addressLine1"
              type="text"
              required
              value={form.addressLine1}
              onChange={(e) => update('addressLine1', e.target.value)}
              className="w-full rounded-lg border border-white/30 bg-white px-4 py-2 text-ink focus:border-white focus:ring-2 focus:ring-white/50"
            />
          </div>
          <div>
            <label htmlFor="postcode" className="block text-sm font-medium text-white mb-1">
              Postcode <span className="text-red-300">*</span>
            </label>
            <input
              id="postcode"
              type="text"
              required
              value={form.postcode}
              onChange={(e) => update('postcode', e.target.value.toUpperCase())}
              className="w-full rounded-lg border border-white/30 bg-white px-4 py-2 text-ink focus:border-white focus:ring-2 focus:ring-white/50"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
              Email <span className="text-red-300">*</span>
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              className="w-full rounded-lg border border-white/30 bg-white px-4 py-2 text-ink focus:border-white focus:ring-2 focus:ring-white/50"
            />
          </div>

          {lookupState === 'error' && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-800 text-sm">
              {lookupError}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={lookupState === 'loading'}
              className="rounded-full bg-white px-8 py-3 font-bold text-brand-800 hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {lookupState === 'loading' ? 'Finding your MP…' : 'Continue to your letter'}
            </button>
          </div>
        </form>
        </div>

        <p className="text-sm text-ink/60 max-w-2xl mx-auto text-center">
          We use your details only to send this letter to your MP. We do not store your address.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="max-w-2xl mx-auto rounded-2xl bg-brand-800 border border-brand-500/30 p-6 sm:p-8 text-white">
        <div className="mb-6">
          <p className="text-sm font-semibold text-white/90 uppercase tracking-wide mb-2">Step 2 of 2</p>
          <h2 className="text-2xl font-extrabold text-white mb-3">Review and send your letter</h2>
          <p className="text-lg text-white font-medium">
            Your MP is <span className="font-extrabold">{mpName}</span>.
          </p>
          {mpEmail && (
            <p className="text-white/90 text-sm mt-1">
              Your email will go to <span className="font-medium">{mpEmail}</span>
            </p>
          )}
          <p className="text-white/80 text-base mt-2">
            Check the letter below. When you&apos;re happy, click Send to email it to {mpName}.
          </p>
        </div>

        <div className="rounded-xl bg-white border border-white/30 p-5 mb-6 space-y-4">
          <div>
            <span className="text-xs font-medium text-ink/60 uppercase tracking-wide">Subject</span>
            <p className="mt-1 text-ink font-medium whitespace-pre-wrap break-words">{previewSubject || '—'}</p>
          </div>
          <div>
            <span className="text-xs font-medium text-ink/60 uppercase tracking-wide">Body</span>
            <p className="mt-1 text-ink whitespace-pre-wrap break-words">{previewBody || '—'}</p>
          </div>
        </div>

        <form onSubmit={handleSendLetter} className="space-y-4">
          {sendState === 'error' && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-800 text-sm">
              {sendError}
            </div>
          )}
          {sendState === 'success' && (
            <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-green-800">
              Your letter has been sent successfully. Thank you for taking action.
            </div>
          )}

          {sendState !== 'success' && (
            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={sendState === 'submitting'}
                className="rounded-full bg-white px-8 py-3 font-bold text-brand-800 hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {sendState === 'submitting' ? 'Sending…' : 'Send letter'}
              </button>
              <button
                type="button"
                onClick={goBackToStep1}
                disabled={sendState === 'submitting'}
                className="rounded-full border-2 border-white text-white px-6 py-3 font-bold hover:bg-white/10 disabled:opacity-50 transition-colors"
              >
                Change my details
              </button>
            </div>
          )}
        </form>
      </div>

      <p className="text-sm text-ink/60 max-w-2xl mx-auto text-center">
        Your MP may reply to you at the email you provided. We do not store your details.
      </p>
    </div>
  );
}
