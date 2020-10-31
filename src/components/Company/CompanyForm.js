/*
EMPRESA
*P ID_empresa NUMBER
* razonSocial VARCHAR2 (100)
*/

import React, { useState } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { API_BASE_URL } from '../../constants/apiContants';
import SideBar from '../Sidebar/SiderBar';

function CompanyForm(props) {
    var laUrl = "/empresas"
    const [error, setError] = useState(null)
    const [state, setState] = useState({
        ID_empresa: 0,
        razonSocial: ""
    })
    const apiurl = API_BASE_URL + laUrl + "/new";
    const InsertCompany = (e) => {
        e.preventDefault();
        const data = {
            ID_empresa: state.ID_empresa,
            razonSocial: state.razonSocial
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
            <SideBar />
            <div className="col">
            <br></br>
                {error !== null && <div className="alert alert-danger alert-dismissible fade show">{error}</div>}
                <div className="card">
                    <div className="card-header">
                        <h4>Nueva empresa:</h4>
                    </div>
                    <form onSubmit={InsertCompany} >
                        <div className="card-body">
                            <div className="form-group text-left">
                                <label htmlFor="ID_empresa">ID empresa</label>
                                <input type="number"
                                    className="form-control"
                                    id="ID_empresa"
                                    disabled="disabled"
                                    placeholder="999"
                                    value={state.ID_empresa}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group text-left">
                                <label htmlFor="razonSocial">Razon Social</label>
                                <input type="text"
                                    className="form-control"
                                    id="razonSocial"
                                    placeholder="nombre de la empresa"
                                    value={state.razonSocial}
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

export default withRouter(CompanyForm);