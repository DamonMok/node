const connection = require('../app/database')

class UserService {
  async create(user) {
    const { name, password } = user
    // 将user保存到数据库
    const statement = `INSERT INTO users (name, password) VALUES (?, ?);`
    const result = await connection.execute(statement, [name, password])

    return result[0]
  }

  async getUserByName(name) {
    // 根据name查询是否用户已存在
    const statement = `SELECT * FROM users WHERE name = ?;`
    const result = await connection.execute(statement, [name])

    return result[0]
  }
}

module.exports = new UserService()