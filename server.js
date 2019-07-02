const app = require('./backend/app')
const http = require('http')
const debug = require('debug')('node-angular')

const normalizePort = val =>{
    var port = parseInt(val,10)
    if(isNaN(port)){
        return val;
    }
    if(port > 0){
        return port
    }
    return false;
}

const onError = error => {
    if(error.syscall !== 'listen'){
        throw error
    }
    var addr = server.address()
    const bind = typeof addr === 'string' ? 'pipe '+addr : 'port '+port;
    switch(error.code){
        case 'EACCESS':
            console.log(bind + " requires elivated previliges.")
            process.exit(1)
            break;
        case 'EADDRINUSE':
            console.log(bind + " is already in use")
            process.exit(1)
            break;
        default:
            throw error;
            break;
    }
}

const onListening = () => {
    var addr = server.address()
    var bind = typeof addr === 'string' ? "pipe " + addr : "port " + port;
    debug('Server is Listenting on ' +bind)
}

const port = normalizePort(process.env.port || 3000)

app.set('port',port)

const server = http.createServer(app)

server.on('error',onError)
server.on('listening',onListening)

server.listen(port,function(){
    console.log('server is running at ',port)
})