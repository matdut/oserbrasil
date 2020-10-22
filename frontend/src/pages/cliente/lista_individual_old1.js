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
import Box from '@material-ui/core/Box';
import FormHelperText from '@material-ui/core/FormHelperText';

import CheckIcon from '@material-ui/icons/Check';
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

import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

//import { Alert } from 'reactstrap';
const nome = localStorage.getItem('lognome');  
const perfil = localStorage.getItem('logperfil');
//const baseUrl = "http://34.210.56.22:3333";


const customStyles44 = {
  content : {
    top                   : '10px',
    left                  : '65%',    
    right                 : '0%',
    bottom                : 'auto',  
    height                : '100%',    
    width                 : '560px', 
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
      campStatusId: 0,
      campData_nascimento:"",
      campbuscacliente: "",
      campEmail:"",      
      campTelefone1:"",
      campCpf:"",       
      cpf_selecionado: '',
      incluir: false,      
      color: 'light',
      listCliente:[],
      listaStatus:[]
    }
    this.buscachange = this.buscachange.bind(this);
    this.statusChange = this.statusChange.bind(this);
  }

  componentDidMount(){
    this.setState({
      perfil: localStorage.getItem('logperfil')    
    });
    
    this.loadCliente();  
    this.carrega_status();  

  }

  verifica_botao(inicio) {
    const { validate } = this.state    
    if (inicio == 1) {
      return (
       <div>         
          <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado_excluir" p={2}>
                <div className="d-flex justify-content-center">
                <label> Excluir Cliente </label>
                </div>     
          </Box>   
          <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado_modal" p={2}>
                <div className="d-flex justify-content-center">
                <label> Salvar Alterações </label>
                </div>     
          </Box>           
      </div>     
      );   
    } else {
    if (validate.cpfState == 'has-success' && validate.datanascimentoState == 'has-success'  
        && validate.emailState == 'has-success' && validate.nomeState == 'has-success' 
        && validate.telefone1State == 'has-success') {
          return (    
            <div>
              <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado_excluir" p={2} onClick={()=>this.sendDelete()}>
                <div className="d-flex justify-content-center">
                <label> Excluir Cliente </label>
                </div>     
              </Box>   
              <Box bgcolor="error.main" color="error.contrastText" className="botoes_habilitados_modal"  p={2} onClick={()=>this.sendSave()}>
                <div className="d-flex justify-content-center">
                    <label> Salvar Alterações </label>
                </div>     
              </Box>           
            </div>       
          );
        } else {
          return (
            <div>
              <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado_excluir" p={2}>
                <div className="d-flex justify-content-center">
                <label> Excluir Cliente </label>
                </div>     
              </Box>   
              <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado_modal" p={2}>
                    <div className="d-flex justify-content-center">
                      <label> Salvar Alterações </label>
                    </div>     
              </Box>           
            </div>
        );   
        }   
      }      
  
   
  } 

  buscachange(e) {
    this.setState({ campbuscacliente: e.target.value })
  }

  statusChange(e) {
    this.setState({ campStatusId: e.target.value })
  }
 
  handleOpenModal(data) {
    this.setState({ 
      showModal: true,    
      teste: data.nome,     
    }); 
    console.log('editar');
    localStorage.setItem('logincluir', false);      
    localStorage.setItem('logid', data.id);    
    localStorage.setItem('TituloModal','Editar');      

  //  this.prepareSave(); 
}
handleCloseModal () {
  this.setState({ 
    showModal: false
  });
  localStorage.setItem('logincluir', false)      
  this.loadCliente();  
  this.carrega_status();      
}  

  handleOpenIncluirModal() {        
    this.setState({ 
      showModal: true,    
    }); 
    console.log('incluir');
    localStorage.setItem('TituloModal','Incluir');
    localStorage.setItem('logincluir', true);          
  //  this.prepareSave();
  }

  handleCloseIncluirModal () {
    this.setState({ 
      showModal: false,     
    });
    localStorage.setItem('logincluir', false)      
    this.loadCliente();  
    this.carrega_status();      
  }  
  prepareSave() {
    this.setState({ 
      showModal: false,      
    });
  }
  
 
  loadStatus(){
  
    return this.state.listaStatus.map((data)=>{          
      return(
        <MenuItem value={data.id}>{data.descricao}</MenuItem>              
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

  sendBusca() {       
    //console.log(`/cliente/findCliente/${this.state.campbuscacliente}`)
    console.log('status '+this.state.campStatusId);
    console.log('busca '+this.state.campbuscacliente);
    if (this.state.campbuscacliente == '' && this.state.campStatusId == 0 )  {
       console.log('log 1 ');
       this.loadCliente();    
    } else {
      console.log('status '+this.state.campStatusId);
      if (this.state.campbuscacliente !== '')  {
        console.log('log 2 ');
          api.get(`/cliente/findcliente/${this.state.campbuscacliente}/2`)
          .then(res=>{
            console.log('result - '+JSON.stringify(res.data, null, "    "));  
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
      } else if (this.state.campStatusId > 0 && this.state.campbuscacliente !== '') {        
        console.log('log 3 ');
        api.get(`/cliente/findclientestatus/${this.state.campbuscacliente}/2/${this.state.campStatusId}`)
          .then(res=>{
            console.log('result - '+JSON.stringify(res.data, null, "    "));  
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
      } else if (this.state.campStatusId >= 0 && this.state.campbuscacliente == '')  {
        console.log('log 4 ');
        api.get(`/cliente/findcliente/${this.state.campStatusId}`)
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
  }


  }

  render()
  {
    return (
      <div>

      <Menu_administrador />  
      <div className="titulo_admministrador">     
        <div className="unnamed-character-style-4 descricao_admministrador">          
           <h3><strong>Clientes</strong></h3>
         </div>      
      </div>
      <div className="container_alterado_1">                    
      <div>
      <br/>  
      <FormControl variant="outlined">
                    <InputLabel htmlFor="filled-adornment-password">Buscar Cliente</InputLabel>
                     <OutlinedInput   
                        autoComplete="off"                                                     
                        className="buscar_cliente"                       
                        id="outlined-basic"                   
                        variant="outlined"
                        value={this.state.campbuscacliente}                        
                        onChange={ (e) => {
                          this.buscachange(e)                                                
                        }}                                    
                        maxlength={8}                           
                      labelWidth={180}                      
                    />                 
         </FormControl>  
         <FormControl variant="outlined" className="buscar_status">
                            <InputLabel id="demo-simple-select-outlined-label">Status </InputLabel>
                            <Select                        
                              labelId="demo-simple-select-outlined-label"
                              id="busca"
                              value={this.state.campStatusId}                                    
                              onChange={ (e) => {
                                this.statusChange(e)
                              }}                  
                              labelWidth={100}          
                             >               
                             <MenuItem value={0}>TODOS</MenuItem>                    
                              {this.loadStatus()}                    
                              </Select>
                          </FormControl>    
       <Box bgcolor="error.main" color="error.contrastText" className="botoes_busca"  p={2} onClick={()=>this.sendBusca()}>
          <label className="text_busca"> <SearchIcon /> Buscar </label>          
       </Box>  

      </div>
       <br/>   
      <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead className="cabecalho_table">
          <TableRow>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">CPF</TableCell>
            <TableCell align="left">Nome</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Telefone</TableCell>           
            <TableCell align="left"></TableCell>
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
            > {localStorage.getItem('TituloModal')} Cliente
                <IconButton aria-label="editar" onClick={()=>this.handleCloseModal()} className="botao_close_modal">
                  <CloseOutlinedIcon />
                </IconButton>                                            
                 <br/>

                 <TesteAlteracao incluir={this.state.incluir}/>

         </ReactModal>  
       <Alert color={this.state.color}>
         {this.state.mensagem}
       </Alert>     
       <br/>
          <br/>
       <div className="botao_lista_incluir">
          <Fab size="large" color="secondary" variant="extended" onClick={()=>this.handleOpenIncluirModal()}>
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
        <TableRow key={data.id} className="resultado_tabela"> 
          <TableCell align="left">{data.status.descricao}</TableCell>
          <TableCell align="left">{data.cpf}</TableCell>
          <TableCell align="left">{data.nome}</TableCell>
          <TableCell align="left">{data.email}</TableCell>
          <TableCell align="left">{data.celular}</TableCell>          
          <TableCell align="right">
            <div style={{width:"250px"}}>              
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
