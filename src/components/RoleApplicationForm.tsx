'use client';

import { useState } from 'react';
import {
  roleRequiresSensorySessionDates,
  SENSORY_SESSION_OPTIONS,
} from '@/lib/sensorySessions';

const SEND_EXPERIENCE_OPTIONS = [
  { value: 'lived_experience', label: 'Lived experience' },
  { value: 'basic_knowledge', label: 'Basic knowledge' },
  { value: 'professional', label: 'Professional' },
] as const;

const inputClassName =
  'w-full rounded-lg border border-brand-200 px-4 py-3 text-ink placeholder:text-ink/50 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500 transition duration-200';

const labelClassName = 'block text-sm font-semibold text-ink mb-2';

type RoleApplicationFormProps = {
  roleId: string;
  roleName: string;
  roleSlug: string;
};

export default function RoleApplicationForm({
  roleId,
  roleName,
  roleSlug,
}: RoleApplicationFormProps) {
  const showSensorySessions = roleRequiresSensorySessionDates(roleSlug);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(`/api/roles/${roleId}/applications`, {
        method: 'POST',
        body: formData,
      });

      const body = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        setStatus('error');
        setErrorMessage(body.error ?? 'Something went wrong. Please try again.');
        return;
      }

      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/50 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-brand-900">Application submitted</h2>
        <p className="mt-3 text-ink/85">
          Thank you for applying for {roleName}. We&apos;ll be in touch if your application is
          successful.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-bold text-brand-900">Apply for this role</h2>
      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-6"
        noValidate
        aria-label={`Application form for ${roleName}`}
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className={labelClassName}>
              First name <span className="text-red-500" aria-label="required">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              autoComplete="given-name"
              className={inputClassName}
              placeholder="Your first name"
              aria-required="true"
            />
          </div>

          <div>
            <label htmlFor="lastName" className={labelClassName}>
              Last name <span className="text-red-500" aria-label="required">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              autoComplete="family-name"
              className={inputClassName}
              placeholder="Your last name"
              aria-required="true"
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className={labelClassName}>
              Email <span className="text-red-500" aria-label="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              autoComplete="email"
              className={inputClassName}
              placeholder="your.email@example.com"
              aria-required="true"
            />
          </div>

          <div>
            <label htmlFor="mobile" className={labelClassName}>
              Mobile <span className="text-red-500" aria-label="required">*</span>
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              required
              autoComplete="tel"
              className={inputClassName}
              placeholder="07xxx xxxxxx"
              aria-required="true"
            />
          </div>
        </div>

        <div>
          <label htmlFor="address" className={labelClassName}>
            Address <span className="text-red-500" aria-label="required">*</span>
          </label>
          <textarea
            id="address"
            name="address"
            required
            rows={3}
            autoComplete="street-address"
            className={`${inputClassName} resize-y`}
            placeholder="Your full address"
            aria-required="true"
          />
        </div>

        <fieldset>
          <legend className={labelClassName}>
            Current DBS held <span className="text-red-500" aria-label="required">*</span>
          </legend>
          <div className="flex flex-wrap gap-6">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-ink/90">
              <input
                type="radio"
                name="dbsHeld"
                value="yes"
                required
                className="size-4 text-brand-800 focus:ring-brand-500"
              />
              Yes
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-ink/90">
              <input
                type="radio"
                name="dbsHeld"
                value="no"
                required
                className="size-4 text-brand-800 focus:ring-brand-500"
              />
              No
            </label>
          </div>
        </fieldset>

        {showSensorySessions ? (
          <fieldset>
            <legend className={labelClassName}>
              Which sessions are you applying for?{' '}
              <span className="text-red-500" aria-label="required">*</span>
            </legend>
            <p className="mb-3 text-sm text-ink/75">Select all dates you are available for.</p>
            <div className="space-y-3">
              {SENSORY_SESSION_OPTIONS.map((option) => (
                <label
                  key={option.field}
                  className="flex cursor-pointer items-center gap-3 text-sm text-ink/90"
                >
                  <input
                    type="checkbox"
                    name={option.field}
                    value="yes"
                    className="size-4 shrink-0 rounded border-brand-300 text-brand-800 focus:ring-brand-500"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>
        ) : null}

        <div>
          <label htmlFor="sendExperience" className={labelClassName}>
            SEND experience <span className="text-red-500" aria-label="required">*</span>
          </label>
          <select
            id="sendExperience"
            name="sendExperience"
            required
            className={inputClassName}
            defaultValue=""
            aria-required="true"
          >
            <option value="" disabled>
              Select an option
            </option>
            {SEND_EXPERIENCE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="cv" className={labelClassName}>
            Upload CV <span className="font-normal text-ink/60">(optional)</span>
          </label>
          <input
            type="file"
            id="cv"
            name="cv"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="w-full rounded-lg border border-brand-200 px-4 py-3 text-ink file:mr-4 file:rounded-md file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand-800 hover:file:bg-brand-100"
          />
        </div>

        <div className="space-y-4 rounded-xl bg-brand-50/80 p-4 ring-1 ring-brand-100">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              id="consentContact"
              name="consentContact"
              value="yes"
              required
              className="mt-1 size-4 shrink-0 rounded border-brand-300 text-brand-800 focus:ring-brand-500"
              aria-required="true"
            />
            <span className="text-sm text-ink/90">
              I am happy for Noa&apos;s Place to contact me regarding volunteering.{' '}
              <span className="text-red-500" aria-label="required">*</span>
            </span>
          </label>

          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              id="consentNews"
              name="consentNews"
              value="yes"
              className="mt-1 size-4 shrink-0 rounded border-brand-300 text-brand-800 focus:ring-brand-500"
            />
            <span className="text-sm text-ink/90">I would like to receive the latest news.</span>
          </label>
        </div>

        {status === 'error' && errorMessage ? (
          <p className="text-sm font-medium text-red-600" role="alert">
            {errorMessage}
          </p>
        ) : null}

        <div>
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="inline-flex w-full items-center justify-center rounded-xl bg-[#FFB800] px-8 py-4 text-lg font-bold text-ink shadow-lg transition duration-200 hover:scale-105 hover:bg-[#ffc533] focus:outline-none focus:ring-2 focus:ring-brand-800 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {status === 'submitting' ? 'Submitting…' : 'Submit application'}
            <svg
              className="ml-2 size-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
