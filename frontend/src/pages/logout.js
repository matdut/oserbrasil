//import { Component } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory, Router, Route} from 'react-router';
import Inicio from '../pages/inicio';

//import { useHistory, useLocation } from 'react-router-dom';
//const history = useHistory();                 

class logoutComponent extends React.Component  {

    componentWillMount() {              

        localStorage.removeItem('logemail');
        localStorage.removeItem('lognome');       
        localStorage.removeItem('logid');                    
        //this.props.navigate('Inicio');
    }
   
     
    render() {                  
        return null;  
    }
}
export default logoutComponent;
ReactDOM.render(<logoutComponent />, document.getElementById('root'));