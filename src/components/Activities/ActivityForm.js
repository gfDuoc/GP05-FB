import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { API_BASE_URL_ALT } from '../../constants/apiContants';
import SideBar from '../Sidebar/SiderBar';

function ActivityForm(props) {
    var laUrl = "/actividades/"
    const [error, setError] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [tarea, setTarea] = useState(0)
    const [lista, setLista] = useState()
    const [state, setState] = useState({
        id_actividad: 0,
        descripcion: "string",
        realizado: "n",
        lista_id: 0
    })
    
    useEffect(() => {
        const Ready = async () =>{
            if (props.location.state != null){
                 console.log(props.location.state) 
                 setLoading(false);
                 setTarea(props.location.state.id_tarea)
                 setLista(props.location.state.id_lista)
                } 
                else 
                {props.history.goBack();}
        };
        Ready();
    },[]);


    const apiurl = API_BASE_URL_ALT + laUrl;
    const Insert = (e) => {
        e.preventDefault();
        const data = {
            descripcion: state.descripcion,
            realizado: state.realizado,
            lista_id: lista
        };
        console.log(data)
        axios.post(apiurl, data).then(function (response) {
            console.log(response)
            if (response.status === 201 || response.status === 200) {
                props.history.push({ pathname: "/tareas/"+tarea, state: { detail: "actividad creada" } });
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
        console.log(value)
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
            <SideBar />
            <div className="col">
                <br></br>
                {error !== null && <div className="alert alert-danger alert-dismissible fade show">{error}</div>}
                <div className="card">
                    <div className="card-header">
                        <h4>Nueva Actividad:</h4>
                    </div>
                    <form onSubmit={Insert} >
                        <div className="card-body">
                            <div className="form-group text-left">
                                <label htmlFor="id_actividad">ID Actividad</label>
                                <input type="number"
                                    className="form-control"
                                    id="id_actividad"
                                    disabled="disabled"
                                    placeholder="0"
                                    value={state.id_actividad}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group text-left">
                                <label htmlFor="descripcion">descripcion</label>
                                <input type="text"
                                    className="form-control"
                                    id="descripcion"
                                    placeholder=""
                                    value={state.descripcion}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                            <label htmlFor="proceso_ID">realizado</label>
                            <select className="form-control" value={state.realizado} id="realizado" name="realizado" onChange={handleChange} required>
                                <option key="realizado0" id="realizado"  value="n"> No </option>
                                <option key="realizado1" id="realizado"  value="s"> Si </option>
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
export default withRouter(ActivityForm);