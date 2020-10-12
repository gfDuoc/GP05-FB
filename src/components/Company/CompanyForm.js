import React, { useState } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";

function UserForm(props) {
    const [state, setState] = useState({
        ID_empresa: 0,
        razonSocial: ""
    })

    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    return (
        <div>
            <div className="card">
                <p> Nuevo usuario</p>
                <form>
                    <div className="form-group text-left">
                        <label htmlFor="descripcion">ID</label>
                        <input type="text"
                            className="form-control"
                            id="nombreUsuario"
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
                            placeholder="*****************"
                            value={state.contrasenna}
                            onChange={handleChange}
                        />
                    </div>
                </form>

            </div>
        </div>
    )
}

export default withRouter(UserForm);