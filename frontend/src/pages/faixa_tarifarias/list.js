import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import axios from 'axios';
import api from '../../services/api';

import { Link } from "react-router-dom";
import DateFnsUtils from '@date-io/date-fns';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DatePicker
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

//library sweetalert
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Menu from '../../pages/cabecalho' ;
import Menu_administrador from '../administrador/menu_administrador';
import Menu_matriz from '../matriz_tarifaria/menu_matriz';

//import { Alert } from 'reactstrap';
const nome = localStorage.getItem('lognome');  
const perfil = localStorage.getItem('logperfil');
//const EventoId = localStorage.getItem('logidEvento');
var dateFormat = require('dateformat');

//const baseUrl = "http://34.210.56.22:3333";

class listaFaixaComponent extends React.Component  {

  constructor(props){
    super(props);
    this.state = {
      campFaixa_inicial: "", 
      campFaixa_final: "", 
      campValor_KM: "", 
      campValor_tempo: "",
      campMatrizId: "",
      camptipoTransporteId: '', 
      campbandeira: '', 
      campreceptivo: '', 
      campbilingue: '', 
      camppedagio: '',
      campnometransporte: '',
      campMatrizId: '',
      perfil: perfil,     
      listaFaixas:[]
    }   
    
  }

  componentDidMount(){
    this.setState({
      perfil: localStorage.getItem('logperfil'),      
      campMatrizId: this.props.match.params.id
    });     


    let id = this.props.match.params.id;
    console.log('id - '+id);

    api.get(`/matriz/get/${id}`)
    .then(res=>{
        //console.log(JSON.stringify(res.data.data, null, "    ")); 
        if (res.data.success) {
          const data = res.data.data[0]              
          //console.log(JSON.stringify(data, null, "    ")); 
          this.setState({          
            campbandeira: data.bandeira, 
            campbilingue: data.bilingue, 
            campreceptivo: data.receptivo, 
            camppedagio: data.pedagio, 
            camptipoTransporteId: data.tipoTransporteId,
            campnometransporte: data.tipoTransporteId            
          })                                 
          //console.log(JSON.stringify(data, null, "    ")); 
        }
        else {
          alert("Erro de conexão com o banco de dados")
        }
      })
      .catch(error=>{
        alert("Error server 5555"+error)
      })
       
    this.loadFaixa();
  }  
  
  handleDateChange(date) {
    //const searchDate = MomentUtils(date).format("yyyy-MM-DD");
    this.setState({ campdata_evento: date });
  }
  loadFaixa(){
   // const url = baseUrl+"/cliente/list"

   //let id = this.props.match.params.id;

   api.get("/faixa/list")
    .then(res=>{  
      if (res.data) {
        const data = res.data.data        
        this.setState({listaFaixas:data})
        //console.log(JSON.stringify(data, null, "    ")); 
        //console.log(JSON.stringify(this.state.listTranslados, null, "    ")); 
      }
      else {
        alert("Erro de conexão")
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  }
      
  handleClick = () => {
  
    this.props.history.push('/area_administrador'); 

  }
  
  voltarlistaClick = () => {
  
    this.props.history.push("/matriz_listar"); 
  
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
       <div> 
          <Menu_matriz />  
        <br/>        
       </div>   
      );
     }            
  }
  render()
  {
    return (
      <div>    
          <div>
          {this.verifica_menu()}
          </div>         
           <div className="container">                                         
              <div className="form-row">          
                <div className="form-group col-md-4">
                <TextField
                        id="standard-basic"
                        label="Tipo de Transporte"
                        style={{ margin: 0 }}
                        placeholder=""
                        helperText=""           
                        margin="normal"
                        value={this.state.campnometransporte} 
                        readOnly
                    />   
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
                        readOnly
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
                        readOnly
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
                        readOnly
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
                        readOnly
                    />    
                </div>  
              </div>       
            <br/>
            <center><h3><strong>Lista de Tarifas por KM </strong></h3></center>
            <div>  
            <Link className="btn btn-outline-info" to={`/faixa_criar/${this.state.campMatrizId}`}> <span class="glyphicon glyphicon-plus"></span> Adicionar Tarifas KM</Link>                 
          <br/>
          </div>  
          <table className="table table-hover danger">
            <thead>
              <tr>            
                <th scope="col">#</th>            
                <th scope="col">faixa_inicial</th>
                <th scope="col">faixa_final</th>
                <th scope="col">valor_KM</th>
                <th scope="col">valor_tempo</th>               
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>         
              {this.loadFillData()}
            </tbody>
          </table>         
             <div className="form-row"> 
                <div className="form-group col-md-2">
                   <Link className="btn btn-outline-info" to={`/faixa_criar/${this.state.campMatrizId}`}> 
                          <span class="glyphicon glyphicon-plus"></span> Adicionar Tarifas KM
                   </Link>
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

  loadFillData(){     

    return this.state.listaFaixas.map((data, index)=>{
      return(
        <tr>
          <th>{index + 1}</th>          
          <td>{data.faixa_inicial}</td>
          <td>{data.faixa_final}</td>
          <td>{data.valor_km}</td>
          <td>{data.valor_tempo}</td>      
          <td>
            <div style={{width:"150px"}}>
              <Link className="btn btn-outline-info" to={"/faixa_editar/"+data.id}> Editar </Link>              
              {'   '}
              <button className="btn btn-outline-danger" onClick={()=>this.onDelete(data.id)}> Deletar </button>
            </div>            
          </td>          
        </tr>
      )
    }) 
  }

  onDelete(id){
    Swal.fire({
      title: 'Você está certo?',
      text: 'Você não poderá recuperar estes dados!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, apaga isto!',
      cancelButtonText: 'Não, mantêm'
    }).then((result) => {
      if (result.value) {
        this.sendDelete(id)
      } else if (result.dismiss == Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Seus dados não foram apagados :)',
          'error'
        )
      }
    })
  }

  sendDelete(userId){
    // url de backend
    //console.log('deletar o id - '+userId);
   // const Url = baseUrl+"/cliente/delete/"+userId    // parameter data post
    // network
    api.delete(`/faixa/delete/${userId}`)
    .then(response =>{
      if (response.data.success) {
        Swal.fire(
          'Deletado',
          'Você apagou os dados com sucesso.',
          'success'
        )
        this.loadFaixa()
      }
    })
    .catch ( error => {
      alert("Erro na conexão")
    })
  }

}

export default listaFaixaComponent;
