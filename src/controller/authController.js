class AuthController {
  async login(ctx, next) {
    // 接收用户请求传递过来的参数
    const user = ctx.request.body

    // 查询数据库

    // 返回数据
    ctx.body = `用户[${user.name}]登录成功!`
  }
}

module.exports = new AuthController()