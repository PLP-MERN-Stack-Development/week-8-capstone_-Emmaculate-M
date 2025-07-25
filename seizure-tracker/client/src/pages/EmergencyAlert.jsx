export default function EmergencyAlert() {
  const handleAlert = () => {
    alert('Emergency alert triggered! Notifying your caregiver...');
    // TODO: integrate actual alert notification (SMS, email, push etc.)
  };

  return (
    <div className="p-6 text-center bg-cream min-h-screen">
      <h1 className="text-2xl font-bold text-indigo mb-4">Emergency SOS</h1>
      <button
        onClick={handleAlert}
        className="bg-red-600 text-white px-6 py-3 rounded shadow hover:bg-red-700 transition"
      >
        Send Emergency Alert
      </button>
    </div>
  );
}
