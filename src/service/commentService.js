const connect = require('../app/database')

class CommentService {
  // 发表评论
  async createComment(momentId, content, userId) {
    const statement = `INSERT INTO comment (moment_id, content, user_id) VALUES (?, ?, ?);`
    const [result] = await connect.execute(statement, [momentId, content, userId])
    return result
  }

  // 回复评论
  async replyComment(momentId, content, userId, commentId) {
    const statement = `INSERT INTO comment (moment_id, content, user_id, comment_id) VALUES (?, ?, ?, ?);`
    const [result] = await connect.execute(statement, [momentId, content, userId, commentId])
    return result
  }
}

module.exports = new CommentService()