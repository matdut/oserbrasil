import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import {Form, Progress, Input, FormFeedback, Label, Button, Alert } from 'reactstrap';

import {Link} from 'react-router-dom';
//import { cepMask } from '../../formatacao/cepmask';
import api from '../../services/api';
import './individual.css';

/* */
import Modal from 'react-modal';
import Icon from '@material-ui/core/Icon';
import Busca from '../maps2';
import GoogleMapReact from 'google-map-react';
/**/

import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@\$%\^&\*])(?=.{8,})");
//const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
const AnyReactComponent = ({ text }) => <div>{text}</div>;

const minimooitocaracterRegex = new RegExp("(?=.{8,})");
const umaletramaiusculaRegex = new RegExp("(?=.*?[A-Z])");
const umnumeroRegex = new RegExp("(?=.*[0-9])");
const umncaracterespecialRegex = new RegExp("(?=.*?[#?!@$%^&*-])");
//const controleRegex = new RegExp("(?=.{8,})(?=.*?[A-Z])(?=.*\d)[A-Za-z\d](?=.*?[#?!@$%^&*-])");

const andamento_cadastro = localStorage.getItem('logprogress');     
//const userId = localStorage.getItem('logid');
const buscadorcep = require('buscadorcep');
const customStyles = {
  overlay: {    
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.65)'
   // backgroundColor: 'rgba(255, 255, 255, 0.75)'
  },
  content : {
    top                    : '0px',
    left                   : '60%',    
    right                  : '0%',
    bottom                 : 'auto',  
    height                 : '100%',    
    width                  : '40%',    
    padding                : '0px !important',      
    overflow               : 'auto',
    WebkitOverflowScrolling: 'touch',
    position               : 'absolute',
    border: '1px solid #ccc',   
  }
};
//import { Area_direita, Area_esquerda, Titulo_logo, Logo, Titulo_representante, Preview } from "./style_empresarial";
class servicosComponent extends React.Component{  

  constructor(props){
    super(props);
    this.state = {   
      camptipoId: '',    
      camptiposervicoId: '',
      inicio: 1,     
      campNome_passageiro: "", 
      campQuantidade_passageiro: "", 
      campData_evento: "",
      campHora_inicial: "",  
      campLocal_embarque: "", 
      campLocal_desembarque: "", 
      campMotorista_bilingue: false, 
      campMotorista_receptivo: false, 
      campMotorista_preferencial: false,     
      campTelefone_motorista: "", 
      campKm_translado: "", 
      campTempo_translado: "", 
      campValor_estimado: "",      
      showModalEmbarque: false,
      showModalDesembarque: false,
      listTipoTransporte: [],
      listaTipoEvento: [],
      mensagem_tipo_servico: '',
      mensagem_tipoId: '',
      mensagem_Nome_passageiroState: "", 
      mensagem_Quantidade_passageiroState: "", 
      mensagem_Data_evento: "",
      mensagem_Hora_inicial: "",  
      mensagem_Local_embarque: "", 
      mensagem_Local_desembarque: "", 
      mensagem_Motorista_bilingue: "", 
      mensagem_Motorista_receptivo: "", 
      mensagem_Motorista_preferencial: "",     
      mensagem_Telefone_motorista: "", 
      mensagem_Km_translado: "", 
      mensagem_Tempo_translado: "", 
      mensagem_Valor_estimado: "",      
      validate: {
        senhaState: '',       
        tipoIdState: '',       
        tiposervicoIdState: '',       
        Nome_passageiroState: "", 
        Quantidade_passageiroState: "", 
        Data_inicialState: "",
        Hora_inicialState: "",  
        Local_embarqueState: "", 
        Local_desembarqueState: "", 
        Motorista_bilingueState: "", 
        Motorista_receptivoState: "", 
        Motorista_preferencialState: "",     
        Telefone_motoristaState: "", 
        Km_transladoState: "", 
        Tempo_transladoState: "", 
        Valor_estimadoState: "",      
      }    
    }            

    this.tiposervicoChange = this.tiposervicoChange.bind(this);   
    this.tipoIdChange = this.tipoIdChange.bind(this);   

    this.verifica_tipo_servico = this.verifica_tipo_servico.bind(this);   
    this.verifica_tipo_transporte = this.verifica_tipo_transporte.bind(this);   

    this.handleOpenModalEmbarque = this.handleOpenModalEmbarque.bind(this);
    this.handleOpenModalDesembarque = this.handleOpenModalDesembarque.bind(this);
    this.handleCloseModalEmbarque = this.handleCloseModalEmbarque.bind(this);
    this.handleCloseModalDesembarque = this.handleCloseModalDesembarque.bind(this);     
    
  }

  componentDidMount(){  
    let userId = this.props.match.params.id;   

    localStorage.setItem('logid', userId);

    this.carrega_tipo_servico();  
    this.carrega_TipoTransporte();

  }

   handleOpenModalEmbarque () {
      this.setState({ showModalEmbarque: true });
    }
    handleOpenModalDesembarque () {
      this.setState({ showModalDesembarque: true });
    }
    
    handleCloseModalEmbarque () {
      this.setState({ showModalEmbarque: false });
    }
    handleCloseModalDesembarque () {
      this.setState({ showModalDesembarque: false });
    }


  carrega_tipo_servico() {
    api.get('/tipoevento/list')
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data
        this.setState({listaTipoEvento:data})
      }
      else {
        alert("Erro de conexão")
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  } 
  
  carrega_TipoTransporte() {
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
  
sendUpdate(){    

}  

verifica_botao(inicio) {
  const { validate } = this.state;
  //console.log(JSON.stringify(this.state, null, "    "));
  //console.log(JSON.stringify(inicio, null, "    "));
  if (localStorage.getItem('logperfil') == 0) {

      if (inicio == 1) {
        return (

          <Box bgcolor="text.disabled" color="background.paper" className="botao_cliente_senha"  p={2} >
                  <div className="d-flex justify-content-center">
                  <label> Próximo </label>
                  </div>     
            </Box>           
        );   
      } else {
      
          if (validate.oitocaracteresState == 'has-success' && validate.umaletramaiusculaState == 'has-success' 
                && validate.umnumeroState == 'has-success' ) {

          
              if (this.state.campSenha !== '' && this.state.campSenhaTeste !== '' 
                  && this.state.campSenha == this.state.campSenhaTeste) {
                return (
                  <Box bgcolor="error.main" color="error.contrastText" className="botao_cliente_senha_habilitado"  p={2} onClick={()=>this.sendUpdate()}>
                  <div className="d-flex justify-content-center">
                  <label> Próximo </label>
                  </div>     
                  </Box>           
                );
              } else {
                return (

                  <Box bgcolor="text.disabled" color="background.paper" className="botao_cliente_senha"  p={2} >
                          <div className="d-flex justify-content-center">
                          <label> Próximo </label>
                          </div>     
                    </Box>                        
                    
                );     
              }

            } else {
        
              return (

                <Box bgcolor="text.disabled" color="background.paper" className="botao_cliente_senha"  p={2} >
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

          <Box bgcolor="text.disabled" color="background.paper" className="botao_cliente_senha"  p={2} >
                  <div className="d-flex justify-content-center">
                  <label> Salvar Alterações </label>
                  </div>     
            </Box>           
        );   
      } else {
           if (validate.oitocaracteresState == 'has-success' && validate.umaletramaiusculaState == 'has-success' 
                && validate.umnumeroState == 'has-success' ) {

          
              if (this.state.campSenha !== "" && this.state.campSenhaTeste !== "" 
                  && this.state.campSenha == this.state.campSenhaTeste) {
                return (
                  <Box bgcolor="error.main" color="error.contrastText" className="botao_cliente_senha_habilitado"  p={2} onClick={()=>this.sendUpdate()}>
                  <div className="d-flex justify-content-center">
                  <label> Salvar Alterações </label>
                  </div>     
                  </Box>           
                );
              } else {
                return (

                  <Box bgcolor="text.disabled" color="background.paper" className="botao_cliente_senha"  p={2} >
                          <div className="d-flex justify-content-center">
                          <label> Salvar Alterações </label>
                          </div>     
                    </Box>                        
                    
                );     
              }
            }    
       }      

    } else if (localStorage.getItem('logperfil') == 7) {  
    
      if (inicio == 1) {
        return (

          <Box bgcolor="text.disabled" color="background.paper" className="botao_cliente_senha"  p={2} >
                  <div className="d-flex justify-content-center">
                  <label> Próximo </label>
                  </div>     
            </Box>           
        );   
      } else {
           if (validate.oitocaracteresState == 'has-success' && validate.umaletramaiusculaState == 'has-success' 
                && validate.umnumeroState == 'has-success') {

          
              if (this.state.campSenha.length > 0 && this.state.campSenhaTeste.length > 0 
                  && this.state.campSenha == this.state.campSenhaTeste) {
                return (
                  <Box bgcolor="error.main" color="error.contrastText" className="botao_cliente_senha_habilitado"  p={2} onClick={()=>this.sendUpdate()}>
                  <div className="d-flex justify-content-center">
                  <label> Próximo </label>
                  </div>     
                  </Box>           
                );
              } else {
                return (

                  <Box bgcolor="text.disabled" color="background.paper" className="botao_cliente_senha"  p={2} >
                          <div className="d-flex justify-content-center">
                          <label> Próximo </label>
                          </div>     
                    </Box>                        
                    
                );     
              }
            }    
          }    
    } 
} 

verifica_nome(nome){
  let nome_titulo = nome.substring(0,nome.indexOf(" ")) 
  if (nome_titulo == "") {
    nome_titulo = nome
  }
  return(    
        nome_titulo          
     );  
} 

verificar_menu() {   

  if (localStorage.getItem('logperfil') == 0) {
   
   return(
    <div>
    <div className="d-flex justify-content-around">
             <div className="botao_navegacao">
                <Link to={`/cliente/`+localStorage.getItem('logid')}> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
               </div>                  
               <div>
                 <div className="titulo_representante">                
                  <label>{this.verifica_nome(this.state.campNome)}, Cadastre a sua senha de acesso  </label>       
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
               <Link to={`/cliente/`+localStorage.getItem('logid')}> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
                 </div>                  
                 <div>
                   <div className="titulo_representante">                
                    <label>{this.verifica_nome(this.state.campNome)}, Cadastre a sua senha de acesso  </label>       
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
             <Progress color="warning" value={50} className="progressbar"/>
          </div>
     </div>    
      );

  } else if (localStorage.getItem('logperfil') == 7) { // CLIENTE EMPRESARIAL             

    return(
      <div className="d-flex justify-content-around">
          <div className="botao_navegacao">
                 <Link to={`/lista_evento_servico/`+localStorage.getItem('logid')}> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
               </div>                  
               <div>
                 <div className="titulo_representante">                
                  <label>  Adicione seu Serviço </label>       
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

tiposervicoChange (e) {
  this.setState({ camptiposervicoId: e.target.value });
}

tipoIdChange (e) {
  this.setState({ camptipoId: e.target.value });
}

verifica_tipo_servico(e) {
   
  const { validate } = this.state
     if (e.target.value.length > 0) {          
      validate.tiposervicoIdState = ''
      this.setState({ 
        validate,
        inicio: 1,
        mensagem_tipo_servico: ''
       })      
     }        
 }

 verifica_tipo_transporte(e) {
   
  const { validate } = this.state
     if (e.target.value.length > 0) {          
      validate.tipoIdState = ''
      this.setState({ 
        validate,
        inicio: 1,
        mensagem_tipoId: ''
       })      
     }        
 }

loadTipoTranspData(){  
  
  return this.state.listTipoTransporte.map((data)=>{          
    return(
       <MenuItem value={data.id}>{data.descricao}</MenuItem>      
    )
  })
}

loadFillData(){

  return this.state.listaTipoEvento.map((data, index)=>{
    return(      
           <MenuItem value={data.id}>{data.descricao}</MenuItem>      
    )
  })
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
          <div class="d-flex flex-column espacamento_caixa_texto_senha">
              <div class="p-2">    
              <FormControl variant="outlined" className="select_matriz_tipo">
                <InputLabel id="demo-simple-select-outlined-label">Tipo do Serviço *</InputLabel>
                <Select
                  error={this.state.erro_tipo} 
                  helperText={this.state.mensagem_tipo_servico}
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={this.state.camptiposervicoId}
                  //onFocus={this.verifica_tipo_servico}
                  //onClick={this.verificaTipo_veiculo}
                  onChange={ (e) => {
                    this.tiposervicoChange(e)
                  }}                  
                  labelWidth={140}          
                >
                  {this.loadFillData()}                    
                </Select>
              </FormControl>                                   
              </div>              
              <div class="p-2">           
              <FormControl variant="outlined" className="select_matriz_tipo">
                <InputLabel id="demo-simple-select-outlined-label">Tipo de Transporte *</InputLabel>
                <Select
                  error={this.state.erro_tipo} 
                  helperText={this.state.mensagem_tipoId}
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={this.state.camptipoId}
                  onFocus={this.verificaTipo_veiculo}
                  //onClick={this.verificaTipo_veiculo}
                  onChange={ (e) => {
                    this.tipoIdChange(e)
                  }}    
                  labelWidth={180}                         
                >
                  {this.loadTipoTranspData()}                    
                </Select>
              </FormControl>      

              </div>      
              <div class="p-2">  
                 <label for="inputPassword4">Nome do passageiro *</label>
                    <Input                        
                        className="input_text_operadores"                        
                        type="text"
                        name="passageiro"
                        id="examplcpf"
                        autoComplete='off'
                        autoCorrect='off'
                       //ref={cepInput} 
                        placeholder=""
                        value={this.state.campNome_passageiro}
                        valid={ this.state.validate.Nome_passageiroState === 'has-success' }
                        invalid={ this.state.validate.Nome_passageiroState === 'has-danger' }
                        onBlur={this.verificaCpfOnblur}
                        onKeyUp={this.verificaCpf}                      
                        onChange={ (e) => {
                          this.cpfchange(e)                       
                          this.validaCpfChange(e)
                        }}         
                        maxlength="14"                                                                 
                      />                                
                      <FormFeedback 
                      invalid={this.state.validate.Nome_passageiroState}>
                          {this.state.mensagem_Nome_passageiroState}
                      </FormFeedback> 
              </div>
              <div class="p-2">  
                 <label for="inputPassword4">Quantidade de passageiros *</label>
                    <Input                        
                        className="input_text_operadores"                        
                        type="text"
                        name="passageiro"
                        id="examplcpf"
                        autoComplete='off'
                        autoCorrect='off'
                       //ref={cepInput} 
                        placeholder=""
                        value={this.state.campNome_passageiro}
                        valid={ this.state.validate.Nome_passageiroState === 'has-success' }
                        invalid={ this.state.validate.Nome_passageiroState === 'has-danger' }
                        onBlur={this.verificaCpfOnblur}
                        onKeyUp={this.verificaCpf}                      
                        onChange={ (e) => {
                          this.cpfchange(e)                       
                          this.validaCpfChange(e)
                        }}         
                        maxlength="14"                                                                 
                      />                                
                      <FormFeedback 
                      invalid={this.state.validate.Nome_passageiroState}>
                          {this.state.mensagem_Nome_passageiroState}
                      </FormFeedback> 
              </div>
              <div class="p-2">  
              <div class="d-flex justify-content-start">
                       <div> 
                        <Label for="exampleDatetime">Data do Serviço *</Label>
                              <Input
                                type="date"
                                name="date"
                                id="exampleDatetime"
                                placeholder=""
                                value={this.state.campData_inicial} 
                                onChange={this.handleDateChange}   
                              /> 
                       </div>
                       <div>
                       <Label className="texto_modelo" for="exampleDatetime">Hora do Serviço *</Label>
                        <Input
                          className="autocomplete_modelo"
                          type="time"
                          name="time"
                          id="exampleDatetime"
                          placeholder=""
                          value={this.state.campHora_inicial} 
                          onChange={(value)=> this.setState({campHora_inicial:value.target.value})} 
                        />   
                       </div>       
                  </div>       
              </div>
              <div class="p-2">  

              <Button color="primary" variant="contained"                         
                        onClick={()=>this.handleOpenModalEmbarque()}>
                 Local Embarque  <Icon className="fa fa-plus-circle" />
                 </Button>                  
                  <Modal 
                    isOpen={this.state.showModalEmbarque}
                    contentLabel="Minimal Modal Example"
                  >
                    <Button color="primary" variant="contained"                         
                        onClick={()=>this.handleCloseModalEmbarque()}>Close Modal</Button>    
                    <br/> 
                    <br/>                    
                    <TextField
                      id="standard-basic"
                      label="Local Embarque *"
                      style={{ margin: 0 }}
                      placeholder=""
                      helperText=""           
                      fullWidth
                      margin="normal"
                      value={this.state.campLocal_embarque} 
                      onChange={(value)=> this.setState({campLocal_embarque:value.target.value})}
                  />       
             
                  <br/>                         
                     <div style={{ height: '50vh', width: '50%' }}>                    
                        <GoogleMapReact
                          bootstrapURLKeys={{ key: "AIzaSyBTKs9MVXMJsl4GxSLtWnSnVbSs8hhL2p8" }}
                          defaultCenter={this.state.center}
                          defaultZoom={this.state.zoom}
                        >
                          <AnyReactComponent
                            lat={-22.880260}
                            lng={-42.373930}
                            text="Minha Localização"
                          />
                        </GoogleMapReact>                       
                    </div>         
                  </Modal> 
                </div>
            </div>                        
            
            {this.verifica_botao(this.state.inicio)}                                       
    </div>                 
   </div>  
</div> 
  );
}



}
export default servicosComponent;