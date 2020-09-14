import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import axios from 'axios';
import { Link } from "react-router-dom";
import api from '../../services/api';

import { Alert, Input } from 'reactstrap';

import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

//library sweetalert
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Menu_administrador from '../administrador/menu_administrador';
import { Container } from '@material-ui/core';
const perfil = localStorage.getItem('logperfil');
const nome = localStorage.getItem('lognome');  

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const columns = [
  { id: 'count', label: '#', minWidth: 10 },
  { id: 'perfil', label: 'Perfil', minWidth: 170 },
  { id: 'Descricao', label: 'Descrição', minWidth: 300 },
  { id: 'acao', label: 'Ação', minWidth: 100 },
];

class funcionalidadesComponent extends React.Component  {

  constructor(props){
    super(props);
    this.state = {
      perfil: perfil,
      mensagem: '',
      color: 'light',
      listFuncionalidade:[],
    }
  }

  componentDidMount(){
    this.setState({
      perfil: localStorage.getItem('logperfil')    
    });
    this.loadfuncionalidades();      
  }

  
  loadfuncionalidades(){
   // const url = baseUrl+"/motorista/list"
   api.get(`/funcionalidade/list`)
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data
        this.setState({listFuncionalidade:data})
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
          <div className="titulo_admministrador">
              <div className="unnamed-character-style-4 descricao_admministrador">          
                 <h3><strong>Lista de Funcionalidades</strong></h3>
              </div>      
            </div>
      <div className="container_alterado_1">                                         
     <div>              
        <br/>
        </div>
      
     <TableContainer className="table_novo" component={Paper}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
             {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}   
          </TableRow>
        </TableHead>
        <TableBody>
        {this.loadFillData()}
        </TableBody>
      </Table>
    </TableContainer>    
       
        <Alert color={this.state.color}>
               {this.state.mensagem}
          </Alert>    
         
        <div className="botao_lista_incluir">
          <Fab size="large" color="secondary" variant="extended" onClick={()=>this.onIncluir()}>
              <AddIcon/> Incluir Funcionalidades
          </Fab>
       </div>

     </div>
      </div>   
    );
  }

  onIncluir() {
    this.props.history.push(`/funcionalidade/cadastrar`);   
  }

  loadFillData(){

    return this.state.listFuncionalidade.map((data, index)=>{
      return(
        <TableRow key={data.id}>
          <TableCell component="th" scope="row">
            {index + 1}
          </TableCell>
          <TableCell align="left">{data.perfil.nome}</TableCell>
          <TableCell align="left">{data.descricao}</TableCell>
          <TableCell align="center">
            <div style={{width:"150px"}}>              
              {'   '}
              <IconButton aria-label="delete" onClick={()=>this.onDelete(data, data.id)}>
                <DeleteIcon />
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
    
    api.put(`/motorista/update/${data.id}`, datapost)
    .then(response =>{

      if (response.data.success) {
        this.loadfuncionalidades();
        this.loadFillData();  
      }  
      
    })
    .catch ( error => {
      alert("Erro de Conexão")
    })
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
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Seus dados não foram apagados :)',
          'error'
        )
      }
    })
  }

  sendDelete(data, userId){ 
    console.log('perfil -  '+data.perfil.id);    
    api.delete(`/funcionalidade/delete/${userId}/${data.perfil.id}`)
    .then(response =>{
      if (response.data.success) {      
        this.loadfuncionalidades()
        this.loadFillData()
      }
    })
    .catch ( error => {
      alert("Error 325 ")
    })
  
  }

}

export default funcionalidadesComponent;
