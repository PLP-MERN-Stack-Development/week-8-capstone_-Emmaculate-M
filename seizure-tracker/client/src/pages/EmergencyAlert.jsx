import EmergencyAlertButton from '../components/EmergencyAlertButton';
import { useState } from 'react';
import AlertCard from '../components/AlertCard';

export default function EmergencyAlert() {
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message: string }

  return (
    <div className="p-6 text-center min-h-screen bg-[#EFE1E8]">
      <h1 className="text-3xl font-bold text-[#420264] mb-6">Emergency SOS</h1>

      {status && (
        <div className="mb-4">
          <AlertCard type={status.type} message={status.message} />
        </div>
      )}

      <EmergencyAlertButton setStatus={setStatus} />
    </div>
  );
}
