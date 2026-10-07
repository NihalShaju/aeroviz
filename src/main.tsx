import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Global cursor position tracker for interactive button glow effects
if (typeof window !== 'undefined') {
  window.addEventListener(
    'pointermove',
    (e: PointerEvent) => {
      const target = (e.target as HTMLElement | null)?.closest(
        '.btn-pink, .btn-glass, button, [role="button"], a.btn-pink, .glow-btn'
      ) as HTMLElement | null;
      if (target) {
        const rect = target.getBoundingClientRect();
        target.style.setProperty('--x', `${e.clientX - rect.left}px`);
        target.style.setProperty('--y', `${e.clientY - rect.top}px`);
      }
    },
    { passive: true }
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
