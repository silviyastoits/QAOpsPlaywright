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
    retries: 2,
    timeout : 30 * 1000,
    expect : {
      timeout: 5000,
    },
    reporter : 'html',
    projects : [
      {
        name: 'safari',
         use: {
      browserName : 'webkit',
      headless: true,
      screenshot: 'off',
      trace: 'on',
      // ...devices['iPhone 11'],
        }
      },
      {
        name: 'chrome',
         use: {
      browserName : 'chromium',
      headless: true,
      workers: 1,
      screenshot: 'on',
      video: 'retain-on-failure',
      ignoreHttpsErrrors: true,
      permissions: ['geolocation'],
      trace: 'on',
      // viewport : {width:720, height:720}

        }
      }

     
    ]
    
});
module.exports = config

