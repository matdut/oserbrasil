import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import axios from 'axios';
import { Link } from "react-router-dom";
import api from '../../services/api';
import { Input, Alert } from 'reactstrap';

import ReactModal from 'react-modal';
import Box from '@material-ui/core/Box';
import MaterialTable from 'material-table';
import { Tabs, Tab } from 'react-bootstrap';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import CheckIcon from '@material-ui/icons/Check';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { Data } from '@react-google-maps/api';
import MenuItem from '@material-ui/core/MenuItem';

//library sweetalert
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Menu_administrador from '../administrador/menu_administrador';
import Avatar from '@material-ui/core/Avatar';

var dateFormat = require('dateformat');
const perfil = localStorage.getItem('logperfil');
const nome = localStorage.getItem('lognome');  

const customStyles = {
  overlay: {    
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)'
  },
  content : {
    top                    : '0px',
    left                   : '66%',    
    right                  : '0%',
    bottom                 : 'auto',  
    height                 : '100%',    
    width                  : '560px',    
    padding                : '0px !important',      
    overflow               : 'auto',
    WebkitOverflowScrolling: 'touch',
    position               : 'absolute',
    border: '1px solid #ccc',   
  }
};

/*
let columns = [
  { id: '1', label: '', minWidth: 80, align: 'left' },
  { id: 'status', label: 'Status', minWidth: 80, align: 'left' },
  { id: 'cpf', label: 'Cpf', minWidth: 100, align: 'left'},
  { id: 'nome', label: 'Nome', minWidth: 200, align: 'left' },
  { id: 'email', label: 'Email', minWidth: 90, align: 'left' },
  { id: 'telefone', label: 'Telefone', minWidth: 60, align: 'left' },
  { id: 'acao', label: '', minWidth: 100, align: 'left' },
];
*/
class listComponent extends React.Component  {

  constructor(props){
    super(props);
    this.state = {
      perfil: perfil,
      mensagem: '',
      campNome: "",
      campData_nascimento:"",
      campSeguradoraNome: '',
      campEmail:"",      
      campTelefone1:"",
      campCpf:"", 
      campCNH: "", 
      camp_foto_url: '',
      camp_foto_CNH_url: '',
      campCep: '',
      campNome: '',
      campEndereco: '',
      campBairro: '',
      campNumero: '',
      campComplemento:"",
      campData_CNH: "", 
      campStatusId: '',     
      campVeiculoId: '',    
      campCarroId: 0,
      campCarro: '',
      campCarroNovo: '',
      campModeloId: 0,
      campModelo: '',
      campModeloNovo: '',
      campPlaca: "",
      campAnodut: '',
      campAno: "",
      campCor: "",
      campNome: "",
      campApolice: "",
      campNomeSalvar: "",
      campSeguradoraNome: "",  
      estado_selecionado: '',
      seleciona_bilingue: 0,
      mensagem_nome: '',  
      mensagem_cpf: '',  
      mensagem_email: '',  
      mensagem_telefone1: '',
      mensagem_data_nascimento: '',        
      mensagem_numero_carteira: '',    
      mensagem_datavalidade: '',    
      erro_cpf: false,
      erro_nome: false,
      erro_datanascimento: false,
      erro_email: false,
      erro_telefone: false,
      validacao_cep: false,
      validacao_numero: false,
      validacao_complemento: false,
      validacao_cpf: false,
      validacao_nome: false,
      validacao_datanascimento: false,
      validacao_email: false,
      validacao_telefone: false,  
      color: 'light',
      listMotorista:[],
      listaMarcas:[],
      listaModelos:[],
      listMotoristaExcluidos:[],
      listaStatus:[],
      listSeguradoras:[],      
      listaVeiculos:[],
      validate: {         
        carroState: '',          
        modeloState: '',          
        corState: '',     
        placaState: '',     
        anoState: '',     
        anoDUTState: '',     
        apoliceState: '',     
        seguroState: '',     
      }    
    }

    this.busca_motorista = this.busca_motorista.bind(this);
    this.carroChange = this.carroChange.bind(this);
    this.modeloChange = this.modeloChange.bind(this);

    this.veiculoChange = this.veiculoChange.bind(this);

  }

  componentDidMount(){
    this.setState({
      perfil: localStorage.getItem('logperfil')    
    });
    
    if (localStorage.getItem('logperfil') == 0) {
      
      this.props.history.push(`/login`);       

    } else {
        this.loadMotorista();  
        this.carrega_status();  
        this.carrega_marca_banco();
    }    
  }

  carrega_estado() {
    api.get('/estado/getNome/'+this.state.campEstadoId)
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data
        this.setState({ estado_selecionado:data[0].nome})
      }
      else {
        alert('Lista vazia')
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })

  }

  carroChange(e) {             
    const { validate } = this.state
     console.log('carrochange value - '+e.target.value )          
      validate.modeloState = ''    
      this.setState({ 
        validate,
        campCarroId: e.target.value         
      })       
      
      this.load_modelo_banco(e.target.value);
  }

  loadMarcaData(){   
    return this.state.listaMarcas.map((data)=>{          
      return(
        <MenuItem value={data.id}>{data.name}</MenuItem>              
      )
    })     
  
   }

   loadModelosData(){
  
    return this.state.listaModelos.map((data)=>{          
      return(
        <MenuItem value={data.id}>{data.name}</MenuItem>           
      )
    })     
  
   }

   loadSeguradorasData(){
  
    return this.state.listSeguradoras.map((data)=>{          
      return(
        <MenuItem value={data.id}>{data.nome}</MenuItem>             
      )
    })     
  
   }

   buscaSeguradora(id){
  
    if (id !== null && id !== undefined) {
      //const baseUrl = "http://34.210.56.22:3333"
     //const url = baseUrl+"/seguradora/list"
      api.get(`seguradora/get/${id}`)
      .then(res=>{
        if (res.data.success) {
          console.log(JSON.stringify(res.data, null, "    ")); 
          const data = res.data.data
          this.setState({
            campSeguradoraNome: data[0].nome 
          })
        }
        else {
          alert("Erro de conexão buscaSeguradora")
        }
      })
      .catch(error=>{
        alert("Error server "+error)
      })
    }
   }  

   carrega_marca_banco(){
    const { validate } = this.state   
    api.get('/marca/list')
    .then((val)=>{    
     
      if (val.data.data !== null) {
        const data = val.data.data
        this.setState({ 
          listaMarcas: data     
        });       
      }  

     }).catch(error=>{
        validate.cnpjState = 'has-danger'
        this.setState({           
            mensagem_carro: 'Lista não encontrada' 
        })  
    })

  }

  carrega_motorista_veiculo() {
    const { validate } = this.state;
    api.get(`/veiculo/get/${localStorage.getItem('logVeiculo')}`)
    .then(res=>{
       // console.log(JSON.stringify(res.data, null, "    ")); 
        if (res.data.data.length > 0) {          

          this.setState({   
            campCarro: res.data.data[0].marca,
            campModelo: res.data.data[0].modelo,
            campCarroId: res.data.data[0].marcaId,
            campModeloId: res.data.data[0].modeloId,
            campApolice: res.data.data[0].apolice,
            campSeguradoraId: res.data.data[0].seguradoraId,
            campPlaca: res.data.data[0].placa,
            campAnodut: res.data.data[0].anodut,            
            campAno: res.data.data[0].ano,
            campCor: res.data.data[0].cor,                       
            inicio: 2       
          })            

           this.buscaSeguradora(res.data.data[0].seguradoraId)
           this.load_modelo_banco(this.state.campCarroId)
           localStorage.setItem('lognome', this.state.campNome);  


          if (this.state.campCarro == null) {
            this.setState({   
              campCarro: ''
            })
          }  
          if (this.state.campModelo == null) {
            this.setState({   
              campModelo: ''
            })
          }  
          if (this.state.campPlaca == null) {
            this.setState({   
              campPlaca: ''
            })
          }  
          if (this.state.campAno == null) {
            this.setState({   
              campAno: ''
            })
          }  
          if (this.state.campAnodut == null) {
            this.setState({   
              campAnodut: ''
            })
          }  
          if (this.state.campCor == null) {
            this.setState({   
              campCor: ''
            })
          }  
          if (this.state.campApolice == null) {
            this.setState({   
              campApolice: ''
            })
          }  
          if (this.state.campSeguradoraId == null) {
            this.setState({   
              campSeguradoraId: 0
            })
          }  

          if (this.state.campCarro !== "") {
            validate.carroState = 'has-success'      
          }
          if (this.state.campPlaca !== "") {
            validate.placaState = 'has-success'      
          }
          if (this.state.campModelo !== "") {
            validate.modeloState = 'has-success'      
          }
          if (this.state.campAno !== "") {
            validate.anoState = 'has-success'      
          }
          if (this.state.campAnodut !== "") {
            validate.anoDUTState = 'has-success'      
          }
          if (this.state.campCor !== "") {
            validate.corState = 'has-success'      
          }   
          if (this.state.campApolice !== "") {
            validate.apoliceState = 'has-success'      
          }   
          if (this.state.campSeguradoraId !== 0) {
            validate.seguroState = 'has-success'      
          }             

          this.setState({ 
            validate,
            incluir: false
          })
         

        } else {
          this.setState({ 
            incluir: true
          })
        } 
      })        
      .catch(error=>{
        alert("Error de conexão carrega_veiculo "+error)
      })   
    }

  load_modelo_banco(marca_id){
    const { validate } = this.state   
    api.get(`/modelo/get/${marca_id}`)
    .then((val)=>{
//          console.log(JSON.stringify(val.data, null, "    ")); 
    //  console.log('Marca - ' + JSON.stringify(val))
      if (val.data.data !== null) {
        const data = val.data.data
        this.setState({ 
          listaModelos: data     
        });  
      }  

     }).catch(error=>{
        validate.cnpjState = 'has-danger'
        this.setState({           
            mensagem_carro: 'Lista não encontrada' 
        })  
    })

  }

   buscaMarca(id) { 
    //let marca_saida = ''      
    console.log('id entrada Marca - '+id);
      this.state.listaMarcas.map((data)=>{          
         if (data.id == id) {
            console.log('buscaMarca - '+data.name);     
            localStorage.setItem('logMarca', data.name)
           // marca_saida = data.name                   
         }

       }) 
     /*  console.log('id saida Marca - '+marca_saida);
       this.setState({           
        campCarroNovo: marca_saida    
      })*/  

   }

   buscaModelo(id) {       
   // let modelo_saida = ''      
    console.log('id entrada Modelo - '+id);
    this.state.listaModelos.map((data)=>{          
       if (data.id == id) {
         console.log('buscaModelo - '+data.name); 
         localStorage.setItem('logModelo', data.name)
         //modelo_saida = data.name                       
       }
     }) 
   /*  console.log('id saida Modelo - '+modelo_saida);
     this.setState({           
      campModeloNovo: modelo_saida     */
   
 }

 modeloChange(e) {   
  console.log('modelochange value - '+e.target.value )  
  //let modelo = e.target.value   
  //console.log('modeloId value - '+this.state.campModeloId)  
  //const { validate } = this.state
  //console.log('listaModelos - '+JSON.stringify(modelo, null, "    ")); 
  this.setState({ 
      campModeloId: e.target.value,                 
    //  campModelo: this.state.listaModelos[this.state.campModeloId].name
  })    

}
corChange(e) {
  this.setState({ campCor: e.target.value })
}
anoChange(e) {
  this.setState({ campAno: e.target.value })
}
anoDUTChange(e) {
  this.setState({ campAnodut: e.target.value })
}
placaChange(e) {
  this.setState({ campPlaca: e.target.value })
}
apoliceChange(e) {
  this.setState({ campApolice: e.target.value })
}
seguradoraChange(event) {     
  this.setState({
      campSeguradoraId: event.target.value
  });    
}

  busca_motorista() {
    const { validate } = this.state   
    api.get(`/motorista/get/${localStorage.getItem('logeditid')}`)
    .then(res=>{
        console.log(JSON.stringify(res.data, null, "    ")); 
        if (res.data.success) {
           
          this.setState({ 
            campCpf: res.data.data[0].cpf,
            campNome: res.data.data[0].nome,
            campData_nascimento: dateFormat(res.data.data[0].data_nascimento, "UTC:dd/mm/yyyy"),            
            campEmail: res.data.data[0].email,      
            camp_foto_url: res.data.data[0].foto_url,
            camp_foto_CNH_url: res.data.data[0].foto_CNH_url, 
            campTelefone1: res.data.data[0].celular,
            campCnpj: res.data.data[0].cnpj,   
            campStatusId: res.data.data[0].statusId,
            campCNH: res.data.data[0].numero_carteira,   
            campData_CNH: res.data.data[0].data_validade,   
            campMotorista_bilingue: res.data.data[0].bilingue,   
            campCidade: res.data.data[0].cidade,
            campComplemento: res.data.data[0].complemento,
            campNumero: res.data.data[0].numero,
            campBairro: res.data.data[0].bairro,
            campEstado: res.data.data[0].estadoId,
            campEstadoId: res.data.data[0].estadoId,
            campEndereco: res.data.data[0].endereco,          
            campCep: res.data.data[0].cep,      
            incluir: false, 
            inicio: 2,
            validacao_cpf: true,
            validacao_nome: true,
          })                           

          if (this.state.campEstadoId !== 0) {
            this.carrega_estado()
          }
  
          this.carrega_veiculos();

          this.setState({ validate })
        } 
      })        
      .catch(error=>{
        alert("Error de conexão motorista "+error)
      })       
  
  }

   loadStatus(){
  
    return this.state.listaStatus.map((data)=>{          
      return(
        <option key={data.descricao} value={data.id}>{data.descricao} </option>
      )
    })     
  
   }

   loadVeiculos(){
  
    return this.state.listaVeiculos.map((data)=>{          
      return(
        <option key={data.modelo} value={data.modeloId}> {data.modelo} </option>
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

   carrega_veiculos(){ 
   
    api.get(`/veiculo/lista_veiculos/${localStorage.getItem('logeditid')}`)
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data
        this.setState({listaVeiculos:data})
      }
      else {
        alert("Erro de conexão")
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  
   }  

  loadMotorista(){
   // const url = baseUrl+"/motorista/list"
   api.get('/motorista/list')
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data
        this.setState({listMotorista:data})
      }
      else {
        alert("Erro de conexão")
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  }

  loadMotoristaExcluidos(){
    // const url = baseUrl+"/motorista/list"
    api.get('/motorista/listExcluidos')
     .then(res=>{
       if (res.data.success) {
         const data = res.data.data
         this.setState({listMotoristaExcluidos:data})
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

  handleOpenModal(data) {
    this.setState({ 
      showModal: true,            
      mensagem_aguarde: '',
    });    
    localStorage.setItem('logeditid', data.id);     
    //console.log('buscar_cliente ');
    this.busca_motorista();   

    if (localStorage.getItem('logperfil') == 1) {
      this.setState({ 
        camp_cpf_disabled: true,
        camp_nome_disabled: true,
        camp_datanasc_disabled: false,
        camp_email_disabled: true,
        camp_telefone_disabled: false,
      });
    }

   // this.prepareSave();
  }  
  
  handleCloseModal () {
    this.setState({ 
      showModal: false,  
      campStatusId: 0,  
    });
    localStorage.setItem('logeditid', '');
    
    this.loadMotoristaExcluidos();
    this.loadMotorista();     
  //  this.carrega_status();  
    
  }

  mostrar_endereco() {

    if (this.state.campEndereco !== "") {
    return (    
       <div> 
          <div className="titulo_modal_editar">Endereço</div>             
          <div className="descricao_modal_endereço">
            {this.state.campEndereco} <br/>
            {this.state.campBairro+' , '+this.state.campCidade+' / '+this.state.estado_selecionado} 
          </div> 
      </div>            
    );
  
    } else {
      return (
        ""
      );
    }
  }

  sendSave(){        
 
    const datapost = {
      nome: this.state.campNome,              
      email: this.state.campEmail,
      celular: this.state.campTelefone1,    
      data_nascimento: moment(this.state.campData_nascimento, "DD MM YYYY"),         
      cpf: this.state.campCpf,
      data_validade: moment(this.state.campData_CNH, "DD MM YYYY"), 
      numero_carteira: this.state.campCNH,    
      bilingue: this.state.campMotorista_bilingue,   
      perfilId: 3,
      statusId: this.state.campStatusId,
      situacaoId: 1
    }            
  
     console.log('datapost - '+JSON.stringify(datapost, null, "    ")); 
  
       console.log('Alterar - '+JSON.stringify(datapost, null, "    ")); 
        api.put(`/motorista/update/${localStorage.getItem('logid')}`, datapost)
        .then(response=>{
          if (response.data.success==true) {                        
            
            const logindata = {  
              email: this.state.campEmail,  
              perfilId: 3,
              statusId: this.state.campStatusId
            }
  
            api.put(`/login/update/${localStorage.getItem('logid')}`,logindata)
  
            localStorage.setItem('lognome', this.state.campNome);  
            //localStorage.setItem('logid', userId);
            if (localStorage.getItem('logperfil') == 1) {
              this.props.history.push(`/area_administrador`);
            } else if (localStorage.getItem('logperfil') == 3) {
              this.props.history.push(`/area_motorista`);                   
            }           
  
          }
          else {
            console.log('criar - '+JSON.stringify(datapost, null, "    ")); 
            alert("Error na Criação verificar log")              
          }
        }).catch(error=>{
          alert("Error 34 ")
        })
  
  }  
 
  verifica_botao(inicio) {
    const { validate } = this.state    
    if (inicio == 1) {
      return (
       <div>                  
          <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado_modal_scroll" p={2}>
                <div className="d-flex justify-content-center">
                <label> Salvar Alterações </label>
                </div>     
          </Box>           
      </div>     
      );   
    } else {
    if (this.state.validacao_cep == true && this.state.validacao_cpf == true && this.state.validacao_nome == true
        && this.state.validacao_datanascimento == true) {
          return (    
            <div>                                          
                  <Box  bgcolor="error.main" color="error.contrastText" className="botoes_habilitados_modal_scroll"  p={2} onClick={()=>this.sendSave()}>
                    <div className="d-flex justify-content-center">
                          <label> Salvar Alterações </label>                          
                    </div>                    
                  </Box>                                                  
            </div>       
          );
        } else {
          return (
            <div>              
              <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado_modal_scroll" p={2}>
                    <div className="d-flex justify-content-center">
                      <label> Salvar Alterações </label>
                    </div>     
              </Box>           
            </div>
        );   
        }   
      }      
  
   
  } 

  seleciona_carro() {
     if (this.state.listaVeiculos.length > 0) {
        console.log('Lista'+JSON.stringify(this.state.listaVeiculos[0].id, null, "    ")); 
        localStorage.setItem('logVeiculo', this.state.listaVeiculos[0].id);
        this.carrega_motorista_veiculo();
     }
  }
  render()
  {
    return (
      <div>    
       <div>
          <Menu_administrador />  
          <div className="titulo_admministrador">
              <div className="unnamed-character-style-4 descricao_admministrador">          
                  <h3><strong>Lista de Motoristas</strong></h3>
              </div>      
            </div>

       </div>       
       <div className="container_modal_list">                
        <br/>
    
        <Tabs 
           defaultActiveKey="ativos" id="uncontrolled-tab-example" className="tabs_titulo_lista">
          <Tab eventKey="ativos" title="Ativos">
              <div style={{ maxWidth: '95%' }}>    
                        <MaterialTable          
                            title=""
                            columns={[
                              { title: '', field: '#', width: '40px' },
                              { title: 'Status', field: 'status.descricao', width: '155px' },
                              { title: 'CPF', field: 'cpf', align: 'center', width: '150px' },
                              { title: 'Nome', field: 'nome', width: '350px' },
                              { title: 'Email', field: 'email', width: '400px' },
                              { title: 'Telefone', field: 'celular', align: 'center', width: '150px'},                                              
                              { title: '', field: '#', width: '20px' },                              
                              { title: '', field: '#', width: '40px' },                              
                              { title: '', field: '', align: 'left', lookup: { 1: 'sadas', 2: 'asdas' }, },         
                            ]}
                            data={this.state.listMotorista}   
                            localization={{
                              body: {
                                emptyDataSourceMessage: 'Nenhum registro para exibir'
                              },
                              toolbar: {
                                searchTooltip: 'Pesquisar',
                                searchPlaceholder: 'Buscar motorista',        
                              },
                              pagination: {
                                labelRowsSelect: 'linhas',
                                labelDisplayedRows: '{count} de {from}-{to}',
                                firstTooltip: 'Primeira página',
                                previousTooltip: 'Página anterior',
                                nextTooltip: 'Próxima página',
                                lastTooltip: 'Última página'
                              },
                              header: {
                                actions: 'Ação',
                              },
                            }}        
                            options={{
                              rowStyle: { backgroundColor: "#fff", fontFamily: "Effra" },
                              searchFieldStyle: { backgroundColor: "#fff", fontFamily: "Effra", fontSize: "16px", width: "450px" , color: "#0F074E"  },
                              paginationPosition: 'bottom',  
                              searchFieldAlignment: 'left', 
                              exportAllData: true,
                              exportFileName: 'Rel_adm_motorista',
                              search: true,     
                              searchFieldVariant: 'outlined', 
                              toolbarButtonAlignment: 'right',           
                              /*exportButton: true, */            
                              exportButton: { pdf: true },          
                              actionsColumnIndex: 8,
                              pageSize: 7,
                              pageSizeOptions: [7],    
                            }}
                            actions={[
                              {             
                                icon: 'edit',
                                onClick: (evt, data) => this.handleOpenModal(data)
                              }
                            ]}
                          />      
                </div>      
          </Tab>       
          <Tab eventKey="excluidos" title="Excluidos">
              <div style={{ maxWidth: '95%' }}>    
                        <MaterialTable          
                            title=""
                            columns={[
                              { title: 'Status', field: 'status.descricao', width: '155px' },
                              { title: 'CPF', field: 'cpf', align: 'center', width: '150px' },
                              { title: 'Nome', field: 'nome', width: '350px' },
                              { title: 'Email', field: 'email', width: '400px' },
                              { title: 'Telefone', field: 'celular', align: 'center', width: '150px'},                                              
                              { title: '', field: '#', width: '20px' },                              
                              { title: '', field: '#', width: '40px' },                              
                              { title: '', field: '', lookup: { 1: 'sadas', 2: 'asdas' }, },            
                            ]}
                            data={this.state.listMotoristaExcluidos}   
                            localization={{
                              body: {
                                emptyDataSourceMessage: 'Nenhum registro para exibir'
                              },
                              toolbar: {
                                searchTooltip: 'Pesquisar',
                                searchPlaceholder: 'Buscar motorista',         
                              },
                              pagination: {
                                labelRowsSelect: 'linhas',
                                labelDisplayedRows: '{count} de {from}-{to}',
                                firstTooltip: 'Primeira página',
                                previousTooltip: 'Página anterior',
                                nextTooltip: 'Próxima página',
                                lastTooltip: 'Última página'
                              },
                              header: {
                                actions: 'Ação',
                              },
                            }}        
                            options={{
                              rowStyle: { backgroundColor: "#fff", fontFamily: "Effra" },
                              searchFieldStyle: { backgroundColor: "#fff", fontFamily: "Effra", fontSize: "16px", width: "450px" , color: "#0F074E"  },
                              paginationPosition: 'bottom',  
                              searchFieldAlignment: 'left', 
                              exportAllData: true,
                              exportFileName: 'Rel_adm_motorista_excluidos',
                              search: true,     
                              searchFieldVariant: 'outlined', 
                              toolbarButtonAlignment: 'right',           
                              /*exportButton: true, */            
                              exportButton: { pdf: true },          
                              actionsColumnIndex: 8,
                              pageSize: 7,
                              pageSizeOptions: [7],    
                            }}
                            actions={[
                              {             
                                icon: 'edit',
                                onClick: (evt, data) => this.handleOpenModal(data)
                              }
                            ]}
                          />      
                </div>      
          </Tab>          
        </Tabs>   
        <ReactModal 
            isOpen={this.state.showModal}
            style={customStyles}
            contentLabel="Inline Styles Modal Example"                                  
            ><div className="editar_titulo">  Editar Motorista 
                <IconButton aria-label="editar" onClick={()=>this.handleCloseModal()} className="botao_close_modal">
                  <CloseOutlinedIcon />
                </IconButton></div>                           

          <div className="container_alterado">
            <div className="d-flex justify-content">        
             <div>     
                <div class="d-flex flex-column espacamento_caixa_modal">
                  <div class="p-2">  
                    <div class="d-flex justify-content-start">
                        <div>
                            <Avatar alt={localStorage.getItem('lognome')} 
                          src={this.state.camp_foto_url} variant="circle" className="avatar_tamanho"/>            
                        </div>  

                        <div>
                           <FormControl variant="outlined">
                              <InputLabel className="label_cpf_modal_motorista" htmlFor="filled-adornment-password">CPF</InputLabel>
                              <OutlinedInput 
                                  className="text_cpf_modal_motorista"         
                                  autoComplete="off"                                   
                                  type="text"                       
                                  error={this.state.erro_cpf}
                                  helperText={this.state.mensagem_cpf}                     
                                  id="cep_incluir"                      
                                  variant="outlined"
                                  value={this.state.campCpf}                                  
                                endAdornment={
                                  <InputAdornment position="end">
                                      {this.state.validacao_cpf? <CheckIcon />: ''}
                                  </InputAdornment>
                                }
                                labelWidth={50}
                              />  
                           </FormControl>   
                           <br/>
                           <FormControl variant="outlined">
                              <InputLabel className="label_text_motorista" htmlFor="filled-adornment-password">Nome</InputLabel>
                              <OutlinedInput
                                  autoComplete="off"
                                  type="text"                       
                                  error={this.state.erro_nome}
                                  helperText={this.state.mensagem_cpf}
                                  className="nome_modal_motorista"                       
                                  id="nome_incluir"                   
                                  variant="outlined"
                                  value={this.state.campNome}                            
                                endAdornment={
                                  <InputAdornment position="end">
                                      {this.state.validacao_nome? <CheckIcon />: ''}
                                  </InputAdornment>
                                }
                                labelWidth={50}
                              />                         
                        </FormControl>                           
                            <br/>
                            <FormControl variant="outlined" className="buscar_status_modal">
                              <InputLabel className="label_modal_motorista" id="demo-simple-select-outlined-label">Status </InputLabel>
                              <Select                                                 
                                autoComplete="off"                     
                                className="data_modal_motorista"                                                
                                labelId="demo-simple-select-outlined-label"
                                id="busca"
                                value={this.state.campStatusId}                                    
                                onChange={ (e) => {
                                  this.statusChange(e)
                                }}                  
                                labelWidth={60}          
                              >                                            
                                {this.loadStatus()}                    
                                </Select>
                            </FormControl>        
                        </div>  
                    </div>
                  </div>
                  <div class="p-2">
                    <FormControl variant="outlined" className="posicao_caixa_texto">
                          <InputLabel className="label_email_motorista" htmlFor="filled-adornment-password">Email</InputLabel>
                          <OutlinedInput    
                              autoComplete="off"      
                              readOnly={this.state.camp_email_disabled}                                   
                              type="email"
                              error={this.state.erro_email}
                              helperText={this.state.mensagem_email}
                              className="text_email_modal"                       
                              id="outlined-basic"                   
                              variant="outlined"
                              value={this.state.campEmail}
                              onBlur={this.verificaEmail}                     
                              onFocus={this.verificaEmailonfocus}
                              onChange={ (e) => {
                                          this.emailchange(e) 
                                          this.validateEmail(e)
                                          this.validaEmailChange(e)                                
                                        } }    
                              inputProps={{
                                  maxLength: 50,
                              }}                                                      
                            endAdornment={
                              <InputAdornment position="end">
                                  {this.state.validacao_email? <CheckIcon />: ''}
                              </InputAdornment>
                            }
                            labelWidth={50}                      
                          />
                        <FormHelperText error={this.state.erro_email}>
                              {this.state.mensagem_email}
                        </FormHelperText>
                      </FormControl>                       
                  </div>
                  <div class="p-2">  
                    <div class="d-flex justify-content-start">
                        <div>
                        <FormControl variant="outlined" className="posicao_caixa_texto">
                            <InputLabel className="label_telefone_motorista" htmlFor="filled-adornment-password">Telefone</InputLabel>
                            <OutlinedInput   
                                autoComplete="off"           
                                readOnly={this.state.camp_telefone_disabled}            
                                error={this.state.erro_telefone}
                                helperText={this.state.mensagem_telefone1}
                                className="text_telefone_modal"                       
                                id="outlined-basic"                   
                                variant="outlined"
                                value={this.state.campTelefone1}                
                                onBlur={this.verificaTelefone1}            
                              //  onFocus={this.verificaTelefone1onfocus}
                                onChange={ (e) => {
                                  this.telefone1change(e)                       
                                  this.validatelefone1Change(e)
                                }}                                      
                              endAdornment={
                                <InputAdornment position="end">
                                    {this.state.validacao_telefone? <CheckIcon />: ''}
                                </InputAdornment>
                              }
                              labelWidth={80}                      
                            />
                          <FormHelperText error={this.state.erro_telefone}>
                                {this.state.mensagem_telefone1}
                          </FormHelperText>
                        </FormControl>                            
                      </div>                                                         

                         <div>
                         <FormControl variant="outlined" className="posicao_caixa_texto">
                            <InputLabel className="label_data_nascimento_motorista" htmlFor="filled-adornment-password">Data de Nascimento</InputLabel>
                            <OutlinedInput      
                                autoComplete="off"                    
                                readOnly={this.state.camp_datanasc_disabled}                     
                                error={this.state.erro_datanascimento}
                                helperText={this.state.mensagem_data_nascimento}
                                className="text_data_nascimento_modal"                       
                                id="outlined-basic"                   
                                variant="outlined"
                                value={this.state.campData_nascimento}
                                onBlur={this.verificaDataNascimento}
                                onChange={ (e) => {
                                  this.data_nascimentochange(e)                       
                                  this.validaDataNascimentoChange(e)
                                }}                                    
                                inputProps={{
                                  maxLength: 10,
                                }}     
                              endAdornment={
                                <InputAdornment position="end">
                                    {this.state.validacao_datanascimento? <CheckIcon />: ''}
                                </InputAdornment>
                              }
                              labelWidth={140}                      
                            />
                          <FormHelperText error={this.state.erro_datanascimento}>
                                {this.state.mensagem_data_nascimento}
                          </FormHelperText>
                        </FormControl>  
                         </div> 
                    </div>
                  </div>
                  <div class="p-2">  
                   <div className="sub_titulo_modal_editor"> Endereço </div>                
                   </div>             
              
              <div class="p-2">
                <div class="d-flex justify-content-start">
                  <div>      
                    <FormControl variant="outlined" className="posicao_caixa_texto">
                          <InputLabel className="label_cep_motorista" htmlFor="filled-adornment-password">Cep</InputLabel>
                          <OutlinedInput 
                              autoComplete="off"                                   
                              type="text"                       
                              error={this.state.erro_cep}
                              helperText={this.state.mensagem_cep}
                              className="text_cep_modal"                       
                              id="cep_incluir"                      
                              variant="outlined"
                              value={this.state.campCep}
                              onblur={this.verificaCep}
                              onKeyUp={this.verificaCep}   
                              onChange={ (e) => {
                                this.cepchange(e)                       
                                this.validaCepChange(e)
                              }}                         
                              inputProps={{
                                maxLength: 9,
                              }}
                            endAdornment={
                              <InputAdornment position="end">
                                  {this.state.validacao_cep? <CheckIcon />: ''}
                              </InputAdornment>
                            }
                            labelWidth={50}
                          />
                          <div className="naoseiocep_modal">
                              <a className="alink" href="http://www.buscacep.correios.com.br/sistemas/buscacep/" target="_blank">Não sei meu CEP</a> 
                          </div> 
                        <FormHelperText error={this.state.erro_cep}>
                              {this.state.mensagem_cep}
                        </FormHelperText>
                        </FormControl>         
                     </div>
                        <div>
                           {this.mostrar_endereco()}       
                        </div>
                   </div>                     
                </div>
                <div class="p-2">
                  <div class="d-flex justify-content-start">
                    <div>
                    <FormControl variant="outlined" className="posicao_caixa_texto">
                        <InputLabel className="label_numero_motorista" htmlFor="filled-adornment-password">Número</InputLabel>
                        <OutlinedInput   
                            autoComplete="off"           
                            error={this.state.erro_numero}
                            helperText={this.state.mensagem_numero}
                            className="text_numero_modal"                                    
                            id="numero_incluir"                      
                            variant="outlined"
                            value={this.state.campNumero}
                            onblur={this.verificaNumero}
                            onKeyUp={this.verificaNumero}
                            onChange={ (e) => {
                              this.numerochange(e)                       
                              this.validaNumeroChange(e)
                            }}           
                          endAdornment={
                            <InputAdornment position="end">
                                {this.state.validacao_numero? <CheckIcon />: ''}
                            </InputAdornment>
                          }
                          labelWidth={80}                      
                        />
                        <FormHelperText error={this.state.erro_numero}>
                                {this.state.mensagem_numero}
                          </FormHelperText>
                    </FormControl>                           
                    </div>
                    <div> 
                    <FormControl variant="outlined" className="posicao_caixa_texto">
                        <InputLabel className="label_complemento_motorista" htmlFor="filled-adornment-password">Complemento</InputLabel>
                        <OutlinedInput 
                            autoComplete="off"                                   
                            type="text"                       
                            error={this.state.erro_complemento}
                            helperText={this.state.mensagem_complemento}                                    
                            id="complemento_incluir"   
                            className="text_complemento_modal"                                    
                            variant="outlined"
                            value={this.state.campComplemento}
                            onblur={this.verificaComplemento}
                            onKeyUp={this.verificaComplemento}
                            onChange={ (e) => {
                              this.complementochange(e)                       
                              this.validaComplementoChange(e)
                            }}                                  
                            maxlength="9"     
                          endAdornment={
                            <InputAdornment position="end">
                                {this.state.validacao_complemento? <CheckIcon />: ''}
                            </InputAdornment>
                          }
                          labelWidth={110}
                        />                        
                      <FormHelperText error={this.state.erro_complemento}>
                            {this.state.mensagem_complemento}
                      </FormHelperText>
                      </FormControl>    
                    </div>
                  </div> 
                </div>    
                <div class="p-2">  
                <FormControl variant="outlined" className="buscar_status_modal">
                    <InputLabel className="label_veiculo_motorista" id="demo-simple-select-outlined-label">Veiculos </InputLabel>
                              <Select                                                 
                                autoComplete="off"                     
                                className="text_veiculo_motorista"                                                
                                labelId="demo-simple-select-outlined-label"
                                id="busca"
                                value={this.state.campVeiculoId}                                                                    
                                onFocus={this.seleciona_carro()}
                                onChange={ (e) => {
                                  this.veiculoChange(e)
                                }}                  
                                labelWidth={60}          
                              >                                            
                                {this.loadVeiculos()}                    
                                </Select>
                            </FormControl>   
                  </div>
                <div class="p-2">  
                   <div className="sub_titulo_modal_editor"> Detalhes do Veículos </div>                
                </div>                 
                <div class="p-2">               
                        <div class="d-flex justify-content-start">
                            <div> 
                            <FormControl variant="outlined">
                                  <InputLabel className="label_marca_autocomplete_motorista" id="demo-simple-select-outlined-label">Marca </InputLabel>
                                  <Select                                                 
                                    autoComplete="off"                     
                                    className="text_marca_autocomplete_motorista"                                                
                                    labelId="demo-simple-select-outlined-label"
                                    id="busca"
                                    value={this.state.campCarroId}  
                                    onBlur={this.verificaCarro}
                                    //onFocus={this.verificaCarro}
                                    onChange={ (e) => {
                                      this.carroChange(e)                       
                                      this.validaCarroChange(e)
                                    }}                                                                               
                                    labelWidth={60}   
                                  >          
                                  <MenuItem value={0}>Selecione a marca</MenuItem>                                         
                                    {this.loadMarcaData()}                    
                                    </Select>
                                </FormControl>                                                                                                           
                            </div>                        
                            <div>   
                            <FormControl variant="outlined">
                                  <InputLabel className="label_modelo_autocomplete_motorista" id="demo-simple-select-outlined-label">Modelo </InputLabel>
                                  <Select                                                 
                                    autoComplete="off"                     
                                    className="text_modelo_autocomplete_motorista"                                                
                                    labelId="demo-simple-select-outlined-label"
                                    id="busca"
                                    value={this.state.campModeloId}                             
                                    onBlur={this.verificaModelo}
                                    onChange={ (e) => {
                                      this.modeloChange(e)                       
                                      this.validaModeloChange(e)
                                    }}                                                                               
                                    labelWidth={60}   
                                  >          
                                  <MenuItem value={0}>Selecione o modelo</MenuItem>                                         
                                    {this.loadModelosData()}                    
                                    </Select>
                                </FormControl>                                                                              
                            </div>                        
                        </div>
                    </div> 
                    <div class="p-2">   
                        <div className="d-flex justify-content-start">
                            <div>
                            <FormControl variant="outlined">
                                <InputLabel className="label_placa_text_motorista" htmlFor="filled-adornment-password">Placa</InputLabel>
                                <OutlinedInput 
                                    autoComplete="off"                                   
                                    type="text"                       
                                    error={this.state.erro_cep}
                                    helperText={this.state.mensagem_cep}
                                    className="text_placa_motorista"                       
                                    id="cep_incluir"                      
                                    variant="outlined"
                                    value={this.state.campPlaca}
                                    onBlur={this.verificaPlaca}                    
                                    onChange={ (e) => {
                                      this.placaChange(e)                       
                                      this.validaPlacaChange(e)
                                    }}                         
                                    maxlength="9"     
                                  endAdornment={
                                    <InputAdornment position="end">
                                        {this.state.validacao_cep? <CheckIcon />: ''}
                                    </InputAdornment>
                                  }
                                  labelWidth={50}
                                />                  
                                <FormHelperText error={this.state.erro_cep}>
                                      {this.state.mensagem_cep}
                                </FormHelperText>
                              </FormControl>                      
                            </div> 
                            
                            <div>
                            <FormControl variant="outlined">
                                <InputLabel className="label_ano_text_motorista" htmlFor="filled-adornment-password">Ano</InputLabel>
                                <OutlinedInput 
                                    autoComplete="off"                                   
                                    type="text"                       
                                    error={this.state.erro_cep}
                                    helperText={this.state.mensagem_cep}
                                    className="text_ano_motorista"                       
                                    id="cep_incluir"                      
                                    variant="outlined"
                                    value={this.state.campAno}                        
                                    onBlur={this.verificaAno}
                                    onChange={ (e) => {
                                      this.anoChange(e)                       
                                      this.validaAnoChange(e)
                                    }}                         
                                    maxlength="9"     
                                  endAdornment={
                                    <InputAdornment position="end">
                                        {this.state.validacao_cep? <CheckIcon />: ''}
                                    </InputAdornment>
                                  }
                                  labelWidth={30}
                                />                  
                                <FormHelperText error={this.state.erro_cep}>
                                      {this.state.mensagem_cep}
                                </FormHelperText>
                              </FormControl>                             
                            </div>                        
                        </div>
                    </div> 
                    <div class="p-2">    
                      <div class="d-flex justify-content-start">
                            <div>
                            <FormControl variant="outlined">
                                <InputLabel className="label_cor_text_motorista" htmlFor="filled-adornment-password">Cor</InputLabel>
                                <OutlinedInput 
                                    autoComplete="off"                                   
                                    type="text"                       
                                    error={this.state.erro_cep}
                                    helperText={this.state.mensagem_cep}
                                    className="text_cor_motorista"                       
                                    id="cep_incluir"                      
                                    variant="outlined"
                                    value={this.state.campCor}                            
                                    onBlur={this.verificaCor}
                                    onChange={ (e) => {
                                      this.corChange(e)                       
                                      this.validaCorChange(e)
                                    }}                          
                                    maxlength="9"     
                                  endAdornment={
                                    <InputAdornment position="end">
                                        {this.state.validacao_cep? <CheckIcon />: ''}
                                    </InputAdornment>
                                  }
                                  labelWidth={30}
                                />                  
                                <FormHelperText error={this.state.erro_cep}>
                                      {this.state.mensagem_cep}
                                </FormHelperText>
                              </FormControl>                          
                            </div>
                            <div>
                            <FormControl variant="outlined">
                                <InputLabel className="label_anodut_text_motorista" htmlFor="filled-adornment-password">Ano do DUT</InputLabel>
                                <OutlinedInput 
                                    autoComplete="off"                                   
                                    type="text"                       
                                    error={this.state.erro_cep}
                                    helperText={this.state.mensagem_cep}
                                    className="text_anodut_motorista"                       
                                    id="cep_incluir"                      
                                    variant="outlined"
                                    value={this.state.campAnodut}                        
                                    onBlur={this.verificaAnoDUT}
                                    onChange={ (e) => {
                                      this.anoDUTChange(e)                       
                                      this.validaAnoDUTChange(e)
                                    }}                        
                                    maxlength="9"     
                                  endAdornment={
                                    <InputAdornment position="end">
                                        {this.state.validacao_cep? <CheckIcon />: ''}
                                    </InputAdornment>
                                  }
                                  labelWidth={80}
                                />                  
                                <FormHelperText error={this.state.erro_cep}>
                                      {this.state.mensagem_cep}
                                </FormHelperText>
                              </FormControl>                           
                            </div>                                                       
                      </div>    
                  </div>      
                  <div class="p-2">     
                  <FormControl variant="outlined">
                                  <InputLabel className="label_seguradora_autocomplete_motorista" id="demo-simple-select-outlined-label">Seguradora </InputLabel>
                                  <Select                                                 
                                    autoComplete="off"                     
                                    className="text_seguradora_autocomplete_motorista"                                                
                                    labelId="demo-simple-select-outlined-label"
                                    id="busca"
                                    value={this.state.campSeguradoraId}                          
                                    onBlur={this.verificaSeguro}
                                    onChange={ (e) => {
                                      this.seguradoraChange(e)                       
                                      this.validaSeguroChange(e)
                                    }}                                                                                 
                                    labelWidth={110}   
                                  >          
                                  <MenuItem value={0}>Selecione a seguradora</MenuItem>                                         
                                    {this.loadSeguradorasData()}                    
                                    </Select>
                                </FormControl>                                         
                  </div> 
                  <div class="p-2">    
                  <FormControl variant="outlined">
                                <InputLabel className="label_apolice_text_motorista" htmlFor="filled-adornment-password">Número Apólice</InputLabel>
                                <OutlinedInput 
                                    autoComplete="off"                                   
                                    type="text"                       
                                    error={this.state.erro_cep}
                                    helperText={this.state.mensagem_cep}
                                    className="text_apolice_motorista"                
                                    id="cep_incluir"                      
                                    variant="outlined"
                                    value={this.state.campApolice}                           
                                    onBlur={this.verificaApolice}
                                    onChange={ (e) => {
                                      this.apoliceChange(e)                       
                                      this.validaApoliceChange(e)
                                    }}                   
                                    maxlength="9"     
                                  endAdornment={
                                    <InputAdornment position="end">
                                        {this.state.validacao_cep? <CheckIcon />: ''}
                                    </InputAdornment>
                                  }
                                  labelWidth={130}
                                />                  
                                <FormHelperText error={this.state.erro_cep}>
                                      {this.state.mensagem_cep}
                                </FormHelperText>
                              </FormControl>    
                
                 </div>                    
                <div class="p-2">  
                   <div className="sub_titulo_modal_editor"> Documentos </div>                
                </div>  
                <div class="p-2">  
                  <div class="d-flex justify-content-start">
                    <div>
                       <div className="titulo_motorista_modal">CNH</div>
                       <div className="sub_titulo_motorista_modal">Carteira Nacional de Habilitação</div>          
                       <br/>             
                    </div>
                    <div>
                       <img src={this.state.camp_foto_CNH_url} variant="circle" className="foto_cnh_motorista"/>
                    </div>
                  </div>    
                </div>            

                </div>
                <div className="mensagem_aguarde">
                    <FormHelperText>
                        {this.state.mensagem_aguarde}
                    </FormHelperText>       
                  </div>                   
                  {this.verifica_botao(this.state.inicio)}        
              </div>
            </div>
          </div>                
        </ReactModal>        

      </div>   
    </div>  
    );
  }
  onIncluir() {
    this.props.history.push(`/motorista_incluir/0`);   
  }
 
  veiculoChange(e){    
    this.setState({ campVeiculoId: e.target.value })     
    
    localStorage.setItem('logVeiculo', this.state.campVeiculoId);
    this.carrega_motorista_veiculo();      
    
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
        
    api.delete(`/login/delete/${data.email}`)    

    api.delete(`/veiculo/deleteMotorista/${userId}`)    

    api.delete(`/motorista/delete/${userId}`)
    .then(response =>{
      if (response.data.success) {
      
        this.loadMotorista()
        this.loadFillData()
      }
    })
    .catch ( error => {
      alert("Error 325 ")
    })
  }

}

export default listComponent;
