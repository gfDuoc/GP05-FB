import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { API_BASE_URL_ALT } from '../../constants/apiContants';
import axios from 'axios';
import SideBar from '../Sidebar/SiderBar';

function Companies(props) {
	const laUrl = API_BASE_URL_ALT +"/empresas/";
	const  power = localStorage.getItem("idPerfil")
	console.log(power)
	const [data, setData] = useState([]);
	const [isLoading, setLoading] = useState(true)
	var potato = null
	if (props.location.state != null){ potato = props.location.state.detail;	};

	useEffect(() => {
		const GetData = async () => {
			const result = await axios( laUrl);
			setData(result.data);
			setLoading(false);
		};
		GetData();
	}, []);

	function ShowCompany(id) {
		props.history.push('/empresas/' + id + '/edit');
	};

	function lister(dato) {
		if (dato != null && dato.length) {
			return (
				<table className="table table-bordered">
					<thead className="thead-dark">
						<tr>
							<th scope="col">ID</th>
							<th scope="col">Razon Social</th>
							<th scope="col">→</th>
						</tr>
					</thead>
					<tbody>
						{dato.map(item => (
							
							<tr key={item.id_empresa}>
								<td>{item.id_empresa}</td>
								<td>{item.razonsocial}</td>
								<td><button className="btn btn-info"  disabled={power !== "1" ? true: false} onClick={() => { ShowCompany(item.id_empresa) }}>Editar</button>  </td>
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
						<h4>Empresas Registradas</h4>
					</div>
					<div className="col-1">
						<button className= {power !== "1" ? "btn btn-outline-success disabled hide-it " : "btn btn-outline-success "} onClick={() => { props.history.push('/empresas/new'); }}>Agregar</button>
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


export default withRouter(Companies);