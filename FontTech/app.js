const express = require('express');
const session = require('express-session');
const cookies = require('cookie-parser');

const app = express();

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

app.use(session({
    secret: "Frase secreta",
    //estas dos lineas son para que no salga el error Deprecated!!
    resave: false,
    saveUninitialized: false
}))

//middleware
app.use(cookies());

app.use(userLoggedMiddleware);

const logMiddleware = require('./middlewares/logMiddleware');



app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

const productRoutes = require('./routes/productRoutes')
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');



app.use('/', mainRoutes);
app.use('/products', productRoutes);
app.use('/user', userRoutes);
app.use(logMiddleware);

app.listen('3500',()=> console.log('Servidor corriendo en puerto 3500'));

