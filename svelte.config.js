import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import("@sveltejs/kit").Config} */
const config = {
  preprocess: vitePreprocess(),
  
  onwarn: (warning, handler) => {
    if (warning.code.startsWith("a11y-")) {
      return;
    }
    handler(warning);
  },
  
  kit: {
    adapter: adapter(),
    alias: {
      $styles: "src/app.css",
      $widgets: "src/widgets"
    },
    outDir: "build"
  }
};

export default config;
