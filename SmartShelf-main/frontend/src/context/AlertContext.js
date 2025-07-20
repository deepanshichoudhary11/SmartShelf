import { createContext, useContext, useState } from 'react';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const addAlert = (alert) => setAlerts(prev => [...prev, alert]);
  const updateAlert = (id, updates) =>
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));

  return (
    <AlertContext.Provider value={{ alerts, addAlert, updateAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
