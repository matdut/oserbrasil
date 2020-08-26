import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import {Form, Progress, Input, FormFeedback, Select, Button } from 'reactstrap';
import {Link} from 'react-router-dom';
import { cnpjremoveMask } from '../../formatacao/cnpjremovemask';
import { cnpjMask } from '../../formatacao/cnpjmask';
import api from '../../../services/api';
import './empresarial.css';

const andamento_cadastro = localStorage.getItem('logprogress');     
const userId = localStorage.getItem('logid');
const { cnpj } = require('cpf-cnpj-validator');

//import { Area_direita, Area_esquerda, Titulo_logo, Logo, Titulo_representante, Preview } from "./style_empresarial";
class empresarialComponent extends React.Component{  

  constructor(props){
    super(props);
    this.state = {      
      campCnpj:"",
      campRazao_social: "",
      campNome_fantasia:"",
      campCep: '',
      inicio: 1,
      progresso: "",    
      mensagem_CNPJ: '',      
      mensagem_razao_social: '',  
      mensagem_nome_fantasia: '',  
      consulta_cnpj:'', 
      dataCliente: [],
      validate: {
        razao_socialState: '',    
        cnpjState: '',     
        nome_fantasiaState: '',     
      }    
    }

          
    this.cnpjchange = this.cnpjchange.bind(this);     
    this.nomefantasiachange = this.nomefantasiachange.bind(this);      
    this.loadcnpj = this.loadcnpj.bind(this);   
    this.razaosocialchange = this.razaosocialchange.bind(this);   

    this.verificaNome = this.verificaNome.bind(this);  
    this.verificanomefantasia = this.verificanomefantasia.bind(this);   
    this.verificacnpj = this.verificacnpj.bind(this);   
    this.verificarazaosocial = this.verificarazaosocial.bind(this);       

    this.validaNomeChange = this.validaNomeChange.bind(this);  
    this.validatecnpjChange = this.validatecnpjChange.bind(this);   
    this.validatenomefantasiaChange = this.validatenomefantasiaChange.bind(this);   
    this.validaterazaosocialChange = this.validaterazaosocialChange.bind(this); 

    this.verifica_botao = this.verifica_botao.bind(this);  
    this.verificaSaidacnpj = this.verificaSaidacnpj.bind(this);  
    
    
  }

  componentDidMount(){  
    const { validate } = this.state
    //console.log('logprogress - '+ localStorage.getItem('logprogress'));  
    validate.cnpjState = ''
    validate.razao_socialState = ''
    validate.nome_fantasiaState = ''

    this.setState({      
      validate,
      progresso: 25 
    });   
    //console.log('progresso -'+ this.state.progresso)
    if (localStorage.getItem('logid') !== "") {
      this.busca_cliente()
    }
    
    //this.verifica_base_cnpj()
    //this.cnpjInput.focus();
  }

  limpar_cnpj_nao_encontrado() {
    this.setState({      
      campCnpj: "",          
      campRazao_social: "",
      campNome_fantasia:"",      
    });
   } 

   busca_cliente(e) {
    const { validate } = this.state
    api.get(`/cliente/get/${localStorage.getItem('logid')}`)
    .then(res=>{
        console.log(JSON.stringify(res.data, null, "    ")); 
        if (res.data.data.length > 0) {
           
          this.setState({ 
            campCnpj: res.data.data[0].cnpj,          
            campRazao_social: res.data.data[0].razao_social,
            campNome_fantasia:res.data.data[0].nome_fantasia,                  
            inicio: 2
          })     

          if (this.state.campCnpj == null) {
            this.setState({ 
              campCnpj: ''
            })
          }             
          if (this.state.campRazao_social == null){
            this.setState({ 
              campRazao_social: ''
            })
          }
          if (this.state.campNome_fantasia == null){
            this.setState({ 
              campNome_fantasia: ''
            })
          }


          if (this.state.campCnpj !== "") {
            validate.cnpjState = 'has-success'
          }             
          if (this.state.campRazao_social !== ""){
            validate.razao_socialState = 'has-success'      
          }
         // if (this.state.campNome_fantasia !== null) {
         //   validate.nome_fantasiaState = 'has-success'      
         // }          
  
          this.setState({ validate })
        } 
      })        
      .catch(error=>{
        alert("Error de conexão  "+error)
      })       
  
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
        this.setState({ 
          progresso: this.state.progresso + 5 
       });  

       }     
   }
  
   /*verificacnpj(e) {
    const { validate } = this.state
      
       if (e.target.value.length > 0) {
  
        validate.cnpjState = 'has-danger'
        validate.razao_socialState = ''
        validate.nome_fantasiaState = ''

        this.setState({ 
          validate,
          inicio: 1,  
          campRazao_social: '',
          campNome_fantasia: '',
          mensagem_nome_fantasia: '',  
          mensagem_razao_social: '',  
          mensagem_CNPJ: 'O campo CNPJ é obrigatório key'  
         })        
         
       }
   }*/

   verificaSaidacnpj(e) {
    const { validate } = this.state
      
      if (e.target.value.trim().length == 0) {  
      validate.cnpjState = 'has-danger'
      validate.razao_socialState = ''
      validate.nome_fantasiaState = ''

        this.setState({ 
          validate,
          inicio: 1,  
          campRazao_social: '',
          campNome_fantasia: '',
          mensagem_nome_fantasia: '',  
          mensagem_razao_social: '',  
          mensagem_CNPJ: 'O campo CNPJ é obrigatório'  
         })        
         
      } 
   }
   verificacnpj(e) {
    const { validate } = this.state
      
    if (e.target.value.trim().length == 18) {
        if (cnpj.isValid(e.target.value)) {
          //cnpj válido   
          console.log(' CNPJ VALIDO '+e.target.value)            
          this.verifica_base_cnpj(e)

       } else if (e.target.value.trim().length == 0){
        console.log(' CNPJ INVALIDO '+e.target.value)
        validate.cnpjState = 'has-danger'
        this.setState({ 
           mensagem_CNPJ: 'O campo CNPJ é inválido.',
           inicio: 1           
          })                                         
       }              
      }
   }
  
  verificarazaosocial(e) {
    const { validate } = this.state      
       
       if (e.target.value.length == 0) {
  
        validate.razao_socialState = 'has-danger'
        this.setState({ 
          validate,
          inicio: 1,      
          mensagem_razao_social: 'O campo Razão Social é obrigatório'  
         })      
       } else {
        this.setState({ 
          inicio: 2,      
       });  

       }    
   }
  
  verificanomefantasia(e) {
    const { validate } = this.state
      
       if (e.target.value.length == 0) {  
        this.setState({ 
          inicio: 2,   
       });  
       } else {
        this.setState({ 
          inicio: 2,   
       });  

       }    
   }

   verifica_botao(inicio) {
    const { validate } = this.state
    console.log(JSON.stringify(this.state, null, "    "));
    //console.log(JSON.stringify(inicio, null, "    "));
    if (inicio == 1) {
      return (
  
        <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_dados"  p={2}>
                <div className="d-flex justify-content-center">
                <label> Próximo </label>
                 </div>     
           </Box>           
       );   
    } else {    
    
          if (validate.cnpjState == 'has-success' && validate.razao_socialState == 'has-success') {            

              return (
                <Box bgcolor="error.main" color="error.contrastText" className="botao_cadastro_dados"  p={2} onClick={()=>this.sendUpdate()}>
                <div className="d-flex justify-content-center">
                <label> Próximo </label>
                </div>     
                </Box>           
              );
           }  else {
            return (
  
              <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_dados"  p={2}>
                      <div className="d-flex justify-content-center">
                      <label> Próximo </label>
                       </div>     
                 </Box>           
             );    
           }        
               
     }
  } 
  
  cnpjchange(e) {
    this.setState({ campCnpj: cnpjMask(e.target.value) })
  
  }
  razaosocialchange(e) {
    this.setState({ campRazao_social: e.target.value })
  }
  nomefantasiachange(e) {
    this.setState({ campNome_fantasia: e.target.value })
  }
  
  
  validatecnpjChange(e){
    const { validate } = this.state
    
      console.log('TAMANHO - '+e.target.value.length)
      if (e.target.value.length == 0) {
        validate.cnpjState = 'has-danger'
        this.setState({ 
           mensagem_CNPJ: 'O campo CNPJ é obrigatório.',
           inicio: 1           
        })  
      } else if (e.target.value.length == 18) {   
          ///validate.cnpjState = ''
          this.setState({ 
           mensagem_CNPJ: '',
           inicio: 1           
          })  
          console.log(' verifica '+e.target.value)                 
           // verifica se é um número válido
           if (cnpj.isValid(e.target.value)) {
              //cnpj válido   
              console.log(' CNPJ VALIDO '+e.target.value)            
              this.verifica_base_cnpj(e)

           } else {
            console.log(' CNPJ INVALIDO '+e.target.value)
            validate.cnpjState = 'has-danger'
            this.setState({ 
               mensagem_CNPJ: 'O campo CNPJ é inválido.',
               inicio: 1           
              })                                         
           }                     
      }  
        
      this.setState({ validate })
  }

  verifica_base_cnpj(e) {
  const { validate } = this.state
 // console.log('verifica_base_cnpj cnpj - '+cnpjremoveMask(e.target.value))         
  //let userId = this.props.match.params.id;  
  api.get(`/cliente/getClienteCnpj/${cnpjremoveMask(e.target.value)}`)
  .then(res=>{
      console.log(JSON.stringify(res.data, null, "    ")); 
      if (res.data.data.length > 0) {

        validate.cnpjState = 'has-danger' 
        this.setState({ 
          inicio:1,
          mensagem_CNPJ: 'O campo CNPJ já cadastrado.' 
        }) 
        
        this.setState({ 
           validate,
        })
      } else {
        console.log('nao encontrou base '+JSON.stringify(res.data, null, "    ")); 
        this.loadcnpj(e)
      }
    })        
    .catch(error=>{
      alert("Error de conexão cliente/get "+error)
    })   
  }
  validatenomefantasiaChange(e){
    const { validate } = this.state
    
      if (e.target.value.length == 0) {
        validate.nome_fantasiaState = ''
        this.setState({ 
          inicio:1,
          mensagem_nome_fantasia: '' 
        })  
      } else {
        validate.nome_fantasiaState = ''       
        this.setState({           
          inicio: 2
        })
       // this.verifica_botao(this.state.inicio)
      }  
      this.setState({ validate })
  }
  validaNomeChange(e){
    const { validate } = this.state
    
      if (e.target.value.length == 0) {
        validate.razao_socialState = ''
        this.setState({ 
          inicio: 1,
          mensagem_razao_social: '' 
        })  
      } else if (e.target.value.length > 0) {
        validate.razao_socialState = 'has-success'      
        this.setState({           
          inicio: 2
        })
        this.verifica_botao(this.state.inicio)
      }  
      this.setState({ validate })  
  }

sendUpdate(){        
 
  const datapost = {    
    razao_social: this.state.campRazao_social,              
    cnpj: cnpjremoveMask(this.state.campCnpj),
    nome_fantasia: this.state.campNome_fantasia
  }          

        console.log('Atualiza Empresa - '+JSON.stringify(datapost, null, "    ")); 
        console.log('Atualiza Empresa id - '+localStorage.getItem('logid')); 
        api.put(`/cliente/update/${localStorage.getItem('logid')}`, datapost)
        .then(response=>{
          if (response.data.success==true) {                        
           
            localStorage.setItem('logprogress', 50);  
            localStorage.setItem('lograzaosocial', this.state.campRazao_social);  
           // localStorage.setItem('logcep', this.state.campCep);   
            //localStorage.setItem('logid', userId);              
            //localStorage.setItem('lognome', this.state.campId);              
            
            this.props.history.push('/empresa_endereco');            
  
          }
          else {
            alert("Error 34 ")              
          }
        }).catch(error=>{
          alert("Erro verificar log  ")
        })
}  
validaterazaosocialChange(e){
  const { validate } = this.state
  
    if (e.target.value.length == 0) {
      validate.razao_socialState = 'has-danger'
      this.setState({ mensagem_razao_social: 'O campo Razão Social é obrigatório.' })  
    } else if (e.target.value.length > 0) {
      validate.razao_socialState = 'has-success'             
    }  
    this.setState({ validate })
}
loadcnpj(e) {
  const { validate } = this.state
  if (this.state.campCnpj.length > 0) { 

    //console.log(' recebe valores - '+JSON.stringify(this.state , null, "    "));                 

    //console.log('Consulta CNPJ 1 - '+this.state.campCnpj); 
    //console.log('Consulta CNPJ target - '+e.target.value); 
    //console.log('Consulta CNPJ - '+cnpjremoveMask(e.target.value));   
    //const cnpj_consulta = cnpjremoveMask(this.state.campCnpj);
   let cnpj = `https://cors-anywhere.herokuapp.com/http://www.receitaws.com.br/v1/cnpj/${cnpjremoveMask(this.state.campCnpj)}`;
   //let cnpj = `http://www.receitaws.com.br/v1/cnpj/${cnpjremoveMask(this.state.campCnpj)}`;
   // console.log(`campCNPJ - ${cnpj}`);
    console.log(cnpj);
    api.get(cnpj)
    .then((val)=>{
      if (val.data !== null) {

        if (val.data.situacao == "ATIVA") {
         console.log('SITUACAO - '+ val.data.situacao);           

            /*
              if (this.state.campEmail === "") {
                atualiza_email = val.data.email   
              } else {
                atualiza_email = this.state.campEmail
              }
            */
              //console.log('EMPRESA - '+ val.data.nome);

              this.setState({ 
                campRazao_social: val.data.nome,              
                //campEmail: atualiza_email,
                campNome_fantasia: val.data.fantasia,               
                //campEmailTeste: atualiza_email,
                //campBairro: val.data.bairro,
                //campCidade: val.data.municipio,
                //campEndereco: val.data.logradouro,
                //campComplemento: val.data.complemento,
                //campNumero: val.data.numero,
                campCep: val.data.cep,                
              });              

              localStorage.setItem('logcep', this.state.campCep);  
              validate.razao_socialState = ''    
              if (this.state.campCnpj.length > 0) {
                validate.cnpjState = 'has-success'      
              }
              if (this.state.campRazao_social.length > 0) {
                validate.razao_socialState = 'has-success'      
              }
              if (this.state.campNome_fantasia.length > 0) {
                validate.nome_fantasiaState = 'has-success'      
              }
              

              this.setState({ 
                validate,              
                inicio: 2
              })
              this.setState({ mensagem_CNPJ: '' })  
            //  console.log(JSON.stringify(this.state , null, "    "));
        
        } else {
          validate.cnpjState = 'has-danger'
          this.setState({ mensagem_CNPJ: 'CNPJ não regular da receita federal' })  
        }
      } else {
        validate.cnpjState = 'has-danger'
        this.setState({ mensagem_CNPJ: 'CNPJ não encontrado na receita federal' })  
      }
     // console.log('callapi: ' + JSON.stringify(val))
    }).catch(error=>{
      validate.cnpjState = 'has-danger'
      this.setState({           
          mensagem_CNPJ: 'CNPJ não encontrado' 
       })  
    })
     //})
  //.catch((error) => console.log('callapi:'+ JSON.stringify(error)));
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
                 <Link to='/empresa'> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
               </div>                  
               <div>
                 <div className="titulo_representante">                
                    <label> Dados da Empresa </label>             
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
            <div>                
              </div>
              <div class="p-2"> 
              <label for="inputPassword4">CNPJ *</label>
                <Input                                      
                    className="input_text"    
                    type="text"
                    name="cnpj"
                    id="examplnome"
                    placeholder=""
                    value={this.state.campCnpj}
                    valid={ this.state.validate.cnpjState === 'has-success' }
                    invalid={ this.state.validate.cnpjState === 'has-danger' }
                    onBlur={this.verificaSaidacnpj}
                    //onFocus={this.verificacnpj}                   
                    onKeyUp={this.verificacnpj}                   
                    onChange={ (e) => {
                      this.cnpjchange(e)                       
                      this.validatecnpjChange(e)
                    }}   
                    maxlength="18"                                                                      
                  />                                
                  <FormFeedback 
                  invalid={this.state.validate.cnpjState}>
                       {this.state.mensagem_CNPJ}
                  </FormFeedback>  
              </div>
              <div class="p-2"> 
              <label for="inputEmail4">Razão Social *</label>
                <Input
                    className="input_text"    
                    type="text"
                    name="cnpj"
                    id="examplnome"
                    placeholder=""
                    value={this.state.campRazao_social}
                    valid={ this.state.validate.razao_socialState === 'has-success' }
                    invalid={ this.state.validate.razao_socialState === 'has-danger' }
                    onBlur={this.verificarazaosocial}
                    onKeyUp={this.verificarazaosocial}
                    onChange={ (e) => {
                      this.razaosocialchange(e)                       
                      this.validaterazaosocialChange(e)
                    }}   
                    maxlength="120"                                                                                                                                                                      
                  />                                
                  <FormFeedback 
                  invalid={this.state.validate.razao_socialState}>
                       {this.state.mensagem_razao_social}
                  </FormFeedback>    
              </div> 
              <div class="p-2">               
              <label for="inputEmail4">Nome Fantasia</label>
                <Input
                    className="input_text"    
                    type="text"
                    name="cnpj"
                    id="examplnome"
                    placeholder=""
                    value={this.state.campNome_fantasia}
                    valid={ this.state.validate.nome_fantasiaState === 'has-success' }
                    invalid={ this.state.validate.nome_fantasiaState === 'has-danger' }
                    onBlur={this.verificanomefantasia}
                    onKeyUp={this.verificanomefantasia}
                    onChange={ (e) => {
                      this.nomefantasiachange(e)                       
                      this.validatenomefantasiaChange(e)
                    }}      
                    maxlength="150"                                                                     
                  />                                
                  <FormFeedback 
                  invalid={this.state.validate.nome_fantasiaState}>
                       {this.state.mensagem_nome_fantasia}
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