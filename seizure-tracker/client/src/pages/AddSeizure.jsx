import SeizureForm from '../components/SeizureForm';

export default function AddSeizure() {
  const token = localStorage.getItem('token');
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-indigo mb-4">Log a Seizure</h1>
      <SeizureForm token={token} />
    </div>
  );
}
