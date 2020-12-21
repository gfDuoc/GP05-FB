import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { API_BASE_URL_ALT } from '../../constants/apiContants';
import axios from 'axios';
import SideBar from '../Sidebar/SiderBar';

function ShowUser(props) {
	const url = API_BASE_URL_ALT + "/usuarios/" + props.match.params.id;
	console.log(url)
	const [data, setData] = useState({});
	const [perfiles, setPerfiles] = useState({})
    const [cargos, setCargos] = useState({})
	const [empresas, setEmpresas] = useState({})
	var potato = null
	if (props.location.state != null){ potato = props.location.state.detail;	};
	
	useEffect(() => {
		const GetData = async () => {
			const result = await axios(url);  
			setData(result.data);  
			const daPerfiles = await axios(API_BASE_URL_ALT + "/perfiles/"+result.data.perfil_id);
			const daCargos = await axios(API_BASE_URL_ALT + "/cargos/"+result.data.cargo_id);
            const daEmpresas = await axios(API_BASE_URL_ALT + "/empresas/"+result.data.cargo_id);
			setPerfiles(daPerfiles.data);
            setCargos(daCargos.data);
            setEmpresas(daEmpresas.data);
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
							<b>Usuario ID:</b> {data.id_usuario}
						</div>
						<div className="card-body">
							<div className="row">
								<div className="col">
									<p><b>usaurio:</b> {data.nombreusuario}</p>
									<p><b>Nombre:</b> {data.nombre}</p>
									<p><b>Apellido:</b> {data.apellidos}</p>
								</div>
								<div className="col">
									<p><b>correo:</b> {data.correo}</p>
									<p><b>Perfil:</b> {perfiles.descripcion}</p>
									<p><b>Cargo:</b> {cargos.descripcion}</p>
									<p><b>empresa:</b> {empresas.razonsocial}</p>
								</div>
							</div>
						</div>
						<div className="card-footer">
							<div className="row">
								<div className="col"><button type="button" className="btn btn-primary" onClick={() => { showSingle(data.id_usuario) }}>Editar Usuario</button></div>
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
       <SideBar/>
		<div className="col"  >
		<br></br>
		{potato !== null && <div className="alert alert-info alert-dismissible fade show"> <button type="button" className="close" data-dismiss="alert" onClick={() => {potato = null}}>&times;</button> <strong>Info:</strong> {potato}</div>}
		<div align="center">
			<h4>ver Usuario</h4>
			</div>
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