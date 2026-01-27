# Growly 

**Live Demo:** https://growly-app.vercel.app  

> ⚠️ The deployed version runs **DEMO mode only**.  
> To start the application, click **"Uruchom wersję demo"** on the landing page.  
>  
> For the **full experience (with local backend and data persistence)**, please see **Installation & Running the App** below.

> A web application for habit tracking, learning, and personal development, featuring data visualization and flashcards.
>
> The Growly project was created as a student project as part of computer science studies.

---

## Application Purpose

Growly was created to help users with:
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
- Available in the online demo version

### Local Backend Mode
- Express.js server
- JSON files used as a local database
- Full CRUD operations
- Allows realistic data persistence without cloud services
- Recommended for full application experience

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
   - Flashcard study mode ("know / don`t know") with progress statistics.

4. **Statistics** (SOON)
   - Analysis of user activity over time,
   - Heatmaps, line charts, and learning path comparisons,
   - Insights and achievement summaries.

5. **Settings** (SOON)
   - User profile management,
   - Preferences and data export/import,
   - Notifications and version information.

---

## Technologies

- **Frontend:** React + TypeScript + CSS Modules  
- **Backend:** Express.js (local / JSON)  
- **Charts:**  Recharts  
- **Styling:** Dark theme, minimalist interface  
- **Font:** Inter (clean, modern, and readable)

---

## Users / Roles

- **End User:** A person tracking habits and learning progress, creating learning paths and flashcards.

---

## Installation & Running the App

### Requirements
Before running the application locally, make sure you have installed:
- **Node.js** (recommended LTS version)
- **npm** (comes with Node.js)

You can verify installation with:
```bash
node -v
npm -v
```
```bash
git clone https://github.com/KamilKonopski/growly.git
```

Frontend
```bash
cd growly/frontend
npm install
npm run dev
```

Backend
```bash
cd growly/backend
npm install
npm run dev
```
