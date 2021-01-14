import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import axios from 'axios';
import { Link } from "react-router-dom";
import api from '../../../services/api';
import { Input, Alert } from 'reactstrap';

import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
//library sweetalert
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Menu_motorista from '../menu_motorista';
const perfil = sessionStorage.getItem('logperfil');
const nome = sessionStorage.getItem('lognome');  

//const baseUrl = "http://34.210.56.22:3333"

class listComponent extends React.Component  {

  constructor(props){
    super(props);
    this.state = {
      perfil: perfil,
      mensagem: '',
      color: 'light',
      listVeiculos:[],
      listTipoTransporte:[],
    }
  }

  componentDidMount(){
    this.setState({
      perfil: sessionStorage.getItem('logperfil')    
    });


    this.loadMotorista();  
    this.loadTipoTransporte();
  }

 
  loadMotorista(){
   // const url = baseUrl+"/motorista/list"
   api.get('/veiculo/list')
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data
        this.setState({listVeiculos:data})
      }
      else {
        alert("Erro de conexão")
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  }
  
  loadTipoTransporte() {
    api.get('/tipoTransporte/list')
    .then(res=>{
      if (res.data.success == true) {
        const data = res.data.data

        this.setState({listTipoTransporte:data})
      }     
    })
    .catch(error=>{
      alert("Error server "+error)
    })

  }   
 
  handleClick = () => {
  
    this.props.history.push('/area_motorista'); 

  }

  render()
  {
    return (
      <div>    

          <Menu_motorista />  
          <div className="titulo_admministrador">
              <div className="unnamed-character-style-4 descricao_admministrador">          
              <div className="titulo_bemvindo"> Endereço </div>                     
              </div>      
            </div>

       <div className="container_alterado_1">               
        <br/>
        
        <table className="table table-hover table-striped">
          <thead>
            <tr>              
              <th scope="col">#</th>            
              <th scope="col">Marca</th>
              <th scope="col">Modelo</th>
              <th scope="col">Placa</th>
              <th scope="col">Ano</th>             
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
              <AddIcon/> Adicionar Veículo
          </Fab>
       </div>
      </div> 
    </div>    
    );
  }
  onIncluir() {
    this.props.history.push(`/criar`);   
  }
  loadFillData(){

    return this.state.listVeiculos.map((data, index)=>{
      return(
        <tr>
          <th>{index + 1}</th>          
          <td>{data.marca}</td>
          <td>{data.modelo}</td>
          <td>{data.placa}</td>
          <td>{data.ano}</td>          
          <td>
            <div style={{width:"150px"}}>          
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
    // url de backend
    //console.log('deletar o id - '+userId);
    //const baseUrl = "http://34.210.56.22:3333/motorista/delete/"+userId    // parameter data post
    //const url = baseUrl+"/motorista/delete/"+userId    // parameter data post
    // network
    api.delete(`/veiculo/delete/${userId}`)
    .then(response =>{
      if (response.data.success) {
        Swal.fire(
          'Deletado',
          'Você apagou os dados com sucesso.',
          'success'
        )
        this.loadMotorista()
      }
    })
    .catch ( error => {
      alert("Error 325 ")
    })
  }

}

export default listComponent;
