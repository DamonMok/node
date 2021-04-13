const Router = require('koa-router')
const { create } = require('../controller/userController')
const { verifyUser } = require('../middleware/userMiddleware')


const userRouter = new Router({ prefix: '/user' })  // 创建路由并指定前缀

// 创建用户的Post请求
userRouter.post('/', verifyUser, create)

module.exports = userRouter