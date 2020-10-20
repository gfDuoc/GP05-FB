import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { API_BASE_URL } from '../../constants/apiContants';
import SideBar from '../Sidebar/SiderBar';

/*
CARGO
P* ID_cargo NUMBER
* descripcion VARCHAR2 (80)
*/


function PositionEdit(props) {
    var laUrl = "/cargos"
    const [error, setError] = useState(null)
    const [state, setState] = useState({
        ID_cargo: 0,
        descripcion: ""
    })

    useEffect(() => {
        const GetData = async () => {
            // descomentar eesto
           // const result = await axios(apiurl);
           // setState(result.data);
           // y sacar lo de abago
           const result = await axios(API_BASE_URL + "/cargos")
           console.log(result.data[props.match.params.id]);
           setState(result.data[props.match.params.id]);
           console.log(state);
        };
        GetData();
    }, []);

    const apiurl = API_BASE_URL + laUrl + "/new";
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

    return (
        <div className="row">
            <div className="col-2"><SideBar /></div>
            {error !== null && <div className="alert alert-danger alert-dismissible fade show">{error}</div>}
            <div className="col">
                <div className="card">
                    <p> Editar Cargo</p>
                    <form onSubmit={InsertData} >
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

export default withRouter(PositionEdit);