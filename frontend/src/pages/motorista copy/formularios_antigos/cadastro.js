import React  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import {Form, Progress, Input, FormFeedback, Label,  Select, Button, Alert } from 'reactstrap';
import {Link} from 'react-router-dom';
import { telefoneMask } from '../formatacao/telefonemask';
import { cpfMask } from '../formatacao/cpfmask';
import api from '../../services/api';
import './motorista.css';
var dateFormat = require('dateformat');
const { cpf } = require('cpf-cnpj-validator');
const userId = localStorage.getItem('logid');
const andamento_cadastro = localStorage.getItem('logprogress'); 


//import { Area_direita, Area_esquerda, Titulo_logo, Logo, Titulo_representante, Preview } from "./style_empresarial";
class empresarialComponent extends React.Component{  

  constructor(props){
    super(props);  
    this.textInput = React.createRef();
    this.state = { 
      campId: 0,     
      campNome: "",
      campData_nascimento:"",
      campEmail:"",      
      campTelefone1:"",
      campCpf:"",      
      mensagem_nome: '',  
      mensagem_cpf: '',  
      mensagem_email: '',  
      mensagem_telefone1: '',
      mensagem_data_nascimento: '',        
      incluir: false, 
      inicio: 1,
      progresso: 0,      
      validate: {
        nomeState: '',      
        datanascimentoState: '',   
        emailState: '',
        cpfState: '',     
        telefone1State: '',     
      }    
    }
    this.cpfchange = this.cpfchange.bind(this);
    this.telefone1change = this.telefone1change.bind(this);  
    this.emailchange = this.emailchange.bind(this);
    this.nomeChange = this.nomeChange.bind(this);     
    this.data_nascimentochange = this.data_nascimentochange.bind(this);

    this.verificaEmail = this.verificaEmail.bind(this);   
    this.verificaCpf = this.verificaCpf.bind(this);  
    this.verificaTelefone1 = this.verificaTelefone1.bind(this);  
    this.verificaNome = this.verificaNome.bind(this);  
    this.verificaDataNascimento = this.verificaDataNascimento.bind(this);  

    this.validaEmailChange = this.validaEmailChange.bind(this);    
    this.validaCpfChange = this.validaCpfChange.bind(this);  
    this.validatelefone1Change = this.validatelefone1Change.bind(this);  
    this.validaNomeChange = this.validaNomeChange.bind(this);  
    this.validaDataNascimentoChange = this.validaDataNascimentoChange.bind(this);  

    this.verifica_botao = this.verifica_botao.bind(this);  
    this.busca_cpf = this.busca_cpf.bind(this);  
    this.busca_cliente = this.busca_cliente.bind(this);      
  }

  componentDidMount(){ 
   // localStorage.clear();
    console.log('log id  - '+localStorage.getItem('logid'))
    this.textInput.current.focus();
    //this.cepInput.current.focus();
    if (localStorage.getItem('logid') !== null) { 
      //console.log(' busca cliente ')
      this.setState({      
        progresso: 25 
      });                 
      // buscar representante 
      this.busca_cliente()      
    } else {      
        //console.log('LIMPAR OS ITENS ')
        localStorage.removeItem('logemail');
        localStorage.removeItem('lognome');       
        localStorage.removeItem('logid');  
        localStorage.removeItem('logperfil');  
        localStorage.removeItem('logprogress');
        localStorage.removeItem('logcep');       
        localStorage.removeItem('lograzao_social');  
        localStorage.removeItem('lograzaosocial');        
    }
    
  }

  busca_cliente() {
    const { validate } = this.state
    console.log('busca cliente metodo e ID '+localStorage.getItem('logid')); 
    api.get(`/cliente/get/${localStorage.getItem('logid')}`)
    .then(res=>{
        console.log(JSON.stringify(res.data, null, "    ")); 
        if (res.data.data.length > 0) {
           
          this.setState({ 
            campCpf: res.data.data[0].cpf,
            campNome: res.data.data[0].nome,
            campData_nascimento: res.data.data[0].data_nascimento,
            campEmail: res.data.data[0].email,      
            campTelefone1: res.data.data[0].telefone1,
            inicio: 2
          })                           
          
          if (this.state.campCpf !== "") {
            validate.cpfState = 'has-success'      
          }
          if (this.state.campNome !== "") {
            validate.nomeState = 'has-success'      
          }
          if (this.state.campData_nascimento !== "") {
            validate.datanascimentoState = 'has-success'      
          }
          if (this.state.campEmail !== "") {
            validate.emailState = 'has-success'      
          }   
          if (this.state.campTelefone1 !== "") {
            validate.telefone1State = 'has-success'      
          }   
         
  
          this.setState({ validate })
        } 
      })        
      .catch(error=>{
        alert("Error de conexão cliente "+error)
      })       
  
  }
  busca_cpf(e){
   const { validate } = this.state
  api.get(`/cliente/getClienteCpf/${e.target.value}`)
  .then(res=>{
      console.log(JSON.stringify(res.data, null, "    ")); 
      if (res.data.data.length > 0) {
         
         validate.cpfState = 'has-danger'
         this.setState({ 
            mensagem_cpf: 'Representante já cadastrado'  
         });

        this.setState({ validate })
      } else {
          validate.cpfState = 'has-success'
          this.setState({ 
            mensagem_cpf: ''  
          });

          this.state.incluir= true 
      }  
    })        
    .catch(error=>{
      alert("Error de conexão  "+error)
    })   
  }
  cpfchange(e) {
    this.setState({ campCpf: cpfMask(e.target.value) })
  }
  telefone1change(e) {
    this.setState({ campTelefone1: telefoneMask(e.target.value) })
  }
  emailchange(e) {
    this.setState({ campEmail: e.target.value })
  }
  nomeChange(event) {     
    this.setState({        
        campNome: event.target.value
    });    
  } 
  data_nascimentochange(e) {
    this.setState({ campData_nascimento: e.target.value })
  }

  verificaCpf(e) {
    const { validate } = this.state
       if (e.target.value.length == 0) {
        validate.cpfState = 'has-danger'
        validate.datanascimentoState = ''
        validate.emailState = ''
        validate.nomeState = ''
        validate.telefone1State = ''
        this.setState({ 
          validate,       
          campNome: '',
          campData_nascimento: '',
          campEmail: '',
          campTelefone1: '',
          inicio: 1,
          mensagem_cpf: 'O campo CPF é obrigatório'  
         })            
       } else if (e.target.value.length == 14) {
        if (cpf.isValid(e.target.value)) {
          //cpf válido 
          console.log('é valido - '+e.target.value);
          this.busca_cpf(e);// se existir não deixa cadastrar

        } else {
        validate.cpfState = 'has-danger'       
        this.setState({ mensagem_cpf: 'O campo CPF é inválido' })     
        } 
       }  
   }
  
  verificaTelefone1(e) {
    console.log('Keypress - '+this.state.campTelefone1)
    console.log('Keypress length - '+this.state.campTelefone1.length)
    console.log('Keypress length - '+e.target.value.length)
    const { validate } = this.state
       if (e.target.value.length < 14) {          
        validate.telefone1State = 'has-danger'
        this.setState({ 
          validate,
          inicio: 1,
          mensagem_telefone1: 'O campo Telefone é obrigatório.'
         })      
       } else {       

        if (e.target.value.length == 14) {
            validate.telefone1State = 'has-success' ;                
            this.setState({ 
              mensagem_telefone1: ''
          });           
        }

       }        
   }
  verificaEmail(e){   
    const { validate } = this.state
    if (this.state.campEmail.length > 0) {

     if (this.state.incluir== true) { 
          api.get(`/login/getMotoristaEmail/${this.state.campEmail}`)
          .then(res=>{          
        
            if (res.data.data.length > 0) {
                validate.emailState = 'has-danger'
                  this.setState({ 
                    validate,
                    mensagem_email: 'Email já cadastrado.'  
              })      
      
            } else {
              api.get(`/login/getClienteEmail/${this.state.campEmail}`)
              .then(res=>{                   
                if (res.data.success == true) {  
        
                  if (res.data.data.length > 0) { 
        
                      validate.emailState = 'has-danger'
                        this.setState({ 
                          validate,
                          mensagem_email: 'Email já cadastrado.'  
                        })                  
      
                      //  console.log(' resultado - '+JSON.stringify(this.state, null, "    "));              
                  } 
                }  else {
                  validate.emailState = 'has-success' ;        
                }
              })        
              .catch(error=>{
                alert("Error de conexão  "+error)
              })     
            }      
          })        
          .catch(error=>{
            alert("Erro de conexão"+error)
          })        
      } else {
        validate.emailState = 'has-success' ;        
        
        this.setState({ 
          validate,
          mensagem_email: ''  
        })   
      }
     
    } else {
      validate.emailState = 'has-danger'
      this.setState({ 
        validate,
        mensagem_email: 'O campo E-mail é obrigatório'  
      }) 
  
    }   
  } 
  verificaNome() {
    const { validate } = this.state
       if (this.state.campNome.length == 0) {
        validate.nomeState = 'has-danger'
        this.setState({ 
          validate,
          mensagem_nome: 'O campo nome é obrigatório.'  
         })      
       } else {
        validate.nomeState = 'has-success' ;        

        this.setState({ 
          mensagem_nome: '',  
          progresso: 5 
       });  

       }         
   }
  verificaDataNascimento() {
    const { validate } = this.state
       if (this.state.campData_nascimento.length == 0) {
        validate.datanascimentoState = 'has-danger'
        this.setState({ 
          validate,
          mensagem_data_nascimento: 'O campo Data de Nascimento é obrigatório.'  
         })      
       } else {

          validate.datanascimentoState = 'has-success' ;        
          this.setState({ 
            mensagem_data_nascimento: '',  
            progresso: 5 
          });     

       }        
   }

  validaEmailChange = async (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    await this.setState({
    [ name ]: value,
    });
    }
    
    
    validateEmail(e) {
      const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const { validate } = this.state
        if (emailRex.test(e.target.value)) {
          validate.emailState = 'has-success'           
        } else {
          validate.emailState = 'has-danger'
          this.setState({ mensagem_email: 'Email inválido' })  
        }
        this.setState({ validate })
        this.setState({ mensagem_email: '' })  

    }   
    
    
    validaCpfChange(e){
      const { validate } = this.state
      
        if (e.target.value.length == 0) {
          validate.cpfState = 'has-danger'
          this.setState({ mensagem_cpf: 'O campo CPF é obrigatório' })  
        } else if (e.target.value.length == 14) {          
          //valida o cpf 
           console.log('e.target.value - '+e.target.value);
           if (cpf.isValid(e.target.value)) {
               //cpf válido 
               console.log('é valido - '+e.target.value);
               this.busca_cpf(e);// se existir não deixa cadastrar

           } else {
            validate.cpfState = 'has-danger'       
            this.setState({ mensagem_cpf: 'O campo CPF é inválido' })     
           } 
        //  this.busca_cpf(e) 
        //  validate.cpfState = 'has-success'       
        //  this.setState({ mensagem_cpf: '' })  
        }  
        this.setState({ validate })
    }
    
    validatelefone1Change(e){
      const { validate } = this.state
       
        if (e.target.value.length == 0) {
          validate.telefone1State = 'has-danger'
          this.setState({ mensagem_telefone1: 'O campo Telefone é obrigatório.' })  
        } else {          
          
          if (e.target.value.length == 14) {
            validate.telefone1State = 'has-success'       
            this.setState({ mensagem_telefone1: '' })  

            this.setState({ 
              inicio: 2,
              progresso: 25
            });             
          }          
        }  
        this.setState({ validate })
        this.verifica_botao(this.state.inicio)
    }
    
validaNomeChange(e){
  const { validate } = this.state
  
    if (e.target.value.length < 10) {
      validate.nomeState = 'has-danger'
      this.setState({ mensagem_nome: 'O campo Nome é obrigatório.' })  
    } else if (e.target.value.length > 10) {      
      validate.nomeState = 'has-success'       
      this.setState({ mensagem_nome: '' })  
    }  
    this.setState({ validate })  
}
validaDataNascimentoChange(e){
  const { validate } = this.state
  
    if (e.target.value.length < 10) {
      validate.datanascimentoState = 'has-danger'
      this.setState({ mensagem_data_nascimento: 'O campo Data de Nascimento é obrigatório.' })  
    } else {    
      
      if (e.target.value.length == 13) {
        
        //var data_nascimento = new Date(e.target.value).toString;  
        //console.log('e.target.value.length - '+e.target.value.length);
        if (dateFormat(e.target.value) ) {
          validate.datanascimentoState = 'has-success' ;        
          this.setState({ 
            mensagem_data_nascimento: '',  
            progresso: 5 
          });  

        } else {
         // console.log('DATA NASCIMENTO - '+this.state.campData_nascimento)
          validate.datanascimentoState = 'has-danger'
          this.setState({ 
            validate,
            mensagem_data_nascimento: 'Formato inválido'  
          })      
        }    
      } else if (e.target.value.length > 10) {
        validate.datanascimentoState = 'has-danger'
          this.setState({ 
            validate,
            mensagem_data_nascimento: 'Formato inválido'  
          })      
      }
      
    }  
    this.setState({ validate })
}

verifica_botao(inicio) {
  const { validate } = this.state 
    
  if (inicio == 1) {
    return (

        <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_empresa" p={2}>
              <div className="d-flex justify-content-center">
                 <label> Próximo </label>
               </div>     
        </Box>           
     );   
  } else {
  
    if (validate.cpfState == 'has-success' && validate.datanascimentoState == 'has-success'  
      && validate.emailState == 'has-success' && validate.nomeState == 'has-success' 
      && validate.telefone1State == 'has-success') {
         return (
          <Box bgcolor="error.main" color="error.contrastText" className="botao_cadastro_empresa_habilitado"  p={2} onClick={()=>this.sendSave()}>
          <div className="d-flex justify-content-center">
              <label> Próximo </label>
           </div>     
          </Box>           
         );
      } else {
        return (

          <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_empresa" p={2}>
                <div className="d-flex justify-content-center">
                   <label> Próximo </label>
                 </div>     
          </Box>           
       );   
      }         
   }
} 

sendSave(){        
 
  const datapost = {
    nome: this.state.campNome,              
    email: this.state.campEmail,
    telefone1: this.state.campTelefone1,    
    data_nascimento: this.state.campData_nascimento,    
    cpf: this.state.campCpf,    
    perfilId: 2,
    situacaoId: 1
  }          

    if (this.state.incluir) {
       // console.log('incluir - '+JSON.stringify(datapost, null, "    ")); 
        api.post('/cliente/create',datapost)
        .then(response=>{
          if (response.data.success==true) {                        

          //console.log('logprogress - '+ this.state.progresso);  
          localStorage.setItem('logprogress', 25);  
          localStorage.setItem('lognome', this.state.campNome);  
          localStorage.setItem('logid', response.data.data.id);
            
          this.props.history.push('/endereco_motorista');            
  
          }
          else {
            alert("Error 34 ")              
          }
        }).catch(error=>{
          alert("Erro verificar log  ")
        })
    } else {
      console.log('Alterar - '+JSON.stringify(datapost, null, "    ")); 
      api.put(`/cliente/update/${localStorage.getItem('logid')}`, datapost)
      .then(response=>{
        if (response.data.success==true) {                        
          
          //localStorage.setItem('logid', userId);

          this.props.history.push('/cliente_endereco');            

        }
        else {
          alert("Error 34 ")              
        }
      }).catch(error=>{
        alert("Error 34 ")
      })

    }      
}  

render(){  

return (
<div>    
<div className="d-flex justify-content">
  <div className="d-flex justify-content-start"> 
      <div className="area_direita">   
          <div>   
            <img className="titulo_logo" src="logo.png"/>
         </div>      
      </div>    
   </div>
    <div className="area_esquerda">     
          <div className="d-flex justify-content-around">
               <div className="botao_navegacao">
                 <Link to='/'> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
               </div>                  
               <div>
                 <div className="titulo_representante">                
                   <label>  Olá, Fale um pouco sobre você!</label>            
                 </div>
               </div>   
               
               <div>
                  <div className="botao_navegacao">
                      <Link to='/'><img className="botao_close espacamento_seta" src="close_black.png"/> </Link>                        
                  </div>   
               </div>   
          </div>      
         <div>        
            <Progress color="warning" value={this.state.progresso} className="progressbar"/>
         </div>
            <div class="d-flex flex-column espacamento_caixa_texto">
              <div class="p-2"> 
                  <label for="inputPassword4">CPF *</label>
                    <Input 
                        className="input_text"                        
                        type="text"
                        name="cpf"
                        id="examplcpf"
//ref={cepInput} 
                        placeholder=""
                        value={this.state.campCpf}
                        valid={ this.state.validate.cpfState === 'has-success' }
                        invalid={ this.state.validate.cpfState === 'has-danger' }
                        onBlur={this.verificaCpf}
                        onKeyUp={this.verificaCpf}
                       // onFocus={this.verificaCpf}
                        onChange={ (e) => {
                          this.cpfchange(e)                       
                          this.validaCpfChange(e)
                        }}         
                        maxlength="14"                                                                 
                      />                                
                      <FormFeedback 
                      invalid={this.state.validate.cpfState}>
                          {this.state.mensagem_cpf}
                      </FormFeedback> 
              </div>
              <div class="p-2"> 
                  <label for="inputEmail4">Nome *</label>
                  <Input      
                      className="input_text"                  
                      type="text"
                      name="nome"
                      id="examplnome"
                      placeholder=""
                      value={this.state.campNome}
                      valid={ this.state.validate.nomeState === 'has-success' }
                      invalid={ this.state.validate.nomeState === 'has-danger' }
                      onBlur={this.verificaNome}
                      onChange={ (e) => {
                        this.nomeChange(e)                       
                        this.validaNomeChange(e)
                      }}    
                      maxlength="120"                                                                      
                    />                                
                    <FormFeedback 
                    invalid={this.state.validate.nomeState}>
                        {this.state.mensagem_nome}
                    </FormFeedback> 
              </div> 
              <div class="p-2">                                
                  <Label for="exampleDatetime">Data de nascimento *</Label>
                  <Input                                    
                    className="input_text_date"                  
                    type="date"
                    name="senha2"
                    id="exampleEmail2"                    
                    placeholder=""
                    value={this.state.campData_nascimento}
                    valid={ this.state.validate.datanascimentoState === 'has-success' }
                    invalid={ this.state.validate.datanascimentoState === 'has-danger' }
                    onBlur={this.verificaDataNascimento}
                    onChange={ (e) => {
                      this.data_nascimentochange(e)                       
                      this.validaDataNascimentoChange(e)
                    }}  
                    maxlength="10"               
                  />                                
                  <FormFeedback 
                  invalid={this.state.validate.datanascimentoState}>
                       {this.state.mensagem_data_nascimento}
                  </FormFeedback>  
              </div>
              <div class="p-2">
                      <label for="email1">Email *</label>
                      <Input         
                        className="input_text"
                        type="email"
                        ref={this.textInput} 
                        placeholder=""
                        value={this.state.campEmail}
                        valid={ this.state.validate.emailState === 'has-success' }
                        invalid={ this.state.validate.emailState === 'has-danger' }
                        onBlur={this.verificaEmail}
                        onKeyPress={this.verificaEmail}
                        onChange={ (e) => {
                                    this.emailchange(e) 
                                    this.validateEmail(e)
                                    this.validaEmailChange(e)                                
                                  } }
                        maxlength="80"          
                      />                  
                      <FormFeedback 
                      invalid={this.state.validate.emailState}>
                          {this.state.mensagem_email}
                      </FormFeedback> 
              </div>
              <div class="p-2">
                      <label for="inputEmail4">Telefone *</label>                     
                      <Input                        
                        className="input_text"
                        type="text"
                        name="senha2"
                        id="exampleEmail2"
                        placeholder=""
                        value={this.state.campTelefone1}
                        valid={ this.state.validate.telefone1State === 'has-success' }
                        invalid={ this.state.validate.telefone1State === 'has-danger' }
                        onBlur={this.verificaTelefone1}
                        onKeyUp={this.verificaTelefone1}
                        onChange={ (e) => {
                          this.telefone1change(e)                       
                          this.validatelefone1Change(e)
                        }}                
                        maxlength="16"                                                          
                      />                                
                      <FormFeedback 
                      invalid={this.state.validate.telefone1State}>
                          {this.state.mensagem_telefone1}
                      </FormFeedback>
               </div>
            </div>              
            {this.verifica_botao(this.state.inicio)}             
         </div>                 
   </div>  
</div> 
  );
} 
}
export default empresarialComponent;