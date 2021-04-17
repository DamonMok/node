class LabelController {
  // 创建标签
  async create(ctx, next) {
    ctx.body = "创建标签成功!"
  }
}

module.exports = new LabelController()