export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
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
      roles: {
        Row: {
          id: string;
          slug: string;
          role_name: string;
          role_type: string;
          compensation_type: Database['public']['Enums']['compensation_type'];
          employment_type: Database['public']['Enums']['employment_type'];
          short_description: string;
          long_description: string;
          closing_date: string | null;
          pay: string | null;
          description_pdf_url: string | null;
          status: Database['public']['Enums']['role_status'];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          role_name: string;
          role_type: string;
          compensation_type: Database['public']['Enums']['compensation_type'];
          employment_type: Database['public']['Enums']['employment_type'];
          short_description?: string;
          long_description?: string;
          closing_date?: string | null;
          pay?: string | null;
          description_pdf_url?: string | null;
          status?: Database['public']['Enums']['role_status'];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          role_name?: string;
          role_type?: string;
          compensation_type?: Database['public']['Enums']['compensation_type'];
          employment_type?: Database['public']['Enums']['employment_type'];
          short_description?: string;
          long_description?: string;
          closing_date?: string | null;
          pay?: string | null;
          description_pdf_url?: string | null;
          status?: Database['public']['Enums']['role_status'];
          created_at?: string;
          updated_at?: string;
        };
      };
      volunteer_applications: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          email: string;
          mobile: string;
          address: string;
          send_experience: Database['public']['Enums']['volunteer_send_experience_level'];
          cv_path: string | null;
          consent_contact: boolean;
          consent_news: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          first_name: string;
          last_name: string;
          email: string;
          mobile: string;
          address: string;
          send_experience: Database['public']['Enums']['volunteer_send_experience_level'];
          cv_path?: string | null;
          consent_contact: boolean;
          consent_news: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          first_name?: string;
          last_name?: string;
          email?: string;
          mobile?: string;
          address?: string;
          send_experience?: Database['public']['Enums']['volunteer_send_experience_level'];
          cv_path?: string | null;
          consent_contact?: boolean;
          consent_news?: boolean;
          created_at?: string;
        };
      };
      role_applications: {
        Row: {
          id: string;
          role_id: string;
          first_name: string;
          last_name: string;
          email: string;
          mobile: string;
          address: string;
          dbs_held: boolean;
          send_experience: Database['public']['Enums']['send_experience_level'];
          cv_path: string | null;
          consent_contact: boolean;
          consent_news: boolean;
          session_thu_30_jul: boolean | null;
          session_thu_6_aug: boolean | null;
          session_thu_13_aug: boolean | null;
          session_thu_20_aug: boolean | null;
          session_thu_27_aug: boolean | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          role_id: string;
          first_name: string;
          last_name: string;
          email: string;
          mobile: string;
          address: string;
          dbs_held: boolean;
          send_experience: Database['public']['Enums']['send_experience_level'];
          cv_path?: string | null;
          consent_contact: boolean;
          consent_news: boolean;
          session_thu_30_jul?: boolean | null;
          session_thu_6_aug?: boolean | null;
          session_thu_13_aug?: boolean | null;
          session_thu_20_aug?: boolean | null;
          session_thu_27_aug?: boolean | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          role_id?: string;
          first_name?: string;
          last_name?: string;
          email?: string;
          mobile?: string;
          address?: string;
          dbs_held?: boolean;
          send_experience?: Database['public']['Enums']['send_experience_level'];
          cv_path?: string | null;
          consent_contact?: boolean;
          consent_news?: boolean;
          session_thu_30_jul?: boolean | null;
          session_thu_6_aug?: boolean | null;
          session_thu_13_aug?: boolean | null;
          session_thu_20_aug?: boolean | null;
          session_thu_27_aug?: boolean | null;
          created_at?: string;
        };
      };
    };
    Enums: {
      role_status: 'draft' | 'open' | 'closed';
      compensation_type: 'paid' | 'volunteer';
      employment_type: 'full_time' | 'part_time' | 'freelance' | 'n_a';
      send_experience_level: 'lived_experience' | 'basic_knowledge' | 'professional';
      volunteer_send_experience_level:
        | 'lived_experience'
        | 'basic_knowledge'
        | 'expert_knowledge'
        | 'no_knowledge';
    };
  };
};
