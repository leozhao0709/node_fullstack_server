export let environment = require('../config/env.json');

if (process.env.NODE_ENV === 'production') {
    const prodEnv = require('../config/env.prod.json');
    environment = {
        ...environment,
        ...prodEnv
    };
} else if (process.env.NODE_ENV === 'test') {
    const testEnv = require('../config/env.test.json');
    environment = {
        ...environment,
        ...testEnv
    };
}

// merge prod env key
for (const key in process.env) {
    if (process.env.hasOwnProperty(key)) {
        environment[key] = process.env[key];
    }
}