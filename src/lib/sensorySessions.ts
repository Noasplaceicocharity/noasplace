export const SENSORY_SESSION_ROLE_SLUGS = new Set([
  'sensory-session-support-team-member',
  'sensory-session-lead',
]);

export const SENSORY_SESSION_OPTIONS = [
  { field: 'sessionThu30Jul', column: 'session_thu_30_jul', label: 'Thu 30th July' },
  { field: 'sessionThu6Aug', column: 'session_thu_6_aug', label: 'Thu 6th August' },
  { field: 'sessionThu13Aug', column: 'session_thu_13_aug', label: 'Thu 13th Aug' },
  { field: 'sessionThu20Aug', column: 'session_thu_20_aug', label: 'Thu 20th August' },
  { field: 'sessionThu27Aug', column: 'session_thu_27_aug', label: 'Thu 27th August' },
] as const;

export type SensorySessionField = (typeof SENSORY_SESSION_OPTIONS)[number]['field'];
export type SensorySessionColumn = (typeof SENSORY_SESSION_OPTIONS)[number]['column'];

export type SensorySessionSelections = Record<SensorySessionField, boolean>;

export function roleRequiresSensorySessionDates(slug: string): boolean {
  return SENSORY_SESSION_ROLE_SLUGS.has(slug.trim().toLowerCase());
}

export function emptySensorySessionSelections(): SensorySessionSelections {
  return SENSORY_SESSION_OPTIONS.reduce(
    (acc, option) => {
      acc[option.field] = false;
      return acc;
    },
    {} as SensorySessionSelections
  );
}

export function parseSensorySessionSelections(
  formData: FormData
): SensorySessionSelections {
  return SENSORY_SESSION_OPTIONS.reduce(
    (acc, option) => {
      acc[option.field] = formData.get(option.field) === 'yes';
      return acc;
    },
    {} as SensorySessionSelections
  );
}

export function hasSensorySessionSelection(selections: SensorySessionSelections): boolean {
  return SENSORY_SESSION_OPTIONS.some((option) => selections[option.field]);
}

export function formatSensorySessionSelections(selections: SensorySessionSelections): string {
  const selected = SENSORY_SESSION_OPTIONS.filter((option) => selections[option.field]).map(
    (option) => option.label
  );
  return selected.length > 0 ? selected.join(', ') : 'None selected';
}

export function sensorySessionSelectionsToColumns(
  selections: SensorySessionSelections
): Record<SensorySessionColumn, boolean> {
  return SENSORY_SESSION_OPTIONS.reduce(
    (acc, option) => {
      acc[option.column] = selections[option.field];
      return acc;
    },
    {} as Record<SensorySessionColumn, boolean>
  );
}
