import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { API_BASE_URL } from '../../constants/apiContants';
import axios from 'axios';
import SideBar from '../Sidebar/SiderBar';

/*
CARGO
P* ID_cargo NUMBER
* descripcion VARCHAR2 (80)
*/

function Positions(props) {
	const laUrl = "/cargos"
	const [data, setData] = useState([]); console.log(props)
	useEffect(() => {
		const GetData = async () => {
			const result = await axios(API_BASE_URL + laUrl);
			setData(result.data);
		};
		GetData();
	}, []);

	function showSingle(id) {
		console.log(laUrl + '/' + id + '/edit')
		props.history.push(laUrl + '/' + id + '/edit');
	};

	function lister(dato) {
		if (dato != null && dato.lenght > 0) {
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

							<tr key={item.ID_empresa}>
								<td>{item.ID_empresa}</td>
								<td>{item.descripcion}</td>
								<td><button className="btn btn-info" onClick={() => { showSingle(item.ID_empresa) }}>Editar</button>  </td>
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
		<div className="row">
			<div className="col-2"><SideBar /></div>
			<div className="container mt-5" align="center">
				<h4>Listado de Cargos:</h4>
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