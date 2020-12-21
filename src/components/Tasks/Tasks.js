import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { API_BASE_URL_ALT } from '../../constants/apiContants';
import SideBar from '../Sidebar/SiderBar';
import axios from 'axios';
import moment from 'moment';
/*
    "id_tarea": 1,
    "descripcion": "reemplazo",
    "observaciones": "papeleo que nadie leera",
    "inicio": null,
    "termino": "2020-12-29T21:00:00",
    "nivel": 0,
    "usuario_id": 7,
    "proceso_id": 1,
    "inicioregistrado": null,
    "terminoregistrado": null,
    "estadotarea_id": 1,
    "tareamadre": null
*/

function Tasks(props) {
	const [data, setData] = useState([]);
	const [isLoading, setLoading] = useState(true)

	useEffect(() => {
		const GetData = async () => {
			const result = await axios(API_BASE_URL_ALT + "/tareas");
			const daStatus = await axios(API_BASE_URL_ALT+"/estado_tareas/");
			const daProce =  await axios(API_BASE_URL_ALT + "/procesos/");
			const daUser = await axios(API_BASE_URL_ALT+ "/usuarios/")
			composer(result.data,daStatus.data,daProce.data,daUser.data)
			setData(result.data);
			setLoading(false);
			
		};
		GetData();
	}, []);

	function showTask(id) {
		props.history.push('/tareas/' + id);
	};
	function toNew() {
		props.history.push('/tareas/new');
	};

	function composer(dato,statu,proce,usa){
		dato.forEach(element => {
			""
			statu.forEach(statu1 => {
				if(element.estadotarea_id === statu1.id_estadotarea){
					element["status"] =statu1.descripcion
				}
			});
			proce.forEach(proce1 =>{
				if(element.proceso_id === proce1.id_proceso){
					element["proceso"] = proce1.descripcion
				}
			});
			usa.forEach(usa1 =>{
				if(element.usuario_id === usa1.id_usuario){
					element["usuario"] = usa1.nombreusuario
				}
			})
		});
	}
	function toDator(valor) {
		if (valor != null) {
			var d = (moment(valor))
			console.log(d)
			return (moment(d).format("d/M/YYYY"))
		}
		else { return ('--/--/----') }
	}


	function task(tarea) {
		return (
		<tr key={"ta"+tarea.id_tarea}>
			<td>{tarea.id_tarea}</td>
			<td>{tarea.descripcion}</td>
			<td>{tarea.proceso}</td>
			<td>{toDator(tarea.inicio )}</td>
			<td>{toDator(tarea.termino)}</td>
			<td>{tarea.usuario}</td>
			<td>{tarea.status}</td> 
			<td><button className="btn btn-info" onClick={() => {showTask(tarea.id_tarea)}}>IR</button>  </td>
		</tr>
		)
	};

	function weHadTask(lista) {
		if (lista === 'null') {
			return (<div> error al cargar</div>)
		} else if (Array.isArray(lista) && lista.length === 0) {
			return (<div> no tiene tareas pendientes</div>)
		} else if (Array.isArray(lista) && lista.length > 0) {
			return (<div><p>hay tareas pendientes</p>
					<table className="table table-hover">
					<thead className="thead-dark">
						<tr>
							<th scope="col">ID</th>
							<th scope="col">Tarea</th>
							<th scope="col">Proceso</th>
							<th scope="col">Inicio</th>
							<th scope="col">Termino</th>
							<th scope="col">Usuario</th>
							<th scope="col">Estado</th>
							<th scope="col">→</th>

						</tr>
					</thead>
					<tbody>
			{lista.map(t => (task(t)))}
			</tbody>
				</table>
			</div>)
		} else {
			return (<div>Error desconocido!</div>)
		}
	};

	if (isLoading){
		return( 
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
				<h4>Tareas registradas</h4>
				<div className="row">
					<div className="col-3">
						<button type="button" className="btn btn-primary btn-block" onClick={() => { toNew() }}>Nueva tarea</button> 
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						{
							weHadTask(data)
						}
					</div>
				</div>
			</div>
		</div>
	)
}


export default withRouter(Tasks);