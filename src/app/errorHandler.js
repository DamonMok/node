const errorType = require('../constants/errorTypes')

const errorHandle = (error, ctx) => {
  let status, message

  switch (error.message) {
    case errorType.NAME_OR_PASSWORD_IS_NULL:
      status = 400
      message = "用户名或密码不能为空!"
      break;
    case errorType.USER_ALREADY_EXISTS:
      status = 409
      message = "用户已存在!"
      break;
    case errorType.USER_DOSE_NOT_EXIST:
      status = 400
      message = "用户不存在!"
      break;
    case errorType.PASSWORD_IS_INCORRECT:
      status = 400
      message = "用户名或密码错误!"
      break;
    case errorType.UNAUTHORIZATION:
      status = 401
      message = "授权失败，无效的token!"
      break;
    case errorType.PERMISSION_DENIED:
      status = 401
      message = "没有相应的操作权限!"
      break;
    case errorType.PARAMS_ERROR:
      status = 400
      message = "参数错误!"
      break;
    default:
      break;
  }

  ctx.status = status
  ctx.body = message
}

module.exports = errorHandle