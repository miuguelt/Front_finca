import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './pages/app/App.tsx';
import { NextUIProvider } from '@nextui-org/react';
import './index.css';
createRoot(document.getElementById('root')).render(_jsx(StrictMode, { children: _jsx(NextUIProvider, { children: _jsx(App, {}) }) }));
