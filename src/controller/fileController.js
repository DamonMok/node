const fileService = require('../service/fileService')


class FileController {
  // 保存用户头像信息
  async saveAvatarInfo(ctx, next) {
    // 1.获取头像信息和用户id
    const { filename, mimetype, size } = ctx.req.file
    const { id: userId } = ctx.user

    // 2.把头像信息保存到数据库
    const result = await fileService.createAvatar(filename, mimetype, size, userId)

    // 3.返回响应
    ctx.body = result
  }
}

module.exports = new FileController()