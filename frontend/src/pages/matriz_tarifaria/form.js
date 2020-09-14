import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import {Form, Progress, FormFeedback, Button, Alert } from 'reactstrap';
import {Link} from 'react-router-dom';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { valorMask } from '../formatacao/valormask';
import { numeroMask } from '../formatacao/numeromask';
import { cepremoveMask } from '../formatacao/cepremovemask';
import Menu_administrador from '../administrador/menu_administrador';

import api from '../../services/api';
import './matriz.css';

const andamento_cadastro = localStorage.getItem('logprogress');     
const cep_empresa = localStorage.getItem('logcep');     
//const userId = localStorage.getItem('logid');
const dataendereco = localStorage.getItem('logdataCliente');
const buscadorcep = require('buscadorcep');

//import { Area_direita, Area_esquerda, Titulo_logo, Logo, Titulo_representante, Preview } from "./style_empresarial";
class empresarialComponent extends React.Component{  

  constructor(props){
    super(props);

    this.state = {    
      camptipoId: '',    
      campfaixa_inicial: '',    
      campfaixa_final: '',    
      campvalor_km: '',    
      campvalor_tempo: '',      
      campbandeira: '',    
      campreceptivo: '',    
      campbilingue: '',    
      camppedagio: '',     
      erro_faixa_1: false,
      erro_faixa_2: false,
      erro_tipo: false,
      erro_bandeira: false,
      erro_bilingue: false,
      erro_valorkm: false,
      erro_receptivo: false,
      erro_valortempo: false,
      listTipoTransporte: [],       
      //listaMatriz: [], 
      inicio: 1,
      mensagem_tipoId: '',            
      mensagem_faixa_inicial: '',            
      mensagem_faixa_final: '',            
      mensagem_valor_km: '',            
      mensagem_valor_tempo: '',              
      mensagem_bandeira: '',            
      mensagem_receptivo: '',            
      mensagem_bilingue: '',            
      mensagem_pedagio: '',                  
      validate: {
        tipoIdState: '',
        faixa_inicialState: '',
        faixa_finalState: '',
        valor_kmState: '',
        valor_tempoState: '',
        bandeiraState: '',
        receptivoState: '',
        bilingueState: '',
        pedagioState: '',     
      }    
    }
          
    this.tipoChange = this.tipoChange.bind(this);
    this.faixa_inicialchange = this.faixa_inicialchange.bind(this);
    this.faixa_finalchange = this.faixa_finalchange.bind(this);
    this.valor_kmchange = this.valor_kmchange.bind(this);
    this.valor_tempochange = this.valor_tempochange.bind(this);
    this.bandeirachange = this.bandeirachange.bind(this);
    this.receptivochange = this.receptivochange.bind(this);
    this.bilinguechange = this.bilinguechange.bind(this);
  
    this.verificafaixa_inicialOnblur = this.verificafaixa_inicialOnblur.bind(this);
    this.verificafaixa_finalOnblur = this.verificafaixa_finalOnblur.bind(this);

    this.verificaTipo_veiculo = this.verificaTipo_veiculo.bind(this);
    this.verificafaixa_inicial = this.verificafaixa_inicial.bind(this);
    this.verificafaixa_final = this.verificafaixa_final.bind(this);
    this.verificavalor_km = this.verificavalor_km.bind(this);
    this.verificavalor_tempo = this.verificavalor_tempo.bind(this);
    this.verificabandeira = this.verificabandeira.bind(this);
    this.verificareceptivo = this.verificareceptivo.bind(this);
    this.verificabilingue = this.verificabilingue.bind(this);

    this.validateBilingueChange = this.validateBilingueChange.bind(this);
    
  //  this.verificaEstado = this.verificaEstado.bind(this);  
   

    //this.validaCepChange = this.validaCepChange.bind(this);  

   

    //this.verifica_nome_individual = this.verifica_nome_individual.bind(this);
    
  }

  componentDidMount(){    
    const { validate } = this.state    

    let userId = this.props.match.params.id;

    const perfillog = localStorage.getItem('loperfil');
    localStorage.setItem('logid', userId);      

    this.loadTipoTransporte();
/*
    this.setState({
      erro_faixa_1: true,
      mensagem_faixa_inicial: "erro teste"
    }) */
    
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
  
  loadTipoTransporte() {
    api.get('/tipoTransporte/list')
    .then(res=>{
      if (res.data.success == true) {
        const data = res.data.data

        this.setState({listTipoTransporte:data})
      }     
    })
    .catch(error=>{
      alert("Error server "+error)
    })

  }   

  validateBilingueChange(e){
    const { validate } = this.state
     
      if (e.target.value.length > 0) {
          validate.bilingueState = 'has-success'       
          this.setState({ mensagem_bilingue: '' })  

          this.setState({ 
            inicio: 2,
            progresso: 100
          });                               
      }  
      this.setState({ validate })
      this.verifica_botao(this.state.inicio)
  }

tipoChange(e) {  
  this.setState({ camptipoId: e.target.value })  
}
faixa_inicialchange(e) {
  this.setState({ campfaixa_inicial: e.target.value })
}
faixa_finalchange(e) {
  this.setState({ campfaixa_final: e.target.value })
}

valor_kmchange(e) {
  this.setState({ campvalor_km: valorMask(e.target.value) })
}
valor_tempochange(e) {
  this.setState({ campvalor_tempo: valorMask(e.target.value) })
}
bandeirachange(e) {
  this.setState({ campbandeira: valorMask(e.target.value) })
}
bilinguechange(e) {
  this.setState({ campbilingue: valorMask(e.target.value) })  

}
receptivochange(e) {
  this.setState({ campreceptivo: valorMask(e.target.value) })
}

verificaTipo_veiculo(e) {  
     if (this.state.camptipoId == 0) {     
      this.setState({         
        erro_tipo: true,  
        inicio: 1,        
        mensagem_tipoId: "O Tipo Veículo é obrigatório."  
       })            
     } else {      
      this.setState({ 
        erro_tipo: false,  
        inicio: 2,        
        mensagem_tipoId: ""  
       })           
   //    this.verifica_botao(this.state.inicio) 
     }     
}

verificafaixa_inicial(e) {
  const { validate } = this.state
     if (e.target.value.trim().length == 0) {    
      this.setState({ 
        erro_faixa_1: true,
        inicio: 1,                
        mensagem_faixa_inicial: ""  
       })            
     } else {     
      validate.faixa_inicialState = 'has-success'
      this.setState({ 
        validate,
        erro_faixa_1: false,
        inicio: 2,        
        mensagem_faixa_inicial: ""  
       })            
     //  this.verifica_botao(this.state.inicio)
     }     
}
verificafaixa_inicialOnblur(e) {
  const { validate } = this.state
     if (e.target.value.trim().length == 0) {    
      this.setState({ 
        erro_faixa_1: true,
        inicio: 1,                
        mensagem_faixa_inicial: "O Faixa Inicial é obrigatório."  
       })            
     } else {     
      validate.faixa_inicialState = 'has-success'
      this.setState({ 
        validate,
        erro_faixa_1: false,
        inicio: 2,        
        mensagem_faixa_inicial: ""  
       })            
     //  this.verifica_botao(this.state.inicio)
     }     
}
verificafaixa_final(e) { 
  const { validate } = this.state
     if (e.target.value.trim().length == 0) {      
      this.setState({ 
        erro_faixa_2: true,
        inicio: 1,        
        mensagem_faixa_final: ""  
       })            
     } else {     
      validate.faixa_finalState = 'has-success'
      this.setState({         
        validate,
        erro_faixa_2: false,
        inicio: 2,        
        mensagem_faixa_final: ""  
       })            
      // this.verifica_botao(this.state.inicio)
     }        
}
verificafaixa_finalOnblur(e) { 
  const { validate } = this.state
     if (e.target.value.trim().length == 0) {      
      this.setState({ 
        erro_faixa_2: true,
        inicio: 1,        
        mensagem_faixa_final: "O Faixa Final é obrigatório."  
       })            
     } else {     
      validate.faixa_finalState = 'has-success'
      this.setState({         
        validate,
        erro_faixa_2: false,
        inicio: 2,        
        mensagem_faixa_final: ""  
       })            
      // this.verifica_botao(this.state.inicio)
     }        
}
verificavalor_km(e) {  
     if (e.target.value.trim().length == 0) {  
      this.setState({ 
        erro_valorkm: true,
        inicio: 1,        
        mensagem_valor_km: "O Valor KM é obrigatório."  
       })            
     } else {     
     // validate.faixa_finalState = 'has-success'
      this.setState({         
      //  validate,
        erro_valorkm: false,
        inicio: 2,        
        mensagem_valor_km: ""  
       })            
       //this.verifica_botao(this.state.inicio)
     }            
}
verificavalor_tempo(e) {
  //const { validate } = this.state
     if (e.target.value.trim().length == 0) {
     // validate.valor_tempoState = "has-danger"
      this.setState({ 
    //    validate,
        erro_valortempo: true,
        inicio: 1,        
        mensagem_valor_tempo: "O Valor Tempo é obrigatório."  
       })            
     } else {     
      // validate.faixa_finalState = 'has-success'
       this.setState({         
       //  validate,
         erro_valortempo: false,
         inicio: 2,        
         mensagem_valor_tempo: ""  
        })            
        //this.verifica_botao(this.state.inicio)
      }              
}
verificabandeira(e) {
 // const { validate } = this.state
     if (e.target.value.trim().length == 0) {
   //   validate.bandeiraState = 'has-danger'
      this.setState({ 
     //   validate,
        erro_bandeira: true,
        inicio: 1,        
        mensagem_bandeira: "O Valor Bandeira é obrigatório."  
       })            
     } else {     
      // validate.faixa_finalState = 'has-success'
       this.setState({         
       //  validate,
         erro_bandeira: false,
         inicio: 2,        
         mensagem_bandeira: ""  
        })            
       // this.verifica_botao(this.state.inicio)
      }               
}
verificabilingue(e) {
  //const { validate } = this.state
     if (e.target.value.trim().length == 0) {
    //  validate.bilingueState = 'has-danger'
      this.setState({ 
      //  validate,
        erro_bilingue: true,
        inicio: 1,        
        mensagem_bilingue: "O Valor Belingue é obrigatório."  
       })            
     } else {     
      // validate.faixa_finalState = 'has-success'
       this.setState({         
       //  validate,
         erro_bilingue: false,
         inicio: 2,        
         mensagem_bilingue: ""  
        })            
       // this.verifica_botao(this.state.inicio)
      }       
}
verificareceptivo(e) {
  //const { validate } = this.state
     if (e.target.value.trim().length == 0) {
    //  validate.receptivoState = 'has-danger'
      this.setState({ 
      //  validate,
        erro_receptivo: true,
        inicio: 1,        
        mensagem_receptivo: "O Valor Receptivo é obrigatório."  
       })            
     } else {     
      // validate.faixa_finalState = 'has-success'
       this.setState({         
       //  validate,
         erro_receptivo: false,
         inicio: 2,        
         mensagem_receptivo: ""  
        })            
        this.verifica_botao(this.state.inicio)
      }       
}

loadFillData(){  
  
  return this.state.listTipoTransporte.map((data)=>{          
    return(
       <MenuItem value={data.id}>{data.descricao}</MenuItem>      
    )
  })
}

verifica_botao(inicio) {
//  const { validate } = this.state
//console.log('inicio - '+ inicio);
//console.log('logperfil - '+ localStorage.getItem('logperfil'));
//console.log('this.state - '+JSON.stringify(this.state, null, "    ")); 

  if (localStorage.getItem('logperfil') == 1) {
      if (inicio == 1) {
        return (
    
          <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_endereco"  p={2} >
                  <div className="d-flex justify-content-center">
                  <label> Incluir </label>
                   </div>     
             </Box>           
         );   
      } else {
        /*
          if ( validate.tipoIdState == 'has-success' && validate.bandeiraState == 'has-success'  
          && validate.bilingueState == 'has-success' && validate.faixa_finalState == 'has-success'
          && validate.faixa_inicialState == 'has-success' && validate.receptivoState == 'has-success'
          && validate.valor_kmState == 'has-success' && validate.valor_tempoState == 'has-success'
          && validate.tipoIdState == 'has-success') { */
              if ( this.state.campbandeira !== "" && this.state.campbilingue !== ""  
                && this.state.campfaixa_final !== "" && this.state.campfaixa_inicial !== ""
                && this.state.campreceptivo !== "" && this.state.campvalor_km !== ""
                && this.state.camptipoId !== "" && this.state.campvalor_tempo !== "") {
              return (
                <Box bgcolor="error.main" color="error.contrastText" className="botao_cadastro_endereco_habilitado"  p={2} onClick={()=>this.sendUpdate()}>
                <div className="d-flex justify-content-center">
                <label> Incluir </label>
                </div>     
                </Box>           
              );         
        } else {
          return (

            <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_endereco"  p={2}>
                    <div className="d-flex justify-content-center">
                    <label> Incluir </label>
                    </div>     
              </Box>           
          );   
        } 
     }              
    }
  } 

  verificar_menu() {   

    if (localStorage.getItem('logperfil') == 1) {  //ADMINISTRADOR
      return(
        <div>
      <div className="d-flex justify-content-around">
             <div className="botao_navegacao">
                 <Link to="/matriz_listar"> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
               </div>                  
               <div>
                 <div className="titulo_representante">                
                     <label>Cadastre a Matriz Tarifária. </label>             
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
sendUpdate(){        
 
  const datapost = {
    tipoTransporteId: this.state.camptipoId,
    faixa_inicial: this.state.campfaixa_inicial,
    faixa_final: this.state.campfaixa_final,
    valor_km: this.state.campvalor_km,
    valor_tempo: this.state.campvalor_tempo,
    bandeira: this.state.campbandeira,
    receptivo: this.state.campreceptivo,
    bilingue: this.state.campbilingue,
    pedagio: 0.00    
  }          

        console.log(JSON.stringify(datapost, null, "    ")); 
        api.post('/matriz/create', datapost)
        .then(response=>{
          
          if (response.data.success==true) {                        

              if (localStorage.getItem('logperfil') == 1) {
                localStorage.setItem('logperfil', 1);
                const { validate } = this.state          

                validate.bandeiraState = ''       
                validate.bilingueState = ''       
                validate.faixa_finalState = ''       
                validate.faixa_inicialState = ''       
                validate.receptivoState = ''       
                validate.tipoIdState = ''       
                validate.valor_kmState = ''       
                validate.valor_tempoState = ''                       
                this.setState({ 
                  mensagem_tipoId: '',            
                  mensagem_faixa_inicial: '',            
                  mensagem_faixa_final: '',            
                  mensagem_valor_km: '',            
                  mensagem_valor_tempo: '',              
                  mensagem_bandeira: '',            
                  mensagem_receptivo: '',            
                  mensagem_bilingue: '',            
                  mensagem_pedagio: '',   
                })  
      
                this.setState({ 
                  inicio: 1,
                  progresso: 0,
                  camptipoId: '',    
                  campfaixa_inicial: '',    
                  campfaixa_final: '',    
                  campvalor_km: '',    
                  campvalor_tempo: '',      
                  campbandeira: '',    
                  campreceptivo: '',    
                  campbilingue: '',    
                  camppedagio: '',   
                });        
                
                this.setState({ validate })
                this.verifica_botao(this.state.inicio)

                this.props.history.push(`/matriz_criar`); 
              }                           
  
          }
          else {
            alert("Error de conexao ")              
          }
        }).catch(error=>{
          alert("Erro verificar log  ")
        })
}  
/*
handleChange = (prop) => (event) => {
  setValues({ ...values, [prop]: event.target.value });
};
*/

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
              <FormControl variant="outlined" className="select_matriz_tipo">
                <InputLabel id="demo-simple-select-outlined-label">Tipo Transporte *</InputLabel>
                <Select
                  error={this.state.erro_tipo} 
                  helperText={this.state.mensagem_tipoId}
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={this.state.camptipoId}
                  onFocus={this.verificaTipo_veiculo}
                  //onClick={this.verificaTipo_veiculo}
                  onChange={ (e) => {
                    this.tipoChange(e)
                  }}    
                  label="Tipo Transporte"
                >
                  {this.loadFillData()}                    
                </Select>
              </FormControl>                                                                    
              </div>              
              <div class="p-2">               
                  <div class="d-flex justify-content-start">
                       <div>
                       <TextField 
                       error={this.state.erro_faixa_1} 
                       helperText={this.state.mensagem_faixa_inicial}
                       className="input_matriz_faixa_ini"                       
                       id="outlined-basic" 
                       label="Faixa Inicial *" 
                       variant="outlined"
                       value={this.state.campfaixa_inicial}
                      // valid={ this.state.validate.faixa_inicialState === 'has-success' }
                      // invalid={ this.state.validate.faixa_inicialState === 'has-danger' }
                       onKeyUp={this.verificafaixa_inicial}
                       onFocus={this.verificafaixa_inicial}
                       onChange={ (e) => {
                          this.faixa_inicialchange(e)
                       }}      
                        maxlength="6"                                                                    
                       />                                           
                       <FormFeedback>
                            {this.state.mensagem_faixa_inicial}
                       </FormFeedback>     
                       </div> 
                       
                       <div>
                       <TextField 
                       className="input_matriz_faixa_fim"
                       error={this.state.erro_faixa_2} 
                       helperText={this.state.mensagem_faixa_final}
                       id="outlined-basic" 
                       label="Faixa Final *" 
                       variant="outlined"
                       value={this.state.campfaixa_final}
                         //   valid={ this.state.validate.faixa_finalState === 'has-success' }
                         //   invalid={ this.state.validate.faixa_finalState === 'has-danger' }
                            onFocus={this.verificafaixa_final}
                            onKeyUp={this.verificafaixa_final}
                            onChange={ (e) => {
                              this.faixa_finalchange(e)
                            }}          
                            maxlength="60"
                       />                                                                
                          <FormFeedback className="label_complemento"     
                          invalid={this.state.validate.faixa_finalState}>
                              {this.state.mensagem_faixa_final}
                          </FormFeedback>       
                       </div>                        
                  </div>
              </div> 
              <div class="p-2">    
                 <div class="d-flex justify-content-start">
                       <div>                                                
                          <FormControl className="input_matriz_valor_km" variant="outlined">
                          <InputLabel htmlFor="standard-adornment-amount">Valor KM *</InputLabel>
                          <OutlinedInput
                            id="standard-adornment-amount"  
                            error={this.state.erro_valorkm} 
                            helperText={this.state.mensagem_valor_km}                          
                            placeholder=""
                            autoComplete='off'
                            autoCorrect='off'
                            value={this.state.campvalor_km}
                            valid={ this.state.validate.valor_kmState === 'has-success' }
                            invalid={ this.state.validate.valor_kmState === 'has-danger' }
                            onFocus={this.verificavalor_km}
                            onKeyUp={this.verificavalor_km}
                            onChange={(e) => {
                              this.valor_kmchange(e)
                            }}    
                            maxlength="75"
                            startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                            labelWidth={80}
                          />
                        </FormControl>                           
                          <FormFeedback 
                          invalid={this.state.validate.valor_kmState}>
                              {this.state.mensagem_valor_km}
                          </FormFeedback>     
                       </div>
                     <div>
                     <FormControl className="input_matriz_faixa_fim" variant="outlined">
                          <InputLabel htmlFor="standard-adornment-amount">Valor Tempo *</InputLabel>
                          <OutlinedInput
                            id="standard-adornment-amount"
                            error={this.state.erro_valortempo} 
                            helperText={this.state.mensagem_valor_tempo}   
                            placeholder=""
                            autoComplete='off'
                            autoCorrect='off'                           
                            value={this.state.campvalor_tempo}
                            valid={ this.state.validate.valor_tempoState === 'has-success' }
                            invalid={ this.state.validate.valor_tempoState === 'has-danger' }
                            onFocus={this.verificavalor_tempo}
                            onKeyUp={this.verificavalor_tempo}
                            onChange={ (e) => {
                              this.valor_tempochange(e)                                                
                            }}            
                            maxlength="50"         
                            startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                            labelWidth={110}
                          />
                        </FormControl>                       
                      <FormFeedback className="label_cidade"
                      invalid={this.state.validate.valor_tempoState}>
                          {this.state.mensagem_valor_tempo}
                      </FormFeedback>  
                     </div>                                        
               </div>    
            </div>      
            <div class="p-2">    
                 <div class="d-flex justify-content-start">
                       <div>
                       <FormControl className="input_matriz_valor_km" variant="outlined">
                          <InputLabel htmlFor="standard-adornment-amount">Valor da Bandeira *</InputLabel>
                          <OutlinedInput
                            id="standard-adornment-amount"
                            error={this.state.erro_bandeira} 
                            helperText={this.state.mensagem_bandeira}   
                            placeholder=""                            
                            autoComplete='off'
                            autoCorrect='off'
                            value={this.state.campbandeira}
                            valid={ this.state.validate.bandeiraState === 'has-success' }
                            invalid={ this.state.validate.bandeiraState === 'has-danger' }
                            onFocus={this.verificabandeira}
                            onKeyUp={this.verificabandeira}
                            onChange={(e) => {
                              this.bandeirachange(e)
                            }}                                                                          
                            maxlength="75"         
                            startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                            labelWidth={160}
                          />
                        </FormControl>                                                                          
                          <FormFeedback 
                          invalid={this.state.validate.bandeiraState}>
                              {this.state.mensagem_bandeira}
                          </FormFeedback>     
                       </div>
                     <div>
                     <FormControl className="input_matriz_faixa_fim" variant="outlined">
                          <InputLabel htmlFor="standard-adornment-amount">Valor Receptivo *</InputLabel>
                          <OutlinedInput
                            id="standard-adornment-amount"
                            error={this.state.erro_receptivo} 
                            helperText={this.state.mensagem_receptivo}   
                            placeholder=""                                                      
                            autoComplete='off'
                            autoCorrect='off'
                            value={this.state.campreceptivo}
                            valid={ this.state.validate.receptivoState === 'has-success' }
                            invalid={ this.state.validate.receptivoState === 'has-danger' }
                            onFocus={this.verificareceptivo}
                            onKeyUp={this.verificareceptivo}
                            onChange={ (e) => {
                              this.receptivochange(e)                                                
                            }}            
                            maxlength="50"          
                            startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                            labelWidth={140}
                          />
                        </FormControl>                                 
                      <FormFeedback className="label_cidade"
                      invalid={this.state.validate.receptivoState}>
                          {this.state.mensagem_receptivo}
                      </FormFeedback>  
                     </div>                                        
               </div>    
            </div>  
            <div class="p-2">    
                 <div class="d-flex justify-content-start">
                       <div>
                       <FormControl className="input_matriz_valor_km" variant="outlined">
                          <InputLabel htmlFor="standard-adornment-amount">Valor bilingue *</InputLabel>
                          <OutlinedInput
                            id="standard-adornment-amount"
                            error={this.state.erro_bilingue} 
                            helperText={this.state.mensagem_bilingue}   
                            placeholder=""
                            autoComplete='off'
                            autoCorrect='off'
                            value={this.state.campbilingue}
                            valid={ this.state.validate.bilingueState === 'has-success' }
                            invalid={ this.state.validate.bilingueState === 'has-danger' }
                            onFocus={this.verificabilingue}
                            onKeyUp={this.verificabilingue}
                            onChange={(e) => {
                              this.bilinguechange(e)
                              this.validateBilingueChange(e)
                            }}                                                                          
                            maxlength="75"       
                            startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                            labelWidth={120}
                          />
                        </FormControl>                                                   
                          <FormFeedback 
                          invalid={this.state.validate.bilingueState}>
                              {this.state.mensagem_bilingue}
                          </FormFeedback>     
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
export default empresarialComponent;