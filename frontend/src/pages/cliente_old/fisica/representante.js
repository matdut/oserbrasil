import React  from 'react';
import Box from '@material-ui/core/Box';
import {Form, Progress, Input, FormFeedback, Label,  Select, Button, Alert } from 'reactstrap';
import {Link} from 'react-router-dom';
import { celularMask } from '../../formatacao/celularmask';
import { cpfMask } from '../../formatacao/cpfmask';
import api from '../../../services/api';
import './individual.css';
var dateFormat = require('dateformat');
const { cpf } = require('cpf-cnpj-validator');
const andamento_cadastro = localStorage.getItem('logprogress'); 
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
      camp_cpf_disabled: false,
      camp_nome_disabled: false,
      campStatusId:'',
      campCnpj:"",
      endereco:"",     
      perfillog:'',       
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
    this.verificar_menu = this.verificar_menu.bind(this);      
  }

  componentDidMount(){ 
   
    let userId = this.props.match.params.id;    
    
    localStorage.setItem('logid', userId);
    const perfillog = localStorage.getItem('loperfil');

    if (perfillog == 2) {
      this.setState({      
        camp_cpf_disabled: true,
        camp_nome_disabled: true,
      });   
    }
    
    console.log('userID - '+userId)
    console.log('logid - '+localStorage.getItem('logid'))
    console.log('Perfil log - '+localStorage.getItem('logperfil'))    

    if (perfillog !== null) {       
      this.busca_cliente()      
      this.setState({                     
        progresso: 0,
        progresso: 25
      }); 
    } else if (perfillog == null){
      this.setState({              
        campStatusId: 6,
        progresso: 0      
      }); 
    }  
    
  }

  busca_cliente() {
    const { validate } = this.state
    console.log('busca cliente metodo e ID '+localStorage.getItem('logid'));
    console.log('busca perfil state - '+localStorage.getItem('logperfil'));  
    api.get(`/cliente/get/${localStorage.getItem('logid')}`)
    .then(res=>{
        console.log(JSON.stringify(res.data, null, "    ")); 
        if (res.data.success) {
           
          this.setState({ 
            campCpf: res.data.data[0].cpf,
            campNome: res.data.data[0].nome,
            campData_nascimento: res.data.data[0].data_nascimento,
            campEmail: res.data.data[0].email,      
            campTelefone1: res.data.data[0].celular,
            campCnpj: res.data.data[0].cnpj,   
            campStatusId: res.data.data[0].statusId,
            inicio: 2
          })                           

          if (this.state.campCnpj == ''){
            this.setState({ 
              campCpf: null 
            })  
          }  

         if (localStorage.getItem('logperfil') == 2) { 
            if (this.state.campCnpj == null) {
              this.setState({ 
                endereco: "/area_cliente_individual" 
              });  
            } else {
              this.setState({ 
                endereco: "/area_cliente_empresarial" 
              });  
            }    
          }   
          
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
      if (res.data.success) {
         
         validate.cpfState = 'has-danger'
         this.setState({ 
            mensagem_cpf: 'Representante já cadastrado'  
         });
         this.state.incluir= false

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
    this.setState({ campTelefone1: celularMask(e.target.value) })
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
       if (e.target.value.length < 15) {          
        validate.telefone1State = 'has-danger'
        this.setState({ 
          validate,
          inicio: 1,
          mensagem_telefone1: 'O campo Telefone é obrigatório.'
         })      
       } else {       

        if (e.target.value.length == 15) {
            validate.telefone1State = 'has-success' ;                
            this.setState({ 
              mensagem_telefone1: ''
          });           
        }

       }        
   }

  verificaEmail(e){   
    const { validate } = this.state
    console.log(' valida email state - '+validate.emailState); 
    if (validate.emailState == 'has-success') {
      console.log(' valida email 1 - '+e.target.value);   
      console.log(' valida email - '+this.state.campEmail);   
           
                api.get(`/login/getMotoristaEmail/${this.state.campEmail}`)
                .then(res=>{          
                  console.log(' resultado motorista - '+JSON.stringify(res.data, null, "    "));        
                  if (res.data.success) {

                          validate.emailState = 'has-danger'
                            this.setState({ 
                              validate,
                              mensagem_email: 'Email já cadastrado.'  
                          })                          
            
                  } else {
                    api.get(`/login/getClienteEmail/${this.state.campEmail}`)
                    .then(res=>{                   
                      console.log(' resultado cliente - '+JSON.stringify(res.data, null, "    "));        
                      if (res.data.success) {                
                     
                            validate.emailState = 'has-danger'
                              this.setState({ 
                                validate,
                                mensagem_email: 'Email já cadastrado.'  
                              })                              
         
                      }  else {
                        validate.emailState = 'has-success' ;        
                      }
                    })        
                    .catch(error=>{
                      alert("Error de conexão 1  "+error)
                    })     
                  }      
                })        
                .catch(error=>{
                  alert("Erro de conexão 2"+error)
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
          mensagem_nome: ''
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
            mensagem_data_nascimento: ''
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
            
          console.log(' valida email 2 - '+e.target.value);   
          console.log(' valida email 2 - '+this.state.campEmail);   
        } else {
          validate.emailState = 'has-danger'
          this.setState({ mensagem_email: 'Email inválido' })  
        }
        this.setState({ 
          validate,
          mensagem_email: ''
        })

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
          
          if (e.target.value.length == 15) {
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
  
    if (e.target.value.length < 1) {
      validate.datanascimentoState = 'has-danger'
      this.setState({ mensagem_data_nascimento: 'O campo Data de Nascimento é obrigatório.' })  
    } else {    
      
      if (e.target.value.length == 1) {
        
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
  console.log('perfil verifica_botao -'+localStorage.getItem('logperfil'))
  if (localStorage.getItem('logperfil') == null) {
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
  } else if (localStorage.getItem('logperfil') == 1) {
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
  }  else if (localStorage.getItem('logperfil') == 2) {
    if (inicio == 1) {
      return (

          <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_empresa" p={2}>
                <div className="d-flex justify-content-center">
                <label> Salvar Alterações </label>
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
                <label> Salvar Alterações </label>
            </div>     
            </Box>           
          );
        } else {
          return (

            <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_empresa" p={2}>
                  <div className="d-flex justify-content-center">
                    <label> Salvar Alterações </label>
                  </div>     
            </Box>           
        );   
        }   
      }         
  }  
} 

sendSave(){        

  const datapost = {
      nome: this.state.campNome,              
      email: this.state.campEmail,
      celular: this.state.campTelefone1,    
      data_nascimento: this.state.campData_nascimento,    
      cpf: this.state.campCpf,
      tipo_cliente: 'F',        
      perfilId: 2,
      statusId: this.state.campStatusId,
      situacaoId: 1
 }           

     if (this.state.incluir) {
       console.log('incluir - '+JSON.stringify(datapost, null, "    ")); 
        api.post('/cliente/create',datapost)
        .then(response=>{
          if (response.data.success) {                        

          //console.log('logprogress - '+ this.state.progresso);  
          localStorage.setItem('logprogress', 25);  
          localStorage.setItem('lognome', this.state.campNome);  
          localStorage.setItem('logid', response.data.data.id);
          
          if (localStorage.getItem('logperfil') == 1) {
             localStorage.setItem('logperfil', 1);
             this.props.history.push(`/cliente_endereco/`+localStorage.getItem('logid'));     
          } else if (localStorage.getItem('logperfil') == 2) {
            if (this.state.campCnpj == null) {
              this.props.history.push(`/area_cliente_individual`);       
            } else {
              this.props.history.push(`/area_cliente_empresarial`);       
            }           
          } else if (localStorage.getItem('logperfil') == null) {
            this.props.history.push(`/cliente_endereco/`+localStorage.getItem('logid'));       
          } 
          
  
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
          
          localStorage.setItem('lognome', this.state.campNome);  
          //localStorage.setItem('logid', userId);
          if (localStorage.getItem('logperfil') == 1) {
            this.props.history.push(`/area_administrador`);
          } else if (localStorage.getItem('logperfil') == 2) {
            if (this.state.campCnpj == null) {
              this.props.history.push(`/area_cliente_individual`);       
            } else {
              this.props.history.push(`/area_cliente_empresarial`);       
            }           
          } else if (localStorage.getItem('logperfil') == null) {
            this.props.history.push(`/cliente_endereco/`+localStorage.getItem('logid'));       
          } 
           

        }
        else {
          console.log('criar - '+JSON.stringify(datapost, null, "    ")); 
          alert("Error na Criação verificar log")              
        }
      }).catch(error=>{
        alert("Error 34 ")
      })

    }      
}  

verificar_menu() {   
  console.log('perfil verificar_menu -'+localStorage.getItem('logperfil'))

  if (localStorage.getItem('logperfil') == null) {
   
   return(
    <div>
        <div className="d-flex justify-content-around">
             <div className="botao_navegacao">                 
                 <Link to='/tipo'> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
               </div>                  
               <div>
                 <div className="titulo_representante">                
                   <label>  Olá, Fale um pouco sobre você!</label>            
                 </div>
               </div>   
               
               <div>
                  <div className="botao_navegacao">
                      <Link to='/'><img className="botao_close espacamento_seta" src="../close_black.png"/> </Link>                        
                  </div>   
               </div>                     
        </div>      
          <br/>    
          <div>        
             <Progress color="warning" value={this.state.progresso} className="progressbar"/>
          </div>      
    </div>           
   );

  } else if (localStorage.getItem('logperfil') == 1) {  //ADMINISTRADOR
    return(
      <div>
      <div className="d-flex justify-content-around">
           <div className="botao_navegacao">                 
               <Link to='/lista_individual'> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
             </div>                  
             <div>
               <div className="titulo_representante">                
                 <label>  Olá, Fale um pouco sobre você!</label>            
               </div>
             </div>   
             
             <div>
                <div className="botao_navegacao">
                    <Link to='/'><img className="botao_close espacamento_seta" src="../close_black.png"/> </Link>                        
                </div>   
             </div>                     
      </div>      
        <br/>    
        <div>        
           <Progress color="warning" value={this.state.progresso} className="progressbar"/>
        </div>      
  </div>           
      );

  } else if (localStorage.getItem('logperfil') == 2) { // CLIENTE INDIVIDUAL OU EMPRESARIAL       
    console.log('this.state.campCnpj - '+this.state.campCnpj)      

    return(
      <div className="d-flex justify-content-around">
              <div className="botao_navegacao">                 
                 <Link to={this.state.endereco}> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
               </div>                  
               <div>
                 <div className="titulo_representante">                
                   <label>  Olá, Fale um pouco sobre você!</label>            
                 </div>
               </div>   
               
               <div>
                  <div className="botao_navegacao">
                  <div></div>                            
                  </div>   
               </div>   
             
      </div>
      );

  }


}

render(){  

return (
<div>    
<div className="d-flex justify-content">
  <div className="d-flex justify-content-start"> 
      <div className="area_direita">   
          <div>   
            <img className="titulo_logo" src="../logo.png"/>
         </div>      
      </div>    
   </div>
    <div className="area_esquerda">     
           {this.verificar_menu()}

            <div class="d-flex flex-column espacamento_caixa_texto">
              <div class="p-2"> 
                  <label for="inputPassword4">CPF *</label>
                    <Input 
                        disabled={this.state.camp_cpf_disabled}
                        className="input_text"                        
                        type="text"
                        name="cpf"
                        id="examplcpf"
                        autoComplete='off'
                        autoCorrect='off'
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
                      disabled={this.state.camp_nome_disabled}
                      className="input_text"                  
                      type="text"
                      name="nome"
                      id="examplnome"
                      placeholder=""
                      autoComplete='off'
                      autoCorrect='off'
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
                        autoComplete='off'
                        autoCorrect='off'
                        value={this.state.campEmail}
                        valid={ this.state.validate.emailState === 'has-success' }
                        invalid={ this.state.validate.emailState === 'has-danger' }
                        onBlur={this.verificaEmail}
                        onKeyPress={this.verificaEmail}
                        onFocus={this.verificaEmail}
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
                        autoComplete='off'
                        autoCorrect='off'
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