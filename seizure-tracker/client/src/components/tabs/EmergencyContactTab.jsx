// src/components/tabs/EmergencyContactTab.jsx

import { useEffect, useState } from 'react';
import EmergencyContactForm from '../forms/EmergencyContactForm';
import api from '../../utils/api';

export default function EmergencyContactTab() {
  const [contact, setContact] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchContact = async () => {
    try {
      const res = await api.get('/users/emergency-contact');
      setContact(res.data.emergencyContact || '');
    } catch (err) {
      console.error('Failed to fetch emergency contact:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);

  if (loading) return <p className="text-center text-indigo">Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-indigo">Manage Emergency Contact</h2>

      {contact && (
        <p className="mb-4 text-sm text-gray-700">
          <span className="font-medium text-indigo">Current Contact:</span> {contact}
        </p>
      )}

      <EmergencyContactForm
        key={contact}
        initialContact={contact}
        onContactUpdated={(updated) => setContact(updated)}
      />
    </div>
  );
}
