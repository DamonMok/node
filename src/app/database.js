const mysql = require('mysql2')
const config = require('./config')

const connections = mysql.createPool({
  host: config.MYSQL_HOST,
  port: config.MYSQL_PROT,
  database: config.MYSQL_DATABASE,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD
})

connections.getConnection((err, conn) => {
  if (err) {
    console.log("连接数据库失败", err);
  } else {
    console.log("连接数据库成功!");
  }
})

module.exports = connections.promise();
