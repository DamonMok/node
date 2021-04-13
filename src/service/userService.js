const connection = require('../app/database')

class UserService {
  async create(user) {
    const { name, password } = user

    // 将user保存到数据库
    const statement = `INSERT INTO users (name, password) VALUES (?, ?);`
    const result = await connection.execute(statement, [name, password])

    return result
  }
}

module.exports = new UserService()