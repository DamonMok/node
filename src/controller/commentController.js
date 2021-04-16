const commentService = require('../service/commentService')

class CommentController {
  // 发表评论 
  async create(ctx, next) {
    // 1.获取评论的动态id、评论的内容、评论者的id
    const { momentId, content } = ctx.request.body
    const userId = ctx.user.id

    // 2.把评论插入到数据库
    const result = await commentService.createComment(momentId, content, userId)

    // 3.返回响应
    ctx.body = result
  }
}

module.exports = new CommentController()