const express = require('express')
const app = express()
const cors = require('cors')
const indexRouter = require('./routers/indexRouter')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/', indexRouter)

//custom error
app.use((req, res)=>{
  res.status(404).send('Page Not Found')
})

//global errors
app.use((error, req, res, next) => {
  res.status(400).json(error)//grap this from frontend
})

app.listen(3000, ()=> {
  console.log('Server is runing...')
})