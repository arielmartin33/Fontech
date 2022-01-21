const express = require('express');

const app = express();
const productRoutes = require('./routes/productRoutes')
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');
const logMiddleware = require('./middlewares/logMiddleware');


app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.use('/', mainRoutes);
app.use('/products', productRoutes);
app.use('/registro', userRoutes);
app.use(logMiddleware);

app.listen('3500',()=> console.log('Servidor corriendo en puerto 3500'));

