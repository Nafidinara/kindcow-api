const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");
const MySQLEvents = require('@rodrigogs/mysql-events');

const connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

// const connection = async () => {
//   const connection = mysql.createPool({
//     host: dbConfig.HOST,
//     user: dbConfig.USER,
//     password: dbConfig.PASSWORD,
//     database: dbConfig.DB
//   });
//
//   const instance = new MySQLEvents(connection, {
//     startAtEnd: true,
//     excludedSchemas: {
//       mysql: true,
//     },
//   });
//
//   await instance.start();
//
//   instance.addTrigger({
//     name: 'TEST',
//     expression: 'firstcoi_kind.*',
//     statement: MySQLEvents.STATEMENTS.ALL,
//     onEvent: (event) => { // You will receive the events here
//       console.log(`inii event : ${event}`);
//     },
//   });
//
//   instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
//   instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);
// };
//
// connection()
//     .then(() => console.log('Waiting for database events...'))
//     .catch(console.error);


module.exports = connection;
