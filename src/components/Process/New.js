import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { API_BASE_URL_ALT } from '../../constants/apiContants';
import SideBar from '../Sidebar/SiderBar';
import moment from 'moment';
/*
  "id_proceso": 0,
  "descripcion": "string",
  "modelo": "string",
  "inicio": "2020-12-20T02:30:46.670Z",
  "termino": "2020-12-20T02:30:46.670Z",
  "detalle": "string",
  "empresa_id": 0
*/

function ProcessForm(props) {
    const [isLoading, setLoading] = useState(true)
    const [empresas, setEmpresas] = useState([])
    const [error, setError] = useState(null)
    const [state, setState] = useState({
        id_proceso: 0,
        descripcion: "",
        modelo: 0,
        inicio: "",
        termino: "",
        detalle: "",
        empresa_id: 0
    }
    );
    const apiUrl = API_BASE_URL_ALT + "/procesos/";

    useEffect(() => {
        const GetData = async () => {
            if (props.location.state != null){
                 setState(props.location.state)
                console.log(props.location.state)
                }
            const daEmpresas = await axios(API_BASE_URL_ALT + "/empresas");
            setEmpresas(daEmpresas.data);
            setLoading(false);
        };
        GetData();
    }, []);

    const insertData = (e) => {
        e.preventDefault();
        const data = {
            id_proceso: 0,
            descripcion: state.descripcion,
            modelo: state.modelo,
            inicio: toDator(state.inicio),
            termino: toDator(state.termino),
            detalle: state.descripcion,
            empresa_id: state.empresa_id
        };
        console.log(data)
        axios.post(apiUrl, data)
            .then(function (response) {
                console.log(response)
                if (response.status === 201 || response.status === 200) {
                    props.history.push('/procesos/' + response.data.id_proceso);
                }
                else if (response.code >= 400) {
                    setError("error 400");
                }
                else {
                    setError("error X0X");
                }
            })
            .catch(function (error) {
                setError("error 500");
                console.log(error);
            });;
    };
    const handleChange = (e) => {
        e.persist();
        setError(null);
        setState({ ...state, [e.target.name]: e.target.value });
    }

    function makeAselect(dato) {
        var options = []
        if (dato.length > 0) {
            options.push(dato.map(item => (<option key={"" + Object.keys(item)[0] + Object.values(item)[0]} id={"" + Object.keys(item)[0] + Object.values(item)[0]} value={Object.values(item)[0]}>{Object.values(item)[1]}</option>)))
        }
        return options
    }


    function toDator(valor) {
        if (valor != null) {
            var d = (Date.parse(valor))
            return (moment(d).format())
        }
        else { return (null) }
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
            <div className="col" align="center">
                {error !== null && <div className="alert alert-danger alert-dismissible fade show">{error}</div>}
                <br></br>
                <div className="card col-10">
                    <h2> Nuevo proceso</h2>
                    <form onSubmit={insertData}>
                        <div className="form-group text-left">
                            <label htmlFor="id_proceso">ID</label>
                            <input type="number"
                                className="form-control"
                                id="id_proceso"
                                name="id_proceso"
                                disabled="true"
                                placeholder="0"
                                value={state.id_proceso}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group text-left">
                            <label htmlFor="descripcion">descripcion: </label>
                            <input type="text"
                                className="form-control"
                                id="descripcion"
                                name="descripcion"
                                placeholder="del proceso"
                                value={state.descripcion}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="modelo">Tipo</label>
                                    <select className="form-control" value={state.modelo} id="modelo" name="modelo" onChange={handleChange} required>
                                        <option key="empo0" id="empr0"  value="0"> Normal </option>
                                        <option key="empo1" id="empr1"  value="1"> Modelo </option>
                                    </select>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="proceso_ID">Empresa</label>
                                    <select className="form-control" value={state.empresa_id} id="empresa_id" name="empresa_id" onChange={handleChange} required>
                                        <option key="empo0" id="empr0" disabled value="0"> -elija una opcion- </option>
                                        {makeAselect(empresas)}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-group text-left">
                            <label htmlFor="inicio">inicio: </label>
                            <input type="date"
                                className="form-control"
                                id="inicio"
                                name="inicio"
                                placeholder=""
                                value={state.inicio}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group text-left">
                            <label htmlFor="termino">termino: </label>
                            <input type="date"
                                className="form-control"
                                id="termino"
                                name="termino"
                                placeholder=""
                                value={state.termino}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group text-left">
                            <label htmlFor="detalle">detalle: </label>
                            <textarea
                                className="form-control"
                                id="detalle"
                                name="detalle"
                                placeholder=""
                                value={state.detalle}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="card-footer">
                            <div className="row">
                                <div className="col">
                                    <button type="submit" className="btn btn-outline-info">Guardar </button>
                                </div>
                                <div className="col">
                                    <button type="submit" className="btn btn-outline-danger">Guardar y agregar tarea </button>
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