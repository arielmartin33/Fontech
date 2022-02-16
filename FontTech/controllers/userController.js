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
        res.redirect('userLoginForm');
    },

    loginProcess: (req, res) => {

        let userToLogin = User.findByField('email', req.body.email);

        if (userToLogin){
            let passwordOk = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if (passwordOk){
                return res.send('puedes ingresar');
            }
            return res.render('userLoginForm', {
                errors: {
                    errors: {
                        msg: 'las credenciales no son validas'
                    }
                }
            });

        }
        return res.render('userLoginForm', {
            errors: {
                errors: {
                    msg: 'el mail no existe'
                }
            }
        });
    },
    
    profile: (req, res) => {
        res.render('userProfile');
    },
}
module.exports = controller;