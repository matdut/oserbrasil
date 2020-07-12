import React from 'react';
import ReactDOM from 'react-dom';
import Menu_evento from '../eventos/menu_evento' ;

export class MasterForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentStep: 1,
      email:  '',
      username: '',
      cpf: '',
      password: '', 
      ordemservico: '', 
      nomeevento: '',
      dataevento: '',
      tipotransporte: '',
    }
  }

  handleChange = event => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })    
  }
   
  handleSubmit = event => {
    event.preventDefault()
    const { email, username, password, cpf, ordemservico, nomeevento, 
            dataevento, tipotransporte } = this.state
    /*alert(`Your registration detail: \n 
           Email: ${email} \n 
           Username: ${username} \n
           Password: ${password}`) */
  }
  
  _next = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep >= 2? 3: currentStep + 1
    this.setState({
      currentStep: currentStep
    })
  }
    
  _prev = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep <= 1? 1: currentStep - 1
    this.setState({
      currentStep: currentStep
    })
  }

/*
* the functions for our button
*/
previousButton() {
  let currentStep = this.state.currentStep;
  if(currentStep !==1){
    return (
      <div className="container">    
        <button 
          className="btn btn-secondary" 
          type="button" onClick={this._prev}>
        Previous
        </button>
      </div>  
    )
  }
  return null;
}

nextButton(){
  let currentStep = this.state.currentStep;
  if(currentStep <3){
    return (
      <button 
        className="btn btn-primary float-right" 
        type="button" onClick={this._next}>
      Next
      </button>        
    )
  }
  return null;
}
  
  render() {    
    return (
      <React.Fragment>
        <div>             
              <Menu_evento /> 
              <br/>
              <div>
                <h2><center><stong>Cadastro de Eventos</stong></center></h2>
              </div>
        </div>      
   
      <form className="container" onSubmit={this.handleSubmit}>
      {/* 
         <h1>Criação do Evento 🧙‍♂️</h1>
      <p>Step {this.state.currentStep} </p> 

        render the form steps and pass required props in
      */}
        <Step1 
          currentStep={this.state.currentStep} 
          handleChange={this.handleChange}         
          ordemservico={this.state.ordemservico}
        />
        <Step2 
          currentStep={this.state.currentStep} 
          handleChange={this.handleChange}
          username={this.state.username}
        />
        <Step3 
          currentStep={this.state.currentStep} 
          handleChange={this.handleChange}
          password={this.state.password}
        />
        {this.previousButton()}
        {this.nextButton()}

      </form>
      </React.Fragment>
    );
  }
}

function Step1(props) {
  if (props.currentStep !== 1) {
    return null
  } 
  return(
    <div>    
       <div>                                      
             <div className="form-row">          
                <div className="form-group col-md-4">
                  <label htmlFor="ordemservico">Número de ordem *</label>
                  <input
                    className="form-control"
                    id="ordemservico"
                    name="ordemservico"
                    type="text"
                    placeholder=""
                    value={props.ordemservico}
                    onChange={props.ordemservico}
                    />
                </div>
                <div className="form-group col-md-4">
                  <label for="inputAddress">Nome Evento *</label>
                  <input type="text" className="form-control" placeholder="" 
                  value={props.nomeevento} 
                  onChange={props.handleChange}/>
                </div>
                <div className="form-group col-md-4">
                  <label for="inputAddress">Data do Evento *</label>
                  <input type="date" className="form-control" placeholder="" 
                  value={props.dataevento} 
                  onChange={props.handleChange}/>
                </div>
              </div>  
              <div className="form-row"> 
                <div className="form-group col-md-4">
                <label for="inputEmail4">CPF/CNPJ *</label>
                  <input type="text" className="form-control"  
                  placeholder="" value={props.cpf} 
                  onChange={props.handleChange} disabled/>
                </div> 
                <div className="form-group col-md-4">
                  <label for="inputEmail4">Nome *</label>
                  <input type="text" className="form-control"  
                  placeholder="" value={props.username} 
                  onChange={props.handleChange} disabled/>
                </div>
                <div className="form-group col-md-4">                
                  <label>Tipo do serviço *</label>
                  <select className="form-control" name="estado" 
                  onChange={props.handleChange} 
                  value={props.tipotransporte}>

                    <option selected>Selecione o serviço</option>                                                   
                  </select>
                </div> 
             </div>                           
            <br/>
      </div>     
    </div>  
  );
}

function Step2(props) {
  if (props.currentStep !== 2) {
    return null
  } 
  return(
    <div className="form-group">
      <label htmlFor="username">Username</label>
      <input
        className="form-control"
        id="username"
        name="username"
        type="text"
        placeholder="Enter username"
        value={props.username}
        onChange={props.handleChange}
        />
    </div>
  );
}

function Step3(props) {
  if (props.currentStep !== 3) {
    return null
  } 
  return(
    <div className="container-fluid">    
      <React.Fragment>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            id="password"
            name="password"
            type="password"
            placeholder="Enter password"
            value={props.password}
            onChange={props.handleChange}
            />      
        </div>
        <button className="btn btn-success btn-block">Sign up</button>    
      </React.Fragment>
    </div> 
  );
}

//ReactDOM.render(<MasterForm />, document.getElementById('root'));
export default MasterForm;