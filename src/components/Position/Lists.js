import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { API_BASE_URL_ALT } from '../../constants/apiContants';
import axios from 'axios';
import SideBar from '../Sidebar/SiderBar';

// "id_cargo": 0,
// "descripcion": "string"

function Positions(props) {
	var potato = null
	if (props.location.state != null){ potato = props.location.state.detail;	};
	const laUrl = API_BASE_URL_ALT+ "/cargos/"
	const [data, setData] = useState([]);
	console.log(props)
	const [isLoading, setLoading] = useState(true)
	

	

	useEffect(() => {
		const GetData = async () => {
			const result = await axios(laUrl);
			setData(result.data);
			setLoading(false);
		};
		GetData();
	}, []);

	function showSingle(id) {
		console.log('/cargos/' + id + '/edit')
		props.history.push('/cargos/' + id + '/edit');
	};

	function lister(dato) {
		if (dato != null && dato.length > 0) {
			return (
				<table className="table table-bordered">
					<thead className="thead-dark">
						<tr>
							<th scope="col">ID</th>
							<th scope="col">descripcion</th>
							<th scope="col">→</th>
						</tr>
					</thead>
					<tbody>
						{dato.map(item => (

							<tr key={item.id_cargo}>
								<td>{item.id_cargo}</td>
								<td>{item.descripcion}</td>
								<td><button className="btn btn-info" onClick={() => { showSingle(item.id_cargo) }}>Editar</button>  </td>
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
		<div className="row">
			<SideBar />
			<div className="col" align="left">
				<br></br>
				{potato !== null && <div className="alert alert-info alert-dismissible fade show"> <button type="button" className="close" data-dismiss="alert" onClick={() => {potato = null}}>&times;</button> <strong>Info:</strong> {potato}</div>}

		<div className="row">
					<div className="col">
						<h4>Listado de Cargos:</h4>
					</div>
					<div className="col-1">
						<button className="btn btn-outline-success" onClick={() => { props.history.push('/cargos/new'); }}>Agregar</button>
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

	)
}


export default withRouter(Positions);