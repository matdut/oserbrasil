
var Sequelize = require('sequelize');
  
 
const sequelize = new Sequelize (
  
  'oser', // database
  'oser', // user / usuario
  'uvlb4otd', //password
  {
    host: 'mysql.oser.app.br',
    dialect: 'mysql'
  } 
);
/*
const sequelize = new Sequelize (    
  'bancomdc', // database
  'root', // user / usuario
  '', //password
  {
    host: 'localhost',
    dialect: 'mysql'
  }

);  
*/
/*const sequelize = new Sequelize(
    process.env.DB_DATABASE, // database
    process.env.DB_USER, // user / usuario
    '', //password
    {
      host: process.env.DB_HOST,
      dialect: 'mysql'
    }
  );
*/
  /*


  const sequelize = new Sequelize(
    
  'oser', // database
  'oser', // user / usuario
  'uvlb4otd', //password
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);
*/
/*

const sequelize = new Sequelize(
  'teste', // database
  'phpadmin', // user / usuario
  'uvlb4otd', //password
  {
    host: '34.210.56.22',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
    
);*/

/* 
const sequelize = new Sequelize(
  'teste', // database
  'phpadmin', // user / usuario
  'uvlb4otd', //password
  {
    host: '34.209.189.158',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
    
);
*/


/*
const sequelize = new Sequelize(
  'gedeventos', // database
  'matdut', // user / usuario
  'uvlb4otd', //password
  {
    host: 'db4free.net',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
    
);

*/
/*
const sequelize = new Sequelize(
  'gedeventos', // database
  'matdut', // user / usuario
  'uvlb4otd', //password
  {
    host: 'db4free.net',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
    
); 
*/

/*
const sequelize = new Sequelize(
  'bancoged', // database
  'gedeventos', // user / usuario
  'Mdc041274', //password
  {
    host: 'db4free.net',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
    
);
*/

/*
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
*/

/* const sequelize = new Sequelize(
  'bancomdc', // database
  'matdut', // user / usuario
  'uvlb4otd', //password
  {
    host: 'db4free.net',
    dialect: 'mysql'
  }
    
);
*/
/*
const sequelize = new Sequelize(
  'bancomdc', // database
  'matdut', // user / usuario
  'uvlb4otd', //password
  {
    host: 'db4free.net',
    dialect: 'mysql'
  }
);
 */

/* 
const sequelize = new Sequelize(
  'bancomdc', // database
  'root', // user / usuario
  '', //password
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);
*/

module.exports = sequelize;
