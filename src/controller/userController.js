class UserController {
  async create(ctx, next) {
    // 接收用户请求传递过来的参数

    // 查询数据库

    // 返回数据
    ctx.body = "用户注册成功"
  }
}

module.exports = new UserController()