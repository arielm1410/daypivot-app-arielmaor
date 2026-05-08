# DayPivot App

DayPivot is a mobile-first React + Vite frontend project for a decision-making assistant.

## What works in this version

- Category selection by topic
- 100 smart questions, divided into 10 categories
- 4 answer options for every question
- Back and Next navigation
- Dynamic progress bar
- Confidence score calculation
- Decision result screen
- History page with saved decisions and answered questions
- Local browser storage using localStorage
- Dummy data only, no backend connection

## Run the project

```bash
npm install
npm run dev
```

## Main pages

- `/` Login
- `/register` Register
- `/dashboard` Dashboard with categories and progress
- `/questions` Category selection and question flow
- `/result` Decision Result
- `/history` Saved decision history
- `/profile` Profile and progress
- `/settings` Settings
- `/forgot-password` Forgot Password


## Added in v3

- Search bar for finding categories
- Option to change topic while answering questions
- Improved Priority Matrix text
- Practical decision tip on the Result screen
- Decision tip is saved and shown in History


## Added in v4

- Quick Search now works as a real search input
- User can search categories from the Dashboard
- User can write a custom decision question
- Custom question opens a guided decision flow
- Custom decision result gives a practical tip
