const Router = require('koa-router')
const { verifyAuth, verifyPermission } = require('../middleware/authMiddleware')
const { verifyLabelExists } = require('../middleware/labelMiddleware')
const { create, detail, list, update, remove, labels } = require('../controller/momentController')

const momentRouter = new Router({ prefix: '/moment' })

// 发布动态
momentRouter.post('/', verifyAuth, create)

// 根据动态ID查询动态
momentRouter.get('/:momentId', detail)

// 查询分页动态
momentRouter.get('/', list)

// 修改动态
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update)

// 删除动态
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, remove)

// 给动态添加标签
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExists, labels)

module.exports = momentRouter