import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
createRoot(document.getElementById('root')).render(
  <><BrowserRouter>
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}  afterSignOutUrl="/" debug>
 
  <App />

  </ClerkProvider> </BrowserRouter>
</>
)
