const express = require('express')
const router = express.Router()
const errorHandler = require('../middleware/errorHandler')

router.get('/', errorHandler((req, res, next) => {
  res.jso({ message: 'Hello' })
}))

module.exports = router