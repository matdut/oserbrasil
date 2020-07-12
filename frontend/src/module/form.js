import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import axios from 'axios';

class EditComponent extends React.Component{

  constructor(props){
   super(props);
   this.state = {
    campNome: "",
    campEmail:"",
    campEmailTeste:"",
    campTelefone1:"",
    campTelefone2:"",
    campSenha:"",
    campSenhaTeste:"",
    campEndereco: "",
    campComplemento:"",
    campCelular:"",
    campCidade:"",
    campTipo_cliente:"F",
    campEstado_id:0,
    campCep:"",    
    campCpf:""
   }
 }

 render(){

   return (
     <div>              
        <div className="form-row"> 
          <div className="form-group col-md-3">
            <label for="email">Email *</label>
            <input type="text" className="form-control"  placeholder="" value={this.state.campEmail} onChange={(value)=> this.setState({campEmail:value.target.value})}/>
          </div>
          <div className="form-group col-md-3">
            <label for="inputEmail4">Email *</label>
            <input type="email" className="form-control"  placeholder="Repita o seu Email *" value={this.state.campEmailTeste} onChange={(value)=> this.setState({campEmailTeste:value.target.value})}/>
          </div>
          <div className="form-group col-md-3">
            <label for="inputPassword4">Senha * </label>
            <input type="text" className="form-control"  placeholder="" value={this.state.campSenha} onChange={(value)=> this.setState({campSenha:value.target.value})}/>
          </div>
          <div className="form-group col-md-3">
            <label for="inputEmail4">Senha *</label>
            <input type="text" className="form-control"  placeholder="Repita a sua Senha *" value={this.state.campSenhaTeste} onChange={(value)=> this.setState({campSenhaTeste:value.target.value})}/>
          </div>
        </div>       
        <div className="form-row"> 
          <div className="form-group col-md-4">
            <label for="inputPassword4">Cpf *</label>
            <input type="text" className="form-control"  placeholder="" value={this.state.campCpf} onChange={(value)=> this.setState({campCpf:value.target.value})}/>
          </div>
          <div className="form-group col-md-8">
            <label for="inputEmail4">Nome</label>
            <input type="nome" className="form-control"  placeholder="" value={this.state.campNome} onChange={(value)=> this.setState({campNome:value.target.value})}/>
          </div>
        </div>         
       <div className="form-row">         
         <div className="form-group col-md-6">
           <label for="inputEmail4">Endereço *</label>
           <input type="text" className="form-control"  placeholder=""  value={this.state.campEndereco} onChange={(value)=> this.setState({campEndereco:value.target.value})}/>
         </div>
         <div className="form-group col-md-6">
          <label for="inputAddress">Complemento *</label>
          <input type="text" className="form-control" placeholder="" value={this.state.campComplemento} onChange={(value)=> this.setState({campComplemento:value.target.value})}/>
         </div>
       </div>      

       <div className="form-row">         
        <div className="form-group col-md-4">
            <label for="inputEmail4">Telefone1 *</label>
            <input type="text" className="form-control"  placeholder=""  value={this.state.campTelefone1} onChange={(value)=> this.setState({campTelefone1:value.target.value})}/>
        </div>
        <div className="form-group col-md-4">
          <label for="inputAddress">Telefone2 *</label>
          <input type="text" className="form-control" placeholder="" value={this.state.campTelefone2} onChange={(value)=> this.setState({campTelefone2:value.target.value})}/>
        </div>
        <div className="form-group col-md-4">
          <label for="inputAddress">Celular *</label>
          <input type="text" className="form-control" placeholder="" value={this.state.campCelular} onChange={(value)=> this.setState({campCelular:value.target.value})}/>
        </div>
       </div>

       <div className="form-row">         
          <div className="form-group col-md-2">
              <label for="inputEmail4">Bairro *</label>
              <input type="text" className="form-control"  placeholder=""  value={this.state.campBairro} onChange={(value)=> this.setState({campBairro:value.target.value})}/>
          </div>
          <div className="form-group col-md-4">
            <label for="inputAddress">Cep *</label>
            <input type="text" className="form-control" placeholder="" value={this.state.campCep} onChange={(value)=> this.setState({campCep:value.target.value})}/>
          </div>
          <div className="form-group col-md-2">
            <label for="inputAddress">Cidade *</label>
            <input type="text" className="form-control" placeholder="" value={this.state.campCidade} onChange={(value)=> this.setState({campCidade:value.target.value})}/>
          </div>
          <div className="form-group col-md-4">
            <label for="inputAddress">Estado *</label>
            <input type="text" className="form-control" placeholder="" value={this.state.campEstado_id} onChange={(value)=> this.setState({campEstado_id:value.target.value})}/>
          </div>
       </div>
      <button type="submit" className="btn btn-primary" onClick={()=>this.sendSave()}>Save</button>
     </div>
   );
 }

 sendSave(){

   /// por si no ha seleccionado nada de role  
  if (this.state.campTelefone1=="") {
     alert("Digite o campo de telefone")
  }
  else if (this.state.campNome=="") {
     alert("Digite o campo de nome")
  }
  else if (this.state.campEmail=="") {
     alert("Digite o campo de email")
  }
  else if (this.state.campEndereco=="") {
     alert("Digite o campo de endereço")
  }
  else {

    // url de backend
    const baseUrl = "http://34.210.56.22:3333/cliente/create"

    // parametros de datos post
    const datapost = {
      nome: this.state.campNome,              
      email: this.state.campEmail,
      senha: this.state.campSenha,
      endereco: this.state.campEndereco,
      complemento: this.state.campComplemento,
      telefone1: this.state.campTelefone1,
      telefone2: this.state.campTelefone2,
      celular: this.state.campCelular,
      cidade: this.state.campCidade,
      bairro: this.state.campBairro,
      estado_id: this.state.campEstado_id,      
      cep: this.state.campCep,
      tipo_cliente: this.state.campTipo_cliente,
      cpf: this.state.campCpf
    }

    axios.post(baseUrl,datapost)
    .then(response=>{
      if (response.data.success===true) {
       // this.sendSucesso(response.data)
        alert(response.data.message)        
      }
      else {
        alert(response.data.message)
      }
    }).catch(error=>{
      alert("Error 34 ")
    })

  }

}

}


export default EditComponent;
