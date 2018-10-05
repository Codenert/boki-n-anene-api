
'use strict'

const crypto = require('crypto')

const KEY = process.env.key
const pKey = process.env.pKey

const IV_KEY_LENGTH = 16 // Always 16
const OUTPUT_ENCONDING = 'base64'       
const KEY_ENCODING = "hex"
const AES_ALGORITHM = "aes-256-cbc"  // therefore needs a 32 bytes key size

function EncryptData(data) {

    // 1. Get the shared key to encrypt the data as buffer since creating a cipher with iv
    //    needs key in a form of a buffer format
    var secret_key = new Buffer.from(KEY, KEY_ENCODING)

    // 2. Perform AES encryption on a data with a shared secret
    var cypherText = AESEncrypt(data)

    // 3. Encrypt the secret key
    var cypherSecretKey = RSAPrivateEncrypt(secret_key, OUTPUT_ENCONDING)

    return {
        data: `${cypherText}.${cypherSecretKey}` 
    }

}

function AESDecrypt (data) {
    let textParts = data.split(':');
    let iv = new Buffer(textParts.shift(), OUTPUT_ENCONDING);
    let encryptedText = new Buffer(textParts.join(':'), OUTPUT_ENCONDING);
    console.log(KEY)
    let decipher = crypto.createDecipheriv(AES_ALGORITHM, Buffer.from(KEY, KEY_ENCODING), iv);
    let decrypted = decipher.update(encryptedText);
   
    decrypted = Buffer.concat([decrypted, decipher.final()]);
   
    return decrypted.toString();
}

function AESEncrypt(data) {

    const iv = crypto.randomBytes(IV_KEY_LENGTH)

    const cipher = crypto.createCipheriv(AES_ALGORITHM, Buffer.from(KEY,KEY_ENCODING), iv)

    const cipherText = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);

    return iv.toString(OUTPUT_ENCONDING) + '.' + cipherText.toString(OUTPUT_ENCONDING);
    
}

function RSAPrivateEncrypt(data, encoding) {

    var dataToEncrypted = Buffer.from(data, encoding)
    var encrypted = crypto.privateEncrypt({
        key: pKey
    }, dataToEncrypted).toString(OUTPUT_ENCONDING)

    return encrypted

}

module.exports = {
    AESEncrypt,
    AESDecrypt,
    EncryptData
}