// src/utils/sendAlert.js
import api from './api'; 

export const triggerEmergencyAlert = async () => {
  try {
    const response = await api.post('/alerts/emergency');
    return response.data;
  } catch (error) {
    console.error('Error triggering emergency alert:', error.response?.data || error.message);
    throw error;
  }
};
