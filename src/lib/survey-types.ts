/**
 * Types for definition-driven surveys stored in Supabase.
 * Used by the survey form component and API.
 */

export type SurveyQuestionType = 'single' | 'multi' | 'scale' | 'text';

export interface SurveyQuestionBase {
  id: string;
  type: SurveyQuestionType;
  question: string;
}

export interface SurveyQuestionSingle extends SurveyQuestionBase {
  type: 'single';
  options: string[];
  followUp?: { showWhenValue: string; questions: SurveyQuestion[] };
}

export interface SurveyQuestionMulti extends SurveyQuestionBase {
  type: 'multi';
  options: string[];
}

export interface SurveyQuestionScale extends SurveyQuestionBase {
  type: 'scale';
  scaleLabels: { min: string; max: string };
  /** Scale size (e.g. 5 for 1-5) – used when scaleOptions not provided */
  scaleSize?: number;
  /** Text label for each point (e.g. ["Very easy", "Somewhat easy", "Neutral", "Somewhat difficult", "Very difficult"]). When set, these are shown and stored instead of numbers. */
  scaleOptions?: string[];
}

export interface SurveyQuestionText extends SurveyQuestionBase {
  type: 'text';
}

export type SurveyQuestion =
  | SurveyQuestionSingle
  | SurveyQuestionMulti
  | SurveyQuestionScale
  | SurveyQuestionText;

export interface SurveySection {
  id: string;
  title: string;
  questions: SurveyQuestion[];
}

export interface SurveyDefinition {
  introText?: string;
  sections: SurveySection[];
}

export type SurveyAnswers = Record<string, string | string[]>;
