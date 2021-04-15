const jwt = require('jsonwebtoken')
const config = require('../app/config')

class AuthController {
  async login(ctx, next) {
    // 获取数据库中用户的相关信息
    const { id, name } = ctx.user

    // 生成token
    const token = jwt.sign({ id, name }, config.PRIVATE_KEY, {
      // token过期时间
      expiresIn: 24 * 60 * 60,
      // jwt默认加密算法为SH256,所以需要指定加密算法为和openssl生成的公钥私钥一样的加密算法
      algorithm: 'RS256'
    })

    // 返回数据
    ctx.body = {
      id,
      name,
      token
    }
  }

  // 测试token
  async success(ctx, next) {
    ctx.body = "授权成功！"
  }
}

module.exports = new AuthController()