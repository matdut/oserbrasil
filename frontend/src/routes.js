import React, { useContext } from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import { isAuthenticated  } from './services/auth';

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
 //import Servicos_incluir from './pages/servicos/servicos';
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
 import Listar_motivo_cancelamento from './pages/motivos_cancelamento/list';

 import Listar_mensagens_site from './pages/mensagens/list';
 //import EditMotorista from './pages/motorista/edit'; 
 import Alterar_senha_Motorista from './pages/motorista/alterar_senha'; 
 import Area_motorista from './pages/motorista/area_motorista';

 import ListBancoMotorista from './pages/motorista/banco/list';
 import ListaServicoMotorista from './pages/servicos_motorista/listar_servicos';


 import Area_motorista_auxiliar from './pages/motorista_auxiliar/area_motorista_auxiliar';
 import Motorista_aux_cadastro_incluir from './pages/motorista_auxiliar/incluir/motorista';
 import Motorista_aux_endereco_incluir from './pages/motorista_auxiliar/incluir/endereco_motorista'; 
 import Motorista_aux_documento_incluir from './pages/motorista_auxiliar/incluir/documentos';
 import Motorista_aux_foto_incluir from './pages/motorista_auxiliar/incluir/foto';
 import Motorista_aux_senha_incluir from './pages/motorista_auxiliar/incluir/senha_motorista';

 //import Area_motorista_preferido from './pages/motorista_preferido/area_motorista_preferido';
 import lista_motorista_preferido from './pages/motorista_preferido/list';

 //import Motorista_aux_cadastro_incluir from './pages/motorista_auxiliar/incluir/motorista';
 //import Motorista_aux_endereco_incluir from './pages/motorista_auxiliar/incluir/endereco_motorista'; 
 //import Motorista_aux_documento_incluir from './pages/motorista_auxiliar/incluir/documentos';
 //import Motorista_aux_foto_incluir from './pages/motorista_auxiliar/incluir/foto';
 //import Motorista_aux_senha_incluir from './pages/motorista_auxiliar/incluir/senha_motorista';


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

 import Lista_Motorista_auxiliar from './pages/motorista_auxiliar/list';

 /* Funcionalidades */
 import Funcionalidades_list from './pages/funcionalidades/list';
 import Funcionalidades_cadastrar from './pages/funcionalidades/funcionalidade';

/*ADMINISTRADOR */
import Area_administrador from './pages/administrador/area_administrador';
//import Cartao_creedito_cadastrar from './pages/cartao/cartao_credito';
import Lista_cad_Incompleto from './pages/administrador/lista_cad_incompleto';
import motivo_cancelamento_form from './pages/motivos_cancelamento/motivo_cancelamento';

//import Area_administrador_auxiliar from './pages/administrador_auxiliar/area_adm_convidaod';
import List_administrador_auxiliar from './pages/administrador_auxiliar/lista_adm_auxiliar';

/* MATRIZ */
import Matriz_tarifaria_editar from './pages/matriz_tarifaria/edit';
import Matriz_tarifaria_criar from './pages/matriz_tarifaria/form';
import Matriz_tarifaria_listar from './pages/matriz_tarifaria/list';

/* FAIXA TARIFARIA */
import Faixa_tarifaria_listar from './pages/faixa_tarifarias/list';
import Faixa_tarifaria_criar from './pages/faixa_tarifarias/form';
import Faixa_tarifaria_editar from './pages/faixa_tarifarias/edit';

import Tipo_Transporte_create from './pages/tipo_veiculo/tipo_veiculo';

import Cartao_credito from './pages/cartao_credito/list';

import Configuracao from './pages/configuracao/list';

import Auxiliares from './pages/auxiliares/list';

import Esqueceu_Senha from './pages/esqueceu_senha';
/* MAPS */

/* EMAIL */ 


/* <Route path="/area_administrador_auxiliar" component={Area_administrador_auxiliar} />
            <Route path="/List_administrador_auxiliar" component={List_administrador_auxiliar} />
*/
//import Sobre from './pages/maps4';
 import Menu_bootstrap from './pages/teste_menu';
 import Sobre from './pages/sobre';
 import Login from './pages/login'; 
 import Rodape from './pages/rodape';
import Servicos from './pages/servico';
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

/* 
  <Route path="/area_adm_convidado" component={Area_administrador_Auxiliar} />    
            <Route path="/lista_adm_convidado" component={Lista_administrador_Auxiliar} />        
            */

//Convertendo arquivo em binário
function base64_encode(fileName){
  var bitmap = fs.readFileSync('tmp/uploads/'+fileName+'');
  return new Buffer (bitmap).toString('base64');
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      )
    }
  />
);
  
export default function Routes() {
    return (
        <BrowserRouter>
        <Switch>
         <div className="App">    
                  
            <Route exact path="/" exact component={Inicio} />
          
            <Route exact path="/login" component={Login} />
            <Route exact path="/sobre" component={Sobre} />
            <Route exact path="/servicos" component={Servicos} />

            <PrivateRoute exact path="/configuracao" component={Configuracao} />

            <PrivateRoute exact path="/auxiliares" component={Auxiliares} />

            <PrivateRoute exact path="/lita_motiva_cancelamento" component={Listar_motivo_cancelamento} />
            <PrivateRoute exact path="/motivo_cancelamento" component={motivo_cancelamento_form} />

            <PrivateRoute exact path="/lista_servico_motorista/:id" component={ListaServicoMotorista} />  

            <PrivateRoute exact path="/lista_mensagens_site" component={Listar_mensagens_site} />  
                        
            <PrivateRoute exact path="/area_cliente_individual" component={Area_cliente_individual} />
            <PrivateRoute exact path="/area_cliente_empresarial" component={Area_cliente_empresarial} />
            <PrivateRoute exact path="/area_motorista" component={Area_motorista} />
            <PrivateRoute exact path="/area_motorista_auxiliar" component={Area_motorista_auxiliar} />
            <PrivateRoute exact path="/area_administrador" component={Area_administrador} />
         
            <Route exact path="/contato" component={Contato} />

            <PrivateRoute exact path="/lista_motorista_auxiliar" component={Lista_Motorista_auxiliar} />    
            <PrivateRoute exact path="/lista_adm_auxiliar" component={List_administrador_auxiliar} />                               
            
            <PrivateRoute exact path="/listar" component={ListMotorista} />                   

            <PrivateRoute exact path="/lista_individual" component={Lista_Individual} />     
            <PrivateRoute exact path="/lista_empresarial" component={Lista_Empresarial} />               

             <PrivateRoute exact path="/alterar_senha_motorista" component={Alterar_senha_Motorista} />                            

             <PrivateRoute exact path="/criar_eventos/:id" component={Eventos_novo_cadastro} />              
            
             <PrivateRoute exact path="/lista_evento_servico/:id" component={Listar_evento_servico} />                                         

             <PrivateRoute exact path="/matriz_criar" component={Matriz_tarifaria_criar} />
             <PrivateRoute exact path="/matriz_listar" component={Matriz_tarifaria_listar} />
             <PrivateRoute exact path="/matriz_editar/:id" component={Matriz_tarifaria_editar} />            

             <PrivateRoute exact path="/faixa_listar/:id" component={Faixa_tarifaria_listar} />
             <PrivateRoute exact path="/faixa_editar/:id" component={Faixa_tarifaria_editar} />
             <PrivateRoute exact path="/faixa_criar" component={Faixa_tarifaria_criar} />          

             <PrivateRoute exact path="/empresa_incluir/:id" component={Representante_incluir} />
             <PrivateRoute exact path="/empresa_dados_incluir/:id" component={Empresa_dados_incluir} />
             <PrivateRoute exact path="/empresa_senha_incluir/:id" component={Empresa_senha_incluir} />     

             <PrivateRoute exact path="/empresa_alterar/:id" component={Representante_alterar} />
             <PrivateRoute exact path="/empresa_dados_alterar/:id" component={Empresa_dados_alterar} />
             <PrivateRoute exact path="/empresa_senha_alterar/:id" component={Empresa_senha_alterar} />     

             <Route exact path="/tipo" component={Tipo_cliente} />             
             <PrivateRoute exact path="/empresa_endereco/:id" component={Empresa_endereco} />                          
             <PrivateRoute exact path="/incluir_operador/:id" component={incluir_Operador} />     
                     
             <PrivateRoute exact path="/lista_operador_email/:id" component={Operador_email_lista} /> 

             <PrivateRoute exact path="/funcionalidade/list" component={Funcionalidades_list} />          
             <PrivateRoute exact path="/funcionalidade/cadastrar" component={Funcionalidades_cadastrar} />          
             
             <PrivateRoute exact path="/lista_evento/list" component={Listar_evento_cliente} />           
             <PrivateRoute exact path="/cartao_credito/list" component={Cartao_credito} />                             
             
             <PrivateRoute exact path="/cliente_incluir/:id" component={Cliente_incluir} />             
             <PrivateRoute exact path="/cliente_alterar/:id" component={Cliente_alterar} />             
             <PrivateRoute exact path="/cliente_senha_incluir/:id" component={cliente_senha_incluir} />             
             <PrivateRoute exact path="/cliente_senha_alterar/:id" component={cliente_senha_alterar} />             

             <PrivateRoute exact path="/cliente_endereco/:id" component={cliente_endereco} />                     

             <PrivateRoute exact path="/motorista_lista_banco/list" component={ListBancoMotorista} />

             <PrivateRoute exact path="/motorista_aux_incluir_convite/:email" component={Motorista_aux_cadastro_incluir} />
             <PrivateRoute exact path="/endereco_aux_motorista_incluir/:id" component={Motorista_aux_endereco_incluir} />
             <PrivateRoute exact path="/documentos_aux_motorista_incluir/:id" component={Motorista_aux_documento_incluir} />
             <PrivateRoute exact path="/foto_motorista_auxiliar_incluir/:id" component={Motorista_aux_foto_incluir} />     
             <PrivateRoute exact path="/senha_motorista_aux_incluir/:id" component={Motorista_aux_senha_incluir} />  

             <PrivateRoute exact path="/motorista_incluir_convite/:email" component={Motorista_cadastro_incluir} />
             <Route exact path="/motorista_incluir/:id" component={Motorista_cadastro_incluir} />             
             <PrivateRoute exact path="/veiculo_motorista_incluir/:id" component={Motorista_veiculo_incluir} />      
             <PrivateRoute exact path="/senha_motorista_incluir/:id" component={Motorista_senha_incluir} />      
             <PrivateRoute exact path="/documentos_motorista_incluir/:id" component={Motorista_documento_incluir} />
             <PrivateRoute exact path="/foto_motorista_incluir/:id" component={Motorista_foto_incluir} />              
             <PrivateRoute exact path="/endereco_motorista_incluir/:id" component={Motorista_endereco_incluir} />   

             <PrivateRoute exact path="/motorista_alterar/:id" component={Motorista_cadastro_alterar} />             
             <PrivateRoute exact path="/veiculo_motorista_alterar/:id" component={Motorista_veiculo_alterar} />      
             <PrivateRoute exact path="/senha_motorista_alterar/:id" component={Motorista_senha_alterar} />      
             <PrivateRoute exact path="/foto_motorista_alterar/:id" component={Motorista_foto_alterar} />                   
             <PrivateRoute exact path="/endereco_motorista_alterar/:id" component={Motorista_endereco_alterar} />   
               
             <PrivateRoute exact path="/veiculo_alterar_motorista/:id" component={Motorista_alterar_veiculo} />                   
             <PrivateRoute exact path="/documentos_motorista_alterar/:id" component={Motorista_doc_alterar} />
             
             <PrivateRoute exact path="/listar_tipo_veiculo" component={Listar_Tipo_veiculo} />  

             <PrivateRoute exact path="/lista_motorista_preferido" component={lista_motorista_preferido} />   

             <PrivateRoute exact path="/lista_veiculos/:id" component={lista_Veiculos_motorista} />
             <PrivateRoute exact path="/incluir_veiculos/:id" component={incluir_Veiculos} />                   
             <PrivateRoute exact path="/incluir_documentos/:id" component={incluir_documentos} />
             <PrivateRoute exact path="/alterar_veiculos/:id" component={alterar_Veiculos} />                   
             <PrivateRoute exact path="/alterar_documentos/:id" component={alterar_documentos} />
          
             <PrivateRoute exact path="/operadores_incluir/:id/:email" component={Operador_cadastro_incluir} />
             <PrivateRoute exact path="/senha_operador_incluir/:id" component={Operador_senha_incluir} />         

             <PrivateRoute exact path="/operadores_alterar/:id" component={Operador_cadastro_alterar} />
             <PrivateRoute exact path="/senha_operador_alterar/:id" component={Operador_senha_alterar} />         

             <PrivateRoute exact path="/operador_lista" component={Operador_lista} />                 
             <PrivateRoute exact path="/operador_lista_empresa/:id" component={Operador_lista_empresa} />

             <PrivateRoute exact path="/tipo_transporte" component={Tipo_Transporte_create} />
             
             <PrivateRoute exact path="/area_operador" component={Area_operador} />

             <Route exact path="/esqueceu_senha" component={Esqueceu_Senha} />  

             <PrivateRoute exact path="/lista_cad_incompleto/:id" component={Lista_cad_Incompleto} />  
             
         </div>
        </Switch>
        </BrowserRouter>
    )
 }