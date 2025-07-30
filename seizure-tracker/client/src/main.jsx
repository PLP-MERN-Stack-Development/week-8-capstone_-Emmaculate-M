import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProfileTab from './components/tabs/ProfileTab.jsx';
import AlertsTab from './components/tabs/AlertsTab.jsx';
import LogsTab from './components/tabs/LogsTab.jsx';
import AddSeizure from './pages/AddSeizure';
import EmergencyAlert from './pages/EmergencyAlert';
import Home from './pages/Home';
import PrivateRoute from './routes/PrivateRoute';
import { AuthProvider } from './context/AuthContext'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />}>
            {/* Public Routes */}
            <Route index element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />

            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="dashboard" element={<Dashboard />}>
                {/* Nested Tab Routes */}
                <Route index element={<Navigate to="profile" replace />} />
                <Route path="profile" element={<ProfileTab />} />
                <Route path="alerts" element={<AlertsTab />} />
                <Route path="logs" element={<LogsTab />} />
              </Route>
              <Route path="add-seizure" element={<AddSeizure />} />
              <Route path="emergency" element={<EmergencyAlert />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
