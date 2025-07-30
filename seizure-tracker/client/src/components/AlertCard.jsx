import { CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export default function AlertCard({ message, type = 'info' }) {
  const icons = {
    success: <CheckCircle className="w-5 h-5 mr-2 text-[#420264]" />,
    error: <AlertCircle className="w-5 h-5 mr-2 text-[#EFE1E8]" />,
    warning: <AlertTriangle className="w-5 h-5 mr-2 text-[#EFE1E8]" />,
    info: <Info className="w-5 h-5 mr-2 text-[#EFE1E8]" />,
  };

  const typeStyles = {
    success: 'bg-[#EFE1E8] text-[#420264] border-[#420264]',
    error: 'bg-[#7E3680] text-[#EFE1E8] border-[#A654DF]',
    warning: 'bg-[#A654DF] text-[#EFE1E8] border-[#7E3680]',
    info: 'bg-[#420264] text-[#EFE1E8] border-[#A654DF]',
  };

  return (
    <div
      className={`flex items-start border-l-4 p-4 rounded-xl shadow-sm ${typeStyles[type] || typeStyles.info}`}
      role="alert"
    >
      {icons[type]}
      <p className="text-sm font-medium leading-relaxed">{message}</p>
    </div>
  );
}
