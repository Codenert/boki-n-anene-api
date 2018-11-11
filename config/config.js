module.exports = {

    database: {
        connectionString: process.env.DATABASE_CONNECTION_STRING
    },

    cors: {
        origin: "http://localhost:8080"
    },

    passport: {
        passReqToCallback: true
    },

    urlencode: {
        extended: false
    },

    token: {
        expiresIn: '1d'
    }

}