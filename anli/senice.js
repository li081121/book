//业务模块
const path = require('path')
const fs = require('fs')
let data = require('./data.json')
const db = require('./fzdb')

//自动生成图书编号（自增）
let maxBookCode = () => {
  let arr = []
  data.forEach((item) => {
    arr.push(item.id)
  });
  return Math.max.apply(null,arr)
}

//复用读写文件方法
let readFile = (res) => {
  fs.writeFile(path.join(__dirname,'data.json'),JSON.stringify(data,null,4),(err) => {
    if(err) {
      res.send('server error')
    }
    res.redirect('/')
  })
}

//渲染主页面
exports.showIndex = (req,res) => {
  let sql = `select * from newbooks`
  db.base(sql,null,(result) => {
      res.render('index.html',{list:result})
  })
}

//跳转到添加图书的页面
exports.toAddBock = (req,res) => {
  res.render('addbock',{})
}

//添加图书保存数据
exports.addBook = (req,res) => {
  //获取表单数据
  let info = req.body
  let sql = `insert into newbooks set ?`
  let book = {}
  for(let key in info) {
    book[key] = info[key]
  }
  db.base(sql,book,(result) => {
    if(result.affectedRows == 1) {
      res.redirect('/')
    }
  })
}


//跳转编辑页面
exports.toEditBook = (req,res) => {
  let id = req.query.id;
  // let book = {}
  // data.forEach((item) => {
  //   if(id == item.id) {
  //     book = item
  //     return
  //   }
  // })
  let sql = `select * from newbooks where id=?`
  let data = [id]
  db.base(sql,data,(result) => {
    res.render('toEditBook',result[0])
  })
  
}

//编辑图书更新
exports.editBook = (req,res) => {
  let info = req.body
  // data.forEach((item) => {
  //   if(info.id == item.id) {
  //     for(let key in info) {
  //       item[key] = info[key]
  //     }
  //     return
  //   }
  // })
  // readFile(res)
  let sql = `update newbooks set name=?,author=?,category=?,description=? where id=?`
  let data = [info.name,info.author,info.category,info.description,info.id]
  db.base(sql,data,(result) => {
    if(result.affectedRows == 1) {
      res.redirect('/')
    }
  })
}


//删除图书信息
exports.deleteBook = (req,res) => {
  let id = req.query.id
  // data.forEach((item,index) => {
  //   if(id == item.id) {
  //     data.splice(index,1)
  //   }
  //   return
  // })
  // readFile(res)
  let sql = `delete from newbooks where id=?`
  let data = [id]
  db.base(sql,data,(result) => {
    if(result.affectedRows == 1) {
      res.redirect('/')
    }
  })
}