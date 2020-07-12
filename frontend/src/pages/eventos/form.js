import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
//import MomentUtils from "@date-io/moment";
import DateFnsUtils from '@date-io/date-fns';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DatePicker
} from '@material-ui/pickers';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
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
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100ch',
    },
  },
  grid: {
    width: "60%"
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
          dataEvento:{}, 
          campcliente_cnpj: '', 
          campcliente_nome: '', 
          campordem_servico: '', 
          campnome_evento: '', 
          campdata_evento: '', 
          camptipoTransporteId: '', 
          campvalor_total: '',
          campTipo_cliente: "",
          nome: "",
          perfil: "",   
          cliente_logado_Id: "",      
          listEstados:[],
          listTipoTransporte:[]                   
        }      
        this.handleDateChange = this.handleDateChange.bind(this);            
        
      }

      limpar() {   
        //this.state.campNome = "";
        this.setState({ 
          dataEvento:{}, 
          campcliente_cnpj: '', 
          campcliente_nome: '', 
          campordem_servico: '', 
          campnome_evento: '', 
          campdata_evento: '', 
          camptipoTransporteId: '', 
          campvalor_total: '',
          campTipo_cliente: ""
         });      
      } 

      componentDidMount(){  
        this.setState({
          perfil: localStorage.getItem('logperfil'),    
          campcliente_nome: localStorage.getItem('lognome'),
          cliente_logado: localStorage.getItem('logid')      
        });        

        let userId = this.props.match.params.id;        
        api.get(`/cliente/get/${userId}`)
        .then(res=>{
            if (res.data.success) {
              const data = res.data.data[0]              
             
              this.setState({          
                dataEvento:data,                
                campcliente_cnpj: data.cnpj || data.cpf, 
                campcliente_nome: data.nome,    
                cliente_logado_Id: userId             
              })          
            
            }
            else {
              alert("Erro de conexão com o banco de dados")
            }
          })
          .catch(error=>{
            alert("Error server "+error)
          })   

    this.handleDateChange();       
    this.loadEstados();
    this.verifica_menu();
    this.loadTipoTransporte();        

    }
     
    loadEstados(){
  
        api.get('/estado/list')
        .then(res=>{
          if (res.data.success) {
            const data = res.data.data
            this.setState({listEstados:data})
          }
          else {
            Swal.fire(
              'Alerta',
              'Lista estados vazia',
              'error'
            )
          }
        })
        .catch(error=>{
          alert("Error server "+error)
        })
      
    }  

       verifica_menu() {

        if (this.state.perfil == 1) {
          return ( 
            <div>
                <Menu_administrador />                
             </div>   
           ); 
        } else if (this.state.nome == null){
            return (
              <Menu />
            );
      
        } else {
          return (
            <Menu_evento />  
          );
         }           
      }     

      loadTipoTransporte() {
        api.get('/tipoTransporte/list')
        .then(res=>{
          if (res.data.success) {
            const data = res.data.data

            this.setState({listTipoTransporte:data})
          }
          else {
            Swal.fire(
              'Alerta',
              'Lista estados vazia',
              'error'
            )
          }
        })
        .catch(error=>{
          alert("Error server "+error)
        })

      }

      loadFillData(){
        
        return this.state.listEstados.map((data)=>{          
          return(
            <option key={data.nome} value={data.id}>{data.nome} </option>
          )
        })
      }  

      loadSelTipoTransporte(){
        
        return this.state.listTipoTransporte.map((data)=>{          
          return(
            <option key={data.nome} value={data.id}>{ data.descricao }</option>            
          )
        })
      }  

      handleDateChange(date) {
        //const searchDate = MomentUtils(date).format("yyyy-MM-DD");
        this.setState({ campdata_evento: date });
      }

       render(){              
        //const classes = useStyles();
        //const { classes } = this.props;
        return (       
          <div>
              <div>
              {this.verifica_menu()}
              <br/>
              <div>
                <h2><center><stong>Cadastro de Eventos</stong></center></h2>
              </div>            
            </div>    
            <div className="container">                      
               <div className="form-row">          
                <div className="form-group col-md-4">
                <TextField
                    id="standard-number"
                    label="Número de ordem *"
                    type="number"
                    value={this.state.campordem_servico} 
                    onChange={(value)=> this.setState({campordem_servico:value.target.value})}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />                  
                </div>
                <div className="form-group col-md-4">
                  <TextField
                        id="standard-basic"
                        label="Nome Evento  *"
                        style={{ margin: 0 }}
                        placeholder=""
                        helperText=""           
                        margin="normal"
                        value={this.state.campnome_evento} 
                        onChange={(value)=> this.setState({campnome_evento: value.target.value})}
                    />                    
                </div>
                <div className="form-group col-md-4">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            margin="normal"
                            defaultValue="12/08/2020"
                            id="date-picker-inline"
                            label="Data do Evento"
                            format="dd/MM/yyyy"
                            value={this.state.campdata_evento} 
                            onChange={this.handleDateChange}   
                           // KeyboardButtonProps={{
                          //    'aria-label': 'change date',
                           // }}
                      />                                      
                    </MuiPickersUtilsProvider>                                                                    
                </div>
              </div>  
              <div className="form-row"> 
                <div className="form-group col-md-4">
                   <TextField                        
                        id="standard-basic"
                        label="CPF/CNPJ  *"
                        style={{ margin: 0 }}
                        placeholder=""
                        helperText=""           
                        margin="normal"
                        value={this.state.campcliente_cnpj}                         
                        InputProps={{
                          readOnly: true,
                        }}
                    />                                                    
                </div> 
                <div className="form-group col-md-4">
                    <TextField                       
                        id="standard-basic"
                        label="Nome *"
                        style={{ margin: 0 }}
                        placeholder=""
                        helperText=""           
                        margin="normal"
                        value={this.state.campcliente_nome}                        
                        InputProps={{
                          readOnly: true,
                        }}
                    />                                                                      
                </div>
                <div className="form-group col-md-4">                                                                                              
                <InputLabel id="demo-simple-select-label">Tipo de Transporte</InputLabel> 
                  <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={this.state.camptipoTransporteId}
                      onChange={(value)=> this.setState({camptipoTransporteId:value.target.value})}
                    >
                       {this.loadSelTipoTransporte()}             
                  </Select>
                </div> 
             </div>  

                         
            <br/>
            <Button color="primary" variant="contained" className="btn btn-primary" onClick={()=>this.sendSave()}>
                  Cadastrar
            </Button>
              
           </div>                
          </div>  
          );

        }

  sendSave(){            

    if (this.state.campdata_evento=="") {
      //alert("Digite o campo de nome")
      Swal.fire(
        'Alerta',
        'Digite a Data do Evento',
        'error'
      )
    } 
    else if (this.state.campordem_servico=="") {
      //alert("Digite o campo de nome")
      Swal.fire(
        'Alerta',
        'Digite a Ordem de Serviço',
        'error'
      )
    }          
    else if (this.state.campnome_evento=="") {
      //alert("Digite o campo de endereço")
      Swal.fire(
        'Alerta',
        'Digite o Nome do Evento',
        'error'
      )
    }
    else if (this.state.camptipoTransporteId=="") {
      //alert("Digite o campo de endereço")
      Swal.fire(
        'Alerta',
        'Digite o Tipo de Serviço',
        'error'
      )
    } else {

      const datapost = {         
           cliente_cnpj: this.state.campcliente_cnpj, 
           cliente_nome: this.state.campcliente_nome, 
           ordem_servico: this.state.campordem_servico, 
           nome_evento: this.state.campnome_evento, 
           data_evento: this.state.campdata_evento, 
           tipoTransporteId: this.state.camptipoTransporteId, 
           valor_total: this.state.campvalor_total,
           cliente_logado_Id: this.state.cliente_logado_Id       
      }          

      api.post('/eventos/create', datapost)
      .then(response=>{
        console.log('response - '+response.data);
        if (response.data.success===true) {              
        // alert(response.data.message)   
          Swal.fire(
            'Incluido',
            'Você incluiu os dados com sucesso.',
            'success'
          )                
         
          //Email_cliente          
          //localStorage.setItem('lognome', response.data.data.nome);
          localStorage.setItem('logidEvento', response.data.data.id);
         console.log(' antes translado ');
         this.props.history.push(`/listporevento/${response.data.data.id}`);         
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
        alert("Error evento ")
      })
    }
   }  
  
}  
export default eventoComponent;