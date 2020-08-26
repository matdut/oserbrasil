const crypto = require('crypto');

module.exports = function generateUniqueId() {
    return crypto.randomBytes(4).toString('HEX');
}

module.exports = function generateSenhaAleatoria() {
    return Math.random().toString(36).slice(-8);
}

