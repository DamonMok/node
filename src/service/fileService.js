const connect = require('../app/database')


class FileService {
  // 把头像信息保存到数据库
  async createAvatar(filename, mimetype, size, userId) {
    const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?);`
    const [result] = await connect.execute(statement, [filename, mimetype, size, userId])

    return result
  }

  // 根据用户id获取用户头像
  async getAvatarByUserId(userId) {
    const statement = `SELECT * FROM avatar WHERE user_id = ?;`
    const [result] = await connect.execute(statement, [userId])

    return result[0]
  }
}

module.exports = new FileService()