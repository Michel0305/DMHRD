var jwt = require('jsonwebtoken');
var fs = require('fs');
var path = require('path');
var config =fs.existsSync('../conf/config-template.js')?require('../conf/config-template.js'): require('../conf/config');

tokens = () => {
}

/**
 * Token 创建
 * Token Create
 * tokens.create({username:'12036208',password:'201908230407332'})
 */
tokens.create = (param) => {
  let created = Math.floor(Date.now() / 1000);
  let cert = fs.readFileSync(path.join(__dirname, './ssl/private.pem'));
  let token = jwt.sign({ param, exp: created + config.tokentime }, cert, { algorithm: 'RS256' });
  return { token: token };
}

/**
 * Token验证
 * Token Verify
 * tokens.verify(token);
 */
tokens.verifys = (param) => {
  let cert = fs.readFileSync(path.join(__dirname, './ssl/private.pem'));
  try {
    let result = jwt.verify(param, cert, { algorithms: ['RS256'] }) || {};
    let current = Math.floor(Date.now() / 1000);
    if (current > result.exp) 
      return { code: '50014', msg: 'DToken Verify Error' }
    return result.param;
  } catch (e) {
    return { code: '50014', msg: 'Token Verify Error' }
  }
}


module.exports = tokens;