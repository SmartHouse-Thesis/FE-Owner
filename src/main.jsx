import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import '../public/js/index.js';
import '../public/css/index.css';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PayloadProvider } from './context/payload.jsx';
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PayloadProvider>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
    </PayloadProvider>
  </React.StrictMode>
);
