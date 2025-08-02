# SeizureSafe(A Seizure Tracker & Emergency Alert Web App (MERN Stack))

SeizureSafe is a full-stack web application designed to help users track seizures and store an emergency contact for quick response in case of a seizure event. 

## Features

- User registration and authentication (JWT-based)
- Seizure logging, editing, and deletion
- User profile with personal medical information
- Emergency contact management (view and update)
- Emergency alert button to notify the emergency contact
- Responsive and accessible user interface

 
## Tech Stack

- Frontend: React (Vite), Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB (Mongoose)
- Authentication: JSON Web Tokens (JWT)
- API Communication: Axios

## Getting Started
### Prerequisites
Node.js (v18+ recommended)
MongoDB instance (local or cloud)
pnpm package manager

### Installation
1. Clone the repository:
git clone https://github.com/week-8-Capstone_-Emmaculate-M.git
cd week-8-Capstone_-Emmaculate-M
mkdir seizure-tracker
cd seizure-tracker
mkdir server
mkdir client

2. Install server dependencies:
cd server
pnpm install

3. Install client dependencies:
cd client
pnpm install

## Running Locally
### Start the backend server:
cd server
pnpm dev

### Start the frontend dev server:
cd client
pnpm dev

# API Endpoints
Auth
POST /api/auth/register - Register new user

POST /api/auth/login - User login

User
GET /api/users/me - Get current user profile

PATCH /api/users - Update user profile

GET /api/users/emergency-contact - Get emergency contact

PATCH /api/users/emergency-contact - Update emergency contact

Seizures
GET /api/seizures - Get user's seizures

POST /api/seizures - Add new seizure

PATCH /api/seizures/:id - Update seizure

DELETE /api/seizures/:id - Delete seizure

Alerts
POST /api/alerts - Send emergency alert to contact

## Folder Structure (Frontend)
```
src/
├── App.jsx
├── main.jsx
├── index.css
├── context/
│   └── AuthContext.jsx
├── routes/
│   └── PrivateRoute.jsx
├── pages/
│   ├── Home.jsx
│   ├── Register.jsx
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── AddSeizure.jsx
│   └── EmergencyAlert.jsx
├── components/
│   ├──tabs
│   │   ├── AlertsTab.jsx
│   │   ├── EmergencyContactTab.jsx
│   │   ├── LogsTab.jsx
│   │   └── ProfileTab.jsx
│   ├── AlertCard.jsx
│   ├── EmergencyAlertButton.jsx
│   ├── EmergencyContactForm.jsx
│   ├── LoadingSpinner.jsx
│   ├── Navbar.jsx
│   ├── ProfileEditForm.jsx
│   └── SeizureForm.jsx
├── utils/
│    ├── api.js
│    └── sendAlert.js
├── .env
```

## Folder Structure (Backend)
```
server/
├── models/
│   ├── SeizureLog.js 
│   └── User.js
├── routes/
│   ├── auth.js
│   ├── seizure.js
│   ├── alert.js
│   └── user.js
├── controllers/
│   ├── authController.js
│   ├── seizureController.js
│   └── alertController.js
├── middleware/
│   └── authMiddleware.js
├── config/
│   └── db.js
├── utils
│    └── sendAlert.js
├── .env
└── server.js
```


### Live Demo/Deployment URLs:
- Live frontend: https://seizuresafe00frontend.vercel.app/

- live backend: (https://week-8-capstone-emmaculate-m.onrender.com)

## Next Steps
Integrate Real Notifications
- Use services like Twilio (SMS) or SendGrid (email) for actual alerts.

Add Features
- Analytics/reporting on seizures.
- User community/support.
- Medication/appointment reminders.


## Author:
Emmaculate Mwania
