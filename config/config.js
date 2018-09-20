module.exports = {

    database: {
        connectionString: process.env.DATABASE_READ_ONLY_CONNECTION_STRING
    },

    cors: {
        origin: "http://localhost:8080"
    },

    passport: {
        passReqToCallback: true
    }

}