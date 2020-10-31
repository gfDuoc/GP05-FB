import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { API_BASE_URL } from '../../constants/apiContants';
import SideBar from '../Sidebar/SiderBar';
import axios from 'axios';
import ReactModal from "react-modal";
import { isExternalModuleNameRelative } from 'typescript';
ReactModal.setAppElement('#root');
//ID_proceso: 0,
//descripcion: "",
//modelo: "",
//inicio: "",
//termino: "",
//detalle: "",
//empresa_ID: 0


function Procesos(props) {
	const laUrl = "/procesos"
	const [data, setData] = useState([]); console.log(props)
	const [modelos, setModelo] = useState([]);
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(() => {
		const fetchData = async () => {
			const respGlobal = await axios(
				API_BASE_URL + laUrl
			);
			const respRepos = await axios(
				API_BASE_URL + laUrl
			);
			setData(respGlobal.data);
			setModelo(respRepos.data);
		};
		fetchData();
	}, []);

	function showSingle(id) {
		console.log(laUrl + "/" + id)
		props.history.push(laUrl + "/" + id);
	};

	function showBase(id) {
		console.log(laUrl + "/" + id)
		props.history.push(laUrl + "/" + id + "?modelo=1");
	};

	function lister(dato) {
		console.log("el dato ES!")
		console.log(dato.length)
		if (dato != null && dato.length) {
			return (
				<table className="table table-hover">
					<thead className="thead-dark">
						<tr>
							<th scope="col">ID</th>
							<th scope="col">empresa</th>
							<th scope="col">proceso</th>
							<th scope="col">inicio</th>
							<th scope="col">termino</th>
							<th scope="col">tareas</th>
							<th scope="col">→</th>

						</tr>
					</thead>
					<tbody>
						{dato.map(item => (

							<tr key={item.ID_proceso}>
								<td>{item.ID_proceso}</td>
								<td>{item.empresa_ID}</td>
								<td>{item.descripcion}</td>
								<td>{item.inicio}</td>
								<td>{item.termino}</td>
								<td className="bg-secondary"><div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: (item.ID_proceso * 10) }}>{(item.ID_proceso * 10)}</div></td>
								<td><button className="btn btn-info" onClick={() => { showBase(item.ID_proceso) }}>IR</button>  </td>
							</tr>

						))}
					</tbody>
				</table>
			)

		} else {
			return (<div className="jumbotron bg-secondary">No hay información en estos momentos.</div>)
		}
	}

	function modaler(dato) {
		if (dato != null && dato.length) {
			return (
				<table className="table table-hover">
					<thead className="thead-dark">
						<tr>
							<th scope="col">ID</th>
							<th scope="col">empresa</th>
							<th scope="col">proceso</th>
							<th scope="col">→</th>
						</tr>
					</thead>
					<tbody>
						{dato.map(item => (
							<tr key={item.ID_proceso}>
								<td>{item.ID_proceso}</td>
								<td>{item.empresa_ID}</td>
								<td>{item.descripcion}</td>
								<td><button className="btn btn-info" onClick={() => { showSingle(item.ID_proceso) }}>IR</button>  </td>
							</tr>
						))}
					</tbody>
				</table>
			)

		} else {
			return (<div className="jumbotron bg-secondary">No hay información en estos momentos.</div>)
		}
	}

	return (
		<div className="App">
			<div className="row">
				<SideBar />
				<div className="col" align="left">
				<br></br>
					<div className="row">
						<div className="col">
							<h4>procesos registrados</h4>
						</div>
						<div className="col-2">
							<button className="btn btn-outline-success btn-sm" onClick={handleShow}>Crear a partir de modelo</button>
						</div>
						<div className="col-2">
							<button className="btn btn-outline-success btn-sm" onClick={() => { props.history.push("/procesos/new"); }}>crear nuevo proceso</button>
						</div>
					</div>
					<br />
					<div className="row">
						<div className="col-md-12">
							{lister(data)}
						</div>
					</div>
				</div>
			</div>


			<ReactModal
				isOpen={show}
				contentLabel="eleguir modelo"
			>
				<div className="modal-header">
					<h4 className="modal-title">selecione modelo</h4>
				</div>
				<div className="modal-body">
					{modaler(modelos)}
				</div>
				<div className="modal-footer">
					<button className="btn btn-primary " onClick={handleClose}>Cerrar</button>
				</div>
			</ReactModal>

		</div>


	)
}


export default withRouter(Procesos);