const connect = require('../app/database')

class AuthService {
  /**
   * 
   * @param {需要进行权限验证的表名} tableName 
   * @param {表中要认证的数据行} rowId 
   * @param {当前登录用户的id} userId 
   * @returns 
   */
  async checkPermission(tableName, rowId, userId) {
    const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;`
    const [result] = await connect.execute(statement, [rowId, userId])
    return result.length > 0 ? true : false
  }
}

module.exports = new AuthService()