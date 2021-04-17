const Router = require('koa-router')
const { verifyAuth } = require('../middleware/authMiddleware')
const { create } = require('../controller/labelController')


const labelRouter = new Router({ prefix: '/label' })

// 创建标签
labelRouter.post('/', verifyAuth, create)

module.exports = labelRouter