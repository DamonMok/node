const Koa = require('koa')
const bodyparser = require('koa-bodyparser')  // body解析
const useRouters = require('../router')  // 动态路由函数
const errorHandler = require('./errorHandler')  // 错误处理


const app = new Koa()

app.useRouters = useRouters

app.use(bodyparser())  // 使用body中的json数据解析插件

app.useRouters()  // 动态加载router文件下的路由

app.on('error', errorHandler)  // 错误处理

module.exports = app