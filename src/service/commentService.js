const connect = require('../app/database')

class CommentService {
  async createComment(commentId, content, userId) {
    const statement = `INSERT INTO comment (moment_id, content, user_id) VALUES (?, ?, ?);`
    const [result] = await connect.execute(statement, [commentId, content, userId])
    return result
  }
}

module.exports = new CommentService()