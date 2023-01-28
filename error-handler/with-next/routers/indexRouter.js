const express = require('express')
const router = express.Router()


router.get('/', (req, res, next) => {
  try {
    res.jso({ message: 'Hello' })
  } catch (error) {
    next({
      errorMessge: 'There is no json'
    })
  }

})

module.exports = router