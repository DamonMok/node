const Router = require('koa-router')
const { verifyAuth } = require('../middleware/authMiddleware')
const { avatarHandler } = require('../middleware/fileMiddleware')
const { saveAvatarInfo } = require('../controller/fileController')


const fileRouter = new Router({ prefix: '/upload' })

// 上传头像
fileRouter.post('/avatar', verifyAuth, avatarHandler, saveAvatarInfo)

module.exports = fileRouter