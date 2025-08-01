import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import api from '../../utils/api';
import EmergencyContactForm from '../EmergencyContactForm';
import LoadingSpinner from '../LoadingSpinner';
import ProfileEditForm from '../ProfileEditForm';

export default function ProfileTab() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/users/me');
        setUserInfo(res.data);
      } catch (err) {
        console.error('Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleEmergencyContactUpdate = (newContact) => {
    setUserInfo((prev) => ({ ...prev, emergencyContact: newContact }));
  };

  const handleProfileUpdated = (updatedUser) => {
    setUserInfo(updatedUser);
    setEditing(false);
  };

  const handleLogout = async () => {
    try {      
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <section className="p-4 md:p-6 bg-white rounded-lg shadow space-y-6">
      {/* Profile Picture */}
      {userInfo?.profilePic && (
        <div className="flex justify-center">
          <img
            src={userInfo.profilePic}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-2 border-indigo"
          />
        </div>
      )}

      {/* Personal Info */}
      <div>
        <h2 className="text-2xl font-semibold mb-2 text-indigo">Personal Information</h2>
        <p><span className="font-medium">Full Name:</span> {userInfo?.fullName || 'Not provided'}</p>
        <p><span className="font-medium">Email:</span> {userInfo?.email || 'Not provided'}</p>
        <p><span className="font-medium">Age:</span> {userInfo?.age || 'Not provided'}</p>
        <p><span className="font-medium">Medical History:</span> {userInfo?.medicalHistory || 'Not provided'}</p>
      </div>

      {/* Edit Button */}
      <div className="space-x-2">
        <button
          className="px-4 py-2 mr-3 rounded transition"
          style={{
            backgroundColor: '#A654DF',  
            color: '#EFE1E8',            
          }}
          onClick={() => setEditing(!editing)}
        >
          {editing ? 'Cancel Edit' : 'Edit Profile'}
        </button>        
        <button
          className="px-4 py-2 rounded transition"
          style={{
            backgroundColor: '#420264',  
            color: '#EFE1E8',            
          }}
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

      {/* Profile Edit Form */}
      {editing && (
        <ProfileEditForm userInfo={userInfo} onUpdate={handleProfileUpdated} />
      )}

      {/* Emergency Contact */}
      <div>
        <h2 className="text-2xl font-semibold mb-2 text-orchid">Emergency Contact</h2>
        <EmergencyContactForm
          initialContact={userInfo?.emergencyContact}
          onContactUpdated={handleEmergencyContactUpdate}
        />
      </div>     
    </section>
  );
}
