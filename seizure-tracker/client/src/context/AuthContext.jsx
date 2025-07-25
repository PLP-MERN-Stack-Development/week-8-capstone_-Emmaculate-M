import { createContext, useContext, useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import axios from '../utils/api'; // This uses your base Axios instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: null,
    loading: true,
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Load user from localStorage on app load
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    let parsedUser = null;
    try {
      if (storedUser) {
        parsedUser = JSON.parse(storedUser);
      }
    } catch (error) {
      console.error('Failed to parse user from localStorage:', error);
      // Optional: clear corrupted value
      localStorage.removeItem('user');
    }

    if (parsedUser && storedToken) {
      setAuth({
        user: parsedUser,
        token: storedToken,
        loading: false,
      });
      // Add token to Axios headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    } else {
      setAuth((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  const login = async (userData) => {
    setAuth({
      user: userData.user,
      token: userData.token,
      loading: false,
    });

    localStorage.setItem('user', JSON.stringify(userData.user));
    localStorage.setItem('token', userData.token);

    axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;

    navigate('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setAuth({ user: null, token: null, loading: false });

    delete axios.defaults.headers.common['Authorization'];

    navigate('/login');
  };

  const isAuthenticated = !!auth.token;

  return (
    <AuthContext.Provider value={{ ...auth, login, logout, isAuthenticated }}>
      {auth.loading ? <div className="text-center py-10">Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
