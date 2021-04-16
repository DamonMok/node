const Router = require('koa-router')
const { verifyAuth } = require('../middleware/authMiddleware')
const { create, reply } = require('../controller/commentController')


const commentRouter = new Router({ prefix: '/comment' })

// 发表评论
commentRouter.post('/', verifyAuth, create)

// 回复评论
commentRouter.post('/:commentId/reply', verifyAuth, reply)

module.exports = commentRouter