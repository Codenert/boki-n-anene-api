module.exports = {

    database: {
        connectionString: process.env.DATABASE_CONNECTION_STRING
    },

    cors: {
        origin: "https://bokinanene.codenertapps.com", 
    },

    passport: {
        passReqToCallback: true
    },

    urlencode: {
        extended: false
    },

    token: {
        expiresIn: '1d'
    },

    nodemailer_config: {
        host: process.env.transportService,
        port: process.env._port,
        secure: true,
        auth: {
            user: process.env.username,
            pass: process.env.pass
        }
    }

}