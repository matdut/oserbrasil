import React, { useState }  from 'react';

//import {Form, Input, FormFeedback } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// google Maps //
import { Map, GoogleApiWrapper } from 'google-maps-react';


//import Switch from 'react-input-switch';
import Toggle from 'react-toggle';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DatePicker
} from '@material-ui/pickers';


import { cpfMask } from '../formatacao/cpfmask';
import { cepMask } from '../formatacao/cepmask';
import { cnpjMask } from '../formatacao/cnpjmask';
import { telefoneMask } from '../formatacao/telefonemask';
import Menu_evento from '../eventos/menu_evento' ;
import Menu from '../../pages/cabecalho' ;
import Menu_administrador from '../administrador/menu_administrador';
//import axios from 'axios';
import api from '../../services/api';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import 'sweetalert2/src/sweetalert2.scss';

const login = localStorage.getItem('logemail');              
const id = localStorage.getItem('logid');  
const buscadorcep = require('buscadorcep');
const Email_cliente = require('../../pages/email');
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

class eventoComponent extends React.Component{     

    constructor(props){
        super(props);
        this.state = {
           campNome_passageiro: "", 
           campQuantidade_passageiro: "", 
           campData_inicial: "",
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
           campSituacao: "", 
           campMotivo_cancelamento: "",
           evento_logado: "",
           gilad: true,
           nome: "",
           value1: 0,
           perfil: ""
        }            
        this.handleChangeBilingue = this.handleChangeBilingue.bind(this); 
        this.handleChangeReceptivo = this.handleChangeReceptivo.bind(this); 
        this.handleChangePreferencial = this.handleChangePreferencial.bind(this); 
        this.handleDateChange = this.handleDateChange.bind(this);      
     
      }
      componentDidMount(){  
        this.setState({
          perfil: localStorage.getItem('logperfil'),    
          nome: localStorage.getItem('lognome'),
          evento_logado: localStorage.getItem('logidEvento')      
        });        

        this.handleDateChange();

        let transladoId = this.props.match.params.id;
   
        api.get(`/translado/get/${transladoId}`)
        .then(res=>{
            if (res.data.success) {
              const data = res.data.data[0]
               
              this.setState({                         
                campNome_passageiro: data.nome_passageiro, 
                campQuantidade_passageiro: data.quantidade_passageiro, 
                campData_inicial: data.data_inicial,
                campHora_inicial: data.hora_inicial,  
                campLocal_embarque: data.local_embarque, 
                campLocal_desembarque: data.local_desembarque, 
                campMotorista_bilingue: data.motorista_bilingue, 
                campMotorista_receptivo: data.motorista_receptivo, 
                campMotorista_preferencial: data.motorista_preferencial,     
                campTelefone_motorista: data.telefone_motorista, 
                campKm_translado: data.km_translado, 
                campTempo_translado: data.tempo_translado, 
                campValor_estimado: data.valor_estimado,
                campSituacao: data.situacao, 
                campMotivo_cancelamento: data.motivo_cancelamento
              })          
            //  console.log( JSON.stringify(this.state, null, "    ") ); 
              
            }
            else {
              alert("Erro de conexão com o banco de dados")
            }
          })
          .catch(error=>{
            alert("Error server "+error)
          })    
   
    //this.loadEstados();
    //this.verifica_menu();
    //this.loadTipoTransporte();        

    }   
    // Handle fields change  
/*
    handleChange = (event) => {      
      this.setState({ [event.target.name]: event.target.checked });
      //console.log('state '+ e.target.value)
      console.log( JSON.stringify(this.state, null, "    ") ); 
    }; */

    handleChangeBilingue = (e) => {     
      this.setState({ campMotorista_bilingue: e.target.checked })       
     
    }     
    handleChangeReceptivo = (e) => {               
        this.setState({ campMotorista_receptivo: e.target.checked })
      //  console.log( JSON.stringify(this.state, null, "    ") ); 
    }     
    handleChangePreferencial = (e) => {         
        this.setState({ campMotorista_preferencial: e.target.checked })
    }     
  
    handleDateChange = (date) => {  
      //const searchDate = MomentUtils(date).format("yyyy-MM-DD");
      this.setState({ campData_inicial: date });    
    }

    voltarlistaClick = () => {
  
      this.props.history.push(`/listporevento/${localStorage.getItem('logidEvento')}`); 
    
    }
    
       render(){
       
        return (       
          <div>
              <div>
              <Menu_evento />  
              <br/>
              <div>
                <h2><center><stong>Atualizar Translados</stong></center></h2>
              </div>
            </div>    
            <div className="container">                      
             <div className="form-row">          
                <div className="form-group col-md-3">
                  <TextField
                      id="standard-basic"
                      label="Nome do passageiro *"
                      style={{ margin: 0 }}
                      placeholder=""
                      helperText=""           
                      margin="normal"
                      value={this.state.campNome_passageiro} 
                      onChange={(value)=> this.setState({campNome_passageiro:value.target.value})}
                  />                       
                </div>
                <div className="form-group col-md-3">
                  <TextField
                      id="standard-basic"
                      label="Qtd passageiros *"
                      style={{ margin: 0 }}
                      placeholder=""
                      helperText=""           
                      margin="normal"
                      value={this.state.campQuantidade_passageiro} 
                      onChange={(value)=> this.setState({campQuantidade_passageiro:value.target.value})}
                  />                       
                </div>
                <div className="form-group col-md-3">
                   <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            margin="normal"
                            defaultValue="12/08/2000"
                            id="date-picker-inline"
                            label="Data do Translado *"
                            format="dd/MM/yyyy"
                            value={this.state.campData_inicial} 
                            onChange={this.handleDateChange}   
                           // KeyboardButtonProps={{
                          //    'aria-label': 'change date',
                           // }}
                      />                                      
                    </MuiPickersUtilsProvider>                                                     
                </div>
                <div className="form-group col-md-3">
                <TextField
                    id="time"
                    label="Hora *"
                    type="time"
                    defaultValue="07:30"                       
                    value={this.state.campHora_inicial} 
                    onChange={(value)=> this.setState({campHora_inicial:value.target.value})}              
                              
                  />                                      
                </div>
              </div>  
              <div className="form-row"> 
                   
                <div className="form-group col-md-3">
                <TextField
                      id="standard-basic"
                      label="Local de Embarque *"
                      style={{ margin: 0 }}
                      placeholder=""
                      helperText=""           
                      margin="normal"
                      value={this.state.campLocal_embarque} 
                      onChange={(value)=> this.setState({campLocal_embarque:value.target.value})}
                  />     
                  
                </div> 
                <div className="form-group col-md-3">
                  <TextField
                      id="standard-basic"
                      label="Local de Desembarque *"
                      style={{ margin: 0 }}
                      placeholder=""
                      helperText=""           
                      margin="normal"
                      value={this.state.campLocal_desembarque} 
                      onChange={(value)=> this.setState({campLocal_desembarque:value.target.value})}
                  />                                 
                </div>
                            
             </div>  
             <div className="form-row"> 
                <div className="form-group col-md-3">
                    <FormControlLabel
                        value={this.state.campMotorista_bilingue}
                        control={<Switch color="primary" />}
                        label="Motorista Belingue?"
                        labelPlacement="start"
                        onChange={this.handleChangeBilingue}
                    />                   
                  
                </div>                
                <div className="form-group col-md-3">
                    <FormControlLabel
                        value={this.state.campMotorista_receptivo}
                        control={<Switch color="primary" />}
                        label="Motorista Receptivo?"
                        labelPlacement="start"
                        onChange={this.handleChangeReceptivo}
                    />            
                </div>   
                <div className="form-group col-md-4">
                     <FormControlLabel
                        value={this.state.campMotorista_preferencial}
                        control={<Switch color="primary" />}
                        label="Motorista Preferencial?"
                        labelPlacement="start"
                        onChange={this.handleChangePreferencial}
                    />       
                </div>                
                <div className="form-group col-md-4">
                  <TextField
                    id="standard-number"
                    label="Km *"
                    type="number"
                    value={this.state.campKm_translado} 
                    onChange={(value)=> this.setState({campKm_translado:value.target.value})}
                    InputLabelProps={{
                      shrink: true,
                    }}                    
                    />                           
                </div>                
                <div className="form-group col-md-4">
                    <TextField
                        id="standard-number"
                        label="Tempo *"
                        type="number"                        
                        placeholder=""                       
                        value={this.state.campTempo_translado} 
                        onChange={(value)=> this.setState({campTempo_translado:value.target.value})}
                        InputLabelProps={{
                          shrink: true,
                        }}  
                    />                                              
                </div>                
                <div className="form-group col-md-4">
                     <TextField
                        id="standard-basic"
                        label="Valor Estimado *"
                        style={{ margin: 0 }}
                        placeholder=""
                        helperText=""           
                        margin="normal"
                        value={this.state.campValor_estimado} 
                        onChange={(value)=> this.setState({campValor_estimado:value.target.value})}
                    />                     
                </div>                
             </div>
                         
            <br/>
            <div className="form-row"> 
                <div className="form-group col-md-2">
                    <Button color="primary" variant="contained" onClick={()=>this.sendUpdate()}>
                      Atualizar
                    </Button> 
                </div>  
                <div className="form-group col-md-2">
                  <Button color="secondary" variant="contained" onClick={this.voltarlistaClick}>
                      voltar
                  </Button>      
                </div>    
            </div>         
           </div>                
          </div>  
          );

        }

  sendUpdate(){            

    if (this.state.campData_inicial=="") {
      //alert("Digite o campo de nome")
      Swal.fire(
        'Alerta',
        'Digite o campo Data',
        'error'
      )
    } 
    else if (this.state.campHora_inicial=="") {
      //alert("Digite o campo de nome")
      Swal.fire(
        'Alerta',
        'Digite o campo hora',
        'error'
      )
    }          
    else if (this.state.campLocal_embarque=="") {
      //alert("Digite o campo de endereço")
      Swal.fire(
        'Alerta',
        'Digite o campo Local de embarque',
        'error'
      )
    }
    else if (this.state.campLocal_desembarque=="") {
      //alert("Digite o campo de endereço")
      Swal.fire(
        'Alerta',
        'Digite o campo Local desembarque',
        'error'
      )
    }
    else if (this.state.campNome_passageiro=="") {
      //alert("Digite o campo de email")
      Swal.fire(
        'Alerta',
        'Digite o campo Nome passageiro',
        'error'
      )      
    } else {

      let userId = this.props.match.params.id;

      const datapost = {
        nome_passageiro: this.state.campNome_passageiro, 
        quantidade_passageiro: this.state.campQuantidade_passageiro, 
        data_inicial: this.state.campData_inicial,
        hora_inicial: this.state.campHora_inicial,  
        local_embarque: this.state.campLocal_embarque, 
        local_desembarque: this.state.campLocal_desembarque, 
        motorista_bilingue: this.state.campMotorista_bilingue, 
        motorista_receptivo: this.state.campMotorista_receptivo, 
        motorista_preferencial: this.state.campMotorista_preferencial,     
        telefone_motorista: this.state.campTelefone_motorista, 
        km_translado: this.state.campKm_translado, 
        tempo_translado: this.state.campTempo_translado, 
        valor_estimado: this.state.campValor_estimado,
        situacao: this.state.campSituacao, 
        motivo_cancelamento: this.state.campMotivo_cancelamento
      }          

      api.put(`/translado/update/${userId}`, datapost)      
      .then(response=>{
        if (response.data.success==true) {              
        // alert(response.data.message)   
          Swal.fire(
            'Alterado',
            'Você incluiu os dados com sucesso.',
            'success'
          )               
         /// console.log('Perfil - '+perfil);

         this.props.history.push(`/listporevento/${localStorage.getItem('logidEvento') }`);               

        }
        else {
          Swal.fire(
            'Erro na Inclusão',
             response.data.error.erros.message,
            'error'
          )  
          //alert(response.data.message)
        }
      }).catch(error=>{
        alert("Error 34 ")
      })
    }
   }  
  
}  
export default eventoComponent;