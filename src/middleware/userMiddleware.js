const errorType = require('../constants/errorTypes')
const { getUserByName } = require('../service/userService')

const verifyUser = async (ctx, next) => {
  // 1.获取用户名密码
  const { name, password } = ctx.request.body

  // 2.判断用户名、密码是否为空
  if (!name || !password) {
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_NULL)
    return ctx.app.emit('error', error, ctx)
  }

  // 3.判断用户名是否已存在
  const result = await getUserByName(name)
  if (result.length) {
    const error = new Error(errorType.USER_ALREADY_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }

  await next()
}

module.exports = {
  verifyUser,
}