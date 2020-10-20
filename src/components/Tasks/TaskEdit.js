import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { API_BASE_URL } from '../../constants/apiContants';
import SideBar from '../Sidebar/SiderBar';

function TaskEdit(props) {
    var laUrl = "/tareas"
    const [option, setoption] = useState([]);
    const [error, setError] = useState(null)
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
    });

    const apiurl = API_BASE_URL + laUrl +"/"+ props.match.params.id +"?extra=1";

    useEffect(() => {
        const GetData = async () => {
           // const result = await axios(apiurl);
           // setoption(result.data);
           const result = await axios(API_BASE_URL + "/tareas")
           console.log(result.data[props.match.params.id]);
           setState(result.data[props.match.params.id]);
           console.log(state);
        };
        GetData();
    }, []);

    const InsertTask = (e) => {
        e.preventDefault();
        const data = {
            descripcion: state.descripcion,
            observaciones: state.observaciones,
            inicio: state.inicio,
            termino: state.termino,
            nivel: state.nivel,
            usuario_ID: state.usuario_ID,
            proceso_ID: state.proceso_ID,
            estadoTarea_ID: 0,
            tareaMadre: state.tareaMadre
        };
        console.log(data)
        axios.patch(apiurl, data).then(function (response) {
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

    function makeAselect(dato) {
        if (dato.lenght > 0) {
            return (
                <option value={dato.id}>{dato.descripcion}</option>
            )
        } else {
            return (
                <option disabled selected value> -elija una opcion- </option>
            )
        }
    }

    return (
        <div className="row">
            <div className="col-2"><SideBar /></div>
            <div className="col">
                <div className="card">
                    {error !== null && <div className="alert alert-danger alert-dismissible fade show">{error}</div>}
                    <h2> Editar Tarea:</h2>
                    <div className="">
                        <form onSubmit={InsertTask}>
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
                                {makeAselect(option)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="proceso_ID">tarea base</label>
                                <select className="form-control" id="tareaMadre">
                                {makeAselect(option)}
                                </select>
                            </div>
                            <input type="hidden"
                                id="usuario_ID"
                                placeholder="usuario_ID"
                                value={state.usuario_ID}
                                onChange={handleChange}
                            />

                            <div className="card-footer">
                                <div className="row">
                                    <div className="col">
                                        <button type="submit" className="btn btn-outline-info">Guardar </button>
                                    </div>
                                    <div className="col">
                                        <button type="reset" className="btn btn-outline-secondary">Limpiar </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )

}

export default withRouter(TaskEdit);