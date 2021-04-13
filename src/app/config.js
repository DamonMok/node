const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  APP_PORT,  // 把process.env里面的APP_PORT解构出来导出
} = process.env