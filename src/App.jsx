import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import AppRouter from './app/AppRouter';
import ErrorBoundary from './components/common/ErrorBoundary';

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AppProvider>
          <AppRouter />
        </AppProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
