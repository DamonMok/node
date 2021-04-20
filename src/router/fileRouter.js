const Router = require('koa-router')
const { verifyAuth } = require('../middleware/authMiddleware')
const { avatarHandler, pictureHandler, pictureResize } = require('../middleware/fileMiddleware')
const { saveAvatarInfo, savePictureInfo } = require('../controller/fileController')


const fileRouter = new Router({ prefix: '/upload' })

// 上传头像
fileRouter.post('/avatar', verifyAuth, avatarHandler, saveAvatarInfo)

// 上传动态图片
fileRouter.post('/picture', verifyAuth, pictureHandler, pictureResize, savePictureInfo)

module.exports = fileRouter