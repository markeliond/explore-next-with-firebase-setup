import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    testDir: 'tests/integration',
    timeout: 10000,
    //   globalSetup: require.resolve('./tests/globalSetup'),
    use: {
        // Browser options
        headless: true,
        //slowMo: 50,

        // Context options
        //viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,

        // Artifacts
        screenshot: 'only-on-failure',
        //video: 'retry-with-video',

    },
};
export default config;