/**
 * Safely extract iframe src from Notion SurveyEmbed rich text.
 * Does not inject raw HTML; returns a validated URL for manual iframe render.
 */

const IFRAME_SRC_REGEX = /<iframe[^>]+src\s*=\s*["']([^"']+)["']/i;
const HTTPS_ONLY = /^https:\/\//i;

export function parseSurveyEmbedSrc(embedHtml: string): { src: string } | null {
  if (!embedHtml || typeof embedHtml !== 'string') return null;
  const trimmed = embedHtml.trim();
  const match = trimmed.match(IFRAME_SRC_REGEX);
  if (!match?.[1]) return null;
  const src = match[1].trim();
  if (!HTTPS_ONLY.test(src)) return null;
  return { src };
}
