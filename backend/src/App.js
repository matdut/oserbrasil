// import express
const express = require('express');
const app = express(); 
const cors = require('cors');
const morgan = require('morgan');
const path = require("path");
const helmet = require('helmet');
//const dotenv = require('dotenv').config();

// setting port
app.set('port',21541);
app.use(helmet());

//Middlewares
//app.use(cors());
//app.use(express.json());

app.use(express.urlencoded({ extended: true}));
app.use(express.json({limit: '50mb'}));
app.use(morgan('dev'));
//app.use(express.limit(100000000));
//app.use('/static', express.static(__dirname + '/public'));
// Essa linha faz o servidor disponibilizar o acesso às imagens via URL!
//app.use(express.static('public'));

// Configurar cabeceras y cors


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    app.use(cors());
    next();
});

//importing route
const AdminAuxiliarRoutes = require('./routes/AdministradorAuxiliarRoute');
const AgenciaRoutes = require('./routes/AgenciaRoute');
const BancoRoutes = require('./routes/BancoRoute');
const EnvioServicoMotoristaRoutes = require('./routes/Envio_servico_motoristaRoute');
const clienteRouters = require('./routes/ClienteRoute');
const empresaRouters = require('./routes/EmpresaRoute');
const emailoperadorRoutes = require('./routes/EmailoperadorRoute');
const perfilRoutes = require('./routes/PerfilRoute');
const permissaoRouters = require('./routes/PermissaoRoute');
const tipo_eventoRoutes = require('./routes/TipoEventoRoute');
const motoristaRouters = require('./routes/MotoristaRoute');
const motoristapreferidoRouters = require('./routes/MotoristaPreferidoRoute');
const motoristaselecionadosRouters = require('./routes/MotoristaSelecionadosRoute');
const motorista_servicoRouters = require('./routes/MotoristaServicoRoute');
const motoristaAuxiliarRoutes = require('./routes/MotoristaAuxiliarRoute');
const bancoRouters = require('./routes/BancoRoute');
const estadoRouters = require('./routes/EstadoRoute');
const loginRouters = require('./routes/LoginRoute');
const OperadorRouters = require('./routes/OperadorRoute');
const Cartao_creditoRouters = require('./routes/Cartao_creditoRoute');
const ServicosRoutes = require('./routes/ServicosRoute');
const LogErrosRoutes = require('./routes/LogErrosRoute');

const FuncionalidadeRouters = require('./routes/FuncionalidadeRoute');
const Matriz_tarifariaRouters = require('./routes/Matriz_tarifariaRoute');
const Matriz_tarifaria_especialRoutes = require('./routes/Matriz_tarifaria_especialRoute');
const Motivo_cancelamentoRouters = require('./routes/Motivos_cancelamentoRoute');
const DiariaRouters = require('./routes/DiariaRoute');
const Diaria_especialRoutes = require('./routes/Diaria_especialRoute');
const MensagensClienteRouters = require('./routes/MensagensClienteRoute');
const MensagensMotoristaRouters = require('./routes/MensagensMotoristaRoute');

const EventosRouters = require('./routes/EventosRoute');
const HistoricoEventosRouters = require('./routes/HistoricoEventosRoute');
const HistoricoServicosRoutes = require('./routes/HistoricoServicosRoute');
const FinalizadosEventosRouters = require('./routes/FinalizadosEventosRoute');
const FinalizadosServicosRoutes = require('./routes/FinalizadosServicosRoute');
const OperadorEventoRouters = require('./routes/OperadorEventoRoute');
const FileRouters = require('./routes/fileupload');
const SeguradoraRouters = require('./routes/SeguradoraRoute');
const Foto_motoristaRouters = require('./routes/Foto_motoristaRoute');
const Tipo_TransporteRouters = require('./routes/Tipo_TransporteRoute');
const StatusRouters = require('./routes/StatusRoute');
const StatusFinalizacaoRouters = require('./routes/StatusFinalizacaoRoute');
const VeiculoRouters = require('./routes/VeiculosRoute');
const VeiculoMotPrefRouters = require('./routes/VeiculosMotPrefRoute');
const MarcaRouters = require('./routes/MarcaRoute');
const ModeloRouters = require('./routes/ModeloRoute');
const EmailRouters = require('./routes/EmailRoute');
const DescontosRouters = require('./routes/DescontosRoute');
const TaxasRouters = require('./routes/TaxasRoute');


app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
); 

//Route
app.use('/mensagens_cliente', MensagensClienteRouters);
app.use('/mensagens_motorista', MensagensMotoristaRouters);
app.use('/descontos', DescontosRouters);
app.use('/taxas', TaxasRouters);
app.use('/log_erros', LogErrosRoutes);
app.use('/motivo_cancelamento', Motivo_cancelamentoRouters);
app.use('/envioservicoMotorista', EnvioServicoMotoristaRoutes);
app.use('/administradorAuxiliar', AdminAuxiliarRoutes);
app.use('/agencia', AgenciaRoutes);
app.use('/banco', BancoRoutes);
app.use('/cliente', clienteRouters);
app.use('/email', EmailRouters);
app.use('/emailOperador', emailoperadorRoutes);
app.use('/permissao', permissaoRouters);
app.use('/perfil', perfilRoutes);
app.use('/tipoevento', tipo_eventoRoutes);
app.use('/status', StatusRouters);
app.use('/status_finalizacao', StatusFinalizacaoRouters);
app.use('/empresa', empresaRouters);
app.use('/motorista', motoristaRouters);
app.use('/motoristaPreferido', motoristapreferidoRouters);
app.use('/motorista_servico', motorista_servicoRouters);
app.use('/motoristaAuxiliar', motoristaAuxiliarRoutes);
app.use('/motorista_selecionados', motoristaselecionadosRouters);
app.use('/marca', MarcaRouters);
app.use('/modelo', ModeloRouters);
app.use('/login', loginRouters);
app.use('/veiculo', VeiculoRouters);
app.use('/veiculoMotPref', VeiculoMotPrefRouters);
app.use('/banco', bancoRouters);
app.use('/estado', estadoRouters);
app.use('/operador', OperadorRouters);
app.use('/cartao', Cartao_creditoRouters);
app.use('/servicos', ServicosRoutes);
app.use('/historicoServicos', HistoricoServicosRoutes);
app.use('/historicoEventos', HistoricoEventosRouters);
app.use('/finalizadosServicos', FinalizadosServicosRoutes);
app.use('/finalizadosEventos', FinalizadosEventosRouters);
app.use('/funcionalidade', FuncionalidadeRouters);
app.use('/matriz', Matriz_tarifariaRouters);
app.use('/matrizEspecial', Matriz_tarifaria_especialRoutes);
app.use('/diaria', DiariaRouters);
app.use('/diariaEspecial', Diaria_especialRoutes);
app.use('/eventos', EventosRouters);
app.use('/operadorevento', OperadorEventoRouters);
app.use('/file', FileRouters);
app.use('/seguradora', SeguradoraRouters);
app.use('/foto', Foto_motoristaRouters);
app.use('/tipoTransporte', Tipo_TransporteRouters);
app.use('/tmp', express.static('tmp'));
//app.use('https://www.receitaws.com.br/v1/cnpj/', )

app.use(
  "/tmp/uploads",
  express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
); 

/*
app.use('/test', (req, res) => {
  res.send("Test route");
});
*/

//app.use('/', (req,res) => {
//  res.send("Hello world from Node.js Server");
//});

app.listen(app.get('port'),()=>{
 // console.log('process '+ dotenv.env.PORT);
  console.log("Starting server Node.js");
})
