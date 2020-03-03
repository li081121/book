//路由模块
const express = require('express')
const router = express.Router()
const service = require('./senice')

//路由处理

//渲染主页
router.get('/',service.showIndex);

//添加图书
router.get('/addbock',service.toAddBock)

//添加图书（提交表单）
router.post('/addbock',service.addBook)

//跳转到编辑图书信息页面
router.get('/toEditBook',service.toEditBook)

//编辑图书提交表单
router.post('/editBook',service.editBook)

//删除图书信息
router.get('/deleteBook',service.deleteBook)

module.exports = router