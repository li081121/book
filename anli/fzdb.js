//加载数据库驱动
let mysql = require('mysql')
exports.base = (sql,data,callback) => {
  //创建数据库连接
let connection = mysql.createConnection({
  host : 'localhost',//数据库所在的服务器的域名或者IP地址
  user : 'root',//登录数据库账号
  password : 'lsf1057738733',
  database : 'test'
})

//执行连接操作
connection.connect()

//操作数据库
connection.query(sql,data,(error,results,fields) => {
  if(error) throw error
  callback(results)
})


//关闭数据库
connection.end()
}
