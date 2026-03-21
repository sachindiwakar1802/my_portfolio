# XP Portfolio Refactor & Completion Walkthrough

I have successfully refactored the XP Portfolio project, transforming it from a monolithic `App.jsx` into a modular, maintainable, and dynamic application.

## Key Accomplishments

### 1. Architectural Refactoring
- **Modular Components**: Extracted UI elements into standalone components (`Window`, `DesktopIcon`, `StartMenu`).
- **Section-Based Content**: Divided all portfolio sections into their own files under `src/components/sections/`.
- **Configuration**: Centralized API management in `config.js`.

### 2. Enhanced Features
- **Dynamic Projects**: The Projects section is now fully connected to the backend. It includes an **Admin UI** to add and delete projects dynamically.
- **Full Resume**: A professional, styled HTML/CSS resume that supports printing/saving as PDF.
- **Improved Navigation**: Fixed explorer "Back" navigation and modernized UI transitions.
- **SEO Ready**: Updated `index.html` with relevant meta tags for search engine visibility.

### 3. Backend & Data
- **Project Model**: Added a new `Project` schema and CRUD routes to the Express server.
- **Environment Driven**: API URL is now configurable via `.env` / `import.meta.env`.

## How to Start

1.  **Backend**: Go to the `/server` directory and run:
    ```bash
    node index.js
    ```
    *Ensure MongoDB is running locally at `mongodb://localhost:27017/portfolio-xp`.*

2.  **Frontend**: In the root directory, run:
    ```bash
    npm run dev
    ```
    *The app will be available at `http://localhost:5174/` or similar.*

## Admin Access
To manage content (Achievements, Photos, Journal, Projects):
- Click on the **User Avatar** in the Start Menu.
- Enter the admin password (default: `admin123`).
- Navigate to the respective section and you will see the **"Add"** and **"Delete"** controls.

Enjoy your new, clean, and professional XP-themed portfolio!
