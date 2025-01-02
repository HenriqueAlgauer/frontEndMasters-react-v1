import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  {
    extends: "./vite.config.js",
    test: {
      include: ["**/*.node.test.jsx"],
      name: "happy-dom",
      environment: "happy-dom",
      coverage: ["text", "json", "html"]
    }
  },
  {
    extends: "./vite.config.js",
    test: {
      setupFiles: ["vitest-browser-react"],
      include: ["**/*.browser.test.jsx"],
      name: "browser",
      browser: {
        provider: "playwright",
        enabled: true,
        name: "chromium"
      }
    }
  }
])