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

  // 修改评论
  async updateComment(commentId, content) {
    const statement = `UPDATE comment SET content = ? WHERE id = ?;`
    const [result] = await connect.execute(statement, [content, commentId])
    return result
  }

  // 删除评论
  async removeComment(commentId) {
    const statement = `DELETE FROM comment WHERE id = ?;`
    const [result] = await connect.execute(statement, [commentId])
    return result
  }

  // 获取动态对应的评论列表
  async getCommentsByMomentId(momentId) {
    const statement = `
      SELECT 
        c.id, c.content, c.comment_id commentId, c.createAt createTime, c.updateAt updateTime, 
        JSON_OBJECT('id', u.id, 'name', u.name) user
      FROM comment c 
      LEFT JOIN user u ON c.user_id = u.id
      WHERE c.moment_id = ?;
    `
    const [result] = await connect.execute(statement, [momentId])
    return result
  }
}

module.exports = new CommentService()