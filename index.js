const http = require('http')
const app = require('./app')
const port = process.env.PORT || 4000;

var server = http.createServer(app)

server.listen(port, () => {
    console.log('server is running...')
})
