'use strict';

const fs = require('fs');


let buff = fs.readFileSync('1599782397770-img-.png');
let base64data = buff.toString('base64');

console.log('Image converted to base 64 is:\n\n' + base64data);