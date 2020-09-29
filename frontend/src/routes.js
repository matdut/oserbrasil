import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import Inicio from './pages/inicio';

// import Alterar_senha from './pages/cliente/alterar_senha'; 
  import Tipo_cliente from './pages/tipo_cliente';

 import Representante_incluir from './pages/empresa/incluir/representante';
 import Empresa_dados_incluir from './pages/empresa/incluir/dados_empresa';
 import Empresa_senha_incluir from './pages/empresa/incluir/senha_empresa';

 import Representante_alterar from './pages/empresa/alterar/representante';
 import Empresa_dados_alterar from './pages/empresa/alterar/dados_empresa';
 import Empresa_senha_alterar from './pages/empresa/alterar/senha_empresa';

 import Empresa_endereco from './pages/empresa/endereco_empresa';

 import Area_cliente_empresarial from './pages/empresa/area_cliente_empresarial';
 import Lista_Empresarial from './pages/empresa/lista_empresarial';
 import incluir_Operador from './pages/empresa/criar_operadores';

 import Cliente_incluir from './pages/cliente/incluir/representante';
 import cliente_senha_incluir from './pages/cliente/incluir/senha_empresa';
 import Cliente_alterar from './pages/cliente/alterar/representante';
 import cliente_senha_alterar from './pages/cliente/alterar/senha_empresa';

 import cliente_endereco from './pages/cliente/endereco_empresa';
 import Area_cliente_individual from './pages/cliente/area_cliente_individual';
 import Lista_Individual from './pages/cliente/lista_individual';

 /* EVENTOS */
 import Eventos_novo_cadastro from './pages/eventos/eventos';
 import Listar_evento_cliente from './pages/eventos/list';  
 import Listar_evento_servico from './pages/eventos/listar_servicos';  

 /* SERVIÇOS */
 import Servicos_incluir from './pages/servicos/servicos';


 //import Modal_Cliente_Individual from './pages/cliente/modal/representante';
 

/** OPERADORES */
 import Operador_cadastro_incluir from './pages/operadores/incluir/operadores';
 import Operador_senha_incluir from './pages/operadores/incluir/senha_operador';

 import Operador_cadastro_alterar from './pages/operadores/alterar/operadores';
 import Operador_senha_alterar from './pages/operadores/alterar/senha_operador';

 import Operador_lista from './pages/operadores/lista_operadores';
 import Operador_lista_empresa from './pages/operadores/lista_operadores_empresa';
 import Area_operador from './pages/operadores/area_operador';
 import Operador_email_lista from './pages/operadores/lista_operadores_email';

/* MOTORISTAS */ 
 //import FormMotorista from './pages/motorista/form';
 import ListMotorista from './pages/motorista/list';
 import Listar_Tipo_veiculo from './pages/tipo_veiculo/list';
 //import EditMotorista from './pages/motorista/edit'; 
 import Alterar_senha_Motorista from './pages/motorista/alterar_senha'; 
 import Area_motorista from './pages/motorista/area_motorista';

 import Motorista_cadastro_incluir from './pages/motorista/incluir/motorista'; 
 import Motorista_veiculo_incluir from './pages/motorista/incluir/veiculo';
 import Motorista_senha_incluir from './pages/motorista/incluir/senha_motorista';
 import Motorista_documento_incluir from './pages/motorista/incluir/documentos';
 import Motorista_foto_incluir from './pages/motorista/incluir/foto';
 import Motorista_endereco_incluir from './pages/motorista/incluir/endereco_motorista';

 import Motorista_cadastro_alterar from './pages/motorista/alterar/motorista'; 
 import Motorista_veiculo_alterar from './pages/motorista/alterar/veiculo';
 import Motorista_senha_alterar from './pages/motorista/alterar/senha_motorista';
 import Motorista_documento_alterar from './pages/motorista/alterar/documentos';
 import Motorista_foto_alterar from './pages/motorista/alterar/foto';
 import Motorista_endereco_alterar from './pages/motorista/alterar/endereco_motorista';

 import Motorista_doc_alterar from './pages/motorista/documentos_motorista'; 
 import lista_Veiculos_motorista from './pages/motorista/veiculos/lista_veiculos_motorista';
 import incluir_Veiculos from './pages/motorista/veiculos/incluir_outro';
 import alterar_Veiculos from './pages/motorista/veiculos/alterar_outro';
 import incluir_documentos from './pages/motorista/veiculos/incluir_outro_doc';
 import alterar_documentos from './pages/motorista/veiculos/alterar_outro_doc';

 import Motorista_alterar_veiculo from './pages/motorista/alteracao_veiculo';

 /* Funcionalidades */
 import Funcionalidades_list from './pages/funcionalidades/list';
 import Funcionalidades_cadastrar from './pages/funcionalidades/funcionalidade';

/*ADMINISTRADOR */
import Area_administrador from './pages/administrador/area_administrador';
import Cartao_creedito_cadastrar from './pages/cartao/cartao_credito';
import Lista_cad_Incompleto from './pages/administrador/lista_cad_incompleto';

/* MATRIZ */
import Matriz_tarifaria_editar from './pages/matriz_tarifaria/edit';
import Matriz_tarifaria_criar from './pages/matriz_tarifaria/form';
import Matriz_tarifaria_listar from './pages/matriz_tarifaria/list';

/* FAIXA TARIFARIA */
import Faixa_tarifaria_listar from './pages/faixa_tarifarias/list';
import Faixa_tarifaria_criar from './pages/faixa_tarifarias/form';
import Faixa_tarifaria_editar from './pages/faixa_tarifarias/edit';


import Tipo_Transporte_create from './pages/tipo_veiculo/tipo_veiculo';

import Esqueceu_Senha from './pages/esqueceu_senha';
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
  fs.writeFileSync('tmp/uploads/'+fileName+'',bitmap, 'binary', function (err){
    if(err){
      console.log('Conversao com erro');
    }
  } );
}

//Convertendo arquivo em binário
function base64_encode(fileName){
  var bitmap = fs.readFileSync('tmp/uploads/'+fileName+'');
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
             <Route path="/lista_evento_servico/:id" component={Listar_evento_servico} />                                         

             <Route path="/matriz_criar" component={Matriz_tarifaria_criar} />
             <Route path="/matriz_listar" component={Matriz_tarifaria_listar} />
             <Route path="/matriz_editar/:id" component={Matriz_tarifaria_editar} />            

             <Route path="/faixa_listar/:id" component={Faixa_tarifaria_listar} />
             <Route path="/faixa_editar/:id" component={Faixa_tarifaria_editar} />
             <Route path="/faixa_criar" component={Faixa_tarifaria_criar} />          

             <Route path="/empresa_incluir/:id" component={Representante_incluir} />
             <Route path="/empresa_dados_incluir/:id" component={Empresa_dados_incluir} />
             <Route path="/empresa_senha_incluir/:id" component={Empresa_senha_incluir} />     

             <Route path="/empresa_alterar/:id" component={Representante_alterar} />
             <Route path="/empresa_dados_alterar/:id" component={Empresa_dados_alterar} />
             <Route path="/empresa_senha_alterar/:id" component={Empresa_senha_alterar} />     

             <Route path="/tipo" component={Tipo_cliente} />             
             <Route path="/empresa_endereco/:id" component={Empresa_endereco} />                          
             <Route path="/incluir_operador/:id" component={incluir_Operador} />     
                     
             <Route path="/lista_operador_email/:id" component={Operador_email_lista} />     
             
             <Route path="/servicos_evento/:id" component={Servicos_incluir} />     

             <Route path="/funcionalidade/list" component={Funcionalidades_list} />          
             <Route path="/funcionalidade/cadastrar" component={Funcionalidades_cadastrar} />          
             
             
             <Route path="/cliente_incluir/:id" component={Cliente_incluir} />             
             <Route path="/cliente_alterar/:id" component={Cliente_alterar} />             
             <Route path="/cliente_senha_incluir/:id" component={cliente_senha_incluir} />             
             <Route path="/cliente_senha_alterar/:id" component={cliente_senha_alterar} />             

             <Route path="/cliente_endereco/:id" component={cliente_endereco} />                     

             <Route path="/motorista_incluir/:id" component={Motorista_cadastro_incluir} />             
             <Route path="/veiculo_motorista_incluir/:id" component={Motorista_veiculo_incluir} />      
             <Route path="/senha_motorista_incluir/:id" component={Motorista_senha_incluir} />      
             <Route path="/documentos_motorista_incluir/:id" component={Motorista_documento_incluir} />
             <Route path="/foto_motorista_incluir/:id" component={Motorista_foto_incluir} />              
             <Route path="/endereco_motorista_incluir/:id" component={Motorista_endereco_incluir} />   

             <Route path="/motorista_alterar/:id" component={Motorista_cadastro_alterar} />             
             <Route path="/veiculo_motorista_alterar/:id" component={Motorista_veiculo_alterar} />      
             <Route path="/senha_motorista_alterar/:id" component={Motorista_senha_alterar} />      
             <Route path="/foto_motorista_alterar/:id" component={Motorista_foto_alterar} />                   
             <Route path="/endereco_motorista_alterar/:id" component={Motorista_endereco_alterar} />   
               
             <Route path="/veiculo_alterar_motorista/:id" component={Motorista_alterar_veiculo} />                   
             <Route path="/documentos_motorista_alterar/:id" component={Motorista_doc_alterar} />
             
             <Route path="/listar_tipo_veiculo" component={Listar_Tipo_veiculo} />  

             <Route path="/lista_veiculos/:id" component={lista_Veiculos_motorista} />
             <Route path="/incluir_veiculos/:id" component={incluir_Veiculos} />                   
             <Route path="/incluir_documentos/:id" component={incluir_documentos} />
             <Route path="/alterar_veiculos/:id" component={alterar_Veiculos} />                   
             <Route path="/alterar_documentos/:id" component={alterar_documentos} />
          
             <Route path="/operadores_incluir/:id/:email" component={Operador_cadastro_incluir} />
             <Route path="/senha_operador_incluir/:id" component={Operador_senha_incluir} />         

             <Route path="/operadores_alterar/:id" component={Operador_cadastro_alterar} />
             <Route path="/senha_operador_alterar/:id" component={Operador_senha_alterar} />         

             <Route path="/operador_lista" component={Operador_lista} />                 
             <Route path="/operador_lista_empresa/:id" component={Operador_lista_empresa} />

             <Route path="/tipo_transporte" component={Tipo_Transporte_create} />
             
             <Route path="/cartao_credito" component={Cartao_creedito_cadastrar} />
             
             <Route path="/area_operador" component={Area_operador} />

             <Route path="/esqueceu_senha" component={Esqueceu_Senha} />  

             <Route path="/lista_cad_incompleto/:id" component={Lista_cad_Incompleto} />  
             
         </div>
        </Switch>
        </BrowserRouter>
    )
 }