const Multer = require('koa-multer')
const { AVATAR_PATH } = require('../constants/filePath')

const avatarUpload = Multer({
  // 文件保存路径
  dest: AVATAR_PATH
})

// 上传头像的处理
// avatar是上传图片时的key(name)
const avatarHandler = avatarUpload.single('avatar');

module.exports = {
  avatarHandler
}