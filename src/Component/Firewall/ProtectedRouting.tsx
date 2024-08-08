import React from 'react';
import { Navigate } from 'react-router-dom';
import { useEmail } from '../../Store/Provider';

interface Props {
  element: React.ReactElement; 
}

const ProtectedRoute: React.FC<Props> = ({ element }) => { 
  const { email } = useEmail();

  if (email && email.includes('@')) {
    return element;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
