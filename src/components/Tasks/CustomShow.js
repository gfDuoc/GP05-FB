import React from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { createPortal } from 'react-dom';

function ShowTaskCustom(props) {
	const statusTypo = [
		{
		  "id_estadotarea": 1,
		  "descripcion": "PENDIENTE"
		},
		{
		  "id_estadotarea": 2,
		  "descripcion": "ACTIVO"
		},
		{
		  "id_estadotarea": 3,
		  "descripcion": "FINALIZADO"
		}
	  ]
	function toDator(valor) {
		if (valor != null) {
			var d = (moment(valor))
			return (moment(d).format("d/M/YYYY"))
		}
		else { return ('--/--/----') }
	}

	function putStatus(data){
	var	texto = "-----"
		statusTypo.forEach(element => {
			if(data=== element["id_estadotarea"]){texto = element["descripcion"]}
		});
		return texto
	}

	function showTask(id) {
		props.history.push('/tareas/' + id + '/edit');
	};

	function goBack() {
		props.history.goBack();
	}

	function taskExist(data) {
		if (data != null && Object.keys(data).length > 0) {
			return (<div>
				<div>
					<div key={"ta" + data.id_tarea} className="card border-dark">
						<div className="card-header bg-info ">
							<b>ID:</b> {data.id_tarea} <b>Nombre</b> {data.descripcion}
						</div>
						<div className="card-body text-left">
							<div className="row">
								<div className="col">
									<p><b>Inicio:</b> {toDator(data.inicio)}</p>
									<p><b>Termino:</b> {toDator(data.termino)}</p>
								</div>
								<div className="col">
									<p><b>Registrado:</b> {toDator(data.inicioRegistrado)}</p>
									<p><b>Registrado:</b> {toDator(data.terminoRegistrado)}</p>
								</div>
							</div>
							<div className="row">
								<div className="col">
									<p><b>nivel:</b> {data.nivel}</p>
									<p><b>observaciones:</b> {data.observaciones}</p>
								</div>
								<div className="col">
									<p><b>Estado Tarea:</b>{putStatus(data.estadotarea_id)}</p>
								</div>
							</div>
						</div>
						<div className="card-footer">
							<div className="row">
								<div className="col"><button type="button" className="btn btn-primary" onClick={() => { showTask(data.id_tarea) }}>Editar Tarea</button></div>
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
		<div key={"row"+props.id_tarea} className="row">
		  {console.log(props)}
			<div className="col-md-12">
				{taskExist(props)}
			</div>
		</div>
	)
}


export default withRouter(ShowTaskCustom);