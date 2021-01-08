//const generate = require('../validacao/generate_senha'); 

//console.log('senha aleatoria '+Math.random().toString(36).substring(0, 8)); 
//console.log('senha aleatoria '+Math.random().toString(36).slice(-8)); 
//import * as moment from 'moment';
const hora_ini = '08:00'
const dataatual = new Date(`${'04/01/2021'} ${hora_ini}`);
//dataatual.add(hora_ini);

console.log(' date - '+dataatual);

console.log(' date - '+Date.parse('01/05/1988'));
var d = new Date('04/01/2021 08:00:00');

var n = d.toTimeString();

console.log('hora - '+ n )


//console.log(' date - '+(Double.valueOf('7.8') + Double.valueOf('35.1') + Double.valueOf('5.67')))

//console.log('senha aleatoria '+JSON.stringify(generate));

