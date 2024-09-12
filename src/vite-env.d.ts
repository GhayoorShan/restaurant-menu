/// <reference types="vite/client" />

declare module "rollup-plugin-terser";
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
