const Router = require('koa-router')
const { create } = require('../controller/userController')
const { verifyUser, handlePassword } = require('../middleware/userMiddleware')


const userRouter = new Router({ prefix: '/user' })  // 创建路由并指定前缀

// 用户注册的Post请求
userRouter.post('/', verifyUser, handlePassword, create)

module.exports = userRouter