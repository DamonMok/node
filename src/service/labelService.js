const connect = require('../app/database')


class LabelService {
  // 创建标签
  async createLabel(labelName) {
    const statement = `INSERT INTO label (name) VALUES (?);`
    const [result] = await connect.execute(statement, [labelName])
    return result
  }

  // 根据标签名查找标签
  async getLabelByName(labelName) {
    const statement = `SELECT * FROM label WHERE name = ?;`
    const [result] = await connect.execute(statement, [labelName])
    return result
  }

  // 查询分页标签列表
  async getLabelList(offset, size) {
    const statement = `SELECT * FROM label LIMIT ?, ?;`
    const [result] = await connect.execute(statement, [offset, size])
    return result
  }
}

module.exports = new LabelService()