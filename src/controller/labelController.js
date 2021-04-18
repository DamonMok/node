const labelService = require('../service/labelService')
const errorTypes = require('../constants/errorTypes')


class LabelController {
  // 创建标签
  async create(ctx, next) {
    // 1.接收数据
    const { name: labelName } = ctx.request.body

    // 2.校验数据 
    if (!labelName) {
      const err = new Error(errorTypes.PARAMS_ERROR)
      return ctx.app.emit('error', err, ctx)
    }

    // 3.逻辑处理
    const result = await labelService.createLabel(labelName)

    // 4.返回响应 
    ctx.body = result
  }
}

module.exports = new LabelController()