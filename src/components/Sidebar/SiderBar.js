import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

function SideBar(props) {
    const [data, setData] = useState({});
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    let title = capitalize(props.location.pathname.substring(1, props.location.pathname.length))
    if (props.location.pathname === '/') {
        setData(props.location.pathname )
        console.log(data)
    }

    function tipeMenu(title) {
        if (title === 'null' || title === 'Login') {
            return (<div className="hide-it"></div>)
        }
        else {
            return (
                <div className="col-2 bg-dark text-left">
                <div className="sidebar-sticky  bg-dark">
                                    <nav id="sidebar" className="navbar  navbar-dark ">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <span className="text-white" > MENU</span>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/Home">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/tareas">Tareas</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/procesos">procesos</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/usuarios">Usuarios</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/cargos">Cargos</a>
                        </li>
                        <li className="nav-item hide-it">
                            <a className="nav-link disabled" href="/#">Unidades Internas</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/empresas">Empresas</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="/#">Roles</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="/#">Reportes</a>
                        </li>
                    </ul>
                </nav>
                </div>
                </div>
            )
        }
    }

    return (
        tipeMenu(title)
    )
}


export default withRouter(SideBar);