import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

function Login() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Logging in with:', formData);
      const res = await api.post('/auth/login', formData);
      await login({ user: res.data.user, token: res.data.token });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-cream rounded-lg shadow">
      <h2 className="text-xl font-bold text-indigo mb-4">Login</h2>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="p-2 border rounded" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="p-2 border rounded" required />
        <button type="submit" className="bg-orchid text-cream py-2 px-4 rounded hover:bg-violet transition-all">Login</button>
      </form>
    </div>
  );
}

export default Login;
