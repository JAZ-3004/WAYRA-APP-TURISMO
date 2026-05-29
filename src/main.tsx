import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// ── Registro del Service Worker para PWA ────────────────────
const registerServiceWorker = () => {
  if (!('serviceWorker' in navigator)) {
    console.info('[PWA] Este navegador no soporta Service Workers.');
    return;
  }

  // Detectar si estamos dentro de un iframe (ej: AI Studio preview)
  // En iframe cross-origin, window.top lanza excepción de seguridad
  const isInIframe = (() => {
    try {
      return window.self !== window.top;
    } catch {
      return true;
    }
  })();

  if (isInIframe) {
    console.info(
      '[PWA] Service Worker omitido: la app corre dentro de un iframe. ' +
      'Abre la app en una pestaña propia para instalarla como PWA.'
    );
    return;
  }

  const doRegister = () => {
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then((reg) => {
        console.log('[PWA] Service Worker registrado. Scope:', reg.scope);

        // Escuchar actualizaciones disponibles
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (!newWorker) return;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('[PWA] Nueva versión disponible. Recarga para actualizar.');
            }
          });
        });

        // Forzar búsqueda de actualización en cada carga
        reg.update().catch(() => {});
      })
      .catch((err) => {
        console.error('[PWA] Error al registrar el Service Worker:', err);
      });
  };

  // Esperar a que la página haya cargado completamente
  if (document.readyState === 'loading') {
    window.addEventListener('load', doRegister);
  } else {
    doRegister();
  }
};

registerServiceWorker();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);