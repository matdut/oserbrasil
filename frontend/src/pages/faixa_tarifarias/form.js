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
import Menu_matriz from '../matriz_tarifaria/menu_matriz';
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

class FaixaincluirComponent extends React.Component{ 
  
    constructor(props){
        super(props);
        this.state = {
          campFaixa_inicial: "", 
          campFaixa_final: "", 
          campValor_KM: "", 
          campValor_tempo: "",
          campMatrizId: "",
          perfil: ""                 
        }      
      }

      limpar() {   
        //this.state.campNome = "";
        this.setState({  
          campFaixa_inicial: "", 
          campFaixa_final: "", 
          campValor_KM: "", 
          campValor_tempo: "",
          campMatrizId: "",
          perfil: ""     
         });      
      } 

    componentDidMount(){  
        this.setState({
          perfil: localStorage.getItem('logperfil'),   
          campMatrizId: this.props.match.params.id
        });        
         
     this.verifica_menu();   
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
            <Menu_matriz />  
          );
         }           
      }     
     

      loadSelTipoTransporte(){
        
        return this.state.listTipoTransporte.map((data)=>{          
          return(
            <option key={data.nome} value={data.id}>{ data.descricao }</option>            
          )
        })
      }  
      
      voltarlistaClick = () => {
  
        this.props.history.push("/faixa_listar"); 
      
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
                  <h2><center><stong>Faixa Tarifária</stong></center></h2>
                </div>            
              </div>    
            <div className="container">                      
               <div className="form-row">          
                <div className="form-group col-md-4">
                <TextField
                        id="standard-basic"
                        label="Faixa Inicial *"
                        style={{ margin: 0 }}
                        placeholder=""
                        helperText=""           
                        margin="normal"
                        value={this.state.campFaixa_inicial} 
                        onChange={(value)=> this.setState({campFaixa_inicial:value.target.value})}
                    />                 
                </div>
                <div className="form-group col-md-4">
                <TextField
                        id="standard-basic"
                        label="Faixa Final *"
                        style={{ margin: 0 }}
                        placeholder=""
                        helperText=""           
                        margin="normal"
                        value={this.state.campFaixa_final} 
                        onChange={(value)=> this.setState({campFaixa_final:value.target.value})}
                    />                   
                </div>
                <div className="form-group col-md-4">
                <TextField
                        id="standard-basic"
                        label="Valor KM *"
                        style={{ margin: 0 }}
                        placeholder=""
                        helperText=""           
                        margin="normal"
                        value={this.state.campValor_KM} 
                        onChange={(value)=> this.setState({campValor_KM:value.target.value})}
                    />                   
                </div>
              </div>  
              <div className="form-row"> 
                <div className="form-group col-md-4">
                <TextField
                        id="standard-basic"
                        label="Valor Tempo *"
                        style={{ margin: 0 }}
                        placeholder=""
                        helperText=""           
                        margin="normal"
                        value={this.state.campValor_tempo} 
                        onChange={(value)=> this.setState({campValor_tempo:value.target.value})}
                    />                   
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

    if (this.state.campFaixa_final=="") {
      //alert("Digite o campo de nome")
      Swal.fire(
        'Alerta',
        'Digite a Faixa inicial',
        'error'
      )
    } 
    else if (this.state.campFaixa_final=="") {
      //alert("Digite o campo de nome")
      Swal.fire(
        'Alerta',
        'Digite a Faixa final',
        'error'
      )              
    } 
    else if (this.state.campValor_KM=="") {
        //alert("Digite o campo de nome")
        Swal.fire(
          'Alerta',
          'Digite o valor do KM',
          'error'
        )              
    } 
    else if (this.state.campValor_tempo=="") {
        //alert("Digite o campo de nome")
        Swal.fire(
          'Alerta',
          'Digite o Valor do Tempo',
          'error'
        )                   
      
    } else {
      
      //let id = this.props.match.params.id;

      const datapost = {      
          faixa_inicial: this.state.campFaixa_inicial, 
          faixa_final: this.state.campFaixa_final, 
          valor_km: this.state.campValor_KM, 
          valor_tempo: this.state.campValor_tempo,
          matrizId: this.state.campMatrizId
      }          

      api.post("/faixa/create", datapost)
      .then(response=>{
        console.log('response - '+response.data);
        if (response.data.success===true) {              
        // alert(response.data.message)   
          Swal.fire(
            'Atualizado',
            'Você incluiu os dados com sucesso.',
            'success'
          )                
         
         this.props.history.push(`/faixa_listar/${this.state.campMatrizId}`);         
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
export default FaixaincluirComponent;