const Koa = require('koa')
const userRouter = require('../router/userRouter')

const app = new Koa()

app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

module.exports = app