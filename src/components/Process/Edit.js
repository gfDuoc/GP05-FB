import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { API_BASE_URL } from '../../constants/apiContants';
import SideBar from '../Sidebar/SiderBar';

/*
{
ID_proceso: 0,
descripcion: "",
modelo: "",
inicio: "",
termino: "",
detalle: "",
empresa_ID: 0
}
*/

function ProcessEdit(props) {
    var laUrl = "/procesos"
    const [error, setError] = useState(null)
    const [option, setoption] = useState([]);
    const [state, setState] = useState({
        ID_proceso: 0,
        descripcion: "",
        modelo: "",
        inicio: "",
        termino: "",
        detalle: "",
        empresa_ID: 0
    })

    useEffect(() => {
        const GetData = async () => {
            // descomentar eesto
           // const result = await axios(apiurl);
           // setState(result.data);
           // y sacar lo de abago
           const result = await axios(API_BASE_URL + "/procesos")
           console.log(result.data[props.match.params.id]);
           setState(result.data[props.match.params.id]);
           console.log(state);
        };
        GetData();
    }, []);

    const apiurl = API_BASE_URL + laUrl + "/"+ state.ID_proceso;
    const InsertData = (e) => {
        e.preventDefault();
        const data = {
            ID_cargo: state.ID_cargo,
            descripcion: state.descripcion
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

    function goBack() {
		props.history.goBack();
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
            <SideBar />
            <div className="container mt-5" align="center">
                {error !== null && <div className="alert alert-danger alert-dismissible fade show">{error}</div>}
                <div className="card col-10">
                    <h2> Nuevo usuario</h2>
                    <form onSubmit={InsertData}>
                        <div className="form-group text-left">
                            <label htmlFor="ID_proceso">ID</label>
                            <input type="number"
                                className="form-control"
                                id="ID_proceso"
                                name="ID_proceso"
                                disabled="true"
                                placeholder="0"
                                value={state.ID_proceso}
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
                            <div className="col-2">
                                <div className="form-group text-left">
                                    <label htmlFor="descripcion">tipo modelo</label>
                                    <input type="checkbox"
                                        className="form-control"
                                        id="tipo"
                                        name="tipo"
                                        checked={state.modelo}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="proceso_ID">Empresa</label>
                                    <select className="form-control" id="Empresa_ID">
                                        {makeAselect(option)}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-group text-left">
                            <label htmlFor="descripcion">inicio: </label>
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
                            <label htmlFor="descripcion">detalle: </label>
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
                                <button type="button" className="btn btn-outline-secondary" onClick={() => { goBack() }}>Volver</button>
                                </div>
                            </div>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    )
}

export default withRouter(ProcessEdit);