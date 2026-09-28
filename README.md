# Library Management System

A complete MERN stack practical project for a virtual internship.

## Features
- React responsive dashboard
- Add, view, update and delete books
- Search by title, author, category or ISBN
- Available/Borrowed status
- MongoDB persistence
- Express REST API
- Validation and error handling
- Responsive mobile layout

## Project Structure
```
Library_Management_System/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Requirements
- Node.js
- MongoDB Community Server or MongoDB Atlas

## Run Backend
```bash
cd backend
npm install
```

Create `.env` from `.env.example`:
```env
MONGO_URI=mongodb://127.0.0.1:27017/library_management
PORT=5000
```

Then:
```bash
npm run dev
```

## Run Frontend
Open another terminal:
```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal, normally:
`http://localhost:5173`

## API Endpoints
- GET `/api/books`
- GET `/api/books/:id`
- POST `/api/books`
- PUT `/api/books/:id`
- DELETE `/api/books/:id`

## Submission
Upload the project to GitHub and use the repository URL in the Skyrovix Task 1 submission form. You can also attach screenshots and a project PDF.
