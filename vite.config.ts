import { defineConfig } from "vitest/config";
const commitHash = require('child_process')
  .execSync('git rev-parse --short HEAD')
  .toString() ?? process.env.VITE_VERCEL_GIT_COMMIT_SHA;

export default defineConfig({
  test: {
    // ...
  },
  define: {
    __COMMIT_HASH__: JSON.stringify(commitHash),
  },
});