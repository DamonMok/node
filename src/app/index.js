const Koa = require('koa')
const userRouter = require('../router/userRouter')
const bodyparser = require('koa-bodyparser')

const app = new Koa()

app.use(bodyparser())  // 使用body中的json数据解析插件
app.use(userRouter.routes())  // 使用路由
app.use(userRouter.allowedMethods())  // 请求方式如果有错，则提示

module.exports = app