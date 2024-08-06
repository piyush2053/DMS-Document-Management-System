import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
type EmailContextType = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
};

const EmailContext = createContext<EmailContextType | undefined>(undefined);
export const EmailProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [email, setEmail] = useState(() => {
    return localStorage.getItem('email') || '';
  });
console.log(email)
  useEffect(() => {
    localStorage.setItem('email', email);
  }, [email]);

  const emailContextValue = { email, setEmail };

  return (
    <EmailContext.Provider value={emailContextValue}>
      {children}
    </EmailContext.Provider>
  );
};

export const useEmail = () => {
  const context = useContext(EmailContext);
  if (!context) {
    throw new Error('useEmail must be used within an EmailProvider');
  }
  return context;
};
