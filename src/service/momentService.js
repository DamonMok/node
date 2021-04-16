const connect = require('../app/database')

class MomentService {
  // 发布动态
  async create(userId, content) {

    const statement = `INSERT INTO moment (user_id, content) VALUES (?, ?);`
    const result = await connect.execute(statement, [userId, content])

    return result[0]
  }

  // 根据动态id查询动态数据(单个)
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

  // 查询分页动态数据(多个)
  async getMomentList(offset, size) {

    const statement = `
      SELECT
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name) author
      FROM moment m
      LEFT JOIN user u
      ON m.user_id = u.id
      LIMIT ? , ?;
    `
    const result = await connect.execute(statement, [offset, size])
    return result[0]
  }

  // 修改动态数据
  async updateMoment(momentId, content) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`
    const [result] = await connect.execute(statement, [content, momentId])
    return result
  }

  // 删除动态数据
  async removeMoment(momentId) {

    const statement = `DELETE FROM moment WHERE id = ?;`
    const [result] = await connect.execute(statement, [momentId])
    return result
  }
}

module.exports = new MomentService()