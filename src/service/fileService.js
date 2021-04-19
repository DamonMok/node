const connect = require('../app/database')


class FileService {
  // 把头像信息保存到数据库
  async createAvatar(filename, mimetype, size, userId) {
    const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?);`
    const [result] = await connect.execute(statement, [filename, mimetype, size, userId])

    return result
  }
}

module.exports = new FileService()