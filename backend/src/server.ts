import http from "http";
import app from "./app.js";
import "dotenv/config";

function normalizePort(val: string): number | string | false {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // Si ce n'est pas un nombre → peut être un pipe
      return val;
    }
  
    if (port >= 0) {
      // Port valide
      return port;
    }
  
    return false;
}

const port = normalizePort(process.env.PORT ?? '3002');
app.set('port', port);

const server = http.createServer(app);

const errorHandler = (error :unknown): void => {

    if (!(error instanceof Error)) {
        throw error;
    }
    
    const err = error as NodeJS.ErrnoException;

    if (err.syscall !== 'listen') {
      throw err;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (err.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
      default:
        throw error;
    }
};

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

server.listen(port);

