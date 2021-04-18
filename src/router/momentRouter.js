const Router = require('koa-router')
const { verifyAuth, VerifyPermission } = require('../middleware/authMiddleware')
const { create, detail, list, update, remove, labels } = require('../controller/momentController')

const momentRouter = new Router({ prefix: '/moment' })

// 发布动态
momentRouter.post('/', verifyAuth, create)

// 根据动态ID查询动态
momentRouter.get('/:momentId', detail)

// 查询分页动态
momentRouter.get('/', list)

// 修改动态
momentRouter.patch('/:momentId', verifyAuth, VerifyPermission, update)

// 删除动态
momentRouter.delete('/:momentId', verifyAuth, VerifyPermission, remove)

// 给动态添加标签
momentRouter.post('/:momentId/labels', verifyAuth, VerifyPermission, labels)

module.exports = momentRouter