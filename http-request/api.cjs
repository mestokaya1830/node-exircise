const request = require('sync-request')

const result = request('GET', 'https://jsonplaceholder.typicode.com/users')
console.log(JSON.parse(result.getBody('utf8')))
