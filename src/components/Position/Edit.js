import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { API_BASE_URL_ALT } from '../../constants/apiContants';
import SideBar from '../Sidebar/SiderBar';

// "id_cargo": 0,
// "descripcion": "string"

function PositionEdit(props) {
    var apiUrl = API_BASE_URL_ALT+"/cargos/"+props.match.params.id
    const [error, setError] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [message, setMessage] = useState(null)
    const [state, setState] = useState({
        id_cargo: 0,
        descripcion: ""
    })

    if (props.location.state != null){setMessage(props.location.state.detail)}
    useEffect(() => {
        const GetData = async () => {
           const result = await axios(apiUrl)
           setState(result.data);
           setLoading(false);
        };
        GetData();
    }, []);

    const InsertData = (e) => {
        e.preventDefault();
        const data = {
            id_cargo: state.id_cargo,
            descripcion: state.descripcion
        };
        console.log(data)
        axios.put(apiUrl, data).then(function (response) {
            console.log(response)
            if (response.status === 201 || response.status === 200) {
                setMessage("Cargo Actualizado")
            }
            else if (response.code >= 400) {
                setError("error 400");
                console.log(response);
            } else {
                setError("error X0x")
                console.log(response);
            }
        }).catch(function (error) {
            setError("error 500");
            console.log(error);
        });
    };
    const handleChange = (e) => {
        setError(null);
        const { id, value } = e.target
        setState(prevState => ({...prevState,[id]: value}))
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
            <SideBar/>
            <div className="col">
            <br></br>
            {error !== null && <div className="alert alert-danger alert-dismissible fade show">{error}</div>}
            {message !== null && <div className="alert alert-info alert-dismissible fade show"> <button type="button" className="close" data-dismiss="alert" onClick={()=>{setMessage(null)}}>&times;</button> <strong>Info:</strong> {message}</div>}
                <div className="card">
                <div className="card-header">
                <h4>Editar Cargo:</h4>
                </div>
                    <form onSubmit={InsertData} >
                    <div className="card-body">
                        <div className="form-group text-left">
                            <label htmlFor="id_cargo">ID cargo</label>
                            <input type="number"
                                className="form-control"
                                id="id_cargo"
                                readOnly value = {state.id_cargo}
                                placeholder="999"
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

export default withRouter(PositionEdit);