// @ts-check
import { defineConfig, devices } from '@playwright/test';
//import { config } from 'node:process';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
  const config = ({
    testDir : './tests',
    timeout : 40 * 1000,
    expect : {
      timeout: 5000,
    },
    reporter : 'html',
    use : {
      browserName : 'chromium',
      headless: false,
      screenshot: 'on',
      trace: 'on'
    },
});
module.exports = config

