import React, { useState, useEffect } from 'react';
import { Check, Plus, X, Play } from 'lucide-react';

interface NotificationProps {
  type: 'added' | 'removed' | 'playing' | 'error';
  title: string;
  message?: string;
  duration?: number;
  onClose?: () => void;
}

const NotificationToast: React.FC<NotificationProps> = ({ 
  type, 
  title, 
  message, 
  duration = 3000,
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose?.(), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'added':
        return <Check className="w-5 h-5 text-green-400" />;
      case 'removed':
        return <X className="w-5 h-5 text-red-400" />;
      case 'playing':
        return <Play className="w-5 h-5 text-white fill-current" />;
      default:
        return <X className="w-5 h-5 text-red-400" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'added':
        return 'bg-green-600/90';
      case 'removed':
        return 'bg-red-600/90';
      case 'playing':
        return 'bg-netflix-red/90';
      default:
        return 'bg-gray-800/90';
    }
  };

  return (
    <div
      className={`fixed bottom-4 right-4 z-[100] transform transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className={`${getBackgroundColor()} backdrop-blur-sm border border-white/20 rounded-lg p-4 shadow-2xl max-w-sm`}>
        <div className="flex items-center space-x-3">
          {getIcon()}
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">{title}</p>
            {message && (
              <p className="text-gray-300 text-xs mt-1">{message}</p>
            )}
          </div>
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => onClose?.(), 300);
            }}
            className="text-gray-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Toast manager component
interface ToastData {
  id: string;
  type: 'added' | 'removed' | 'playing' | 'error';
  title: string;
  message?: string;
}

interface ToastManagerProps {
  toasts: ToastData[];
  onRemoveToast: (id: string) => void;
}

export const ToastManager: React.FC<ToastManagerProps> = ({ toasts, onRemoveToast }) => {
  return (
    <div className="fixed bottom-4 right-4 z-[100] space-y-2">
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          style={{
            transform: `translateY(${index * -60}px)`,
            zIndex: 100 - index
          }}
        >
          <NotificationToast
            type={toast.type}
            title={toast.title}
            message={toast.message}
            onClose={() => onRemoveToast(toast.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default NotificationToast;
