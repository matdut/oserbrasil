import React from 'react';
import { UserForm } from './UserForm';
import Menu_evento from '../eventos/menu_evento';

const Formevento = () => {
  return (
    <div> 
        <Menu_evento />
        <br/>
            <div className="App">
               <UserForm />
            </div>
    </div>   
  );
}

export default Formevento;