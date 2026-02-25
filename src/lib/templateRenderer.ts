/**
 * Safe template renderer: {{key}} → value, unknown keys → "".
 * Output is plain text only; HTML is stripped. No script or HTML injection.
 */

const PLACEHOLDER_REGEX = /\{\{(\w+)\}\}/g;

function toPlainText(value: string): string {
  if (typeof value !== 'string') return '';
  return value.replace(/</g, '').replace(/>/g, '').replace(/&/g, '');
}

function getTemplateValue(data: Record<string, string>, key: string): string {
  if (data[key] !== undefined) return data[key];
  const lower = key.toLowerCase();
  const found = Object.keys(data).find((k) => k.toLowerCase() === lower);
  return found !== undefined ? data[found] : '';
}

export function renderTemplate(
  template: string,
  data: Record<string, string>
): string {
  if (typeof template !== 'string') return '';
  const out = template.replace(PLACEHOLDER_REGEX, (_, key: string) => {
    const raw = getTemplateValue(data, key);
    return toPlainText(raw);
  });
  return toPlainText(out);
}
