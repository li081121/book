const express = require('express')
const template = require('art-template')
const bodyParser = require('body-parser')
const router = require('./router')
const path = require('path')
const app = express()

//启动静态资源服务
app.use('/public',express.static('./public'))

//设置模板引擎的路径
app.set('views',path.join(__dirname,'views'))
app.set('view engine','html')
//设置模板引擎
app.engine('html',require('express-art-template'))
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
//配置路由
app.use(router)
//监听端口
app.listen(5000,() => {
  console.log('服务器启动成功了，可以通过 http://127.0.0.1:5000/ 来进行访问')
})