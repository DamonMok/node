const dotenv = require('dotenv')

dotenv.config()

// 把process.env里面的APP_PORT解构出来导出
module.exports = {
  APP_PORT,  // 端口
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = process.env