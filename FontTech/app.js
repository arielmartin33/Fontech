const express = require('express');
const path = require('path');
const app = express();



app.use(express.static('public'));

app.listen('3000',()=> console.log('Servidor corriendo en puerto 3000'));

app.get('/', (req,res)=>{
    res.sendFile(path.resolve('./views/home.html'));
});

/*  app.get('/login', (req,res)=>{
    res.sendFile(path.resolve('./views/login.html'));
}); */
app.get('/registro', (req,res)=>{
    res.sendFile(path.resolve('./views/registro.html'));
});

app.get('/carrito', (req,res)=>{
    res.sendFile(path.resolve('./views/carrito.html'));
});

app.get('/producto', (req,res)=>{
    res.sendFile(path.resolve('./views/producto.html'));
}); 