import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { Alert, Input, Button } from 'reactstrap';
//import axios from 'axios';
import api from '../../services/api';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import ReactModal from 'react-modal';
//import Modal from '@material-ui/core/Modal';

import TesteAlteracao from '../cliente/modal/representante';
//import Modal from '@material-ui/core/Modal';

import { Link } from "react-router-dom";

//library sweetalert
import Menu_administrador from '../administrador/menu_administrador';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

//import { Alert } from 'reactstrap';
const nome = localStorage.getItem('lognome');  
const perfil = localStorage.getItem('logperfil');
//const baseUrl = "http://34.210.56.22:3333";


const customStyles = {
  content : {
    top                   : '10px',
    left                  : '55%',    
    right                 : '0%',
    bottom                : 'auto',  
    height                : '100%',    
    overflow              : 'scroll',
       /* display: -webkit-inline-box; 
    /* Adicionamos essa linha */
    //marginRight           : '-50%',
   // transform             : 'translate(-50%, -50%)'   
  }
};

let columns = [
  { id: 'count', label: '#', minWidth: 10 },
  { id: 'cpf', label: 'Cpf', minWidth: 100 },
  { id: 'nome', label: 'Nome', minWidth: 200 },
  { id: 'email', label: 'Email', minWidth: 90 },
  { id: 'telefone', label: 'Telefone', minWidth: 60 },
  { id: 'acao', label: 'Ação', minWidth: 100 },
];

class listComponent extends React.Component  {

  constructor(props){
    super(props);
    this.state = {
      perfil: perfil,
      campStatus: '',
      inicio: 0,
      mensagem: '',
      teste: '',
      campNome: "",
      campData_nascimento:"",
      campEmail:"",      
      campTelefone1:"",
      campCpf:"",       
      cpf_selecionado: '',
      incluir: false,
      showModal: false,
      color: 'light',
      listCliente:[],
      listaStatus:[]
    }
  }

  componentDidMount(){
    this.setState({
      perfil: localStorage.getItem('logperfil')    
    });
    this.loadCliente();  
    this.carrega_status();  

  }


 
  handleOpenModal (data) {
    this.setState({ 
      showModal: true,    
      teste: data.nome,     
    });
    localStorage.setItem('logid', data.id);    
 //   this.prepareSave();
  }
  
  handleCloseModal () {
    this.setState({ 
      showModal: false,
      incluir: false 
    });
    this.loadCliente();  
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
  
    //const baseUrl = "http://34.210.56.22:3333"
    //const url = baseUrl+"/seguradora/list"
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

  loadCliente(){
   // const url = baseUrl+"/cliente/list"
   api.get('/cliente/list')
    .then(res=>{
      if (res.data.success) {

        const data = res.data.data       
        this.setState({listCliente:data})
      }
      else {
        alert("Error  ")
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
      <div className="titulo_admministrador">     
        <div className="unnamed-character-style-4 descricao_admministrador">          
           <h3><strong>Lista de Clientes Individual</strong></h3>
         </div>      
      </div>
      <div className="container_alterado_1">                    
       
       <br/>   
       <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="left">CPF</TableCell>
            <TableCell align="left">NOME</TableCell>
            <TableCell align="left">EMAIL</TableCell>
            <TableCell align="left">TELEFONE</TableCell>
            <TableCell align="left">ACAO</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {this.loadFillData()}
        </TableBody>
      </Table>
    </TableContainer>
     
       <br/>
       <ReactModal 
            isOpen={this.state.showModal}
            style={customStyles}
            contentLabel="Minimal Modal Example"                                       
            >  Modal 
                <IconButton aria-label="editar" onClick={()=>this.handleCloseModal()}>
                  <CloseOutlinedIcon />
                </IconButton>                                            
                 <br/>
            
                  <TesteAlteracao />                           

         </ReactModal>  
       <Alert color={this.state.color}>
         {this.state.mensagem}
       </Alert>     
       <br/>
          <br/>
       <div className="botao_lista_incluir">
          <Fab size="large" color="secondary" variant="extended" onClick={()=>this.onIncluir()}>
              <AddIcon/> Adicionar Cliente
          </Fab>
       </div>
                 
     </div>       
 
    </div>
    );
  }
  
  
  loadFillData(){
    
    return this.state.listCliente.map((data, index)=>{     
      return(        
        <TableRow key={data.id}>
          <TableCell component="th" scope="row">
            {index + 1}
          </TableCell>
          <TableCell align="left">{data.cpf}</TableCell>
          <TableCell align="left">{data.nome}</TableCell>
          <TableCell align="left">{data.email}</TableCell>
          <TableCell align="left">{data.celular}</TableCell>
          <TableCell align="center">
            <div style={{width:"150px"}}>              
              {'   '}
              <IconButton aria-label="editar" onClick={()=>this.handleOpenModal(data)}>
                  <AddIcon/>
              </IconButton>       
            </div>        
          </TableCell>
        </TableRow>        
      )
    })
  }
  
  statusChange(e, data){
    const datapost = {
      statusId: e.target.value         
    }    
    api.put(`/login/update/${data.id}`, datapost)
    
    api.put(`/cliente/update/${data.id}`, datapost)
    .then(response =>{

      if (response.data.success) {
        this.loadCliente();
        this.loadFillData();  
      }  
      
    })
    .catch ( error => {
      alert("Erro de Conexão")
    })
  }
  validar_delete(email, id) {
     
    api.get(`/eventos/listaeventocliente/${id}/${localStorage.getItem('logperfil')}`)
    .then(response =>{

      const registros = response.data.data;
      if (registros.length > 0) {
       // console.log('id - '+response.data);
     //  console.log( JSON.stringify(response.data, null, "    ") );       
          this.setState({ 
            color: 'danger',
            mensagem: 'Cliente tem Evento(s) associado(s), não pode ser excluído'
          })             
       
      } else {
        this.sendDelete(email, id);
      } 
    })
    .catch ( error => {
      alert("Erro de Conexão "+error)
    })
  
  }

  onEditar(data){
    this.props.history.push(`/cliente_alterar/${data.id}`);   
  }

  onIncluir() {
    this.props.history.push(`/cliente_incluir/0`);   
  }
  onDelete(email, id){
    Swal.fire({
      title: 'Você está certo?',
      text: 'Você não poderá recuperar estes dados!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, apaga isto!',
      cancelButtonText: 'Não, mantêm'
    }).then((result) => {
      if (result.value) {
        this.validar_delete(email, id)
      } 
    })
  }

  sendDelete(email, userId){  


    api.delete(`/login/delete/${email}`)     
    //console.log(`/login/delete/${email}`)

    api.delete(`/cliente/delete/${userId}`)
    .then(response =>{

      if (response.data.success) {       
        this.loadCliente()

      } else {      
        this.setState({ 
          color: 'danger',
          mensagem: 'Seus dados não foram apagados :)'
        })                     
      }
    })
    .catch ( error => {
      alert("Error "+error)
    })
  }

}

export default listComponent;
