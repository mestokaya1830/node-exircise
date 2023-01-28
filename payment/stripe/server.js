const express = require('express')
const app = express()
const cors = require('cors')

process.env.NODE_ENV !== 'production' ? require('dotenv').load() : null

app.use(cors())
app.use(express.json())
app.use(express.static('static'))
app.set('view engine', 'ejs')


app.listen(3000, () => {
  console.log('Server is running...')
})
