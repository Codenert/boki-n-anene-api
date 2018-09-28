
const crypto = require('crypto')

const key = process.env.key

exports.Encrypt = (data) => {

    const cipher =crypto.createCipher('aes192', key)
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted
    
}

exports.Decrypt = (data) => {
    const decipher =crypto.createDecipher('aes192', key)
    let decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted
    
}