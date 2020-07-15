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

class MatrizComponent extends React.Component{ 
  
    constructor(props){
        super(props);
        this.state = {
          camptipoTransporteId: '', 
          campbandeira: '', 
          campreceptivo: '', 
          campbilingue: '', 
          camppedagio: '',
          perfil: '',
          listTipoTransporte:[]                   
        }      
      }

      limpar() {   
        //this.state.campNome = "";
        this.setState({  
          camptipoTransporteId: '', 
          campbandeira: '', 
          campreceptivo: '', 
          campbilingue: '', 
          camppedagio: '',          
          listTipoTransporte:[]   
         });      
      } 

      componentDidMount(){  
        this.setState({
          perfil: localStorage.getItem('logperfil')   
        });        

    //this.handleDateChange();           
    this.verifica_menu();
    this.loadTipoTransporte();        

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

      loadSelTipoTransporte(){
        
        return this.state.listTipoTransporte.map((data)=>{          
          return(
            <option key={data.nome} value={data.id}>{ data.descricao }</option>            
          )
        })
      }  
      
      voltarlistaClick = () => {
  
        this.props.history.push("/matriz_listar"); 
      
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
                  <h2><center><stong>Matriz Tarifária</stong></center></h2>
                </div>            
              </div>    
            <div className="container">                      
               <div className="form-row">          
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
                <div className="form-group col-md-4">
                <TextField
                        id="standard-basic"
                        label="Valor Bandeira *"
                        style={{ margin: 0 }}
                        placeholder=""
                        helperText=""           
                        margin="normal"
                        value={this.state.campbandeira} 
                        onChange={(value)=> this.setState({campbandeira:value.target.value})}
                    />                   
                </div>
                <div className="form-group col-md-4">
                <TextField
                        id="standard-basic"
                        label="Valor Bilingue *"
                        style={{ margin: 0 }}
                        placeholder=""
                        helperText=""           
                        margin="normal"
                        value={this.state.campbilingue} 
                        onChange={(value)=> this.setState({campbilingue:value.target.value})}
                    />                   
                </div>
              </div>  
              <div className="form-row"> 
                <div className="form-group col-md-4">
                <TextField
                        id="standard-basic"
                        label="Valor Receptivo *"
                        style={{ margin: 0 }}
                        placeholder=""
                        helperText=""           
                        margin="normal"
                        value={this.state.campreceptivo} 
                        onChange={(value)=> this.setState({campreceptivo:value.target.value})}
                    />                   
                </div> 
                <div className="form-group col-md-4">
                <TextField
                        id="standard-basic"
                        label="Valor Pedágio *"
                        style={{ margin: 0 }}
                        placeholder=""
                        helperText=""           
                        margin="normal"
                        value={this.state.camppedagio} 
                        onChange={(value)=> this.setState({camppedagio: value.target.value})}
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

    if (this.state.camptipoTransporteId=="") {
      //alert("Digite o campo de nome")
      Swal.fire(
        'Alerta',
        'Selecione o Transporte',
        'error'
      )
    } 
    else if (this.state.campbandeira=="") {
      //alert("Digite o campo de nome")
      Swal.fire(
        'Alerta',
        'Digite a Bndeira',
        'error'
      )              
    
    } else {

      let pedagio = this.state.camppedagio
      if (pedagio == '') {
         pedagio = 0
      }   
         
      const datapost = {         
           bandeira: this.state.campbandeira, 
           bilingue: this.state.campbilingue, 
           receptivo: this.state.campreceptivo, 
           pedagio: pedagio, 
           tipoTransporteId: this.state.camptipoTransporteId
      }          

      console.log( JSON.stringify(datapost, null, "    ") ); 
      api.post('/matriz/create', datapost)
      .then(response=>{
       // console.log('response - '+response.data);
        if (response.data.success===true) {              
        // alert(response.data.message)   
          Swal.fire(
            'Incluido',
            'Você incluiu os dados com sucesso.',
            'success'
          )                
         
         this.props.history.push("/matriz_listar");         
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
export default MatrizComponent;