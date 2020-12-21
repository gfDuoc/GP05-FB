import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { API_BASE_URL_ALT } from '../../constants/apiContants';
import axios from 'axios';
import SideBar from '../Sidebar/SiderBar';
import moment from 'moment';

/*
"id_proceso": 2,
"descripcion": "prueba",
"modelo": "0",
"inicio": "2020-10-23T00:00:00",
"termino": "2001-01-01T00:00:00",
"detalle": "esto es una prueba",
"empresa_id": 1
*/

function SingleProcess(props) {
	var laUrl = "/procesos/"
	const url = API_BASE_URL_ALT + laUrl + props.match.params.id;
	const [data, setData] = useState({});
	const [empresa, setEmpresa] = useState({});
	const [isLoading, setLoading] = useState(true)
	var potato = null
	if (props.location.state != null){ potato = props.location.state.detail;	};
	useEffect(() => {
		const GetData = async () => {
			const result = await axios(url);
			console.log(result.data)
			const daempre = await axios(API_BASE_URL_ALT + "/empresas/" + result.data.empresa_id)
			setData(result.data);
			setEmpresa(daempre.data);
			setLoading(false);
		};
		GetData();
	}, []);

	function toEdit(id) {
		props.history.push(laUrl + id + '/edit');
	};

	function goBack() {
		props.history.goBack();
	}

	function toDator(valor) {
		if (valor != null) {
			var d = (moment(valor))
			return (moment(d).format("d/M/YYYY"))
		}
		else { return ('--/--/----') }
	}

	function ismodelo(valor) {
		if (valor > 0) { return "Si" } else { return "No" }
	}
	function dataExist(data) {
		console.log(data)
		if (data != null && Object.keys(data).length > 0) {
			return (<div>
				<div>
					<div className="card">
						<div className="card-header">
							<b>ID:</b> {data.id_proceso} 
						</div>
						<div className="card-body">
							<div className="row">
								<div className="col">
									<p><b>Descripcion:</b> {data.descripcion}</p>
									<p><b>Empresa:</b> {empresa.razonsocial}</p>
									<p><b>Detalle:</b> {data.detalle}</p>
								</div>
								<div className="col">
									<p><b>Modelo:</b> {ismodelo(data.modelo)}</p>
									<p><b>Inicio:</b> {toDator(data.inicio)}</p>
									<p><b>Termino:</b> {toDator(data.termino)}</p>
								</div>
							</div>
						</div>
						<div className="card-footer">
							<div className="row">
								<div className="col"><button type="button" className="btn btn-primary" onClick={() => { toEdit(data.id_proceso) }}>Editar</button></div>
								<div className="col"><button type="button" className="btn btn-secondary" onClick={() => { goBack() }}>Volver</button></div></div>
						</div>

					</div>
				</div>
			</div>)
		} else {
			return (<div>
				<h1>No Existe el Proceso</h1>
			</div>)
		}
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
				{potato !== null && <div className="alert alert-info alert-dismissible fade show"> <button type="button" className="close" data-dismiss="alert" onClick={() => {potato = null}}>&times;</button> <strong>Info:</strong> {potato}</div>}
				<h4>Proceso: </h4>
				<div className="row">
					<div className="col-md-12">
						{dataExist(data)}
					</div>

				</div>
			</div>
		</div>

	)
}


export default withRouter(SingleProcess);