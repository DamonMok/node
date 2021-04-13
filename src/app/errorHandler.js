const errorHandle = (error, ctx) => {
  ctx.status = 404
  ctx.body = error.message
}

module.exports = errorHandle