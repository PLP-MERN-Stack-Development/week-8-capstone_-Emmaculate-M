import { useEffect, useState } from 'react';
import api from '../../utils/api';
import LoadingSpinner from '../LoadingSpinner';

export default function LogsTab() {
  const [seizures, setSeizures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await api.get('/seizures');
        setSeizures(res.data);
      } catch (err) {
        console.error('Failed to fetch logs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <section className="p-4 md:p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4 text-orchid">Your Seizure Logs</h2>
      {seizures.length === 0 ? (
        <p className="text-indigo">No seizure logs recorded yet.</p>
      ) : (
        <ul className="space-y-3">
          {seizures.map((seizure) => (
            <li
              key={seizure._id}
              className="p-4 border border-cream rounded shadow hover:shadow-md transition cursor-pointer"
            >
              <p><strong>Date:</strong> {new Date(seizure.date).toLocaleDateString()}</p>
              <p><strong>Duration:</strong> {seizure.duration}</p>
              <p><strong>Notes:</strong> {seizure.notes}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
