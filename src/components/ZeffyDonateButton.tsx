"use client";

import Script from "next/script";

const ZEFFY_FORM_LINK =
  "https://www.zeffy.com/embed/donation-form/donate-to-noas-place?modal=true";
const ZEFFY_SCRIPT_SRC =
  "https://zeffy-scripts.s3.ca-central-1.amazonaws.com/embed-form-script.min.js";

type ZeffyDonateButtonProps = {
  className?: string;
  children?: React.ReactNode;
};

export default function ZeffyDonateButton({
  className,
  children = "Donate",
}: ZeffyDonateButtonProps) {
  const zeffyTriggerProps = {
    "zeffy-form-link": ZEFFY_FORM_LINK,
  } as const;

  return (
    <>
      <Script
        id="zeffy-embed-script"
        src={ZEFFY_SCRIPT_SRC}
        strategy="afterInteractive"
      />
      <a
        {...zeffyTriggerProps}
        href={ZEFFY_FORM_LINK}
        className={className}
      >
        {children}
      </a>
    </>
  );
}
