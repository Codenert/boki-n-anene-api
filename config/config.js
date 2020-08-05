var allowedOrigins = ['https://dashboard.bokinanene.com'];

module.exports = {

    database: {
        connectionString: process.env.DATABASE_CONNECTION_STRING
    },

    cors: {
        origin: function(origin, callback){
            // allow requests with no origin 
            // (like mobile apps or curl requests)
            if(!origin) return callback(null, true);
            if(allowedOrigins.indexOf(origin) === -1){
              var msg = 'The CORS policy for this site does not ' +
                        'allow access from the specified Origin.';
              return callback(new Error(msg), false);
            }
            return callback(null, true);
          },
          credentials: true
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