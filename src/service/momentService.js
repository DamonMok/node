const connect = require('../app/database')

class MomentService {
  // 发布动态
  async create(userId, content) {

    const statement = `INSERT INTO moment (user_id, content) VALUES (?, ?);`
    const result = await connect.execute(statement, [userId, content])

    return result[0]
  }

  // 根据动态id查询动态数据
  async getMomentById(momentId) {

    const statement = `
      SELECT
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name) author
      FROM moment m
      LEFT JOIN user u
      ON m.user_id = u.id
      WHERE m.id = ?;
    `
    const result = await connect.execute(statement, [momentId])
    return result[0]
  }
}

module.exports = new MomentService()