import React  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

//import api from '../../services/api';
//import base from '../../services/baseUrl';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
//import axios from 'axios';
import api from '../../services/api';
import Menu_cliente from '../cliente/menu_cliente' ;
//const baseUrl = "http://34.210.56.22:3333";

class Alterar_senha_Motorista extends React.Component  {
  constructor(props){
    super(props); 

    this.state = {             
        campSenha:"",
        campSenhaTeste:"",
        campSenhaAnterior:""
    }      
  }

  componentDidMount(){   
  }
  
  sendUpdate(userId){
  
   // let userId = this.props.match.params.id;
    // url de backend    

    //const Url = baseUrl+"/cliente/update/"+userId
    //const Url = baseUrl+"http://34.210.56.22:3333/cliente/update/"+userId
    // parameter data post
    //console.log('baseURL- '+baseUrl);
    //console.log( JSON.stringify(Url, null, "    ") );
    
    const datapost = {            
      senha: this.state.campSenha      
    }
    //console.log( JSON.stringify(datapost, null, "    ") );
    
    api.post('/motorista/update', datapost)
    .then(response => {
      if (response.data.success) {
       //alert(response.data.message)
       Swal.fire(
        'Alterado',
        'Você alterou sua senha com sucesso.',
        'success'
       )  

      if (this.state.perfil == 1) {
        this.props.history.push('/list');
      } else {
        this.props.history.push('/area_motorista');
      }
       
       
      }
      else {
        alert("Error")
      }
    })
    .catch ( error => {
      alert("Error 325 ")
    })  
  }  

  verifica_senha_anterior(){ 
    
    //const url = baseUrl+"/login/get/"+localStorage.getItem('logemail')+"/"+this.state.campSenhaAnterior
    //console.log( JSON.stringify(url, null, "    ") );    
    //console.log( JSON.stringify(this.state.campSenhaAnterior, null, "    ") );        
    
    api.get(`/login/get/${localStorage.getItem('logemail')}/${this.state.campSenhaAnterior}`) 
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data[0]        
        if (data.senha == this.state.campSenhaAnterior) {
            this.onAlterar(data.id);
        } else {
            Swal.fire(
                'Não Alterado',
                'Senha informada anterior não bate com a cadastrada',
                'error'
            )      
        }        
      }
      else {
        Swal.fire(
            'Erro',
            'Erro não previsto',
            'error'
        )      
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  
   }  

   onAlterar(id){
    Swal.fire({
      title: 'Você está certo?',
      text: 'Você não poderá recuperar estes dados!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, altera a senha!',
      cancelButtonText: 'Não, mantêm'
    }).then((result) => {
      if (result.value) {
        this.sendUpdate(id)
      } else if (result.dismiss == Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Seus dados não foram apagados :)',
          'error'
        )
      }
    })
  }
  render()
  {   
    return ( 
     <div>          
        <Menu_cliente />  
          <div>                    
            <div className="container"> 
              
                   <h3><strong>Alterar Senha</strong></h3>         
                   <br/>
                 <div className="form-row">                       
                   <div className="form-group col-md-3">
                      <label for="senha">Digite a Senha Anterior * </label>
                        <input type="password" className="form-control" placeholder="" value={this.state.campSenhaAnterior}
                        onChange={(value)=> this.setState({campSenhaAnterior:value.target.value})} /> 
                   </div>
                   <div className="form-group col-md-3">
                   <label for="senha">Digite a Nova Senha * </label>
                        <input type="password" className="form-control" placeholder="" value={this.state.campSenha}
                        onChange={(value)=> this.setState({campSenha:value.target.value})} /> 
                    </div>                
                    <div className="form-group col-md-3">
                    <label for="senhateste">Senha *</label>
                        <input type="password" className="form-control"  placeholder="Repita a sua Senha *" onBlur={this.verificaSenha}
                    value={this.state.campSenhaTeste} 
                    onChange={(value)=> this.setState({campSenhaTeste:value.target.value})} />
                    </div>                          
                </div>    
                <button type="submit" className="btn btn-primary" onClick={()=>this.verifica_senha_anterior()}>Cadastrar</button>     
            </div>
          </div> 
      </div>    
    );
  }

  
}

export default Alterar_senha_Motorista;