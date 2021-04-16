const Router = require('koa-router')
const { verifyAuth, VerifyPermission } = require('../middleware/authMiddleware')
const { create, reply, update, remove } = require('../controller/commentController')


const commentRouter = new Router({ prefix: '/comment' })

// 发表评论
commentRouter.post('/', verifyAuth, create)

// 回复评论
commentRouter.post('/:commentId/reply', verifyAuth, reply)

// 修改评论
commentRouter.patch('/:commentId', verifyAuth, VerifyPermission, update)

// 删除评论
commentRouter.delete('/:commentId', verifyAuth, VerifyPermission, remove)

module.exports = commentRouter