// src/pages/Dashboard.jsx
import { NavLink, Outlet } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-indigo mb-6">Dashboard</h1>

      {/* Tab Navigation */}
      <nav className="flex space-x-4 mb-6">
        <NavLink
          to="profile"
          className={({ isActive }) =>
            isActive
              ? 'text-violet border-b-2 border-violet pb-1 font-semibold'
              : 'text-gray-600 hover:text-orchid pb-1'
          }
        >
          Profile
        </NavLink>
        <NavLink
          to="alerts"
          className={({ isActive }) =>
            isActive
              ? 'text-violet border-b-2 border-violet pb-1 font-semibold'
              : 'text-gray-600 hover:text-orchid pb-1'
          }
        >
          Alerts
        </NavLink>
        <NavLink
          to="logs"
          className={({ isActive }) =>
            isActive
              ? 'text-violet border-b-2 border-violet pb-1 font-semibold'
              : 'text-gray-600 hover:text-orchid pb-1'
          }
        >
          Logs
        </NavLink>
      </nav>

      {/* Tab Content */}
      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  );
}
