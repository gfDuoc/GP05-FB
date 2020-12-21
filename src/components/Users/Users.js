import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { API_BASE_URL_ALT } from '../../constants/apiContants';
import axios from 'axios';
import SideBar from '../Sidebar/SiderBar';

function Users(props) {
	const [data, setData] = useState([]);
	console.log(props);
	const [isLoading, setLoading] = useState(true)
	var potato = null
	if (props.location.state != null){ potato = props.location.state.detail;	};

	useEffect(() => {
		const GetData = async () => {
			const result = await axios(API_BASE_URL_ALT + '/usuarios');
			setData(result.data);
			setLoading(false);
		};
		GetData();
	}, []);

	function ShowUser(id) {
		console.log("/usuarios/"+ id)
		props.history.push( "/usuarios/"+ id)
	};

	function lister(dato) {
		console.log("el dato ES!")
		console.log(dato.length)
		if (dato != null && dato.length) {
			return (
				<table className="table table-bordered">
					<thead className="thead-dark">
						<tr>
							<th scope="col">ID</th>
							<th scope="col">usuario</th>
							<th scope="col">Nombre</th>
							<th scope="col">Correo</th>
							<th scope="col">→</th>
						</tr>
					</thead>
					<tbody>
						{dato.map(item => (

							<tr key={item.id_usuario}>
								<td>{item.id_usuario}</td>
								<td>{item.nombreusuario}</td>
								<td>{item.nombre} {item.apellidos}</td>
								<td>{item.correo}</td>
								<td><button className="btn btn-info" onClick={() => { ShowUser(item.id_usuario) }}>IR</button>  </td>
							</tr>

						))}
					</tbody>
				</table>
			)

		} else {
			return (<div className="jumbotron bg-secondary">No hay información en estos momentos.</div>)
		}
	};

	if (isLoading) {
		return (
			<div className="App">
				<div className="spinner-border spinner-border-xl"></div>
				<h1>cargando...</h1>
			</div>)
	}
	return (
		<div className="row">
			<SideBar/>
			<div className="col" align="left">
			<br></br>
			{potato !== null && <div className="alert alert-info alert-dismissible fade show"> <button type="button" className="close" data-dismiss="alert" onClick={() => {potato = null}}>&times;</button> <strong>Info:</strong> {potato}</div>}
				<div className="row">
					<div className="col">
						<h4>Usuarios registrados</h4>
					</div>
					<div className="col-1">
						<button className="btn btn-outline-success" onClick={() => { props.history.push("/usuarios" + '/new'); }}>Agregar</button>
					</div>
				</div>
				<br/>
				<div className="row">
					<div className="col-md-12">
						{lister(data)}

					</div>

				</div>
			</div>
		</div>

	)
}


export default withRouter(Users);