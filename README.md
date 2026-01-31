# Professional Showcase Portfolio

This is a modern, responsive portfolio application built for academic and professional showcasing. It features a clean, high-contrast design optimized for readability and professional authority.

## 🚀 Features

- **Academic Focused**: Dedicated sections for research, publications, awards, and education.
- **Responsive Design**: Works perfectly on desktops, tablets, and mobile devices.
- **Dynamic Content**: Fetches profile data, experience, and academic achievements from a backend API.
- **Flexible Storage**: Supports both PostgreSQL (with Drizzle ORM) and an automatic In-Memory fallback for local development.

## 🛠️ Technology Stack

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Lucide Icons.
- **Backend**: Node.js, Express, tsx.
- **Database**: Drizzle ORM, PostgreSQL (Optional).

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended. Verified on v22.20.0)
- npm (usually comes with Node.js)

## ⚡ Getting Started (Local Development)

### 1. Clone or Open the Project
Ensure you are in the project root directory where `package.json` is located.

### 2. Install Dependencies
Open your terminal (PowerShell or Command Prompt) and run:
```powershell
npm install
```

### 3. Run the Development Server
Run the following command to start both the backend API and the frontend development server:
```powershell
npm run dev
```

The application will be available at:
👉 **[http://localhost:5001](http://localhost:5001)**

---

## 🗄️ Database Information

This project is configured to be **plug-and-play**:
- **Automatic Fallback**: If you do **not** have a `DATABASE_URL` environment variable set, the application will automatically use an **In-Memory Storage**.
- **Seeding**: On startup, the application automatically seeds itself with default data (for NL. Swathi) if the storage is empty.
- **Production/Postgres**: To use a real database, set the `DATABASE_URL` environment variable (e.g., in a `.env` file) and run `npm run db:push`.

## 💻 Windows specific notes

- The project uses `cross-env` to ensure environment variables work correctly on Windows.
- The server is configured to run on `localhost:5001` to avoid common Windows socket permission issues.

## 📁 Project Structure

- `/client`: React frontend application.
- `/server`: Express backend and storage logic.
- `/shared`: Shared schemas and route definitions.
- `/attached_assets`: Original source documents (CVs, etc.).

## 📝 Scripts

- `npm run dev`: Starts development server with hot-reloading.
- `npm run build`: Builds the application for production.
- `npm run start`: Runs the production build.
- `npm run check`: Performs TypeScript type-checking.
