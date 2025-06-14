import { useContext } from 'react';
import { AuthContext } from '@/context/AuthenticationContext';
import { AuthContextType } from '@/types/userTypes';  

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};