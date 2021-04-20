const fileService = require('../service/fileService')
const userService = require('../service/userService')
const { APP_HOST, APP_PORT } = require('../app/config')


class FileController {
  // 保存用户头像信息
  async saveAvatarInfo(ctx, next) {
    // 1.获取头像信息和用户id
    const { filename, mimetype, size } = ctx.req.file
    const { id: userId } = ctx.user

    // 2.把头像信息保存到数据库
    const result = await fileService.createAvatar(filename, mimetype, size, userId)

    // 3.把头像url更新到user表中
    const avatar_url = `${APP_HOST}:${APP_PORT}/user/${userId}/avatar`
    const avatarURLResult = await userService.updateUserAvatar(userId, avatar_url)

    // 3.返回响应
    ctx.body = {
      status: 200,
      message: '上传头像成功!'
    }
  }
}

module.exports = new FileController()