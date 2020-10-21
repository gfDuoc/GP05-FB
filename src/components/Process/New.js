/* PROCESO
{ID_proceso: 0,
descripcion: "",
modelo: "",
inicio: "",
termino: "",
detalle: "",
empresa_ID: 0}
*/
import React, { useState } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { API_BASE_URL } from '../../constants/apiContants';
import SideBar from '../Sidebar/SiderBar';

function ProcessForm(props) {
    var laUrl = "/procesos"
    const [error, setError] = useState(null)
    const [state, setState] = useState({
        ID_proceso: 0,
        descripcion: "",
        modelo: "",
        inicio: "",
        termino: "",
        detalle: "",
        empresa_ID: 0
    })
    const apiurl = API_BASE_URL + laUrl + "/new";
    const insertData = (e) => {
        e.preventDefault();
        const data = {
            ID_cargo: state.ID_cargo,
            descripcion: state.descripcion
        };
        console.log(data)
        axios.post(apiurl, data).then(function (response) {
            console.log(response)
            if (response.status === 201) {
                props.history.push(laUrl + '/' + response.data.id);
            }
            else if (response.code >= 400) {
                setError("error 400");
            } else {
                setError("error X0x")
            }
        }).catch(function (error) {
            setError("error 500");
            console.log(error);
        });
    };
    const handleChange = (e) => {
        setError(null);
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    return (
        <div className="row">
            <div className="col-2"><SideBar /></div>
            <div className="col">
            {error !== null && <div className="alert alert-danger alert-dismissible fade show">{error}</div>}
                <div className="card">
                <div className="card-header">
                <h4>Nuevo Proceso:</h4>
                </div>
                    <form onSubmit={insertData} >
                    <div className="card-body">
                        <div className="form-group text-left">
                        <label htmlFor="ID_proceso">ID proceso</label>
                            <input type="text"
                                className="form-control"
                                id="ID_proceso"
                                disabled="disabled"
                                placeholder="###"
                                value={state.ID_proceso}
                                onChange={handleChange}
                            />
                        </div>
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
                            <label htmlFor="descripcion">modelo</label>
                            <input type="text"
                                className="form-control"
                                id="modelo"
                                placeholder="modelo"
                                value={state.modelo}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group text-left">
                            <label htmlFor="descripcion">inicio</label>
                            <input type="date"
                                className="form-control"
                                id="inicio"
                                placeholder=""
                                value={state.inicio}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group text-left">
                            <label htmlFor="descripcion">termino</label>
                            <input type="date"
                                className="form-control"
                                id="modelo"
                                placeholder="modelo"
                                value={state.modelo}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group text-left">
                            <label htmlFor="detalle">detalle</label>
                            <input type="number"
                                className="form-control"
                                id="detalle"
                                placeholder="0"
                                value={state.modelo}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group text-left">
                            <label htmlFor="detalle">empresa</label>
                            <select type="number"
                                className="form-control"
                                id="empresa_ID"
                                value={state.empresa_ID}
                                onChange={handleChange}
                            >
                            <option selected="" value="">eleguir </option>
                            </select>
                        </div>
                        
                        </div>
                        <div className="card-footer">
                            <div className="row">
                                <div className="col">
                                    <button type="submit" className="btn btn-outline-info">Guardar </button>
                                </div>
                                <div className="col-1">
                                    <button type="reset" className="btn btn-outline-secondary">Limpiar </button>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default withRouter(ProcessForm);