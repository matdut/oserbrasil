import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Cabecalho from './cabecalho';

const Servicos = props => {
//class servicosComponent extends React.Component  {

 /* constructor(props){
    super(props);
  }

  componentDidMount(){
     //this.loadCliente()
  }

  render()
  { */
    return (
      <div>
        <Cabecalho />
        <br/>
        <br/>
        <div className='container-fluid text-center'>
        <h2>SERVIÇOS</h2>        
        <br />
        <div className='row '>
        <div className='col-sm-4'></div>
            <div className='col-sm-4'>
                <span className='glyphicon glyphicon-plane logo-small'></span>
                <h4>Organização de Eventos</h4>  
                <p>Feiras, Congressos e Seminários</p>  
                <p>Convenções</p>  
                <p>Reuniões</p>              
            </div>           
        </div>
        <br /><br />        
      </div>  
    </div>
    );
  
}

export default Servicos;