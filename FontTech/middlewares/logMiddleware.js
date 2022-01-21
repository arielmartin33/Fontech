const fs = require('fs');
const path = require('path');

const logpath = path
const logMiddleware = (req, res, next)=> {
    fs.writeFileSync('log.txt', 'Se ingreso en la pagina' + req.url);
    next();
}
module.exports = logMiddleware;