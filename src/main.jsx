import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TagManager from 'react-gtm-module';

const tagManagerArgs = {
    // gtmId: 'GTM-KDF75342'
    gtmId: 'G-NEV3BJ504X'
};

TagManager.initialize(tagManagerArgs);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
