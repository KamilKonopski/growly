# Growly 

  **Live Demo:** Coming soon

> A web application for habit tracking, learning, and personal development, featuring data visualization and flashcards.
>
> The Growly project was created as a student project as part of computer science studies.

---

## Application Purpose

- Growly was created to help users with:
- Building habits consistently,
- Organizing learning paths,
- Creating and reviewing flashcards,
- Tracking progress through charts and statistics.

The application combines productivity, personal development, and learning into one interactive tool.

---

## Application Modes

Growly supports two application modes:

### DEMO Mode
- No backend required
- Data stored locally in Redux store
- Perfect for UI testing and quick previews
- Enabled by default
- Refreshing resets the app

### Local Backend Mode
- Express.js server
- JSON files used as a local database
- Full CRUD operations
- Allows realistic data persistence without cloud services

---

## Core Features

1. **Dashboard**
   - Overview of daily and weekly activities,
   - Activity and learning progress charts,
   - Daily motivational quotes.

2. **Habits**
   - Creating and editing custom habits,
   - Tracking progress using percentages, calendar views, and line charts,
   - Daily check-ins for completed habits.

3. **Learning**
   - Creating learning paths (topics, lessons),
   - Flashcards tab for reviewing materials,
   - Flashcard study mode (“know / don’t know”) with progress statistics.

4. **Statistics**
   - Analysis of user activity over time,
   - Heatmaps, line charts, and learning path comparisons,
   - Insights and achievement summaries.

5. **Settings**
   - User profile management,
   - Preferences and data export/import,
   - Notifications and version information.

---

## Technologies

- **Frontend:** React + TypeScript + CSS Modules  
- **Backend:** Express.js (local / JSON)  
- **Charts:** Chart.js / Recharts  
- **Styling:** Dark theme, minimalist interface 
- **Font:** Inter (clean, modern, and readable)

---

## Users / Roles

- **End User:** A person tracking habits and learning progress, creating learning paths and flashcards. 

---

## Installation & Running the App

### Frontend
```bash
git clone https://github.com/KamilKonopski/growly.git
cd growly/frontend
npm install
npm run dev
```
### Local Backend (optional)
```bash
cd growly/backend
npm install
npm run dev
```
