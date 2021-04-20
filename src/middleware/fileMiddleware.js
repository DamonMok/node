const Multer = require('koa-multer')
const { AVATAR_PATH, PICTURE_PATH } = require('../constants/filePath')

const avatarUpload = Multer({
  // 文件保存路径
  dest: AVATAR_PATH
})

const pictureUpload = Multer({
  dest: PICTURE_PATH
})

// 上传头像的处理
// avatar是上传图片时的key(name)
const avatarHandler = avatarUpload.single('avatar');

// 上传动态图片的处理, 最大9张
const pictureHandler = pictureUpload.array('picture', 9);

module.exports = {
  avatarHandler,
  pictureHandler
}