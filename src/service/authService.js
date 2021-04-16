const connect = require('../app/database')

class AuthService {
  // 动态权限判断
  async checkMomentPermission(momentId, userId) {
    const statement = `SELECT * FROM moment WHERE id = ? AND user_id = ?;`
    const [result] = await connect.execute(statement, [momentId, userId])
    return result.length > 0 ? true : false
  }
}

module.exports = new AuthService()