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

  // 把动态图片信息保存到数据库
  async createPicture(filename, mimetype, size, userId, momentId) {
    const statement = `INSERT INTO file (filename, mimetype, size, user_id, moment_id) VALUES (?, ?, ?, ?, ?);`
    const [result] = await connect.execute(statement, [filename, mimetype, size, userId, momentId])

    return result
  }

  // 根据文件名获取配图信息
  async getFileByFileName(filename) {
    const statement = `SELECT * FROM file WHERE filename = ?;`
    const [result] = await connect.execute(statement, [filename])

    return result[0]
  }
}

module.exports = new FileService()