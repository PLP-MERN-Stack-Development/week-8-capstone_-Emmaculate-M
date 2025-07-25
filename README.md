# SeizureSafe(A Seizure Tracker & Emergency Alert Web App (MERN Stack))

This is a full-stack web application to help epilepsy patients track seizure events, send emergency alerts, and access their health history. The application is built using the **MERN stack**: MongoDB, Express.js, React.js, and Node.js.

## Tech Stack
- **Frontend**: Vite + React + TailwindCSS  
- **State Management**: React Context API (AuthContext)  
- **Routing**: React Router v6  
- **Backend**: Express.js + MongoDB + Mongoose  
- **Auth**: JWT-based authentication  
- **HTTP Client**: Axios  

## Features Implemented So Far

### Authentication
- Register & Login (JWT + bcrypt)
- Token is stored in `localStorage` and added to all protected API requests via Axios
- `AuthContext` to manage login state
- Protected routes using `PrivateRoute` wrapper

### Routing & Layout
- Basic routing setup via `react-router-dom`
- `App.jsx` as the layout shell using `<Outlet />`
- Public pages: `/`, `/register`, `/login`
- Private pages: `/dashboard`, `/add-seizure`, `/emergency-alert`

### Frontend Pages Created
- `Home.jsx`
- `Register.jsx`
- `Login.jsx`
- `Dashboard.jsx`
- `AddSeizure.jsx`
- `EmergencyAlert.jsx`

### Components
- `AlertCard.jsx` — reusable alert/notification component  
- `SeizureForm.jsx` — reusable form component for adding seizure info  

### Backend Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/auth/register` | POST | Register a new user |
| `/api/auth/login` | POST | Login & receive JWT |
| `/api/seizure/` | GET, POST | View & add seizure entries (protected) |
| `/api/seizure/:id` | DELETE | Delete seizure record (protected) |
| `/api/alert/emergency` | POST | Send emergency alert (protected) |

### Middleware
- `authMiddleware.js` to protect private API routes via JWT token

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
│   ├── AlertCard.jsx
│   ├── Navbar.jsx
│   └── SeizureForm.jsx
├── utils/
│    └── api.js
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
├── .env
└── server.js
```

##  To Run the Project

### Backend
```bash
cd server
pnpm install
pnpm dev
```

Ensure you have a `.env` with:
```
MONGO_URI=your_mongodb+srv://seizureAdmin:Nuru%2574710@cluster0.uqfpccd.mongodb.net/seizureTrackerDB?retryWrites=true&w=majority&appName=Cluster0mongodb_connection_string
JWT_SECRET=big_secret
PORT=5000
```

### Frontend
```bash
pnpm install
pnpm dev
```

Ensure `utils/api.js` contains:
```js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
```

## Next Steps
- Hook up Register & Login pages with real backend
- Test form submissions (Add Seizure, Emergency Alert)
- Add user feedback & error handling
- Deploy backend to Render & frontend to Netlify or Vercel