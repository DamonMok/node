const Koa = require('koa')
const userRouter = require('../router/userRouter')  // 用户路由
const authRouter = require('../router/authRouter')
const bodyparser = require('koa-bodyparser')  // body解析
const errorHandler = require('./errorHandler')  // 错误处理

const app = new Koa()

app.use(bodyparser())  // 使用body中的json数据解析插件
app.use(userRouter.routes())  // 使用用户路由
app.use(authRouter.routes())  // 使用权限路由
app.use(userRouter.allowedMethods())  // 请求方式如果有错，则提示

app.on('error', errorHandler)  // 错误处理

module.exports = app