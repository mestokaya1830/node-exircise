const http = require('http')
const { GetAllPerson, FindPerson, AddPerson, UpdatePerson, RemovePerson } = require('./controllers/PersonController')

http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/api/person') {
    GetAllPerson(req, res)
  } else if (req.method === 'GET' && req.url.match(/\/api\/person\/([0-9]+)/)){
    const id = req.url.split('/')[3]
    FindPerson(req, res, id)
  } else if (req.method === 'POST' && req.url === '/api/person'){
    AddPerson(req, res)
  } else if (req.method === 'PUT' && req.url.match(/\/api\/person\/([0-9]+)/)){
    const id = req.url.split('/')[3]
    UpdatePerson(req, res, id)
  } else if (req.method === 'DELETE' && req.url.match(/\/api\/person\/([0-9]+)/)){
    const id = req.url.split('/')[3]
    RemovePerson(req, res, id)
  } else {
    res.writeHead(200, {'Content-Type':'application/json'})
    res.end(JSON.stringify({"message":"Url not found"}))
  }
}).listen(3000, () => {
  console.log('Server is running...')
})

