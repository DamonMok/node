const Router = require('koa-router')
const { login } = require('../controller/authController')
const { verifyLogin, verifyAuth } = require('../middleware/authMiddleware')
const { success } = require('../controller/authController')


const userRouter = new Router()  // 创建路由并指定前缀

// 用户登录的post请求
userRouter.post('/login', verifyLogin, login)

// 测试token授权的接口
userRouter.post('/test', verifyAuth, success)

module.exports = userRouter