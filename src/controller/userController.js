const service = require('../service/userService')

class UserController {
  async create(ctx, next) {
    // 接收用户请求传递过来的参数
    const user = ctx.request.body

    // 查询数据库
    const res = await service.create(user)

    // 返回数据
    ctx.body = res
  }
}

module.exports = new UserController()