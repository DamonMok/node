class CommentController {
  // 发表评论
  async create(ctx, next) {
    ctx.body = "发表评论成功!"
  }
}

module.exports = new CommentController()