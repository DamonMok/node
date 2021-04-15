const errorType = require('../constants/errorTypes')
const userService = require('../service/userService')
const md5Password = require('../utils/passwordHandle')

// 验证注册
const verifyUser = async (ctx, next) => {
  // 1.获取用户名密码
  const { name, password } = ctx.request.body

  // 2.判断用户名、密码是否为空
  if (!name || !password) {
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_NULL)
    return ctx.app.emit('error', error, ctx)
  }

  // 3.判断用户名是否已存在
  const result = await userService.getUserByName(name)
  if (result.length) {
    const error = new Error(errorType.USER_ALREADY_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }

  await next()
}

// 使用md5加密密码
const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body
  ctx.request.body.password = md5Password(password)

  await next()
}

module.exports = {
  verifyUser,
  handlePassword,
}