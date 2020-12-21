import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { API_BASE_URL_ALT } from '../../constants/apiContants';
import SideBar from '../Sidebar/SiderBar';
import moment from 'moment';

function TaskEdit(props) {
    var laUrl = "/tareas/" + props.match.params.id;
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [procesos, setProcesos] = useState([]);
    const [estados, setEstados] = useState([]);
    const [madres, setMadres] = useState([]);
    const [users, setUsers] = useState([]);
    const [state, setState] = useState({
        id_tarea: 0,
        descripcion: "",
        observaciones: "",
        inicio: "",
        termino: "",
        nivel: 0,
        usuario_id: 0,
        proceso_id: 0,
        inicioRegistrado: "",
        terminoRegistrado: "",
        estadotarea_id: 1,
        tareamadre: 0
    });

    useEffect(() => {
        const GetData = async () => {
            const result = await axios(API_BASE_URL_ALT +laUrl)
            const daProcesos = await axios(API_BASE_URL_ALT + "/procesos/")
            const daEstados = await axios(API_BASE_URL_ALT + "/estado_tareas/")
            const daTareas = await axios(API_BASE_URL_ALT + "/tareas/")
            const daUser = await axios(API_BASE_URL_ALT + "/usuarios/")
            var dato = result.data
            dateToInput(dato)
            setState(dato)
            setProcesos(daProcesos.data);
            setEstados(daEstados.data);
            setMadres(daTareas.data);
            setUsers(daUser.data);
            setLoading(false);
            console.log(state)
            console.log(result.data)
        };
        GetData();
    }, []);

    const InsertTask = (e) => {
        e.preventDefault();
        const data = {
            id_tarea: state.id_tarea,
            descripcion: state.descripcion,
            observaciones: state.observaciones,
            inicio: toDator(state.inicio),
            termino: toDator(state.termino),
            nivel: state.nivel,
            usuario_id: state.usuario_id,
            proceso_id: state.proceso_id,
            estadotarea_id: state.estadotarea_id,
            tareamadre: state.tareamadre
        };
        console.log(data)
        axios.put(API_BASE_URL_ALT+laUrl, data).then(function (response) {
            console.log(response)
            if (response.status === 201 || response.status === 200) {
                props.history.push(
                    {
                        pathname: '/tareas/' + response.data.id_tarea,
                        state: { detail: "Tarea actualizada" }
                    }
                );
            }
            else if (response.code >= 400) {
                setError("error 400");
            } else {
                setError("error X0X")
            }
        }).catch(function (error) {
            setError("error 500");
            console.log(error);
        });

    };

    function toDator(valor) {
        if (valor != null) {
            var d = (Date.parse(valor))
            return (moment(d).format())
        }
        else { return (null) }
    }

    function dateToInput(task){
        var d = null
        if(task.inicio != null){
        d = (moment(task.inicio).format('YYYY-MM-DD'))
        task.inicio = d
        }
        if(task.termino != null){ 
        d = (moment(task.termino).format('YYYY-MM-DD'))
        task.termino = d
        }
    }

    const handleChange = (e) => {
        setError(null);
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    function makeAselect(dato) {
        var options = []
        if (dato.length > 0) {
            options.push(dato.map(item => (<option key={"" + Object.keys(item)[0] + Object.values(item)[0]} id={"" + Object.keys(item)[0] + Object.values(item)[0]} value={Object.values(item)[0]}>{Object.values(item)[1]}</option>)))
        }
        return options
    }

    if (isLoading) {
        return (
            <div className="App">
                <div className="spinner-border spinner-border-xl"></div>
                <h1>cargando...</h1>
            </div>)
    }

    return (
        <div className="row">
            <SideBar />{console.log(state)}
            <div className="col">
                <br></br>
                {error !== null && <div className="alert alert-danger alert-dismissible fade show">{error}</div>}
                <div className="card">
                    <div className="card-header">
                        <h4>Editar Tarea:</h4>
                    </div>
                    <form onSubmit={InsertTask}>
                        <div className="card-body">
                            <div className="form-group text-left">
                                <label htmlFor="id_tarea">ID Tarea</label>
                                <input type="number"
                                    className="form-control"
                                    id="id_tarea"
                                    readOnly={!!state.id_tarea}
                                    placeholder="0"
                                    value={state.id_tarea}
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
                                <label htmlFor="estadotarea_id">Estado</label>
                                <select className="form-control" value={state.estadotarea_id} id="estadotarea_id" name="estadotarea_id" onChange={handleChange} readOnly  required>
                                    <option key="empo0" id="empr0" disabled value="0"> -elija una opcion- </option>
                                    {makeAselect(estados)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="proceso_id">proceso</label>
                                <select className="form-control" id="proceso_id" name="proceso_id" value={state.proceso_id} onChange={handleChange} required>
                                    <option key="proce0" id="proce0" disabled value="0">-elija una opcion </option>
                                    {makeAselect(procesos)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="tareamadre">tarea base</label>
                                <select className="form-control" id="tareamadre" name="tareamadre" value={state.tareamadre} onChange={handleChange} >
                                    <option key="motha0" id="motha0" disabled value="0">-elija una opcion</option>
                                    {makeAselect(madres)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="usuario_id">Usuarios</label>
                                <select className="form-control" id="usuario_id" name="usuario_id" value={state.usuario_id} onChange={handleChange} >
                                    <option key="user0" id="user0" disabled value="0">-elija una opcion</option>
                                    {makeAselect(users)}
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

export default withRouter(TaskEdit);