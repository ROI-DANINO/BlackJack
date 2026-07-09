import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import initCore from './bridge/wasm/blackjack_core';
import { App } from './app/App';

// WASM must finish async init before any core call. Gate the mount on it.
async function bootstrap() {
  await initCore();
  createRoot(document.getElementById('root')!).render(
    <StrictMode><App /></StrictMode>,
  );
}
void bootstrap();
