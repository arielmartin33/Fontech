// 1- Guardar usuario en la base de datos (json en este caso)
// 2- Buscar usuario que se quiere loguear por su e-mail.
// 3- BUscar a un usuario por su Id
// 4- Editar la información de un usuario
// 5- Eliminar un usuario de la bd
const fs = require('fs');

const User = {
    fileName: './data/usersDB.json',

    getData: function () {
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },
// devuelvo todo el contenido del json

    generateId: function () {
        let allUsers = this.findAll();
        let lastUser = allUsers.pop(); // obtengo el ultimo usuario
        if (lastUser){
            return lastUser.id + 1;
        }
        return 1;
    },

    findAll: function () {
        return this.getData();
    },

    findByPk: function (id) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id === id);
        return userFound;
    },

    findByField: function (field, text) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
        return userFound;
    },

    create: function (userData) {
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData
        }
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '));
        return newUser;
    },
    delete: function (id) {
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));
        return true;
    }
}

module.exports = User;