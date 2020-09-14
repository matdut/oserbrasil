import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import axios from 'axios';
import api from '../../services/api';
import { Alert, Input } from 'reactstrap';
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

import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

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
      mensagem: '',
      color: 'light',
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

  handleOpenModal () {
    this.setState({ 
      showModal: true    
    });
  
   // this.prepareSave();
  }
  
  handleCloseModal () {
    this.setState({ 
      showModal: false,
      incluir: false 
    });
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
      if (res.data.success) {
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

 
 
  render()
  {
    return (
      <div>    
             <Menu_administrador />  
             <div className="titulo_admministrador">
              <div className="unnamed-character-style-4 descricao_admministrador">          
                 <h3><strong>Lista de Valores Tarifários</strong></h3>
              </div>      
            </div>
      <div className="container_alterado_1">                                         
            <br/>                       
          <table className="table table-hover danger table_novo">
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
         
          <Alert color={this.state.color}>
               {this.state.mensagem}
          </Alert>    

        <div className="botao_lista_incluir">
          <Fab size="large" color="secondary" variant="extended" onClick={()=>this.onIncluir()}>
              <AddIcon/> Incluir Valor Tarifário
          </Fab>
       </div>
        </div>
      </div>         
    );
  }

  onIncluir() {
    this.props.history.push(`/matriz_criar`);   
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
              <IconButton aria-label="editar" onClick={()=>this.onEditar(data)}>
                <EditIcon />
              </IconButton>    
              {'   '}
              <IconButton aria-label="delete" onClick={()=>this.onDelete(data.id)}>
                <DeleteIcon />
              </IconButton>    
            </div>            
          </td>          
        </tr>
      )
    }) 
  }

  onEditar(data) {

    this.props.history.push(`/matriz_editar/${data.id}`);   
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
        this.loadMatriz()
        this.loadFillData();
      }
    })
    .catch ( error => {
      alert("Error 325 ")
    })
  }

}

export default listaMatrizComponent;
