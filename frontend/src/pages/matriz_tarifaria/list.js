import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import axios from 'axios';
import api from '../../services/api';

import { Link } from "react-router-dom";
import DateFnsUtils from '@date-io/date-fns';
import { visualizarmask } from '../formatacao/visualizarmask';

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

class listaMatrizComponent extends React.Component  {

  constructor(props){
    super(props);
    this.state = {
      perfil: perfil,
      descricao: '',
      campnometransporte: "",
      listaMatriz:[]
    }   
    
  }

  componentDidMount(){
    this.setState({
      perfil: localStorage.getItem('logperfil'),         
    });     
       
    this.loadMatriz();
  }

  load_tipotransporte() {
    // console.log('tipo '+this.state.camptipoTransporteId);
  
      api.get(`/tipoTransporte/get/${this.state.camptipoTransporteId}`)
      .then(res=>{
          if (res.data.success) {
            const data = res.data.data[0]              
           
            this.setState({          
              campnometransporte: data.descricao
            })          
          
          }
          else {
            alert("Erro de conexão com o banco de dados")
          }
        })
        .catch(error=>{
          alert("Error server "+error)
        })  
  
    }
  handleDateChange(date) {
    //const searchDate = MomentUtils(date).format("yyyy-MM-DD");
    this.setState({ campdata_evento: date });
  }

  busca_veiculo(veiculo){   
 
    api.get(`/tipoTransporte/get/${veiculo}`)
     .then(res=>{  
    //  console.log(JSON.stringify(res.data.data[0].descricao, null, "    ")); 
      let tipo = res.data.data[0].descricao
         return (
              tipo 
         );       
  
     })
     .catch(error=>{
       alert("Error server "+error)
     })
   }

  loadMatriz(){
  
   api.get("/matriz/list")
    .then(res=>{  
      if (res.data) {
        const data = res.data.data        
        this.setState({listaMatriz:data})
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
  
   // this.props.history.push(`/listaeventocliente/${localStorage.getItem('logid')}`); 
  
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
           <div className="container-fluid">                                         
            <br/>
            <center><h3><strong>Lista de Valores Tarifários</strong></h3></center>
            <div>  
            <Link className="btn btn-outline-info" to={"/matriz_criar"}> <span class="glyphicon glyphicon-plus"></span> <i class="fas fa-money-bill-wave"></i> Adicionar Valores Tarifários</Link>                 
          <br/>
          </div>  
          <table className="table table-hover danger">
            <thead>
              <tr>
                <th scope="col">#</th>            
                <th scope="col">Tipo de transporte</th>
                <th scope="col">Faixa Inicial</th>
                <th scope="col">Faixa Final</th>
                <th scope="col">Valor KM</th>
                <th scope="col">Valor Tempo</th>
                <th scope="col">Valor Bandeira</th>
                <th scope="col">Valor Bilingue</th>
                <th scope="col">Valor Receptivo</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>         
              {this.loadFillData()}
            </tbody>
          </table>         
             <div className="form-row"> 
                <div className="form-group col-md-2">
                   <Link className="btn btn-outline-info" to={"/matriz_criar"}> 
                          <span class="glyphicon glyphicon-plus"></span> <i class="fas fa-money-bill-wave"></i> Adicionar Valores Tarifários
                   </Link>
                </div>                 
            </div>                 
        </div>
      </div>         
    );
  }

  loadFillData(){     

    return this.state.listaMatriz.map((data, index)=>{
      return(
        <tr>
          <th>{index + 1}</th>          
          <td>{data.tipo_transporte.descricao}</td>          
          <td>{data.faixa_inicial}</td>
          <td>{data.faixa_final}</td>
          <td>{visualizarmask(data.valor_km)}</td>          
          <td>{visualizarmask(data.valor_tempo)}</td>                    
          <td>{visualizarmask(data.bandeira)}</td>    
          <td>{visualizarmask(data.receptivo)}</td>    
          <td>{visualizarmask(data.bilingue)}</td>    
          <td>
            <div style={{width:"350px"}}>             
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
    api.delete(`/matriz/delete/${userId}`)
    .then(response =>{
      if (response.data.success) {
        Swal.fire(
          'Deletado',
          'Você apagou os dados com sucesso.',
          'success'
        )
        this.loadMatriz()
      }
    })
    .catch ( error => {
      alert("Error 325 ")
    })
  }

}

export default listaMatrizComponent;
