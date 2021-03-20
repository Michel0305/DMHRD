/**
 * SHA 512 加密
 * 
 */
const crypto = require('crypto');
var pbkdf2_sha512 = require('pbkdf2-sha512');

pbkdf2 = () => { }

function b64trimmed(buf) {
    return buf.toString('base64').replace(/=*$/, '').replace('+', '.');
}

function b64decode(str) {
    str = str.replace('.', '+');
    if (str.length % 4) {
        str += '='.repeat(4 - str.length % 4);
    }
    return new Buffer(str, 'base64');
}

// function get_hmac(secret, password) {
//         var hmac = crypto.createHmac('sha512', secret).update(password).digest('base64');
//         return hmac;
// }

function get_hash(password, salt, rounds) {
    // FIXME: KeyLenBytes is hardcoded
    var h = b64trimmed(pbkdf2_sha512(password, salt, rounds, 64));
    var joined_hash = ['', 'pbkdf2-sha512', rounds, b64trimmed(salt), h].join('$');
    return joined_hash;
}

function verify_hash(password, stored_hash) {
    var scheme = stored_hash.split('$')[1];
    var rounds = stored_hash.split('$')[2];
    var salt = stored_hash.split('$')[3];
    if (scheme !== 'pbkdf2-sha512') {
        return false;
    }
    var h = get_hash(password, b64decode(salt), rounds);

    return h === stored_hash;
}

function new_hash(password, rounds) {

    // FIXME: Salt size is hardcoded
    var salt = crypto.randomBytes(16);
    return get_hash(password, salt, rounds);
}

pbkdf2.crypt = (password) => {
    return new_hash(password, 25000);
}

pbkdf2.decode = (password, hash) => {
    return verify_hash(password, hash)
}

module.exports = pbkdf2;


// console.log('HASH ' + h);
// console.log('VERIFY ' + );

// Usage for passwords generated with flask_security:

// SECURITY_PASSWORD_SALT is set in config.py and used by flask-security
// var SECURITY_PASSWORD_Salt='Many random bytes...';

// var password_hmac = get_hmac(SECURITY_PASSWORD_SALT, password);
// var h = new_hash(password_hmac, 20000);
// console.log('HASH ' + h);
// console.log('VERIFY ' + verify_hash(password_hmac, h));

// function validatePassword(secret, format) {
//     let parts = format.split('$')
//     for (let index = 0; index < parts.length; index++) {
//         const element = parts[index];
//         console.log(element.toString('base64'))

//     }    
//     return parts[4] == crypto.pbkdf2Sync(secret, 
//         Buffer.from(parts[3].replace(/\./g, '+') + '='.repeat(parts[3].length % 3), 'base64'),
//         +parts[2], 32,
//         parts[1].split('-')[1])
//         .toString('base64').replace(/=/g, '').replace(/\+/g, '.')
// }

// var aaaa = validatePassword('123456',"$pbkdf2-sha512$25000$gZBS6v0fg3DOmTPmHEPImQ$Mty2JBA7XfJUHKuvdCV4pY574sjqiLOYg3.NSSFSi/kX/6CHWQ3A8LIrDmOk0Xog0ilw6x4JhBbsDLW9/87gKQ")

// console.log(aaaa)