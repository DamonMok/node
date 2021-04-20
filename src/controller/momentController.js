const fs = require('fs')

const labelService = require('../service/labelService')
const momentService = require('../service/momentService')
const fileService = require('../service/fileService')
const { getFileByFileName } = require('../service/fileService')
const { PICTURE_PATH } = require('../constants/filePath')

class MomentController {
  // 发布动态
  async create(ctx, next) {
    // 1.获取用户id/content
    const userId = ctx.user.id
    const { content } = ctx.request.body

    // 2.把动态保存到数据库
    const result = await momentService.create(userId, content)

    // 3.返回响应
    ctx.body = result
  }

  // 根据动态id查询动态(详情)
  async detail(ctx, next) {
    // 1.获取动态id
    const momentId = ctx.params.momentId

    // 2.查询数据库
    const result = await momentService.getMomentById(momentId)

    // 3.返回响应
    ctx.body = result
  }

  // 查询分页动态(列表)
  async list(ctx, next) {

    // 1.获取offset和size
    const { offset, size } = ctx.query

    // 2.查询数据库
    const result = await momentService.getMomentList(offset, size)

    // 3.返回响应
    ctx.body = result
  }

  // 修改动态
  async update(ctx, next) {

    // 1.获取动态id、要更新的内容content、用户id
    const { momentId } = ctx.params
    const { content } = ctx.request.body

    // 2.修改数据库中动态的信息
    const result = await momentService.updateMoment(momentId, content)

    // 3.返回响应
    ctx.body = result
  }

  // 删除动态
  async remove(ctx, next) {
    // 1.获取要输出动态的id
    const { momentId } = ctx.params

    // 2.从数据库中删除动态
    const result = await momentService.removeMoment(momentId)

    // 3.返回响应
    ctx.body = result
  }

  // 给动态添加标签
  async addLabels(ctx, next) {
    // 1.获取数据
    const labels = ctx.labels
    const { momentId } = ctx.params

    // 2.逻辑处理
    for (const label of labels) {
      const isExists = await momentService.relationshipBetweenMomentAndLabel(momentId, label.id)
      if (!isExists) {
        // 当前动态没有该标签，则加入关系表
        const result = await momentService.addLabel(momentId, label.id)
        console.log(result);
      }
    }

    // 3.返回响应
    ctx.body = "添加标签成功!"
  }

  // 获取动态配图
  async fileInfo(ctx, next) {
    // 1.获取图片文件名
    const { filename } = ctx.params

    // 2.根据文件名查询数据库中配图的信息
    const result = await getFileByFileName(filename)

    ctx.response.set('content-type', result.mimetype)
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`)
  }
}

module.exports = new MomentController()