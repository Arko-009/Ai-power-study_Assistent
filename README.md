<div align="center">
  <img src="https://img.shields.io/badge/AI-Powered-emerald?style=for-the-badge" alt="AI Powered" />
  <h1>🧠 AI Learning Assistant</h1>
  <p><em>Transform your static documents into interactive, AI-driven learning experiences!</em></p>
</div>

---

## 🌟 Introduction
**AI Learning Assistant** is a modern, full-stack MERN web application designed to supercharge your study sessions. By uploading PDF documents, the app leverages the power of Google's Gemini AI to instantly generate interactive quizzes, flashcards, document summaries, and an intelligent chat interface to help you understand complex concepts faster than ever before.

## ✨ Features & Functionality
- 📄 **Smart Document Management:** Upload and organize your study materials (PDFs) securely.
- 🤖 **AI Chat Interface:** "Talk" directly to your documents. Ask questions and get instant AI explanations.
- 🎯 **Auto-Generated Quizzes:** Test your knowledge! The AI reads your document and generates personalized multiple-choice quizzes. Re-attempt them anytime and track your historical progress!
- 📇 **Interactive Flashcards:** Memorize key concepts effortlessly with auto-generated, reviewable flashcards.
- 📊 **Progress Dashboard:** Track your learning journey with a beautiful, responsive dashboard showing your total documents, quizzes, and recent activities.
- 📱 **Seamlessly Responsive:** A sleek, glassy UI built with TailwindCSS that looks and feels like a native premium app on any device size.

## 📸 Screenshots
> *(Screenshots coming soon!)*

- **Dashboard View:** `[Add Screenshot Here]`
- **Document Chat & Viewer:** `[Add Screenshot Here]`
- **Quiz Results & History:** `[Add Screenshot Here]`

## 🚀 Local Setup & Installation

Follow these steps to run the project locally on your machine:

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd Ai-power-study_Assistent
```

### 2. Setup the Backend
```bash
cd backend
npm install
```
**Environment Variables (CRITICAL):** 
To run the backend, you'll need the proper `.env` configuration (containing MongoDB, Gemini API, and Cloudinary keys).
👉 **[Click here to get the .env configuration file](https://docs.google.com/document/d/1PEwOGBV9Fvp6idTZem633W17kJr688pAOzO7ZtjW6Xc/edit?usp=sharing)**

*Copy the contents from the link above and place them in a newly created `.env` file inside the `backend` directory.*

Start the backend server:
```bash
npm run dev
# The server will start on http://localhost:8000
```

### 3. Setup the Frontend
Open a new terminal window:
```bash
cd Ai-learn-assistant
npm install
npm run dev
```
The application will launch in your browser! (Usually on `http://localhost:5173`)

## 📁 Folder Structure

```text
Ai-power-study_Assistent/
├── Ai-learn-assistant/      # Frontend (Vite + React)
│   ├── public/              # Static assets
│   └── src/                 # React source code
│       ├── components/      # Reusable UI (Auth, Chat, Flashcards, Layout, Quizzes)
│       ├── context/         # React Context (AuthContext)
│       ├── pages/           # Route views (Dashboard, Document, Quizzes)
│       └── services/        # API communication (Axios)
│
└── backend/                 # Backend (Node.js + Express)
    ├── config/              # Database connection
    ├── controllers/         # Route logic (AI, Auth, Documents, Quizzes)
    ├── middleware/          # JWT Auth & Error handling
    ├── models/              # MongoDB Schemas
    └── routes/              # Express API Routes
```

---
<div align="center">
  <i>Built with ❤️ using MongoDB, Express, React, Node.js & Gemini AI.</i>
  <br/>
  <br/>
  <small><em>MyTracking Timestamps - QuizResult Page - 6:02:53 ; (25/05/2026)</em></small>
</div>
