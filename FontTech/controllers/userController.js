const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

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
        return res.send('ok, paso la validacion');
    },

    login: (req, res) => {
        res.render('userLoginForm');
    },
    
    profile: (req, res) => {
        res.render('userProfile');
    },
}
module.exports = controller;