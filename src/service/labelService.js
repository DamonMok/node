const connect = require('../app/database')


class LabelService {
  // 创建标签
  async createLabel(labelName) {
    const statement = `INSERT INTO label (name) VALUES (?);`
    const [result] = await connect.execute(statement, [labelName])
    return result
  }
}

module.exports = new LabelService()