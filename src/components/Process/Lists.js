import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { API_BASE_URL_ALT } from '../../constants/apiContants';
import SideBar from '../Sidebar/SiderBar';
import axios from 'axios';
import ReactModal from "react-modal";
import moment from 'moment';
//import { isExternalModuleNameRelative } from 'typescript';
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
	const [isLoading, setLoading] = useState(true)
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(() => {
		const fetchData = async () => {
			const respGlobal = await axios(API_BASE_URL_ALT + laUrl);
			//const respRepos = await axios(API_BASE_URL_ALT + laUrl);
			const recompa = await axios(API_BASE_URL_ALT + "/empresas")
			var datos = respGlobal.data
			var compa = recompa.data
			datos.forEach(element => {
				fixer(element, compa)
			});
			setData(datos);
			setModelo(separator(datos));
			setLoading(false);
		};
		fetchData();
	}, []);

	function showBase(id) {
		console.log(laUrl + "/" + id)
		props.history.push(laUrl + "/" + id + "?modelo=1");
	};

	function toCreator(info) {
		console.log("to new ussing:" + info.id_proceso)
		props.history.push({
			pathname: "/procesos/new",
			state: {
				ID_proceso: 0,
				descripcion: info.descripcion,
				modelo: info.modelo,
				inicio:	 dataFomtater( info.inicio),
				termino:  dataFomtater(info.termino),
				detalle: info.detalle,
				empresa_ID: info.empresa_ID
			}
		});
	}

	function dataFomtater(valor) {
        var d = null
		if (valor != null) {d = (moment(valor).format('YYYY-MM-DD')) }
		return d
    }

	function fixer(dicto, empre) {
		dicto.inicio = toDator(dicto.inicio)
		dicto.termino = toDator(dicto.termino)
		if (dicto.modelo > 0) { dicto.modelo = "Si" } else { dicto.modelo = "No" }
		empre.forEach(element => {
			if (dicto.empresa_id === element.id_empresa) {
				dicto["razonsocial"] = element.razonsocial
			}
		});
	}

	function separator(listado) {
		var retu = []
		listado.forEach(element => {
			if (element.modelo === "Si") { retu.push(element) }
		});
		return retu
	}

	function toDator(valor) {
		if (valor != null) {
			var d = (moment(valor))
			return (moment(d).format("d/M/YYYY"))
		}
		else { return ('--/--/----') }
	}
	function lister(dato) {
		console.log("el dato ES!")
		console.log(dato)
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
							<th scope="col">Modelo</th>
							<th scope="col">tareas</th>
							<th scope="col">→</th>

						</tr>
					</thead>
					<tbody>
						{dato.map(item => (

							<tr key={item.id_proceso}>
								<td>{item.id_proceso}</td>
								<td>{item.razonsocial}</td>
								<td>{item.descripcion}</td>
								<td>{item.inicio}</td>
								<td>{item.termino}</td>
								<td>{item.modelo}</td>
								<td className="bg-secondary"><div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: (item.id_proceso * 10) }}>{(item.id_proceso * 10)}</div></td>
								<td><button className="btn btn-info" onClick={() => { showBase(item.id_proceso) }}>IR</button>  </td>
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
							<tr key={item.id_proceso}>
								<td>{item.id_proceso}</td>
								<td>{item.razonsocial}</td>
								<td>{item.descripcion}</td>
								<td><button className="btn btn-info" onClick={() => { toCreator(item) }}>Crear</button>  </td>
							</tr>
						))}
					</tbody>
				</table>
			)

		} else {
			return (<div className="jumbotron bg-secondary">No hay información en estos momentos.</div>)
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