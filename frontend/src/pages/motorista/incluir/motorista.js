import React  from 'react';
import Box from '@material-ui/core/Box';
import {Form, Progress, Input, FormFeedback, Label,  Select, Button, Alert } from 'reactstrap';
import {Link} from 'react-router-dom';
import { celularMask } from '../../formatacao/celularmask';
import { cpfMask } from '../../formatacao/cpfmask';
import { dataMask } from '../../formatacao/datamask';
import api from '../../../services/api';
import '../motorista.css';
import Menu_motorista from '../menu_motorista';
import Menu_administrador from '../../administrador/menu_administrador';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import FilledInput from '@material-ui/core/FilledInput';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import * as moment from 'moment';
import 'moment/locale/pt-br';

import FormHelperText from '@material-ui/core/FormHelperText';

import CheckIcon from '@material-ui/icons/Check';


import { Multiselect } from 'multiselect-react-dropdown';
var dateFormat = require('dateformat');
const { cpf } = require('cpf-cnpj-validator');
const andamento_cadastro = localStorage.getItem('logprogress'); 

class motoristaComponent extends React.Component{  

  constructor(props){
    super(props);      
    this.state = { 
      campId: 0,     
      campNome: "",
      options: [{name: 'Inglês', id: 1},{name: 'Alemão', id: 2}, {name: 'Italiano', id: 3}, {name: 'Francês', id: 4}],
      perfillog: null,
      campData_nascimento:"",
      campEmail:"",      
      campTelefone1:"",
      campCpf:"", 
      campCNH: "", 
      campData_CNH: "", 
      campStatusId: '',     
      camp_cpf_disabled: false,
      camp_nome_disabled: false,    
      campMotorista_bilingue: false,
      checkedA: false,
      seleciona_bilingue: 0,
      seleciona_limit: 2,
      selectedValue: [],
      campCnpj:"",
      endereco:"",      
      perfilid:'',       
      mensagem_nome: '',  
      mensagem_cpf: '',  
      mensagem_email: '',  
      mensagem_telefone1: '',
      mensagem_data_nascimento: '',        
      mensagem_numero_carteira: '',    
      mensagem_datavalidade: '',    
      erro_cpf: false,
      erro_nome: false,
      erro_datanascimento: false,
      erro_dataCNH: false,
      erro_numero_carteira: false,
      erro_email: false,
      erro_telefone: false,
      validacao_cpf: false,
      validacao_nome: false,
      validacao_datanascimento: false,
      validacao_numero_carteira: false,
      validacao_dataCNH: false,
      validacao_email: false,
      validacao_telefone: false, 
      incluir: false, 
      inicio: 1,
      progresso: 0,      
      validate: {
        nomeState: '',      
        datanascimentoState: '',   
        emailState: '',
        cpfState: '',     
        telefone1State: '',     
        numero_carteiraState: '',     
        data_validadeState: '',     
      }    
    }
    this.cpfchange = this.cpfchange.bind(this);
    this.Cnhchange = this.Cnhchange.bind(this);
    this.Data_validadeChange = this.Data_validadeChange.bind(this);
    this.telefone1change = this.telefone1change.bind(this);  
    this.emailchange = this.emailchange.bind(this);
    this.nomeChange = this.nomeChange.bind(this);     
    this.data_nascimentochange = this.data_nascimentochange.bind(this);
    this.handleChangeBilingue = this.handleChangeBilingue.bind(this); 

    this.verificaEmail = this.verificaEmail.bind(this);   
    this.verificaCpf = this.verificaCpf.bind(this);  
    this.verificaCpfonblur = this.verificaCpfonblur.bind(this);  
    this.verificaCnh = this.verificaCnh.bind(this);  
    this.verificaTelefone1 = this.verificaTelefone1.bind(this);  
    this.verificaNome = this.verificaNome.bind(this);  
    this.verificaDataValidade = this.verificaDataValidade.bind(this);  
    this.verificaDataNascimento = this.verificaDataNascimento.bind(this);  

    this.verificaTelefone1onfocus = this.verificaTelefone1onfocus.bind(this);  
    

    this.verificaCpfonfocus = this.verificaCpfonfocus.bind(this);  
    this.handleChange = this.handleChange.bind(this);   

    this.verificaTelefone1onblur = this.verificaTelefone1onblur.bind(this);  
    this.verificaCnhonblur = this.verificaCnhonblur.bind(this);   
    
    this.verificaEmailonfocus = this.verificaEmailonfocus.bind(this);   

    this.validaEmailChange = this.validaEmailChange.bind(this);    
    this.validaCpfChange = this.validaCpfChange.bind(this);  
    this.validaCnhChange = this.validaCnhChange.bind(this);  
    this.validatelefone1Change = this.validatelefone1Change.bind(this);  
    this.validaNomeChange = this.validaNomeChange.bind(this);  
    this.validaDataNascimentoChange = this.validaDataNascimentoChange.bind(this);  

    this.verifica_botao = this.verifica_botao.bind(this);  
    this.busca_cpf = this.busca_cpf.bind(this);  
    this.busca_motorista = this.busca_motorista.bind(this);
    this.verificar_menu = this.verificar_menu.bind(this);      

    this.seleciona_idioma = this.seleciona_idioma.bind(this);     

    this.verifica_nome_motorista = this.verifica_nome_motorista.bind(this);  
  }

  handleChange = (event) => {
    this.setState({ 
      campMotorista_bilingue: event.target.checked
    });
    
    //console.log(' checkedA - '+JSON.stringify(this.state.checkedA, null, "    "));   
  };

  componentDidMount(){ 
   
    let userId = this.props.match.params.id;    

    this.setState({          
      inicio: 1,     
      perfillog: localStorage.getItem('logperfil')
    });  
    
    if (userId !== 0) {                    
      localStorage.setItem('logid', userId);
    } else {
      localStorage.setItem('logperfil', 0);
    }    

    if (localStorage.getItem('logperfil') == 3) {
      this.setState({      
        camp_cpf_disabled: true,
       // camp_nome_disabled: true,
      });   
    }

    if (localStorage.getItem('logid') == 0) { 
      this.setState({      
        campStatusId: 6,
        progresso: 0
      }); 
    } else {
      this.setState({              
        progresso: 15
      }); 
    } 
        
  /*  console.log('userID - '+userId)
    console.log('logid - '+localStorage.getItem('logid'))
    console.log('Perfil log - '+localStorage.getItem('logperfil'))
    console.log('Status - '+this.state.campStatusId)
    console.log('LogPerfil const - '+this.state.perfillog) */
    
    if (localStorage.getItem('logperfil') !== 0) { 
      //console.log(' busca cliente ')                  
      // buscar representante       
      this.busca_motorista()      
    }
    
  }
  verifica_nome_motorista(nome){
    let nome_titulo = nome.substring(0,nome.indexOf(" ")) 
    if (nome_titulo == "") {
      nome_titulo = nome
    }
    return(    
          nome_titulo          
    );  
  } 

  busca_motorista() {
    const { validate } = this.state   
    api.get(`/motorista/get/${localStorage.getItem('logid')}`)
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
            campCNH: res.data.data[0].numero_carteira,   
            campData_CNH: res.data.data[0].data_validade,   
            campMotorista_bilingue: res.data.data[0].bilingue,   
            inicio: 2,
            incluir: false, 
            validacao_cpf: true,
            validacao_datanascimento: true,
            validacao_email: true,
            validacao_nome: true,
            validacao_telefone: true,
          })                           

          this.setState({ 
            endereco: "/area_motorista" 
          });            
          
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
          if (this.state.campCNH !== "") {
            validate.numero_carteiraState = 'has-success'      
          }   
          if (this.state.campData_CNH !== "") {
            validate.data_validadeState = 'has-success'      
          }            
  
          this.setState({ validate })
        } 
      })        
      .catch(error=>{
        alert("Error de conexão motorista "+error)
      })       
  
  }
  busca_cpf(e){
    const { validate } = this.state
   api.get(`/motorista/getMotoristaCpf/${e.target.value}`)
   .then(res=>{
       console.log(JSON.stringify(res.data, null, "    ")); 
       if (res.data.success) {
          
          validate.cpfState = 'has-danger'
          this.setState({ 
            erro_cpf: true,
            validacao_cpf: false,
            mensagem_cpf: 'Motorista já cadastrado'  
          });
          this.state.incluir= false
 
         this.setState({ validate })
       } else {
           validate.cpfState = 'has-success'
           this.setState({ 
            erro_cpf: false,
            validacao_cpf: true,
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
  Cnhchange(e) {
    this.setState({ campCNH: e.target.value })
  }

  Data_validadeChange(e) {
    this.setState({ campData_CNH: dataMask(e.target.value) })
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
    this.setState({ campData_nascimento: dataMask(e.target.value) })
  }

  handleChangeBilingue(e) {     
    if (e.target.checked) {
      this.setState({   
         seleciona_limit: 2,
         seleciona_bilingue: 1,
         campMotorista_bilingue: e.target.checked     
      })               
    } else {
      this.setState({   
        seleciona_limit: 0,
        seleciona_bilingue: 0,
        campMotorista_bilingue: e.target.checked     
     })               
    }
    console.log('bilingue '+JSON.stringify(this.state, null, "    ")); 
  }  
/*
  handleChangeBilingue(e) { 
    //let bilingue = event.target.checked
    //console.log('bilingue '+JSON.stringify(event.target.checked, null, "    ")); 
    //console.log('bilingue value '+JSON.stringify(event.target.value, null, "    ")); 

    this.setState({ 
      seleciona_bilingue: e.target.checked,
      campMotorista_bilingue: e.target.checked 
    });
    /*
    if (bilingue == true) {
      this.setState({ campMotorista_bilingue: bilingue });
    } else {
      this.setState({ campMotorista_bilingue: bilingue });
    } 
    
    console.log(JSON.stringify(this.state, null, "    ")); 
  };
*/

/*
  handleChangeBilingue(e) {         
    console.log(JSON.stringify(e.target.checked, null, "    ")); 
    this.setState({ campMotorista_bilingue: e.target.checked})  
    console.log(JSON.stringify(this.state, null, "    ")); 

  }
*/
  verificaCnhonblur(e) {
    const { validate } = this.state
       if (this.state.campCNH.length == 0) {
        validate.numero_carteiraState = 'has-danger'
        this.setState({ 
          validate,
          erro_numero_carteira: true,
          validacao_numero_carteira: false,
          mensagem_numero_carteira: 'O campo Número CNH é obrigatório.'  
         })      
       } else {
        validate.numero_carteiraState = 'has-success' ;        

        this.setState({ 
          erro_numero_carteira: false,
          validacao_numero_carteira: true,
          mensagem_numero_carteira: ''
       });  

       }      
   }
   verificaCnh(e) {
    const { validate } = this.state
       if (this.state.campCNH.length == 0) {
       // validate.numero_carteiraState = 'has-danger'
        this.setState({ 
          validate,
          erro_numero_carteira: false,
          validacao_numero_carteira: false,
          mensagem_numero_carteira: ''  
         })      
       } else {
        validate.numero_carteiraState = 'has-success' ;        

        this.setState({ 
          erro_numero_carteira: false,
          validacao_numero_carteira: true,
          mensagem_numero_carteira: ''
       });  

       }      
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
          erro_cpf: true,
          validacao_cpf: false,
          mensagem_cpf: 'O campo CPF é obrigatório'  
         })            
       } else if (e.target.value.length == 14) {
        if (cpf.isValid(e.target.value)) {
          //cpf válido 
          console.log('é valido - '+e.target.value);
          this.busca_cpf(e);// se existir não deixa cadastrar

        } else {
          validate.cpfState = 'has-danger'       
          this.setState({ 
            erro_cpf: true,
            validacao_cpf: false,
            mensagem_cpf: 'O campo CPF é inválido' 
          })     
        } 
       }  
   }

   verificaCpfonfocus(e) {
    const { validate } = this.state
    if (e.target.value.length == 0) {
      validate.cpfState = ''
      this.setState({ 
        validate,     
        erro_cpf: false,
        validacao_cpf: false,          
        mensagem_cpf: ''  
       })            
    }  
  } 

   verificaCpfonblur(e) {
    const { validate } = this.state
    if (e.target.value.length < 14) {
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
        erro_cpf: true,
        validacao_cpf: false,
        mensagem_cpf: 'O campo CPF é obrigatório'  
        })            
      }  
   }
  
  verificaTelefone1onblur(e) {
   
    const { validate } = this.state
       if (e.target.value.length < 15) {          
        validate.telefone1State = 'has-danger'
        this.setState({ 
          validate,
          inicio: 1,
          erro_telefone: true,
          validacao_telefone: false,
          mensagem_telefone1: 'O campo Telefone é obrigatório.'
         })      
       } else {       

        if (e.target.value.length == 15) {
            validate.telefone1State = 'has-success' ;                
            this.setState({ 
              erro_telefone: false,
              validacao_telefone: true,
              mensagem_telefone1: ''
          });           
        }

       }        
   }

   verificaTelefone1(e) {
   
    const { validate } = this.state
       if (e.target.value.length < 15) {          
        validate.telefone1State = ''
        this.setState({ 
          validate,
          inicio: 1,
          erro_telefone: false,
          validacao_telefone: false,
          mensagem_telefone1: ''
         })      
       } else {       

        if (e.target.value.length == 15) {
            validate.telefone1State = 'has-success' ;                
            this.setState({ 
              erro_telefone: false,
              validacao_telefone: true,
              mensagem_telefone1: ''
          });           
        }

       }        
   }

   verificaTelefone1onfocus(e) {
   
    const { validate } = this.state
       if (e.target.value.length < 15) {          
        validate.telefone1State = ''
        this.setState({ 
          validate,
          inicio: 1,
          erro_telefone: false,
          validacao_telefone: false,
          mensagem_telefone1: ''
         })      
       } else {       

        if (e.target.value.length == 15) {
            validate.telefone1State = 'has-success' ;                
            this.setState({ 
              erro_telefone: false,
              validacao_telefone: true,
              mensagem_telefone1: ''
          });           
        }

       }        
   }


   verificaEmail(e){   
    const { validate } = this.state
    if (e.target.value.length == 0) {
      validate.emailState = 'has-danger'
      this.setState({ 
        validate,
        erro_email: false,
        validacao_email: false,
        mensagem_email: ''  
    })
    } else if (e.target.value.length > 0 && validate.emailState == 'has-danger') {
    this.setState({ 
      validate,
      erro_email: true,
      validacao_email: false,
      mensagem_email: 'Email é obrigatório.'  
     })                                   
    }    
  } 

  verificaNome() {
    const { validate } = this.state
       if (this.state.campNome.length == 0) {
        validate.nomeState = 'has-danger'
        this.setState({ 
          validate,
          erro_nome: true,
          validacao_nome: false,
          mensagem_nome: 'O campo nome é obrigatório.'  
         })      
       } else {
        validate.nomeState = 'has-success' ;        

        this.setState({ 
          erro_nome: false,
          validacao_nome: true,
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
          erro_datanascimento: true,   
          validacao_datanascimento: false,    
          mensagem_data_nascimento: 'O campo Data de Nascimento é obrigatório.'  
         })      
       } else if (this.state.campData_nascimento.length == 10) {

        validate.datanascimentoState = 'has-success' ;        
        this.setState({ 
          erro_datanascimento: false,   
          validacao_datanascimento: true,    
          mensagem_data_nascimento: ''
        });     

     }           
   }

   verificaDataValidade() {
    const { validate } = this.state
       if (this.state.campData_CNH.length == 0) {
        validate.data_validadeState = 'has-danger'
        this.setState({ 
          validate,
          erro_dataCNH: true,
          validacao_dataCNH: false,
          mensagem_datavalidade: 'O campo Data de Validade é obrigatório.'  
         })      
       } else {

          validate.data_validadeState = 'has-success' ;        
          this.setState({ 
            erro_dataCNH: false,
            validacao_dataCNH: true,
            mensagem_datavalidade: ''
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
            this.setState({              
              erro_email: false,
              validacao_email: true,
              mensagem_email: '' })    
            //console.log(' valida email - '+e.target.value);   
            //console.log(' valida email - '+this.state.campEmail);   
            this.busca_email_ja_cadastrado(e.target.value)                
                    
            
        } else {
          validate.emailState = 'has-danger'
          this.setState({ 
            validate,
            erro_email: true,
            validacao_email: false,
            mensagem_email: '' })  
        }

        this.setState({ validate })
    }       
    
    
    
    validaCpfChange(e){
      const { validate } = this.state
      
        if (e.target.value.length == 0) {
          validate.cpfState = 'has-danger'
          this.setState({ 
            erro_cpf: true,
            validacao_cpf: false,
            mensagem_cpf: 'O campo CPF é obrigatório' 
          })  
        } else if (e.target.value.length == 14) {          
          //valida o cpf 
           console.log('e.target.value - '+e.target.value);
           if (cpf.isValid(e.target.value)) {
               //cpf válido 
               console.log('é valido - '+e.target.value);
               this.busca_cpf(e);// se existir não deixa cadastrar

           } else {
            validate.cpfState = 'has-danger'       
            this.setState({ 
              erro_cpf: true,
              validacao_cpf: false,
              mensagem_cpf: 'O campo CPF é inválido' 
            })     
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
          this.setState({
            erro_telefone: true,
            validacao_telefone: false,
            mensagem_telefone1: 'O campo Telefone é obrigatório.'
          })  
        } else {          
          
          if (e.target.value.length == 15) {
            validate.telefone1State = 'has-success'       
            this.setState({ 
              erro_telefone: false,
              validacao_telefone: true,
              inicio: 2,  
              progresso: 15,        
              mensagem_telefone1: '' 
            })              
          }          
        }  
        this.setState({ validate })
        this.verifica_botao(this.state.inicio)
    }
    
validaNomeChange(e){
  const { validate } = this.state
  
    if (e.target.value.length == 0) {
      validate.nomeState = ''
      this.setState({ 
        erro_nome: false,
        validacao_nome: false,
        mensagem_nome: '' 
      })  
    } else if (e.target.value.length > 0) {      
      validate.nomeState = 'has-success'       
      this.setState({ 
        erro_nome: false,
        validacao_nome: true,
        mensagem_nome: '' 
      })  
    }  
    this.setState({ validate })  
}

seleciona_idioma(e) {
  console.log('seleciona_idioma - '+e.target.value);
  this.setState({ selectedValue: e.target.value })  
}


validaCnhChange(e){
  const { validate } = this.state
  
    if (e.target.value.length == 0) {
      validate.numero_carteiraState = ''
      this.setState({ 
        erro_numero_carteira: false,
        validacao_numero_carteira: false,
        mensagem_numero_carteira: '' 
      })  
    } else if (e.target.value.length > 0) {      
      validate.numero_carteiraState = 'has-success'       
      this.setState({ 
        erro_numero_carteira: false,
        validacao_numero_carteira: true,
        mensagem_numero_carteira: '' 
      })  
    }  
    this.setState({ validate })  
}
validaDataValidadeChange(e){
  const { validate } = this.state
  
    if (e.target.value.length < 10) {
      validate.data_validadeState = 'has-danger'
      this.setState({ 
          erro_dataCNH: true,
          validacao_dataCNH: false,
          mensagem_datavalidade: 'O campo Data de Validade é obrigatório.' 
        })  
    }  
    this.setState({ validate })
}
validaDataNascimentoChange(e){
  const { validate } = this.state
  
    if (e.target.value.length < 10) {
      validate.datanascimentoState = 'has-danger'
      this.setState({ 
        erro_datanascimento: true,
        validacao_datanascimento: false,
        mensagem_data_nascimento: 'O campo Data de Nascimento é obrigatório.' 
      })  
    }  
    this.setState({ validate })
}

verifica_botao(inicio) {
  const { validate } = this.state    
  if (inicio == 1) {
    return (

        <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado" p={2}>
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
          <Box bgcolor="error.main" color="error.contrastText" className="botoes_habilitados"  p={2} onClick={()=>this.sendSave()}>
          <div className="d-flex justify-content-center">
              <label> Próximo </label>
          </div>     
          </Box>           
        );
      } else {
        return (

          <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado" p={2}>
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
    celular: this.state.campTelefone1,    
    data_nascimento: moment(this.state.campData_nascimento, "DD MM YYYY"),         
    cpf: this.state.campCpf,
    data_validade: moment(this.state.campData_CNH, "DD MM YYYY"), 
    numero_carteira: this.state.campCNH,    
    bilingue: this.state.campMotorista_bilingue,   
    perfilId: 3,
    statusId: this.state.campStatusId,
    situacaoId: 1
  }         
   

   console.log('datapost - '+JSON.stringify(datapost, null, "    ")); 

     if (this.state.incluir) {       
      console.log('incluir - '+JSON.stringify(datapost, null, "    ")); 
        api.post('/motorista/create',datapost)
        .then(response=>{
          
          if (response.data.success == true) {                        
            
            const logindata = {  
              email: this.state.campEmail,  
              perfilId: 3,
              statusId: this.state.campStatusId,
              logid: response.data.data.id
            }

            api.post('/login/create',logindata)

            localStorage.setItem('logid', response.data.data.id);
            localStorage.setItem('lognome', response.data.data.nome);  
         /* console.log('entrou ');           
          
          console.log('pegou sessao perfil - '+localStorage.getItem('logperfil'));           
          console.log('pegou sessao id - '+localStorage.getItem('logid'));           */
          console.log('pegou sessao perfil - '+localStorage.getItem('logperfil'));           
          console.log('pegou sessao id - '+localStorage.getItem('logid'));          
          if (localStorage.getItem('logperfil') == 1) {
            this.props.history.push(`/endereco_motorista_incluir/`+localStorage.getItem('logid'));   
          } else if (localStorage.getItem('logperfil') == 3) {
            this.props.history.push(`/area_motorista`);                   
          } else if (localStorage.getItem('logperfil') == 0) {
            this.props.history.push(`/endereco_motorista_incluir/`+localStorage.getItem('logid'));       
          }          
  
          }
          else {
            console.log('criar - '+JSON.stringify(datapost, null, "    ")); 
             alert("Error na Criação verificar log")                 
          }
        }).catch(error=>{
          alert("Erro verificar log  ")
        })
    } else {
      console.log('Alterar - '+JSON.stringify(datapost, null, "    ")); 
      api.put(`/motorista/update/${localStorage.getItem('logid')}`, datapost)
      .then(response=>{
        if (response.data.success==true) {                        
          
          const logindata = {  
            email: this.state.campEmail,  
            perfilId: 3,
            statusId: this.state.campStatusId
          }

          api.put(`/login/update/${localStorage.getItem('logid')}`,logindata)

          localStorage.setItem('lognome', this.state.campNome);  
          //localStorage.setItem('logid', userId);
          if (localStorage.getItem('logperfil') == 1) {
            this.props.history.push(`/endereco_motorista_incluir/`+localStorage.getItem('logid'));
          } else if (localStorage.getItem('logperfil') == 3) {
            this.props.history.push(`/area_motorista`);                   
          } else if (localStorage.getItem('logperfil') == 0) {
            this.props.history.push(`/endereco_motorista_incluir/`+localStorage.getItem('logid'));       
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

  if (localStorage.getItem('logperfil') == 0) {  
   return(
    <div>
        <div className="d-flex justify-content-around">
             <div className="botao_navegacao">                                  
                  <Link to={`/`}> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
               </div>                  
               <div>
                 <div className="titulo_representante_motorista">                
                   <label>  Olá, Fale um pouco sobre você!</label>            
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

  } else if (localStorage.getItem('logperfil') == 1) {  //ADMINISTRADOR
    return(
      <div>
        <div className="d-flex justify-content-around">
             <div className="botao_navegacao">                               
                   <Link to={`/area_motorista`}> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
               </div>                  
               <div>
                 <div className="titulo_representante_motorista">                
                   <label>  Olá, Fale um pouco sobre você!</label>            
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

  } else if (localStorage.getItem('logperfil') == 3) { // CLIENTE MOTORISTA    

    return(
      <div className="d-flex justify-content-around">
              <div className="botao_navegacao">                                             
               </div>                  
               <div>
                 <div className="titulo_representante_motorista">                
                   <label>   {this.verifica_nome_motorista(this.state.campNome)}, altere seus dados</label>            
                 </div>
               </div>   
               
               <div>
                  <div className="botao_navegacao">
              
                  </div>   
               </div>   
             
      </div>
      );

  }


}
busca_email_ja_cadastrado(email) {
  const { validate } = this.state
  api.get(`/login/getEmail/${email}`)
  .then(res=>{          
   // console.log(' resultado motorista - '+JSON.stringify(res.data, null, "    "));        
    if (res.data.success) {

            validate.emailState = 'has-danger'
              this.setState({                 
                validate,
                erro_email: true,
                validacao_email: false,
                mensagem_email: 'Email já cadastrado.'  
            })                          

    }  
  })        
  .catch(error=>{
    alert("Erro de conexão 3"+error)
  })                   
}
verificaEmailonfocus(e){   
  const { validate } = this.state
  if (e.target.value.length == 0) {
    validate.emailState = ''
    this.setState({ 
        validate,
        erro_email: false,
        validacao_email: false,
        mensagem_email: ''  
    })                   
  } else {
    this.busca_email_ja_cadastrado(e.target.value)         
  }            
 } 

 verificar_menu_lateral() {

  if (localStorage.getItem('logperfil') == 1) {
   return( 
     <Menu_administrador />     
   );
  } else if (localStorage.getItem('logperfil') == 3) {
   return( 
     <Menu_motorista />     
   );
  }

}

render(){  
  const { disabled } = this.state;
return (
<div>    
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
                <div class="d-flex justify-content-start">
                  <div>
                  <FormControl variant="outlined">
                    <InputLabel className="label_text" htmlFor="filled-adornment-password">CPF</InputLabel>
                     <OutlinedInput 
                        className="input_text"         
                        autoComplete="off"                                   
                        type="text"                       
                        error={this.state.erro_cpf}
                        helperText={this.state.mensagem_cpf}                     
                        id="cep_incluir"                      
                        variant="outlined"
                        value={this.state.campCpf}
                        onBlur={this.verificaCpfonblur}
                          onKeyUp={this.verificaCpf}
                          onFocus={this.verificaCpfonfocus}
                          onChange={ (e) => {
                            this.cpfchange(e)                       
                            this.validaCpfChange(e)
                          }}  
                          inputProps={{
                            maxLength: 14,
                          }}                                      
                      endAdornment={
                        <InputAdornment position="end">
                             {this.state.validacao_cpf? <CheckIcon />: ''}
                        </InputAdornment>
                      }
                      labelWidth={50}
                    />                
                   <FormHelperText error={this.state.erro_cpf}>
                         {this.state.mensagem_cpf}
                   </FormHelperText>
                  </FormControl>                      
                  </div>
                  <div>
                  <FormControl variant="outlined">
                    <InputLabel className="input_date_motorista" htmlFor="filled-adornment-password">Data de nascimento</InputLabel>
                     <OutlinedInput    
                        autoComplete="off"                     
                        error={this.state.erro_datanascimento}
                        helperText={this.state.mensagem_data_nascimento}
                        className="input_date_motorista"                       
                        id="data_incluir"                   
                        variant="outlined"
                        value={this.state.campData_nascimento}
                        onBlur={this.verificaDataNascimento}
                        onKeyUp={this.verificaDataNascimento}
                        onChange={ (e) => {
                          this.data_nascimentochange(e)                       
                          this.validaDataNascimentoChange(e)
                        }}                                    
                        inputProps={{
                          maxLength: 10,
                        }}
                      endAdornment={
                        <InputAdornment position="end">
                             {this.state.validacao_datanascimento? <CheckIcon />: ''}
                        </InputAdornment>
                      }
                      labelWidth={180}                      
                    />
                   <FormHelperText error={this.state.erro_datanascimento}>
                         {this.state.mensagem_data_nascimento}
                   </FormHelperText>
                </FormControl>  

                  </div>
                </div>          
              </div>              
              <div class="p-2"> 
               <FormControl variant="outlined">
                    <InputLabel className="label_text" htmlFor="filled-adornment-password">Nome</InputLabel>
                     <OutlinedInput
                        autoComplete="off"
                        type="text"                       
                        error={this.state.erro_nome}
                        helperText={this.state.mensagem_cpf}
                        className="nome_incluir_text"                       
                        id="nome_incluir"                   
                        variant="outlined"
                        value={this.state.campNome}
                        onBlur={this.verificaNome}
                        onFocus={this.verificaNomeonfocus}
                      onChange={ (e) => {
                        this.nomeChange(e)                       
                        this.validaNomeChange(e)
                      }}           
                      inputProps={{
                        maxLength: 40,
                      }}           
                      endAdornment={
                        <InputAdornment position="end">
                             {this.state.validacao_nome? <CheckIcon />: ''}
                        </InputAdornment>
                      }
                      labelWidth={50}
                    />
                   <FormHelperText error={this.state.erro_nome}>
                         {this.state.mensagem_nome}
                   </FormHelperText>
               </FormControl>      
              </div> 
              <div class="p-2">                                
              <div class="d-flex justify-content-start">
                  <div>
                  <FormControl variant="outlined">
                    <InputLabel className="label_text" htmlFor="filled-adornment-password">Número da CNH</InputLabel>
                     <OutlinedInput 
                        className="input_text"         
                        autoComplete="off"                                   
                        type="text"                       
                        error={this.state.erro_cpf}
                        helperText={this.state.mensagem_cpf}                     
                        id="cep_incluir"                      
                        variant="outlined"
                        value={this.state.campCNH}
                        onBlur={this.verificaCnhonblur}
                        onKeyUp={this.verificaCnh}
                      // onFocus={this.verificaCpf}
                        onChange={ (e) => {
                          this.Cnhchange(e)                       
                          this.validaCnhChange(e)
                        }}   
                        inputProps={{
                          maxLength: 14,
                        }}                                 
                      endAdornment={
                        <InputAdornment position="end">
                             {this.state.validacao_numero_carteira? <CheckIcon />: ''}
                        </InputAdornment>
                      }
                      labelWidth={140}
                    />                
                   <FormHelperText error={this.state.erro_numero_carteira}>
                         {this.state.mensagem_numero_carteira}
                   </FormHelperText>
                  </FormControl>                     
                  </div>
                  <div>
                  <FormControl variant="outlined">
                    <InputLabel className="input_date_motorista" htmlFor="filled-adornment-password">Data de validade</InputLabel>
                     <OutlinedInput    
                        autoComplete="off"                     
                        error={this.state.erro_dataCNH}
                        helperText={this.state.mensagem_datavalidade}
                        className="input_date_motorista"                       
                        id="data_incluir"                   
                        variant="outlined"
                        value={this.state.campData_CNH}
                        onBlur={this.verificaDataValidade}
                        onChange={ (e) => {
                          this.Data_validadeChange(e)                       
                          this.validaDataValidadeChange(e)
                        }}                                        
                        inputProps={{
                          maxLength: 10,
                        }}
                      endAdornment={
                        <InputAdornment position="end">
                             {this.state.validacao_dataCNH? <CheckIcon />: ''}
                        </InputAdornment>
                      }
                      labelWidth={140}                      
                    />
                   <FormHelperText error={this.state.erro_dataCNH}>
                         {this.state.mensagem_datavalidade}
                   </FormHelperText>
                </FormControl>  
                  </div>
                </div>      
              </div>
              <div class="p-2">
              <FormControl variant="outlined">
                    <InputLabel className="label_text" htmlFor="filled-adornment-password">Email</InputLabel>
                     <OutlinedInput          
                        autoComplete="off"                  
                        type="email"
                        error={this.state.erro_email}
                        helperText={this.state.mensagem_email}
                        className="data_text"                       
                        id="email_incluir"                   
                        variant="outlined"
                        value={this.state.campEmail}
                        onBlur={this.verificaEmail}                     
                        onFocus={this.verificaEmailonfocus}
                        onChange={ (e) => {
                                    this.emailchange(e) 
                                    this.validateEmail(e)
                                    this.validaEmailChange(e)                                
                                  } }       
                        inputProps={{
                            maxLength: 50,
                        }}                            
                      endAdornment={
                        <InputAdornment position="end">
                             {this.state.validacao_email? <CheckIcon />: ''}
                        </InputAdornment>
                      }
                      labelWidth={50}                      
                    />
                   <FormHelperText error={this.state.erro_email}>
                         {this.state.mensagem_email}
                   </FormHelperText>
                </FormControl>   
              </div>
              <div class="p-2">
                <div class="d-flex justify-content-start">
                  <div>            
                  <FormControl variant="outlined">
                    <InputLabel className="input_text_motorista_novo" htmlFor="filled-adornment-password">Telefone</InputLabel>
                     <OutlinedInput     
                        autoComplete="off"                              
                        type="text"                                      
                        error={this.state.erro_telefone}
                        helperText={this.state.mensagem_telefone1}
                        className="input_text_motorista_novo"                       
                        id="telefone_incluir"                   
                        variant="outlined"
                        value={this.state.campTelefone1}                
                        onKeyUp={this.verificaTelefone1}            
                        onFocus={this.verificaTelefone1onfocus}
                        onChange={ (e) => {
                          this.telefone1change(e)                       
                          this.validatelefone1Change(e)
                        }}                                      
                      endAdornment={
                        <InputAdornment position="end">
                             {this.state.validacao_telefone? <CheckIcon />: ''}
                        </InputAdornment>
                      }
                      labelWidth={80}                      
                    />
                   <FormHelperText error={this.state.erro_telefone}>
                         {this.state.mensagem_telefone1}
                   </FormHelperText>
                </FormControl>        
                  </div>
                  
                  <div>     
                  <FormControl component="fieldset">
                      <FormGroup aria-label="position" row>
                        <FormControlLabel
                          className="bilingue_texto"
                          value={this.state.campMotorista_bilingue}
                          control={<Switch color="primary" checked={this.state.campMotorista_bilingue} onChange={this.handleChange}/>}
                          label="Bilingue?"
                          labelPlacement="start"
                        />                       
                      </FormGroup>
                    </FormControl>                                          
                  </div>                    
                 </div>     
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
export default motoristaComponent;