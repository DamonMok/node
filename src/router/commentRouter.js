const Router = require('koa-router')
const { verifyAuth, verifyPermission } = require('../middleware/authMiddleware')
const { create, reply, update, remove, list } = require('../controller/commentController')


const commentRouter = new Router({ prefix: '/comment' })

// 发表评论
commentRouter.post('/', verifyAuth, create)

// 回复评论
commentRouter.post('/:commentId/reply', verifyAuth, reply)

// 修改评论
commentRouter.patch('/:commentId', verifyAuth, verifyPermission, update)

// 删除评论
commentRouter.delete('/:commentId', verifyAuth, verifyPermission, remove)

// 对应某条动态的评论列表
commentRouter.get('/', list)

module.exports = commentRouter