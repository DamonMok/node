const Router = require('koa-router')
const { verifyAuth } = require('../middleware/authMiddleware')
const { create, detail } = require('../controller/momentController')
const { prefix } = require('./authRouter')

const momentRouter = new Router({ prefix: '/moment' })

// 发布动态
momentRouter.post('/', verifyAuth, create)

// 根据动态ID查询动态
momentRouter.get('/:momentId', detail)

module.exports = momentRouter