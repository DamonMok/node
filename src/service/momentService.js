const connect = require('../app/database')

class MomentService {
  // 发布动态
  async create(userId, content) {

    const statement = `INSERT INTO moment (user_id, content) VALUES (?, ?);`
    const result = await connect.execute(statement, [userId, content])

    return result[0]
  }
}

module.exports = new MomentService()