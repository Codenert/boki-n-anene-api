const jwt = require('jsonwebtoken');
const axios = require('axios');

exports.verifyUser = (token) => {
    return new Promise( (resolve, reject) => {
        axios.get('https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com').then(result => {
            var publicKeys = result.data;
            const header64 = token.split('.')[0];

            const header = JSON.parse(Buffer.from(header64, 'base64').toString('ascii'));

            var options = {
                algorithms: ['RS256'],
                audience: process.env.projectId,
                issuer: `https://securetoken.google.com/${process.env.projectId}` 
            }

            jwt.verify(token, publicKeys[header.kid], options, (err, decoded) => {
                if (decoded) {
                    resolve({
                        status: 200,
                        data: decoded
                    });
                }
                if (err) {
                    reject({
                        status: 401,
                    });
                }
            });
        }).catch(err => {

            reject({
                status: 500
            });
        });
    })
}