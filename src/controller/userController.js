const fs = require('fs')

const userService = require('../service/userService')
const fileService = require('../service/fileService')
const { AVATAR_PATH } = require('../constants/filePath')

class UserController {
  // 用户注册
  async create(ctx, next) {
    // 接收用户请求传递过来的参数
    const user = ctx.request.body

    // 查询数据库
    const res = await userService.create(user)

    // 返回数据
    ctx.body = res
  }

  // 获取用户信息(只获取头像信息)
  async userInfo(ctx, next) {
    // 1.获取用户id
    const { userId } = ctx.params

    // 2.查询数据库获取头像信息
    const result = await fileService.getAvatarByUserId(userId)

    // 需要设置以图片方式响应，不然默认会自动下载图片文件
    ctx.response.set('content-type', result.mimetype)
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${result.filename}`)
  }
}

module.exports = new UserController()