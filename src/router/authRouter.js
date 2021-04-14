const Router = require('koa-router')
const { login } = require('../controller/authController')
const { verifyLogin } = require('../middleware/authMiddleware')


const userRouter = new Router()  // 创建路由并指定前缀

// 用户登录的post请求
userRouter.post('/login', verifyLogin, login)

module.exports = userRouter