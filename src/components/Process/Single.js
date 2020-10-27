import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { API_BASE_URL } from '../../constants/apiContants';
import axios from 'axios';
import SideBar from '../Sidebar/SiderBar';

function SingleProcess(props) {
    var laUrl = "/procesos/"
	const url = API_BASE_URL + laUrl + props.match.params.id;
	console.log(url)
	const [data, setData] = useState({});
	console.log(props)

	useEffect(() => {
		const GetData = async () => {
			// a falta de enpoints se esta usando los 2 de abajo, hay que reemplazar y probar cuando lo haya
			//const result = await axios(url);  
			//setData(result.data);  
			const result = await axios(API_BASE_URL + "/procesos")
			setData(result.data[props.match.params.id]);
		};
		GetData();
	}, []);

	function toEdit(id) {
		props.history.push( laUrl + id + '/edit');
	};

	function goBack() {
		props.history.goBack();
	}

	function dataExist(data) {
		console.log(data)
		if (data != null && Object.keys(data).length > 0) {
			return (<div>
				<div>
					<div className="card">
						<div className="card-header">
							<b>ID:</b> {data.ID_proceso} <b>descripcion:</b> {data.descripcion}
						</div>
						<div className="card-body">
							<div className="row">
								<div className="col">
									<p><b>modelo:</b>{data.modelo}</p>
								</div>
								<div className="col">
                                <p><b>Empresa:</b>{data.empresa_ID}</p>
								</div>
							</div>
							<div className="row">
								<div className="col">
									<p><b>inicio:</b>{data.inicio}</p>
									<p><b>termino:</b>{data.termino}</p>
								</div>
							</div>
                            <div className="row">
								<div className="col">
									<p><b>detalle:</b>{data.detalle}</p>
								</div>
							</div>
						</div>
						<div className="card-footer">
							<div className="row">
								<div className="col"><button type="button" className="btn btn-primary" onClick={() => { toEdit(data.ID_proceso) }}>Editar</button></div>
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
			<div className="container mt-5">

				<h4>Tarea: </h4>

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