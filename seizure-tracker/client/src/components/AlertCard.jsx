export default function AlertCard({ message, type = 'info' }) {
  const typeColors = {
    success: 'bg-cream text-indigo border-indigo',
    error: 'bg-orchid text-cream border-violet',
    warning: 'bg-violet text-cream border-orchid',
    info: 'bg-indigo text-cream border-violet',
  };

  return (
    <div
      className={`border-l-4 p-4 rounded mb-4 ${typeColors[type] || typeColors.info}`}
      role="alert"
    >
      <p className="font-medium">{message}</p>
    </div>
  );
}
