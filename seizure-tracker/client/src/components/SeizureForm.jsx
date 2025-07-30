import { useState } from 'react'; 
import axios from 'axios';
import AlertCard from './AlertCard';

export default function SeizureForm({ token }) {
  const [formData, setFormData] = useState({
    seizureType: '',
    customType: '',
    duration: '',
    notes: '',
  });

  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedType =
      formData.seizureType === 'Other' ? formData.customType : formData.seizureType;

    try {
      const res = await axios.post(
        'https://week-8-capstone-emmaculate-m.onrender.com/api/seizures',
        {
          type: selectedType,
          duration: formData.duration,
          notes: formData.notes,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAlert({ type: 'success', message: 'Seizure logged successfully!' });
      setFormData({ seizureType: '', customType: '', duration: '', notes: '' });
    } catch (err) {
      setAlert({ type: 'error', message: err.response?.data?.message || 'Error logging seizure.' });
    }
  };

  const seizureOptions = [
    'Tonic-Clonic',
    'Absence',
    'Myoclonic',
    'Atonic',
    'Focal Aware',
    'Focal Impaired Awareness',
    'Clonic',
    'Other',
  ];

  return (
    <div className="p-4 bg-white shadow rounded-lg max-w-md mx-auto">
      {alert && <AlertCard type={alert.type} message={alert.message} />}
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          <span className="text-indigo">Seizure Type</span>
          <select
            name="seizureType"
            value={formData.seizureType}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-cream rounded shadow-sm"
          >
            <option value="">Select a type</option>
            {seizureOptions.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        {formData.seizureType === 'Other' && (
          <label className="block mb-2">
            <span className="text-indigo">Custom Seizure Type</span>
            <input
              type="text"
              name="customType"
              value={formData.customType}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-cream rounded shadow-sm"
            />
          </label>
        )}

        <label className="block mb-2">
          <span className="text-indigo">Duration (in seconds)</span>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-cream rounded shadow-sm"
          />
        </label>
        <label className="block mb-4">
          <span className="text-indigo">Notes</span>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="mt-1 block w-full border-cream rounded shadow-sm"
          />
        </label>
        <button
          type="submit"
          className="bg-orchid text-cream px-4 py-2 rounded hover:bg-violet transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
