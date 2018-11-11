
'use strict'

const crypto = require('crypto')

const KEY = process.env.secret      // Secret key for encrypted data
const KEY_ENCODING = "base64"

const pKey = process.env.pKey       // Private key for encrypting secret key
const IV_KEY_LENGTH = 16            // Always 16
const OUTPUT_ENCONDING = 'base64'       
const AES_ALGORITHM = "aes-256-cbc"  // using 256 bits therefore needs a 32 bytes key size

/**
 * Encrypt and Decrypt the data
 * @author Kateti Mareko
 * @since 27-08-18
 */

/**
 * Find the encoding type of the given cipher text
 * @param {*} encoded 
 */
function GetEncodingType(encoded) {
    for (let index = 0; index < encoded.length; index++) {
        const element = encoded[index];
        var charCode = element.toString().charCodeAt(0)
        if ( (charCode < 48 && charCode > 57) || (charCode < 65 && charCode > 70) || (charCode < 97 && charCode > 102)) {
            return 'base64'
        }
    }
    return 'hex'
}


function DecryptData(data, isLocal) {

    // get the information needed
    let iv = data.split(".")[0]
    var ivEncoding = GetEncodingType(iv)
    let ciphertext = data.split(".")[1]
    let key = ""

    if (!isLocal) {
        // 1. Decrypt the cipher key
        key = data.split(".")[2]

        console.log(key)
        key = RSAPrivateDecrypt(key, GetEncodingType(key), 'base64')
    } else {
        key = KEY
    }

    console.log(key + " " + KEY)

    // 2. Decrypt the message with derypted cipher key
    var decryptedData = AESDecrypt(ciphertext, 'base64', iv, ivEncoding, key, 'base64')

    // 3. Return the decrypted data
    return decryptedData
}


/**
 * Encrypt the data
 * @param { data to be encrypted } data 
 * @param {*} locally 
 * @returns cipher text
 */
function EncryptData(data, locally) {

    // 1. Perform AES encryption on a data with a shared secret
    var cipherText = AESEncrypt(KEY, KEY_ENCODING, data, 'base64', OUTPUT_ENCONDING)

    // 2. Encrypt the secret key
    if (!locally) {
        var cipherSecretKey = RSAPrivateEncrypt(KEY, KEY_ENCODING, OUTPUT_ENCONDING)
        return {
            data: `${cipherText}.${cipherSecretKey}` 
        }
    } else {
        return cipherText
    }

}

function AESDecrypt (ciphertext, ciphertextencoding, iv, ivEncoding, key, keyEncoding) {

    let decipher = crypto.createDecipheriv(AES_ALGORITHM, Buffer.from(key, keyEncoding), Buffer.from(iv, ivEncoding))

    let decrypted = decipher.update(ciphertext, ciphertextencoding, 'utf8')

    decrypted += decipher.final('utf8')


    return decrypted

    /*let textParts = data.split(':');
    let iv = Buffer.from(textParts[0], ivEncoding);
    let encryptedText = Buffer.from(textParts[1], OUTPUT_ENCONDING);
    let decipher = crypto.createDecipheriv(AES_ALGORITHM, Buffer.from(KEY, KEY_ENCODING), iv);
    let decrypted = decipher.update(encryptedText);
   
    decrypted = Buffer.concat([decrypted, decipher.final()]);
   
    return decrypted.toString();*/
}

/**
 * Encrypt the data with a secret 
 * @param { secret key to encrypt the data with } key 
 * @param { secret key encoding } keyencoding 
 * @param { data to be encrypted with the secret key } data 
 * @param { iv encoding } ivEncoding 
 * @param { cipher text output encoding } ciphertextencoding 
 */
function AESEncrypt(key, keyencoding, data, ivEncoding, ciphertextencoding) {

    // computes a random iv key
    const iv = crypto.randomBytes(IV_KEY_LENGTH)

    const cipher = crypto.createCipheriv(AES_ALGORITHM, Buffer.from(key, keyencoding), iv)

    var dataEncoding = 'utf8'
    const cipherText = Buffer.concat([cipher.update(data, dataEncoding), cipher.final()]);

    return iv.toString(ivEncoding) + '.' + cipherText.toString(ciphertextencoding);
    
}

/**
 * Rsa private decrypt will decrypt the data to get the original message
 * @param {data to be encrypted} data 
 * @param {type of encoding of a data} encoding 
 */
function RSAPrivateDecrypt(data, encoding, outputEncoding) {
    var dataToDecrypt = Buffer.from(data, encoding)
    console.log('hd')
    var decrypted = crypto.privateDecrypt({
        key: pKey
    }, dataToDecrypt).toString(outputEncoding)
    
    return decrypted

}

/**
 * Encrypt the secret key with the rsa private key
 * @param { secret key to be encrypted } secretKey 
 * @param { secret key encoding } secretKeyEncoding 
 * @param { output encoding after secret key is encrypted } outputEncoding 
 */
function RSAPrivateEncrypt(secretKey, secretKeyEncoding, outputEncoding) {

    // conver the secret key to a buffer
    var dataToEncrypted = Buffer.from(secretKey, secretKeyEncoding)

    var encrypted = crypto.privateEncrypt({
        key: pKey
    }, dataToEncrypted).toString(outputEncoding)

    return encrypted

}

module.exports = {
    //AESEncrypt,
    //AESDecrypt,
    EncryptData,
    DecryptData
}