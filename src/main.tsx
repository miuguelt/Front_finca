import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './pages/app/App.tsx';
import { NextUIProvider } from '@nextui-org/react';
import { AuthProvider } from '@/context/AuthenticationContext'; // 👈 IMPORTANTE
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NextUIProvider>
      <AuthProvider> {/* 👈 Aquí envuelves tu App */}
        <App />
      </AuthProvider>
    </NextUIProvider>
  </StrictMode>
);
