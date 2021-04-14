const fs = require('fs')

const useRouters = function () {
  // 这个函数由app引用，不能用匿名函数，否者读不到this
  // 遍历router文件夹内的路由文件，给app使用并设置路由
  fs.readdirSync(__dirname).forEach(file => {
    if (file === 'index.js') return
    const router = require(`./${file}`)
    this.use(router.routes())
    this.use(router.allowedMethods())
  })
}

module.exports = useRouters