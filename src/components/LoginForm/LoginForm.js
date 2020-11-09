import React, {useContext, useState } from 'react';
import axios from 'axios';
import './LoginForm.css';
import { API_BASE_URL, ACCESS_TOKEN_NAME, userContext } from '../../constants/apiContants';
import { withRouter } from "react-router-dom";
function LoginForm(props) {
    const [state, setState] = useState({
        email: "",
        password: "",
        successMessage: null
    })
    const {user, setUser} = useContext(userContext);
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        const payload = {
            "email": state.email,
            "password": state.password,
        }
        axios.post(API_BASE_URL + '/login', payload)
            .then(function (response) {
                if (response.status === 201) {
                    setState(prevState => ({
                        ...prevState,
                        'successMessage': 'correcto, redirigiendo al home..'
                    }))
                    localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
                    setUser(state);
                    console.log(userContext);
                    props.updateUserName(state.email);
                    redirectToHome();
                    props.showError(null)
                }
                else if (response.code === 204) {
                    props.showError("correo o ncontraseña no coinciden");
                }
                else {
                    props.showError("correo no existe");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const redirectToHome = () => {
        props.updateTitle('Home')
        props.history.push('/home');
    }
    const redirectToRegister = () => {
        props.history.push('/register');
        props.updateTitle('Register');
    }
    return (
        <div className="card col-12  login-card mt-2 hv-center">
            <div className="card-header">
                <h3>Bienvenido</h3>
                <h5>por favor indentifiquese</h5>
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
                <div className="form-check">
                </div>
                <button type="submit"  className="btn btn-primary"  onClick={handleSubmitClick}> 
                Conectarse
                </button>
            </form>
            </div>
            <div className="card-footer">
                si no tiene cuenta por favor contactese con su encargado
      <div className="alert alert-success mt-2" style={{ display: state.successMessage ? 'block' : 'none' }} role="alert">
                    {state.successMessage}
                </div>
            </div>


            <div className="hide-it">
                <span>Dont have an account? </span>
                <span className="loginText" onClick={() => redirectToRegister()}>Register</span>
            </div>
        </div>
    )
}

export default withRouter(LoginForm);