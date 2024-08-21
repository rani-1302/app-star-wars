import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Create a root for React 18
const container = document.getElementById('root');
const root = createRoot(container!); // Use the ! operator to assert that container is not null

root.render(<App />);
