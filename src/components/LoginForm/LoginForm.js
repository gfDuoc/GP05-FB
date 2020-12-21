import React, {useState } from 'react';
// import React, {useState } from 'react';
import axios from 'axios';
import './LoginForm.css';
// import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiContants';
import {API_BASE_URL_ALT, ACCESS_TOKEN_NAME } from '../../constants/apiContants';
import { withRouter } from "react-router-dom";
//import User from '../Users/User';
//import { configure } from '@testing-library/react';


function LoginForm(props) {
    const [isLoading, setLoading] =  useState(false)
    const [state, setState] = useState({
        email: "",
        password: "",
        successMessage: null
    })
    
    localStorage.clear();

    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const handleSubmitClick = (e) => {
        setLoading(true)
        props.showError(null)
        e.preventDefault();
        
        const payload = {
            username: state.email,
            password: state.password,
        }
        const headerAxio = axios.create({
            headers:{'Access-Control-Max-Age':600}
        })
        //axios.post(API_BASE_URL+'/api/Usuario/Validar', payload,headerAxio)
        axios.post(API_BASE_URL_ALT+'/usuario/validar', payload,headerAxio)
            .then(function (response) {
                console.log("pasando!");
                if (response.status === 200 || response.status === 201  ) {
                    localStorage.setItem(ACCESS_TOKEN_NAME,response.data.token)
                    localStorage.setItem("idUsuario",response.data.idUsuario)
                    localStorage.setItem("idPerfil",response.data.idPerfil)
                    localStorage.setItem("nombreUsuario",response.data.nombreUsuario)
                    redirectToHome();
                }
                else if (response.code === 204) {
                    props.showError("credenciales inválidas");
                }
                else {
                    props.showError("correo no existe");
                }
            })
            .catch(function (error) {
                console.log(error);
                props.showError("error de contato al servidor")
            });
    }
    const redirectToHome = () => {
        props.updateTitle('Home')
        props.history.push('/home');
    }

    return (
        <div className="card col-12  login-card mt-2 hv-center">
            <div className="card-header">
                <h3>Bienvenido</h3>
                <h5>Ingrese sus credenciales</h5>
            </div>
            <div className="card-body">            
            <form>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">Correo</label>
                    <input type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="user@correo.com"
                        value={state.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Contraseña</label>
                    <input type="password"
                        className="form-control"
                        id="password"
                        placeholder="**********"
                        value={state.password}
                        onChange={handleChange}
                    />
                </div>
                <button  id="loginBtn" type="submit"  className="btn btn-block btn-primary"  onClick={handleSubmitClick}> 
                Conectarse
                </button>
                <div id="homeWaiter" className={isLoading? 'show-it' :'hide-it'}  >
                <div className="spinner-grow text-success"></div>
                <div className="spinner-grow text-success"></div>
                <div className="spinner-grow text-success"></div>
                <div className="spinner-grow text-success"></div>
                <div className="spinner-grow text-success"></div>
                </div>
            </form>
            </div>
            <div className="card-footer">
                si no tiene cuenta por favor contactese con su encargado
      <div className="alert alert-success mt-2" style={{ display: state.successMessage ? 'block' : 'none' }} role="alert">
                    {state.successMessage}
                </div>
            </div>
        </div>
    )
}

export default withRouter(LoginForm);