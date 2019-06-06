/* document.all.filter(e => {
  return e.style.font-family.toLowerCase().indexOf('yahei') > -1 || e.style.font-family.toLowerCase().indexOf('雅黑') > -1
}) */
const conn1 = require('./mysql')
const sqls = require('./sql')
const app = require('./http')

// 注册 解析表单的body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))

// 配置服务端口
const server = app.listen(3000, () => {
  const host = server.address().address
  const port = server.address().port
  console.log('server is running listen 3000', host, port)
})

const sqlObj = new sqls()

// getAll
app.get('/api/getAll', (req, res) => {
  const sql = sqlObj.GETALL_SQL_NODETEST
  console.log(sql)
  conn1.query(sql, (err, result) => {
    console.log(result)
    if (err) return res.json({err_code: 0, msg: '查询失败', affectedRows: 0})
    res.json({
      err_code: 1, msg: result, affectedRows: 0
    })
  })
})

// getById
app.get('/api/getById', (req, res) => {
  const id = req.query.id
  const sqlStr = sqlObj.GETBYID_SQL_NODETEST 
  conn1.query(sqlStr, id, (err, results) => {
      if(err) return res.json({err_code: 1, msg: '获取数据失败', affectedRows: 0})
      if(results.length !== 1) return res.json({err_code: 1, msg: '数据不存在', affectedRows: 0})
      res.json({
          err_code: 1,
          msg: results[0],
          affectedRows: 0
      })
  })
})