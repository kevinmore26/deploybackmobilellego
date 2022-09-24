const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const multer = require('multer');
const io = require('socket.io')(server);
const mercadopago = require('mercadopago');
mercadopago.configure({
    sandbox: true,
    access_token: 'TEST-1679191337926061-090115-bf2f9f2d50d79349137717ec82dee068-1190471550'
});

/*
* IMPORTAR SOCKETS
*/
const ordersSocket = require('./sockets/ordersSocket');

/*
* IMPORTAR RUTAS
*/
const usersRoutes = require('./routes/userRoutes');
const categoriesRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const addressRoutes = require('./routes/addressRoutes');
const ordersRoutes = require('./routes/orderRoutes');
const mercadoPagoRoutes = require('./routes/mercadoPagoRoutes');


const DB_PORT = process.env.DB_PORT || 4000
 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.disable('x-powered-by');

app.set('DB_PORT', 7225);

/*
* LLAMADO A LOS SOCKETS
*/
ordersSocket(io);

const upload = multer({
    storage: multer.memoryStorage()
});

/*
* LLAMADO DE LAS RUTAS
*/
usersRoutes(app, upload);
categoriesRoutes(app);
addressRoutes(app);
productRoutes(app, upload);
ordersRoutes(app);
mercadoPagoRoutes(app);


server.listen(7225, function() {
    console.log('Aplicacion de NodeJS ' + 7225 + ' Iniciada...')
});


// ERROR HANDLER
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

app.get('/',  (req, res) => {
    res.send('Ruta raiz del backend');
});


module.exports = {
    app: app,
    server: server
}

// 200 - ES UN RESPUESTA EXITOSA
// 404 - SIGNIFICA QUE LA URL NO EXISTE
// 500 - ERROR INTERNO DEL SERVIDOR