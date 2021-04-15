const momentService = require('../service/momentService')

class MomentController {
  // 发布动态
  async create(ctx, next) {
    // 1.获取用户id/content
    const userId = ctx.user.id
    const { content } = ctx.request.body

    // 2.把动态保存到数据库
    const result = await momentService.create(userId, content)
    ctx.body = result
  }

  // 根据动态id查询动态(单个)
  async detail(ctx, next) {
    // 1.获取动态id
    const momentId = ctx.params.momentId

    // 2.查询数据库
    const result = await momentService.getMomentById(momentId)
    ctx.body = result
  }

  // 查询分页动态(多个)
  async list(ctx, next) {

    // 1.获取offset和size
    const { offset, size } = ctx.query

    // 2.查询数据库
    const result = await momentService.getMomentList(offset, size)

    ctx.body = result
  }
}

module.exports = new MomentController()