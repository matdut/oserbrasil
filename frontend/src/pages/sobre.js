import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Cabecalho from './cabecalho';
import FileUpload from "../pages/FileUpload";



class sobreComponent extends React.Component  {
//const Sobre = props => {
    constructor(props){
        super(props);

    }     
    

    componentDidMount(){
        //this.loadCliente()
     }
    
//class sobreComponent extends React.Component  {

 /* constructor(props){
    super(props);
  }

  componentDidMount(){
     //this.loadCliente()
  }

  */
  render()
  {     
    return (
        <div>
        <Cabecalho />
        <br/>    
        <div className="container" style={{ width: "600px" }}>
            <div className="my-3">
                <h3>bezkoder.com</h3>
                <h4>React Hooks File Upload</h4>
            </div>

            <FileUpload />
        </div>
        <div>    
      </div>        
        <br/>
        <div className='container-fluid'>
            <div>
                <div className='row'>
                    <div className='col-sm-8'>
                      <div className="card">                        
                        <div className="card-body">
                            <h2 className="card-title">Sobre a GÊD eventos</h2><br />
                            <p className="card-text">
                            A Gêd Eventos foi criada para realizar qualquer tipo de evento, do mais simples ao mais sofisticado, visando sempre a satisfação total do cliente. Nosso equipe é treinada e especializada para atender da melhor maneira possível e transformar o sua experiência inesquecível para você e seus convidados. Há mais de quinze anos executando um serviço de alto nível, desde o planejamento até a execução de todas as tarefas.
Trabalhamos com propostas personalizadas para que a sua festa seja do jeito que você deseja. Oferecemos soluções de transporte e logística de eventos,  atendimento personalizado, colocando à disposição do cliente profissionais altamente qualificados e discretos, onde a qualidade, segurança, confiança e pontualidade são prioridades.
Acreditamos que é possível aliar qualidade e bom preço e nosso objetivo principal é que sua festa realmente seja um sonho realizado.Temos tudo o que você precisar, não possuímos pacotes prontos, todos os nossos orçamentos são personalizados, de acordo com a sua necessidade e sua disponibilidade.
                            </p>
                        </div>                         
                       </div> 
                    </div>    
                    <div className='col-sm-4'>      
                      <br/>                                   
                      <br/>
                      <div className='row'>
                            <img className="img-sobre" src='sobre1.png' width='180' height='180' />  

                            <img className="img-sobre" src='sobre2.png' width='180' height='180' />
                      </div>
                    </div>                    
                    
                </div>
            </div>

            <div className='container-fluid bg-grey'>
                <div className='row'>                  
                    <div className='col-sm-8'>
                        <h2>Transporte para Eventos</h2>
                        <br />
                        <h4>
                        A GêD cuida de toda a logística de transporte de seu evento, com a qualidade e eficiência já conhecidas. Temos uma frota diferenciada e preparada, trazendo requinte e agilidade ao seu evento com coordenação 24 horas por dia.

                            Não perca mais tempo e deixe que a GêD resolva seus problemas de transporte. 
                        </h4><br />                      
                    </div>
                    <div className='col-sm-4'>
                           <img className="img-sobre" src='veiculo1.png' width='200' height='200' /> 
                    </div>
                </div>
            </div>

            
            <div className='container-fluid bg-grey'>
                <div className='row'>
                   
                    <div className='col-sm-8'>
                        <h2>Receptivo em Aeroporto</h2><br />
                        <h4>
                            Oferecemos serviço de coordenação / recepção em aeroporto, para aqueles que necessitam de segurança e discrição desde o momento da aterrissagem. Profissionais capacitados buscam os clientes no setor de embarque ou no avião, dependendo a necessidade.
                        </h4><br />                      
                    </div>
                    <div className='col-sm-4'>
                           <img className="img-sobre" src='aviao1.png' width='200' height='200' /> 
                    </div>
                </div>
            </div>
        </div>
      </div>  
    );
  }    
}

export default sobreComponent;
