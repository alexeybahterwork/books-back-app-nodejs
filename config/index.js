const env = process.env.NODE_ENV || 'development';
let localConfig;

try {
    localConfig = require('./config.json');
} catch (err) {
    console.error('Local config not found', err);
}

let config = {
    development: {
        "username": "fusion",
        "password": "fusion",
        "database": "books_db_test_task",
        "host": "localhost",
        "port": 4000,
        "common": {
            "port": 4000,
            "jwt_secret": "12345",
            "jwt_refresh_secret": "54321",
            "accessTokenExpiresIn": "1d",
            "refreshTokenExpiresIn": "30d"
        },
        "postgres_port": "5432",
        "dialect": "postgres",
        "jwt_secret": "12345"
    },
    test: {
        "username": "fusion",
        "password": "fusion",
        "database": "books_db_test_task",
        "host": "localhost",
        "port": 4000,
        "postgres_port": "5432",
        "dialect": "postgres",
        "jwt_secret": "12345"
    },
    production: {
    }
};

if (localConfig) {
    config = Object.assign(config, localConfig);
}

module.exports = config[env];