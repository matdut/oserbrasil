import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Alert, Input, Button } from 'reactstrap';

//import axios from 'axios';
import api from '../../services/api';

import { Link } from "react-router-dom";
//library sweetalert
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Menu_cliente_individual from '../cliente/menu_cliente_individual';
import Menu_cliente_empresarial from '../empresa/menu_cliente_empresarial';
import Menu from '../../pages/cabecalho' ;
import Menu_administrador from '../administrador/menu_administrador';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

//import { Alert } from 'reactstrap';
const nome = localStorage.getItem('lognome');  
const perfil = localStorage.getItem('logperfil');
var dateFormat = require('dateformat');
//const baseUrl = "http://34.210.56.22:3333";

const StyledButton = withStyles({
  root: {
    background: '#FF840A',
    borderRadius: 23,
    color: 'white',
    mensagem: '',    
    height: 48,
    padding: '0 30px',  
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

class listaeventosComponent extends React.Component  {

  constructor(props){
    super(props);
    this.state = {
      perfil: perfil,
      eventoId: '', 
      mensagem: '',
      color: 'light',
      listEventos:[]
    }
  }

  componentDidMount(){
    let userId = this.props.match.params.id;  

    localStorage.setItem('logid',userId)
    this.setState({
      perfil: localStorage.getItem('logperfil'),
      id: localStorage.getItem('logid')   
    });
    this.loadlistEventos();    

  }

  loadlistEventos(){
   // const url = baseUrl+"/cliente/list"   

   api.get(`/eventos/getCliente/${localStorage.getItem('logid')}`)
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data    
        this.setState({listEventos:data})
      }
      else {
        alert("Erro de conexão")
      }
    })
    .catch(error=>{
      alert("Error server"+error)
    })
  }
  
  handleClick = () => {
  
    this.props.history.push('/area_administrador'); 

  }
  verificar_translados() {
   // if (this.li) 
      
   
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
    } else if (this.state.perfil == null){
        return (
          <Menu />
        );
  
    }          
  }     
  render()
  {
    return (
      <div>        
          {this.verifica_menu()}    
       <div className="titulo_admministrador">
        <div className="unnamed-character-style-4 descricao_admministrador">          
           <h3><strong>Eventos</strong></h3>
         </div>      
      </div>

     <div className="container_alterado_1">
        <br/>     
        <table className="table table-hover danger">
          <thead>
            <tr>
              <th scope="col">#</th>            
              <th scope="col">Ordem de Serviço</th>
              <th scope="col">Nome do Evento</th>
              <th scope="col">Data do Evento</th>              
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
       <br/>
          <br/>
       <div className="botao_lista_incluir">             
          <Fab size="large" color="secondary" variant="extended" onClick={()=>this.onAdicionar()}> 
              <AddIcon/> Adicionar Eventos 
          </Fab>
         
       </div>
    
       </div>  
      </div>   
    );
  }

  onAdicionar() {
    this.props.history.push(`/criar_eventos/${localStorage.getItem('logid')}`);   
  }

  loadFillData(){

    return this.state.listEventos.map((data, index)=>{
      return(
        <tr>
          <th>{index + 1}</th>          
          <td>{data.ordem_servico}</td>
          <td>{data.nome_evento}</td>
          <td>{ dateFormat(data.data_evento, "dd/mm/yyyy")}</td>
          <td>
            <div style={{width:"250px"}}>               
            <IconButton aria-label="delete" onClick={()=>this.onIncluir(data)}>
                <AddIcon />
            </IconButton>             
              {'   '}       
              <IconButton aria-label="delete" onClick={()=>this.onDelete(data.email, data.id)}>
                <DeleteIcon />
              </IconButton>
            </div>            
          </td>          
        </tr>
      )
    })
  }
  onIncluir(data) {  
    this.props.history.push(`/lista_evento_servico/${data.id}`);   
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
    api.delete(`/eventos/delete/${userId}`)
    .then(response =>{
      if (response.data.success) {
        Swal.fire(
          'Deletado',
          'Você apagou os dados com sucesso.',
          'success'
        )
        this.loadlistEventos()
      }
    })
    .catch ( error => {
      alert("Error 325 ")
    })
  }

}

export default listaeventosComponent;
