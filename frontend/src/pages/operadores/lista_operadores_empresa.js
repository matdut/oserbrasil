import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Alert, Input } from 'reactstrap';
//import axios from 'axios';
import api from '../../services/api';

import { Link } from "react-router-dom";
import Modal from 'react-modal';

//library sweetalert
import Menu_cliente_empresarial from '../empresa/menu_cliente_empresarial' ;
import Menu_administrador from '../administrador/menu_administrador';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//import { Alert } from 'reactstrap';
const nome = localStorage.getItem('lognome');  
const perfil = localStorage.getItem('logperfil');
const logid = localStorage.getItem('logid');
//const baseUrl = "http://34.210.56.22:3333";
const customStyles = {
  content : {
    top                   : '40%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class listComponent extends React.Component  {

  constructor(props){
    super(props);
    this.state = {
      perfil: perfil,
      inicio: 0,
      mensagem: '',
      color: 'light',
      listOperadores:[],
      listaStatus:[]
    }
  }

  componentDidMount(){
    this.setState({
      perfil: localStorage.getItem('logperfil')    
    });
    this.loadOperadores();    
    this.carrega_status();  
  }

  loadStatus(){
  
    return this.state.listaStatus.map((data)=>{          
      return(
        <option key={data.descricao} value={data.id}>{data.descricao} </option>
      )
    })     
  
   }
 
   carrega_status(){ 
   
    api.get('/status/list')
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data
        this.setState({listaStatus:data})
      }
      else {
        alert("Erro de conexão")
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  
   }  

  loadOperadores(){
   // const url = baseUrl+"/cliente/list"
   api.get(`/operador/listaempresa/`+localStorage.getItem('logid'))
    .then(res=>{
      if (res.data.success) {

        const data = res.data.data       
        this.setState({listOperadores:data})
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
          <div>
            <Menu_cliente_empresarial />  
            <div className="titulo_admministrador">
              <div className="unnamed-character-style-4 descricao_admministrador">          
                  <h3><strong>Lista de Operadores</strong></h3>
              </div>      
            </div>
          </div>
     <div className="container_alterado_1">          
      
          <div> 
        <br/>
        </div>  
        <table className="table table-hover danger">
          <thead>
            <tr>
              <th scope="col">#</th>            
              <th scope="col">CPF</th>
              <th scope="col">Nome</th>
              <th scope="col">Email</th>              
              <th scope="col">Telefone</th>
              <th scope="col">Status</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>         
            {this.loadFillData()}
          </tbody>
        </table>

        <br/>
        <Alert color={this.state.color}>
          {this.state.mensagem}
        </Alert>     

        <div className="botao_lista_incluir">
          <Fab size="large" color="secondary" variant="extended" onClick={()=>this.onIncluir()}>
              <AddIcon/> Adicionar Operadores
          </Fab>
       </div>


      <Modal 
        isOpen={this.state.showModal}
        style={customStyles}
        contentLabel="Minimal Modal Example"
        >
          <div className="botao_lista_incluir">
          <Fab size="large" color="secondary" variant="extended" onClick={()=>this.handleCloseModal()}>
              <HighlightOffIcon/> Close
          </Fab>
          </div>      
          <br/> 
          <br/>     

            teste asdsasdasda

      </Modal>  
      </div>   
    </div>  
    );
  }

  handleOpenModal () {
    this.setState({ 
      showModal: true    
    });
  
     
    //this.props.history.push(`/incluir_operador/`+localStorage.getItem('logid')); 
 //   this.prepareSave();
  }
  
  handleCloseModal () {
    this.setState({ 
      showModal: false,
      incluir: false 
    });
  }
  onIncluir() {
    this.props.history.push(`/incluir_operador/`+localStorage.getItem('logid'));   
  }

  loadFillData(){
    
    return this.state.listOperadores.map((data, index)=>{     
      return(        
        <tr>
          <th>{index + 1}</th>          
          <td>{data.cpf}</td>
          <td>{data.nome}</td>
          <td>{data.email}</td>          
          <td>{data.celular}</td>
          <td><Input                   
                    type="select" 
                    name="select" 
                    className="status_select"
                    id="select" 
                    value={data.status.id}                        
                    onChange={ (e) => {
                      this.statusChange(e, data)                                             
                    }}                                                          >
              {this.loadStatus()}      
              </Input></td>
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
  
  statusChange(e, data){
    const datapost = {
      statusId: e.target.value     
    }    
    api.put(`/login/update/${data.id}`, datapost)
    
    api.put(`/operador/update/${data.id}`, datapost)
    .then(response =>{

      if (response.data.success) {
        this.loadOperadores();
        this.loadFillData();  
      }  
      
    })
    .catch ( error => {
      alert("Erro de Conexão")
    })
  }
  
  onSenha(data) {
    
    const params_email = {    
      email: data.email,                      
      url: `http://www.oser.app.br:21497/operadores_incluir/${localStorage.getItem('logid')}/${data.email}`,        
      texto: `Sr(a), Operador(a) \n Seu link de acesso ao sistema è `, 
    }
    
    api.post("/email/send", params_email)       

    alert('Mensagem Enviada');

  }
  onDelete(data, id){
    Swal.fire({
      title: 'Você está certo?',
      text: 'Você não poderá recuperar estes dados!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, apaga isto!',
      cancelButtonText: 'Não, mantêm'
    }).then((result) => {
      if (result.value) {
        this.sendDelete(data, id)
      } 
    })
  }

  sendDelete(data, userId){  

    api.delete(`/login/delete/${data.email}`)    

    api.delete(`/operador/delete/${userId}`)
    .then(response =>{

      if (response.data.success) {       
        this.loadOperadores()

      } 
    })
    .catch ( error => {
      alert("Error 325 ")
    })
  }

}

export default listComponent;
