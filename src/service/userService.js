const connection = require('../app/database')

class UserService {
  async create(user) {
    const { name, password } = user
    // 将user保存到数据库
    const statement = `INSERT INTO user (name, password) VALUES (?, ?);`
    const result = await connection.execute(statement, [name, password])

    return result[0]
  }

  async getUserByName(name) {
    // 根据name查询是否用户已存在
    const statement = `SELECT * FROM user WHERE name = ?;`
    const result = await connection.execute(statement, [name])

    return result[0]
  }

  // 更新用户头像信息
  async updateUserAvatar(userId, avatarUrl) {
    const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`
    const [result] = await connection.execute(statement, [avatarUrl, userId])

    return result
  }
}

module.exports = new UserService()