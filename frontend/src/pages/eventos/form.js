import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
//import Button from '@material-ui/core/Button';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';

import MenuItem from '@material-ui/core/MenuItem';
//import MomentUtils from "@date-io/moment";
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

import Menu_cliente_individual from '../cliente/menu_cliente_individual';
import Menu_cliente_empresarial from '../empresa/menu_cliente_empresarial';
import Menu_administrador from '../administrador/menu_administrador';
import Menu_operador from '../operadores/menu_operador';
import Menu from '../../pages/cabecalho' ;

//import axios from 'axios';
import api from '../../services/api';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import 'sweetalert2/src/sweetalert2.scss';

const login = sessionStorage.getItem('logemail');              
const id = sessionStorage.getItem('logid');  
const buscadorcep = require('buscadorcep');
const Email_cliente = require('../../pages/email');
var dateFormat = require('dateformat');

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
          campdata_inicio_evento: '', 
          campdata_final_evento: '', 
          camptipoTransporteId: '', 
          campvalor_total: '',
          campTipo_cliente: "",
          nome: "",
          perfil: "",   
          cliente_logado_Id: "",      
          listEstados:[],
          listTipoTransporte:[]                   
        }      
        this.handleDateinicioChange = this.handleDateinicioChange.bind(this);            
        this.handleDatefinalChange = this.handleDatefinalChange.bind(this); 
        
      }

      limpar() {   
        //this.state.campNome = "";
        this.setState({ 
          dataEvento:{}, 
          campcliente_cnpj: '', 
          campcliente_nome: '', 
          campordem_servico: '', 
          campnome_evento: '', 
          campCnpj:'',
          campdata_inicio_evento: '', 
          campdata_final_evento: '', 
          camptipoTransporteId: '', 
          campvalor_total: '',
          campTipo_cliente: ""
         });      
      } 

      componentDidMount(){  
        this.setState({
          perfil: sessionStorage.getItem('logperfil'),    
          campcliente_nome: sessionStorage.getItem('lognome'),
          cliente_logado: sessionStorage.getItem('logid')      
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
                campCnpj: data.cnpj,  
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

    //this.handleDatefinalChange();       
    //this.handleDateinicioChange();       
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
        } else if (this.state.perfil == 2) {
          return ( 
            <div>
                <Menu_cliente_individual />                
             </div>   
           ); 
        } else if (this.state.perfil == 7) {
          return ( 
            <div>
                <Menu_cliente_empresarial />                
             </div>   
           ); 
        } else if (this.state.perfil == 8) {
            return ( 
              <div>
                  <Menu_operador />                
               </div>   
             ); 
        } else if (this.state.perfil == null){
            return (
              <Menu />
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

      handleDateinicioChange(e) {       
        
        this.setState({ campdata_inicio_evento: e.target.value });

      }
      handleDatefinalChange(e) {
        //const searchDate = MomentUtils(date).format("yyyy-MM-DD");
        this.setState({ campdata_final_evento: e.target.value });
      }

      voltarlistaClick = () => {
  
        this.props.history.push(`/listaeventocliente/${sessionStorage.getItem('logid')}`); 
      
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
                <div className="form-group col-md-3">        
                <Label for="exampleDate">Número de ordem *</Label>
                <Input
                  type="text"
                  name="ordem"
                  id="exampleDate"
                  placeholder=""
                  value={this.state.campordem_servico} 
                  onChange={(value)=> this.setState({campordem_servico:value.target.value})}
                />                          
                </div>
                <div className="form-group col-md-3">
                <Label for="exampleDate">Nome Evento *</Label>
                <Input
                  type="text"
                  name="ordem"
                  id="nome"
                  placeholder=""
                  value={this.state.campnome_evento} 
                  onChange={(value)=> this.setState({campnome_evento:value.target.value})}
                />
                </div>
                <div className="form-group col-md-3">   
                <Label for="exampleDatetime">Data de início *</Label>
                  <Input                                    
                    className="input_text_date"                  
                    type="date"
                    name="senha2"
                    id="exampleEmail2"                    
                    placeholder=""                    
                    value={this.state.campdata_inicio_evento}
                    //valid={ this.state.validate.datanascimentoState === 'has-success' }
                   // invalid={ this.state.validate.datanascimentoState === 'has-danger' }
                    onChange={this.handleDateinicioChange}
                    maxlength="10"               
                  />                                                                                                      
                </div>
                <div className="form-group col-md-3">
                <Label for="exampleDatetime">Data Final *</Label>
                  <Input                                    
                    className="input_text_date"                  
                    type="date"
                    name="senha2"
                    id="exampleEmail2"                    
                    placeholder=""                    
                    value={this.state.campdata_final_evento}
                    //valid={ this.state.validate.datanascimentoState === 'has-success' }
                   // invalid={ this.state.validate.datanascimentoState === 'has-danger' }
                   onChange={this.handleDatefinalChange}
                    maxlength="10"               
                  />                                                                                                                    
                </div>
              </div>  
              <div className="form-row"> 
                <div className="form-group col-md-4">
                <Label for="exampleDate">CPF/CNPJ  *</Label>
                <Input
                  type="text"
                  name="cpf"
                  id="cpf"
                  placeholder=""
                  value={this.state.campcliente_cnpj}    
                  readOnly = {this.props.readOnly}
                />                 
                </div> 
                <div className="form-group col-md-4">
                <Label for="exampleDate">Nome *</Label>
                <Input
                  type="text"
                  name="cliente"
                  id="cliente"
                  placeholder=""
                  value={this.state.campcliente_nome}       
                  readOnly = {this.props.readOnly}
                />                                                                                
                </div>
                <div className="form-group col-md-4">     
                  <Label for="exampleSelect">Transporte</Label>
                  <Input type="select" name="select" id="exampleSelect" 
                  value={this.state.camptipoTransporteId} 
                  onChange={(value)=> this.setState({camptipoTransporteId:value.target.value})}>
                        {this.loadSelTipoTransporte()}            
                  </Input>
                </div> 
             </div>  

                         
            <br/>
            <div className="form-row"> 
                <div className="form-group col-md-2">
                  <Button color="primary" variant="contained" onClick={()=>this.sendSave()}>
                        Cadastrar
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

  sendSave(){            

    if (this.state.campdata_inicio_evento=="") {
      //alert("Digite o campo de nome")
      Swal.fire(
        'Alerta',
        'Digite a Data do inicio do Evento',
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
           data_inicio_evento: this.state.campdata_inicio_evento, 
           data_final_evento: this.state.campdata_final_evento, 
           tipoTransporteId: this.state.camptipoTransporteId, 
           valor_total: this.state.campvalor_total,
           cliente_logado_Id: this.state.cliente_logado_Id       
      }          

      api.post('/eventos/create', datapost)
      .then(response=>{
        //console.log('response - '+response.data);
       // console.log( JSON.stringify(response.data, null, "    ") ); 
        if (response.data.success===true) {              
        // alert(response.data.message)   
          Swal.fire(
            'Incluido',
            'Você incluiu os dados com sucesso.',
            'success'
          )                
         
          //Email_cliente          
          //sessionStorage.setItem('lognome', response.data.data.nome);
          sessionStorage.setItem('logidEvento', response.data.data.id);
      
         this.props.history.push(`/listaeventocliente/${sessionStorage.getItem('logid')}`);         
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