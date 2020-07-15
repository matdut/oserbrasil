import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

 import Inicio from './pages/inicio';
 
 /* CLIENTE */
 import Form from './pages/cliente/form';
 import List from './pages/cliente/list';
 import Edit from './pages/cliente/edit';
 import Alterar_senha from './pages/cliente/alterar_senha'; 
 import Area_cliente from './pages/cliente/area_cliente';
 //import NovoCadastro from './pages/cliente/cadastro';

 /* EVENTOS */
 import Eventos_cadastro from './pages/eventos/form';
 import Listar_evento_cliente from './pages/eventos/list'; 
 

 /* TRANSLADOS */
 import Translados_incluir from './pages/translados/form';
 import Translados_editar from './pages/translados/editar';
 import Translado_listar from './pages/translados/list';


/* MOTORISTAS */ 
 import FormMotorista from './pages/motorista/form';
 import ListMotorista from './pages/motorista/list';
 import EditMotorista from './pages/motorista/edit'; 
 import Alterar_senha_Motorista from './pages/motorista/alterar_senha'; 
 import Area_motorista from './pages/motorista/area_motorista';

 
/*ADMINISTRADOR */
import Area_administrador from './pages/administrador/area_administrador';

/* MATRIZ */
import Matriz_tarifaria_criar from './pages/matriz_tarifaria/form';
import Matriz_tarifaria_listar from './pages/matriz_tarifaria/list';

/* FAIXA TARIFARIA */
import Faixa_tarifaria_listar from './pages/faixa_tarifarias/list';
import Faixa_tarifaria_criar from './pages/faixa_tarifarias/form';
import Faixa_tarifaria_editar from './pages/faixa_tarifarias/edit';

/* MAPS */
import GoogleMaps from './pages/maps3';

 import Sobre from './pages/sobre';
 import Login from './pages/login'; 
 import Rodape from './pages/rodape';
 import Servicos from './pages/servicos';
 import Contato from './pages/contato';
 import Logout from './pages/logout';
 import Cartao2 from './pages/teste_cartao';
 import LoginNovo from './pages/login_novo';

 var fs = require('fs');

//Convertendo binario em arquivo
function base64_decode(base64str,fileName){
  var bitmap = new Buffer (base64str, 'base64');
  fs.writeFileSync('src/temp/'+fileName+'',bitmap, 'binary', function (err){
    if(err){
      console.log('Conversao com erro');
    }
  } );
}

//Convertendo arquivo em binário
function base64_encode(fileName){
  var bitmap = fs.readFileSync('src/temp/'+fileName+'');
  return new Buffer (bitmap).toString('base64');
}
   
export default function Routes() {
    return (
        <BrowserRouter>
        <Switch>
         <div className="App">                
            <Route path="/" exact component={Inicio} />
            <Route path="/sobre" component={Sobre} />
            <Route path="/form" component={Form} />
            <Route path="/edit/:id" component={Edit} />
            <Route path="/login" component={Login} />
            <Route path="/list" component={List} />
            <Route path="/area_cliente" component={Area_cliente} />
            <Route path="/area_motorista" component={Area_motorista} />
            <Route path="/area_administrador" component={Area_administrador} />
            <Route path="/servicos" component={Servicos} />
            <Route path="/contato" component={Contato} />
            <Route path="/logout" component={Logout} />            

            <Route path="/criar" component={FormMotorista} />
            <Route path="/editar/:id" component={EditMotorista} />
            <Route path="/listar" component={ListMotorista} />            

            <Route path="/teste1" component={Cartao2} />      

            <Route path="/novologin" component={LoginNovo} />    

             <Route path="/alterar_senha" component={Alterar_senha} />

             <Route path="/alterar_senha_motorista" component={Alterar_senha_Motorista} />                            

             <Route path="/criar_eventos/:id" component={Eventos_cadastro} /> 
             <Route path="/listaeventocliente/:id" component={Listar_evento_cliente} />           

             <Route path="/listporevento/:id" component={Translado_listar} />    
             <Route path="/transladoscriar" component={Translados_incluir} />    
             <Route path="/transladoseditar/:id" component={Translados_editar} />                               

             <Route path="/matriz_criar" component={Matriz_tarifaria_criar} />
             <Route path="/matriz_listar" component={Matriz_tarifaria_listar} />

             <Route path="/faixa_listar/:id" component={Faixa_tarifaria_listar} />
             <Route path="/faixa_editar/:id" component={Faixa_tarifaria_editar} />
             <Route path="/faixa_criar" component={Faixa_tarifaria_criar} />

             <Route path="/maps" component={GoogleMaps} />                
                       

            <Rodape />
         </div>
        </Switch>
        </BrowserRouter>
    )
 }