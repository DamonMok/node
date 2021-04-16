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

  // 回复评论 
  async reply(ctx, next) {
    // 1.获取评论的动态id、评论的内容、评论者的id、对应评论的Id
    const { momentId, content } = ctx.request.body
    const userId = ctx.user.id
    const { commentId } = ctx.params

    // 2.把评论插入到数据库
    const result = await commentService.replyComment(momentId, content, userId, commentId)

    // 3.返回响应
    ctx.body = result
  }

  // 修改评论
  async update(ctx, next) {
    // 1.获取评论的id、要修改评论的内容
    const { commentId } = ctx.params
    const { content } = ctx.request.body

    // 2.修改数据库中对应的评论
    const result = await commentService.updateComment(commentId, content)

    // 3.返回响应
    ctx.body = result
  }

  // 删除评论
  async remove(ctx, next) {
    // 1.获取评论的id
    const { commentId } = ctx.params

    // 2.修改数据库中对应的评论
    const result = await commentService.removeComment(commentId)

    // 3.返回响应
    ctx.body = result
  }
}

module.exports = new CommentController()