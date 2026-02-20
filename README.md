# 🗓️ Routinely

Routinely is a full-stack habit tracking and routine management application designed to help users build consistency, stay accountable, and track daily progress.

The project includes a backend API for managing data and a modern React frontend built with Vite for a fast and responsive user experience.

---

## 📂 Project Structure

The repository contains:

```
Routinely/
├── backend/              # Backend server (Python)
├── frontend/             # Frontend application (React + Vite)
├── .gitignore
└── README.md
```

---

## 🎯 Project Overview

Routinely is designed to:

📅 Create and manage daily habits  
📊 Track progress over time  
🔁 Encourage consistency through structured routines  
⚡ Provide a clean, fast, and responsive user interface  
🔐 Connect frontend and backend through API integration  

This project demonstrates core full-stack development concepts including:

- RESTful API development  
- State management in React  
- Client-server communication  
- Component-based frontend architecture  
- Environment configuration and local deployment  

---

## 🧠 Tech Stack

**Backend**
- Python  
- REST API framework (Flask / FastAPI / similar)  

**Frontend**
- React  
- Vite  

**Development Tools**
- Node.js  
- npm  
- Virtual environments (venv)  

---

## 🚀 How to Run the Project

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Saniya2021/Routinely.git
cd Routinely
```

---

## 🔧 Backend Setup

### Create Virtual Environment

```bash
cd backend
python3 -m venv venv
source venv/bin/activate     # macOS/Linux
venv\Scripts\activate        # Windows
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Run Backend Server

```bash
python app.py
```

The backend will typically run on:

```
http://localhost:8000
```

---

## 💻 Frontend Setup

### Navigate to Frontend Folder

```bash
cd frontend
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

The frontend will typically run on:

```
http://localhost:5173
```

---

## ⚙️ Environment Variables

You may need to configure environment variables.

### Backend `.env`

```
DATABASE_URL=
SECRET_KEY=
```

### Frontend `.env`

```
VITE_API_BASE_URL=http://localhost:8000
```

---

## 🧪 Future Improvements

- User authentication system  
- Database integration  
- Data visualization dashboard  
- Streak tracking & analytics  
- Deployment configuration  

---

## 📌 Purpose

Routinely is a practical full-stack project that strengthens skills in:

- API design  
- React application structure  
- Full-stack integration  
- Local development workflows  
- Scalable project organization  
