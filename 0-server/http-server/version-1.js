import http from 'http'
import fs from 'fs'
import url from 'url'

http.createServer((req, res) => {
  const parseUrl = url.parse(req.url, true)
  console.log(parseUrl)
  if(req.url == '/' && req.method == 'GET'){
    res.end(fs.readFileSync('index.html'))
  }
}).listen(3000, () => {
  console.log('Server is running...')
})
