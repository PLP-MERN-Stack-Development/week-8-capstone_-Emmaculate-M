import { useState } from 'react';
import api from '../utils/api';

export default function EmergencyAlertButton({ setStatus }) {
  const [loading, setLoading] = useState(false);

  const handleAlert = async () => {
    setLoading(true);
    setStatus(null);
    try {
      // Matches backend route mounted at '/api/alerts'
      const res = await api.post('/alerts/emergency');
      setStatus({ type: 'success', message: res.data.message || 'Emergency alert sent!' });
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to send alert';
      setStatus({ type: 'error', message: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-6">
      <button
        onClick={handleAlert}
        disabled={loading}
        className={`px-6 py-3 font-bold rounded-xl text-cream shadow-md transition duration-300 ease-in-out
          ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-orchid hover:bg-violet animate-pulse'
          }
          focus:outline-none focus:ring-2 focus:ring-violet`}
      >
        {loading ? 'Sending...' : 'Send Emergency Alert'}
      </button>
    </div>
  );
}
