import { useState } from 'react';
import api from '../utils/api';

export default function ProfileEditForm({ userInfo, onUpdate }) {
  const [formData, setFormData] = useState({
    fullName: userInfo?.fullName || '',
    age: userInfo?.age || '',
    medicalHistory: userInfo?.medicalHistory || '',
    profilePic: userInfo?.profilePic || '',
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (formData.age && (formData.age < 0 || formData.age > 120)) newErrors.age = 'Invalid age';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await api.patch('/users', formData);
      onUpdate(res.data.user); // update parent component
      setSuccess('Profile updated!');
    } catch (err) {
      console.error(err);
      setSuccess('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium text-[color:#420264]">Full Name</label>
        <input
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="input input-bordered w-full border-[color:#7E3680] focus:border-[color:#A654DF] focus:ring-1 focus:ring-[color:#A654DF]"
        />
        {errors.fullName && (
          <p className="text-[color:#7E3680] text-sm mt-1">{errors.fullName}</p> // orchid error
        )}
      </div>

      <div>
        <label className="block font-medium text-[color:#420264]">Age</label>
        <input
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          className="input input-bordered w-full border-[color:#7E3680] focus:border-[color:#A654DF] focus:ring-1 focus:ring-[color:#A654DF]"
        />
        {errors.age && (
          <p className="text-[color:#7E3680] text-sm mt-1">{errors.age}</p>
        )}
      </div>

      <div>
        <label className="block font-medium text-[color:#420264]">Medical History</label>
        <textarea
          name="medicalHistory"
          value={formData.medicalHistory}
          onChange={handleChange}
          className="textarea textarea-bordered w-full border-[color:#7E3680] focus:border-[color:#A654DF] focus:ring-1 focus:ring-[color:#A654DF]"
        />
      </div>

      <div>
        <label className="block font-medium text-[color:#420264]">Profile Picture (URL)</label>
        <input
          name="profilePic"
          value={formData.profilePic}
          onChange={handleChange}
          className="input input-bordered w-full border-[color:#7E3680] focus:border-[color:#A654DF] focus:ring-1 focus:ring-[color:#A654DF]"
        />
      </div>

      <button
        type="submit"
        className="btn bg-[color:#7E3680] hover:bg-[color:#A654DF] text-cream font-semibold w-full"
      >
        Update
      </button>

      {success && (
        <p className="text-[color:#A654DF] mt-2 font-medium">{success}</p> // violet success
      )}
    </form>
  );
}
