import React  from 'react';
import Box from '@material-ui/core/Box';
import {Form, Progress, Input, FormFeedback, Label,  Select, Button, Alert } from 'reactstrap';
import {Link} from 'react-router-dom';
import { celularMask } from '../formatacao/celularmask';
import { cpfMask } from '../formatacao/cpfmask';
import api from '../../services/api';
import './motivo_cancelamento.css';
import Menu_administrador from '../administrador/menu_administrador';

var dateFormat = require('dateformat');
const { cpf } = require('cpf-cnpj-validator');
const andamento_cadastro = localStorage.getItem('logprogress'); 

class empresarialComponent extends React.Component{  

  constructor(props){
    super(props);  
    this.textInput = React.createRef();
    this.state = { 
      campId: 0,     
      campDescricao: "",   
      mensagem_descricao: '',
      incluir: true, 
      inicio: 1,
      progresso: 0,      
      validate: {
        descricaoState: ''
      }    
    }
    this.descricaochange = this.descricaochange.bind(this);  
    this.verificaDescricao = this.verificaDescricao.bind(this);       
    this.descricaofocus = this.descricaofocus.bind(this); 
    this.verifica_nome_individual = this.verifica_nome_individual.bind(this);  
    this.validateDescricaoChange = this.validateDescricaoChange.bind(this);  
    

  }

  componentDidMount(){ 
   
    let userId = this.props.match.params.id;    
    
    localStorage.setItem('logid', userId);
   
    if (localStorage.getItem('logid') == 0) { // esta vindo do create       
      localStorage.setItem('logrepresentante', 0);
      localStorage.setItem('logsenha', '');
      localStorage.setItem('logcepbanco', '');
      this.setState({              
        campStatusId: 6,
         progresso: 0      
      }); 
   } else {  // esta vindo do administrador ou cliente empresarial
      this.setState({              
        progresso: 0
      });    
   } 

    
    
  }

  verifica_nome_individual(nome){
    let nome_titulo = nome.substring(0,nome.indexOf(" ")) 
    if (nome_titulo == "") {
      nome_titulo = nome
    }
    return(    
          nome_titulo          
       );  
  } 

 
  descricaochange(e) {
    this.setState({ campDescricao: e.target.value })
  }

  verificaDescricao(e) {
    const { validate } = this.state
    if (e.target.value.length == 0) {
      validate.cpfState = ''
      this.setState({ 
        validate,               
        mensagem_cpf: ''  
       })            
    } 
  }

  descricaofocus(e) {
    const { validate } = this.state
    if (e.target.value.length == 0) {
      validate.cpfState = ''
      this.setState({ 
        validate,               
        mensagem_cpf: ''  
       })            
    }  
  } 

  validateDescricaoChange(e){
    const { validate } = this.state
     
      if (e.target.value.length > 0) {
          validate.descricaoState = 'has-success'       
          this.setState({ mensagem_descricao: '' })  

          this.setState({ 
            inicio: 2,
            progresso: 100
          });                               
      }  
      this.setState({ validate })
      this.verifica_botao(this.state.inicio)
  }

verifica_botao(inicio) {
  const { validate } = this.state    
  console.log('perfil verifica_botao -'+localStorage.getItem('logperfil'))
  
  if (localStorage.getItem('logperfil') == 1) {
    if (inicio == 1) {
      return (

        <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_transporte" p={2}>
          <div className="d-flex justify-content-center">
            <label> Incluir </label>
          </div>     
       </Box>                
      );   
    } else {
      if (validate.descricaoState == 'has-success') {
          return (           
            <Box bgcolor="error.main" color="error.contrastText" className="botao_cadastro_transporte_habilitado"  p={2} onClick={()=>this.sendSave()}>
            <div className="d-flex justify-content-center">
                  <label> Incluir </label>
            </div>     
            </Box>           
          );
        } else {
          return (

            <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_transporte" p={2}>
                  <div className="d-flex justify-content-center">
                  <label> Incluir </label>
                  </div>     
            </Box>           
        );   
        }         

      }      
  }  
} 

sendSave(){        

  const datapost = {
      descricao: this.state.campDescricao,
 }           

     if (this.state.incluir) {
       
        api.post('/tipoTransporte/create',datapost)
        .then(response=>{
          if (response.data.success) {           
            const { validate } = this.state             

            validate.descricaoState = ''       
            this.setState({ mensagem_descricao: '' })  
  
            this.setState({ 
              inicio: 1,
              progresso: 0,
              campDescricao: '',
            });        
            
            this.setState({ validate })
            this.verifica_botao(this.state.inicio)
          //console.log('logprogress - '+ this.state.progresso);          
          //localStorage.setItem('lognome', this.state.campNome);            
          
          if (localStorage.getItem('logperfil') == 1) {
             localStorage.setItem('logperfil', 1);
             this.props.history.push('/tipo_transporte');                
          } 
          
  
          }
          else {
            alert("Error 34 ")              
          }
        }).catch(error=>{
          alert("Erro verificar log  ")
        })
    }      
}  

verificar_menu() {   
  //console.log('perfil verificar_menu -'+localStorage.getItem('logperfil'))

  if (localStorage.getItem('logperfil') == 1) {  //ADMINISTRADOR
    return(
      <div>
      <div className="d-flex justify-content-around">
           <div className="botao_navegacao">                            
             </div>                  
             <div>
               <div className="titulo_representante">                
                 <label> Cadastre uma Mensagem </label>            
               </div>
             </div>   
             
             <div>
                <div className="botao_navegacao">                                
                </div>   
             </div>                     
      </div>      
        <br/>    
        <div>        
           <Progress color="warning" value={this.state.progresso} className="progressbar"/>
        </div>      
  </div>           
      );

  } 

}

verificar_menu_lateral() {

  if (localStorage.getItem('logperfil') == 1) {
   return( 
     <Menu_administrador />     
   );
  } 

}

render(){  

return (
<div>   
<div className="container_alterado">  
   {this.verificar_menu_lateral()}  
<div className="d-flex justify-content"> 
    <div className="area_esquerda">     
           {this.verificar_menu()}

            <div class="d-flex flex-column espacamento_caixa_texto">
              <div class="p-2"> 
                  <label for="inputPassword4">Descrição *</label>
                    <Input 
                        disabled={this.state.camp_cpf_disabled}
                        className="input_text_cliente"                        
                        type="text"
                        name="cpf"
                        id="examplcpf"
                        autoComplete='off'
                        autoCorrect='off'
                       //ref={cepInput} 
                        placeholder=""
                        value={this.state.campDescricao}
                        valid={ this.state.validate.descricaoState === 'has-success' }
                        invalid={ this.state.validate.descricaoState === 'has-danger' }
                        onBlur={this.descricaofocus}
                        onKeyUp={this.verificaDescricao}
                        onFocus={this.verificaDescricao}
                        onChange={ (e) => {
                          this.descricaochange(e)                                                 
                          this.validateDescricaoChange(e)
                        }}         
                        maxlength="25"                                                                 
                      />                                
                      <FormFeedback 
                      invalid={this.state.validate.descricaoState}>
                          {this.state.mensagem_descricao}
                      </FormFeedback> 
              </div>              
            </div>              
            {this.verifica_botao(this.state.inicio)}             
         </div>  
      </div>                  
   </div>  
</div> 
  );
} 
}
export default empresarialComponent;