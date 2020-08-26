import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

 import Inicio from './pages/inicio';

 //import Inicio from './pages/eventos/arquivos_teste/formulario1';
 
 /* CLIENTE */
 //import Form from './pages/cliente/form';
 //import List from './pages/cliente/list';
 //import Edit from './pages/cliente/edit';


// import Alterar_senha from './pages/cliente/alterar_senha'; 
  import Tipo_cliente from './pages/tipo_cliente';

 import Representante from './pages/empresa/representante';
 import Empresa_dados from './pages/empresa/dados_empresa';
 import Empresa_endereco from './pages/empresa/endereco_empresa';
 import Empresa_senha from './pages/empresa/senha_empresa';
 import Area_cliente_empresarial from './pages/empresa/area_cliente_empresarial';
 import Lista_Empresarial from './pages/empresa/lista_empresarial';


 import Cliente from './pages/cliente/representante';
 import cliente_endereco from './pages/cliente/endereco_empresa';
 import cliente_senha from './pages/cliente/senha_empresa';
 import Area_cliente_individual from './pages/cliente/area_cliente_individual';
 import Lista_Individual from './pages/cliente/lista_individual';

 //import NovoCadastro from './pages/cliente/cadastro';

 /* EVENTOS */
 import Eventos_novo_cadastro from './pages/eventos/eventos';
 import Listar_evento_cliente from './pages/eventos/list';  

 /* TRANSLADOS */
 import Translados_incluir from './pages/translados/form';
 import Translados_editar from './pages/translados/editar';
 import Translado_listar from './pages/translados/list';

/** OPERADORES */
 import Operador_cadastro from './pages/operadores/operadores';
 import Operador_lista from './pages/operadores/lista_operadores';
 import Operador_lista_empresa from './pages/operadores/lista_operadores_empresa';
 import Area_operador from './pages/operadores/area_operador';
 import Operador_senha from './pages/operadores/senha_operador';

/* MOTORISTAS */ 
 //import FormMotorista from './pages/motorista/form';
 import ListMotorista from './pages/motorista/list';
 import Listar_Tipo_veiculo from './pages/tipo_veiculo/list';
 //import EditMotorista from './pages/motorista/edit'; 
 import Alterar_senha_Motorista from './pages/motorista/alterar_senha'; 
 import Area_motorista from './pages/motorista/area_motorista';

 import Motorista_cadastro from './pages/motorista/motorista';
 import Motorista_endereceo from './pages/motorista/endereco_motorista';
 import Motorista_veiculo from './pages/motorista/veiculo';
 import Motorista_senha from './pages/motorista/senha_motorista';
 import Motorista_doc_alterar from './pages/motorista/documentos_motorista';
 import Motorista_documento from './pages/motorista/documentos';
 import Motorista_foto from './pages/motorista/foto';

 import lista_Veiculos_motorista from './pages/motorista/veiculos/lista_veiculos_motorista';
 import incluir_Veiculos from './pages/motorista/veiculos/incluir_outro';
 import alterar_Veiculos from './pages/motorista/veiculos/alterar_outro';
 import incluir_documentos from './pages/motorista/veiculos/incluir_outro_doc';
 import alterar_documentos from './pages/motorista/veiculos/alterar_outro_doc';

 import Motorista_alterar_veiculo from './pages/motorista/alteracao_veiculo';
 
/*ADMINISTRADOR */
import Area_administrador from './pages/administrador/area_administrador';
import Cartao_creedito_cadastrar from './pages/cartao/cartao_credito';

/* MATRIZ */
import Matriz_tarifaria_criar from './pages/matriz_tarifaria/form';
import Matriz_tarifaria_listar from './pages/matriz_tarifaria/list';

/* FAIXA TARIFARIA */
import Faixa_tarifaria_listar from './pages/faixa_tarifarias/list';
import Faixa_tarifaria_criar from './pages/faixa_tarifarias/form';
import Faixa_tarifaria_editar from './pages/faixa_tarifarias/edit';


import Tipo_Transporte_create from './pages/tipo_veiculo/tipo_veiculo';
/* MAPS */

/* EMAIL */ 

 import Sobre from './pages/sobre';
 import Login from './pages/login'; 
 import Rodape from './pages/rodape';
 import Servicos from './pages/servicos';
 import Contato from './pages/contato';

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
            <Route path="/login" component={Login} />

            <Route path="/area_cliente_individual" component={Area_cliente_individual} />
            <Route path="/area_cliente_empresarial" component={Area_cliente_empresarial} />
            <Route path="/area_motorista" component={Area_motorista} />
            <Route path="/area_administrador" component={Area_administrador} />
            <Route path="/servicos" component={Servicos} />
            <Route path="/contato" component={Contato} />
                        
            <Route path="/listar" component={ListMotorista} />                  

            <Route path="/lista_individual" component={Lista_Individual} />     
            <Route path="/lista_empresarial" component={Lista_Empresarial} />               

             <Route path="/alterar_senha_motorista" component={Alterar_senha_Motorista} />                            

             <Route path="/criar_eventos/:id" component={Eventos_novo_cadastro} />              

             <Route path="/listaeventocliente/:id" component={Listar_evento_cliente} />           

             <Route path="/listporevento/:id" component={Translado_listar} />    
             <Route path="/transladoscriar" component={Translados_incluir} />    
             <Route path="/transladoseditar/:id" component={Translados_editar} />                               

             <Route path="/matriz_criar" component={Matriz_tarifaria_criar} />
             <Route path="/matriz_listar" component={Matriz_tarifaria_listar} />

             <Route path="/faixa_listar/:id" component={Faixa_tarifaria_listar} />
             <Route path="/faixa_editar/:id" component={Faixa_tarifaria_editar} />
             <Route path="/faixa_criar" component={Faixa_tarifaria_criar} />          

             <Route path="/tipo" component={Tipo_cliente} />
             <Route path="/empresa/:id" component={Representante} />
             <Route path="/empresa_dados/:id" component={Empresa_dados} />
             <Route path="/empresa_endereco/:id" component={Empresa_endereco} />             
             <Route path="/empresa_senha/:id" component={Empresa_senha} />             

             <Route path="/cliente/:id" component={Cliente} />             
             <Route path="/cliente_endereco/:id" component={cliente_endereco} />             
             <Route path="/cliente_senha/:id" component={cliente_senha} />             

             <Route path="/motorista/:id" component={Motorista_cadastro} />             
             <Route path="/endereco_motorista/:id" component={Motorista_endereceo} />      
             <Route path="/veiculo_motorista/:id" component={Motorista_veiculo} />      
             <Route path="/senha_motorista/:id" component={Motorista_senha} />      

             <Route path="/veiculo_alterar_motorista/:id" component={Motorista_alterar_veiculo} />      
             
             <Route path="/documentos_motorista_alterar/:id" component={Motorista_doc_alterar} />

             <Route path="/documentos_motorista/:id" component={Motorista_documento} />
             <Route path="/foto_motorista/:id" component={Motorista_foto} />                   
             <Route path="/listar_tipo_veiculo" component={Listar_Tipo_veiculo} />  

             <Route path="/lista_veiculos/:id" component={lista_Veiculos_motorista} />
             <Route path="/incluir_veiculos/:id" component={incluir_Veiculos} />                   
             <Route path="/incluir_documentos/:id" component={incluir_documentos} />
             <Route path="/alterar_veiculos/:id" component={alterar_Veiculos} />                   
             <Route path="/alterar_documentos/:id" component={alterar_documentos} />

             <Route path="/operadores/:id" component={Operador_cadastro} />
             <Route path="/operador_lista" component={Operador_lista} />
             <Route path="/senha_operador/:id" component={Operador_senha} />             
             <Route path="/operador_lista_empresa/:id" component={Operador_lista_empresa} />

             <Route path="/tipo_transporte" component={Tipo_Transporte_create} />
             
             <Route path="/cartao_credito" component={Cartao_creedito_cadastrar} />
             
             <Route path="/area_operador" component={Area_operador} />
             
  
            <Rodape />
         </div>
        </Switch>
        </BrowserRouter>
    )
 }