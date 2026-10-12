import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E Test Configuration for Cortiware
 * 
 * Tests both tenant-app and provider-portal against local dev servers
 * or deployed environments (staging/production).
 */

export default defineConfig({
  testDir: './tests/e2e-playwright',
  
  // Maximum time one test can run
  timeout: 30 * 1000,
  
  // Test execution settings
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter configuration
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  
  // Shared settings for all projects
  use: {
    // Base URL for tests - can be overridden by environment variables
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    
    // Collect trace on first retry
    trace: 'on-first-retry',
    
    // Screenshot on failure
    screenshot: 'only-on-failure',
    
    // Video on failure
    video: 'retain-on-failure',
  },

  // Configure projects for different apps and browsers
  projects: [
    // Tenant App Tests - Chromium
    {
      name: 'tenant-app-chromium',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.TENANT_APP_URL || 'http://localhost:3000',
      },
      testMatch: /.*tenant-app.*\.spec\.ts/,
    },
    
    // Tenant App Tests - Firefox
    {
      name: 'tenant-app-firefox',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: process.env.TENANT_APP_URL || 'http://localhost:3000',
      },
      testMatch: /.*tenant-app.*\.spec\.ts/,
    },
    
    // Tenant App Tests - Mobile Safari
    {
      name: 'tenant-app-mobile',
      use: {
        ...devices['iPhone 13'],
        baseURL: process.env.TENANT_APP_URL || 'http://localhost:3000',
      },
      testMatch: /.*tenant-app.*\.spec\.ts/,
    },
    
    // Provider Portal Tests - Chromium
    {
      name: 'provider-portal-chromium',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.PROVIDER_PORTAL_URL || 'http://localhost:3001',
      },
      testMatch: /.*provider-portal.*\.spec\.ts/,
    },
    
    // Provider Portal Tests - Firefox
    {
      name: 'provider-portal-firefox',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: process.env.PROVIDER_PORTAL_URL || 'http://localhost:3001',
      },
      testMatch: /.*provider-portal.*\.spec\.ts/,
    },
  ],

  // Web server configuration for local development
  webServer: process.env.E2E_LOCAL === 'true' || !process.env.CI ? [
    {
      command: process.env.E2E_LOCAL === 'true' ? 'npm run start --workspace=tenant-app -- -p 3000' : 'npm run dev --workspace=tenant-app',
      url: process.env.E2E_LOCAL === 'true' ? 'http://127.0.0.1:3000' : 'http://localhost:3003',
      env: { DATABASE_URL: process.env.DATABASE_URL!, DIRECT_DATABASE_URL: process.env.DIRECT_DATABASE_URL! },
      reuseExistingServer: !process.env.CI,
      timeout: 120 * 1000,
    },
    {
      command: process.env.E2E_LOCAL === 'true' ? 'npm run start --workspace=provider-portal -- -p 3001' : 'npm run dev --workspace=provider-portal',
      url: process.env.E2E_LOCAL === 'true' ? 'http://127.0.0.1:3001' : 'http://localhost:3000',
      env: { DATABASE_URL: process.env.PROVIDER_DATABASE_URL || process.env.DATABASE_URL!, DIRECT_DATABASE_URL: process.env.PROVIDER_DATABASE_URL || process.env.DIRECT_DATABASE_URL! },
      reuseExistingServer: !process.env.CI,
      timeout: 120 * 1000,
    },
  ] : undefined,
});

