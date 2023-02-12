import { defineConfig } from "vitest/config";
const commitHash = require('child_process')
  .execSync('git rev-parse --short HEAD')
  .toString();

console.log(commitHash);

console.log('testt');

export default defineConfig({
  test: {
    // ...
  },
  define: {
    __COMMIT_HASH__: JSON.stringify(commitHash),
  },
});