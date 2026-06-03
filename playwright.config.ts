import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://127.0.0.1:8080',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run dev',
    reuseExistingServer: false,
    timeout: 120_000,
    url: 'http://127.0.0.1:8080',
  },
})
