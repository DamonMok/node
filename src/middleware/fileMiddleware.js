const Multer = require('koa-multer')
const Jimp = require('jimp')
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

// 对配图生成大、中、小三种尺寸的图片
const pictureResize = async (ctx, next) => {
  // 1.获取配图的信息
  const files = ctx.req.files

  // 2.对图片进行调整
  for (const file of files) {
    Jimp.read(file.path).then(image => {
      image.resize(1280, Jimp.AUTO).write(`${file.path}-large`)
      image.resize(640, Jimp.AUTO).write(`${file.path}-middle`)
      image.resize(320, Jimp.AUTO).write(`${file.path}-small`)
    })
  }
  await next()
}

module.exports = {
  avatarHandler,
  pictureHandler,
  pictureResize
}