import React, { useState } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { API_BASE_URL_ALT } from '../../constants/apiContants';
import SideBar from '../Sidebar/SiderBar';

// "id_cargo": 0,
// "descripcion": "string"

function PostionForm(props) {
    var apiUrl = API_BASE_URL_ALT+"/cargos/"
    var laUrl = "/cargos"
    console.log(props)
    const [error, setError] = useState(null)
    const [state, setState] = useState({
        id_cargo: 0,
        descripcion: ""
    })


    const insertData = (e) => {
        e.preventDefault();
        const data = {
            ID_cargo: 0,
            descripcion: state.descripcion
        };
        console.log(data)
        axios.post(apiUrl, data).then(function (response) {
            console.log(response)
            if (response.status === 201 || response.status === 200) {
                props.history.push({pathname: laUrl , state:{detail:"cargo creado" }});
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
            <SideBar/>
            <div className="col">
            <br></br>
            {error !== null && <div className="alert alert-danger alert-dismissible fade show">{error}</div>}
                <div className="card">
                <div className="card-header">
                <h4>Nuevo Cargo:</h4>
                </div>
                    <form onSubmit={insertData} >
                    <div className="card-body">
                        <div className="form-group text-left">
                        <label htmlFor="descripcion">ID cargo</label>
                            <input type="text"
                                className="form-control"
                                id="descripcion"
                                disabled="disabled"
                                placeholder="de que se trata"
                                value={state.id_cargo}
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
                    <button type="reset" className="btn btn-outline-dangar" onClick={()=>{   props.history.push({pathname: laUrl , state:{detail:"empresa creada"}});}}>Limpiar </button>
                </div>
            </div>
        </div>
    )
}

export default withRouter(PostionForm);