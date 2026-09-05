import vinext from "vinext";
import { defineConfig } from "vite";

// EC2 runs the Node server; the default config remains the Sites/Worker build.
export default defineConfig({ plugins: [vinext()] });
