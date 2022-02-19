const User = require('../models/User')

function userLoggedMiddleware(req, res, next) {
    
        res.locals.isLogged = false;
        
        let emailInCookie = req.cookies.userEmail;
        let userFromCookie = User.findByField('email', emailInCookie);

        if (userFromCookie){
            req.session.userLogged = userFromCookie;
        }

       if (req.session.userLogged) {
           res.locals.isLogged = true;
           res.locals.userLogged = req.session.userLogged;
           //paso lo que tengo en session a variables locales
           //para poder compartir con las distintas vistas
       }
       next();


    //res.locals son variables 
    //que puedo compartir a traves de todas las vistas
    //independientemente del controlador

}
module.exports = userLoggedMiddleware;