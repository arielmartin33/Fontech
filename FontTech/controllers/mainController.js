const mainController = {
    index: (req, res) => {
        return res.render('home');
    },
    register: (req, res) =>{
        return res.render('registro');
    },
    login: (req, res) => {
        return res.render('login');
    },
    carrito: (req, res) => {
        return res.render('carrito');
    },
    productos: (req, res) => {
        return res.render('productos');
    },
}
module.exports = mainController;