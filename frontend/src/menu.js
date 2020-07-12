import React, {Component} from 'react';
import {Link} from 'react-router-dom';

const links = [
    { route: "/", label: "Inicio"},
    { route: "/sobre", label: "Sobre"},
    { route: "/servicos", label: "Servicos"},
    { route: "/contato", label: "Contato"},
    { route: "/logout", label: "Sair"},
    { route: "/login", label: "Entrar"},
];

export class Menu extends Component {
    renderLink = () => {
        return links.map( link =>
            <Link key={link.route} className="nav-link" to={link.route}>
                {link.label}
            </Link>
        )
    }

    render() {
        const login = localStorage.getItem('logemail');              
        const nome = localStorage.getItem('lognome');
        const id = localStorage.getItem('logid');

        return (
            <div className="container-fluid">                          
                <nav className="navbar navbar-expand-xl bg-danger navbar-dark justify-content-end">
                <li className="nav-item">
                    <Link className="nav-link" to='#'> <span class="glyphicon glyphicon-user"></span> Bem vindo (a), {nome} </Link>     
                </li> 
                    <ul className="navbar-nav">
                        { this.renderLink() }
                    </ul>
                </nav>
            </div>
        )
    }
};

export default Menu;