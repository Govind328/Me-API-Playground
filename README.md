Me-API Playground 

A full-stack project that stores and exposes my personal candidate profile via a small API and a minimal frontend.

Backend: Express + Node.js + MongoDB Atlas

Frontend: React (Vercel-hosted)

Hosting: Backend on Render, Frontend on Vercel

🔗 Live URLs

Frontend (React): (https://meapi-playground.netlify.app/)

Backend (API):(https://me-api-playground-vtaa.onrender.com)

Resume: (https://drive.google.com/file/d/1_kXlxezyFuGr41q5gUGbJn1VamTV9M_E/view?usp=sharing)

Features

CRUD operations for candidate profile (/profile)

Query projects by skill (/profile/projects?skill=...)

Get top skills (/profile/skills/top)

Search across profile (/profile/search?q=...)

Health check (/profile/health)

Minimal React UI for profile, projects, search

search

📡 API Endpoints
Health Check
curl https://me-api-playground-vtaa.onrender.com/health
# → { "status": "OK" }

Get Profile
curl https://me-api-playground-vtaa.onrender.com/api/profile

Update Profile
curl -X POST https://me-api-playground-vtaa.onrender.com/api/profile
  -H "Content-Type: application/json"
  -d '{ "name": "Govind Singh", "email": "govindsinghsatwas@gmail.com", 
  "skills": ["JavaScript", "Node.js", "React"] }'

Get Projects by Skill
curl "https://me-api-playground-vtaa.onrender.com/api/projects?skill=React"

Get Top Skills
curl https://me-api-playground-vtaa.onrender.com/api/skills/top

Search
curl "https://me-api-playground-vtaa.onrender.com/api/search?q=JavaScript"

✨ Built with passion by Govind Singh
