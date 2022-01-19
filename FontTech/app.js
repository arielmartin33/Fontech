const express = require('express');

const app = express();
const productRoutes = require('./routes/productRoutes')
const mainRoutes = require('./routes/mainRoutes');

app.use(express.static('./public'));

app.set('view engine', 'ejs');

app.use('/', mainRoutes);
app.use('/products', productRoutes);

app.listen('3000',()=> console.log('Servidor corriendo en puerto 3000'));

