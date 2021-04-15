const errorType = require('../constants/errorTypes')
const service = require('../service/userService')
const md5Password = require('../utils/passwordHandle')

// 验证登录
const verifyLogin = async (ctx, next) => {
  // 1.获取用户名密码
  const { name, password } = ctx.request.body

  // 2.判断用户名、密码是否为空
  if (!name || !password) {
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_NULL)
    return ctx.app.emit('error', error, ctx)
  }

  // 3.判断用户名是否已存在
  const result = await service.getUserByName(name)
  const user = result[0]
  if (!user) {
    const error = new Error(errorType.USER_DOSE_NOT_EXIST)
    return ctx.app.emit('error', error, ctx)
  }

  // 4.判断密码是否正确
  if (md5Password(password) !== user.password) {
    const error = new Error(errorType.PASSWORD_IS_INCORRECT)
    return ctx.app.emit('error', error, ctx)
  }

  // 用于authController中生成token
  ctx.user = user

  await next()
}

module.exports = {
  verifyLogin,
}