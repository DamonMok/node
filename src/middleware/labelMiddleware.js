// 标签校验，如果不存在，则加入到标签表中
const labelService = require('../service/labelService')

const verifyLabelExists = async (ctx, next) => {
  // 1.获取标签数组
  const { labels } = ctx.request.body

  // 2.数据校验


  // 3.业务处理
  const finalLabels = []
  for (const name of labels) {
    const [result] = await labelService.getLabelByName(name)
    const label = { name }
    if (!result) {
      // 3.1标签不存在，需要往标签表中插入标签
      const res = await labelService.createLabel(name)
      label.id = res.insertId
    } else {
      // 3.2标签已存在
      label.id = result.id
    }
    finalLabels.push(label)
  }

  ctx.labels = finalLabels

  await next()
}

module.exports = {
  verifyLabelExists
}