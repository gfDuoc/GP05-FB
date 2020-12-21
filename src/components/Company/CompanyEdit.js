import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { API_BASE_URL_ALT } from '../../constants/apiContants';
import SideBar from '../Sidebar/SiderBar';
/*
{    "id_empresa": 0,
    "razonsocial": "string"  }
*/
function CompanyEdit(props) {
    var apiUrl = API_BASE_URL_ALT + "/empresas/" + props.match.params.id;
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [state, setState] = useState({
        id_empresa: 0,
        razonsocial: ""
    })

    var potato = null
    if (props.location.state != null){ potato = props.location.state.detail;	};
    
    useEffect(() => {
        const GetData = async () => {
            const result = await axios(apiUrl);
            setState(result.data);
            setLoading(false);
        };
        GetData();
    }, []);

    const InsertCompany = (e) => {
        e.preventDefault();
        const data = {
            id_empresa: state.id_empresa,
            razonsocial: state.razonsocial
        };
        console.log(data)
        axios.put(apiUrl, data).then(function (response) {
            console.log(response)
            if (response.status === 201 || response.status === 200) {
                potato =("Empresa Actualizada")
                /*
                props.history.push(
                    {
                        pathname:"/empresas/" + response.data.id_empresa+ "/edit",
                        state:{detail:"Empresa Actualizado"}
                    }
                    );
                    */
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
        setState(prevState => ({...prevState,[id]: value}));
        console.log(state)
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
                {potato !== null && <div className="alert alert-info alert-dismissible fade show"> <button type="button" className="close" data-dismiss="alert" onClick={() => {potato = null}}>&times;</button> <strong>Info:</strong> {potato}</div>}
                <div className="card">
                    <form onSubmit={InsertCompany} >
                        <div className="card-header">
                            <h4>editar empresa:</h4>
                        </div>
                        <div className="card-body">
                            <div className="form-group text-left">
                                <label htmlFor="descripcion">ID empresa</label>
                                <input type="number"
                                    className="form-control"
                                    id="id_empresa"
                                    readOnly={!!state.id_empresa}
                                    placeholder="0"
                                    value={state.id_empresa}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group text-left">
                                <label htmlFor="descripcion">Razon Social</label>
                                <input type="text"
                                    className="form-control"
                                    id="razonsocial"
                                    name="razonsocial"
                                    placeholder="nombre de la empresa"
                                    value={state.razonsocial}
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

export default withRouter(CompanyEdit);