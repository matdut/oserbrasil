import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import axios from 'axios';
import api from '../../services/api';

import { Link } from "react-router-dom";
import DateFnsUtils from '@date-io/date-fns';
import { Button, Form, Label, Input, FormText } from 'reactstrap';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DatePicker
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
//import Button from '@material-ui/core/Button';

//library sweetalert
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Menu_evento from '../eventos/menu_evento';
//import { Alert } from 'reactstrap';
const nome = localStorage.getItem('lognome');  
const perfil = localStorage.getItem('logperfil');
//const EventoId = localStorage.getItem('logidEvento');
var dateFormat = require('dateformat');

//const baseUrl = "http://34.210.56.22:3333";

class listTransladosComponent extends React.Component  {

  constructor(props){
    super(props);
    this.state = {
      perfil: perfil,
      campcliente_cnpj: '', 
      campcliente_nome: '', 
      campordem_servico: '', 
      campnome_evento: '', 
      campdata_evento: '', 
      camptipotransporteId: '', 
      campvalor_total: '',
      campTipo_cliente: '',
      listTranslados:[],
      listTipoTransporte:[],
      evento_selecionado: '',
      campnometransporte: ''
    }
    this.handleDateChange = this.handleDateChange.bind(this);   
    
  }

  componentDidMount(){
    this.setState({
      perfil: localStorage.getItem('logperfil'),         
    });
    
    localStorage.setItem('logidEvento', this.props.match.params.id);    
   // console.log(JSON.stringify(eventoId, null, "    ")); 
    this.loadtranslados();    
    this.handleDateChange();    

    let eventoId = localStorage.getItem('logidEvento');    
    
      //let id = this.props.match.params.id;
   // let userId = this.props.match.params.id;        
        api.get(`/eventos/get/${eventoId}`)
        .then(res=>{
            //console.log(JSON.stringify(res.data.data, null, "    ")); 
            if (res.data.success) {
              const data = res.data.data[0]              
              //console.log(JSON.stringify(data, null, "    ")); 
              this.setState({          
                dataEvento:data,                
                campcliente_cnpj: data.cnpj || data.cpf, 
                campcliente_nome: data.nome, 
                campordem_servico: data.ordem_servico, 
                campnome_evento: data.nome_evento, 
                campdata_evento: data.data_evento, 
                camptipoTransporteId: data.tipoTransporteId, 
                campvalor_total: data.valor_total
              })                       
              this.load_tipotransporte();
            }
            else {
              alert("Erro de conexão com o banco de dados")
            }
          })
          .catch(error=>{
            alert("Error server"+error)
          })

  }

  
  handleDateChange(date) {
    //const searchDate = MomentUtils(date).format("yyyy-MM-DD");
    this.setState({ campdata_evento: date });
  }
  loadtranslados(){
   // const url = baseUrl+"/cliente/list"

   let id = this.props.match.params.id;

   api.get(`/translado/listporevento/${id}`)
    .then(res=>{  
      if (res.data) {
        const data = res.data.data
        //console.log(JSON.stringify(data, null, "    ")); 
        this.setState({listTranslados:data})
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
  handleClick = () => {
  
    this.props.history.push('/area_administrador'); 

  }
  
  voltarlistaClick = () => {
  
    this.props.history.push(`/listaeventocliente/${localStorage.getItem('logid')}`); 
  
  }
  render()
  {
    return (
      <div>    
          <div>
            <Menu_evento />  
          </div>         
        <div className="container">      
           <br/>
           <center><h3><strong>Evento</strong></h3></center>
           <br/>
              <div className="form-row">      
                <div className="form-group col-md-4">
                <Label for="exampleDate">Nome Evento *</Label>
                <Input
                  type="text"
                  name="ordem"
                  id="nome"
                  placeholder=""
                  value={this.state.campnome_evento} 
                  readOnly = {this.props.readOnly}
                />                 
                </div>
                <div className="form-group col-md-4">   
                <Label for="exampleDatetime">Data do Evento *</Label>
                    <Input
                      type="text"
                      name="date"
                      id="exampleDatetime"
                      placeholder=""
                      value={dateFormat(this.state.campdata_evento,'dd/mm/yyyy')}   
                      readOnly = {this.props.readOnly}     
                    />                                                               
                </div>                
                <div className="form-group col-md-4">
                <Label for="exampleDatetime">Tipo Transporte</Label>
                    <Input
                      type="text"
                      name="text"
                      id="exampleDatetime"
                      placeholder=""
                      value={this.state.campnometransporte}     
                      readOnly = {this.props.readOnly}     
                    />   
                </div>              
              </div>   
            <br/>
            <center><h3><strong>Lista de Translados</strong></h3></center>
            <div>  
            <Link className="btn btn-outline-info" to={"/transladoscriar"}> <span class="glyphicon glyphicon-plus"></span> Adicionar Translados</Link>                 
          <br/>
          </div>  
          <table className="table table-hover danger">
            <thead>
              <tr>
                <th scope="col">#</th>            
                <th scope="col">Nome Passageiro</th>
                <th scope="col">Local Embarque</th>
                <th scope="col">Data Inicial</th>
                <th scope="col">Hora Inicial</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>         
              {this.loadFillData()}
            </tbody>
          </table>         
             <div className="form-row"> 
                <div className="form-group col-md-2">
                   <Link className="btn btn-outline-info" to={"/transladoscriar"}> 
                          <span class="glyphicon glyphicon-plus"></span> Adicionar Translados
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

    return this.state.listTranslados.map((data, index)=>{
      return(
        <tr>
          <th>{index + 1}</th>          
          <td>{data.nome_passageiro}</td>
          <td>{data.local_embarque}</td>
          <td>{dateFormat(data.data_inicial, "dd/mm/yyyy")}</td>
          <td>{data.hora_inicial}</td>
          <td>
            <div style={{width:"150px"}}>
              <Link className="btn btn-outline-info" to={"/transladoseditar/"+data.id}>Editar</Link>
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
    api.delete(`/translados/delete/${userId}`)
    .then(response =>{
      if (response.data.success) {
        Swal.fire(
          'Deletado',
          'Você apagou os dados com sucesso.',
          'success'
        )
        this.loadtranslados()
      }
    })
    .catch ( error => {
      alert("Error 325 ")
    })
  }

}

export default listTransladosComponent;
