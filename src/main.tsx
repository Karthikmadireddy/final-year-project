import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { initializeTensorFlow } from './utils/tensorflow';

const init = async () => {
  try {
    await initializeTensorFlow();
    
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error('Failed to initialize application:', error);
    document.getElementById('root')!.innerHTML = `
      <div style="color: red; padding: 20px;">
        Failed to initialize application: ${error instanceof Error ? error.message : 'Unknown error'}
      </div>
    `;
  }
};

init();