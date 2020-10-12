import React, { useState } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";

function TaskForm(props) {
    const [state, setState] = useState({
        ID_tarea: 0,
        descripcion: "",
        observaciones: "",
        inicio: "",
        termino: "",
        nivel: 0,
        usuario_ID: 0,
        proceso_ID: 0,
        inicioRegistrado: "",
        terminoRegistrado: "",
        estadoTarea_ID: 0,
        tareaMadre: 0
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
                <p> Nueva Tarea</p>
                <div className="row">
                    <form>
                        <div className="form-group text-left">
                            <label htmlFor="descripcion">descripcion</label>
                            <input type="text"
                                className="form-control"
                                id="descripcion"
                                placeholder="de que se trata"
                                value={state.descripcion}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group text-left">
                            <label htmlFor="observaciones">observaciones</label>
                            <input type="text"
                                className="form-control"
                                id="observaciones"
                                placeholder="registre comentarios"
                                value={state.observaciones}
                                onChange={handleChange}
                            />
                        </div>
                <div className="form-group text-left">
                    <label htmlFor="inicio">inicio</label>
                    <input type="date" 
                        className="form-control" 
                        id="inicio" 
                        placeholder=""
                        value={state.inicio}
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="termino">termino</label>
                    <input type="date" 
                        className="form-control" 
                        id="termino" 
                        placeholder=""
                        value={state.termino}
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="proceso_ID">proceso</label>
                    <select className="form-control" id="proceso_ID">
                    <option>default</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="proceso_ID">tarea base</label>
                    <select className="form-control" id="tareaMadre">
                    <option>default</option>
                    </select>
                </div>
                    <input type="hidden" 
                        id="usuario_ID" 
                        placeholder="usuario_ID"
                        value={state.usuario_ID}
                        onChange={handleChange} 
                    />
                        

                    </form>
                </div>
            </div>
        </div>

    )

}

export default withRouter(TaskForm);