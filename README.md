A full-stack project that stores and exposes my personal candidate profile via a RESTful API and React frontend.

🚀 Live Demo
Frontend (React): https://meapi-playground.netlify.app/
Backend (API): https://me-api-playground-vtaa.onrender.com
Resume:(https://drive.google.com/file/d/1en578isZ2NsE-YBEHntI4K1hgqQLwQJW/view?usp=sharing)

🛠️ Tech Stack
Backend: Express.js + Node.js + SQLite
Frontend: React.js
Database: SQLite
Hosting: Backend on Render, Frontend on Netlify

📋 Features
✅ CRUD operations for candidate profile (/profile)
✅ Query projects by skill (/projects?skill=...)
✅ Get top skills (/skills/top)
✅ Search across profile (/search?q=...)
✅ Health check (/health)
✅ Minimal React UI for profile, projects, search

📡 API Endpoints
Health Check
bash
curl https://me-api-playground-vtaa.onrender.com/health
Response: { "status": "OK" }

Get Profile
bash
curl https://me-api-playground-vtaa.onrender.com/api/profile
Update Profile
bash
curl -X POST https://me-api-playground-vtaa.onrender.com/api/profile
  -H "Content-Type: application/json"
  -d '{ "name": "Govind Singh", "email": "govindsinghsatwas@gmail.com", "skills": ["JavaScript", "Node.js", "React"] }'
Get Projects by Skill
bash
curl "https://me-api-playground-vtaa.onrender.com/api/projects?skill=React"
Get Top Skills
bash
curl https://me-api-playground-vtaa.onrender.com/api/skills/top
Search Profile
bash
curl "https://me-api-playground-vtaa.onrender.com/api/search?q=JavaScript"
🏗️ Architecture
text
Client (React App)
    │
    ▼
Netlify (Frontend Hosting)
    │
    ▼
Render (Backend Hosting)
    │
    ▼
SQLite Database (with seeded resume data)
📊 Database Schema
The SQLite database includes tables for:
profiles - Personal and contact information
skills - Technical skills with proficiency ratings (1-5)
projects - Portfolio projects with descriptions and links
work_experience - Professional experience
profile_links - Social and portfolio links

🎯 Frontend Features
Profile Display - Personal information, education background
Skills Showcase - Categorized technical skills with proficiency ratings
Project Portfolio - Interactive project gallery with filtering capabilities
Work Experience - Professional experience and internships
Search Functionality - Comprehensive search across all profile content
Responsive Design - Optimized for both desktop and mobile devices

📁 Project Structure
text
Me-API-Playground/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── database/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── routes/
│   ├── database.sqlite
│   ├── package.json
│   └── schema.sql
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   └── build/
├── netlify.toml
├── render.yaml
└── README.md
🔧 Installation & Local Development
Backend Setup
bash
cd backend
npm install
npm run seed  # Populates database with resume data
npm start     # Starts server on http://localhost:5000
Frontend Setup
bash
cd frontend
npm install
npm start     # Starts development server on http://localhost:3000
🌐 Deployment
Frontend to Netlify
Connect your GitHub repository to Netlify
Set build command: cd frontend && npm run build
Set publish directory: frontend/build
Configure environment variables as needed

Backend to Render
Connect your GitHub repository to Render
Set build command: npm install
Set start command: npm start
Configure environment variables and database

👨‍💻 Developer
Govind Singh

📧 Email: govindsinghsatwas@gmail.com
💼 LinkedIn: https://www.linkedin.com/in/govind-singh-131806232/

🐱 GitHub: https://github.com/Govind328

🌐 Portfolio: https://bitbridge.netlify.app/
