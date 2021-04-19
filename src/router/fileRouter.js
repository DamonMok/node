const Router = require('koa-router')
const { verifyAuth } = require('../middleware/authMiddleware')


const fileRouter = new Router({ prefix: '/update' })

fileRouter.post('/avatar', verifyAuth)

module.exports = fileRouter