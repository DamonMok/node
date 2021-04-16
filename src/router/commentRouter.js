const Router = require('koa-router')
const { verifyAuth } = require('../middleware/authMiddleware')
const { create } = require('../controller/commentController')


const commentRouter = new Router({ prefix: '/comment' })

// 发表评论
commentRouter.post('/', verifyAuth, create)

module.exports = commentRouter