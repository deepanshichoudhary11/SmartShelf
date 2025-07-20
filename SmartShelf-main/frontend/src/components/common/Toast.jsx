import React from 'react';

const Toast = ({ message, type = 'info', show }) => {
  if (!show) return null;

  const baseStyles = 'fixed bottom-4 right-4 px-4 py-3 rounded shadow-lg text-white z-50';
  const typeStyles = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500 text-black',
  };

  return (
    <div className={`${baseStyles} ${typeStyles[type] || typeStyles.info}`}>
      {message}
    </div>
  );
};

export default Toast;
