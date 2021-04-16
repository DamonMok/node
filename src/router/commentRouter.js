const Router = require('koa-router')
const { verifyAuth } = require('../middleware/authMiddleware')
const { create, reply, update } = require('../controller/commentController')


const commentRouter = new Router({ prefix: '/comment' })

// 发表评论
commentRouter.post('/', verifyAuth, create)

// 回复评论
commentRouter.post('/:commentId/reply', verifyAuth, reply)

// 修改评论
commentRouter.patch('/:commentId', verifyAuth, update)

module.exports = commentRouter