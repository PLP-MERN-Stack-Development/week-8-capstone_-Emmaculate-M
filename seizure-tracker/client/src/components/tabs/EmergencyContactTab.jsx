// src/components/tabs/EmergencyContactTab.jsx

import { useEffect, useState } from 'react';
import EmergencyContactForm from '../forms/EmergencyContactForm';
import api from '../../utils/api';

export default function EmergencyContactTab() {
  const [contact, setContact] = useState('');

  const fetchContact = async () => {
    try {
      const res = await api.get('/users/emergency-contact');
      console.log('Fetched emergency contact:', res.data.emergencyContact);
      setContact(res.data.emergencyContact || '');
    } catch (err) {
      console.error('Failed to fetch emergency contact:', err);
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-indigo">Manage Emergency Contact</h2>
      <EmergencyContactForm
        initialContact={contact}
        onContactUpdated={(updated) => setContact(updated)}
      />
    </div>
  );
}
