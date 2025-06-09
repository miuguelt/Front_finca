// main.tsx (o index.tsx)
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // <- Asegúrate de que está aquí
import App from './pages/app/App'
import { NextUIProvider } from '@nextui-org/react'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NextUIProvider>
      <BrowserRouter> {/* <- EL BrowserRouter DEBE ESTAR AQUÍ Y SOLO AQUÍ */}
        <App />
      </BrowserRouter>
    </NextUIProvider>
  </StrictMode>,
)