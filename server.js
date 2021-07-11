const express = require('express');
// Inicializamos express
const app = express();
// Le pasamos la constante que creamos app
const http = require('http').Server(app);
// Le pasamos la constante que creamos http
// se trabaja con http y no con express
const io = require('socket.io')(http);

// Declaramos la api que tiene la Clase de acceso al archivo
const productos = require('./api/producto');

// Declaramos la api que tiene la Clase de acceso al archivo
const chat = require('./api/chat');

// Inicializamos la librería handlebars
const handlebars = require('express-handlebars');



// creo una app de tipo express
//const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//establecemos la configuración de handlebars
app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials/'
    })
);

app.set("view engine", "hbs");
app.set("views", __dirname + '/views');





// importo las rutas y las uso con el prefijo /api
const productosRouter = require('./routes/productos');
app.use('/api', productosRouter);

// indico donde estan los archivos estaticos
app.use(express.static('public'));

/// GET api/-------------------------------------------------
// envio a renderizar el html en la raiz de la misma
app.get('/', (req, res) => {
    res.sendFile('index.html',{root:__dirname});
});



/// obtengo el puerto del enviroment o lo seteo por defecto
const PORT = process.env.PORT || 8080;

// pongo a escuchar el servidor en el puerto indicado
const server = http.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});

/*let messages=[
  {author:"Juan", text:"Hola Qué tal?", email:"juan@gmail.com", datetime:(new Date("10/7/2021 18:10:48")).toLocaleString()},
  {author:"Pedro", text:"Muy bien y vos?",email:"pedro@gmail.com",datetime:(new Date("10/7/2021 18:10:48")).toLocaleString()},
  {author:"Ana", text:"Genial!",email:"ana@gmail.com",datetime:(new Date("10/7/2021 18:10:48")).toLocaleString()}

];*/
// SOCKET
// cuando se realice la conexion, se ejecutara una sola vez
io.on('connection', (socket) => {
    console.log("Usuario conectado");
    socket.emit('actualizar', productos.read());
    //socket.emit('messages', messages);
    socket.emit('messages', chat.read());

    socket.on('guardar', (data) => {
        productos.save(data);
        console.log(productos.read());
        io.sockets.emit('actualizar', productos.read());
    });
    socket.on('new-message',function(data){
      chat.save(data);
      console.log(chat.read());
      io.sockets.emit('messages', chat.read());
    });
});



// en caso de error, avisar
http.on('error', error => {
    console.log('error en el servidor:', error);
    res.status(500).send({error : 'ocurrió un error'});
});


//manejo de errores
app.use(function(err,req,res,next){
  console.error(err.stack);
  res.status(500).send({error : 'ocurrió un error'});
});
