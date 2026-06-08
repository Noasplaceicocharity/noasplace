const BRAND = {
  purple900: '#49225B',
  purple800: '#6E3482',
  purple100: '#E7DBEF',
  purple50: '#F5EBFA',
  yellow: '#FFB800',
  ink: '#2D2A32',
  muted: '#5C5668',
  white: '#FFFFFF',
  siteUrl: 'https://noasplace.org.uk',
  logoUrl: 'https://noasplace.org.uk/images/noas%20place%20logo.png',
  helloEmail: 'hello@noasplace.org.uk',
} as const;

export type EmailDetailRow = {
  label: string;
  value: string;
};

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderParagraphs(text: string): string {
  return text
    .split('\n\n')
    .map((paragraph) => {
      const trimmed = paragraph.trim();
      if (!trimmed) return '';
      return `<p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:${BRAND.ink};">${escapeHtml(trimmed).replace(/\n/g, '<br />')}</p>`;
    })
    .filter(Boolean)
    .join('');
}

function renderDetailRows(rows: EmailDetailRow[]): string {
  return rows
    .map(
      (row) => `
        <tr>
          <td style="padding:12px 16px;border-bottom:1px solid ${BRAND.purple100};font-size:14px;font-weight:600;color:${BRAND.purple900};width:38%;vertical-align:top;">
            ${escapeHtml(row.label)}
          </td>
          <td style="padding:12px 16px;border-bottom:1px solid ${BRAND.purple100};font-size:14px;line-height:1.5;color:${BRAND.ink};vertical-align:top;">
            ${escapeHtml(row.value).replace(/\n/g, '<br />')}
          </td>
        </tr>`
    )
    .join('');
}

type BrandedEmailOptions = {
  title: string;
  preheader?: string;
  eyebrow?: string;
  introHtml?: string;
  bodyHtml?: string;
  detailRows?: EmailDetailRow[];
  cta?: { label: string; href: string };
  footerNote?: string;
};

export function renderBrandedEmail(options: BrandedEmailOptions): string {
  const preheader = options.preheader ?? options.title;
  const eyebrow = options.eyebrow
    ? `<p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND.yellow};">${escapeHtml(options.eyebrow)}</p>`
    : '';

  const detailTable =
    options.detailRows && options.detailRows.length > 0
      ? `
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:24px 0 0;border:1px solid ${BRAND.purple100};border-radius:12px;overflow:hidden;background:${BRAND.white};">
          ${renderDetailRows(options.detailRows)}
        </table>`
      : '';

  const cta = options.cta
    ? `
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px 0 0;">
        <tr>
          <td style="border-radius:12px;background:${BRAND.yellow};">
            <a href="${escapeHtml(options.cta.href)}" style="display:inline-block;padding:14px 24px;font-size:15px;font-weight:700;color:${BRAND.ink};text-decoration:none;">
              ${escapeHtml(options.cta.label)}
            </a>
          </td>
        </tr>
      </table>`
    : '';

  const footerNote = options.footerNote
    ? `<p style="margin:0 0 12px;font-size:13px;line-height:1.5;color:${BRAND.muted};">${escapeHtml(options.footerNote)}</p>`
    : '';

  return `<!DOCTYPE html>
<html lang="en-GB">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(options.title)}</title>
  </head>
  <body style="margin:0;padding:0;background:${BRAND.purple50};font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      ${escapeHtml(preheader)}
    </div>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:${BRAND.purple50};padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
            <tr>
              <td style="border-radius:20px 20px 0 0;background:linear-gradient(135deg, ${BRAND.purple900} 0%, ${BRAND.purple800} 100%);padding:28px 32px;text-align:center;">
                <a href="${BRAND.siteUrl}" style="text-decoration:none;">
                  <img
                    src="${BRAND.logoUrl}"
                    alt="Noa's Place"
                    width="180"
                    style="display:block;margin:0 auto;max-width:180px;height:auto;border:0;"
                  />
                </a>
              </td>
            </tr>
            <tr>
              <td style="height:4px;background:${BRAND.yellow};font-size:0;line-height:0;">&nbsp;</td>
            </tr>
            <tr>
              <td style="background:${BRAND.white};padding:32px;border-left:1px solid ${BRAND.purple100};border-right:1px solid ${BRAND.purple100};">
                ${eyebrow}
                <h1 style="margin:0 0 20px;font-size:24px;line-height:1.3;color:${BRAND.purple900};">
                  ${escapeHtml(options.title)}
                </h1>
                ${options.introHtml ?? ''}
                ${options.bodyHtml ?? ''}
                ${detailTable}
                ${cta}
              </td>
            </tr>
            <tr>
              <td style="border-radius:0 0 20px 20px;background:${BRAND.purple900};padding:24px 32px;border:1px solid ${BRAND.purple900};">
                ${footerNote}
                <p style="margin:0 0 8px;font-size:14px;line-height:1.5;color:${BRAND.purple100};">
                  <strong style="color:${BRAND.white};">Noa's Place</strong><br />
                  Creating inclusive spaces for SEND families in West Yorkshire
                </p>
                <p style="margin:0;font-size:13px;line-height:1.6;color:${BRAND.purple100};">
                  <a href="${BRAND.siteUrl}" style="color:${BRAND.yellow};text-decoration:none;">noasplace.org.uk</a>
                  &nbsp;·&nbsp;
                  <a href="mailto:${BRAND.helloEmail}" style="color:${BRAND.yellow};text-decoration:none;">${BRAND.helloEmail}</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function renderConfirmationEmail(input: {
  firstName: string;
  title: string;
  preheader: string;
  message: string;
}): string {
  return renderBrandedEmail({
    title: input.title,
    preheader: input.preheader,
    eyebrow: 'Application received',
    introHtml: `<p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:${BRAND.ink};">Dear ${escapeHtml(input.firstName)},</p>`,
    bodyHtml: renderParagraphs(input.message),
    cta: {
      label: 'Visit Noa\'s Place',
      href: BRAND.siteUrl,
    },
    footerNote: 'If you did not submit this application, please contact us.',
  });
}

export function renderAdminNotificationEmail(input: {
  title: string;
  preheader: string;
  intro: string;
  detailRows: EmailDetailRow[];
  cvAttached: boolean;
}): string {
  const cvNote = input.cvAttached
    ? `<p style="margin:16px 0 0;padding:12px 16px;border-radius:10px;background:${BRAND.purple50};font-size:14px;line-height:1.5;color:${BRAND.ink};"><strong>CV attached:</strong> The applicant's CV is attached to this email.</p>`
    : `<p style="margin:16px 0 0;padding:12px 16px;border-radius:10px;background:${BRAND.purple50};font-size:14px;line-height:1.5;color:${BRAND.muted};">No CV was uploaded with this application.</p>`;

  return renderBrandedEmail({
    title: input.title,
    preheader: input.preheader,
    eyebrow: 'New application',
    introHtml: `<p style="margin:0 0 8px;font-size:16px;line-height:1.6;color:${BRAND.ink};">${escapeHtml(input.intro)}</p>`,
    detailRows: input.detailRows,
    bodyHtml: cvNote,
    cta: {
      label: 'View join the team page',
      href: `${BRAND.siteUrl}/join-the-team`,
    },
  });
}
