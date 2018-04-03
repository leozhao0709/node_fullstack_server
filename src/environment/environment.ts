export let environment: {
    PORT: string;
    MONGODB_URI: string;
    AUTH_SECRET: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    COOKIE_KEY: string;
    GOOGLE_CALL_BACK_URL: string;
} = require('../config/env.json');

if (process.env.NODE_ENV === 'prod') {
    const prodEnv = require('../config/env.prod.json');
    environment = {
        ...environment,
        ...prodEnv
    };
    // tslint:disable-next-line:no-console
    console.log(environment);
} else if (process.env.NODE_ENV === 'test') {
    const testEnv = require('../config/env.test.json');
    environment = {
        ...environment,
        ...testEnv
    };
}
