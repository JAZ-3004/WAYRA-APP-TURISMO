import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// ── Registro del Service Worker para PWA ────────────────────
// Solo se registra en producción o cuando esté fuera de un iframe
// (en AI Studio corre en un iframe, por eso se bloquea la instalación)
const registerServiceWorker = () => {
  if (!('serviceWorker' in navigator)) return;

  // Detectar si estamos dentro de un iframe (AI Studio preview)
  const isInIframe = (() => {
    try {
      return window.self !== window.top;
    } catch {
      return true; // bloqueado por cross-origin → es un iframe
    }
  })();

  if (isInIframe) {
    console.info(
      '[PWA] Service Worker no registrado: la app corre dentro de un iframe (AI Studio). ' +
      'Abre la app en una pestaña propia para instalarla.'
    );
    return;
  }

  const register = () => {
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then((reg) => {
        console.log('[PWA] Service Worker registrado. Scope:', reg.scope);

        // Comprobar actualizaciones cada vez que se carga la página
        reg.update().catch(() => {});
      })
      .catch((err) => {
        console.error('[PWA] Error al registrar el Service Worker:', err);
      });
  };

  if (document.readyState === 'loading') {
    window.addEventListener('load', register);
  } else {
    register();
  }
};

registerServiceWorker();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);