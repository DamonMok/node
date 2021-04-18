const jwt = require('jsonwebtoken')

const errorType = require('../constants/errorTypes')
const userService = require('../service/userService')
const authService = require('../service/authService')
const md5Password = require('../utils/passwordHandle')
const config = require('../app/config')
const errorTypes = require('../constants/errorTypes')
const app = require('../app')

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
  const result = await userService.getUserByName(name)
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

// 验证token授权
const verifyAuth = async (ctx, next) => {
  // 1.获取token
  const authorization = ctx.header.authorization
  if (!authorization) {
    // token为空
    const err = new Error(errorType.UNAUTHORIZATION)
    return ctx.app.emit('error', err, ctx)
  }

  const token = authorization.replace('Bearer ', '')  // 去掉token前多余的Bearer 字符串

  // 2.验证token
  try {
    // 验证通过
    const result = jwt.verify(token, config.PUBLIC_KEY, {
      algorithms: ['RS256']
    })
    ctx.user = result
    await next()
  } catch (error) {
    // 验证失败
    console.log(error);
    const err = new Error(errorType.UNAUTHORIZATION)
    ctx.app.emit('error', err, ctx)
  }
}

const verifyPermission = async (ctx, next) => {
  // 1.获取当前需要权限验证对应的table表的表名、需要编辑/删除数据的id、当前登录用户的id
  const [key] = Object.keys(ctx.params)
  const tableName = key.replace('Id', '')
  const rowId = ctx.params[key]
  const userId = ctx.user.id

  // 2.查询是否具备权限：判断数据库中table的user_id是否为当前登录用户的id
  const isPermission = await authService.checkPermission(tableName, rowId, userId)

  if (!isPermission) {
    // 没有权限
    const error = new Error(errorTypes.PERMISSION_DENIED)
    return ctx.app.emit('error', error, ctx)
  }

  await next()
}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission
}