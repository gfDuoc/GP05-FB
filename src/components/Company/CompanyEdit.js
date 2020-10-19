import React, { useState, useEffect } from 'react'
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

    const apiurl = API_BASE_URL + laUrl + "/new";
    const InsertCompany = (e) => {
        e.preventDefault();
        const data = {
            ID_empresa: state.ID_empresa,
            razonSocial: state.razonSocial
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

    return (
        <div className="row">
            <div className="col-2"><SideBar /></div>
            {error !== null && <div className="alert alert-danger alert-dismissible fade show">{error}</div>}
            <div className="col">
                <div className="card">
                    <p> Nueva Empresa</p>
                    <form onSubmit={InsertCompany} >
                        <div className="form-group text-left">
                            <label htmlFor="descripcion">ID empresa</label>
                            <input type="text"
                                className="form-control"
                                id="descripcion"
                                disabled="disabled"
                                placeholder="de que se trata"
                                value={state.ID_empresa}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group text-left">
                            <label htmlFor="descripcion">Razon Social</label>
                            <input type="text"
                                className="form-control"
                                id="descripcion"
                                placeholder="de que se trata"
                                value={state.razonSocial}
                                onChange={handleChange}
                            />
                        </div>
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
    )
}

export default withRouter(CompanyForm);