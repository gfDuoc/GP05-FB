import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { API_BASE_URL_ALT } from '../../constants/apiContants';
import axios from 'axios';
import SideBar from '../Sidebar/SiderBar';
import moment from 'moment';
/*
	"id_tarea": 1,
	"descripcion": "reemplazo",
	"observaciones": "papeleo que nadie leera",
	"Inicio": null,
	"termino": "2020-12-29T21:00:00",
	"nivel": 0,
	"usuario_id": 7,
	"proceso_id": 1,
	"inicioregistrado": null,
	"terminoregistrado": null,
	"estadotarea_id": 1,
	"tareamadre": null
*/

function ShowTask(props) {
	const url = API_BASE_URL_ALT + "/tareas/" + props.match.params.id;
	console.log(url)
	const [isLoading, setLoading] = useState(true)
	const [data, setData] = useState({});
	const [madre, setMadre] = useState({});
	const [status, setStatus] = useState({})
	const [proce, setProce] = useState({})
	const [user, setUser] = useState({})
	const [error, setError] = useState(null)
	const [listas, setListas] = useState({})
	const [cosas, setCosas] = useState([])
	var potato = null
	if (props.location.state != null) { potato = props.location.state.detail; };

	console.log(props)

	useEffect(() => {
		const GetData = async () => {
			const result = await axios(url);
			const daStatus = await axios(API_BASE_URL_ALT + "/estado_tareas/" + result.data.estadotarea_id);
			const daProce = await axios(API_BASE_URL_ALT + "/procesos/" + result.data.proceso_id);
			const daUser = await axios(API_BASE_URL_ALT + "/usuarios/" + result.data.usuario_id)
			const daLista = await axios(API_BASE_URL_ALT + "/listas/?task=" + props.match.params.id)
			console.log(daLista.data)
			setData(result.data);
			setStatus(daStatus.data);
			setProce(daProce.data);
			setUser(daUser.data);
			setListas(daLista.data)
			if (result.data.tareamadre > 0) {
				const daMadre = await axios(API_BASE_URL_ALT + "/tareas/" + result.data.tareamadre);
				setMadre(daMadre.data)
			}
			if (daLista.data.length > 0) {
				const daCosas = await axios(API_BASE_URL_ALT + "/actividades/?lista=" + daLista.data[0].id_lista);
				setCosas(daCosas.data)
			}
			setLoading(false);
		};
		GetData();
	}, []);

	function showTask(id) {
		props.history.push('/tareas/' + id + '/edit');
	};

	function goBack() {
		props.history.goBack();
	}

	function toDator(valor) {
		console.log(valor)
		if (valor != null) {
			return (moment(valor).format("d/M/YYYY"))
		}
		else { return ('--/--/----') }
	}

	function existor(dato) {
		if (Object.keys(dato) > 0) {
			return dato.descripcion
		}
		else {
			return "-----"
		}
	}

	function charToResp(dato) {
		if (dato != null) {
			if (dato === "n") { return "NO" }
			if (dato === "s") { return "SI" }
			if (dato === true) { return "SI" }
			if (dato === false) { return "NO" }
		} else {
			return "-"
		}
	}

	function taskStatusChanger(state) {
		const changer = {
			id_tarea: state.id_tarea,
			descripcion: state.descripcion,
			observaciones: state.observaciones,
			inicioRegistrado: "",
			terminoRegistrado: "",
			nivel: state.nivel,
			usuario_id: state.usuario_id,
			proceso_id: state.proceso_id,
			estadotarea_id: state.estadotarea_id+1,
			tareamadre: state.tareamadre
		}
		//if(state.estadotarea_id === 1){ changer.inicioRegistrado = moment().format();}
		//if(state.estadotarea_id === 2){ changer.terminoRegistrado = moment().format();}
		
		console.log("el cambio!")
		console.log(changer)
		axios.put(API_BASE_URL_ALT + '/tareas/'+state.id_tarea, changer)
			.then(function (response) {
				console.log(response)
				if (response.status === 201 || response.status === 200) {
					potato = ("actualizado")
					//const daStatus = axios(API_BASE_URL_ALT + "/estado_tareas/" + response.data.estadotarea_id);
					//setData(response.data);
					//setStatus(daStatus.data);
					window.location.reload();
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
	}
	/*
	--- por aqui estaba webiando
	= para el temas de las actividades
	*/
	function actitor(actitvidades) {
		return (
			<div>
				<table className="table table-hover">
					<thead className="thead-dark">
						<tr>
							<th scope="col">ID</th>
							<th scope="col">descripcion</th>
							<th scope="col">realizado</th>
							<th scope="col">→</th>

						</tr>
					</thead>
					{tableActividades(actitvidades)}
				</table>
				{wantActividades(data)}
			</div>
		)
	}
	function wantActividades(data) {
		if (data.estadotarea_id !== 3) {
			return (<button type="button" className="btn btn-primary" onClick={() => {
				console.log("nueva actividad")
				props.history.push({
					pathname: "/acitivades/new",
					state: { id_tarea: data.id_tarea, id_lista: listas[0].id_lista }
				});
			}}>agregar actividad</button>)
		}

	}


	function tableActividades(actitvidades) {
		if (actitvidades.length > 0) {
			return (<tbody>
				{actitvidades.map(item => (
					<tr key={"tr" + item.id_actividad}>
						<td>{item.id_actividad}</td>
						<td>{item.descripcion}</td>
						<td>{charToResp(item.realizado)}</td>
						{item.realizado === "s"? (<td><button className="btn btn-info" disabled>Completar Tarea</button>  </td>):(<td><button className="btn btn-info"  onClick={() => { updateActivity(item) }}>Completar Tarea</button>  </td>)  }
						
					</tr>
				))}
			</tbody>)
		}
		else {
			return (
				<tbody>
					<tr key="trVacio">
						<td colSpan="4">No tiene Actividades</td>
					</tr>
				</tbody>
			)
		}

	}

	function updateActivity(datos) {
		const toupdate = {
			id_actividad: datos.id_actividad,
			descripcion: datos.descripcion,
			realizado: "s",
			lista_id: datos.lista_id
		}
		console.log(toupdate)
		axios.put(API_BASE_URL_ALT + "/actividades/"+datos.id_actividad, toupdate)
			.then(function (response) {
				console.log(response)
				if (response.status === 201 || response.status === 200) {
					window.location.reload();
					potato = ("completada");
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
	}


	/*
	= para el tema de las listas
	*/

	function toNewLista() {
		const nuevaLista = {
			id_lista: 0,
			descripcion: "Listado de Actividades",
			tarea_id: props.match.params.id
		}
		axios.post(API_BASE_URL_ALT + "/listas/", nuevaLista)
			.then(function (response) {
				console.log(response)
				if (response.status === 201 || response.status === 200) {
					potato = ("Lista Generada")
					window.location.reload();
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
	}

	function ListExist(lista, tarea) {
		if (tarea != null || Object.keys(tarea).length > 0) {
			if (lista != null && lista.length > 0) {
				return (
					lista.map(t => (
						<div key={"LT" + t.id_lista} className="card">
							<div className="card-body ">
								<h2>Lista de Tareas</h2>
								<div className="row">
									<div className="col">
										<p><b>ID:</b> {t.id_lista}</p>
									</div>
									<div className="col">
										<p><b>descripcion:</b> {t.descripcion}</p>
									</div>
								</div>
								{actitor(cosas)}
							</div>
						</div>
					))
				)
			} else {
				return (<div className="card">
					<div className="card-body ">
						<h4> agregar nueva lista de tareas</h4>
						<button type="button" className="btn btn-primary btn-block" onClick={() => { toNewLista() }}>Nueva Lista</button>
					</div>
				</div>)
			}
		}
	}

	/*
	= para las tareas 
	*/

	function taskExist(data) {
		console.log(data)
		if (data != null && Object.keys(data).length > 0) {
			return (<div>
				<div>
					<div key={"ta" + data.id_tarea} className="card">
						<div className="card-header">
							<b>ID:</b> {data.id_tarea} <b>Nombre</b> {data.descripcion}
						</div>
						<div className="card-body text-left">
							<div className="row">
								<div className="col">
									<p><b>Inicio:</b> {toDator(data.inicio)}</p>
									<p><b>Termino:</b> {toDator(data.termino)}</p>
								</div>
								<div className="col">
									<p><b>Registrado:</b> {toDator(data.inicioregistrado)}</p>
									<p><b>Registrado:</b> {toDator(data.terminoRegistrado)}</p>
								</div>
							</div>
							<div className="row">
								<div className="col">
									<p><b>Proceso</b> {proce.descripcion}</p>
									<p><b>Usuario:</b> {user.nombreusuario}</p>
								</div>
								<div className="col">
									<p><b>Tarea Madre:</b> {existor(madre)}</p>
									<p><b>Estado Tarea:</b> {status.descripcion}</p>
								</div>
							</div>
							<div className="row">
								<div className="col">
									<p><b>nivel:</b> {data.nivel}</p>
									<p><b>observaciones:</b> {data.observaciones}</p>
								</div>
								<div className="col">
									<p className={data.estadotarea_id < 3 ? 'show-it' : 'hide-it'}><button type="button" className="btn btn-info" onClick={() => { taskStatusChanger(data) }}>Cambiar Estado</button></p>
								</div>
							</div>
						</div>
						<div className="card-footer">
							<div className="row">
								<div className="col"><button type="button" className="btn btn-primary" onClick={() => { showTask(data.id_tarea) }}>Editar Tarea</button></div>
								<div className="col"><button type="button" className="btn btn-secondary" onClick={() => { goBack() }}>Volver</button></div></div>
						</div>

					</div>
				</div>
			</div>)
		} else {
			return (<div>
				<h4>La tarea no Existe</h4>
			</div>)
		}
	}

	/*
	= lo que se vee?
	*/

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
				<br></br>
				{error !== null && <div className="alert alert-danger alert-dismissible fade show"><button type="button" className="close" data-dismiss="alert" onClick={() => { setError(null) }}>&times;</button>{error}</div>}
				{potato !== null && <div className="alert alert-info alert-dismissible fade show"> <button type="button" className="close" data-dismiss="alert" onClick={() => { potato = null }}>&times;</button> <strong>Info:</strong> {potato}</div>}

				<h4>Tarea: </h4>
				<div className="row">
					<div className="col-md-12">
						{taskExist(data)}
						{ListExist(listas, data)}
					</div>

				</div>
			</div>
		</div>

	)
}


export default withRouter(ShowTask);