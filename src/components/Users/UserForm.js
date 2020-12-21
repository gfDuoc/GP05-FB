import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { API_BASE_URL_ALT } from '../../constants/apiContants';
import SideBar from '../Sidebar/SiderBar';

/*
{
    "id_usuario": 0,
    "nombreusuario": "string",
    "contrasenna": "string",
    "nombre": "string",
    "apellidos": "string",
    "correo": "string",
    "perfil_id": 0,
    "cargo_id": 0,
    "empresa_id": 0
  }
*/
function UserForm(props) {
    const apiUrl = API_BASE_URL_ALT + "/usuarios/";
    const [isLoading, setLoading] = useState(true)
    const [perfiles, setPerfiles] = useState([])
    const [cargos, setCargos] = useState([])
    const [empresas, setEmpresas] = useState([])
    const [error, setError] = useState(null)
    const [state, setState] = useState({
        id_usuario: 0,
        nombreusuario: "",
        contrasenna: "",
        nombre: "",
        apellidos: "",
        correo: "",
        perfil_id: 0,
        cargo_id: 0,
        empresa_id: 0
    });

    useEffect(() => {
        const GetData = async () => {
            const daPerfiles = await axios(API_BASE_URL_ALT + "/perfiles/");
            const daCargos = await axios(API_BASE_URL_ALT + "/cargos/");
            const daEmpresas = await axios(API_BASE_URL_ALT + "/empresas");
            setPerfiles(daPerfiles.data);
            setCargos(daCargos.data);
            setEmpresas(daEmpresas.data);
            setLoading(false);
            console.log(daPerfiles.data)
            console.log(daCargos.data)
            console.log(daEmpresas.data)
        };
        GetData();
    }, []);

    const InsertUser = (e) => {
        e.preventDefault();
        const data = {
            id_usuario: 0,
            nombreusuario: state.nombreusuario,
            contrasenna: state.contrasenna,
            nombre: state.nombre,
            apellidos: state.apellidos,
            correo: state.correo,
            perfil_id: state.perfil_id,
            cargo_id: state.cargo_id,
            empresa_id: state.empresa_id
        };
        console.log(data)
        axios.post(apiUrl, data)
            .then(function (response) {
                console.log(response)
                if (response.status === 201 || response.status === 200) {
                    props.history.push({
                        pathname:'/usuarios/'+response.data.id_usuario,
                        state: {detail: "nuevo usuario"}
                    }
                        );
                }
                else if (response.code >= 400) {
                    setError("error 400");
                }
                else {
                    setError("error x0x");
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
        console.log(e.target.name + ":" + e.target.value);
        console.log(state)
    }

    function makeAselect(dato) {
        var options = []
        if (dato.length > 0) {
            options.push(dato.map(item => (<option key={"" + Object.keys(item)[0] + Object.values(item)[0]} id={"" + Object.keys(item)[0] + Object.values(item)[0]} value={Object.values(item)[0]}>{Object.values(item)[1]}</option>)))
        }
        return options
    }

    if (isLoading) {
        return (
            <div className="App">
                <div className="spinner-border spinner-border-xl"></div>
                <h1>cargando...</h1>
            </div>)
    }

    return (
        <div id="mainRow" className="row">
            <SideBar />
            <div id="mainCol" className="col" align="center">
                <br></br>
                {error !== null && <div className="alert alert-danger alert-dismissible fade show">{error}</div>}
                <div id="formCard" className="card col-10">
                    <h2> Nuevo usuario</h2>
                    <form id="daForm" onSubmit={InsertUser}>
                        <div className="form-group text-left">
                            <label htmlFor="descripcion">Nombre de Usuario</label>
                            <input type="text"
                                className="form-control"
                                id="nombreusuario"
                                name="nombreusuario"
                                placeholder="del usuario"
                                value={state.nombreusuario}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group text-left">
                            <label htmlFor="descripcion">contraseña</label>
                            <input type="password"
                                className="form-control"
                                id="contrasenna"
                                name="contrasenna"
                                placeholder="*****************"
                                value={state.contrasenna}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group text-left">
                            <label htmlFor="descripcion">nombre</label>
                            <input type="text"
                                className="form-control"
                                id="nombre"
                                name="nombre"
                                placeholder="nombre del ususario"
                                value={state.nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group text-left">
                            <label htmlFor="descripcion">apellidos</label>
                            <input type="text"
                                className="form-control"
                                id="apellidos"
                                name="apellidos"
                                placeholder="apellidos del ususario"
                                value={state.apellidos}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group text-left">
                            <label htmlFor="descripcion">Correo</label>
                            <input type="email"
                                className="form-control"
                                id="correo"
                                name="correo"
                                placeholder="correo@usuario.cl"
                                value={state.correo}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="proceso_ID">perfil</label>
                            <select className="form-control" value={state.perfil_id} id="perfil_id" name="perfil_id" onChange={handleChange} required>
                                <option key="proce0" id="proce0" disabled value="0"> -elija una opcion- </option>
                                {makeAselect(perfiles)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="proceso_ID">Cargo</label>
                            <select className="form-control" value={state.cargo_id} id="cargo_id" name="cargo_id" onChange={handleChange} required>
                                <option key="carg0" id="carg0" disabled value="0"> -elija una opcion- </option>
                                {makeAselect(cargos)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="proceso_ID">Empresa</label>
                            <select className="form-control" value={state.empresa_id} id="empresa_id" name="empresa_id" onChange={handleChange} required>
                                <option key="empo0" id="empr0" disabled value="0"> -elija una opcion- </option>
                                {makeAselect(empresas)}
                            </select>
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

export default withRouter(UserForm);