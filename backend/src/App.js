// import express
const express = require('express');
const app = express(); 
const cors = require('cors');
const morgan = require('morgan');
const path = require("path");

// setting port
app.set('port',process.env.PORT||3333);

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));
//app.use('/static', express.static(__dirname + '/public'));

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//importing route
const clienteRouters = require('./routes/ClienteRoute');
const motoristaRouters = require('./routes/MotoristaRoute');
const bancoRouters = require('./routes/BancoRoute');
const estadoRouters = require('./routes/EstadoRoute');
const loginRouters = require('./routes/LoginRoute');
const OperadorRouters = require('./routes/OperadorRoute');
const Cartao_creditoRouters = require('./routes/Cartao_creditoRoute');
const TransladoRoutes = require('./routes/TransladoRoute');
const FuncionalidadeRouters = require('./routes/FuncionalidadeRoute');
const Matriz_tarifariaRouters = require('./routes/Matriz_tarifariaRoute');
const OcorrenciaRouters = require('./routes/OcorrenciaRoute');
const EventosRouters = require('./routes/EventosRoute');
const FileRouters = require('./routes/fileupload');
const SeguradoraRouters = require('./routes/SeguradoraRoute');
const Foto_motoristaRouters = require('./routes/Foto_motoristaRoute');
const Tipo_TransporteRouters = require('./routes/Tipo_TransporteRoute');
/*
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
); 
*/
//Route
app.use('/cliente', clienteRouters);
app.use('/motorista', motoristaRouters);
app.use('/banco', bancoRouters);
app.use('/estado', estadoRouters);
app.use('/login', loginRouters);
app.use('/operador', OperadorRouters);
app.use('/cartao', Cartao_creditoRouters);
app.use('/translado', TransladoRoutes);
app.use('/funcionalidade', FuncionalidadeRouters);
app.use('/matriz', Matriz_tarifariaRouters);
app.use('/ocorrencia', OcorrenciaRouters);
app.use('/eventos', EventosRouters);
app.use('/file', FileRouters);
app.use('/seguradora', SeguradoraRouters);
app.use('/foto', Foto_motoristaRouters);
app.use('/tipoTransporte', Tipo_TransporteRouters);
app.use('/tmp', express.static('tmp'));

app.use('/test', (req, res) => {
  res.send("Test route");
});

//app.use('/', (req,res) => {
//  res.send("Hello world from Node.js Server");
//});

app.listen(app.get('port'),()=>{
  console.log("Starting server Node.js");
})
