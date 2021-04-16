const Router = require('koa-router')
const { verifyAuth, VerifyPermission } = require('../middleware/authMiddleware')
const { create, detail, list, update } = require('../controller/momentController')

const momentRouter = new Router({ prefix: '/moment' })

// 发布动态
momentRouter.post('/', verifyAuth, create)

// 根据动态ID查询动态
momentRouter.get('/:momentId', detail)

// 查询分页动态
momentRouter.get('/', list)

// 修改动态
momentRouter.patch('/:momentId', verifyAuth, VerifyPermission, update)


module.exports = momentRouter