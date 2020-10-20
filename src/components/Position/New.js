import React, { useState } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { API_BASE_URL } from '../../constants/apiContants';
import SideBar from '../Sidebar/SiderBar';

function CompanyForm(props) {
    var laUrl = "/cargos"
    const [error, setError] = useState(null)
    const [state, setState] = useState({
        ID_cargo: 0,
        descripcion: ""
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
            {error !== null && <div className="alert alert-danger alert-dismissible fade show">{error}</div>}
            <div className="col">
                <div className="card">
                    <p> Nuevo cargo</p>
                    <form onSubmit={insertData} >
                        <div className="form-group text-left">
                        <label htmlFor="descripcion">ID cargo</label>
                            <input type="text"
                                className="form-control"
                                id="descripcion"
                                disabled="disabled"
                                placeholder="de que se trata"
                                value={state.ID_cargo}
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