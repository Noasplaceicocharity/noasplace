-- Seed: Every Child Achieving and Thriving Survey (SEND White Paper)
-- Use this survey id in your Notion Take Action database (SurveyId field).
-- Example id: a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11

insert into public.surveys (id, title, description, active, definition)
values (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'The government''s SEND White Paper, Every Child Achieving and Thriving Survey',
  'The government has announced proposed changes to the SEND system. We want to understand what families are experiencing right now and what they need going forward. This short survey will help us present real parent voices and real data to MPs and decision-makers. Takes 2–3 minutes. Anonymous unless you choose to share your details.',
  true,
  '{
    "introText": "The government has announced proposed changes to the SEND system.\n\nWe want to understand what families are experiencing right now and what they need going forward.\n\nThis short survey will help us present real parent voices and real data to MPs and decision-makers.\n\nTakes 2–3 minutes\nAnonymous unless you choose to share your details",
    "sections": [
      {
        "id": "section1",
        "title": "About Your Child (Context Data)",
        "questions": [
          {
            "id": "q1",
            "type": "single",
            "question": "What age group is your child?",
            "options": ["Early years (0–4)", "Primary school", "Secondary school", "Post-16"]
          },
          {
            "id": "q2",
            "type": "single",
            "question": "Does your child currently have an EHCP?",
            "options": ["Yes", "No", "In assessment process", "Refused"]
          },
          {
            "id": "q3",
            "type": "single",
            "question": "How long did you wait (or have you waited) for support?",
            "options": ["Under 3 months", "3–6 months", "6–12 months", "Over a year", "Still waiting"]
          }
        ]
      },
      {
        "id": "section2",
        "title": "Current Experience",
        "questions": [
          {
            "id": "q4",
            "type": "scale",
            "question": "How easy has it been to access support for your child?",
            "scaleLabels": { "min": "Very easy", "max": "Very difficult" },
            "scaleSize": 5,
            "scaleOptions": ["Very easy", "Somewhat easy", "Neutral", "Somewhat difficult", "Very difficult"]
          },
          {
            "id": "q5",
            "type": "multi",
            "question": "Which of these have you experienced? (Select all that apply)",
            "options": ["Long waiting lists", "Lack of communication", "Support not delivered as promised", "School unable to meet needs", "Had to fight for support", "None of these"]
          },
          {
            "id": "q6",
            "type": "single",
            "question": "Have you ever had to challenge a decision about your child''s support?",
            "options": ["Yes", "No"],
            "followUp": {
              "showWhenValue": "Yes",
              "questions": [
                {
                  "id": "q6a",
                  "type": "multi",
                  "question": "How did you challenge it?",
                  "options": ["Complaint to school", "Local authority complaint", "Tribunal/appeal", "Advocacy support", "Other"]
                }
              ]
            }
          }
        ]
      },
      {
        "id": "section3",
        "title": "White Paper Awareness",
        "questions": [
          {
            "id": "q7",
            "type": "single",
            "question": "Before today, had you heard about the proposed SEND reforms?",
            "options": ["Yes — I understand them well", "Yes — but I don''t understand them", "No"]
          },
          {
            "id": "q8",
            "type": "single",
            "question": "What is your biggest concern about SEND reforms?",
            "options": ["Losing support", "Losing rights", "School provision quality", "Waiting times", "Lack of information", "I''m unsure"]
          }
        ]
      },
      {
        "id": "section4",
        "title": "What Families Need",
        "questions": [
          {
            "id": "q9",
            "type": "single",
            "question": "What would make the biggest difference to your child right now? (Choose one)",
            "options": ["Faster assessments", "Therapy access", "Better school support", "Clear guidance for parents", "Someone to help navigate the system"]
          },
          {
            "id": "q10",
            "type": "scale",
            "question": "How strongly do you agree with this statement: Support should be available before a child reaches crisis point.",
            "scaleLabels": { "min": "Strongly agree", "max": "Strongly disagree" },
            "scaleSize": 5,
            "scaleOptions": ["Strongly agree", "Agree", "Neutral", "Disagree", "Strongly disagree"]
          }
        ]
      },
      {
        "id": "section5",
        "title": "Voice & Evidence",
        "questions": [
          {
            "id": "q11",
            "type": "text",
            "question": "In your own words, what is the biggest challenge your family faces in the SEND system?"
          },
          {
            "id": "q12",
            "type": "text",
            "question": "What one change would you most like decision-makers to make?"
          }
        ]
      },
      {
        "id": "section6",
        "title": "Permission + Optional Contact",
        "questions": [
          {
            "id": "q13",
            "type": "single",
            "question": "May we share your responses anonymously in reports to MPs and decision-makers?",
            "options": ["Yes", "No"]
          },
          {
            "id": "q14",
            "type": "single",
            "question": "Would you like updates about the consultation and SEND changes?",
            "options": ["Yes (enter email below)", "No"],
            "followUp": {
              "showWhenValue": "Yes (enter email below)",
              "questions": [
                {
                  "id": "q14_email",
                  "type": "text",
                  "question": "Email address"
                }
              ]
            }
          }
        ]
      }
    ]
  }'::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  description = excluded.description,
  definition = excluded.definition,
  active = excluded.active;
