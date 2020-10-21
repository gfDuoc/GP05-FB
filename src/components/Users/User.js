import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { API_BASE_URL } from '../../constants/apiContants';
import axios from 'axios';
import SideBar from '../Sidebar/SiderBar';

function ShowUser(props) {
	const url = API_BASE_URL + "/usuarios/" + props.match.params.id;
	console.log(url)
	const [data, setData] = useState({});
	console.log(props)

	useEffect(() => {
		const GetData = async () => {
			// a falta de enpoints se esta usando los 2 de abajo, hay que reemplazar y probar cuando lo haya
			//const result = await axios(url);  
			//setData(result.data);  
			const result = await axios(API_BASE_URL + "/usuarios")
			setData(result.data[props.match.params.id]);
			console.log(data)
		};
		GetData();
	}, []);

	function showSingle(id) {
		props.history.push('/usuarios/' + id + '/edit');
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
							<b>Usuario ID:</b> {data.ID_usuario}
						</div>
						<div className="card-body">
							<div className="row">
								<div className="col">
									<p><b>usaurio:</b>{data.nombreUsuario}</p>
									<p><b>Nombre:</b>{data.nombre}</p>
									<p><b>Apellido:</b>{data.apellidos}</p>
								</div>
								<div className="col">
									<p><b>correo:</b>{data.correo}</p>
									<p><b>Perfil:</b>{data.perfil_ID}</p>
									<p><b>Cargo:</b>{data.perfil_ID}</p>
									<p><b>empresa:</b>{data.empresa_ID}</p>
								</div>
							</div>
						</div>
						<div className="card-footer">
							<div className="row">
								<div className="col"><button type="button" className="btn btn-primary" onClick={() => { showSingle(data.ID_tarea) }}>Editar Tarea</button></div>
								<div className="col-1"><button type="button" className="btn btn-secondary" onClick={() => { goBack() }}>Volver</button></div></div>
						</div>

					</div>
				</div>
			</div>)
		} else {
			return (<div>
				 <div className="jumbotron bg-secondary">No hay información en estos momentos.</div>
			</div>)
		}
	}

	return (
		<div className="row">
        <div className="col-2"><SideBar/></div>
		<div className="container mt-5" >

			<h4>ver Usuario</h4>
			<div className="row">
				<div className="col-md-12">
				{taskExist(data)}
				</div>
			</div>
		</div>
		</div>
	)
}



export default withRouter(ShowUser);