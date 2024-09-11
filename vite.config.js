import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      fs: "empty", // Utilizza 'empty' per i moduli che non devono essere eseguiti nel browser
      url: "url",
      path: "path-browserify",
      "source-map-js": "empty", // Utilizza 'empty' per i moduli che non devono essere eseguiti nel browser
    },
  },
});
