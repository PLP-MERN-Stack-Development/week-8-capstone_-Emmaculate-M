// src/components/forms/EmergencyContactForm.jsx

import { useEffect, useState } from 'react';
import api from '../utils/api';

export default function EmergencyContactForm({ initialContact = '', onContactUpdated = () => {} }) {
  const [contact, setContact] = useState(initialContact);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setContact(initialContact);
  }, [initialContact]);

  const isValidContact = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d{7,15}$/;
    return emailRegex.test(value) || phoneRegex.test(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!isValidContact(contact)) {
      setMessage('Please enter a valid phone number or email address.');
      return;
    }

    setLoading(true);

    try {
      await api.patch('/users/emergency-contact', { emergencyContact: contact });
      setMessage('Emergency contact updated!');
      onContactUpdated(contact);
    } catch (err) {
      setMessage('Failed to update emergency contact.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 max-w-md mx-auto bg-white p-4 rounded-xl shadow">
      <label className="block mb-2 font-semibold text-indigo" htmlFor="emergency-contact">
        Emergency Contact (phone/email):
      </label>
      <input
        id="emergency-contact"
        type="text"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        className="border p-2 rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-violet"
        placeholder="Enter emergency contact"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className={`py-2 px-4 rounded text-cream ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo hover:bg-violet transition'
        }`}
      >
        {loading ? 'Saving...' : 'Save Contact'}
      </button>
      {message && (
        <p className="mt-2 text-sm text-orchid">
          {message}
        </p>
      )}
    </form>
  );
}
