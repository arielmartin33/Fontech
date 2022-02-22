const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const bcryptjs = require('bcryptjs');

const controller = {
    register: (req, res) => {
        return res.render('userRegisterForm');
    },

    processRegister: (req, res) => {
        const resultValidation = validationResult(req);

        //resultValidation es un objeto literal que tiene la propiedad errors
        if (resultValidation.errors.length > 0) {
            return res.render('userRegisterForm', {
            //devuelve un objeto literal con la propiedad name y a su vez con todas las caracteristicas
            errors: resultValidation.mapped(),
            oldData: req.body
        });
        }

        let userInDb = User.findByField('email', req.body.email);
        if (userInDb){
            return res.render('userRegisterForm', {
            errors: {
                email: {
                    msg: 'Este email ya se encuentra registrado'
                }
            },
            oldData: req.body
        });
    }

        let userToCreate = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            image: req.file.filename
        }
        User.create(userToCreate);
        return res.render('userLoginForm');
    },

    login: (req, res) => {
        res.render('userLoginForm');
    },

    loginProcess: (req, res) => {

        
        let userToLogin = User.findByField('email', req.body.email);

        if (userToLogin){
            let passwordOk = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if (passwordOk){
                delete userToLogin.password; // borro el password por seguridad
                delete userToLogin.repassword;
                req.session.userLogged = userToLogin;
                
                if (req.body.remember_user) {
                    res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 2})
                }
                
                return res.redirect('/');
            }
            return res.render('userLoginForm', {
                errors: {
                    email: {
                        msg: 'las credenciales no son validas'
                    }
                }
            });

        }
        return res.render('userLoginForm', {
            errors: {
                email: {
                    msg: 'el mail no existe'
                }
            }
        });
    },
    
    profile: (req, res) => {

        res.render('userProfileForm', {
            user: req.session.userLogged
        });

    },
    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        res.redirect('/');

    }
}
module.exports = controller;