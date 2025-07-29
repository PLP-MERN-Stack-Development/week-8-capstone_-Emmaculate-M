import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [userInfo, setUserInfo] = useState(null);
  const [seizures, setSeizures] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;
    const fetchUserData = async () => {
      try {
        const userRes = await axios.get('https://week-8-capstone-emmaculate-m.onrender.com/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserInfo(userRes.data);

        const seizuresRes = await axios.get('https://week-8-capstone-emmaculate-m.onrender.com', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSeizures(seizuresRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchUserData();
  }, [token]);

  if (!token) {
    return (
      <div className="p-6 text-center text-orchid">
        Please <a href="/login" className="underline text-orchid">login</a> to access your dashboard.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-indigo mb-6">
        Welcome, {userInfo?.name || 'User'}
      </h1>
      <section>
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
    </div>
  );
}
