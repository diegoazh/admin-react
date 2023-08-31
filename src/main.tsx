import { NextUIProvider } from '@nextui-org/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { KeycloakProvider } from './components/KeycloakProvider.tsx';
import './index.css';
import './i18n-next';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <KeycloakProvider>
      <NextUIProvider>
        <main
          id="main-wrapper"
          className="light text-foreground bg-background font-mulish"
        >
          <App />
        </main>
      </NextUIProvider>
    </KeycloakProvider>
  </React.StrictMode>
);
