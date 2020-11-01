import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { API_BASE_URL } from '../../constants/apiContants';
import axios from 'axios';
import SideBar from '../Sidebar/SiderBar';

function ShowTask(props) {
	const url = API_BASE_URL + "/tareas/" + props.match.params.id;
	console.log(url)
	const [data, setData] = useState({});
	console.log(props)
	//const [error, setError] = useState()

	useEffect(() => {
		const GetData = async () => {
			// a falta de enpoints se esta usando los 2 de abajo, hay que reemplazar y probar cuando lo haya
			//const result = await axios(url);  
			//setData(result.data);  
			const result = await axios(API_BASE_URL + "/tareas")
			setData(result.data[props.match.params.id]);
		};
		GetData();
	}, []);

	function showTask(id) {
		props.history.push('/tareas/' + id + '/edit');
	};

	function goBack() {
		props.history.goBack();
	}

	function taskExist(data) {
		console.log(data)
		if (data != null && Object.keys(data).length > 0) {
			return (<div>
				<div>
					<div className="card">
						<div className="card-header">
							<b>ID:</b> {data.ID_tarea} <b>Nombre</b> {data.nombre}
						</div>
						<div className="card-body">
							<div className="row">
								<div className="col">
									<p><b>Incio:</b>{data.inicio}</p>
									<p><b>Termino:</b>{data.termino}</p>
								</div>
								<div className="col">
									<p><b>Registrado:</b>{data.inicioRegistrado}</p>
									<p><b>Registrado:</b>{data.terminoRegistrado}</p>
								</div>
							</div>
							<div className="row">
								<div className="col">
									<p><b>nivel:</b>{data.nivel}</p>
									<p><b>observaciones:</b>{data.observaciones}</p>
								</div>
							</div>
						</div>
						<div className="card-footer">
							<div className="row">
								<div className="col"><button type="button" className="btn btn-primary" onClick={() => { showTask(data.ID_tarea) }}>Editar Tarea</button></div>
								<div className="col"><button type="button" className="btn btn-secondary" onClick={() => { goBack() }}>Volver</button></div></div>
						</div>

					</div>
				</div>
			</div>)
		} else {
			return (<div>
				<h1>La tarea no Existe</h1>
			</div>)
		}
	}

	return (
		<div className="row">
			<SideBar/>
			<div className="col" align="center">
			<br></br>
				<h4>Tarea: </h4>
				<div className="row">
					<div className="col-md-12">
						{taskExist(data)}
					</div>

				</div>
			</div>
		</div>

	)
}


export default withRouter(ShowTask);