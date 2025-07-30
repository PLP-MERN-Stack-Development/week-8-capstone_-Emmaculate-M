import { useEffect, useState } from 'react';
import api from '../../utils/api';
import LoadingSpinner from '../LoadingSpinner';

export default function AlertsTab() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await api.get('/alerts'); // Adjust this route as per your backend
        setAlerts(res.data);
      } catch (err) {
        console.error('Failed to fetch alerts', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <section className="p-4 md:p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4 text-orchid">Alert History</h2>
      {alerts.length === 0 ? (
        <p className="text-indigo">No alerts sent yet.</p>
      ) : (
        <ul className="space-y-4">
          {alerts.map((alert) => (
            <li
              key={alert._id}
              className="p-4 bg-[#EFE1E8] border border-violet rounded-xl shadow-sm"
            >
              <p className="text-sm text-indigo">📅 {new Date(alert.createdAt).toLocaleString()}</p>
              <p className="text-lg font-semibold text-[#7E3680]">
                Sent to: {alert.recipientName || 'Unknown Contact'}
              </p>
              <p className="text-sm text-gray-600">{alert.message || 'No message provided'}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
