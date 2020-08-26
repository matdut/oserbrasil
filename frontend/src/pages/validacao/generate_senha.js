const crypto = require('crypto');

module.exports = function generateSenhaAleatoria() {
    return Math.random().toString(36).slice(-8);
}

