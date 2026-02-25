export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      surveys: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          created_at: string;
          active: boolean;
          definition: Json | null;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          created_at?: string;
          active?: boolean;
          definition?: Json | null;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          created_at?: string;
          active?: boolean;
          definition?: Json | null;
        };
      };
      survey_responses: {
        Row: {
          id: string;
          survey_id: string;
          answers: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          survey_id: string;
          answers?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          survey_id?: string;
          answers?: Json;
          created_at?: string;
        };
      };
    };
  };
}
