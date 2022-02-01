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
            //devuelve un objeto literarl con la propiedad name y a su vez con todas las caracteristicas
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
        return res.redirect('userLoginForm');
    },

    login: (req, res) => {
        res.render('userLoginForm');
    },
    
    profile: (req, res) => {
        res.render('userProfile');
    },
}
module.exports = controller;