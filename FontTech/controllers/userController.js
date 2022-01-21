const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/usersDB.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const userController = {
    index: (req, res) => {
        res.render('registro');
    },
    register: (req, res) => {
        res.render('registro');
    },
    store: (req, res) => {
        let newUser = {
            id: users[users.length -1].id + 1,
            ...req.body
        }
        console.log(req);
        users.push(newUser);
        const jsonUsers = JSON.stringify(users);
        fs.writeFileSync(usersFilePath, jsonUsers, 'utf-8');
        res.render('/');
    },
    detail: (req, res) => {
        res.render('/');
    }
}
module.exports = userController;