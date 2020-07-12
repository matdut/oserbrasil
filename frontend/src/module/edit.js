import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
const baseUrl = "http://34.210.56.22:3333"

class EditComponent extends React.Component{
  

  constructor(props){

    super(props);    

    this.state = {
      dataCliente:{},
      campNome: "",
      campEmail:"",
      campTelefone1:"",
      campTelefone2:"",
      campSenha:"",
      campEndereo: "",
      campComplemento:"",
      campCelular:"",
      campCidade:"",
      campEstado_id:0,
      campCep:"",
      campTipo_Cliente:"",
      campCpf:""
    }
  } 

  componentDidMount(){
    //console.log('entrou componentDidMount');
    // parametro de id del usuario

    let userId = this.props.match.params.id;

    console.log('user id - '+userId);
    // http://localhost:3000/employee/get/4
    const url = baseUrl+"/cliente/get/"+userId
    console.log('baseURL- '+url);

    axios.get(url)
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data[0]
        console.log( JSON.stringify(data, null, "    ") );
        this.setState({
          dataCliente:data,
          campNome: data.nome,              
          campEmail: data.email,
          campSenha: data.senha,
          campEndereco: data.endereco,
          campComplemento: data.complemento,
          campTelefone1: data.telefone1,
          campTelefone2: data.telefone2,
          campCelular: data.celular,
          campCidade: data.cidade,
          campBairro: data.bairro,
          campEstado_id: data.estado_id,
          campCep: data.cep,
          campTipo_cliente: data.tipo_cliente,
          campCpf: data.cpf
        })
      }
      else {
        alert("Error web service")
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })

  }

  render(){
    
    return (
      <div>
        <div className="form-row justify-content-center">
          <div className="form-group col-md-6">
            <label for="inputPassword4">Nome</label>
            <input type="text" className="form-control"  placeholder=""
              value={this.state.campNome} onChange={(value)=> this.setState({campNome:value.target.value})}/>
          </div>
          <div className="form-group col-md-6">
            <label for="inputEmail4">Email</label>
            <input type="email" class="form-control"  placeholder=""
              value={this.state.campEmail} onChange={(value)=> this.setState({campEmail:value.target.value})}/>
          </div>
        </div>  
        <div>      
          <div className="form-group col-md-6">
            <label for="inputEmail4">Telefone</label>
            <input type="text" className="form-control"  placeholder=""
              value={this.state.campTelefone1} onChange={(value)=> this.setState({campTelefone1:value.target.value})}/>
          </div>
        </div>
        <div className="form-group">
          <label for="inputAddress">Endereço</label>
          <input type="text" className="form-control" id="endereco" placeholder=""
            value={this.state.campEndereco} onChange={(value)=> this.setState({campEndereco:value.target.value})}/>
        </div>
        <button type="submit" className="btn btn-primary" onClick={()=>this.sendUpdate()}>Update</button>
      </div>
    );
  }

  sendUpdate(){

    // get parameter id
    let userId = this.props.match.params.id;
    // url de backend
    console.log('user id - '+userId);

    const baseUrl = "http://34.210.56.22:3333/cliente/update/"+userId
    // parameter data post
    console.log('baseURL- '+baseUrl);
    
    const datapost = {
      nome: this.state.campNome,
      email: this.state.campEmail,
      telefone1: this.state.campTelefone1,
      endereco: this.state.campEndereco,
    }
    console.log( JSON.stringify(this.state, null, "    ") );
    
    axios.post(baseUrl,datapost)
    .then(response => {
      if (response.data.success) {
        alert(response.data.message)
      }
      else {
        alert("Error")
      }
    })
    .catch ( error => {
      alert("Error 325 ")
    })

  }


}


export default EditComponent;
