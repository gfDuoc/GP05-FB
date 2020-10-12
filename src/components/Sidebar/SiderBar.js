import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

function SideBar(props) {
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    let title = capitalize(props.location.pathname.substring(1, props.location.pathname.length))
    if (props.location.pathname === '/') {
        console.log("let's go!")
    }

    function tipeMenu(title) {
        if (title === 'null' || title === 'Login') {
            return (<div className="hide-it"></div>)
        }
        else {
            return (
                <div className="sidebar-sticky  bg-dark">
                                    <nav id="sidebar" className="navbar  navbar-dark ">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <span className="text-white" > MENU</span>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/usuarios">Usarios</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/home">Unidades Internas</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/home">Roles</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/home">Flujos de Tareas</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/home">Tareas</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/home">Reportes</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/home">Empresas</a>
                        </li>
                    </ul>
                </nav>
                </div>


            )
        }
    }

    return (
        tipeMenu(title)
    )
}


export default withRouter(SideBar);