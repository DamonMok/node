const verifyUser = async (ctx, next) => {
  // 1.获取用户名密码
  const { name, password } = ctx.request.body

  // 2.判断用户名、密码是否为空
  if (!name || !password) {
    const error = new Error("用户名或密码不能为空！")
    return ctx.app.emit('error', error, ctx)
  }

  // 3.判断用户名是否已存在

  // await next()
}

module.exports = {
  verifyUser,
}