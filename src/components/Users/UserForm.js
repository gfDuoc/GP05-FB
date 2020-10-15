import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { API_BASE_URL } from '../../constants/apiContants';
import SideBar from '../Sidebar/SiderBar';

function UserForm(props) {
    const [state, setState] = useState({
        ID_usuario: 0,
        nombreUsuario: "",
        contrasenna: "",
        nombre: "",
        apellidos: "",
        correo: "",
        perfil_ID: 0,
        cargo_ID: 0,
        empresa_ID: 0
    });
    const apiUrl = API_BASE_URL+"/usuarios/new";

    const InsertUser = (e) => {
        e.preventDefault();
        const data = { nombreUsuario: state.nombreUsuario, contrasenna: state.contrasenna, nombre: state.nombre, 
            apellidos: state.apellidos, correo: state.correo, perfil_ID: state.perfil_ID, cargo_ID: state.cargo_ID, empresa_ID: state.empresa_ID   };
        console.log(data)
        axios.post(apiUrl, data)
        .then(function(response) {
            console.log(response)
            if (response.status === 201) {
                props.history.push( '/usuarios/' + response.data.id );  
            }
            else if (response.code >= 400) {
                props.showError("error al contactar con servidor");
            }
            else {
                props.showError("error al crear");
            }
        })
        .catch(function (error) {
            props.showError("error al crear");
            console.log(error);
        });;
    };
    const handleChange = (e) => {
        e.persist();
        setState({ ...state, [e.target.name]: e.target.value });
    }

    return (
        <div className="row">
        <div className="col-2"><SideBar/></div>
        
             <div className="container mt-5" align="center">
       
            <div className="card col-10">
                <h2> Nuevo usuario</h2>
                <form onSubmit={InsertUser}> 
                    <div className="form-group text-left">
                        <label htmlFor="descripcion">Nombre</label>
                        <input type="text"
                            className="form-control"
                            id="nombreUsuario"
                            name="nombreUsuario"
                            placeholder="del usuario"
                            value={state.nombreUsuario}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="descripcion">contraseña</label>
                        <input type="password"
                            className="form-control"
                            id="contrasenna"
                            name="contrasenna"
                            placeholder="*****************"
                            value={state.contrasenna}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="descripcion">nombre</label>
                        <input type="text"
                            className="form-control"
                            id="nombre"
                            name="nombre"
                            placeholder="nombre del ususario"
                            value={state.nombre}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="descripcion">apellidos</label>
                        <input type="text"
                            className="form-control"
                            id="apellidos"
                            name="apellidos"
                            placeholder="apellidos del ususario"
                            value={state.apellidos}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="descripcion">Correo</label>
                        <input type="email"
                            className="form-control"
                            id="correo"
                            name="correo"
                            placeholder="correo@usuario.cl"
                            value={state.correo}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="proceso_ID">perfil</label>
                        <select className="form-control" id="perfil_ID">
                            <option>default</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="proceso_ID">Cargo</label>
                        <select className="form-control" id="cargo_ID">
                            <option>default</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="proceso_ID">Empresa</label>
                        <select className="form-control" id="Empresa_ID">
                            <option>default</option>
                        </select>
                    </div>
                    <div className="card-footer">
                        <div className="row">
                            <div className="col">
                            <button  type="submit" className="btn btn-outline-info">Guardar </button>  
                            </div>
                            <div className="col">
                            <button  type="reset" className="btn btn-outline-secondary">Limpiar </button>  
                            </div>
                        </div>
                    </div>

                </form>

            </div>
        </div>
        </div>
        
    )
}

export default withRouter(UserForm);