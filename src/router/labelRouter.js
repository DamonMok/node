const Router = require('koa-router')
const { verifyAuth } = require('../middleware/authMiddleware')
const { create, list } = require('../controller/labelController')


const labelRouter = new Router({ prefix: '/label' })

// 创建标签
labelRouter.post('/', verifyAuth, create)

// 获取标签列表
labelRouter.get('/', list)

module.exports = labelRouter