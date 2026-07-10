/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BREAKIT?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
