import React  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {Form, Input, FormFeedback, Select } from 'reactstrap';

//import api from '../../services/api';
//import base from '../../services/baseUrl';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
//import axios from 'axios';
import api from '../../services/api';
import Menu_cliente_individual from '../cliente/menu_cliente_individual' ;
//const baseUrl = "http://34.210.56.22:3333";

class Alterar_senha extends React.Component  {
  constructor(props){
    super(props); 

    this.state = {             
        campSenha:"",
        campSenhaTeste:"",
        campSenhaAnterior:"",
        mensagem_senha_nova: '',  
        mensagem_senha_teste: '',  
        mensagem_senha_anterior: '',  
        senha_disabled: true,
        validate: {
          senhaState: '',
          senhaTesteState: '',
          senhaAnteriorState: '',
        }  
    }  
    this.validaSenha = this.validaSenha.bind(this);   
    this.validaSenhaTeste = this.validaSenhaTeste.bind(this);
    this.validaSenhaAnterior = this.validaSenhaAnterior.bind(this);

    this.verificaSenha = this.verificaSenha.bind(this); 
    this.verificaSenhaTeste = this.verificaSenhaTeste.bind(this);   
    this.verificaSenhaAnterior = this.verificaSenhaAnterior.bind(this);   

    this.senhachange = this.senhachange.bind(this);
    this.senhatestechange = this.senhatestechange.bind(this);
    this.senhaAnteriorchange = this.senhaAnteriorchange.bind(this);
  }

  componentDidMount(){   
  }

  verificaSenha(e){
    const { validate } = this.state
     // alert('verificasenha');  
 
    if (e.target.value.length !== 0) {
      validate.senhaState = 'has-success'         
      
    } else{
      validate.senhaState = 'has-danger'
       this.setState({ mensagem_senha_nova: 'O Campo Senha é obrigatório' })  
    }
    this.setState({ validate }) 
       
   } 
   verificaSenhaAnterior(e){
    const { validate } = this.state
     // alert('verificasenha');  
 
    if (e.target.value.length !== 0) {
            

      api.get(`/login/getmotorista/${localStorage.getItem('logemail')}/${this.state.campSenhaAnterior}`) 
          .then(res=>{
            const data = res.data.data
              
             // console.log( JSON.stringify(data.length, null, "    ") );    
              if (data.length > 0 ) {
          
                validate.senhaAnteriorState = 'has-success'  
                this.setState({ senha_disabled: false });   
                        
              } else {
                validate.senhaState = 'has-danger'
                this.setState({ mensagem_senha_anterior: 'Senha informada anterior não bate com a cadastrada' })   
                this.setState({ senha_disabled: true });   
            }
          })
          .catch(error=>{
            alert("Error server "+error)
          })
      
    } else{
      validate.senhaState = 'has-danger'
       this.setState({ mensagem_senha_anterior: 'O Campo Senha Anterior é obrigatório' })  
    }
    this.setState({ validate }) 
       
   } 
   verificaSenhaTeste(e){
    const { validate } = this.state
     // alert('verificasenha');  
    if (this.state.campSenha == this.state.campSenhaTeste) {

      if (this.state.campSenhaTeste.length == 0) {
        validate.senhaTesteState = 'has-danger'
        this.setState({ mensagem_senha_teste: 'O Campo Senha de confirmação é obrigatório' })      
      }  
       
     } else {
      validate.senhaTesteState = 'has-danger'
      this.setState({ mensagem_senha_teste: 'As senhas informadas não são iguais' })      
     }
   } 

  validaSenha(e){
    const { validate } = this.state
     // alert('verificasenha');  
 
     
        if (e.target.value !== null) {
          validate.senhaState = 'has-success'         
          
        } else{
          validate.senhaState = 'has-danger'
          this.setState({ mensagem_senha_nova: 'O Campo Senha é obrigatório' })  
        }
        this.setState({ validate }) 
    
       
   } 

   validaSenhaAnterior(e){
    const { validate } = this.state
     // alert('verificasenha');  
 
     
        if (e.target.value !== null) {
          validate.senhaAnteriorState = 'has-success'         
          
        } else{
          validate.senhaAnteriorState = 'has-danger'
          this.setState({ mensagem_senha_anterior: 'O Campo Senha Anterior é obrigatório' })  
        }
        this.setState({ validate }) 
    
       
   } 
  senhachange(e) {
    this.setState({ campSenha: e.target.value })
  }
  senhaAnteriorchange(e) {
    this.setState({ campSenhaAnterior: e.target.value })
  }
  senhatestechange(e) {
    this.setState({ campSenhaTeste: e.target.value })
  }
  validaSenhaTeste(e){
    const { validate } = this.state
  
    if (this.state.campSenhaTeste.length == 0) {       
       
        validate.senhaTesteState = 'has-danger'
        this.setState({ mensagem_senha_teste: 'O Campo Senha de confirmação é obrigatório' })  
    }  else {      
      validate.senhaTesteState = 'has-success'
    }    
   } 
  sendUpdate(userId){ 
    const { validate } = this.state
    if (this.state.campSenha.length > 0 && this.state.campSenhaTeste.length > 0) {  
      if (this.state.campSenha == this.state.campSenhaTeste) {  
        const datapost = {            
          senha: this.state.campSenha      
        }
      // console.log( JSON.stringify(datapost, null, "    ") );
      // console.log( JSON.stringify(userId, null, "    ") );
        
        api.put(`/cliente/update/${userId}`, datapost)
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
            this.props.history.push('/area_cliente');
          }
          
          
          }
          else {
            alert("Error")
          }
        })
        .catch ( error => {
          alert("Altaração com erro  ")
        })  
      } else {
        validate.senhaTesteState = 'has-danger'
        this.setState({ mensagem_senha_teste: 'As senhas informadas não são iguais.' })  
      }  
    } else {
      if (this.state.campSenha.length == 0){
        validate.senhaState = 'has-danger'
        this.setState({ mensagem_senha_nova: 'O Campo Senha é obrigatório' })  
      }  
  
      if (this.state.campSenha.length == 0){
        validate.senhaTesteState = 'has-danger'
        this.setState({ mensagem_senha_teste: 'O Campo Senha de confirmação é obrigatório' })  
      }  
    }   
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
        <Menu_cliente_individual />  
          <div>                    
            <div className="container">               
                   <h3><strong>Alterar Senha</strong></h3>         
                   <br/>
                 <div className="form-row">  
                 <div className="form-group col-md-3">
                      <label for="senha">Digite a Senha Anterior * </label>
                      <Input      
                        disabled = {this.state.senha_disabled}                            
                        type="password"
                        name="senha_anterior"
                        id="senha"
                        placeholder=""
                        value={this.state.campSenhaAnterior}
                        valid={ this.state.validate.senhaAnteriorState === 'has-success' }
                        invalid={ this.state.validate.senhaAnteriorState === 'has-danger' }    
                        onBlur={this.verificaSenhaAnterior}                
                        onChange={ (e) => {
                          this.senhaAnteriorchange(e)                       
                          this.validaSenhaAnterior(e)
                        }}                                                                          
                      />                                
                      <FormFeedback 
                      invalid={this.state.validate.senhaAnteriorState}>
                          {this.state.mensagem_senha_anterior}
                      </FormFeedback>                                               
                   </div>                                        
                   <div className="form-group col-md-3">
                   <label for="senha">Digite a Nova Senha * </label>
                   <Input          
                    disabled = {this.state.senha_disabled}                                             
                    type="password"
                    name="senha_nova"
                    id="senha"
                    placeholder=""
                    value={this.state.campSenha}
                    valid={ this.state.validate.senhaState === 'has-success' }
                    invalid={ this.state.validate.senhaState === 'has-danger' }    
                    onBlur={this.verificaSenha}                
                    onChange={ (e) => {
                      this.senhachange(e)                       
                      this.validaSenha(e)
                    }}                                                                          
                  />                                
                  <FormFeedback 
                  invalid={this.state.validate.senhaState}>
                       {this.state.mensagem_senha_nova}
                  </FormFeedback>                         
                  </div>                
                  <div className="form-group col-md-3">
                    <label for="senhateste">Senha *</label>
                    <Input                           
                    type="password"
                    name="senha_nova"
                    id="senha"
                    placeholder="Confirme sua senha"
                    value={this.state.campSenhaTeste}
                    valid={ this.state.validate.senhaTesteState === 'has-success' }
                    invalid={ this.state.validate.senhaTesteState === 'has-danger' }    
                    onBlur={this.verificaSenhaTeste}                
                    onChange={ (e) => {
                      this.senhatestechange(e)                       
                      this.validaSenhaTeste(e)
                    }}                                                                          
                  />                                
                  <FormFeedback 
                  invalid={this.state.validate.senhaTesteState}>
                       {this.state.mensagem_senha_teste}
                  </FormFeedback>                                               
                    </div>                          
                </div>    
                <button type="submit" className="btn btn-primary" onClick={()=>this.sendUpdate()}>Atualizar</button>     
            </div>
          </div> 
      </div>    
    );
  }

  
}

export default Alterar_senha;