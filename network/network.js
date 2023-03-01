const http = require('http')
const app = require('../rest api/restApi.js')

const port = process.env.port || 3000

const server = http.createServer(app)

server.listen(port)