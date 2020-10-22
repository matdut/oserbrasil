import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import axios from 'axios';
import { Link } from "react-router-dom";
import api from '../../services/api';

import { Input, Alert } from 'reactstrap';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

//library sweetalert
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Menu_administrador from '../administrador/menu_administrador';
const perfil = localStorage.getItem('logperfil');
const nome = localStorage.getItem('lognome');  

//const baseUrl = "http://34.210.56.22:3333"

class listComponent extends React.Component  {

  constructor(props){
    super(props);
    this.state = {
      perfil: perfil,
      mensagem: '',
      color: 'light',
      listaTipoEvento:[]
    }
  }

  componentDidMount(){
    this.setState({
      perfil: localStorage.getItem('logperfil')    
    });
    this.loadTipoEvento();  
  }  
 
  loadTipoEvento(){ 
   
    api.get('/tipoevento/list')
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data
        this.setState({listaTipoEvento:data})
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

  render()
  {
    return (
      <div>    

          <Menu_administrador />  

          <div className="titulo_lista">
              <div className="unnamed-character-style-4 descricao_admministrador">          
                  <h3><strong>Lista de Tipo de Evento</strong></h3>
              </div>      
            </div>

       <div className="container_alterado_1">       
<br/>      
        <table className="table table-hover danger">
          <thead>
            <tr>              
              <th scope="col">#</th>            
              <th scope="col">DESCRICAO</th>              
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
          <Fab size="large" className="classe_orange" variant="extended" onClick={()=>this.onIncluir()}>
              <AddIcon/> Adicionar Tipo Veículo
          </Fab>
       </div>
      </div>   
    </div>  
    );
  }

  onIncluir() {
    this.props.history.push(`/tipo_transporte`);   
  }
  loadFillData(){

    return this.state.listaTipoEvento.map((data, index)=>{
      return(
        <tr>
          <th>{index + 1}</th>          
          <td>{data.descricao}</td>         
          <td>
            <div style={{width:"150px"}}>              
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
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Seus dados não foram apagados :)',
          'error'
        )
      }
    })
  }

  sendDelete(userId){
    api.delete(`/tipoevento/delete/${userId}`)
    .then(response =>{
      if (response.data.success) {
      
        this.loadTipoEvento()
        this.loadFillData()
      }
    })
    .catch ( error => {
      alert("Error 325 ")
    })
  }

}

export default listComponent;
