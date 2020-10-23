import React, { useEffect,useState } from 'react';
import { withRouter } from 'react-router-dom';
import { API_BASE_URL } from '../../constants/apiContants';
import SideBar from '../Sidebar/SiderBar';
import axios from 'axios';  

//ID_proceso: 0,
//descripcion: "",
//modelo: "",
//inicio: "",
//termino: "",
//detalle: "",
//empresa_ID: 0

function Procesos(props){
    const laUrl = "/procesos"
    const [data, setData] = useState([]);  	console.log(props)

	useEffect(() => {  
		const GetData = async () => {  
			const result = await axios(API_BASE_URL+laUrl);  
			setData(result.data);  
		};  
		GetData();  
	}, []);  

	function showSingle(id) {
		console.log(laUrl+ "/" + id  ) 
		props.history.push(laUrl + "/"+ id );  
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
								<td className="bg-secondary"><div className="progress-bar progress-bar-striped progress-bar-animated" style={{width: (item.ID_proceso*10)}}>{(item.ID_proceso*10)}</div></td>
								<td><button className="btn btn-info" onClick={() => { showSingle(item.ID_usuario) }}>IR</button>  </td>
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
			<div className="container mt-5" align="left">
				<div className="row">
					<div className="col">
						<h4>procesos registrados</h4>
					</div>
					<div className="col-2">
						<button className="btn btn-outline-success btn-sm" onClick={() => { props.history.push("/procesos" + '/new'); }}>Crear a partid de modelo</button>
					</div>
					<div className="col-2">
						<button className="btn btn-outline-success btn-sm" onClick={() => { props.history.push("/procesos" + '/new'); }}>crear nuevo proceso</button>
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


export default withRouter(Procesos);