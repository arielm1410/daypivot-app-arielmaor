# DayPivot

Quick decision-making assistant — find clarity in every decision, today.

🔗 **Live app:** https://daypivot-app-arielmaor.vercel.app

## Overview
DayPivot is a mobile-first web app that helps people make small, everyday decisions quickly. Instead of managing tasks, users answer a short set of smart questions and get an instant, confidence-scored recommendation based on a built-in priority matrix.

## The Problem
People often hesitate over small decisions during the day — wasting time and mental energy weighing options, especially under time pressure. Most productivity apps focus on managing tasks, not on the actual moment of deciding.

## Who It's For
Anyone who hesitates over small, daily decisions — students juggling assignments, busy professionals making many choices a day, or simply people who feel mentally overloaded and want a quick way to think more clearly.

## Competitors & Differentiation
| Competitor | What it does | What's missing |
|---|---|---|
| Notion | Task & project management | No real-time decision support, just organizes existing tasks |
| Todoist | To-do lists | Manages tasks, doesn't help choose between options |
| Doing it manually / asking friends | The default today | Slow, inconsistent, no structured framework |

**DayPivot's differentiation:** it's not another task manager — it's built specifically around the *moment of deciding*, using guided smart questions and a priority matrix to produce an instant, scored recommendation.

## Tech Stack
- **Frontend:** React + Vite, React Router
- **Backend:** Supabase (PostgreSQL database + Auth)
- **Hosting:** Vercel

## External Services & Integrations
| Service | Type | Used for |
|---|---|---|
| Supabase Auth | Authentication | User sign up / login (email + password) |
| Supabase Postgres Database | Database | Storing profiles, decisions, answers, and priorities |

## Database (ERD)
![ERD](./ERD.png)

Tables: `profiles`, `decisions`, `answers`, `priorities` — linked to Supabase's built-in `auth.users`.

## Main Pages
- `/` Login
- `/register` Register
- `/dashboard` Dashboard
- `/questions` Decision Questions flow
- `/result` Decision Result (saves to Supabase)
- `/history` Decision History (loaded from Supabase)
- `/profile` Profile
- `/settings` Settings
- `/forgot-password` Forgot Password

## Run Locally
npm install
npm run dev

Create a .env file in the project root with:
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

## Vibe Coding Process — How I Used AI

This entire project was built using the AI-augmented workflow taught in the course — React + Vite, Supabase, Vercel, and AI tools at every stage, exactly as the course methodology defines.

**Ideation & Research:** I used an AI chat assistant to brainstorm app ideas, run a 5-minute validation test on the top candidates, and pressure-test the leading idea with hard questions ("why wouldn't someone just use Notion?"). I made the final call to commit to DayPivot, then used AI to research real competitors (Notion, Todoist, Google Keep) and estimate market size.

**Planning & Architecture:** I directed AI to draft the system architecture and database schema, then reviewed and adjusted both — deciding which entities and relationships actually matched my product, not just what was suggested.

**Design:** I built wireframes and a mood board myself, then used Google Stitch to convert my design choices (colors, fonts, spacing) into a working design system and styled mockups — keeping the structure I had already decided on.

**Frontend Build:** I used an AI coding assistant to translate the approved designs into React components and pages, following the component breakdown and routing I had planned in advance.

**Backend & Deployment:** I built the Supabase tables and RLS policies based on my own ERD. For final deployment, I worked with Claude to debug a Vercel routing issue that only appeared on mobile (404 on direct page loads), resume a paused Supabase project, wire up the environment variables correctly, and systematically verify the finished product against the grading rubric before submitting.

**Takeaway:** AI was the tool I used at every stage — for thinking, building, and debugging — but every product decision (the problem, the audience, the design direction, what to keep and what to cut) was mine. That's the core skill this course is built around.

## Author
Ariel Maor — ID 325511442
